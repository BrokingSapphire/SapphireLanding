import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { Check } from "lucide-react"; 
import RiskDisclosureModal from "../new-signup/RiskDisclosure";
import UploadIncomeProof from "./UploadIncomeProof";
import axios from "axios";

interface InvestmentSegmentProps {
  onNext: () => void;
  initialData?: any;
  isCompleted?: boolean;
}

const InvestmentSegment: React.FC<InvestmentSegmentProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [selectedSegments, setSelectedSegments] = useState<string[]>(["Cash"]);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [hasAcceptedRisk, setHasAcceptedRisk] = useState(false);
  const [pendingSegment, setPendingSegment] = useState<string>("");
  const [showUploadIncome, setShowUploadIncome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresIncomeProof, setRequiresIncomeProof] = useState(false);
  const [incomeProofUid, setIncomeProofUid] = useState<string | null>(null);

  const segments = [
    { id: "Cash", label: "Cash/Mutual Funds" },
    { id: "F&O", label: "F&O", requiresDisclosure: true },
    { id: "Debt", label: "Debt" },
    { id: "Currency", label: "Currency", requiresDisclosure: true },
    { id: "Commodity", label: "Commodity Derivatives", requiresDisclosure: true },
  ];

  // Prefill data from initialData (API response)
  useEffect(() => {
    if (isCompleted && initialData) {
      setSelectedSegments(initialData.segments || ["Cash"]);
    }
  }, [initialData, isCompleted]);

  const handleSegmentClick = (segmentId: string, requiresDisclosure: boolean) => {
    if (segmentId === "Cash") return;

    // Just toggle the segment selection, don't show risk modal immediately
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
    setShowRiskModal(false);
    
    // After accepting risk, show upload income proof
    setShowUploadIncome(true);
  };

  // Submit selected investment segments
  const handleSubmitSegments = async () => {
    if (isCompleted) {
      onNext();
      return;
    }

    // Check if any selected segments require risk disclosure
    const segmentsRequiringRisk = selectedSegments.filter(segment => 
      segment === "F&O" || segment === "Currency" || segment === "Commodity"
    );

    // If risk-requiring segments are selected but risk not accepted, show modal
    if (segmentsRequiringRisk.length > 0 && !hasAcceptedRisk) {
      setShowRiskModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "investment_segment",
          segments: selectedSegments,
        },
        {
          withCredentials: true // Use cookies for authentication
        }
      );

      if (!response.data) {
        setError("Failed to save investment segments. Please try again.");
        return;
      }

      // Check if backend says income proof is required
      const backendRequiresProof = response.data.data?.requiresIncomeProof;
      setRequiresIncomeProof(backendRequiresProof);

      if (backendRequiresProof && hasAcceptedRisk) {
        // Initialize income proof step
        await handleInitializeIncomeProof();
      } else {
        onNext();
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.data?.message) {
          setError(`Error: ${err.response.data.message}`);
        } else if (err.response.data?.error?.message) {
          setError(`Error: ${err.response.data.error.message}`);
        } else if (err.response.status === 400) {
          setError("Invalid investment segments. Please try again.");
        } else if (err.response.status === 401) {
          setError("Authentication failed. Please restart the process.");
        } else if (err.response.status === 422) {
          setError("Invalid segment selection. Please try again.");
        } else {
          setError(`Server error (${err.response.status}). Please try again.`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
        },
        {
          withCredentials: true // Use cookies for authentication
        }
      );

      if (!response.data?.data?.uid) {
        setError("Failed to initialize income proof. Please try again.");
        return;
      }

      // Store the UID from backend response
      setIncomeProofUid(response.data.data.uid);
      setShowUploadIncome(true);
    } catch (err: any) {
      if (err.response) {
        if (err.response.data?.message) {
          setError(`Error: ${err.response.data.message}`);
        } else if (err.response.data?.error?.message) {
          setError(`Error: ${err.response.data.error.message}`);
        } else if (err.response.status === 401) {
          setError("Authentication failed. Please restart the process.");
        } else {
          setError(`Server error (${err.response.status}). Please try again.`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Handle upload income proof completion
  const handleIncomeProofNext = async (file?: File) => {
    // The file upload is handled by UploadIncomeProof component
    // We just need to proceed to the next step
    onNext();
  };

  // Skip income proof upload
  const handleSkipIncomeProof = () => {
    onNext();
  };

  const getButtonText = () => {
    if (isCompleted) return "Continue";
    if (isLoading) return "Saving...";
    
    // Check if any selected segments require risk disclosure
    const segmentsRequiringRisk = selectedSegments.filter(segment => 
      segment === "F&O" || segment === "Currency" || segment === "Commodity"
    );
    
    if (segmentsRequiringRisk.length > 0 && !hasAcceptedRisk) {
      return "Accept Risk & Continue";
    }
    
    return "Next";
  };

  const isButtonDisabled = () => {
    if (isLoading) return true;
    if (isCompleted) return false;
    return selectedSegments.length === 0;
  };

  // If showing upload income proof, render that component
  if (showUploadIncome) {
    return (
      <UploadIncomeProof 
        onNext={handleIncomeProofNext} 
        onSkip={handleSkipIncomeProof}
        uid={incomeProofUid} // Pass the UID to UploadIncomeProof
      />
    );
  }

  // Show completed state
  if (isCompleted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <FormHeading 
          title="Investment Segments Saved Successfully!" 
          description="Your investment segments have been saved. Click continue to proceed." 
        />

        <div className="flex flex-wrap gap-2 mb-6">
          {selectedSegments.map((segmentId) => {
            const segment = segments.find(s => s.id === segmentId);
            return (
              <div
                key={segmentId}
                className="px-4 py-2 border border-green-600 bg-green-50 rounded flex items-center gap-3"
              >
                <span className="whitespace-nowrap">{segment?.label || segmentId}</span>
                <div className="h-6 w-6 flex items-center justify-center border-2 border-green-600 bg-white rounded-lg">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">Investment segments saved successfully!</span>
          </div>
        </div>

        <Button 
          onClick={handleSubmitSegments}
          variant="ghost" 
          className="mt-6 py-6 px-10"
        >
          Continue to Next Step
        </Button>
      </div>
    );
  }

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
        disabled={isButtonDisabled()}
        variant="ghost" 
        className={`mt-6 py-6 px-10 ${
          isButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
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