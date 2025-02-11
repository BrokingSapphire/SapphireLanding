import React from "react";

interface AdharFormData {
  adharNumber: string;
  isValid: boolean;
  adharError?: boolean;
}

interface AdharVerificationProps {
  formData: AdharFormData;
  updateFormData: (data: Partial<AdharFormData>) => void;
  onNextStep: () => void;
}

const AdharVerification: React.FC<AdharVerificationProps> = ({
  formData,
  updateFormData,
  onNextStep,
}) => {
  const validateForm = (updatedData: Partial<AdharFormData>) => {
    const currentData = { ...formData, ...updatedData };

    // Adhar validation: exactly 12 digits
    const isAdharValid = /^\d{12}$/.test(currentData.adharNumber);

    return {
      isValid: isAdharValid,
      adharError: currentData.adharNumber.length > 0 && !isAdharValid,
    };
  };

  const handleAdharNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    const updates = {
      adharNumber: value,
    };
    updateFormData({
      ...updates,
      ...validateForm(updates),
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-4">Enter your Aadhaar to Continue</h1>
        <p className="text-gray-600 mb-2">Step 2 of 9</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formData.isValid) onNextStep();
          }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Aadhaar Number</label>
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2"
                placeholder="Enter your 12-digit Aadhaar number"
                value={formData?.adharNumber || ''}
                onChange={handleAdharNumberChange}
                maxLength={12}
              />
              {formData?.adharError && (
                <p className="text-red-500 mt-2">
                  Please enter a valid 12-digit Aadhaar number.
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-700 ${
                formData?.isValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!formData?.isValid}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdharVerification;