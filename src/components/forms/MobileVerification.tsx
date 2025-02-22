import React, { useState, useRef } from "react";

const MobileVerification = ({ onNext }: { onNext: () => void }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleMobileOTP = () => {
    try {
      // TODO: Implement actual OTP verification logic here
      onNext();
    } catch (error) {
      alert("Error verifying OTP. Please try again.");
    }
  };

  const handleSendOTP = () => {
    if (mobileNumber.length === 10) {
      setShowOTP(true);
      // alert("OTP sent to your mobile number");
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);

      // Move to next input if value is entered
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
      // Move to previous input on backspace if current input is empty
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
            onChange={(e) => setMobileNumber(e.target.value)}
            maxLength={10}
            pattern="[0-9]{10}"
          />
          <button
            onClick={handleSendOTP}
            className="text-blue-500 hover:text-blue-600 whitespace-nowrap"
          >
            Get OTP →
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
              />
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <button className="text-blue-500 hover:text-blue-600">
              Resend OTP
            </button>
            <span className="text-gray-500">OTP valid for 10:00 mins</span>
          </div>
        </div>
      )}

      <button
        onClick={handleMobileOTP}
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
