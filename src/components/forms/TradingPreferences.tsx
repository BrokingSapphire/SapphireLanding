import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";
import Cookies from "js-cookie";

interface TradingPreferencesProps {
  onNext: () => void;
  initialData?: unknown;
  isCompleted?: boolean;
}

type MaritalStatus = "Single" | "Married" | "Divorced";
type IncomeRange = "< 1 Lakh" | "1 - 5 Lacs" | "5 - 10 Lacs" | "10 - 25 Lacs" | "25 - 1 Cr" | "> 1Cr";
type ExperienceRange = "No Experience" | "< 1 year" | "1 - 5 years" | "5 - 10 years" | "10+ years";
type SettlementPreference = "Quarterly" | "Monthly";

const maritalStatusOptions: MaritalStatus[] = ["Single", "Married", "Divorced"];

const TradingPreferences: React.FC<TradingPreferencesProps> = ({
  onNext,
  initialData,
  isCompleted,
}) => {
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(null);
  const [selectedIncome, setSelectedIncome] = useState<IncomeRange | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceRange | null>(null);
  const [selectedSettlement, setSelectedSettlement] = useState<SettlementPreference>("Quarterly");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  // Prefill data from initialData (API response)
  useEffect(() => {
    const data = initialData as {
      marital_status?: MaritalStatus;
      annual_income?: IncomeRange;
      trading_exp?: ExperienceRange;
      account_settlement?: SettlementPreference;
    } | undefined;

    if (isCompleted && data) {
      setMaritalStatus(data.marital_status || null);
      setSelectedIncome(data.annual_income || null);
      setSelectedExperience(data.trading_exp || null);
      setSelectedSettlement(data.account_settlement || "Quarterly");
    }
  }, [initialData, isCompleted]);

  const handleMaritalStatusSelect = (status: MaritalStatus) => {
    if (isSubmitting) return;
    setMaritalStatus(status);
    setShowValidation(false);
    setError(null);
  };

  const handleIncomeSelect = (income: IncomeRange) => {
    if (isSubmitting) return;
    setSelectedIncome(income);
    setShowValidation(false);
    setError(null);
  };

  const handleExperienceSelect = (experience: ExperienceRange) => {
    if (isSubmitting) return;
    setSelectedExperience(experience);
    setShowValidation(false);
    setError(null);
  };

  const handleSettlementSelect = (settlement: SettlementPreference) => {
    if (isSubmitting) return;
    setSelectedSettlement(settlement);
    setShowValidation(false);
    setError(null);
  };

  const validateForm = () => {
    const isValid = maritalStatus && selectedIncome && selectedExperience && selectedSettlement;
    setShowValidation(!isValid);
    return isValid;
  };

  // Map frontend values to API values - Fixed to match backend validation
  const mapToApiValues = () => {
    const incomeMapping: Record<IncomeRange, string> = {
      "< 1 Lakh": "le_1_Lakh",        // Fixed: was "less_than_1_lakh"
      "1 - 5 Lacs": "1_5_Lakh",       // Fixed: was "1_5_lakh"
      "5 - 10 Lacs": "5_10_Lakh",     // Fixed: was "5_10_lakh"
      "10 - 25 Lacs": "10_25_Lakh",   // Fixed: was "10_25_lakh"
      "25 - 1 Cr": "25_1_Cr",         // Fixed: was "25_1_cr"
      "> 1Cr": "Ge_1_Cr"              // Fixed: was "more_than_1_cr"
    };

    const experienceMapping: Record<ExperienceRange, string> = {
      "No Experience": "1",            // Fixed: was "0"
      "< 1 year": "1",                 // Fixed: was "0-1"
      "1 - 5 years": "1-5",           // Kept same
      "5 - 10 years": "5-10",         // Kept same
      "10+ years": "10"               // Fixed: was "10+"
    };

    return {
      marital_status: maritalStatus,
      annual_income: selectedIncome ? incomeMapping[selectedIncome] : null,
      trading_exp: selectedExperience ? experienceMapping[selectedExperience] : null,
      acc_settlement: selectedSettlement
    };
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    if (isCompleted) {
      onNext();
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const apiValues = mapToApiValues();
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "personal_detail",
          ...apiValues
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authToken")}` 
          }
        }
      );

      if (!response.data) {
        setError("Failed to save personal details. Please try again.");
        return;
      }

      onNext();
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { message?: string };
          status?: number;
        };
      };

      if (error.response?.data?.message) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.response?.status === 400) {
        setError("Invalid details. Please check and try again.");
      } else if (error.response?.status === 401) {
        setError("Authentication failed. Please restart the process.");
      } else {
        setError("Failed to save details. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = maritalStatus && selectedIncome && selectedExperience && selectedSettlement;

  const getButtonText = () => {
    if (isCompleted) return "Continue";
    if (isSubmitting) return "Saving...";
    return "Continue";
  };

  const isButtonDisabled = () => {
    if (isSubmitting) return true;
    if (isCompleted) return false;
    return !isFormValid;
  };

  // Show completed state
  if (isCompleted) {
    return (
      <div className="w-full mx-auto mt-8">
        <FormHeading
          title="Personal Details Saved Successfully!"
          description="Your personal details have been saved. Click continue to proceed."
        />

        <div className="space-y-6 mt-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Marital Status</label>
            <div className="p-3 bg-green-50 border border-green-300 rounded">
              <span className="text-green-800 font-medium">{maritalStatus}</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Annual Income</label>
            <div className="p-3 bg-green-50 border border-green-300 rounded">
              <span className="text-green-800 font-medium">{selectedIncome}</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Trading Experience</label>
            <div className="p-3 bg-green-50 border border-green-300 rounded">
              <span className="text-green-800 font-medium">{selectedExperience}</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Account Settlement Preference</label>
            <div className="p-3 bg-green-50 border border-green-300 rounded">
              <span className="text-green-800 font-medium">{selectedSettlement}</span>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 mt-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">Personal details saved successfully!</span>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          variant={"ghost"}
          className="py-6 mt-8 w-full"
        >
          Continue to Next Step
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-8">
      <FormHeading
        title="Personal Details"
        description="Provide your personal information for account setup."
      />

      <div className="space-y-6 mt-6">
        {/* Marital Status */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Marital Status<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {maritalStatusOptions.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleMaritalStatusSelect(status)}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded border transition-colors
                  ${
                    maritalStatus === status
                      ? "border-teal-800 bg-teal-50 text-teal-800"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {status}
              </button>
            ))}
          </div>
          {showValidation && !maritalStatus && (
            <p className="text-red-500 text-sm mt-1">Please select your marital status</p>
          )}
        </div>

        {/* Annual Income */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Annual Income<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleIncomeSelect("< 1 Lakh")}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-xs md:text-sm hover:border-gray-400 ${
                selectedIncome === "< 1 Lakh"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              &lt; 1 Lakh
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("1 - 5 Lacs")}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-xs md:text-sm hover:border-gray-400 ${
                selectedIncome === "1 - 5 Lacs"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              1 - 5 Lacs
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("5 - 10 Lacs")}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-xs md:text-sm hover:border-gray-400 ${
                selectedIncome === "5 - 10 Lacs"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              5 - 10 Lacs
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("10 - 25 Lacs")}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-xs md:text-sm hover:border-gray-400 ${
                selectedIncome === "10 - 25 Lacs"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              10 - 25 Lacs
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("25 - 1 Cr")}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-xs md:text-sm hover:border-gray-400 ${
                selectedIncome === "25 - 1 Cr"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              25 - 1 Cr
            </button>
            <button
              type="button"
              onClick={() => handleIncomeSelect("> 1Cr")}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-xs md:text-sm hover:border-gray-400 ${
                selectedIncome === "> 1Cr"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              &gt; 1Cr
            </button>
          </div>
          {showValidation && !selectedIncome && (
            <p className="text-red-500 text-sm mt-1">Please select your annual income</p>
          )}
        </div>

        {/* Trading Experience */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Trading Experience<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleExperienceSelect("No Experience")}
              disabled={isSubmitting}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-xs md:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "No Experience"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              No Experience
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("< 1 year")}
              disabled={isSubmitting}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-xs md:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "< 1 year"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              &lt; 1 year
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("1 - 5 years")}
              disabled={isSubmitting}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-xs md:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "1 - 5 years"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              1 - 5 years
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("5 - 10 years")}
              disabled={isSubmitting}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-xs md:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "5 - 10 years"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              5 - 10 years
            </button>
            <button
              type="button"
              onClick={() => handleExperienceSelect("10+ years")}
              disabled={isSubmitting}
              className={`py-2 px-1 sm:px-3 text-xs sm:text-xs md:text-sm border rounded-md hover:border-gray-400 ${
                selectedExperience === "10+ years"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              10+ years
            </button>
          </div>
          {showValidation && !selectedExperience && (
            <p className="text-red-500 text-sm mt-1">Please select your trading experience</p>
          )}
        </div>

        {/* Settlement Preference */}
        <div>
          <label className="block text-gray-900 font-medium mb-2">
            Preference for running account settlement
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSettlementSelect("Quarterly")}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-xs md:text-sm hover:border-gray-400 ${
                selectedSettlement === "Quarterly"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Quarterly
            </button>
            <button
              type="button"
              onClick={() => handleSettlementSelect("Monthly")}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded border transition-colors text-xs sm:text-xs md:text-sm hover:border-gray-400 ${
                selectedSettlement === "Monthly"
                  ? "border-teal-800 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded mt-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        variant={"ghost"}
        disabled={isButtonDisabled()}
        className={`py-6 mt-8 w-full ${
          isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {getButtonText()}
      </Button>
    </div>
  );
};

export default TradingPreferences;