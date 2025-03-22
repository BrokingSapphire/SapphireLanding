import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";

interface QrCodeVerificationProps {
  onBack: () => void;
  onComplete: () => void;
}

const QrCodeVerification: React.FC<QrCodeVerificationProps> = ({
  onBack,
  }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(300); // 5 minutes in seconds
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full mx-auto flex flex-col items-start mt-16">
      <FormHeading
        title="Video Verification (IPV)"
        description="A quick face-to-face verification for security."
      />

      <div className="relative w-full mb-4">
        <div className="absolute right-2 -top-6 flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatTime(timeRemaining)}</span>
        </div>
        <div className="border-2 border-gray-300 rounded-lg p-4 flex justify-center items-center">
          <div className="w-64 h-64">
            {/* QR Code */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="200" fill="white" />
              <path
                d="M40 40H80V80H40V40ZM120 40H160V80H120V40ZM40 120H80V160H40V120Z"
                fill="#0A5F5C"
              />
              <path
                d="M100 40H110V50H100V40ZM90 50H100V60H90V50ZM110 50H120V60H110V50ZM80 60H90V70H80V60ZM100 60H110V70H100V60ZM120 60H130V70H120V60ZM90 70H100V80H90V70ZM110 70H120V80H110V70ZM130 70H140V80H130V70ZM150 70H160V80H150V70ZM80 80H90V90H80V80ZM100 80H110V90H100V80ZM130 80H140V90H130V80ZM90 90H100V100H90V90ZM110 90H120V100H110V90ZM140 90H150V100H140V90ZM80 100H90V110H80V100ZM100 100H110V110H100V100ZM120 100H130V110H120V100ZM150 100H160V110H150V100ZM40 110H50V120H40V110ZM90 110H100V120H90V110ZM110 110H120V120H110V110ZM130 110H140V120H130V110ZM150 110H160V120H150V110ZM100 120H110V130H100V120ZM120 120H130V130H120V120ZM140 120H150V130H140V120ZM90 130H100V140H90V130ZM110 130H120V140H110V130ZM130 130H140V140H130V130ZM150 130H160V140H150V130ZM80 140H90V150H80V140ZM100 140H110V150H100V140ZM120 140H130V150H120V140ZM140 140H150V150H140V140ZM90 150H100V160H90V150ZM110 150H120V160H110V150ZM130 150H140V160H130V150ZM150 150H160V160H150V150Z"
                fill="#0A5F5C"
              />
            </svg>
          </div>
        </div>
      </div>

      <p className="text-center font-medium mb-6">
        Scan this QR code with your phone to continue!
      </p>

      <div className="w-full mt-4 flex justify-between items-center">
        <Button
          onClick={onBack}
          variant="link"
          className="flex items-center text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          go-back
        </Button>
      </div>
    </div>
  );
};

export default QrCodeVerification;