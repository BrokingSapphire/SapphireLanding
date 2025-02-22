import React, { useState } from "react";

const TradingAccountDetails = ({ onNext }: { onNext: () => void }) => {
  const [maritalStatus, setMaritalStatus] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [errors, setErrors] = useState({
    maritalStatus: false,
    fatherName: false,
    motherName: false
  });

  const validateForm = () => {
    const newErrors = {
      maritalStatus: !maritalStatus,
      fatherName: !fatherName.trim(),
      motherName: !motherName.trim()
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="text-3xl font-bold mb-2">Trading Account Details</h2>
      <p className="text-gray-600 mb-8">
        Please provide your personal information to continue
      </p>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Marital Status</label>
        <div className="flex gap-3">
          {["Single", "Married", "Divorced"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setMaritalStatus(status)}
              className={`px-4 py-2 rounded transition-colors ${
                maritalStatus === status
                  ? "bg-teal-800 text-white"
                  : "border border-gray-300 hover:border-teal-500"
              }`}
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
        <label className="block text-gray-700 mb-2">Father's Name</label>
        <input
          type="text"
          placeholder="Enter your father's full name"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />
        {errors.fatherName && (
          <p className="text-red-500 text-sm mt-1">Please enter your father's name</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Mother's Name</label>
        <input
          type="text"
          placeholder="Enter your mother's full name"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
        />
        {errors.motherName && (
          <p className="text-red-500 text-sm mt-1">Please enter your mother's name</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full bg-teal-800 text-white py-3 rounded font-medium hover:bg-teal-700 transition-colors ${
          (!maritalStatus || !fatherName || !motherName) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!maritalStatus || !fatherName || !motherName}
      >
        Continue
      </button>

      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-4">
          This information is required for KYC verification and will be kept confidential 
          in accordance with our privacy policy.
        </p>
      </div>
    </div>
  );
};

export default TradingAccountDetails;