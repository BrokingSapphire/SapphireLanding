import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { Check } from "lucide-react"; 
import RiskDisclosureModal from "../new-signup/RiskDisclosure";
import UploadIncomeProof from "./UploadIncomeProof";
import axios from "axios";
import Cookies from "js-cookie";

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
  const [isIncomeProofCompleted, setIsIncomeProofCompleted] = useState(false);

  const segments = [
    { id: "Cash", label: "Cash/Mutual Funds" },
    { id: "F&O", label: "F&O", requiresDisclosure: true },
    { id: "Debt", label: "Debt" },
    { id: "Currency", label: "Currency", requiresDisclosure: true },
    { id: "Commodity", label: "Commodity Derivatives", requiresDisclosure: true },
  ];

  // Prefill data from initialData (API response) only if the data is valid
  useEffect(() => {
    if (isCompleted && initialData && initialData.segments && initialData.segments.length > 0) {
      setSelectedSegments(initialData.segments);
    }
  }, [initialData, isCompleted]);

  // Check income proof status on component mount
  useEffect(() => {
    const checkIncomeProofStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/income-proof`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('authToken')}`
            }
          }
        );
        
        if (response.status === 200 && response.data?.data?.url) {
          console.log("Income proof already uploaded:", response.data);
          setIsIncomeProofCompleted(true);
        }
      } catch (error) {
        // If 204 or other error, income proof not uploaded yet
        console.log("Income proof not yet uploaded");
        setIsIncomeProofCompleted(false);
      }
    };
    
    checkIncomeProofStatus();
  }, []);

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

  // Check if step is truly completed (investment segment + income proof if required)
  const isStepFullyCompleted = () => {
    // Check if investment segment is completed
    if (!isCompleted || !initialData || !initialData.segments || initialData.segments.length === 0) {
      return false;
    }

    // Check if selected segments require income proof
    const segmentsRequiringRisk = selectedSegments.filter(segment => 
      segment === "F&O" || segment === "Currency" || segment === "Commodity"
    );

    // If risk segments are selected, income proof must be completed
    if (segmentsRequiringRisk.length > 0) {
      return isIncomeProofCompleted;
    }

    // If no risk segments, investment segment completion is sufficient
    return true;
  };

  // Submit selected investment segments
  const handleSubmitSegments = async () => {
    // Check if step is truly completed with valid data
    if (isStepFullyCompleted()) {
      console.log("Step fully completed, proceeding to next step");
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
      console.log("Submitting investment segments:", selectedSegments);
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "investment_segment",
          segments: selectedSegments,
        },
        {
          headers:{
            Authorization: `Bearer ${Cookies.get('authToken')}`
          }
        }
      );

      console.log("Investment segments response:", response);

      // Validate the response data
      if (!response.data || !response.data.data) {
        setError("Failed to save investment segments. Please try again.");
        setIsLoading(false);
        return;
      }

      // Check if backend says income proof is required
      const backendRequiresProof = response.data.data?.requiresIncomeProof === true;
      setRequiresIncomeProof(backendRequiresProof);

      // If risk segments are selected, income proof is required
      if (segmentsRequiringRisk.length > 0) {
        // Check if income proof is already uploaded
        if (isIncomeProofCompleted) {
          console.log("Income proof already completed, proceeding to next step");
          onNext();
        } else {
          // Need to upload income proof
          await handleInitializeIncomeProof();
        }
      } else {
        // No risk segments selected, proceed to next step
        console.log("No risk segments selected, proceeding to next step");
        onNext();
      }
    } catch (err: any) {
      console.error("Error saving investment segments:", err);
      
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
          headers:{
            Authorization: `Bearer ${Cookies.get('authToken')}`
          }
        }
      );

      if (!response.data?.data?.uid) {
        setError("Failed to initialize income proof. Please try again.");
        if(response.data?.data == null) {
          setError("Empty data received from server. Please try again.");
        }
        return;
      }
      
      console.log("Income proof initialization response:", response.data);
      
      // Store the UID from backend response
      setIncomeProofUid(response.data.data.uid);
      setShowUploadIncome(true);
    } catch (err: any) {
      console.error("Error initializing income proof:", err);
      
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
    console.log("Income proof upload completed, proceeding to next step");
    setIsIncomeProofCompleted(true);
    
    // Small delay to ensure state is updated
    setTimeout(() => {
      onNext();
    }, 500);
  };

  // Skip income proof upload
  const handleSkipIncomeProof = () => {
    console.log("Income proof upload skipped, proceeding to next step");
    onNext();
  };

  const getButtonText = () => {
    if (isStepFullyCompleted()) {
      return "Continue";
    }
    
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
    if (isStepFullyCompleted()) {
      return false;
    }
    
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

  // Show completed state if step is fully completed
  if (isStepFullyCompleted()) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <FormHeading 
          title="Investment Segments Completed Successfully!" 
          description="Your investment segments have been saved and all requirements met. Click continue to proceed." 
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

        {/* Show income proof status if applicable */}
        {selectedSegments.some(segment => segment === "F&O" || segment === "Currency" || segment === "Commodity") && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-800 font-medium">
                {isIncomeProofCompleted ? "Income proof verified" : "Income proof required segments selected"}
              </span>
            </div>
          </div>
        )}

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