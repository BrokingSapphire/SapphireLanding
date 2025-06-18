import React, { useState, useEffect } from "react";
import FormHeading from "./FormHeading";
import axios from "axios";
import Cookies from "js-cookie";
import { useCheckpoint, CheckpointStep } from '@/hooks/useCheckpoint';
import { toast } from "sonner";
import { Button } from "../ui/button";

interface NomineeManagementProps {
  onNext: () => void;
  initialData?: unknown;
  isCompleted?: boolean;
}

interface NomineeData {
  id: string;
  name: string;
  panOrAadhar: string;
  relationship: string;
  sharePercentage: string;
}

// Global flag to track if completion toast has been shown in this session
let hasShownGlobalCompletedToast = false;

const NomineeManagement: React.FC<NomineeManagementProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [nominees, setNominees] = useState<NomineeData[]>([]);
  const [currentNominee, setCurrentNominee] = useState<NomineeData>({
    id: "1",
    name: "",
    panOrAadhar: "",
    relationship: "",
    sharePercentage: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState<NomineeData[]>([]);
  const [editingNomineeId, setEditingNomineeId] = useState<string | null>(null);

  // Use the checkpoint hook
  const { 
    isStepCompleted,
    getStepData,
    refetchStep 
  } = useCheckpoint();

  const relationships = [
    "Spouse",
    "Son",
    "Daughter",
    "Father",
    "Mother",
    "Brother",
    "Sister",
    "Other",
  ];

  // Load existing nominees from hook data or initialData and show completion toast
  useEffect(() => {
    // First try to get data from hook
    const hookData = getStepData(CheckpointStep.ADD_NOMINEES);
    let dataToUse = hookData;

    // Fallback to initialData if hook data is not available
    if (!dataToUse) {
      dataToUse = initialData as { nominees?: { name?: string; govId?: string; gov_id?: string; relation?: string; share?: number }[] } | undefined;
    }
    
    if (dataToUse?.nominees && Array.isArray(dataToUse.nominees) && dataToUse.nominees.length > 0) {
      const formattedNominees = dataToUse.nominees.map((nominee: any, index: number) => ({
        id: (index + 1).toString(),
        name: nominee.name || "",
        panOrAadhar: nominee.govId || nominee.gov_id || "",
        relationship: nominee.relation || "",
        sharePercentage: nominee.share?.toString() || "",
      }));
      
      // Only update if nominees are actually different
      if (nominees.length === 0 || JSON.stringify(nominees) !== JSON.stringify(formattedNominees)) {
        setNominees(formattedNominees);
        setOriginalData(formattedNominees);
        
        // Update current nominee ID
        setCurrentNominee(prev => ({
          ...prev,
          id: (formattedNominees.length + 1).toString()
        }));

        // Show completion toast only once per session
        if (isCompleted && formattedNominees.length > 0 && !hasShownGlobalCompletedToast) {
          toast.success("Nominees already added! You can modify them or continue.");
          hasShownGlobalCompletedToast = true;
        }
      }
    }
  }, [initialData, isCompleted]); // Removed getStepData from dependencies

  const handleInputChange = (field: keyof NomineeData, value: string) => {
    setError(null);

    // Special validation for share percentage
    if (field === "sharePercentage") {
      // Ensure the value is a number and not over 100
      const numValue = parseFloat(value);
      if (numValue > 100) {
        setError("Share percentage cannot exceed 100%");
        value = "100"; // Cap at 100
      }

      // Calculate how much percentage is left to allocate
      const remainingPercentage = 100 - totalSharePercentage;
      const currentNomineePercentage =
        parseFloat(currentNominee.sharePercentage) || 0;
      const availablePercentage =
        remainingPercentage + currentNomineePercentage;

      // Ensure entered value doesn't exceed available percentage
      if (numValue > availablePercentage) {
        value = availablePercentage.toString();
        setError(`Maximum available percentage is ${availablePercentage}%`);
      }
    }

    setCurrentNominee((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNomineeInputChange = (nomineeId: string, field: keyof NomineeData, value: string) => {
    setError(null);
    
    // Special validation for share percentage
    if (field === "sharePercentage") {
      const numValue = parseFloat(value);
      if (numValue > 100) {
        setError("Share percentage cannot exceed 100%");
        value = "100";
      }

      // Calculate available percentage (excluding current nominee's percentage)
      const otherNomineesTotal = nominees
        .filter(n => n.id !== nomineeId)
        .reduce((sum, nominee) => sum + (parseFloat(nominee.sharePercentage) || 0), 0);
      
      const availablePercentage = 100 - otherNomineesTotal;
      
      if (numValue > availablePercentage) {
        value = availablePercentage.toString();
        setError(`Maximum available percentage is ${availablePercentage}%`);
      }
    }

    setNominees((prev) =>
      prev.map((nominee) =>
        nominee.id === nomineeId
          ? { ...nominee, [field]: value }
          : nominee
      )
    );
  };

  const validateNominee = () => {
    if (!currentNominee.name.trim()) {
      setError("Please enter nominee name");
      return false;
    }
    if (!currentNominee.panOrAadhar.trim()) {
      setError("Please enter PAN/Aadhar number");
      return false;
    }
    if (!currentNominee.relationship) {
      setError("Please select relationship");
      return false;
    }
    if (!currentNominee.sharePercentage) {
      setError("Please enter share percentage");
      return false;
    }

    const shareValue = parseFloat(currentNominee.sharePercentage);
    if (isNaN(shareValue) || shareValue <= 0) {
      setError("Share percentage must be greater than 0");
      return false;
    }

    if (shareValue > 100) {
      setError("Share percentage cannot exceed 100%");
      return false;
    }

    const newTotalShare = totalSharePercentage + shareValue;
    if (newTotalShare > 100) {
      setError("Total share percentage cannot exceed 100%");
      return false;
    }

    return true;
  };

  const handleAddNominee = () => {
    if (nominees.length >= 5) {
      setError("Maximum 5 nominees allowed");
      return;
    }

    if (!validateNominee()) return;

    setNominees((prev) => [...prev, currentNominee]);
    setCurrentNominee({
      id: (nominees.length + 2).toString(),
      name: "",
      panOrAadhar: "",
      relationship: "",
      sharePercentage: "",
    });
    setError(null);
  };

  const handleDeleteNominee = (id: string) => {
    const updatedNominees = nominees.filter((nominee) => nominee.id !== id);
    // Adjust the IDs of remaining nominees
    const reindexedNominees = updatedNominees.map((nominee, index) => ({
      ...nominee,
      id: (index + 1).toString(),
    }));
    
    setNominees(reindexedNominees);
    
    // Update current nominee ID
    setCurrentNominee((prev) => ({
      ...prev,
      id: (reindexedNominees.length + 1).toString(),
    }));
    
    setEditingNomineeId(null);
  };

  const totalSharePercentage = nominees.reduce(
    (sum, nominee) => sum + (parseFloat(nominee.sharePercentage) || 0),
    0
  ) + (parseFloat(currentNominee.sharePercentage) || 0);

  // Calculate remaining percentage to allocate (excluding current nominee input)
  const remainingPercentage = 100 - nominees.reduce(
    (sum, nominee) => sum + (parseFloat(nominee.sharePercentage) || 0),
    0
  );

  const isCurrentNomineeComplete =
    currentNominee.name &&
    currentNominee.panOrAadhar &&
    currentNominee.relationship &&
    currentNominee.sharePercentage;

  // Check if there are changes that require API call
  const hasChanges = () => {
    if (!isCompleted) return true; // Not completed yet, so needs API call
    
    // Check if nominees have changed
    if (nominees.length !== originalData.length) return true;
    
    return nominees.some((nominee, index) => {
      const original = originalData[index];
      return (
        nominee.name !== original?.name ||
        nominee.panOrAadhar !== original?.panOrAadhar ||
        nominee.relationship !== original?.relationship ||
        nominee.sharePercentage !== original?.sharePercentage
      );
    });
  };

  const handleSubmit = async () => {
    // If no changes and already completed, just proceed to next step
    if (!hasChanges() && isCompleted) {
      console.log("No changes detected, proceeding to next step");
      onNext();
      return;
    }

    if (nominees.length === 0) {
      setError("Please add at least one nominee");
      return;
    }

    // Calculate total including current nominee input if it exists
    const finalTotal = nominees.reduce(
      (sum, nominee) => sum + (parseFloat(nominee.sharePercentage) || 0),
      0
    ) + (parseFloat(currentNominee.sharePercentage) || 0);

    if (finalTotal !== 100) {
      setError("Total share percentage must equal 100%");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      if (!authToken) {
        setError("Authentication token not found. Please restart the process.");
        setIsLoading(false);
        return;
      }

      // Format nominees data for API
      const formattedNominees = nominees.map(nominee => ({
        name: nominee.name.trim(),
        gov_id: nominee.panOrAadhar.trim(),
        relation: nominee.relationship,
        share: parseFloat(nominee.sharePercentage)
      }));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "add_nominees",
          nominees: formattedNominees
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      if (!response.data) {
        setError("Failed to save nominees. Please try again.");
        return;
      }

      toast.success("Nominees saved successfully!");

      // Refetch the nominees step to update the hook
      refetchStep(CheckpointStep.ADD_NOMINEES);

      // Auto-advance after 2 seconds
      setTimeout(() => {
        onNext();
      }, 100);
      
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { message?: string; error?: { message?: string } };
          status?: number;
        };
        request?: unknown;
      };

      console.error("Save nominees error:", err);
      if (error.response) {
        if (error.response.data?.message) {
          setError(`Error: ${error.response.data.message}`);
        } else if (error.response.data?.error?.message) {
          setError(`Error: ${error.response.data.error.message}`);
        } else if (error.response.status === 400) {
          setError("Invalid nominee details. Please check and try again.");
        } else if (error.response.status === 401) {
          setError("Authentication failed. Please restart the process.");
        } else if (error.response.status === 403) {
          setError("Access denied. Please check your authentication and try again.");
        } else if (error.response.status === 422) {
          setError("Invalid nominee data or share percentage doesn't equal 100%.");
        } else {
          setError(`Server error (${error.response.status}). Please try again.`);
        }
      } else if (error.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Saving Nominees...";
    if (!hasChanges() && isCompleted) return "Continue";
    return "Continue";
  };

  const isButtonDisabled = () => {
    if (isLoading) return true;
    if (!hasChanges() && isCompleted) return false;
    
    // Calculate total including current nominee input for validation
    const totalWithCurrent = nominees.reduce(
      (sum, nominee) => sum + (parseFloat(nominee.sharePercentage) || 0),
      0
    ) + (parseFloat(currentNominee.sharePercentage) || 0);
    
    return nominees.length === 0 || totalWithCurrent !== 100;
  };

  // Always show the same UI - whether fresh or completed
  return (
    <div className="mx-auto h-full max-h-[80vh] overflow-y-auto mt-20">
      <div className="sticky top-0 bg-white z-10 pt-0 pb-2">
        <FormHeading
          title={"Nominees"}
          description={
            "You can add up to 5 nominee(s) to your account. Adding nominees makes the claim process simple in case of unforeseen events."
          }
        />
      </div>

      <div className="space-y-6 mt-2">
        {/* List of existing nominees - Now editable */}
        {nominees.map((nominee) => (
          <div
            key={nominee.id}
            className="mb-6 bg-white rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Nominee {nominee.id}</h3>
              <button
                onClick={() => handleDeleteNominee(nominee.id)}
                className="text-gray-600 hover:text-red-600"
                disabled={isLoading}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nominee.name}
                  onChange={(e) => handleNomineeInputChange(nominee.id, "name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  disabled={isLoading}
                  placeholder="Enter nominee name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  PAN<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nominee.panOrAadhar}
                  onChange={(e) => handleNomineeInputChange(nominee.id, "panOrAadhar", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  disabled={isLoading}
                  placeholder="Enter PAN/Aadhar number"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={nominee.relationship}
                    onChange={(e) => handleNomineeInputChange(nominee.id, "relationship", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none pr-10"
                    disabled={isLoading}
                  >
                    <option value="">Select relationship</option>
                    {relationships.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  % Share <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={nominee.sharePercentage}
                  onChange={(e) => handleNomineeInputChange(nominee.id, "sharePercentage", e.target.value)}
                  min="1"
                  max="100"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  disabled={isLoading}
                  placeholder="Enter share percentage"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Form for new nominee - Only show if less than 5 nominees AND total is less than 100% */}
        {nominees.length < 5 && totalSharePercentage < 100 && (
          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Nominee {currentNominee.id}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm sm:text-xs md:text-sm mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentNominee.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  disabled={isLoading}
                  placeholder="Enter nominee name"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-xs md:text-sm mb-1">
                  Pan/Aadhar card <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentNominee.panOrAadhar}
                  onChange={(e) =>
                    handleInputChange("panOrAadhar", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  disabled={isLoading}
                  placeholder="Enter PAN/Aadhar number"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-xs md:text-sm mb-1">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={currentNominee.relationship}
                    onChange={(e) =>
                      handleInputChange("relationship", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none pr-10"
                    disabled={isLoading}
                  >
                    <option value="">Select relationship</option>
                    {relationships.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-xs md:text-sm mb-1">
                  % Share <span className="text-red-500">*</span>
                  {nominees.length > 0 && (
                    <span className="text-xs text-gray-500 ml-1">
                      (Available: {remainingPercentage}%)
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  value={currentNominee.sharePercentage}
                  onChange={(e) =>
                    handleInputChange("sharePercentage", e.target.value)
                  }
                  min="1"
                  max={remainingPercentage || 100}
                  step="0.01"
                  placeholder={
                    nominees.length === 0
                      ? "100"
                      : remainingPercentage.toString()
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleAddNominee}
              disabled={
                !isCurrentNomineeComplete || totalSharePercentage >= 100 || isLoading
              }
              className={`flex items-center text-blue-500 hover:text-blue-600 mb-0 ${
                !isCurrentNomineeComplete || totalSharePercentage >= 100 || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              Add Nominee
            </button>
          </div>
        )}

        {/* Message when 100% is allocated */}
        {totalSharePercentage >= 100 && nominees.length < 5 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-blue-800 text-sm">
                100% share allocated. To add more nominees, please adjust the existing share percentages.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky footer with total percentage and continue button */}
      <div className="sticky bottom-0 bg-white pt-4 pb-0 border-t border-gray-200 mt-4">
        {/* Total share percentage indicator */}
        <div className="text-sm mb-4">
          <span className="text-gray-600">Total Share Percentage: </span>
          <span
            className={
              totalSharePercentage > 100
                ? "text-red-600 font-medium"
                : totalSharePercentage === 100
                ? "text-green-600 font-medium"
                : "text-gray-900"
            }
          >
            {totalSharePercentage}%
          </span>
          {totalSharePercentage < 100 && (
            <span className="ml-2 text-amber-600">
              (Need to allocate exactly 100%)
            </span>
          )}
        </div>

        {/* Continue Button */}
        <Button
        variant='ghost'
          onClick={handleSubmit}
          disabled={isButtonDisabled()}
          className={`w-full  text-white py-6 rounded font-medium transition-colors ${
            isButtonDisabled()
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

// Icon components
const TrashIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

export default NomineeManagement;