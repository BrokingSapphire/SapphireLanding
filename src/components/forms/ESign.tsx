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

// Global flag to track if completion toast has been shown in this session
let hasShownGlobalCompletedToast = false;

const LastStepPage: React.FC<LastStepPageProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [esignUrl, setEsignUrl] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const esignWindowRef = useRef<Window | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use the checkpoint hook to check for existing eSign data
  const { 
    isStepCompleted,
    // getStepData,
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


// Improved initialization with better error handling
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
    // Create redirect URL - this should be your app's URL where user returns after eSign
    const redirectUrl = `${window.location.origin}/signup?step=esign-complete`;

    // Get the auth token
    const authToken = Cookies.get('authToken');
    
    if (!authToken) {
      throw new Error("Authentication token not found. Please restart the process.");
    }

    console.log("Making API call to initialize eSign session...");

    // Initialize eSign session
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
        timeout: 30000, // 30 second timeout
      }
    );

    console.log("eSign initialization response:", response.data);

    if (response.data?.data?.uri) {
      console.log("eSign session initialized with URL:", response.data.data.uri);
      setEsignUrl(response.data.data.uri);
      setIsInitialized(true);
      
      // Show success message
      toast.success("eSign session initialized successfully!");
      
    } else if (response.data?.data?.status === 'already_completed') {
      // Handle case where eSign is already completed
      console.log("eSign already completed");
      setIsInitialized(true);
      toast.success("eSign already completed!");
      refetchStep(CheckpointStep.ESIGN);
      
    } else {
      throw new Error("Invalid response: eSign URL not provided");
    }
    
  } catch (err: unknown) {
    const error = err as {
      response?: {
        data?: { message?: string; error?: { message?: string } };
        status?: number;
      };
      request?: unknown;
      code?: string;
    };

    console.error("eSign initialization error:", err);
    
    let errorMessage = "An unexpected error occurred. Please try again.";
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = "Request timeout. Please check your connection and try again.";
    } else if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      if (data?.message) {
        errorMessage = data.message;
      } else if (data?.error?.message) {
        errorMessage = data.error.message;
      } else {
        switch (status) {
          case 400:
            errorMessage = "Invalid request. Please try again.";
            break;
          case 401:
            errorMessage = "Authentication failed. Please restart the process.";
            break;
          case 403:
            errorMessage = "Access denied. Please check your authentication and try again.";
            break;
          case 409:
            errorMessage = "eSign session already exists. Please refresh the page.";
            break;
          case 500:
            errorMessage = "Server error. Please try again in a few moments.";
            break;
          default:
            errorMessage = `Server error (${status}). Please try again.`;
        }
      }
    } else if (error.request) {
      errorMessage = "Network error. Please check your connection and try again.";
    }
    
    setError(errorMessage);
    toast.error(`eSign initialization failed: ${errorMessage}`);
    
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
  
  let pollAttempts = 0;
  const maxPollAttempts = 450; // 15 minutes with 2-second intervals
  
  pollIntervalRef.current = setInterval(async () => {
    pollAttempts++;
    
    try {
      // Get the auth token for polling
      const authToken = Cookies.get('authToken');
      
      if (!authToken) {
        console.log("No auth token, stopping polling");
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
        toast.error("Authentication expired. Please refresh the page.");
        return;
      }
      
      console.log(`Background polling attempt ${pollAttempts}/${maxPollAttempts} for eSign completion...`);
      
      // Check if eSign is completed
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

      // Check if we got a successful response
      if (response.status === 200) {
        const data = response.data?.data;
        
        // Check if eSign is completed successfully
        if (data?.status === 'completed' || data?.url !== undefined) {
          // eSign completed successfully
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          
          console.log("eSign completed successfully! Response:", data);
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
          
          return;
        }
        
        // Check if eSign failed
        if (data?.status === 'failed' || data?.error) {
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          
          console.error("eSign failed:", data);
          toast.error("eSign process failed. Please try again.");
          setError("eSign process failed. Please retry the process.");
          
          return;
        }
        
        // If status is 'pending' or 'in_progress', continue polling
        console.log("eSign still in progress, continuing to poll...");
      }
      
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { 
            message?: string; 
            error?: { message?: string };
            status?: string;
          };
          status?: number;
        };
      };

      console.log("eSign polling error:", error.response?.status, error.response?.data);

      // Handle specific eSign polling errors
      if (error.response?.status === 404) {
        // 404 might mean eSign session not found yet - continue polling for a bit
        console.log("eSign session not found (404), continuing to poll...");
        
        // But if we've been polling for too long, it might be a real error
        if (pollAttempts > 30) { // After 1 minute of 404s, something is wrong
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          console.error("eSign session not found after 1 minute of polling");
          toast.error("eSign session not found. Please try again.");
          setError("eSign session not found. Please retry the process.");
          return;
        }
        
      } else if (error.response?.status === 401) {
        // 401 might mean auth token expired
        console.log("Authentication error (401), stopping polling");
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
        toast.error("Authentication expired. Please refresh the page.");
        return;
        
      } else if (error.response?.status === 400) {
        // 400 might mean bad request - check if it indicates "not completed yet"
        const responseData = error.response.data;
        if (responseData?.message?.includes('not completed') || 
            responseData?.status === 'pending' ||
            responseData?.status === 'in_progress') {
          console.log("eSign not completed yet (400), continuing to poll...");
        } else {
          console.error("Bad request error (400):", responseData);
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          toast.error("eSign request error. Please try again.");
          setError("eSign request error. Please retry the process.");
          return;
        }
        
      } else if (error.response?.status === 500) {
        // 500 server error - continue polling for a few attempts
        console.log("Server error (500), continuing to poll...");
        
        // If we get too many server errors, stop polling
        if (pollAttempts > 50 && pollAttempts % 10 === 0) { // Every 10th attempt after 50
          toast.warning("Server experiencing issues. Still checking for eSign completion...");
        }
        
      } else {
        // For other errors, log and continue polling for a bit
        console.error("eSign polling error:", err);
        
        // If we get too many unknown errors, stop polling
        if (pollAttempts > 100) {
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          toast.error("Unable to check eSign status. Please refresh the page.");
          return;
        }
      }
    }
    
    // Check if we've exceeded max polling attempts
    if (pollAttempts >= maxPollAttempts) {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    }
    
  }, 2000); // Poll every 2 seconds
};

  const handleEsignClick = () => {
    if (!esignUrl) {
      setError("eSign URL not available. Please try again.");
      return;
    }

    console.log("Opening eSign URL:", esignUrl);

    // Open eSign URL in new window/tab
    const esignWindow = window.open(
      esignUrl,
      'esign',
      'width=800,height=600,scrollbars=yes,resizable=yes'
    );

    if (!esignWindow) {
      setError("Please allow popups for eSign to work. Then try again.");
      return;
    }

    // Store reference to the window
    esignWindowRef.current = esignWindow;

    // Optional: Monitor if the window is closed manually
    const checkClosed = setInterval(() => {
      if (esignWindow.closed) {
        clearInterval(checkClosed);
        esignWindowRef.current = null;
        console.log("eSign window was closed");
      }
    }, 1000);
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

  // Show initialization loading
  if (!isInitialized && isLoading) {
    return (
      <div className="mx-auto p-4 mt-10">
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
        onClick={handleEsignClick} 
        disabled={!esignUrl}
        className={`py-6 w-full ${
          !esignUrl ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Proceed to E-sign
      </Button>

      <div className="hidden sm:block mt-4 text-center text-xs text-gray-600">
        <p>
          Clicking the button will open eSign in a new window. 
          Complete the process there and this page will automatically proceed to the next step.
        </p>
      </div>
    </div>
  );
};

export default LastStepPage;