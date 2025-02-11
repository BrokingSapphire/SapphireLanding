import React, { useState } from "react";

interface BankLinkFormData {
  bankAccountNumber: string;
  ifscCode: string;
  isValid: boolean;
  bankAccountError?: boolean;
  ifscError?: boolean;
}

const initialFormData: BankLinkFormData = {
  bankAccountNumber: '',
  ifscCode: '',
  isValid: false,
  bankAccountError: false,
  ifscError: false
};

const BankLink: React.FC = () => {
  const [formData, setFormData] = useState<BankLinkFormData>(initialFormData);

  const validateForm = (updatedData: Partial<BankLinkFormData>) => {
    const currentData = { ...formData, ...updatedData };

    // Bank account number validation: 9-18 digits
    const isBankAccountValid = /^\d{9,18}$/.test(currentData.bankAccountNumber);

    // IFSC code validation: 11 characters, alphanumeric
    const isIfscValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(currentData.ifscCode);

    return {
      isValid: isBankAccountValid && isIfscValid,
      bankAccountError: currentData.bankAccountNumber.length > 0 && !isBankAccountValid,
      ifscError: currentData.ifscCode.length > 0 && !isIfscValid,
    };
  };

  const updateFormData = (data: Partial<BankLinkFormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  const handleBankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const updates = {
      bankAccountNumber: value,
    };
    updateFormData({
      ...updates,
      ...validateForm(updates),
    });
  };

  const handleIfscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    const updates = {
      ifscCode: value,
    };
    updateFormData({
      ...updates,
      ...validateForm(updates),
    });
  };

  const onNextStep = () => {
    // Handle next step logic here
    console.log('Moving to next step', formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-4">Link Bank Account</h1>
        <p className="text-gray-600 mb-2">Step 1 of 9</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formData.isValid) onNextStep();
          }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Bank Account Number</label>
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2"
                placeholder="Enter your bank account number"
                value={formData.bankAccountNumber}
                onChange={handleBankAccountChange}
                maxLength={18}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9]/g,
                    ""
                  );
                }}
              />
              {formData.bankAccountError && (
                <p className="text-red-500 mt-2">
                  Please enter a valid bank account number (9-18 digits).
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">IFSC Code</label>
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2"
                placeholder="Enter your IFSC code"
                value={formData.ifscCode}
                onChange={handleIfscChange}
                maxLength={11}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  e.currentTarget.value = e.currentTarget.value.toUpperCase();
                }}
              />
              {formData.ifscError && (
                <p className="text-red-500 mt-2">
                  Please enter a valid IFSC code.
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

export default BankLink;