import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

interface UpiLinkingProps {
  onNext: () => void;
  onBack: () => void;
}

const UpiLinking: React.FC<UpiLinkingProps> = ({ onBack, onNext }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onNext(); // Call onNext when timer reaches zero
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onNext]);

  // Format the time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full mt-8 max-w-2xl mx-auto p-2">
      <FormHeading
        title="Bank Account Details"
        description="Seamlessly link your bank for smooth transactions."
      />
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">UPI QR</h3>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="mt-2">
        <div className="bg-[#F7F9FD] p-3 rounded flex flex-col md:flex-row gap-4 mt-2 mb-2">
          <div className="flex-1 flex justify-center">
            <div className="bg-white p-2 rounded-lg">
              <Image
                width={100}
                height={100}
                src="/api/placeholder/200/200"
                alt="QR Code"
                className="w-40 h-40"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-gray-700 mb-2 text-center font-medium">
              Scan the QR using any UPI App
            </p>

            <div className="flex space-x-2 mb-3">
              <Image
                src="/new-signup/fourBanks.png"
                width={200}
                height={100}
                alt="banks"
              />
            </div>
          </div>
        </div>
        <div className="bg-[#F7F9FD] p-3 rounded mt-6 space-y-1 text-sm">
          <h4 className="font-semibold">Scan QR Code</h4>
          <ul className="list-disc list-inside space-y-0.5 text-gray-600">
            <li>
              ₹1 will be debited from your account and refunded within 24 hours.
            </li>
            <li>Scan using any UPI app to complete bank verification.</li>
          </ul>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <Button
          type="button"
          variant="link"
          onClick={onBack}
          className="text-blue-500 mr-auto flex items-center"
        >
          Enter details manually <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UpiLinking;
