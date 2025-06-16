import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";
import Cookies from "js-cookie";
interface TradingAccountDetailsProps {
  onNext: () => void;
  initialData?: any;
  isCompleted?: boolean;
}

interface TradingAccountFormData {
  fatherSpouseName: string;
  motherName: string;
  maidenName: string; // Optional field
}

interface FormErrors {
  fatherSpouseName: boolean;
  motherName: boolean;
}

const initialFormData: TradingAccountFormData = {
  fatherSpouseName: "",
  motherName: "",
  maidenName: "",
};

const initialErrors: FormErrors = {
  fatherSpouseName: false,
  motherName: false,
};

const TradingAccountDetails: React.FC<TradingAccountDetailsProps> = ({
  onNext,
  initialData,
  isCompleted,
}) => {
  const [formData, setFormData] = useState<TradingAccountFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill data from initialData (API response)
  useEffect(() => {
    if (isCompleted && initialData) {
      setFormData({
        fatherSpouseName: initialData.father_spouse_name || "",
        motherName: initialData.mother_name || "",
        maidenName: initialData.maiden_name || "",
      });
    }
  }, [initialData, isCompleted]);

  const validateForm = () => {
    const newErrors = {
      fatherSpouseName: !formData.fatherSpouseName.trim(),
      motherName: !formData.motherName.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleInputChange = (
    field: keyof TradingAccountFormData,
    value: string
  ) => {
    if (isSubmitting) return;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
    
    setError(null);
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
    const token = Cookies.get('authToken');
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "user_detail",
          father_spouse_name: formData.fatherSpouseName.trim(),
          mother_name: formData.motherName.trim(),
          maiden_name: formData.maidenName.trim() || undefined,
        },
        {
          headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (!response.data) {
        setError("Failed to save parent details. Please try again.");
        return;
      }

      onNext();
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.response?.status === 400) {
        setError("Invalid details. Please check and try again.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please restart the process.");
      } else {
        setError("Failed to save details. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.fatherSpouseName.trim() && formData.motherName.trim();

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
      <div className="mx-auto mt-10">
        <FormHeading
          title={"Parent Details Saved Successfully!"}
          description={"Your parent details have been saved. Click continue to proceed."}
        />

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Father's/Spouse Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-green-300 bg-green-50 rounded focus:outline-none"
            value={formData.fatherSpouseName}
            disabled
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Mother's Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-green-300 bg-green-50 rounded focus:outline-none"
            value={formData.motherName}
            disabled
          />
        </div>

        {formData.maidenName && (
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Maiden Name (Optional)</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-green-300 bg-green-50 rounded focus:outline-none"
              value={formData.maidenName}
              disabled
            />
          </div>
        )}

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">Parent details saved successfully!</span>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full py-6"
          variant="ghost"
        >
          Continue to Next Step
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <FormHeading
        title={"Parent Details"}
        description={"Provide your parent/spouse information for KYC verification."}
      />

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2">
            Father's/Spouse Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter father's or spouse's full name"
            value={formData.fatherSpouseName}
            onChange={(e) => handleInputChange("fatherSpouseName", e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.fatherSpouseName && (
            <p className="text-red-500 text-sm mt-1">
              Please enter father's or spouse's name
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Mother's Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your mother's full name"
            value={formData.motherName}
            onChange={(e) => handleInputChange("motherName", e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.motherName && (
            <p className="text-red-500 text-sm mt-1">
              Please enter your mother's name
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Maiden Name (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter maiden name if applicable"
            value={formData.maidenName}
            onChange={(e) => handleInputChange("maidenName", e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
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

        <div className="mt-6 text-sm text-gray-600">
          <p className="">
            This information is required for KYC verification and will be kept
            confidential in accordance with our privacy policy.
          </p>
        </div>
      </form>
    </div>
  );
};

export default TradingAccountDetails;