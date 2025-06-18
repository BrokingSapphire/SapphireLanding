import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import FormHeading from "./FormHeading";
import { useAuthToken } from "@/hooks/useCheckpoint";
import { toast } from "sonner";

interface EmailVerificationProps {
  onNext: () => void;
  initialData?: {
    email?: string;
    [key: string]: unknown;
  };
  isCompleted?: boolean;
}

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
  message?: string;
}

const EmailVerification = ({ onNext, initialData, isCompleted }: EmailVerificationProps) => {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(600); // 10 minutes in seconds
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { setAuthToken } = useAuthToken();

  // Prefill email from localStorage or initialData
  useEffect(() => {
    if (isCompleted && initialData?.email) {
      // If step is completed, prefill with data from API
      setEmail(initialData.email);
    } else {
      // Try to get email from localStorage (from previous session)
      const storedEmail = localStorage.getItem("email") || "";
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
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

  // Prevent page reload/refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Show browser's default confirmation dialog
      e.preventDefault();
      e.returnValue = ''; // Required for Chrome
      
      // Show toast warning (may not be visible due to browser dialog)
      toast.error("Please don't reload the page during verification process!");
      
      return ''; // Some browsers require a return value
    };

    const handleUnload = () => {
      // Show toast when user actually tries to leave
      toast.error("Page reload detected! Please resubmit if verification was interrupted.");
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  // Also detect when user comes back to the tab (in case they refreshed)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && showOTP) {
        // User came back to tab during OTP process
        toast.warning("If you refreshed the page, you may need to request a new OTP code.");
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showOTP]);

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

  const validateEmail = (email: string) => {
    return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
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

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/verify-otp/`,
        {
          type: "email",
          email: email,
          otp: otp.join(""),
        }
      );

      if (!response.data) {
        toast.error("Failed to verify your code. Please try again.");
        return;
      }

      // Store email and auth token
      localStorage.setItem("email", email);
      
      // Store auth token in cookies and axios headers
      if (response.data.token) {
        setAuthToken(response.data.token);
      }

      toast.success("Email verified successfully!");
      onNext();
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      
      // Check for backend error message in different possible locations
      const errorMessage = 
        err.response?.data?.error?.message ||  // {"error":{"message":"Invalid OTP provided"}}
        err.response?.data?.message ||         // {"message":"Invalid OTP provided"}
        (typeof err.response?.data === 'object' && 
         'error' in err.response.data && 
         typeof err.response.data.error === 'string' ? 
         err.response.data.error : null) ||   // {"error":"Invalid OTP provided"}
        "Error verifying code. Please try again."; // fallback
      
      toast.error(errorMessage);
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/request-otp/`,
        {
          type: "email",
          email: email,
        }
      );

      if (!response.data) {
        toast.error("Failed to send verification code. Please try again.");
        return;
      }

      setShowOTP(true);
      setOtpTimer(600); // Reset OTP timer to 10 minutes
      setResendTimer(30); // Set resend timer to 30 seconds
      
      toast.success("Verification code sent to your email!");
      
      // Focus on the first OTP input after showing OTP fields
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      
      // Check for backend error message in different possible locations
      const errorMessage = 
        err.response?.data?.error?.message ||  // {"error":{"message":"Some error"}}
        err.response?.data?.message ||         // {"message":"Some error"}
        (typeof err.response?.data === 'object' && 
         'error' in err.response.data && 
         typeof err.response.data.error === 'string' ? 
         err.response.data.error : null) ||   // {"error":"Some error"}
        "Failed to send verification code. Please try again."; // fallback
      
      toast.error(errorMessage);
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

      // Move to next input if value is entered
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

  // Handle Enter key press in email input
  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  // Get button text based on current state
  const getButtonText = () => {
    if (isCompleted) return "Completed ✓";
    if (isLoading) {
      return showOTP ? "Verifying..." : "Sending Code...";
    }
    return showOTP ? "Verify My Email" : "Get OTP";
  };

  // Determine if button should be disabled
  const isButtonDisabled = () => {
    if (isCompleted) return false;
    if (isLoading) return true;
    if (!showOTP) return !validateEmail(email);
    return !otp.every((digit) => digit !== "");
  };

  // Show completed state
  if (isCompleted) {
    return (
      <div className="mx-auto pt-24">
        <FormHeading
          title={"Email Verified Successfully!"}
          description={"Proceeding to the next step..."}
        />
        
        <div className="mb-8">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <div className="flex gap-3">
            <input
              type="email"
              className="flex-1 px-3 py-2 border border-green-300 bg-green-50 rounded focus:outline-none"
              value={email}
              disabled
            />
          </div>
        </div>

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">Email verified successfully!</span>
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
        title={"Hi, Welcome to Sapphire!"}
        description={"Get started in just a few easy steps!"}
      />

      <div className="mb-8">
        <label className="block text-gray-700 mb-2">Email Address</label>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={handleEmailKeyDown}
            disabled={isLoading || showOTP}
          />
        </div>
      </div>

      {showOTP && (
        <div className="mb-6">
          <label className="block text-left text-gray-heading mb-3">
            Enter OTP
          </label>
          <div className="flex justify-center gap-2 mb-4">
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
                className={`w-12 h-12 text-center border-2 border-gray-300 focus:outline-none focus:border-teal-500 text-xl
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
          <div className="flex w-full justify-end text-sm mb-2">
            <button
              className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendOTP}
              disabled={isLoading || resendTimer > 0}
            >
              {resendTimer > 0
                ? `Resend Code (${resendTimer}s)`
                : "Resend Code"}
            </button>
            
          </div>
        </div>
      )}

      <Button
        ref={buttonRef}
        onClick={handleButtonClick}
        disabled={isButtonDisabled()}
        className={`w-full py-6 mb-6 ${
          isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
        } ${isCompleted ? "bg-green-600 hover:bg-green-700" : ""}`}
        variant="ghost"
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

export default EmailVerification;