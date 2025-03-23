import React, { useState } from "react";
import FormHeading from "../forms/FormHeading";

interface NomineeManagementProps {
  onNext: () => void;
}

interface NomineeData {
  id: string;
  name: string;
  panOrAadhar: string;
  relationship: string;
  sharePercentage: string;
}

const NomineeManagement: React.FC<NomineeManagementProps> = ({ onNext }) => {
  const [nominees, setNominees] = useState<NomineeData[]>([]);
  const [currentNominee, setCurrentNominee] = useState<NomineeData>({
    id: "1",
    name: "",
    panOrAadhar: "",
    relationship: "",
    sharePercentage: "",
  });
  const [error, setError] = useState<string | null>(null);

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
    setNominees((prev) => prev.filter((nominee) => nominee.id !== id));
    // Adjust the IDs of remaining nominees
    setNominees((prev) =>
      prev.map((nominee, index) => ({
        ...nominee,
        id: (index + 1).toString(),
      }))
    );
    // Update current nominee ID
    setCurrentNominee((prev) => ({
      ...prev,
      id: nominees.length === 0 ? "1" : nominees.length.toString(),
    }));
  };

  const totalSharePercentage = nominees.reduce(
    (sum, nominee) => sum + (parseFloat(nominee.sharePercentage) || 0),
    0
  );

  // Calculate remaining percentage to allocate
  const remainingPercentage = 100 - totalSharePercentage;

  // If current nominee's share is exactly 100% and no nominees yet, enable Continue
  // const currentNomineeShareIs100 =
  //   nominees.length === 0 && parseFloat(currentNominee.sharePercentage) === 100;

  const isCurrentNomineeComplete =
    currentNominee.name &&
    currentNominee.panOrAadhar &&
    currentNominee.relationship &&
    currentNominee.sharePercentage;

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
        {/* List of existing nominees */}
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
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <div className="text-sm font-medium">{nominee.name}</div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Pan/Aadhar card
                </label>
                <div className="text-sm font-medium">{nominee.panOrAadhar}</div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Relationship
                </label>
                <div className="text-sm font-medium">
                  {nominee.relationship}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  % Share
                </label>
                <div className="text-sm font-medium">
                  {nominee.sharePercentage}%
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Form for new nominee */}
        {nominees.length < 5 && (
          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Nominee {currentNominee.id}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentNominee.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Pan/Aadhar card <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentNominee.panOrAadhar}
                  onChange={(e) =>
                    handleInputChange("panOrAadhar", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <select
                  value={currentNominee.relationship}
                  onChange={(e) =>
                    handleInputChange("relationship", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">select</option>
                  {relationships.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">
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
                  max="100"
                  step="0.01"
                  placeholder={
                    nominees.length === 0
                      ? "100"
                      : remainingPercentage.toString()
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleAddNominee}
              disabled={
                !isCurrentNomineeComplete || totalSharePercentage >= 100
              }
              className={`flex items-center text-blue-500 hover:text-blue-600 mb-0
                ${
                  !isCurrentNomineeComplete || totalSharePercentage >= 100
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              Add Nominee
            </button>
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
        <button
          onClick={onNext}
          disabled={totalSharePercentage !== 100}
          className={`w-full bg-teal-800 text-white py-3 rounded font-medium transition-colors
            ${
              totalSharePercentage !== 100
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-teal-700"
            }`}
        >
          Continue
        </button>
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
    xmlns="http://www.w3.org/2000/svg"
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
    xmlns="http://www.w3.org/2000/svg"
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
