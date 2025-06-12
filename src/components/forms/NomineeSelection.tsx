import React, { useState } from "react";
import NomineeManagement from "./NomineeManagement";
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
    <div className="max-w-2xl mx-auto ">
      {!showNomineeForm ? (
        // Initial Nominee Selection View
        <div>
          <FormHeading
            title={"Nominees"}
            description={
              "You can add up to 5 nominee(s) to your account. Adding nominees makes the claim process simple in case of unforeseen events."
            }
          />

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setShowNomineeForm(true)}
              className="text-white py-3 px-2 rounded-md transition-all duration-300 ease-in-out bg-green-heading hover:bg-white border-2 border-green-heading hover:text-green-heading"
               >
              Add nominee now (Recommended)
            </button>

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
