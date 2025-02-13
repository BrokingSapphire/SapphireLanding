import React, { useState } from "react";

interface TradingPreferencesProps {
  onNextStep: () => void;
}

const TradingPreferences: React.FC<TradingPreferencesProps> = ({
  onNextStep,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    annualIncome: "",
    tradingExperience: "",
    settlementPreference: "",
    isValid: false,
  });

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

  const updateFormData = (data: Partial<typeof formData>): void => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleSelection = (field: string, value: string) => {
    if (isSubmitting) return;

    const updates = {
      [field]: value,
    };

    const newFormData = {
      ...formData,
      ...updates,
    };

    // Form is valid when all three selections are made
    const isValid = !!(
      newFormData.annualIncome &&
      newFormData.tradingExperience &&
      newFormData.settlementPreference
    );

    updateFormData({
      ...updates,
      isValid,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onNextStep();
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md -mt-28 p-4">
      <h2 className="text-5xl mb-2 whitespace-nowrap -ml-4">Trading account details</h2>
      <p className="text-sm text-gray-600 mb-6">Step 5 of 9</p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-md">Annual Income*</label>
            <div className="grid grid-cols-3 gap-2">
              {incomeRanges.map((range) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => handleSelection("annualIncome", range.id)}
                  disabled={isSubmitting}
                  className={`px-3 py-1 text-sm text-gray-600 border rounded transition-colors
                    ${
                      formData.annualIncome === range.id
                        ? "bg-teal-800 text-white"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-md">Trading Experience*</label>
            <div className="flex flex-wrap gap-2">
              {experienceRanges.map((range) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => handleSelection("tradingExperience", range.id)}
                  disabled={isSubmitting}
                  className={`px-3 py-1 text-gray-600 text-sm border rounded transition-colors
                    ${
                      formData.tradingExperience === range.id
                        ? "bg-teal-800 text-white"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-md ">
              Preference for running account settlement*
            </label>
            <div className="flex gap-2">
              {settlementOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    handleSelection("settlementPreference", option.id)
                  }
                  disabled={isSubmitting}
                  className={`px-3 text-gray-600 py-1 text-sm border rounded transition-colors
                    ${
                      formData.settlementPreference === option.id
                        ? "bg-teal-800 text-white"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 text-white bg-teal-800 rounded transition-colors
              ${
                formData.isValid && !isSubmitting
                  ? "hover:bg-teal-700"
                  : "opacity-50 cursor-not-allowed"
              }`}
            disabled={!formData.isValid || isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TradingPreferences;
