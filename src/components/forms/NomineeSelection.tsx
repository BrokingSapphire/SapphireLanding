import React, { useState } from "react";
import NomineeManagement from "../new-signup/NomineeManagement";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";

interface NomineeSelectionProps {
  onNext: () => void;
}

const NomineeSelection: React.FC<NomineeSelectionProps> = ({ onNext }) => {
  const [showNomineeForm, setShowNomineeForm] = useState(false);

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {!showNomineeForm ? (
        // Initial Nominee Selection View
        <div>
          <FormHeading
            title={"Nominees"}
            description={
              "You can add up to 5 nominee(s) to your account. Adding nominees makes the claim process simple in case of unforeseen events."
            }
          />

          <p className="text-sm text-gray-600 mb-4">
            You can add up to 3 nominees to your account. Adding nominees makes
            the process of share transfer easy in case of unforeseen events.
          </p>

          <div className="flex flex-col gap-4">
            <Button
              variant="ghost"
              onClick={() => setShowNomineeForm(true)}
              className="w-full py-6"
            >
              Add nominee now (Recommended)
            </Button>

            <button
              onClick={handleSkip}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded font-medium hover:bg-gray-50 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      ) : (
        <NomineeManagement onNext={onNext} />
      )}
    </div>
  );
};

export default NomineeSelection;
