import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import FormHeading from "./FormHeading";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { useCheckpoint, CheckpointStep } from '@/hooks/useCheckpoint';
import { toast } from "sonner";

interface LastStepPageProps {
  onNext: () => void;
  initialData?: unknown;
  isCompleted?: boolean;
}

// Global flags to track toast states in this session
let hasShownGlobalCompletedToast = false;
let hasShownEsignSuccessToast = false;

// Helper function to get data from localStorage for URL encoding
const getEmailFromStorage = (): string => {
  try {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) return "";
    
    try {
      const parsedEmail = JSON.parse(storedEmail);
      if (typeof parsedEmail === 'object' && parsedEmail.value) {
        return parsedEmail.value;
      }
    } catch {
      return storedEmail;
    }
    
    return "";
  } catch (error) {
    console.error("Error retrieving email from localStorage:", error);
    return "";
  }
};

const getPhoneFromStorage = (): string => {
  try {
    const storedPhone = localStorage.getItem("verifiedPhone");
    if (!storedPhone) return "";
    
    try {
      const parsedPhone = JSON.parse(storedPhone);
      if (typeof parsedPhone === 'object' && parsedPhone.value) {
        return parsedPhone.value;
      }
    } catch {
      return storedPhone;
    }
    
    return "";
  } catch (error) {
    console.error("Error retrieving phone from localStorage:", error);
    return "";
  }
};

