import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";
import Cookies from "js-cookie";

interface PANVerifyProps {
  onNext: () => void;
  initialData?: unknown;
  isCompleted?: boolean;
}

const PANVerify = ({ onNext, initialData, isCompleted }: PANVerifyProps) => {
  const [panNumber, setPanNumber] = useState("");
  const [, setFullName] = useState("");
  const [, setDob] = useState("");
  const [, setMaskedAadhaar] = useState("");
  const [errors, setErrors] = useState({
    pan: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill data from initialData (API response) - always editable
  useEffect(() => {
    const data = initialData as {
      pan_number?: string;
      full_name?: string;
      dob?: string;
      masked_aadhaar?: string;
    } | undefined;

    if (isCompleted && data) {
      // If step is completed, only prefill PAN number
      console.log("Prefilling PAN data:", data);
      setPanNumber(data.pan_number || "");
      // Store other data but don't show in UI
      setFullName(data.full_name || "");
      setDob(data.dob || "");
      setMaskedAadhaar(data.masked_aadhaar || "");
    }
  }, [initialData, isCompleted]);

  const validatePan = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();

    // Apply PAN pattern formatting: AAAAA1234A
    // First 5 characters must be letters
    const firstPart = value.slice(0, 5).replace(/[^A-Z]/g, "");

    // Next 4 characters must be numbers
    let middlePart = "";
    if (value.length > 5) {
      middlePart = value.slice(5, 9).replace(/[^0-9]/g, "");
    }

    // Last character must be a letter
    let lastPart = "";
    if (value.length > 9) {
      lastPart = value.slice(9, 10).replace(/[^A-Z]/g, "");
    }

    // Combine all parts
    const formattedPan = `${firstPart}${middlePart}${lastPart}`;

    if (formattedPan.length <= 10) {
      setPanNumber(formattedPan);
      setErrors((prev) => ({
        ...prev,
        pan: formattedPan.length === 10 && !validatePan(formattedPan),
      }));
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!validatePan(panNumber)) {
      setErrors({
        pan: !validatePan(panNumber),
      });
      setError("Please enter a valid PAN number");
      return;
    }

    // If already completed and PAN hasn't changed, just proceed to next step
    if (isCompleted && initialData) {
      const data = initialData as {
        pan_number?: string;
        full_name?: string;
        dob?: string;
        masked_aadhaar?: string;
      } | undefined;
      
      if (data?.pan_number === panNumber) {
        console.log("PAN unchanged, proceeding to next step without API call");
        onNext();
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      
      if (!authToken) {
        setError("Authentication token not found. Please restart the process.");
        setIsLoading(false);
        return;
      }

      console.log("Submitting PAN:", panNumber);

      // Call checkpoint API with PAN step
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "pan",
          pan_number: panNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      console.log("PAN submission response:", response.data);

      if (!response.data) {
        setError("Failed to verify PAN details. Please try again.");
        return;
      }

      onNext();
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { message?: string; error?: { message?: string } };
          status?: number;
        };
        request?: unknown;
      };

      console.error("PAN submission error:", err);

      if (error.response) {
        // Handle specific error messages from the server
        if (error.response.data?.message) {
          setError(`Error: ${error.response.data.message}`);
        } else if (error.response.data?.error?.message) {
          setError(`Error: ${error.response.data.error.message}`);
        } else if (error.response.status === 400) {
          setError("Invalid PAN details or request. Please check and try again.");
        } else if (error.response.status === 401) {
          setError("Authentication failed. Please restart the process.");
        } else if (error.response.status === 403) {
          setError("Access denied. Please check your authentication and try again.");
        } else if (error.response.status === 422) {
          setError("Invalid PAN format or PAN already exists.");
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

  // Get button text based on current state
  const getButtonText = () => {
    if (isLoading) return "Verifying PAN...";
    return "Continue";
  };

  // Determine if button should be disabled
  const isButtonDisabled = () => {
    if (isLoading) return true;
    return !validatePan(panNumber);
  };

  // Always show the same UI, just with prefilled PAN number if completed
  return (
    <div className="mx-auto max-w-full px-4">
      <FormHeading
        title={"Verify PAN to Continue"}
        description={"Secure your identity with PAN verification."}
      />

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">PAN Number</label>
        <input
          type="text"
          placeholder="AAAAA1234A"
          className={`w-full px-3 py-2 border ${
            errors.pan ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all`}
          value={panNumber}
          onChange={handlePanChange}
          maxLength={10}
          disabled={isLoading}
        />
        {errors.pan && (
          <p className="text-red-500 text-sm mt-1">
            Please enter a valid PAN number
          </p>
        )}
      
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        variant="ghost"
        className={`w-full py-6 ${
          isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
        } transition-opacity`}
        disabled={isButtonDisabled()}
      >
        {getButtonText()}
      </Button>

      <div className="mt-6 text-sm text-center text-gray-600">
        <p className="mb-4 text-center">
          By continuing, you agree to verify your PAN details with the Income
          Tax Department. Your PAN will be used for KYC verification purposes
          only.
        </p>
      </div>
    </div>
  );
};

export default PANVerify;