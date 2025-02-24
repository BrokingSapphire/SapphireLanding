import React from 'react';

interface LastStepPageProps {
  onNext: () => void;
}

const LastStepPage: React.FC<LastStepPageProps> = ({ onNext }) => {
  return (
    <div className="max-w-md mx-auto  p-4">
      <h1 className="text-2xl font-bold mb-1">Last step!</h1>
      <p className="text-gray-600 mb-8">Step 9 of 9</p>

      <button
        onClick={onNext}
        className="w-full bg-teal-800 text-white py-3 px-4 rounded font-medium hover:bg-teal-700 transition-colors"
      >
        Proceed to eSign
      </button>
    </div>
  );
};

export default LastStepPage;