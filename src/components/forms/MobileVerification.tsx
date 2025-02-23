
// MobileVerification.tsx
import React, { useState, useRef } from "react";

const MobileVerification = ({ onNext }: { onNext: () => void }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validateMobile = (number: string) => {
    return /^[0-9]{10}$/.test(number);
  };

  const handleMobileOTP = async () => {
    if (!otp.every(digit => digit !== "")) {
      setError("Please enter the complete OTP");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual OTP verification logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      onNext();
    } catch (err) {
      setError("Error verifying OTP. Please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!validateMobile(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual send OTP logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setShowOTP(true);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.error("Send OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);
      setError(null);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mx-auto">
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
            onChange={(e) => {
              setMobileNumber(e.target.value.replace(/\D/g, ""));
              setError(null);
            }}
            maxLength={10}
            pattern="[0-9]{10}"
            disabled={isLoading}
          />
          <button
            onClick={handleSendOTP}
            disabled={isLoading || !mobileNumber}
            className="text-blue-500 hover:text-blue-600 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Get OTP →"}
          </button>
        </div>
      </div>

      {showOTP && (
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Enter OTP</label>
          <div className="flex gap-2 justify-between mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center border-2 border-gray-300 rounded focus:outline-none focus:border-teal-500 text-xl"
                disabled={isLoading}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <button 
              className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendOTP}
              disabled={isLoading}
            >
              Resend OTP
            </button>
            <span className="text-gray-500">OTP valid for 10:00 mins</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-50 rounded">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleMobileOTP}
        disabled={isLoading || !showOTP || !otp.every(digit => digit !== "")}
        className={`w-full bg-teal-800 text-white py-3 rounded font-medium transition-colors
          ${isLoading || !showOTP || !otp.every(digit => digit !== "") 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-teal-700"}`}
      >
        {isLoading ? "Verifying..." : "Continue"}
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