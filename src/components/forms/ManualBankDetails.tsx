import React, { useState } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { ArrowRight } from "lucide-react";
import axios from "axios";

interface ManualBankDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

interface FormData {
  ifscCode: string;
  accountNumber: string;
  accountType: string;
}

interface FormErrors {
  ifscCode?: string;
  accountNumber?: string;
  accountType?: string;
}

const ManualBankDetails: React.FC<ManualBankDetailsProps> = ({
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<FormData>({
    ifscCode: "",
    accountNumber: "",
    accountType: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase(), // Convert to uppercase for IFSC
    }));

    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
    setError(null);
  };

  const handleAccountTypeSelect = (accountType: string) => {
    setFormData((prev) => ({
      ...prev,
      accountType,
    }));

    // Clear error when user selects
    setErrors((prev) => ({
      ...prev,
      accountType: undefined,
    }));
    setError(null);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.ifscCode) {
      newErrors.ifscCode = "IFSC Code is required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC Code format";
    }

    if (!formData.accountNumber) {
      newErrors.accountNumber = "Account Number is required";
    } else if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) {
      newErrors.accountNumber = "Account Number should be between 9-18 digits";
    } else if (!/^\d+$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Account Number should contain only digits";
    }

    if (!formData.accountType) {
      newErrors.accountType = "Account Type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mapAccountTypeToApi = (accountType: string): string => {
    const mapping: Record<string, string> = {
      "Savings": "SAVINGS",
      "Current": "CURRENT"
    };
    return mapping[accountType] || accountType.toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "bank_validation",
          validation_type: "bank",
          bank: {
            account_number: formData.accountNumber,
            ifsc_code: formData.ifscCode,
            account_type: mapAccountTypeToApi(formData.accountType),
          }
        }
      );

      // If successful, proceed to next step
      onNext();
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.response?.status === 422) {
        setError("Bank account does not exist or invalid details provided.");
      } else if (err.response?.status === 400) {
        setError("Invalid bank details. Please check and try again.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please restart the process.");
      } else {
        setError("Failed to verify bank account. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 p-4">
      <FormHeading
        title="Bank Account Details"
        description="Seamlessly link your bank for smooth transactions."
      />

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="ifscCode" className="block text-sm font-medium">
            IFSC Code*
          </label>
          <input
            type="text"
            id="ifscCode"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full p-2 border rounded ${
              errors.ifscCode ? "border-red-500" : "border-gray-300"
            } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            placeholder="Enter IFSC Code (e.g., SBIN0001234)"
            maxLength={11}
          />
          {errors.ifscCode && (
            <p className="text-xs text-red-500">{errors.ifscCode}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="accountNumber" className="block text-sm font-medium">
            A/C Number*
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={(e) => {
              const { name, value } = e.target;
              // Only allow digits
              const numericValue = value.replace(/\D/g, '');
              setFormData((prev) => ({
                ...prev,
                [name]: numericValue,
              }));
              
              // Clear error when user starts typing
              setErrors((prev) => ({
                ...prev,
                [name]: undefined,
              }));
              setError(null);
            }}
            disabled={isSubmitting}
            className={`w-full p-2 border rounded ${
              errors.accountNumber ? "border-red-500" : "border-gray-300"
            } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            placeholder="Enter Account Number"
            maxLength={18}
          />
          {errors.accountNumber && (
            <p className="text-xs text-red-500">{errors.accountNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="accountType" className="block text-sm font-medium">
            Account Type*
          </label>
          <div className="flex gap-3">
            <div 
              onClick={() => !isSubmitting && handleAccountTypeSelect("Savings")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm hover:border-gray-400 cursor-pointer ${
                formData.accountType === "Savings"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Savings
            </div>

            <div 
              onClick={() => !isSubmitting && handleAccountTypeSelect("Current")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm hover:border-gray-400 cursor-pointer ${
                formData.accountType === "Current"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Current
            </div>
          </div>
          {errors.accountType && (
            <p className="text-xs text-red-500">{errors.accountType}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 rounded border border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <Button
            type="button"
            variant="link"
            onClick={onBack}
            disabled={isSubmitting}
            className="hidden text-blue-500 sm:flex items-center"
          >
            Link via UPI <ArrowRight className="ml-1 h-4 w-4" />
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-900 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Verifying..." : "Continue"}
          </Button>
        </div>

        <div className="text-center text-xs text-gray-600 mt-4">
          <p>
            We'll verify your bank account details for secure transactions. 
            This process may take a few moments.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ManualBankDetails;