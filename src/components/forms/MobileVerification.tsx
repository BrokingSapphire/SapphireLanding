import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";
import { useAuthToken } from "@/hooks/useCheckpoint";

interface MobileVerificationProps {
  onNext: () => void;
  initialData?: any;
  isCompleted?: boolean;
}

const MobileVerification = ({ onNext, initialData, isCompleted }: MobileVerificationProps) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(600); //  10 minutes in seconds
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState("");

  const { setAuthToken } = useAuthToken();

  // Prefill data from initialData or localStorage
  useEffect(() => {
    if (isCompleted && initialData?.phone) {
      // If step is completed, prefill with data from API
      setMobileNumber(initialData.phone);
    } else {
      // Try to get data from localStorage (from previous session)
      const storedPhone = localStorage.getItem("verifiedPhone") || "";
      if (storedPhone) {
        setMobileNumber(storedPhone);
      }
    }

    const storedEmail = localStorage.getItem("email") || "";
    setEmail(storedEmail);
  }, [initialData, isCompleted]);

  // If step is already completed, show completed state
  useEffect(() => {
    if (isCompleted) {
      // Auto-advance to next step after a short delay
      const timer = setTimeout(() => {
        onNext();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, onNext]);

  // OTP timer for 10 minutes
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (showOTP && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showOTP, otpTimer]);

  // Resend OTP timer for 30 seconds
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const validateMobile = (number: string) => {
    return /^[6-9][0-9]{9}$/.test(number);
  };

  const handleButtonClick = async () => {
    // If button is disabled, don't proceed
    if (isButtonDisabled()) {
      return;
    }

    // If OTP is shown and filled, verify OTP
    if (showOTP && otp.every((digit) => digit !== "")) {
      await handleVerifyOTP();
    }
    // If OTP is not shown yet, send OTP
    else if (!showOTP) {
      await handleSendOTP();
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError(null);

    if (email === "") {
      console.error("Verify your email first!");
      alert("Verify Your Email First!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/verify-otp`,
        {
          type: "phone",
          phone: mobileNumber,
          email: email,
          otp: otp.join(""),
        }
      );

      const token = response.data.token;
      
      // Set token in axios default headers for all future requests
      if (token) {
        setAuthToken(token);
      }

      // Store verified phone for next step
      localStorage.setItem("verifiedPhone", mobileNumber);

      if (!response) {
        setError("Failed to verify your code. Please try again.");
        console.error("Send OTP error, Response :", response);
        return;
      }

      onNext();
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error verifying OTP. Please try again.");
      }
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

    if (email === "") {
      console.error("Verify your email first!");
      alert("Verify Your Email First!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/request-otp`,
        {
          type: "phone",
          email: email,
          phone: mobileNumber,
        }
      );
      if (!response) {
        setError("Failed to send verification code. Please try again.");
        console.error("Send OTP error, Response :", response);
        return;
      }
      setShowOTP(true);
      setOtpTimer(600); // Reset OTP timer to 10 minutes
      setResendTimer(30); // Set resend timer to 30 seconds
      // Focus on the first OTP input after showing OTP fields
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
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
      } else if (value !== "" && index === 5) {
        // If the last digit is filled, try to submit automatically
        if (otp.slice(0, 5).every((digit) => digit !== "")) {
          // Only auto-submit if all previous digits are filled
          setTimeout(() => handleButtonClick(), 300);
        }
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  // Handle Enter key press in mobile input
  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  // Get button text based on current state
  const getButtonText = () => {
    if (isCompleted) return "Completed ✓";
    if (isLoading) {
      return showOTP ? "Verifying..." : "Sending OTP...";
    }
    return showOTP ? "Verify My Mobile" : "Get OTP";
  };

  // Determine if button should be disabled
  const isButtonDisabled = () => {
    if (isCompleted) return false;
    if (isLoading) return true;
    if (!showOTP) return !validateMobile(mobileNumber);
    return !otp.every((digit) => digit !== "");
  };

  // Show completed state
  if (isCompleted) {
    return (
      <div className="mx-auto pt-24">
        <FormHeading
          title={"Mobile Verified Successfully!"}
          description={"Proceeding to the next step..."}
        />

        <div className="mb-8">
          <label className="block text-gray-700 mb-2">Mobile Number</label>
          <div className="flex gap-3">
            <div className="bg-green-50 px-3 py-2 rounded border border-green-300 text-gray-500">
              +91
            </div>
            <input
              type="tel"
              className="flex-1 px-3 py-2 border border-green-300 bg-green-50 rounded focus:outline-none"
              value={mobileNumber}
              disabled
            />
          </div>
        </div>

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">Mobile number verified successfully!</span>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full py-6 mb-6 bg-green-600 hover:bg-green-700"
          variant="ghost"
        >
          Continue to Next Step
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto pt-24">
      <FormHeading
        title={"Verify your Mobile"}
        description={"Please enter your mobile for verification."}
      />

      <div className="mb-8">
        <label className="block text-gray-700 mb-2">Mobile Number</label>
        <div className="flex gap-3">
          <div className="bg-gray-50 px-3 py-2 rounded border border-gray-300 text-gray-500">
            +91
          </div>
          <input
            type="tel"
            placeholder="Your 10 digit mobile number"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
            value={mobileNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length > 10) return;
              setMobileNumber(value);
              setError(null);
            }}
            onKeyDown={handleMobileKeyDown}
            maxLength={10}
            pattern="[6-9][0-9]{9}"
            disabled={isLoading || showOTP}
          />
        </div>
      </div>

      {showOTP && (
        <div className="mb-6">
          <label className="block text-left text-gray-heading mb-3">
            Enter OTP
          </label>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-10 sm:w-12 h-10 sm:h-12 text-center border-2 border-gray-300 focus:outline-none focus:border-teal-500 text-xl appearance-none
                  ${
                    index === 0
                      ? "rounded-md rounded-r-none"
                      : index === 5
                      ? "rounded-md rounded-l-none"
                      : "rounded-none"
                  }`}
                disabled={isLoading}
              />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-end text-sm mb-2 gap-2">
            <button
              className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendOTP}
              disabled={isLoading || resendTimer > 0}
            >
              {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : "Resend OTP"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <Button
        ref={buttonRef}
        onClick={handleButtonClick}
        disabled={isButtonDisabled()}
        variant="ghost"
        className={`w-full py-6 rounded mb-6 ${
          isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
        } ${isCompleted ? "bg-green-600 hover:bg-green-700" : ""}`}
      >
        {getButtonText()}
      </Button>

      <div className="text-center text-xs text-gray-600 mt-8 space-y-3">
        <p>
          I authorise Sapphire to fetch my KYC information from the C-KYC
          registry with my PAN.
        </p>
        <p>
          If you are looking to open a HUF, Corporate, Partnership,or NRI
          account, you have to{" "}
          <span className="text-blue-400">click here.</span>
        </p>
      </div>
    </div>
  );
};

export default MobileVerification;