import React, { useState } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios"

const PANVerify = ({ onNext }: { onNext: () => void }) => {
  const [panNumber, setPanNumber] = useState("");
  const [errors, setErrors] = useState({
    pan: false,
    dob: false,
  });

  const validatePan = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();

    // Apply PAN pattern formatting: AAAAA1234A
    // First 5 characters must be letters
    const firstPart = value.slice(0, 5).replace(/[^A-Z]/g, "");

    // Next 4 characters must be numbers
    let middlePart = "";
    if (value.length > 5) {
      middlePart = value.slice(5, 9).replace(/[^0-9]/g, "");
    }

    // Last character must be a letter
    let lastPart = "";
    if (value.length > 9) {
      lastPart = value.slice(9, 10).replace(/[^A-Z]/g, "");
    }

    // Combine all parts
    const formattedPan = `${firstPart}${middlePart}${lastPart}`;

    if (formattedPan.length <= 10) {
      setPanNumber(formattedPan);
      setErrors((prev) => ({
        ...prev,
        pan: formattedPan.length === 10 && !validatePan(formattedPan),
      }));
    }
  };

  const handleSubmit = async () => {
    if (validatePan(panNumber)) {
      try {
        
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
          {
            step: "pan",
            pan_number:panNumber
          }
        );
        console.log("Response of pan verifivation:",response)
        if (!response) {
          //TODO: Error handling, preferably by a toast or inbox
          // setError("Failed to send verification code. Please try again.");
          console.error("Send OTP error, Response :", response);
          return;
        }
        
        onNext();
      } catch (error) {
        // setError("Error verifying code. Please try again.");
        console.error("Verification error:", error);
      }
    } else {
      setErrors({
        pan: !validatePan(panNumber),
        dob: false,
      });
    }
  };

  return (
    <div className="mx-auto max-w-full px-4">
      <FormHeading
        title={"Verify PAN to Continue"}
        description={"Secure your identity with PAN verification."}
      />
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">PAN Number</label>
        <input
          type="text"
          placeholder="AAAAA1234A"
          className={`w-full px-3 py-2 border ${
            errors.pan ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all`}
          value={panNumber}
          onChange={handlePanChange}
          maxLength={10}
        />
        {errors.pan && (
          <p className="text-red-500 text-sm mt-1">
            Please enter a valid PAN number
          </p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          Format: ABCDE1234F (5 letters, 4 numbers, 1 letter)
        </p>
      </div>

      <Button
        onClick={handleSubmit}
        variant="ghost"
        className={`w-full py-6 ${
          !panNumber? "opacity-50 cursor-not-allowed" : ""
        } transition-opacity`}
        disabled={!panNumber}
      >
        Continue
      </Button>
      <div className="mt-6 text-sm text-center text-gray-600">
        <p className="mb-4 text-center">
          By continuing, you agree to verify your PAN details with the Income
          Tax Department. Your PAN will be used for KYC verification purposes
          only.
        </p>
      </div>
    </div>
  );
};

export default PANVerify;