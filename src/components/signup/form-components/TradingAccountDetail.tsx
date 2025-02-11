import React from "react";

interface TradingAccountFormData {
  maritalStatus: string;
  fatherName: string;
  motherName: string;
  isValid: boolean;
}

interface TradingAccountDetailsProps {
  formData: TradingAccountFormData;
  updateFormData: (data: Partial<TradingAccountFormData>) => void;
  onNextStep: () => void;
}

const TradingAccountDetails: React.FC<TradingAccountDetailsProps> = ({
  formData,
  updateFormData,
  onNextStep,
}) => {
  const validateForm = (updatedData: Partial<TradingAccountFormData>) => {
    const currentData = { ...formData, ...updatedData };
    return {
      isValid: 
        currentData.maritalStatus?.length > 0 &&
        currentData.fatherName?.length > 0 &&
        currentData.motherName?.length > 0
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updates = {
      [name]: value,
    };
    
    updateFormData({
      ...updates,
      ...validateForm(updates),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData?.isValid) {
      onNextStep();
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-xl font-medium mb-6">Trading account details</h2>
      <p className="text-sm text-gray-600 mb-6">Step 5 of 9</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm">Marital Status</label>
          <div className="flex gap-2">
            {['Single', 'Married', 'Divorced'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => updateFormData({
                  maritalStatus: status,
                  ...validateForm({ maritalStatus: status })
                })}
                className={`px-4 py-1 text-sm border rounded
                  ${formData?.maritalStatus === status 
                    ? 'bg-teal-600 text-white ' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={formData?.fatherName || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-600"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            value={formData?.motherName || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-600"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-4 text-white bg-teal-800 rounded
            ${formData?.isValid ? 'hover:bg-teal-700' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!formData?.isValid}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default TradingAccountDetails;