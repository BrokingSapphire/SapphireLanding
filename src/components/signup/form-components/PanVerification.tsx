import React, { useState } from "react";

interface PanFormData {
  panNumber: string;
  dob: string;
  isValid: boolean;
  panError?: boolean;
  dobError?: boolean;
}

const PanVerification: React.FC = () => {
  // Initialize form data with default values
  const [formData, setFormData] = useState<PanFormData>({
    panNumber: "",
    dob: "",
    isValid: false,
    panError: false,
    dobError: false
  });

  const updateFormData = (updates: Partial<PanFormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...updates
    }));
  };

  const validateForm = (updatedData: Partial<PanFormData>) => {
    const currentData = { ...formData, ...updatedData };
    
    // PAN validation: 10 characters, alphanumeric
    const isPanValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(currentData.panNumber);
    
    // DOB validation: should be a valid date and person should be at least 18 years old
    const isValidDate = (dateString: string) => {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    };

    return {
      isValid: isPanValid && isValidDate(currentData.dob),
      panError: currentData.panNumber.length > 0 && !isPanValid,
      dobError: currentData.dob.length > 0 && !isValidDate(currentData.dob)
    };
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    const updates = {
      panNumber: value,
    };
    updateFormData({
      ...updates,
      ...validateForm(updates),
    });
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updates = {
      dob: value,
    };
    updateFormData({
      ...updates,
      ...validateForm(updates),
    });
  };

  const handleNextStep = () => {
    // Here you can add your logic for what happens after form submission
    console.log("Form submitted with data:", formData);
    // Example: navigate to next step, submit to API, etc.
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-4">Enter your PAN to Continue</h1>
        <p className="text-gray-600 mb-2">Step 1 of 9</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formData.isValid) handleNextStep();
          }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">PAN Number</label>
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2"
                placeholder="Enter your PAN number"
                value={formData.panNumber}
                onChange={handlePanChange}
                maxLength={10}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  e.currentTarget.value = e.currentTarget.value.toUpperCase();
                }}
              />
              {formData.panError && (
                <p className="text-red-500 mt-2">
                  Please enter a valid PAN number.
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">DOB</label>
              <input
                type="date"
                className="w-full border rounded-md px-4 py-2"
                placeholder="DD/MM/YYYY"
                value={formData.dob}
                onChange={handleDobChange}
                max={new Date().toISOString().split('T')[0]}
              />
              {formData.dobError && (
                <p className="text-red-500 mt-2">
                  You must be at least 18 years old to continue.
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-700 ${
                formData.isValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!formData.isValid}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PanVerification;