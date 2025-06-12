import React, { useState } from "react";
import { Button } from "../ui/button";
import { Check, Eye, EyeOff } from "lucide-react";
import FormHeading from "./FormHeading";
import Image from "next/image";

interface MPINSetupProps {
  onNext: () => void;
}

const MPINSetup: React.FC<MPINSetupProps> = ({ onNext }) => {
  const [mpin, setMpin] = useState("");
  const [confirmMpin, setConfirmMpin] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [showMpin, setShowMpin] = useState(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState(false);
  const [errors, setErrors] = useState<{mpin?: string, confirmMpin?: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleMpinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setMpin(value);
      setErrors(prev => ({ ...prev, mpin: undefined }));
    }
  };

  const handleConfirmMpinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setConfirmMpin(value);
      setErrors(prev => ({ ...prev, confirmMpin: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: {mpin?: string, confirmMpin?: string} = {};

    if (!mpin) {
      newErrors.mpin = "MPIN is required";
    } else if (mpin.length !== 6) {
      newErrors.mpin = "MPIN must be 6 digits";
    }

    if (!confirmMpin) {
      newErrors.confirmMpin = "Please confirm your MPIN";
    } else if (mpin !== confirmMpin) {
      newErrors.confirmMpin = "MPIN does not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('http://13.202.238.76:3000/api/v1/auth/signup/mpin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on how you store the token
        },
        body: JSON.stringify({
          step: "MPIN",
          mpin: mpin
        })
      });

      if (response.ok) {
        onNext();
      } else {
        const errorData = await response.json();
        setErrors({ mpin: errorData.message || 'Failed to set MPIN' });
      }
    } catch (error) {
      setErrors({ mpin: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 mt-10">
      <FormHeading
        title="Set up your MPIN"
        description="Create a secure 6-digit MPIN for quick access to your account."
      />

      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <label htmlFor="mpin" className="block text-sm font-medium">
            Enter 6-digit MPIN*
          </label>
          <div className="relative">
            <input
              type={showMpin ? "text" : "password"}
              id="mpin"
              value={mpin}
              onChange={handleMpinChange}
              className={`w-full p-3 border rounded-lg text-left text-sm tracking-widest ${
                errors.mpin ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter 6-digit MPIN"
              maxLength={6}
            />
            <button
              type="button"
              onClick={() => setShowMpin(!showMpin)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showMpin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.mpin && (
            <p className="text-xs text-red-500">{errors.mpin}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmMpin" className="block text-sm font-medium">
            Confirm MPIN*
          </label>
          <div className="relative">
            <input
              type={showConfirmMpin ? "text" : "password"}
              id="confirmMpin"
              value={confirmMpin}
              onChange={handleConfirmMpinChange}
              className={`w-full p-3 border rounded-lg text-left text-sm tracking-widest ${
                errors.confirmMpin ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm 6-digit MPIN"
              maxLength={6}
            />
            <button
              type="button"
              onClick={() => setShowConfirmMpin(!showConfirmMpin)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmMpin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmMpin && (
            <p className="text-xs text-red-500">{errors.confirmMpin}</p>
          )}
        </div>
      </div>
      
      <div className="mb-6 flex items-center cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
        <div
          className={`h-6 w-6 flex items-center justify-center border-2 rounded-lg transition-colors cursor-pointer
            ${isChecked ? "border-green-600 bg-white" : "border-gray-400"}`}
        >
          {isChecked && <Check className="h-4 w-4 text-green-600" />}
        </div>
        <label className="text-sm text-gray-600 ml-2">
          I agree to use this MPIN for secure transactions and account access.
        </label>
      </div>
      
      <Button 
        variant="ghost"
        onClick={handleSubmit}
        disabled={isLoading || !mpin || !confirmMpin || !isChecked}
        className="py-6 w-full disabled:opacity-50"
      >
        {isLoading ? "Setting up MPIN..." : "Set MPIN"}
      </Button>
    </div>
  );
};

export default MPINSetup;