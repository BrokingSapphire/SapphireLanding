import React, { useState, useEffect, useRef } from "react";
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

// Helper function to get data from localStorage for URL encoding
// const getEmailFromStorage = (): string => {
//   try {
//     const storedEmail = localStorage.getItem("email");
//     if (!storedEmail) return "";
    
//     try {
//       const parsedEmail = JSON.parse(storedEmail);
//       if (typeof parsedEmail === 'object' && parsedEmail.value) {
//         return parsedEmail.value;
//       }
//     } catch {
//       return storedEmail;
//     }
    
//     return "";
//   } catch (error) {
//     console.error("Error retrieving email from localStorage:", error);
//     return "";
//   }
// };

// const getPhoneFromStorage = (): string => {
//   try {
//     const storedPhone = localStorage.getItem("verifiedPhone");
//     if (!storedPhone) return "";
    
//     try {
//       const parsedPhone = JSON.parse(storedPhone);
//       if (typeof parsedPhone === 'object' && parsedPhone.value) {
//         return parsedPhone.value;
//       }
//     } catch {
//       return storedPhone;
//     }
    
//     return "";
//   } catch (error) {
//     console.error("Error retrieving phone from localStorage:", error);
//     return "";
//   }
// };

// Global flags to track toast states in this session
let hasShownGlobalCompletedToast = false;
let hasShownEsignSuccessToast = false;

