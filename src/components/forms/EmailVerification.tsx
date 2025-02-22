import React, { useState, useRef } from "react";

const EmailVerification = ({ onNext }: { onNext: () => void }) => {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validateEmail = (email: string) => {
    return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  const handleEmailOTP = () => {
    try {
      // TODO: Implement actual OTP verification logic here
      // alert("Verifying OTP...");
      onNext();
    } catch (error) {
      alert("Error verifying OTP. Please try again.");
    }
  };

  const handleSendOTP = () => {
    if (validateEmail(email)) {
      setShowOTP(true);
      // alert("OTP sent to your email address");
    } else {
      alert("Please enter a valid email address");
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
      <h2 className="text-3xl font-bold mb-2">Verify Your Email</h2>
      <p className="text-gray-600 mb-8">
        Please enter your email address to receive a verification code
      </p>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Email Address</label>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label className="block text-gray-700 mb-2">
            Enter Verification Code
          </label>
          <p className="text-sm text-gray-500 mb-4">
            We've sent a verification code to {email}
          </p>
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
              Resend Code
            </button>
            <span className="text-gray-500">Code valid for 10:00 mins</span>
          </div>
        </div>
      )}

      <button
        onClick={handleEmailOTP}
        className="w-full bg-teal-800 text-white py-3 rounded font-medium hover:bg-teal-700 transition-colors"
      >
        Verify Email
      </button>

      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-4">
          By continuing, you agree to receive important updates and
          notifications via email. We'll never share your email address with
          third parties.
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
