import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import FormHeading from "./FormHeading";
import Image from "next/image";
import axios from "axios";

interface LastStepPageProps {
  onNext: () => void;
  initialData?: any;
  isCompleted?: boolean;
}

const LastStepPage: React.FC<LastStepPageProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [esignStatus, setEsignStatus] = useState<'idle' | 'initializing' | 'signing' | 'completing' | 'completed'>('idle');

  // Prefill data from initialData (API response)
  useEffect(() => {
    if (isCompleted && initialData?.esign) {
      setEsignStatus('completed');
    }
  }, [initialData, isCompleted]);

  const handleEsignInitialize = async () => {
    setIsLoading(true);
    setError(null);
    setEsignStatus('initializing');

    try {
      // Create redirect URL - this should be your app's URL where user returns after eSign
      const redirectUrl = `${window.location.origin}/esign-callback`;

      // Initialize eSign session
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "esign_initialize",
          redirect_url: redirectUrl
        },
        {
          withCredentials: true
        }
      );

      if (response.data?.data?.uri) {
        setEsignStatus('signing');
        
        // Open eSign URL in new window/tab
        const esignWindow = window.open(
          response.data.data.uri,
          'esign',
          'width=800,height=600,scrollbars=yes,resizable=yes'
        );

        if (!esignWindow) {
          setError("Please allow popups for eSign to work. Then try again.");
          setEsignStatus('idle');
          setIsLoading(false);
          return;
        }

        // Start polling for completion
        startPollingForCompletion();
      } else {
        setError("Failed to initialize eSign. Please try again.");
        setEsignStatus('idle');
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.data?.message) {
          setError(`Error: ${err.response.data.message}`);
        } else if (err.response.data?.error?.message) {
          setError(`Error: ${err.response.data.error.message}`);
        } else if (err.response.status === 400) {
          setError("Invalid request. Please try again.");
        } else if (err.response.status === 401) {
          setError("Authentication failed. Please restart the process.");
        } else {
          setError(`Server error (${err.response.status}). Please try again.`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setEsignStatus('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const startPollingForCompletion = () => {
    const pollInterval = setInterval(async () => {
      try {
        setEsignStatus('completing');
        
        // Check if eSign is completed
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
          {
            step: "esign_complete"
          },
          {
            withCredentials: true
          }
        );

        if (response.status === 200) {
          // eSign completed successfully
          clearInterval(pollInterval);
          setEsignStatus('completed');
          setIsLoading(false);
          
          // Small delay before proceeding to next step
          setTimeout(() => {
            onNext();
          }, 2000);
        }
      } catch (err: any) {
        // If error is 401 (not completed yet), continue polling
        if (err.response?.status === 401) {
          setEsignStatus('signing'); // Reset to signing state
          return;
        }
        
        // For other errors, stop polling and show error
        clearInterval(pollInterval);
        setEsignStatus('idle');
        setIsLoading(false);
        
        if (err.response?.data?.message) {
          setError(`eSign error: ${err.response.data.message}`);
        } else {
          setError("eSign verification failed. Please try again.");
        }
      }
    }, 3000); // Poll every 3 seconds

    // Stop polling after 10 minutes (timeout)
    setTimeout(() => {
      clearInterval(pollInterval);
      if (esignStatus === 'signing' || esignStatus === 'completing') {
        setEsignStatus('idle');
        setIsLoading(false);
        setError("eSign session timed out. Please try again.");
      }
    }, 10 * 60 * 1000);
  };

  const handleRetry = () => {
    setError(null);
    setEsignStatus('idle');
    setIsLoading(false);
  };

  const getButtonText = () => {
    switch (esignStatus) {
      case 'initializing':
        return "Initializing eSign...";
      case 'signing':
        return "Complete eSign in the opened window";
      case 'completing':
        return "Verifying eSign completion...";
      case 'completed':
        return "eSign Completed!";
      default:
        return isCompleted ? "Continue" : "Proceed to E-sign";
    }
  };

  const isButtonDisabled = () => {
    return isLoading || esignStatus === 'signing' || esignStatus === 'completing';
  };

  const handleButtonClick = () => {
    if (isCompleted || esignStatus === 'completed') {
      onNext();
    } else {
      handleEsignInitialize();
    }
  };

  // Show completed state
  if (isCompleted && esignStatus === 'completed') {
    return (
      <div className="mx-auto p-4 mt-10">
        <FormHeading
          title="eSign Completed Successfully!"
          description="Your documents have been digitally signed and verified."
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
          onClick={handleButtonClick} 
          className="py-6 w-full"
        >
          Continue to Next Step
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

      {/* Status indicators */}
      {esignStatus === 'signing' && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
            <div>
              <h3 className="text-blue-800 font-medium">eSign Window Opened</h3>
              <p className="text-blue-700 text-sm">Please complete the eSign process in the opened window.</p>
            </div>
          </div>
        </div>
      )}

      {esignStatus === 'completing' && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-3"></div>
            <div>
              <h3 className="text-yellow-800 font-medium">Verifying eSign</h3>
              <p className="text-yellow-700 text-sm">Please wait while we verify your digital signature...</p>
            </div>
          </div>
        </div>
      )}

      {esignStatus === 'completed' && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-green-800 font-medium">eSign Completed!</h3>
              <p className="text-green-700 text-sm">Proceeding to the next step...</p>
            </div>
          </div>
        </div>
      )}
      
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
        onClick={handleButtonClick} 
        disabled={isButtonDisabled()}
        className={`py-6 w-full ${
          isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {getButtonText()}
      </Button>

      {esignStatus === 'signing' && (
        <div className="mt-4 text-center text-xs text-gray-600">
          <p>
            If the eSign window doesn't open, please check your popup blocker settings.
            The process will timeout after 10 minutes.
          </p>
        </div>
      )}
    </div>
  );
};

export default LastStepPage;