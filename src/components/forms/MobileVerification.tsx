import React, { useState } from "react";

const MobileVerification = ({ onNext }: { onNext: () => void }) => {
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-2">Hi, Welcome to Sapphire!</h2>
      <p className="text-gray-600 mb-8">
        Get started in just a few easy steps!
      </p>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Mobile Number</label>
        <div className="flex gap-2">
          <div className="bg-gray-50 px-3 py-2 rounded border border-gray-300 text-gray-500">
            +91
          </div>
          <input
            type="tel"
            placeholder="Your 10 digit mobile number"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            maxLength={10}
            pattern="[0-9]{10}"
          />
          <button className="text-blue-500 hover:text-blue-600 whitespace-nowrap">
            Get OTP →
          </button>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-teal-800 text-white py-3 rounded font-medium hover:bg-teal-700 transition-colors"
      >
        Continue
      </button>

      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-4">
          I authorise Sapphire to contact me even if my number is registered on
          DND. I authorise Sapphire to fetch my KYC information from the C-KYC
          registry with my PAN.
        </p>
      </div>
    </div>
  );
};

export default MobileVerification;