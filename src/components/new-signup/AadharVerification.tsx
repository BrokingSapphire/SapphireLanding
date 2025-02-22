import React, { useState } from "react";

const AadhaarVerification = ({ onNext }: { onNext: () => void }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [error, setError] = useState(false);

  const validateAadhaar = (number: string) => {
    return /^\d{12}$/.test(number);
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 12) {
      setAadhaarNumber(value);
      setError(value.length === 12 && !validateAadhaar(value));
    }
  };

  const handleSubmit = () => {
    if (validateAadhaar(aadhaarNumber)) {
      onNext();
    } else {
      setError(true);
    }
  };

  // Format Aadhaar number with spaces for display
  const formatAadhaar = (number: string) => {
    return number.replace(/(\d{4})/g, "$1 ").trim();
  };

  return (
    <div className="mx-auto">
      <h2 className="text-3xl font-bold mb-2">Enter your Aadhaar Details</h2>
      <p className="text-gray-600 mb-8">
        Please provide your 12-digit Aadhaar number to continue
      </p>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Aadhaar Number</label>
        <input
          type="text"
          placeholder="XXXX XXXX XXXX"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formatAadhaar(aadhaarNumber)}
          onChange={handleAadhaarChange}
          maxLength={14} // 12 digits + 2 spaces
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">
            Please enter a valid 12-digit Aadhaar number
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full bg-teal-800 text-white py-3 rounded font-medium hover:bg-teal-700 transition-colors ${
          aadhaarNumber.length !== 12 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={aadhaarNumber.length !== 12}
      >
        Continue
      </button>

      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-4">
          By continuing, you authorize verification of your Aadhaar details with
          UIDAI. Your Aadhaar will be used for KYC verification purposes only.
        </p>
      </div>

      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 For enhanced security, your Aadhaar number is masked during
          display. Make sure to enter all 12 digits correctly.
        </p>
      </div>
    </div>
  );
};

export default AadhaarVerification;
