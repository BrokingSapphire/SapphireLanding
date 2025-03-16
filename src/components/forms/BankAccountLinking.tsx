"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import ManualBankDetails from "./ManualBankDetails";
import UpiLinking from "./UpiLinking";
import Image from "next/image";

interface BankAccountLinkingProps {
  onNext: () => void;
}

const BankAccountLinking: React.FC<BankAccountLinkingProps> = ({ onNext }) => {
  const [linkingMethod, setLinkingMethod] = useState<string | null>(null);

  const renderLinkingOption = () => {
    if (linkingMethod === "manual") {
      return <ManualBankDetails onNext={onNext} onBack={() => setLinkingMethod(null)} />;
    } else if (linkingMethod === "upi") {
      return <UpiLinking onNext={onNext} onBack={() => setLinkingMethod(null)} />;
    }

    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <FormHeading 
          title="Bank Account Details" 
          description="Seamlessly link your bank for smooth transactions." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-32 border-2 hover:border-blue-500"
            onClick={() => setLinkingMethod("upi")}
          >
            <div className="flex items-center justify-center w-10 h-10 mb-2">
              <Image width={1000} height={1000} src="" alt="UPI" className="w-8 h-8" />
            </div>
            <div className="font-medium">Link with UPI</div>
            <div className="text-xs text-gray-500">(recommended)</div>
          </Button>

          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-32 border-2 hover:border-blue-500"
            onClick={() => setLinkingMethod("manual")}
          >
            <div className="flex items-center justify-center space-x-1 mb-2">
              <div className="w-6 h-6 bg-red-500 rounded-sm flex items-center justify-center text-white text-xs">
                H
              </div>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                S
              </div>
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                B
              </div>
            </div>
            <div className="font-medium">Enter bank</div>
            <div className="font-medium">details manually</div>
          </Button>
        </div>
      </div>
    );
  };

  return renderLinkingOption();
};

export default BankAccountLinking;