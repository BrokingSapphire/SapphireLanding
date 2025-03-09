import React, { useState } from "react";
import RiskDisclosureModal from "../new-signup/RiskDisclosure";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";

interface InvestmentSegmentProps {
  onNext: () => void;
}

const InvestmentSegment: React.FC<InvestmentSegmentProps> = ({ onNext }) => {
  const [selectedSegments, setSelectedSegments] = useState<string[]>([
    "cash-mutual",
  ]);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [hasAcceptedRisk, setHasAcceptedRisk] = useState(false);
  const [pendingSegment, setPendingSegment] = useState<string>("");

  const segments = [
    { id: "cash-mutual", label: "Cash/Mutual Funds" },
    { id: "fno", label: "F&O", requiresDisclosure: true },
    { id: "debt", label: "Debt" },
    { id: "currency", label: "Currency" },
    {
      id: "commodity",
      label: "Commodity Derivatives",
      requiresDisclosure: true,
    },
  ];

  const handleSegmentClick = (
    segmentId: string,
    requiresDisclosure: boolean
  ) => {
    // Can't unselect Cash/Mutual Funds
    if (segmentId === "cash-mutual") return;

    if (requiresDisclosure && !hasAcceptedRisk) {
      setPendingSegment(segmentId);
      setShowRiskModal(true);
      return;
    }

    toggleSegment(segmentId);
  };

  const toggleSegment = (segmentId: string) => {
    setSelectedSegments((prev) => {
      if (prev.includes(segmentId)) {
        return prev.filter((id) => id !== segmentId);
      }
      return [...prev, segmentId];
    });
  };

  const handleRiskAccept = () => {
    setHasAcceptedRisk(true);
    if (pendingSegment) {
      toggleSegment(pendingSegment);
      setPendingSegment("");
    }
    setShowRiskModal(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <FormHeading
        title={"Choose your investment segment"}
        description={"Choose where you want to invest and trade."}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {segments.map((segment) => (
          <button
            key={segment.id}
            onClick={() =>
              handleSegmentClick(segment.id, !!segment.requiresDisclosure)
            }
            className={`px-4 py-2 border rounded flex items-center gap-2 transition-colors
              ${
                segment.id === "cash-mutual"
                  ? "cursor-default"
                  : "cursor-pointer"
              }
              ${
                selectedSegments.includes(segment.id)
                  ? "border-teal-800 bg-teal-50"
                  : "border-gray-300 hover:border-teal-800"
              }`}
          >
            <span className="whitespace-nowrap">{segment.label}</span>
            <input
              type="checkbox"
              checked={selectedSegments.includes(segment.id)}
              onChange={() => {}}
              className="h-4 w-4 text-teal-800 border-gray-300 rounded"
              disabled={segment.id === "cash-mutual"}
            />
          </button>
        ))}
      </div>

      <Button onClick={onNext} variant={"ghost"} className="mt-6 py-6 px-10">
        Next
      </Button>

      {showRiskModal && (
        <RiskDisclosureModal
          onAccept={handleRiskAccept}
          onClose={() => {
            setShowRiskModal(false);
            setPendingSegment("");
          }}
        />
      )}
    </div>
  );
};

export default InvestmentSegment;