const LastStepPage: React.FC<LastStepPageProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'initial' | 'esign_pending'>('initial');
  const [esignUrl, setEsignUrl] = useState<string>('');
  const [isPolling, setIsPolling] = useState(false);
  const esignTabRef = useRef<Window | null>(null);

  // Polling refs
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false); // Use ref to track polling state

  // Use the checkpoint hook to check for existing eSign data
  const { 
    isStepCompleted,
    refetchStep 
  } = useCheckpoint();

  // Silent polling function to check eSign completion - memoized to prevent recreation
  const checkEsignStatus = useCallback(async () => {
    if (!isPollingRef.current) return;

    try {
      const authToken = Cookies.get('authToken');
      
      if (!authToken) {
        console.log("No auth token, stopping eSign polling");
        isPollingRef.current = false;
        setIsPolling(false);
        return;
      }
      
      // Use GET API to check if eSign is completed (just check DB status)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint/esign_complete`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      // If we get here with a URL, eSign was completed
      if (response.status === 200 && response.data?.data?.url) {
        console.log("eSign completed successfully via polling, URL:", response.data.data.url);
        
        // Try to call the POST API to complete the eSign process, but don't fail if it errors
        try {
          console.log("Calling eSign completion API...");
          const completeResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
            {
              step: "esign_complete"
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
              }
            }
          );
          
          console.log("eSign completion API successful:", completeResponse.data);
        } catch (completeError: any) {
          console.error("eSign completion API failed:", completeError);
          
          // Check if it's a Redis expiry error
          if (completeError.response?.status === 401) {
            console.log("Redis key expired or eSign already processed - this is expected, continuing...");
          } else {
            console.error("Other eSign completion error:", completeError.response?.data);
          }
          
          // Continue anyway since the eSign document exists in the database
          // The GET API confirmed it's there, so the process was successful
        }
        
        isPollingRef.current = false;
        setIsPolling(false);
        
        // Close eSign tab if it's still open
        if (esignTabRef.current && !esignTabRef.current.closed) {
          esignTabRef.current.close();
          esignTabRef.current = null;
        }
        
        // Reset to initial state
        setCurrentStep('initial');
        
        // Only show success toast if we haven't shown it already in this session
        if (!hasShownEsignSuccessToast) {
          toast.success("eSign completed successfully!");
          hasShownEsignSuccessToast = true;
        }
        
        // Refetch the eSign checkpoint to update the hook
        refetchStep(CheckpointStep.ESIGN);
        
        setTimeout(() => {
          onNext();
        }, 100);
      }

    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: { message?: string; error?: { message?: string } } } };
      
      if (error.response?.status === 404) {
        // eSign not completed yet - continue polling silently
        console.log("eSign not completed yet (404), continuing polling...");
        return;
      }

      // For other errors, continue polling silently but log the error
      console.warn("eSign polling error (continuing):", error);
    }
  }, [onNext, refetchStep]);

  // Start polling - memoized to prevent recreation
  const startPolling = useCallback(() => {
    if (isPollingRef.current) return; // Prevent multiple polling instances

    console.log("Starting silent polling for eSign completion");
    isPollingRef.current = true;
    setIsPolling(true);

    // Initial check after 1 second (give time for eSign to be completed)
    pollingTimeoutRef.current = setTimeout(() => {
      checkEsignStatus();

      // Then poll every 2 seconds
      pollingIntervalRef.current = setInterval(() => {
        checkEsignStatus();
      }, 2000);
    }, 1000);
  }, [checkEsignStatus]);

  // Stop polling - memoized to prevent recreation
  const stopPolling = useCallback(() => {
    console.log("Stopping eSign polling");
    isPollingRef.current = false;
    setIsPolling(false);
    
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
    
    // Close eSign tab if it's still open
    if (esignTabRef.current && !esignTabRef.current.closed) {
      esignTabRef.current.close();
      esignTabRef.current = null;
    }
  }, []);

  // Check for existing states on component mount
  useEffect(() => {
    // Check if eSign is already completed
    const esignCompleted = isCompleted || isStepCompleted(CheckpointStep.ESIGN);

    if (esignCompleted) {
      // Show completion toast only once per session
      if (!hasShownGlobalCompletedToast) {
        hasShownGlobalCompletedToast = true;
        hasShownEsignSuccessToast = true;
      }
      return;
    }

    // Start polling immediately when component mounts (if not already completed)
    if (!esignCompleted) {
      startPolling();
    }

    // Cleanup polling on unmount
    return () => {
      stopPolling();
    };
  }, [
    isCompleted,
    isStepCompleted,
    startPolling,
    stopPolling
  ]);

  // UPDATED: Enhanced eSign initialization with state encoding
  const handleEsignClick = async () => {
    if (!isChecked) {
      toast.error("Please agree to receive communications via email to proceed.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      const email = getEmailFromStorage();
      const phone = getPhoneFromStorage();
      
      if (!authToken) {
        toast.error("Authentication token not found. Please restart the process.");
        setIsLoading(false);
        return;
      }

      // Create state data to encode in URL
      const stateData = {
        token: authToken,
        email: email,
        phone: phone,
        step: 'esign',
        timestamp: Date.now()
      };
      
      // Encode the state data
      const encodedState = btoa(JSON.stringify(stateData));
      const redirectUrl = `https://sapphirebroking.com/signup?state=${encodedState}`;

      console.log("Making API call to initialize eSign session...");

      // Initialize eSign session with enhanced redirect URL
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "esign_initialize",
          redirect_url: redirectUrl
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
        }
      );

      console.log("eSign initialization response:", response.data);

      if (!response.data?.data?.uri) {
        toast.error("Failed to initialize eSign. Please try again.");
        return;
      }

      setEsignUrl(response.data.data.uri);
      setCurrentStep('esign_pending');
      
      // Open eSign in the same tab (this will navigate away from current page)
      window.location.href = response.data.data.uri;

    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { message?: string; error?: { message?: string } };
          status?: number;
        };
        request?: unknown;
      };

      console.error("eSign initialization error:", err);
      
      const errorMessage = 
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to initialize eSign. Please try again.";
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setEsignUrl('');
    setCurrentStep('initial');
    
    // Clear any existing polling
    stopPolling();
    
    // Start fresh
    handleEsignClick();
  };

  // Handle continue/proceed button click
  const handleContinue = () => {
    // If already completed, just proceed to next step
    if (isCompleted || isStepCompleted(CheckpointStep.ESIGN)) {
      onNext();
      return;
    }
    
    // Always start the eSign process
    handleEsignClick();
  };

  const shouldShowCompletedState = isCompleted || isStepCompleted(CheckpointStep.ESIGN);

  // Check if button should be disabled
  const isButtonDisabled = () => {
    if (shouldShowCompletedState) return false; // If completed, allow continue
    return isLoading;
  };

  const getButtonText = () => {
    if (shouldShowCompletedState) return "Continue";
    
    switch (currentStep) {
      case 'initial':
        return isLoading ? "Initializing eSign..." : "Proceed to E-sign";
      case 'esign_pending':
        return "Reopen eSign";
      default:
        return "Proceed to E-sign";
    }
  };

  // Show completed state
  if (shouldShowCompletedState) {
    return (
      <div className="mx-auto p-4 mt-10">
        <FormHeading
          title="Finish account set-up using Aadhar E-sign"
          description="E-sign and complete your onboarding instantly."
        />

        <div className="flex justify-center mb-6">
          <div className="inline-block">
            <Image 
              width={100} 
              height={80} 
              src='/signup/e-sign.png' 
              alt="Aadhar E-sign Completed" 
              className="max-w-full h-auto rotate-90" 
            />
          </div>
        </div>

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-green-800 font-medium">eSign Completed Successfully!</h3>
              <p className="text-green-700 text-sm">Your KYC documents have been digitally signed.</p>
            </div>
          </div>
        </div>

        <Button 
          variant="ghost"
          onClick={onNext} 
          className="py-6 w-full"
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 mt-10">
      <FormHeading
        title="Finish account set-up using Aadhar E-sign"
        description="E-sign and complete your onboarding instantly."
      />
      
      <div className="flex justify-center -mt-10">
        <div className="inline-block">
          <Image 
            width={100} 
            height={80} 
            src='/signup/e-sign.png' 
            alt="Aadhar E-sign" 
            className="max-w-full h-auto rotate-90" 
          />
        </div>
      </div>
      
      <div className="mb-6 flex items-center cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
        <div
          className={`h-6 w-6 flex items-center justify-center border-2 rounded-lg transition-colors cursor-pointer
            ${isChecked ? "border-green-600 bg-white" : "border-gray-400"}`}
        >
          {isChecked && <Check className="h-4 w-4 text-green-600" />}
        </div>
        <label className="text-sm text-gray-600 ml-2 cursor-pointer">
          I would like to receive ECN and other communications via email.
        </label>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded border border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Try Again
          </button>
        </div>
      )}
      
      <Button 
        variant="ghost"
        onClick={handleContinue} 
        disabled={isButtonDisabled()}
        className={`py-6 w-full ${
          isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {getButtonText()}
      </Button>

      <div className="hidden sm:block mt-4 text-center text-xs text-gray-600">
        <p>
          {shouldShowCompletedState 
            ? "Your eSign is complete. Click continue to proceed to the next step."
            : "Clicking the button will navigate to eSign. Complete the process and you'll be redirected back automatically."
          }
        </p>
      </div>
    </div>
  );
};

export default LastStepPage;