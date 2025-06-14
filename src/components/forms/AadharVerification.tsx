import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";

interface DigiLockerVerificationProps {
  onNext: () => void;
  initialData?: any;
  isCompleted?: boolean;
  panMaskedAadhaar?: string; // Masked Aadhaar from PAN verification
}

const DigiLockerVerification = ({ 
  onNext, 
  initialData, 
  isCompleted, 
  panMaskedAadhaar 
}: DigiLockerVerificationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'initial' | 'digilocker_pending' | 'verifying' | 'completed' | 'mismatch'>('initial');
  const [digilockerUrl, setDigilockerUrl] = useState<string>('');
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Aadhaar mismatch form state
  const [mismatchFormData, setMismatchFormData] = useState({
    fullName: '',
    fatherName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    pincode: ''
  });
  const [isSubmittingMismatch, setIsSubmittingMismatch] = useState(false);

  // REMOVED: Auto-advance logic when completed
  // Set completed state but don't automatically advance
  useEffect(() => {
    if (isCompleted) {
      setCurrentStep('completed');
      // REMOVED: Auto-advance timer
    }
  }, [isCompleted]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // Step 1: Get DigiLocker URI
  const handleGetDigilockerUri = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "aadhaar_uri",
          redirect: "https://sapphirebroking.com/signup"
        }
      );

      if (!response.data?.data?.uri) {
        setError("Failed to generate DigiLocker URI. Please try again.");
        return;
      }

      setDigilockerUrl(response.data.data.uri);
      setCurrentStep('digilocker_pending');
      
      // Open DigiLocker in new tab
      window.open(response.data.data.uri, '_blank');
      
      // Start polling for completion
      startPolling();

    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.response?.status === 400) {
        setError("Invalid request. Please try again.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please restart the process.");
      } else {
        setError("Failed to initialize DigiLocker. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Poll for DigiLocker completion and verify
  const startPolling = () => {
    const interval = setInterval(async () => {
      await checkDigilockerCompletion();
    }, 3000); // Poll every 3 seconds

    setPollingInterval(interval);

    // Stop polling after 10 minutes
    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
        setPollingInterval(null);
        if (currentStep === 'digilocker_pending') {
          setError("DigiLocker verification timed out. Please try again.");
          setCurrentStep('initial');
        }
      }
    }, 10 * 60 * 1000); // 10 minutes
  };

  const checkDigilockerCompletion = async () => {
    try {
      setCurrentStep('verifying');
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "aadhaar"
        }
      );

      // If we get here, verification was successful
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }

      // Check for Aadhaar mismatch
      const digilockerMaskedAadhaar = response.data?.data?.masked_aadhaar;
      
      if (panMaskedAadhaar && digilockerMaskedAadhaar && panMaskedAadhaar !== digilockerMaskedAadhaar) {
        // Aadhaar mismatch detected
        setCurrentStep('mismatch');
        return;
      }

      if (response.data?.data?.requires_additional_verification) {
        // Handle other verification requirements
        setError("Aadhaar verification requires additional details.");
        setCurrentStep('initial');
        return;
      }

      setCurrentStep('completed');
      
      // REMOVED: Auto-advance timer
      // Wait for user to manually click continue

    } catch (err: any) {
      if (err.response?.status === 401) {
        // DigiLocker not completed yet, continue polling
        setCurrentStep('digilocker_pending');
        return;
      }

      // Other errors - stop polling and show error
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }

      if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError("Failed to verify DigiLocker completion. Please try again.");
      }
      
      setCurrentStep('initial');
    }
  };

  // Handle Aadhaar mismatch form submission
  const handleMismatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingMismatch(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "aadhaar_mismatch_details",
          ...mismatchFormData
        }
      );

      if (response.data?.success) {
        setCurrentStep('completed');
        // REMOVED: Auto-advance timer
      } else {
        setError("Failed to submit additional details. Please try again.");
      }

    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError("Failed to submit additional details. Please try again.");
      }
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

  const handleRetry = () => {
    setError(null);
    setCurrentStep('initial');
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 'initial':
        return isLoading ? "Initializing DigiLocker..." : "Proceed to DigiLocker";
      case 'digilocker_pending':
        return "Waiting for DigiLocker completion...";
      case 'verifying':
        return "Verifying Aadhaar...";
      case 'completed':
        return "Continue"; // Changed from "Verified ✓"
      case 'mismatch':
        return "Submit Additional Details";
      default:
        return "Proceed to DigiLocker";
    }
  };

  const isButtonDisabled = () => {
    return isLoading || currentStep === 'digilocker_pending' || currentStep === 'verifying';
  };

  // Handle continue for completed state
  const handleContinue = () => {
    if (currentStep === 'completed') {
      onNext();
      return;
    }
    handleGetDigilockerUri();
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
              <p className="text-yellow-700 text-sm">
                The Aadhaar number linked to your PAN doesn't match the one from DigiLocker verification. 
                Please provide the correct details below to proceed.
              </p>
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
              value={mismatchFormData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Father's Name *
            </label>
            <input
              type="text"
              required
              value={mismatchFormData.fatherName}
              onChange={(e) => handleInputChange('fatherName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter father's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              required
              value={mismatchFormData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              required
              value={mismatchFormData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address (as per Aadhaar) *
            </label>
            <textarea
              required
              value={mismatchFormData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter complete address"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode *
            </label>
            <input
              type="text"
              required
              pattern="[0-9]{6}"
              value={mismatchFormData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit pincode"
              maxLength={6}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 rounded border border-red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

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

  // Show completed state - but don't auto-advance
  if (currentStep === 'completed') {
    return (
      <div className="mx-auto pt-20">
        <FormHeading
          title={"Aadhaar Verified Successfully!"}
          description={"Your DigiLocker verification is complete. Click continue to proceed."}
        />

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">Aadhaar verified successfully via DigiLocker!</span>
          </div>
        </div>

        <Button
          onClick={handleContinue}
          className="w-full"
          variant="ghost"
        >
          Continue to Next Step
        </Button>
      </div>
    );
  }

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

      {/* Status indicator for pending verification */}
      {currentStep === 'digilocker_pending' && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-3"></div>
            <div>
              <p className="text-yellow-800 font-medium">Waiting for DigiLocker completion</p>
              <p className="text-yellow-700 text-sm">Please complete the verification in the DigiLocker tab</p>
            </div>
          </div>
          {digilockerUrl && (
            <button
              onClick={() => window.open(digilockerUrl, '_blank')}
              className="mt-3 text-blue-600 hover:text-blue-700 text-sm underline"
            >
              Reopen DigiLocker Tab
            </button>
          )}
        </div>
      )}

      {/* Status indicator for verification */}
      {currentStep === 'verifying' && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
            <div>
              <p className="text-blue-800 font-medium">Verifying your Aadhaar details</p>
              <p className="text-blue-700 text-sm">Please wait while we process your information</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded border border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
          {currentStep !== 'digilocker_pending' && currentStep !== 'verifying' && (
            <button
              onClick={handleRetry}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm underline"
            >
              Try Again
            </button>
          )}
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

      <div className="text-center text-xs text-gray-600 mt-8 sm:mt-0 md:mt-8 space-y-3">
        <p>I authorise Sapphire to fetch my KYC information from DigiLocker.</p>
        <p>
          If you are looking to open a HUF, Corporate, Partnership, or NRI
          account, you have to{" "}
          <span className="text-blue-400 cursor-pointer">click here.</span>
        </p>
      </div>
    </div>
  );
};

export default DigiLockerVerification;