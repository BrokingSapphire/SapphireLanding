import React from "react";

interface InvestmentFormData {
  selectedSegments: string[];
  isValid: boolean;
}

interface InvestmentSegmentProps {
  formData: InvestmentFormData;
  updateFormData: (data: Partial<InvestmentFormData>) => void;
  onNextStep: () => void;
}

const InvestmentSegment: React.FC<InvestmentSegmentProps> = ({
  formData,
  updateFormData,
  onNextStep,
}) => {
  const segments = [
    { id: 'cash-mutual', label: 'Cash/Mutual Funds' },
    { id: 'fno', label: 'F&O' },
    { id: 'debt', label: 'Debt' },
    { id: 'currency', label: 'Currency' },
    { id: 'commodity', label: 'Commodity Derivatives' }
  ];

  const handleSegmentToggle = (segmentId: string) => {
    const currentSegments = formData?.selectedSegments || [];
    let newSegments: string[];

    if (currentSegments.includes(segmentId)) {
      newSegments = currentSegments.filter(id => id !== segmentId);
    } else {
      newSegments = [...currentSegments, segmentId];
    }

    updateFormData({
      selectedSegments: newSegments,
      isValid: newSegments.length > 0
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', formData); // Add this for debugging
    if (formData?.isValid) {
      onNextStep();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-4">Choose your investment segment</h1>
        <p className="text-gray-600 mb-6">Step 4 of 9</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {segments.map((segment) => (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => handleSegmentToggle(segment.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-colors
                    ${formData?.selectedSegments?.includes(segment.id)
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-600'
                    }`}
                >
                  <span className="font-medium">{segment.label}</span>
                </button>
              ))}
            </div>

            {formData?.selectedSegments?.length === 0 && (
              <p className="text-red-500 mt-2">
                Please select at least one investment segment.
              </p>
            )}

            <button
              type="submit"
              className={`w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-700 mt-6
                ${formData?.isValid ? "" : "opacity-50 cursor-not-allowed"}`}
              disabled={!formData?.isValid}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestmentSegment;