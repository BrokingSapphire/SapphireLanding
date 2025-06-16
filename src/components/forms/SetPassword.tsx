import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { Eye, EyeOff, Check, X } from "lucide-react";
import axios from "axios";

interface SetPasswordProps {
  onNext: (clientId: string) => void;
  initialData?: any;
  isCompleted?: boolean;
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const SetPassword: React.FC<SetPasswordProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [step, setStep] = useState<'finalize' | 'password'>('finalize');

  const [validation, setValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Prefill data from initialData (API response)
  useEffect(() => {
    if (isCompleted && initialData?.client_id) {
      setClientId(initialData.client_id);
      setStep('password');
    }
  }, [initialData, isCompleted]);

  // Initialize by calling finalize API first
  useEffect(() => {
    if (!isCompleted && !clientId) {
      handleFinalize();
    }
  }, [isCompleted, clientId]);

  // Validate password in real-time
  useEffect(() => {
    setValidation({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const handleFinalize = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // First, finalize signup to get client ID
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/finalize`,
        {},
        {
          withCredentials: true
        }
      );

      if (response.data?.data?.clientId) {
        setClientId(response.data.data.clientId);
        setStep('password');
      } else {
        setError("Failed to finalize signup. Please try again.");
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.data?.message) {
          setError(`Error: ${err.response.data.message}`);
        } else if (err.response.data?.error?.message) {
          setError(`Error: ${err.response.data.error.message}`);
        } else if (err.response.status === 400) {
          setError("Invalid request. Please try again.");
        } else if (err.response.status === 401) {
          setError("Authentication failed. Please restart the process.");
        } else if (err.response.status === 403) {
          setError("Client ID already exists or signup not completed.");
        } else {
          setError(`Server error (${err.response.status}). Please try again.`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!isFormValid() || !clientId) return;

    if (isCompleted) {
      onNext(clientId);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Set password using checkpoint API
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "password_setup",
          password: password,
          confirm_password: confirmPassword
        },
        {
          withCredentials: true
        }
      );

      // If successful, proceed to next step with client ID
      onNext(clientId);
    } catch (err: any) {
      if (err.response) {
        if (err.response.data?.message) {
          setError(`Error: ${err.response.data.message}`);
        } else if (err.response.data?.error?.message) {
          setError(`Error: ${err.response.data.error.message}`);
        } else if (err.response.status === 400) {
          setError("Invalid password. Please check requirements and try again.");
        } else if (err.response.status === 401) {
          setError("Authentication failed. Please restart the process.");
        } else if (err.response.status === 422) {
          setError("Password validation failed. Please check requirements.");
        } else {
          setError(`Server error (${err.response.status}). Please try again.`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const allValidationsPassed = Object.values(validation).every(Boolean);
    const passwordsMatch = password === confirmPassword;
    return allValidationsPassed && passwordsMatch && password.length > 0;
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(false);
    if (step === 'finalize') {
      handleFinalize();
    }
  };

  const getButtonText = () => {
    if (step === 'finalize') {
      return isLoading ? "Finalizing Signup..." : "Try Again";
    }
    if (isCompleted) return "Continue";
    return isLoading ? "Setting Password..." : "Set Password";
  };

  // Show completed state
  if (isCompleted && clientId) {
    return (
      <div className="mx-auto mt-16 max-w-md">
        <FormHeading
          title="Password Set Successfully!"
          description="Your account password has been configured."
        />

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-green-800 font-medium">Password Set Successfully!</h3>
              <p className="text-green-700 text-sm">Client ID: {clientId}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onNext(clientId)}
          variant="ghost"
          className="w-full py-6"
        >
          Continue to MPIN Setup
        </Button>
      </div>
    );
  }

  // Show finalization loading
  if (step === 'finalize') {
    return (
      <div className="mx-auto mt-16 max-w-md">
        <FormHeading
          title="Finalizing Your Account"
          description="Setting up your account credentials..."
        />
        
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <span className="ml-3 text-gray-600">Finalizing signup...</span>
          </div>
        ) : error ? (
          <div>
            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <Button
              onClick={handleRetry}
              variant="ghost"
              className="w-full py-6"
            >
              Try Again
            </Button>
          </div>
        ) : null}
      </div>
    );
  }

  // Show password setup form
  return (
    <div className="mx-auto mt-16 max-w-md">
      <FormHeading
        title="Set Your Password"
        description="Create a secure password for your trading account."
      />

      {clientId && (
        <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-blue-700 text-sm">
            <strong>Client ID:</strong> {clientId}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Password Requirements:
          </h4>
          <div className="space-y-2">
            {[
              { key: 'minLength', text: 'At least 8 characters' },
              { key: 'hasUppercase', text: 'One uppercase letter' },
              { key: 'hasLowercase', text: 'One lowercase letter' },
              { key: 'hasNumber', text: 'One number' },
              { key: 'hasSpecialChar', text: 'One special character' },
            ].map(({ key, text }) => (
              <div key={key} className="flex items-center">
                {validation[key as keyof PasswordValidation] ? (
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <X className="h-4 w-4 text-red-500 mr-2" />
                )}
                <span
                  className={`text-sm ${
                    validation[key as keyof PasswordValidation]
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Password Match Indicator */}
        {confirmPassword && (
          <div className="flex items-center">
            {password === confirmPassword ? (
              <>
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-green-700">Passwords match</span>
              </>
            ) : (
              <>
                <X className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-sm text-red-700">Passwords don't match</span>
              </>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 rounded border border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Button
          onClick={handlePasswordSubmit}
          disabled={!isFormValid() || isLoading}
          variant="ghost"
          className={`w-full py-6 ${
            (!isFormValid() || isLoading) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default SetPassword;