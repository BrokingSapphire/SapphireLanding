import React from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

interface LastStepPageProps {
  onNext: () => void;
}

const LastStepPage: React.FC<LastStepPageProps> = ({ onNext }) => {
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-1">Last step!</h1>
      <p className="text-gray-600 mb-8">Step 9 of 9</p>

      <Button
        variant={"ghost"}
        onClick={onNext}
        className="py-6"
      >
        Proceed to eSign <ChevronRight />
      </Button>
    </div>
  );
};

export default LastStepPage;