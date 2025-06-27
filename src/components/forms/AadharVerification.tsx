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

const AadhaarVerification = ({ 
  onNext, 
  isCompleted,
  panMaskedAadhaar
}: AadhaarVerificationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'initial' | 'digilocker_pending' | 'mismatch'>('initial');
  const [digilockerUrl, setDigilockerUrl] = useState<string>('');
  const [, setIsPolling] = useState(false);
  const digilockerWindowRef = useRef<Window | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const windowCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // ENHANCED: Robust full_name retrieval with multiple fallback sources
  const getFullNameFromStorage = () => {
    // Try multiple sources for full_name
    const sources = [
      localStorage.getItem("full_name"),
    ];
    
    for (const source of sources) {
      if (source && source.trim()) {
        console.log("Found full_name from storage:", source);
        return source.trim();
      }
    }
    
    console.log("No full_name found in storage, using empty string");
    return "";
  };

  // Aadhaar mismatch form state with enhanced full_name handling
  const [mismatchFormData, setMismatchFormData] = useState({
    full_name: getFullNameFromStorage(),
    dob: ''
  });
  
  const [isSubmittingMismatch, setIsSubmittingMismatch] = useState(false);
  const [mismatchInfo, setMismatchInfo] = useState<{
    pan_masked_aadhaar?: string;
    digilocker_masked_aadhaar?: string;
    requires_manual_review?: boolean;
  }>({});

  // Use the checkpoint hook to check for existing mismatch data
  const { 
    hasMismatchData, 
    getMismatchData, 
    isStepCompleted,
    getStepData,
    refetchStep 
  } = useCheckpoint();

  // Add message listener for popup communication
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CLOSE_POPUP' || event.data?.type === 'DIGILOCKER_COMPLETED') {
        console.log("Received close/completion message from DigiLocker popup");
        cleanupPopup();
        
        // If it's a completion message, trigger a check
        if (event.data?.type === 'DIGILOCKER_COMPLETED') {
          setTimeout(() => {
            refetchStep(CheckpointStep.AADHAAR);
          }, 1000);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [refetchStep]);

  const cleanupPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  const cleanupPopup = () => {
    // Close popup window if still open
    if (digilockerWindowRef.current && !digilockerWindowRef.current.closed) {
      try {
        digilockerWindowRef.current.close();
      } catch (error) {
        console.log("Error closing popup:", error);
      }
      digilockerWindowRef.current = null;
    }
    
    // Clear window check interval
    if (windowCheckIntervalRef.current) {
      clearInterval(windowCheckIntervalRef.current);
      windowCheckIntervalRef.current = null;
    }
  };

  // Start background polling after DigiLocker window opens
  const startBackgroundPolling = () => {
    console.log("Starting background polling for Aadhaar completion...");
    
    // Clear any existing polling interval
    cleanupPolling();
    
    pollIntervalRef.current = setInterval(async () => {
      try {
        // Get the auth token for polling
        const authToken = Cookies.get('authToken');
        
        if (!authToken) {
          console.log("No auth token, stopping polling");
          cleanupPolling();
          return;
        }
        
        console.log("Background polling for Aadhaar completion...");
        
        // Step 1: First call the POST complete API to trigger completion check
        try {
          const completeResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
            {
              step: "aadhaar"
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
              },
            }
          );
          console.log("Aadhaar POST complete response:", completeResponse.status, completeResponse.data);
          
          // Check if POST returns success (Aadhaar completed)
          if (completeResponse.status === 200) {
            // Check for mismatch in response
            if (completeResponse.data?.data?.requires_additional_verification) {
              cleanupPolling();
              setMismatchInfo({
                pan_masked_aadhaar: completeResponse.data.data.pan_masked_aadhaar || panMaskedAadhaar,
                digilocker_masked_aadhaar: completeResponse.data.data.digilocker_masked_aadhaar
              });
              setCurrentStep('mismatch');
              toast.warning("Aadhaar mismatch detected. Please provide additional details.");
              refetchStep(CheckpointStep.AADHAAR_MISMATCH_DETAILS);
              cleanupPopup();
              return;
            } else {
              // Aadhaar completed successfully
              cleanupPolling();
              console.log("Aadhaar completed successfully!");
              toast.success("Aadhaar verification completed successfully!");
              cleanupPopup();
              refetchStep(CheckpointStep.AADHAAR);
              setTimeout(() => {
                onNext();
              }, 1500);
              return;
            }
          }
        } catch (completeError) {
          const err = completeError as {
            response?: {
              status?: number;
              data?: any;
            };
          };
          console.log("Aadhaar POST complete error:", err.response?.status, err.response?.data);
          
          // If POST complete fails with 401, Aadhaar is not ready yet - continue polling
          if (err.response?.status === 401) {
            console.log("Aadhaar not ready yet, continuing to poll...");
            return;
          }
        }

        // Step 2: Also check using GET API (same as useCheckpoint) as fallback
        try {
          const statusResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint/aadhaar`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`
              },
            }
          );

          console.log("Aadhaar GET status check response:", statusResponse.status, statusResponse.data);

          if (statusResponse.status === 200 && statusResponse.data?.data) {
            // Aadhaar completed successfully via GET
            cleanupPolling();
            console.log("Aadhaar completed successfully detected by GET polling!");
            toast.success("Aadhaar verification completed successfully!");
            cleanupPopup();
            refetchStep(CheckpointStep.AADHAAR);
            setTimeout(() => {
              onNext();
            }, 1500);
          }
        } catch (getError) {
          const err = getError as {
            response?: {
              status?: number;
              data?: any;
            };
          };
          console.log("Aadhaar GET status error:", err.response?.status);
          // Continue polling on GET errors
        }
        
      } catch (err: unknown) {
        console.error("Critical Aadhaar polling error:", err);
        // Continue polling on other errors
      }
    }, 2000); // Poll every 2 seconds

    // Stop polling after 7 minutes (timeout)
    setTimeout(() => {
      cleanupPolling();
      console.log("Aadhaar polling timeout after 7 minutes");
    }, 7 * 60 * 1000);
  };

  // ENHANCED: Monitor localStorage changes and update full_name
  useEffect(() => {
    const checkForFullName = () => {
      const currentFullName = getFullNameFromStorage();
      if (currentFullName && currentFullName !== mismatchFormData.full_name) {
        console.log("Updating full_name from storage:", currentFullName);
        setMismatchFormData(prev => ({
          ...prev,
          full_name: currentFullName
        }));
      }
    };

    // Check immediately
    checkForFullName();

    // Set up interval to periodically check for full_name updates
    const fullNameCheckInterval = setInterval(checkForFullName, 1000);

    // Listen for storage events (when localStorage changes in other tabs/components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'full_name' && e.newValue) {
        console.log("full_name updated via storage event:", e.newValue);
        setMismatchFormData(prev => ({
          ...prev,
          full_name: e.newValue || ""
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(fullNameCheckInterval);
      window.removeEventListener('storage', handleStorageChange);
      cleanupPolling();
      cleanupPopup();
    };
  }, [mismatchFormData.full_name]);

  // ENHANCED: Also get full_name from PAN step data if available
  useEffect(() => {
    const panData = getStepData(CheckpointStep.PAN);
    if (panData?.full_name && typeof panData.full_name === 'string') {
      const panFullName = panData.full_name.trim();
      console.log("Found full_name from PAN step data:", panFullName);
      
      // Save to localStorage for future use
      localStorage.setItem("full_name", panFullName);
      
      // Update form data if current full_name is empty or different
      if (!mismatchFormData.full_name || mismatchFormData.full_name !== panFullName) {
        setMismatchFormData(prev => ({
          ...prev,
          full_name: panFullName
        }));
      }
    }
  }, [getStepData, mismatchFormData.full_name]);

  // Check for existing states on component mount
  useEffect(() => {
    // Check if Aadhaar is already completed
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

    // Cleanup on unmount
    return () => {
      cleanupPolling();
      cleanupPopup();
    };
  }, [
    isCompleted,
    isStepCompleted,
    hasMismatchData,
    getMismatchData,
    getStepData,
    panMaskedAadhaar
  ]);

  // UPDATED: Enhanced DigiLocker URI handler with popup window
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

      // Create redirect URL to success page
      const redirectUrl = `${window.location.origin}/signup/digilocker-success`;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "aadhaar_uri",
          redirect: redirectUrl
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
      
      // Open DigiLocker in popup window instead of same tab
      const digilockerWindow = window.open(
        response.data.data.uri,
        'digilocker',
        'width=800,height=600,scrollbars=yes,resizable=yes,location=yes,menubar=no,toolbar=no,status=no'
      );

      if (!digilockerWindow) {
        toast.error("Please allow popups for DigiLocker to work. Then try again.");
        setCurrentStep('initial');
        return;
      }

      // Store reference to the window
      digilockerWindowRef.current = digilockerWindow;

      // Clear any existing window check interval
      if (windowCheckIntervalRef.current) {
        clearInterval(windowCheckIntervalRef.current);
      }

      // Monitor if the window is closed manually
      windowCheckIntervalRef.current = setInterval(() => {
        if (digilockerWindow.closed) {
          clearInterval(windowCheckIntervalRef.current!);
          windowCheckIntervalRef.current = null;
          digilockerWindowRef.current = null;
          console.log("DigiLocker window was closed");
        }
      }, 1000);

      // Start background polling
      startBackgroundPolling();

      toast.success("DigiLocker window opened. Complete the verification there.");

    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string; error?: { message?: string } }; status?: number } };
      const errorMessage = 
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to initialize DigiLocker. Please try again.";
      
      toast.error(errorMessage);
      setCurrentStep('initial');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Aadhaar mismatch form submission
  const handleMismatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mismatchFormData.full_name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    
    if (!mismatchFormData.dob) {
      toast.error("Please select your date of birth");
      return;
    }
    
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
          full_name: mismatchFormData.full_name.trim(),
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
        return isLoading ? "Opening DigiLocker..." : "Proceed to DigiLocker";
      case 'digilocker_pending':
        return "Proceed to DigiLocker";
      case 'mismatch':
        return "Submit Additional Details";
      default:
        return "Proceed to DigiLocker";
    }
  };

  const getButtonDisabled = () => {
    if (isCompleted || isStepCompleted(CheckpointStep.AADHAAR)) {
      return false;
    }
    return isLoading || !digilockerUrl;
  };

  // Show Aadhaar mismatch form
  if (currentStep === 'mismatch') {
    return (
      <div className="mx-auto -mt-28 sm:mt-0 pt-20">
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
            disabled={isSubmittingMismatch || !mismatchFormData.full_name.trim() || !mismatchFormData.dob}
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
    <div className="mx-auto -mt-28 sm:mt-0 pt-20">
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

      <Button
        onClick={handleContinue}
        variant="ghost"
        className={`w-full py-6 mb-6 ${
          getButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={getButtonDisabled()}
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