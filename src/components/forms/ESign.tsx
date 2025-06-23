import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import FormHeading from "./FormHeading";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useCheckpoint, CheckpointStep } from '@/hooks/useCheckpoint';
import { toast } from "sonner";

interface LastStepPageProps {
  onNext: () => void;
  initialData?: unknown;
  isCompleted?: boolean;
}

interface ApiErrorResponse {
  message?: string;
  error?: {
    message?: string;
  };
}

interface EsignInitializeResponse {
  data?: {
    uri?: string;
  };
  message?: string;
}

interface EsignCompleteResponse {
  data?: {
    download_url?: string;
    signed_at?: string;
  };
  message?: string;
}

interface EsignStatusResponse {
  data?: {
    url?: string;
  };
  message?: string;
}

// Global flags to track states in this session
let hasShownGlobalCompletedToast = false;
let hasShownEsignSuccessToast = false;
let hasInitializedEsign = false; // Global flag to prevent multiple initializations

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
  isCompleted 
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'initial' | 'esign_pending'>('initial');
  const [esignUrl, setEsignUrl] = useState<string>('');
  const [, setIsInitialized] = useState<boolean>(false);
  const [, setIsPolling] = useState<boolean>(false);
  const esignTabRef = useRef<Window | null>(null);

  // Polling refs
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef<boolean>(false); // Use ref to track polling state

  // Use the checkpoint hook to check for existing eSign data
  const { 
    isStepCompleted,
    refetchStep 
  } = useCheckpoint();

  // Initialize eSign session - memoized to prevent recreation
  const initializeEsign = useCallback(async (): Promise<void> => {
    // Prevent multiple simultaneous calls using global flag
    if (hasInitializedEsign || isLoading || esignUrl) {
      console.log("eSign already initialized or in progress, skipping...");
      return;
    }

    hasInitializedEsign = true;
    setIsLoading(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      const email = getEmailFromStorage();
      const phone = getPhoneFromStorage();
      
      if (!authToken) {
        setError("Authentication token not found. Please restart the process.");
        hasInitializedEsign = false;
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
      const response = await axios.post<EsignInitializeResponse>(
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
        setError("Failed to initialize eSign. Please try again.");
        hasInitializedEsign = false;
        return;
      }

      setEsignUrl(response.data.data.uri);
      setIsInitialized(true);
      
    } catch (err: unknown) {
      const error = err as AxiosError<ApiErrorResponse>;

      console.error("eSign initialization error:", err);
      hasInitializedEsign = false;
      
      const errorMessage = 
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to initialize eSign. Please try again.";
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, esignUrl]);

  // Silent polling function to check eSign completion - memoized to prevent recreation
  const checkEsignStatus = useCallback(async (): Promise<void> => {
    if (!isPollingRef.current) return;

    try {
      const authToken = Cookies.get('authToken');
      
      if (!authToken) {
        console.log("No auth token, stopping eSign polling");
        isPollingRef.current = false;
        setIsPolling(false);
        return;
      }
      
      // First try POST esign_complete to check if eSign is ready and process it
      try {
        console.log("Checking if eSign is ready for processing via POST API...");
        const completeResponse = await axios.post<EsignCompleteResponse>(
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
        
        console.log("eSign processing successful:", completeResponse.data);
        
        // If POST API succeeds, eSign was completed by user and now processed
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
        
        return; // Exit here if POST API succeeded
        
      } catch (completeError: unknown) {
        const error = completeError as AxiosError<ApiErrorResponse>;
        
        // If POST API fails, check the reason
        if (error.response?.status === 401) {
          // Could mean Redis key expired OR eSign not completed by user yet
          const errorMessage = error.response?.data?.message || '';
          
          if (errorMessage.includes('not completed')) {
            console.log("eSign not completed by user yet, continuing polling...");
          } else if (errorMessage.includes('expired') || errorMessage.includes('authorized')) {
            console.log("Redis key expired - eSign session timed out, continuing polling...");
          } else {
            console.log("POST esign_complete failed with 401:", errorMessage);
          }
        } else {
          console.log("POST esign_complete failed with error:", error.response?.status, error.response?.data?.message);
        }
        
        // Continue to fallback GET API check
      }
      
      // Fallback: Use GET API to check if eSign was already processed previously
      try {
        const response = await axios.get<EsignStatusResponse>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint/esign_complete`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );

        // If GET API finds completed eSign with actual URL, it was processed before
        if (response.status === 200 && response.data?.data?.url && response.data.data.url.trim() !== "") {
          console.log("eSign was already processed previously, URL:", response.data.data.url);
          
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
        } else if (response.status === 200 && response.data?.data?.url === "") {
          // Empty URL means eSign record exists but not processed yet
          console.log("eSign record found but empty URL - not processed yet, continuing polling...");
        }
      } catch (getError: unknown) {
        const error = getError as AxiosError<ApiErrorResponse>;
        
        if (error.response?.status === 404) {
          // eSign not found in DB yet - not processed
          console.log("eSign not found in DB yet (404) - not processed yet...");
        } else {
          console.warn("GET API error:", error.response?.status, error.response?.data?.message);
        }
      }

    } catch (err: unknown) {
      // General error handling
      console.warn("eSign polling error (continuing):", err);
    }
  }, [onNext, refetchStep]);

  // Start polling - memoized to prevent recreation
  const startPolling = useCallback((): void => {
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
  const stopPolling = useCallback((): void => {
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

  // Check for existing states on component mount and initialize eSign
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

    // Initialize eSign on component mount (only once)
    if (!hasInitializedEsign && !isLoading && !esignUrl) {
      initializeEsign();
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
    initializeEsign,
    startPolling,
    stopPolling,
    isLoading,
    esignUrl
  ]);

  // Handle eSign button click (now just opens the URL)
  const handleEsignClick = (): void => {
    if (!isChecked) {
      toast.error("Please agree to receive communications via email to proceed.");
      return;
    }

    if (!esignUrl) {
      toast.error("eSign URL not available. Please try again.");
      return;
    }

    console.log("Opening eSign URL:", esignUrl);
    setCurrentStep('esign_pending');
    
    // Open eSign in the same tab (this will navigate away from current page)
    window.location.href = esignUrl;
  };

  const handleRetry = (): void => {
    setError(null);
    setEsignUrl('');
    setCurrentStep('initial');
    setIsInitialized(false);
    hasInitializedEsign = false; // Reset global flag
    
    // Clear any existing polling
    stopPolling();
    
    // Initialize fresh
    initializeEsign();
  };

  // Handle continue/proceed button click
  const handleContinue = (): void => {
    // If already completed, just proceed to next step
    if (isCompleted || isStepCompleted(CheckpointStep.ESIGN)) {
      onNext();
      return;
    }
    
    // If eSign is initialized, open it
    if (esignUrl) {
      handleEsignClick();
    } else if (error) {
      handleRetry();
    } else {
      toast.error("eSign is still being initialized. Please wait...");
    }
  };

  const shouldShowCompletedState = isCompleted || isStepCompleted(CheckpointStep.ESIGN);

  // Check if button should be disabled
  const isButtonDisabled = (): boolean => {
    if (shouldShowCompletedState) return false; // If completed, allow continue
    if (isLoading) return true; // Disable while initializing
    return false;
  };

  const getButtonText = (): string => {
    if (shouldShowCompletedState) return "Continue";
    
    if (isLoading) return "Initializing eSign...";
    if (error) return "Retry";
    if (!esignUrl) return "Loading eSign...";
    
    switch (currentStep) {
      case 'initial':
        return !isChecked ? "Please accept ECN to proceed" : "Proceed to E-sign";
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