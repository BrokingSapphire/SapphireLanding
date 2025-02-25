import React, { useState } from 'react';
import NomineeManagement from '../new-signup/NomineeManagement';
import { Button } from '../ui/button';

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
          <h2 className="text-2xl font-bold mb-1">Nominees</h2>
          <p className="text-gray-600 mb-6">Step 8 of 9</p>
          
          <p className="text-sm text-gray-600 mb-4">
            You can add up to 3 nominees to your account. Adding nominees makes the process
            of share transfer easy in case of unforeseen events.
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