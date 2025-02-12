import React, { useState } from "react";

interface TradingAccountDetailsProps {
  onNextStep: () => void;
}

interface TradingAccountFormData {
  occupation: string;
  isPoliticallyExposed: boolean | null;
  isValid: boolean;
}

const initialFormData: TradingAccountFormData = {
  occupation: "",
  isPoliticallyExposed: null,
  isValid: false,
};

const occupationOptions = [
  "Bussiness",
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

const TradingAccountDetails: React.FC<TradingAccountDetailsProps> = ({
  onNextStep,
}) => {
  const [formData, setFormData] =
    useState<TradingAccountFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (updates: Partial<TradingAccountFormData>) => {
    const currentData = { ...formData, ...updates };
    return {
      isValid:
        currentData.occupation !== "" &&
        currentData.isPoliticallyExposed !== null,
    };
  };

  const handleOccupationSelect = (occupation: string) => {
    if (isSubmitting) return;

    const updates = {
      occupation,
    };
    setFormData((prevData) => ({
      ...prevData,
      ...updates,
      ...validateForm(updates),
    }));
  };

  const handlePoliticallyExposedChange = (value: boolean) => {
    if (isSubmitting) return;

    const updates = {
      isPoliticallyExposed: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      ...updates,
      ...validateForm(updates),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onNextStep();
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-1">Trading account details</h1>
      <p className="text-gray-600 mb-6">Step 5 of 9</p>

      <form onSubmit={handleSubmit}>
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
                className={`px-4 py-2 rounded border transition-colors
                  ${
                    formData.occupation === option
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
                checked={formData.isPoliticallyExposed === true}
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
                checked={formData.isPoliticallyExposed === false}
                onChange={() => handlePoliticallyExposedChange(false)}
                disabled={isSubmitting}
              />
              <span className={`ml-2 ${isSubmitting ? "opacity-50" : ""}`}>
                No
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!formData.isValid || isSubmitting}
          className={`w-full bg-teal-800 text-white py-3 rounded transition-colors
            ${
              formData.isValid && !isSubmitting
                ? "hover:bg-teal-700"
                : "opacity-50 cursor-not-allowed"
            }`}
        >
          {isSubmitting ? "Please wait..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default TradingAccountDetails;
