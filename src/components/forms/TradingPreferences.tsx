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

type SettlementPreference = "Quaterly" | "Monthly";

const TradingPreferences: React.FC<TradingAccountDetailsProps> = ({ onNext }) => {
  const [selectedIncome, setSelectedIncome] = useState<IncomeRange | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceRange | null>(null);
  const [selectedSettlement, setSelectedSettlement] = useState<SettlementPreference | null>(null);

  const handleIncomeSelect = (income: IncomeRange) => {
    setSelectedIncome(income);
  };

  const handleExperienceSelect = (experience: ExperienceRange) => {
    setSelectedExperience(experience);
  };

  const handleSettlementSelect = (settlement: SettlementPreference) => {
    setSelectedSettlement(settlement);
  };

  const isFormValid = selectedIncome && selectedExperience && selectedSettlement;

  return (
    <div className="w-full mx-auto p-4">
      <FormHeading 
        title="Trading Account Details" 
        description="Set up your trading account in minutes." 
      />
      
      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-gray-900 font-medium mb-2">
            Annual Income<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleIncomeSelect("< 1 Lakh")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedIncome === "< 1 Lakh" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              &lt; 1 Lakh
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("1 - 5 Lacs")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedIncome === "1 - 5 Lacs" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              1 - 5 Lacs
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("5 - 10 Lacs")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedIncome === "5 - 10 Lacs" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              5 - 10 Lacs
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("10 - 25 Lacs")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedIncome === "10 - 25 Lacs" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              10 - 25 Lacs
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("25 - 1 Cr")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedIncome === "25 - 1 Cr" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              25 - 1 Cr
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("> 1Cr")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedIncome === "> 1Cr" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              &gt; 1Cr
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-900 font-medium mb-2">
            Trading Experience<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleExperienceSelect("No Experience")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "No Experience" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              No Experience
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("< 1 year")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "< 1 year" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              &lt; 1 year
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("1 - 5 years")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "1 - 5 years" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              1 - 5 years
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("5 - 10 years")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "5 - 10 years" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              5 - 10 years
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("10+ years")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "10+ years" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              10+ years
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-900 font-medium mb-2">
            Preference for running account settlement<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleSettlementSelect("Quaterly")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedSettlement === "Quaterly" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              Quaterly
            </button>
            <button
              type="button"
              onClick={() => handleSettlementSelect("Monthly")}
              className={`py-2 px-3 text-sm border rounded-md hover:border-gray-400 ${
                selectedSettlement === "Monthly" ? "border-teal-800 bg-teal-50 text-teal-800" : "border-gray-300"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!isFormValid}
        className="w-full bg-teal-800 hover:bg-teal-900 text-white py-4 rounded mt-8"
      >
        Continue
      </Button>
    </div>
  );
};

export default TradingPreferences;