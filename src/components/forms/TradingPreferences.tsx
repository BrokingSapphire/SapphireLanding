import React, { useState } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";

interface TradingAccountDetailsProps {
  onNext: () => void;
}

type IncomeRange =
  | "< 1 Lakh"
  | "1 - 5 Lacs"
  | "5 - 10 Lacs"
  | "10 - 25 Lacs"
  | "25 - 1 Cr"
  | "> 1Cr";

type ExperienceRange =
  | "No Experience"
  | "< 1 year"
  | "1 - 5 years"
  | "5 - 10 years"
  | "10+ years";

type SettlementPreference = "Quarterly" | "Monthly";

const TradingPreferences: React.FC<TradingAccountDetailsProps> = ({
  onNext,
}) => {
  const [selectedIncome, setSelectedIncome] = useState<IncomeRange | null>(
    null
  );
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceRange | null>();
  const [selectedSettlement, setSelectedSettlement] =
    useState<SettlementPreference>("Quarterly");

  const handleIncomeSelect = (income: IncomeRange) => {
    setSelectedIncome(income);
  };

  const handleExperienceSelect = (experience: ExperienceRange) => {
    setSelectedExperience(experience);
  };

  const handleSettlementSelect = (settlement: SettlementPreference) => {
    setSelectedSettlement(settlement);
  };

  const isFormValid =
    selectedIncome && selectedExperience && selectedSettlement;

  return (
    <div className="w-full mx-auto mt-8">
      <FormHeading
        title="Trading Account Details"
        description="Set up your trading account in minutes."
      />

      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Annual Income<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleIncomeSelect("< 1 Lakh")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm  hover:border-gray-400 ${
                selectedIncome === "< 1 Lakh"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              &lt; 1 Lakh
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("1 - 5 Lacs")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm hover:border-gray-400 ${
                selectedIncome === "1 - 5 Lacs"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              1 - 5 Lacs
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("5 - 10 Lacs")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm hover:border-gray-400 ${
                selectedIncome === "5 - 10 Lacs"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              5 - 10 Lacs
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("10 - 25 Lacs")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm hover:border-gray-400 ${
                selectedIncome === "10 - 25 Lacs"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              10 - 25 Lacs
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("25 - 1 Cr")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm hover:border-gray-400 ${
                selectedIncome === "25 - 1 Cr"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              25 - 1 Cr
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("> 1Cr")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm hover:border-gray-400 ${
                selectedIncome === "> 1Cr"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              &gt; 1Cr
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Trading Experience<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleExperienceSelect("No Experience")}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "No Experience"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              No Experience
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("< 1 year")}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "< 1 year"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              &lt; 1 year
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("1 - 5 years")}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "1 - 5 years"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              1 - 5 years
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("5 - 10 years")}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "5 - 10 years"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              5 - 10 years
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("10+ years")}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "10+ years"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              10+ years
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-900 font-medium mb-2">
            Preference for running account settlement
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSettlementSelect("Quarterly")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm hover:border-gray-400 ${
                selectedSettlement === "Quarterly"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              Quarterly
            </button>
            <button
              type="button"
              onClick={() => handleSettlementSelect("Monthly")}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-sm hover:border-gray-400 ${
                selectedSettlement === "Monthly"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <Button
        onClick={onNext}
        variant={"ghost"}
        disabled={!isFormValid}
        className="py-6  mt-8 w-full"
      >
        Continue
      </Button>
    </div>
  );
};

export default TradingPreferences;
