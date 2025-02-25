import React from 'react';
import { Button } from '../ui/button';
// import Image from 'next/image';

interface CongratulationsPageProps {
  onNext: () => void;
  clientId?: string;
}

const CongratulationsPage: React.FC<CongratulationsPageProps> = ({ 
  onNext,
  clientId = 'NT019245' // Default client ID if none provided
}) => {
  return (
    <div className=" max-w-md mx-auto text-center p-4">
      <div className="mb-8">
        {/* <Image
          src="/congratulations-illustration.svg"
          alt="Congratulations"
          width={300}
          height={200}
          className="mx-auto"
        /> */}
      </div>

      <h1 className="text-2xl font-bold mb-4">
        Congratulations!
      </h1>

      <p className="text-gray-600 mb-8">
        Your application is being reviewed. This could take up 
        to 24 hours. We will email once processed.
      </p>

      <div className="mb-8">
        <p className="text-gray-600 mb-2">Your Client ID is</p>
        <div className="inline-block border border-gray-300 rounded px-4 py-2">
          {clientId}
        </div>
      </div>

      <Button
        onClick={onNext}
        className="py-6"
      >
        Login to Terminal
      </Button>
    </div>
  );
};

export default CongratulationsPage;