const LastStepPage: React.FC<LastStepPageProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [isChecked, setIsChecked] = useState(false); // Changed to false by default
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [esignUrl, setEsignUrl] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const esignWindowRef = useRef<Window | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use the checkpoint hook to check for existing eSign data
  const { 
    isStepCompleted,
    refetchStep 
  } = useCheckpoint();

  // Check if eSign is already completed and show toast
  useEffect(() => {
    if (isStepCompleted(CheckpointStep.ESIGN)) {
      // eSign is already completed
      if (!isInitialized) {
        setIsInitialized(true);
      }
      
      // Show completion toast only once per session
      if (!hasShownGlobalCompletedToast) {
        toast.success("eSign already completed! You can proceed to the next step.");
        hasShownGlobalCompletedToast = true;
        // Also set the eSign success flag to prevent duplicate success messages
        hasShownEsignSuccessToast = true;
      }
      return;
    }

    // If not completed, initialize eSign
    if (!isInitialized && !isLoading && !esignUrl) {
      console.log("Calling initializeEsign from useEffect");
      initializeEsign();
    }
  }, [isStepCompleted(CheckpointStep.ESIGN)]); // Only depend on step completion

  // Also check initialData as fallback
  useEffect(() => {
    const data = initialData as { esign?: boolean } | undefined;
    if (isCompleted && data?.esign) {
      console.log("eSign completed from initialData");
      setIsInitialized(true);
    }
  }, [initialData, isCompleted]);

  // Start background polling after initialization
  useEffect(() => {
    if (isInitialized && esignUrl && !isStepCompleted(CheckpointStep.ESIGN)) {
      startBackgroundPolling();
    }

    // Cleanup polling on unmount
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [isInitialized, esignUrl, isStepCompleted]);

  // UPDATED: Enhanced eSign initialization with state encoding
  const initializeEsign = async () => {
    console.log("initializeEsign called - isLoading:", isLoading, "esignUrl:", esignUrl);
    
    // Prevent multiple simultaneous calls
    if (isLoading || esignUrl) {
      console.log("Already initializing or URL exists, skipping...");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get current state data for URL encoding
      const authToken = Cookies.get('authToken');
      // const email = getEmailFromStorage();
      // const phone = getPhoneFromStorage();
      
      if (!authToken) {
        setError("Authentication token not found. Please restart the process.");
        return;
      }

      // Create state data to encode in URL
      // const stateData = {
      //   token: authToken,
      //   email: email,
      //   phone: phone,
      //   step: 'esign',
      //   timestamp: Date.now()
      // };
      
      // Encode the state data
      // const encodedState = btoa(JSON.stringify(stateData));
      const redirectUrl = `https://sapphirebroking.com/signup`;

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

      if (response.data?.data?.uri) {
        console.log("eSign session initialized with URL:", response.data.data.uri);
        setEsignUrl(response.data.data.uri);
        setIsInitialized(true);
      } else {
        setError("Failed to initialize eSign. Please try again.");
      }
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { message?: string; error?: { message?: string } };
          status?: number;
        };
        request?: unknown;
      };

      console.error("eSign initialization error:", err);
      if (error.response) {
        if (error.response.data?.message) {
          setError(`Error: ${error.response.data.message}`);
        } else if (error.response.data?.error?.message) {
          setError(`Error: ${error.response.data.error.message}`);
        } else if (error.response.status === 400) {
          setError("Invalid request. Please try again.");
        } else if (error.response.status === 401) {
          setError("Authentication failed. Please restart the process.");
        } else if (error.response.status === 403) {
          setError("Access denied. Please check your authentication and try again.");
        } else if (error.response.status === 500) {
          setError("Server error. Please try again in a few moments.");
        } else {
          setError(`Server error (${error.response.status}). Please try again.`);
        }
      } else if (error.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startBackgroundPolling = () => {
    console.log("Starting background polling for eSign completion...");
    
    // Clear any existing polling interval
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
    
    pollIntervalRef.current = setInterval(async () => {
      try {
        // Get the auth token for polling
        const authToken = Cookies.get('authToken');
        
        if (!authToken) {
          console.log("No auth token, stopping polling");
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          return;
        }
        
        console.log("Background polling for eSign completion...");
        
        // Check if eSign is completed by calling the correct checkpoint endpoint
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
          {
            step: "esign_complete"
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            },
          }
        );

        console.log("eSign completion check response:", response.status, response.data);

        // Check if we got a successful response with URL (even if empty, it means eSign is completed)
        if (response.status === 200 && response.data?.data?.url !== undefined) {
          // eSign completed successfully
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          
          console.log("eSign completed successfully! URL:", response.data.data.url);
          
          // Only show success toast if we haven't shown it already in this session
          if (!hasShownEsignSuccessToast) {
            toast.success("eSign completed successfully!");
            hasShownEsignSuccessToast = true;
          }
          
          // Close the eSign window if it's still open
          if (esignWindowRef.current && !esignWindowRef.current.closed) {
            esignWindowRef.current.close();
            esignWindowRef.current = null;
          }
          
          // Refetch eSign step to update the hook
          refetchStep(CheckpointStep.ESIGN);
          
          // Auto-advance after 2 seconds
          setTimeout(() => {
            onNext();
          }, 2000);
        }
      } catch (err: unknown) {
        const error = err as {
          response?: {
            data?: { message?: string; error?: { message?: string } };
            status?: number;
          };
        };

        console.log("eSign polling error:", error.response?.status, error.response?.data);

        // Handle specific eSign polling errors
        if (error.response?.status === 401) {
          // 401 means eSign not completed yet - continue polling
          console.log("eSign not completed yet (401), continuing to poll...");
          return;
        } else if (error.response?.status === 404) {
          // 404 means endpoint not found or no eSign record - continue polling
          console.log("eSign endpoint not found (404), continuing to poll...");
          return;
        } else if (error.response?.status === 500) {
          // 500 server error - continue polling for a bit
          console.log("Server error (500), continuing to poll...");
          return;
        }
        
        // For other critical errors, stop polling
        console.error("Critical eSign polling error:", err);
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
      }
    }, 2000); // Poll every 2 seconds

    // Stop polling after 15 minutes (timeout)
    setTimeout(() => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
        console.log("eSign polling timeout after 15 minutes");
      }
    }, 15 * 60 * 1000);
  };

  const handleEsignClick = () => {
    if (!esignUrl) {
      setError("eSign URL not available. Please try again.");
      return;
    }

    if (!isChecked) {
      toast.error("Please agree to receive communications via email to proceed.");
      return;
    }

    console.log("Opening eSign URL:", esignUrl);
    
    toast.success("Opening eSign...");
    
    // Open eSign in the same tab (this will navigate away from current page)
    window.location.href = esignUrl;
    
    // Alternative approach: Open in new tab and then close current tab
    // Uncomment the lines below and comment the line above if you prefer this approach
    /*
    const esignTab = window.open(esignUrl, '_blank');
    if (esignTab) {
      // Small delay to ensure the new tab opens, then close current tab
      setTimeout(() => {
        window.close();
      }, 1000);
    } else {
      toast.error("Please allow popups for this site and try again.");
    }
    */
  };

  const handleRetry = () => {
    setError(null);
    setEsignUrl(null);
    setIsInitialized(false);
    
    // Clear any existing polling
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    
    // Close any open eSign window
    if (esignWindowRef.current && !esignWindowRef.current.closed) {
      esignWindowRef.current.close();
      esignWindowRef.current = null;
    }
  };

  const shouldShowCompletedState = isStepCompleted(CheckpointStep.ESIGN);

  // Check if button should be disabled
  const isButtonDisabled = () => {
    if (shouldShowCompletedState) return false; // If completed, allow continue
    return !isChecked || !esignUrl; // Disable if checkbox not checked or no eSign URL
  };

  const getButtonText = () => {
    if (shouldShowCompletedState) return "Continue";
    if (!isChecked) return "Please accept ECN to proceed";
    if (!esignUrl) return "Loading eSign...";
    return "Proceed to E-sign";
  };

  // Show initialization loading
  if (!isInitialized && isLoading) {
    return (
      <div className="mx-auto p-4 -mt-28 sm:mt-10">
        <FormHeading
          title="Finish account set-up using Aadhar E-sign"
          description="Initializing eSign session..."
        />
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <span className="ml-3 text-gray-600">Setting up eSign...</span>
        </div>
      </div>
    );
  }

  // Show error state if initialization failed
  if (!isInitialized && error) {
    return (
      <div className="mx-auto p-4 mt-10">
        <FormHeading
          title="Finish account set-up using Aadhar E-sign"
          description="Failed to initialize eSign session."
        />
        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
        <Button
          onClick={handleRetry}
          variant="ghost"
          className="w-full py-6"
        >
          Try Again
        </Button>
      </div>
    );
  }

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
        onClick={shouldShowCompletedState ? onNext : handleEsignClick} 
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