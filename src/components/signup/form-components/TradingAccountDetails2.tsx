import React, { useState } from "react";

interface TradingAccountFormData {
  occupation: string;
  isPoliticallyExposed: boolean | null;
  isValid: boolean;
}

interface TradingAccountDetailsProps {
  onNextStep: () => void;
}

const initialFormData: TradingAccountFormData = {
  occupation: '',
  isPoliticallyExposed: null,
  isValid: false,
};

const occupationOptions = [
  'Bussiness',
  'Housewife',
  'Student',
  'Professional',
  'Private Sector',
  'Government Service',
  'Agriculturist',
  'Public Sector',
  'Retired',
  'Others'
];

const TradingAccountDetails: React.FC<TradingAccountDetailsProps> = ({ onNextStep }) => {
  const [formData, setFormData] = useState<TradingAccountFormData>(initialFormData);

  const validateForm = (updates: Partial<TradingAccountFormData>) => {
    const currentData = { ...formData, ...updates };
    return {
      isValid: currentData.occupation !== '' && currentData.isPoliticallyExposed !== null
    };
  };

  const handleOccupationSelect = (occupation: string) => {
    const updates = {
      occupation,
    };
    setFormData(prevData => ({
      ...prevData,
      ...updates,
      ...validateForm(updates)
    }));
  };

  const handlePoliticallyExposedChange = (value: boolean) => {
    const updates = {
      isPoliticallyExposed: value,
    };
    setFormData(prevData => ({
      ...prevData,
      ...updates,
      ...validateForm(updates)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.isValid) {
      console.log('Form submitted:', formData);
      onNextStep(); // Call the provided onNextStep function
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
                className={`px-4 py-2 rounded border ${
                  formData.occupation === option
                    ? 'border-teal-800 bg-teal-50 text-teal-800'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Are you a politically exposed person?<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-teal-800 border-gray-300 focus:ring-teal-800"
                checked={formData.isPoliticallyExposed === true}
                onChange={() => handlePoliticallyExposedChange(true)}
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-teal-800 border-gray-300 focus:ring-teal-800"
                checked={formData.isPoliticallyExposed === false}
                onChange={() => handlePoliticallyExposedChange(false)}
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!formData.isValid}
          className={`w-full bg-teal-800 text-white py-3 rounded ${
            formData.isValid ? 'hover:bg-teal-700' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default TradingAccountDetails;