import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";
import Cookies from 'js-cookie';
import { useCheckpoint, CheckpointStep } from '@/hooks/useCheckpoint';
import { toast } from "sonner";

interface AadhaarVerificationProps {
  onNext: () => void;
  initialData?: unknown;
  isCompleted?: boolean;
  panMaskedAadhaar?: string; // Masked Aadhaar from PAN verification
}


const AadhaarVerification = ({ 
  onNext, 
  isCompleted,
  panMaskedAadhaar
}: AadhaarVerificationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'initial' | 'digilocker_pending' | 'mismatch'>('initial');
  const [, setDigilockerUrl] = useState<string>('');
  const [, setIsPolling] = useState(false);
  const digilockerTabRef = useRef<Window | null>(null);
  
  // Aadhaar mismatch form state
  const [mismatchFormData, setMismatchFormData] = useState({
    full_name: '',
    dob: ''
  });
  const [isSubmittingMismatch, setIsSubmittingMismatch] = useState(false);
  const [mismatchInfo, setMismatchInfo] = useState<{
    pan_masked_aadhaar?: string;
    digilocker_masked_aadhaar?: string;
    requires_manual_review?: boolean;
  }>({});

  // Polling refs
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false); // Use ref to track polling state

  // Use the checkpoint hook to check for existing mismatch data
  const { 
    hasMismatchData, 
    getMismatchData, 
    isStepCompleted,
    getStepData,
    refetchStep 
  } = useCheckpoint();

  // Silent polling function - memoized to prevent recreation
  const checkAadhaarStatus = useCallback(async () => {
    if (!isPollingRef.current) return;

    try {
      const authToken = Cookies.get('authToken');
      
      if (!authToken) {
        console.log("No auth token, stopping polling");
        isPollingRef.current = false;
        setIsPolling(false);
        return;
      }
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "aadhaar"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      // If we get here, verification was successful
      console.log("Aadhaar verification successful via polling");
      isPollingRef.current = false;
      setIsPolling(false);
      
      // Close DigiLocker tab if it's still open
      if (digilockerTabRef.current && !digilockerTabRef.current.closed) {
        digilockerTabRef.current.close();
        digilockerTabRef.current = null;
      }
      
      // Check for Aadhaar mismatch
      if (response.data?.data?.requires_additional_verification) {
        setMismatchInfo({
          pan_masked_aadhaar: response.data.data.pan_masked_aadhaar || panMaskedAadhaar,
          digilocker_masked_aadhaar: response.data.data.digilocker_masked_aadhaar
        });
        setCurrentStep('mismatch');
        
        toast.warning("Aadhaar mismatch detected. Please provide additional details.");
        
        // Refetch the mismatch checkpoint to update the hook
        refetchStep(CheckpointStep.AADHAAR_MISMATCH_DETAILS);
        return;
      }

      // Reset to initial state but show success
      setCurrentStep('initial');
      
      toast.success("Aadhaar verified successfully via DigiLocker!");
      
      // Refetch the Aadhaar checkpoint to update the hook
      refetchStep(CheckpointStep.AADHAAR);
      
      setTimeout(() => {
        onNext();
      }, 100);

    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: { message?: string; error?: { message?: string } } } };
      
      if (error.response?.status === 401) {
        // DigiLocker not completed yet - continue polling silently
        console.log("DigiLocker verification not completed yet, continuing polling...");
        return;
      }

      // For other errors, continue polling silently but log the error
      console.warn("Polling error (continuing):", error);
    }
  }, [panMaskedAadhaar, onNext, refetchStep]);

  // Start polling - memoized to prevent recreation
  const startPolling = useCallback(() => {
    if (isPollingRef.current) return; // Prevent multiple polling instances
    
    console.log("Starting silent polling for Aadhaar verification");
    isPollingRef.current = true;
    setIsPolling(true);
    
    // Initial check after 4 seconds (give time for DigiLocker to be completed)
    pollingTimeoutRef.current = setTimeout(() => {
      checkAadhaarStatus();
      
      // Then poll every 3 seconds
      pollingIntervalRef.current = setInterval(() => {
        checkAadhaarStatus();
      }, 2500);
    }, 4000);
  }, [checkAadhaarStatus]);

  // Stop polling - memoized to prevent recreation
  const stopPolling = useCallback(() => {
    console.log("Stopping polling");
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
    
    // Close DigiLocker tab if it's still open
    if (digilockerTabRef.current && !digilockerTabRef.current.closed) {
      digilockerTabRef.current.close();
      digilockerTabRef.current = null;
    }
  }, []);

  // Check for existing states on component mount and start polling
  useEffect(() => {
    // Check if Aadhaar is already completed - only show toast once per session
    const aadhaarCompleted = isCompleted || isStepCompleted(CheckpointStep.AADHAAR);


    // Check if there's existing mismatch data in Redis
    if (hasMismatchData()) {
      const existingMismatchData = getMismatchData();
      console.log('Found existing mismatch data:', existingMismatchData);
      
      // Set mismatch info from the hook data
      setMismatchInfo({
        pan_masked_aadhaar: typeof existingMismatchData?.pan_masked_aadhaar === 'string'
          ? existingMismatchData.pan_masked_aadhaar
          : panMaskedAadhaar,
        digilocker_masked_aadhaar: typeof existingMismatchData?.digilocker_masked_aadhaar === 'string'
          ? existingMismatchData.digilocker_masked_aadhaar
          : undefined,
        requires_manual_review: typeof existingMismatchData?.requires_manual_review === 'boolean'
          ? existingMismatchData.requires_manual_review
          : undefined
      });
      
      // Go directly to mismatch form
      setCurrentStep('mismatch');
      return;
    }

    // If PAN data exists, get masked Aadhaar from it
    const panData = getStepData(CheckpointStep.PAN);
    if (panData?.masked_aadhaar && !panMaskedAadhaar) {
      // Update mismatch info with PAN masked Aadhaar
      setMismatchInfo(prev => ({
        ...prev,
        pan_masked_aadhaar: typeof panData.masked_aadhaar === 'string' ? panData.masked_aadhaar : undefined
      }));
    }

    // Start polling immediately when component mounts (if not already completed)
    if (!aadhaarCompleted) {
      startPolling();
    }

    // Cleanup polling on unmount
    return () => {
      stopPolling();
    };
  }, [
    isCompleted,
    isStepCompleted,
    hasMismatchData,
    getMismatchData,
    getStepData,
    panMaskedAadhaar,
    startPolling,
    stopPolling
  ]);

  // Step 1: Get DigiLocker URI (without redirect to prevent new tab opening)
  const handleGetDigilockerUri = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      
      if (!authToken) {
        toast.error("Authentication token not found. Please restart the process.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "aadhaar_uri",
          redirect: `https://sapphirebroking.com/signup`
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          }
        }
      );
      
      if (!response.data?.data?.uri) {
        toast.error("Failed to generate DigiLocker URI. Please try again.");
        return;
      }

      setDigilockerUrl(response.data.data.uri);
      setCurrentStep('digilocker_pending');
      
      toast.success("DigiLocker opened! Complete verification and we'll detect it automatically.");
      
      // Open DigiLocker in new tab and store reference
      digilockerTabRef.current = window.open(response.data.data.uri, '_blank');

      // Start polling if not already started
      if (!isPollingRef.current) {
        startPolling();
      }

    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string; error?: { message?: string } }; status?: number } };
      const errorMessage = 
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to initialize DigiLocker. Please try again.";
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Aadhaar mismatch form submission
  const handleMismatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingMismatch(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      
      if (!authToken) {
        toast.error("Authentication token not found. Please restart the process.");
        setIsSubmittingMismatch(false);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "aadhaar_mismatch_details",
          full_name: mismatchFormData.full_name,
          dob: mismatchFormData.dob
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      if (response.data?.message) {
        setMismatchInfo(prev => ({
          ...prev,
          requires_manual_review: response.data.data?.requires_manual_review
        }));
        
        // Reset to initial state
        setCurrentStep('initial');
        
        toast.success(
          response.data.data?.requires_manual_review
            ? "Details submitted! Manual review required due to name verification."
            : "Additional details submitted successfully!"
        );
        
        // Refetch both checkpoints to update the hook
        refetchStep(CheckpointStep.AADHAAR_MISMATCH_DETAILS);
        refetchStep(CheckpointStep.AADHAAR);
        
        // Auto-advance after 2 seconds
        setTimeout(() => {
          onNext();
        }, 3000);
      } else {
        toast.error("Failed to submit additional details. Please try again.");
      }

    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string; error?: { message?: string } }; status?: number } };
      const errorMessage = 
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to submit additional details. Please try again.";
      
      toast.error(errorMessage);
    } finally {
      setIsSubmittingMismatch(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setMismatchFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle continue/proceed button click
  const handleContinue = () => {
    // If already completed, just proceed to next step
    if (isCompleted || isStepCompleted(CheckpointStep.AADHAAR)) {
      onNext();
      return;
    }
    
    // Always start the DigiLocker process
    handleGetDigilockerUri();
  };

  const getButtonText = () => {
    if (isCompleted || isStepCompleted(CheckpointStep.AADHAAR)) {
      return "Continue to Next Step";
    }
    
    switch (currentStep) {
      case 'initial':
        return isLoading ? "Initializing DigiLocker..." : "Proceed to DigiLocker";
      case 'digilocker_pending':
        return "Reopen DigiLocker";
      case 'mismatch':
        return "Submit Additional Details";
      default:
        return "Proceed to DigiLocker";
    }
  };

  const isButtonDisabled = () => {
    if (isCompleted || isStepCompleted(CheckpointStep.AADHAAR)) {
      return false;
    }
    return isLoading;
  };

  // Show Aadhaar mismatch form
  if (currentStep === 'mismatch') {
    return (
      <div className="mx-auto pt-20">
        <FormHeading
          title={"Additional Verification Required"}
          description={"We detected a mismatch between your PAN and Aadhaar details. Please provide additional information to complete verification."}
        />

        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Aadhaar Mismatch Detected</h3>
              <p className="text-yellow-700 text-sm mb-2">
                The Aadhaar number linked to your PAN doesn&apos;t match the one from DigiLocker verification.
              </p>
              {(mismatchInfo.pan_masked_aadhaar || panMaskedAadhaar) && mismatchInfo.digilocker_masked_aadhaar && (
                <div></div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleMismatchSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name (as per Aadhaar) *
            </label>
            <input
              type="text"
              required
              value={mismatchFormData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name as per Aadhaar"
              disabled={isSubmittingMismatch}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth (as per Aadhaar) *
            </label>
            <input
              type="date"
              required
              value={mismatchFormData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmittingMismatch}
            />
          </div>

          <Button
            type="submit"
            variant="ghost"
            className={`w-full py-6 ${isSubmittingMismatch ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isSubmittingMismatch}
          >
            {isSubmittingMismatch ? "Submitting..." : "Submit Additional Details"}
          </Button>
        </form>

        <div className="text-center text-xs text-gray-600 mt-6">
          <p>Please ensure all details match exactly with your Aadhaar card.</p>
        </div>
      </div>
    );
  }

  // Always show the same UI - whether fresh or completed
  return (
    <div className="mx-auto pt-20">
      <FormHeading
        title={"Verify Aadhaar (DigiLocker)"}
        description={"Fast and easy Aadhaar-based verification."}
      />

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="flex items-start mb-4">
          <div className="bg-blue-100 p-2 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-sm md:text-base font-semibold text-blue-800 mb-1">
              Why DigiLocker?
            </h3>
            <p className="text-sm sm:text-xs md:text-sm text-blue-700">
              DigiLocker is a secure digital platform by the Government of India
              that allows you to access and share your documents easily.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-sm md:text-base font-semibold text-blue-800 mb-1">
              Benefits of DigiLocker
            </h3>
            <ul className="text-sm sm:text-xs md:text-sm text-blue-700 list-disc ml-4 space-y-1">
              <li>Faster verification with no manual paperwork</li>
              <li>Secure government-approved platform</li>
              <li>Instant KYC verification</li>
            </ul>
          </div>
        </div>
      </div>

    

      {/* Status indicator for pending verification (but no polling status shown) */}
      {currentStep === 'digilocker_pending' && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center mb-3">
            <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-blue-800 font-medium">DigiLocker Opened</p>
              <p className="text-blue-700 text-sm">Complete the verification in DigiLocker. We&apos;ll automatically detect when you&apos;re done!</p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleContinue}
        variant="ghost"
        className={`w-full py-6 mb-6 ${
          isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isButtonDisabled()}
      >
        {getButtonText()}
      </Button>

      <div className="hidden lg:block text-center text-sm text-gray-600 space-y-3">
        <p>I authorise Sapphire to fetch my KYC information from DigiLocker.</p>
      </div>
    </div>
  );
};

export default AadhaarVerification;