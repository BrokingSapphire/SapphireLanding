import React, { useState } from "react";

interface TradingAccountDetailsProps {
  onNext: () => void;
}

interface TradingAccountFormData {
  maritalStatus: string;
  fatherName: string;
  motherName: string;
}

interface FormErrors {
  maritalStatus: boolean;
  fatherName: boolean;
  motherName: boolean;
}

const initialFormData: TradingAccountFormData = {
  maritalStatus: "",
  fatherName: "",
  motherName: "",
};

const initialErrors: FormErrors = {
  maritalStatus: false,
  fatherName: false,
  motherName: false,
};

const maritalStatusOptions = ["Single", "Married", "Divorced"];

const TradingAccountDetails: React.FC<TradingAccountDetailsProps> = ({
  onNext,
}) => {
  const [formData, setFormData] = useState<TradingAccountFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors = {
      maritalStatus: !formData.maritalStatus,
      fatherName: !formData.fatherName.trim(),
      motherName: !formData.motherName.trim(),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleInputChange = (field: keyof TradingAccountFormData, value: string) => {
    if (isSubmitting) return;

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    setErrors(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
        onNext();
      } catch (err) {
        console.error("Error during submission:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isFormValid = formData.maritalStatus && formData.fatherName.trim() && formData.motherName.trim();

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-1">Trading Account Details</h1>
      <p className="text-gray-600 mb-6">Step 6 of 9</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2">
            Marital Status<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {maritalStatusOptions.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleInputChange("maritalStatus", status)}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded border transition-colors
                  ${
                    formData.maritalStatus === status
                      ? "border-teal-800 bg-teal-50 text-teal-800"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {status}
              </button>
            ))}
          </div>
          {errors.maritalStatus && (
            <p className="text-red-500 text-sm mt-1">Please select your marital status</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Father&apos;s Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your father&apos;s full name"
            value={formData.fatherName}
            onChange={(e) => handleInputChange("fatherName", e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm mt-1">Please enter your father&apos;s name</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Mother&apos;s Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your mother&apos;s full name"
            value={formData.motherName}
            onChange={(e) => handleInputChange("motherName", e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.motherName && (
            <p className="text-red-500 text-sm mt-1">Please enter your mother&apos;s name</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full bg-teal-800 text-white py-3 rounded transition-colors
            ${
              isFormValid && !isSubmitting
                ? "hover:bg-teal-700"
                : "opacity-50 cursor-not-allowed"
            }`}
        >
          {isSubmitting ? "Please wait..." : "Continue"}
        </button>

        <div className="mt-6 text-sm text-gray-600">
          <p className="mb-4">
            This information is required for KYC verification and will be kept confidential 
            in accordance with our privacy policy.
          </p>
        </div>
      </form>
    </div>
  );
};

export default TradingAccountDetails;