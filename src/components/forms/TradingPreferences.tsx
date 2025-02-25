import React, { useState } from "react";
import { Button } from "../ui/button";

interface TradingPreferencesProps {
  onNext: () => void;
}

const TradingPreferences: React.FC<TradingPreferencesProps> = ({ onNext }) => {
  const [selectedIncome, setSelectedIncome] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedSettlement, setSelectedSettlement] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incomeRanges = [
    { id: "below-1", label: "< 1 Lakh" },
    { id: "1-5", label: "1 - 5 Lacs" },
    { id: "5-10", label: "5 - 10 Lacs" },
    { id: "10-25", label: "10 - 25 Lacs" },
    { id: "25-1cr", label: "25 - 1 Cr" },
    { id: "above-1cr", label: "> 1Cr" },
  ];

  const experienceRanges = [
    { id: "1year", label: "1 year" },
    { id: "1-5years", label: "1 - 5 years" },
    { id: "5-10years", label: "5 - 10 years" },
    { id: "10plus", label: "10+ years" },
  ];

  const settlementOptions = [
    { id: "quarterly", label: "Quarterly" },
    { id: "monthly", label: "Monthly" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const isValid = selectedIncome && selectedExperience && selectedSettlement;
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onNext();
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = selectedIncome && selectedExperience && selectedSettlement;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-1">Trading account details</h2>
      <p className="text-gray-600 mb-8">Step 5 of 12</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Annual Income Selection */}
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">
            Annual Income<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {incomeRanges.map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() => setSelectedIncome(range.id)}
                disabled={isSubmitting}
                className={`px-4 py-3 border rounded-sm text-left transition-colors
                  ${selectedIncome === range.id
                    ? "border-teal-800 bg-teal-50"
                    : "border-gray-200 hover:border-teal-800"}
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="text-sm font-medium">
                  {range.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trading Experience Selection */}
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">
            Trading Experience<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {experienceRanges.map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() => setSelectedExperience(range.id)}
                disabled={isSubmitting}
                className={`px-4 py-3 border rounded-sm text-left transition-colors
                  ${selectedExperience === range.id
                    ? "border-teal-800 bg-teal-50"
                    : "border-gray-200 hover:border-teal-800"}
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="text-sm font-medium">
                  {range.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Settlement Preference Selection */}
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">
            Preference for running account settlement<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {settlementOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedSettlement(option.id)}
                disabled={isSubmitting}
                className={`px-4 py-3 border rounded-sm text-left transition-colors
                  ${selectedSettlement === option.id
                    ? "border-teal-800 bg-teal-50"
                    : "border-gray-200 hover:border-teal-800"}
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="text-sm font-medium">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Validation Message */}
        {!isFormValid && (
          <p className="text-red-500 text-sm">
            Please select all required fields to continue.
          </p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant={"ghost"}
          disabled={!isFormValid || isSubmitting}
          className={`w-full
            ${(!isFormValid || isSubmitting)
              ? "opacity-50 cursor-not-allowed"
              : ""}`}
        >
          {isSubmitting ? "Please wait..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default TradingPreferences;