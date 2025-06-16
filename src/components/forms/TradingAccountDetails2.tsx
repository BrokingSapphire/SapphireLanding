import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";
import Cookies from "js-cookie";

interface TradingAccountDetails2Props {
  onNext: () => void;
  initialData?: unknown;
  isCompleted?: boolean;
}

const occupationOptions = [
  "Business",
  "Housewife",
  "Student",
  "Professional",
  "Private Sector",
  "Government Service",
  "Agriculturist",
  "Public Sector",
  "Retired",
  "Others",
];

const TradingAccountDetails2: React.FC<TradingAccountDetails2Props> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [occupation, setOccupation] = useState("");
  const [isPoliticallyExposed, setIsPoliticallyExposed] = useState<boolean | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Prefill data from initialData (API response)
  useEffect(() => {
    const data = initialData as {
      occupation?: string;
      is_politically_exposed?: boolean;
    } | undefined;

    if (isCompleted && data) {
      setOccupation(data.occupation || "");
      setIsPoliticallyExposed(data.is_politically_exposed ?? null);
    }
  }, [initialData, isCompleted]);

  const handleOccupationSelect = (selected: string) => {
    if (isSubmitting) return;
    setOccupation(selected);
    setShowValidation(false);
    setError(null);
  };

  const handlePoliticallyExposedChange = (value: boolean) => {
    if (isSubmitting) return;
    setIsPoliticallyExposed(value);
    setShowValidation(false);
    setError(null);
  };

  const validateForm = () => {
    const isValid = occupation !== "" && isPoliticallyExposed !== null;
    setShowValidation(!isValid);
    return isValid;
  };

  // Map frontend occupation values to API values - Fixed to match backend validation
  const mapOccupationToApi = (occupation: string): string => {
    const occupationMapping: Record<string, string> = {
      "Business": "self employed",           // Fixed: was "business"
      "Housewife": "housewife",             // Kept same
      "Student": "student",                 // Kept same
      "Professional": "private sector",     // Fixed: was "professional"
      "Private Sector": "private sector",   // Fixed: was "private_sector"
      "Government Service": "govt servant", // Fixed: was "government_service"
      "Agriculturist": "agriculturalist",   // Fixed: was "agriculturist"
      "Public Sector": "govt servant",      // Fixed: was "public_sector"
      "Retired": "retired",                 // Kept same
      "Others": "other"                     // Fixed: was "others"
    };
    return occupationMapping[occupation] || "other";
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    if (isCompleted) {
      onNext();
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "other_detail",
          occupation: mapOccupationToApi(occupation),
          politically_exposed: isPoliticallyExposed,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authToken")}` 
          }
        }
      );

      if (!response.data) {
        setError("Failed to save other details. Please try again.");
        return;
      }

      onNext();
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { message?: string };
          status?: number;
        };
      };

      if (error.response?.data?.message) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.response?.status === 400) {
        setError("Invalid details. Please check and try again.");
      } else if (error.response?.status === 401) {
        setError("Authentication failed. Please restart the process.");
      } else {
        setError("Failed to save details. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = occupation !== "" && isPoliticallyExposed !== null;

  const getButtonText = () => {
    if (isCompleted) return "Continue";
    if (isSubmitting) return "Saving...";
    return "Continue";
  };

  const isButtonDisabled = () => {
    if (isSubmitting) return true;
    if (isCompleted) return false;
    return !isFormValid;
  };

  // Show completed state
  if (isCompleted) {
    return (
      <div className="mx-auto mt-14">
        <FormHeading
          title={"Other Details Saved Successfully!"}
          description={"Your other details have been saved. Click continue to proceed."}
        />

        <div className="mb-6">
          <label className="block mb-2">
            Occupation<span className="text-red-500">*</span>
          </label>
          <div className="p-3 bg-green-50 border border-green-300 rounded">
            <span className="text-green-800 font-medium">{occupation}</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Are you a politically exposed person?
            <span className="text-red-500">*</span>
          </label>
          <div className="p-3 bg-green-50 border border-green-300 rounded">
            <span className="text-green-800 font-medium">
              {isPoliticallyExposed ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">Other details saved successfully!</span>
          </div>
        </div>

        <Button
          variant={"ghost"}
          onClick={handleSubmit}
          className="w-full py-6"
        >
          Continue to Next Step
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-14">
      <FormHeading
        title={"Other Details"}
        description={"Provide additional information for your trading account."}
      />

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2">
            Occupation<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {occupationOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOccupationSelect(option)}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded border transition-colors text-sm
                  ${
                    occupation === option
                      ? "border-teal-800 bg-teal-50 text-teal-800"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {option}
              </button>
            ))}
          </div>
          {showValidation && !occupation && (
            <p className="text-red-500 text-sm mt-1">
              Please select your occupation
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Are you a politically exposed person?
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label
              className={`flex items-center ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <input
                type="radio"
                className="w-4 h-4 text-teal-800 border-gray-300 focus:ring-teal-800"
                checked={isPoliticallyExposed === true}
                onChange={() => handlePoliticallyExposedChange(true)}
                disabled={isSubmitting}
              />
              <span className={`ml-2 ${isSubmitting ? "opacity-50" : ""}`}>
                Yes
              </span>
            </label>
            <label
              className={`flex items-center ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <input
                type="radio"
                className="w-4 h-4 text-teal-800 border-gray-300 focus:ring-teal-800"
                checked={isPoliticallyExposed === false}
                onChange={() => handlePoliticallyExposedChange(false)}
                disabled={isSubmitting}
              />
              <span className={`ml-2 ${isSubmitting ? "opacity-50" : ""}`}>
                No
              </span>
            </label>
          </div>
          {showValidation && isPoliticallyExposed === null && (
            <p className="text-red-500 text-sm mt-1">Please select an option</p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 rounded">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Button
          variant={"ghost"}
          type="submit"
          disabled={isButtonDisabled()}
          className={`w-full py-6 ${
            isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {getButtonText()}
        </Button>
      </form>
    </div>
  );
};

export default TradingAccountDetails2;