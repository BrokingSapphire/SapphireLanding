import React, { useState } from "react";
import { Button } from "../ui/button";
import {  Check } from "lucide-react";
import FormHeading from "./FormHeading";
import Image from "next/image";

interface LastStepPageProps {
  onNext: () => void;
}

const LastStepPage: React.FC<LastStepPageProps> = ({ onNext }) => {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <div className="mx-auto  p-4 mt-10 ">
      <FormHeading
        title="Finish account set-up using Aadhar E-sign"
        description="E-sign and complete your onboarding instantly."
      />
      
      <div className="flex justify-center -mt-10">
        <div className="inline-block">
          <Image width={100} height={80} src='/signup/e-sign.png' alt="Aadhar E-sign" className="max-w-full h-auto rotate-90" />
        </div>
      </div>
      
      <div className="mb-6 flex items-center cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
        <div
          className={`h-6 w-6 flex items-center justify-center border-2 rounded-lg transition-colors cursor-pointer
            ${isChecked ? "border-green-600 bg-white" : "border-gray-400"}`}
        >
          {isChecked && <Check className="h-4 w-4 text-green-600" />}
        </div>
        <label className="text-sm text-gray-600 ml-2">
          I would like to receive ECN and other communications via email.
        </label>
      </div>
      
      <Button 
        variant="default" 
        onClick={onNext} 
        className="w-full bg-teal-800 hover:bg-teal-900 text-white py-3 rounded"
      >
        Proceed to E-sign
      </Button>
    </div>
  );
};

export default LastStepPage;
