import React from "react";

interface Nominee {
  id: number;
  name: string;
  panNumber: string;
  relationship: string;
  share: number;
}

interface NomineesFormData {
  nominees: Nominee[];
  currentNominee: Nominee | null;
  isAddingNominee: boolean;
}

interface NomineesManagementProps {
  formData?: NomineesFormData; // Make formData optional
  updateFormData: (data: Partial<NomineesFormData>) => void;
  onNextStep: () => void;
}

const initialNominee: Nominee = {
  id: 1,
  name: "",
  panNumber: "",
  relationship: "",
  share: 0,
};

const NomineesManagement: React.FC<NomineesManagementProps> = ({
  formData = {
    nominees: [], // Ensure nominees is always an array
    currentNominee: null,
    isAddingNominee: false,
  }, // Initialize formData with default values
  updateFormData,
  onNextStep,
}) => {
  const handleAddNominee = () => {
    updateFormData({
      isAddingNominee: true,
      currentNominee: { ...initialNominee, id: formData.nominees.length + 1 },
    });
  };

  const handleNomineeChange = (field: keyof Nominee, value: string | number) => {
    if (!formData.currentNominee) return;
    updateFormData({
      currentNominee: {
        ...formData.currentNominee,
        [field]: value,
      },
    });
  };

  const handleSaveNominee = () => {
    if (!formData.currentNominee) return;

    // Ensure nominees is always an array
    const updatedNominees = Array.isArray(formData.nominees)
      ? [...formData.nominees, formData.currentNominee]
      : [formData.currentNominee];

    updateFormData({
      nominees: updatedNominees,
      currentNominee: null,
      isAddingNominee: false,
    });
  };

  const NomineesListPage = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Nominees</h1>
          <p className="text-gray-600">Step 4 of 9</p>
        </div>
        <button
          onClick={handleAddNominee}
          className="text-teal-800 border border-teal-800 px-4 py-2 rounded"
        >
          + Add Nominee
        </button>
      </div>

      {formData.nominees.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't added any nominees yet.</p>
          <p className="text-gray-600">Click the Add Nominee button to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.nominees.map((nominee) => (
            <div
              key={nominee.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">Nominee {nominee.id}</h3>
                <p className="text-gray-600">{nominee.name}</p>
                <p className="text-gray-600">Relationship: {nominee.relationship}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{nominee.share}%</p>
                <p className="text-gray-600">Share</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onNextStep}
        disabled={formData.nominees.length === 0}
        className={`w-full bg-teal-800 text-white py-3 rounded mt-6 ${
          formData.nominees.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"
        }`}
      >
        Continue
      </button>
    </div>
  );

  const NomineeDetailsPage = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Enter your Nominee details</h1>
        <p className="text-gray-600">Step 4 of 9</p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveNominee();
        }}
      >
        <div>
          <label className="block text-gray-700 mb-2">
            Nominee {formData.currentNominee?.id}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={formData.currentNominee?.name || ""}
                onChange={(e) => handleNomineeChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Pan Number</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={formData.currentNominee?.panNumber || ""}
                onChange={(e) => handleNomineeChange("panNumber", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Relationship</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={formData.currentNominee?.relationship || ""}
            onChange={(e) => handleNomineeChange("relationship", e.target.value)}
          >
            <option value="">Select Relationship</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Share %</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            min="0"
            max="100"
            value={formData.currentNominee?.share || ""}
            onChange={(e) => handleNomineeChange("share", Number(e.target.value))}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-800 text-white py-3 rounded hover:bg-teal-700"
        >
          Save Nominee
        </button>
      </form>
    </div>
  );

  return formData.isAddingNominee ? <NomineeDetailsPage /> : <NomineesListPage />;
};

export default NomineesManagement;