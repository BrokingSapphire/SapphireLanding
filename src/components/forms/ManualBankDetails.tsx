import React, { useState } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { ArrowRight } from "lucide-react";

interface ManualBankDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

interface FormData {
  ifscCode: string;
  accountNumber: string;
}

interface FormErrors {
  ifscCode?: string;
  accountNumber?: string;
}

const ManualBankDetails: React.FC<ManualBankDetailsProps> = ({
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<FormData>({
    ifscCode: "",
    accountNumber: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.ifscCode) {
      newErrors.ifscCode = "IFSC Code is required";
    }

    if (!formData.accountNumber) {
      newErrors.accountNumber = "Account Number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
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
            className={`w-full p-2 border rounded ${
              errors.ifscCode ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter IFSC Code"
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
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.accountNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Account Number"
          />
          {errors.accountNumber && (
            <p className="text-xs text-red-500">{errors.accountNumber}</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button
            type="button"
            variant="link"
            onClick={onBack}
            className="hidden text-blue-500 sm:flex items-center"
          >
            Link via UPI <ArrowRight className="ml-1 h-4 w-4" />
          </Button>

          <Button
            type="submit"
            className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-900"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManualBankDetails;
