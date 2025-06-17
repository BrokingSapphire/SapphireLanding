import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { Eye, EyeOff, Check, X } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

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
  const [isFinalizingInBackground, setIsFinalizingInBackground] = useState(false);
  const [finalizeError, setFinalizeError] = useState<string | null>(null);

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
    }
  }, [initialData, isCompleted]);

  // Try to finalize in background (non-blocking)
  useEffect(() => {
    if (!isCompleted && !clientId) {
      handleFinalizeInBackground();
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

  const handleFinalizeInBackground = async () => {
    setIsFinalizingInBackground(true);
    setFinalizeError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/finalize`,
        {},
        {
          headers:{
            Authorization: `Bearer ${Cookies.get('authToken')}`
          }
        }
      );

      if (response.data?.data?.clientId) {
        setClientId(response.data.data.clientId);
        console.log('Finalize successful, Client ID:', response.data.data.clientId);
      }
    } catch (err: any) {
      console.warn('Finalize API failed (non-blocking):', err.response?.data?.message || err.message);
      setFinalizeError(err.response?.data?.message || 'Finalize failed');
      // Don't block the user, they can still set password
    } finally {
      setIsFinalizingInBackground(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!isFormValid()) return;

    if (isCompleted && clientId) {
      onNext(clientId);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use the setup-password API directly
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/setup-password`,
        {
          password: password,
          confirm_password: confirmPassword
        },
        {
          headers:{
            Authorization: `Bearer ${Cookies.get('authToken')}`
          }
        }
      );

      // If we have a client ID from finalize, use it
      // Otherwise, we'll need to get it somehow or continue without it
      if (clientId) {
        onNext(clientId);
      } else {
        // Try to get client ID from another source or continue with a placeholder
        // You might need to call another API or handle this differently
        console.log('Password set successfully, but no client ID available');
        onNext('pending'); // Or handle this case differently
      }
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
        } else if (err.response.status === 403) {
          setError("Please complete the previous steps first.");
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

  const getButtonText = () => {
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

  // Show password setup form
  return (
    <div className="mx-auto mt-16 max-w-md">
      <FormHeading
        title="Set Your Password"
        description="Create a secure password for your trading account."
      />

      {/* Background finalize status */}
      {isFinalizingInBackground && (
        <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <p className="text-blue-700 text-sm">Setting up your account...</p>
          </div>
        </div>
      )}

      {clientId && (
        <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
          <p className="text-green-700 text-sm">
            <strong>Client ID:</strong> {clientId}
          </p>
        </div>
      )}

      {finalizeError && !clientId && (
        <div className="mb-4 p-3 bg-yellow-50 rounded border border-yellow-200">
          <p className="text-yellow-700 text-sm">
            <strong>Note:</strong> Account setup is still in progress. You can continue setting your password.
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