import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import FormHeading from "../general-components/formHeading";

interface TradingAccountDetailsProps {
  onNext: () => void;
}

const occupationOptions = [
  "Bussiness",
  "Housewife",
  "Student",
  "Professional",
  "Private Sector",
  "Government Service",
  "Agriculturist",
  "Public Sector",
  "Retired",
  "Others",
];

const TradingAccountDetails = ({ onNext }: TradingAccountDetailsProps) => {
  const [occupation, setOccupation] = useState("");
  const [isPoliticallyExposed, setIsPoliticallyExposed] = useState<boolean | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleOccupationSelect = (selected: string) => {
    if (isSubmitting) return;
    setOccupation(selected);
    setShowValidation(false);
  };

  const handlePoliticallyExposedChange = (value: boolean) => {
    if (isSubmitting) return;
    setIsPoliticallyExposed(value);
    setShowValidation(false);
  };

  const validateForm = () => {
    const isValid = occupation !== "" && isPoliticallyExposed !== null;
    setShowValidation(!isValid);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        onNext();
      } catch (error) {
        console.error("Error during submission:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isFormValid = occupation !== "" && isPoliticallyExposed !== null;

  return (
    <div className="mx-auto mt-14 p-4">
      <FormHeading
        title={"Trading Account Details"}
        description={"Set up your trading account in minutes."}
      />

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2">
            Occupation<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {occupationOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOccupationSelect(option)}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded border transition-colors
                  ${
                    occupation === option
                      ? "border-teal-800 bg-teal-50 text-teal-800"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {option}
              </button>
            ))}
          </div>
          {showValidation && !occupation && (
            <p className="text-red-500 text-sm mt-1">Please select your occupation</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Are you a politically exposed person?
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label
              className={`flex items-center ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <input
                type="radio"
                className="w-4 h-4 text-teal-800 border-gray-300 focus:ring-teal-800"
                checked={isPoliticallyExposed === true}
                onChange={() => handlePoliticallyExposedChange(true)}
                disabled={isSubmitting}
              />
              <span className={`ml-2 ${isSubmitting ? "opacity-50" : ""}`}>
                Yes
              </span>
            </label>
            <label
              className={`flex items-center ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <input
                type="radio"
                className="w-4 h-4 text-teal-800 border-gray-300 focus:ring-teal-800"
                checked={isPoliticallyExposed === false}
                onChange={() => handlePoliticallyExposedChange(false)}
                disabled={isSubmitting}
              />
              <span className={`ml-2 ${isSubmitting ? "opacity-50" : ""}`}>
                No
              </span>
            </label>
          </div>
          {showValidation && isPoliticallyExposed === null && (
            <p className="text-red-500 text-sm mt-1">Please select an option</p>
          )}
        </div>

        <Button
          variant={"ghost"}
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-6
            ${
              isFormValid && !isSubmitting
                ? ""
                : "opacity-50 cursor-not-allowed"
            }`}
        >
          {isSubmitting ? "Please wait..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default TradingAccountDetails;