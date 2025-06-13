import React, { useState } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { Check } from "lucide-react"; 
import RiskDisclosureModal from "../new-signup/RiskDisclosure";
import UploadIncomeProof from "./UploadIncomeProof";
import axios from "axios";

interface InvestmentSegmentProps {
  onNext: () => void;
}

const InvestmentSegment: React.FC<InvestmentSegmentProps> = ({ onNext }) => {
  const [selectedSegments, setSelectedSegments] = useState<string[]>(["Cash"]);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [hasAcceptedRisk, setHasAcceptedRisk] = useState(false);
  const [pendingSegment, setPendingSegment] = useState<string>("");
  const [showUploadIncome, setShowUploadIncome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const segments = [
    { id: "Cash", label: "Cash/Mutual Funds" },
    { id: "F&O", label: "F&O", requiresDisclosure: true },
    { id: "Debt", label: "Debt" },
    { id: "Currency", label: "Currency" },
    { id: "Commodity", label: "Commodity Derivatives", requiresDisclosure: true },
  ];

  const handleSegmentClick = (segmentId: string, requiresDisclosure: boolean) => {
    if (segmentId === "Cash") return;

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
    
    // Show the Upload Income Proof component when user accepts risk disclosure
    setShowUploadIncome(true);
  };

  // Submit selected investment segments
  const handleSubmitSegments = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "investment_segment",
          segments: selectedSegments,
        }
      );

      if (!response) {
        setError("Failed to save investment segments. Please try again.");
        console.error("Submit segments error, Response:", response);
        return;
      }

      console.log("Investment segments saved successfully");
      
      // Check if user selected segments that require income proof
      const needsIncomeProof = selectedSegments.some(segment => 
        segment === "F&O" || segment === "Commodity"
      );

      if (needsIncomeProof && hasAcceptedRisk) {
        // Initialize income proof step
        await handleInitializeIncomeProof();
      } else {
        onNext();
      }
    } catch (err) {
      setError("Failed to save investment segments. Please try again.");
      console.error("Submit segments error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize income proof step
  const handleInitializeIncomeProof = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "income_proof",
        }
      );

      if (!response) {
        setError("Failed to initialize income proof. Please try again.");
        console.error("Initialize income proof error, Response:", response);
        return;
      }

      console.log("Income proof initialized successfully");
      setShowUploadIncome(true);
    } catch (err) {
      setError("Failed to initialize income proof. Please try again.");
      console.error("Initialize income proof error:", err);
    }
  };

  // Handle upload income proof completion
  const handleIncomeProofNext = () => {
    onNext();
  };

  // Skip income proof upload
  const handleSkipIncomeProof = () => {
    onNext();
  };

  // If showing upload income proof, render that component
  if (showUploadIncome) {
    return (
      <UploadIncomeProof 
        onNext={handleIncomeProofNext} 
        onSkip={handleSkipIncomeProof} 
      />
    );
  }

  // Get button text based on loading state
  const getButtonText = () => {
    if (isLoading) {
      return "Saving...";
    }
    return "Next";
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <FormHeading 
        title="Choose your investment segment" 
        description="Choose where you want to invest and trade." 
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {segments.map((segment) => (
          <button
            key={segment.id}
            onClick={() => handleSegmentClick(segment.id, !!segment.requiresDisclosure)}
            disabled={isLoading}
            className={`px-4 py-2 border rounded flex items-center gap-3 transition-colors
              ${segment.id === "Cash" ? "cursor-default" : "cursor-pointer"}
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
              ${selectedSegments.includes(segment.id) ? "border-green-600 bg-green-50" : "border-gray-300 hover:border-green-600"}`}
          >
            <span className="whitespace-nowrap">{segment.label}</span>
            <div
              className={`h-6 w-6 flex items-center justify-center border-2 rounded-lg transition-colors
                ${selectedSegments.includes(segment.id) ? "border-green-600 bg-white" : "border-gray-400"}
              `}
            >
              {selectedSegments.includes(segment.id) && <Check className="h-4 w-4 text-green-600" />}
            </div>
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <Button 
        onClick={handleSubmitSegments}
        disabled={isLoading || selectedSegments.length === 0}
        variant="ghost" 
        className={`mt-6 py-6 px-10 ${
          isLoading || selectedSegments.length === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {getButtonText()}
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