import React, { useState } from "react";

interface InvestmentSegmentProps {
  onNextStep: () => void;
}

const InvestmentSegment: React.FC<InvestmentSegmentProps> = ({
  onNextStep,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    selectedSegments: [] as string[],
    isValid: false,
  });

  const segments = [
    { id: "cash-mutual", label: "Cash/Mutual Funds" },
    { id: "fno", label: "F&O" },
    { id: "debt", label: "Debt" },
    { id: "currency", label: "Currency" },
    { id: "commodity", label: "Commodity Derivatives" },
  ];

  const updateFormData = (data: Partial<typeof formData>): void => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleSegmentToggle = (segmentId: string) => {
    if (isSubmitting) return;

    const currentSegments = formData.selectedSegments;
    let newSegments: string[];

    if (currentSegments.includes(segmentId)) {
      newSegments = currentSegments.filter((id) => id !== segmentId);
    } else {
      newSegments = [...currentSegments, segmentId];
    }

    updateFormData({
      selectedSegments: newSegments,
      isValid: newSegments.length > 0,
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
    <div className="max-w-2xl mx-auto -mt-20 p-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-4">
          Choose your investment segment
        </h1>
        <p className="text-gray-600 mb-6">Step 4 of 9</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {segments.map((segment) => (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => handleSegmentToggle(segment.id)}
                  disabled={isSubmitting}
                  className={`p-4 border-2 rounded-lg text-left transition-colors flex  items-center gap-3
                    ${
                      formData.selectedSegments.includes(segment.id)
                        ? "border-teal-600 bg-teal-50"
                        : "border-gray-200 hover:border-teal-600"
                    }
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedSegments.includes(segment.id)}
                    onChange={() => handleSegmentToggle(segment.id)}
                    className="h-5 w-5 text-teal-600 border-gray-300 rounded"
                    disabled={isSubmitting}
                  />
                  <span className="font-medium">{segment.label}</span>
                </button>
              ))}
            </div>

            {formData.selectedSegments.length === 0 && (
              <p className="text-red-500 mt-2">
                Please select at least one investment segment.
              </p>
            )}

            <button
              type="submit"
              className={`w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-700 mt-6
                ${
                  formData.isValid && !isSubmitting
                    ? ""  
                    : "opacity-50 cursor-not-allowed"
                }`}
              disabled={!formData.isValid || isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestmentSegment;
