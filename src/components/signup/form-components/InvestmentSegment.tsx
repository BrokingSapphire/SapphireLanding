import React, { useState, useEffect } from "react";

interface InvestmentSegmentProps {
  onNextStep: () => void;
}

const RiskDisclosureModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}> = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Risk Disclosures on Derivatives</h2>
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>9 out of 10 individual traders in the equity Futures and Options Segment incurred net losses.</li>
            <li>On average, loss-makers registered a net trading loss close to ₹50,000.</li>
            <li>Over and above the net trading losses incurred, loss-makers expended an additional 28% of net trading losses as transaction costs.</li>
            <li>Those making net trading profits incurred between 15% to 50% of such profits as transaction costs.</li>
          </ul>
          
          <p className="text-xs text-gray-600 mt-4">
            Source: <span className="text-green-600">SEBI study</span> dated January 25, 2023 on "Analysis of Profit and Loss of Individual Traders dealing in equity Futures and Options (F&O) Segment", wherein Aggregate Level findings are based on annual Profit/Loss incurred by individual traders in equity F&O during FY 2021-22.
          </p>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={onAccept}
            className="px-4 py-2 bg-teal-800 text-white rounded-md hover:bg-teal-700"
          >
            Understood!
          </button>
        </div>
      </div>
    </div>
  );
};

const InvestmentSegment: React.FC<InvestmentSegmentProps> = ({
  onNextStep,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showRiskDisclosure, setShowRiskDisclosure] = useState<boolean>(false);
  const [hasShownRiskDisclosure, setHasShownRiskDisclosure] = useState<boolean>(false);
  const [pendingSegmentToToggle, setPendingSegmentToToggle] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    selectedSegments: ["cash-mutual"] as string[],
    isValid: true,
  });

  const segments = [
    { id: "cash-mutual", label: "Cash/Mutual Funds", requiresDisclosure: false, disabled: true },
    { id: "fno", label: "F&O", requiresDisclosure: true, disabled: false },
    { id: "debt", label: "Debt", requiresDisclosure: false, disabled: false },
    { id: "currency", label: "Currency", requiresDisclosure: false, disabled: false },
    { id: "commodity", label: "Commodity Derivatives", requiresDisclosure: true, disabled: false },
  ];

  const updateFormData = (data: Partial<typeof formData>): void => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleSegmentToggle = (segmentId: string) => {
    if (isSubmitting) return;
    
    // Cash/Mutual is always selected
    if (segmentId === "cash-mutual") return;
    
    const segment = segments.find(s => s.id === segmentId);
    
    // If this segment requires disclosure and we haven't shown it yet
    if (segment?.requiresDisclosure && !hasShownRiskDisclosure) {
      setShowRiskDisclosure(true);
      setPendingSegmentToToggle(segmentId);
      return;
    }
    
    // Otherwise toggle normally
    toggleSegment(segmentId);
  };
  
  const toggleSegment = (segmentId: string) => {
    const currentSegments = formData.selectedSegments;
    let newSegments: string[];

    if (currentSegments.includes(segmentId)) {
      newSegments = currentSegments.filter((id) => id !== segmentId);
    } else {
      newSegments = [...currentSegments, segmentId];
    }

    // Ensure cash-mutual is always included
    if (!newSegments.includes("cash-mutual")) {
      newSegments.push("cash-mutual");
    }

    updateFormData({
      selectedSegments: newSegments,
      isValid: true, // Always valid since cash-mutual is always selected
    });
  };

  const handleRiskAccept = () => {
    setHasShownRiskDisclosure(true);
    setShowRiskDisclosure(false);
    
    if (pendingSegmentToToggle) {
      toggleSegment(pendingSegmentToToggle);
      setPendingSegmentToToggle(null);
    }
  };

  const handleRiskClose = () => {
    setShowRiskDisclosure(false);
    setPendingSegmentToToggle(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

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
                  disabled={isSubmitting || segment.disabled}
                  className={`p-4 border-2 rounded-lg text-left transition-colors flex items-center gap-3
                    ${
                      formData.selectedSegments.includes(segment.id)
                        ? "border-teal-600 bg-teal-50"
                        : "border-gray-200 hover:border-teal-600"
                    }
                    ${(isSubmitting || segment.disabled) ? "opacity-70 cursor-not-allowed" : ""}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedSegments.includes(segment.id)}
                    onChange={() => handleSegmentToggle(segment.id)}
                    className="h-5 w-5 text-teal-600 border-gray-300 rounded"
                    disabled={isSubmitting || segment.disabled}
                  />
                  <span className="font-medium">{segment.label}</span>
                </button>
              ))}
            </div>

            <button
              type="submit"
              className={`w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-700 mt-6
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Next"}
            </button>
          </div>
        </form>
      </div>

      <RiskDisclosureModal 
        isOpen={showRiskDisclosure}
        onClose={handleRiskClose}
        onAccept={handleRiskAccept}
      />
    </div>
  );
};

export default InvestmentSegment;