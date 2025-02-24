import React, { useState } from "react";

const PANVerify = ({ onNext }: { onNext: () => void }) => {
  const [panNumber, setPanNumber] = useState("");
  const [dob, setDob] = useState("");
  const [errors, setErrors] = useState({
    pan: false,
    dob: false,
  });

  const validatePan = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const validateDob = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18;
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();

    if (value.length <= 10) {
      setPanNumber(value);
      setErrors((prev) => ({
        ...prev,
        pan: value.length === 10 && !validatePan(value),
      }));
    }
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDob(value);
  };

  const handleSubmit = () => {
    if (validatePan(panNumber) && validateDob(dob)) {
      onNext();
    } else {
      setErrors({
        pan: !validatePan(panNumber),
        dob: !validateDob(dob),
      });
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="text-3xl font-bold mb-2">Enter your PAN Details</h2>
      <p className="text-gray-600 mb-8">
        Please provide your PAN number and date of birth to continue
      </p>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">PAN Number</label>
        <input
          type="text"
          placeholder="AAAAA1234A"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={panNumber}
          onChange={handlePanChange}
          maxLength={10}
        />
        {errors.pan && (
          <p className="text-red-500 text-sm mt-1">
            Please enter a valid PAN number
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Date of Birth</label>
        <input
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={dob}
          onChange={handleDobChange}
          max={new Date().toISOString().split("T")[0]}
        />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">
            You must be at least 18 years old
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full bg-teal-800 text-white py-3 rounded font-medium hover:bg-teal-700 transition-colors ${
          !panNumber || !dob ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!panNumber || !dob}
      >
        Continue
      </button>

      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-4">
          By continuing, you agree to verify your PAN details with the Income
          Tax Department. Your PAN will be used for KYC verification purposes
          only.
        </p>
      </div>
    </div>
  );
};

export default PANVerify;
