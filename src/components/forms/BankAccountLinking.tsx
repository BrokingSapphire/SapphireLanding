"use client"
import React, { useState, useEffect } from "react";
import FormHeading from "./FormHeading";
import ManualBankDetails from "./ManualBankDetails";
import UpiLinking from "./UpiLinking";
import Image from "next/image";

interface BankAccountLinkingProps {
  onNext: () => void;
}

const BankAccountLinking: React.FC<BankAccountLinkingProps> = ({ onNext }) => {
  const [linkingMethod, setLinkingMethod] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size on component mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // If on small screen and no method is selected yet, automatically select manual
  useEffect(() => {
    if (isSmallScreen && linkingMethod === null) {
      setLinkingMethod("manual");
    }
  }, [isSmallScreen, linkingMethod]);

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
          {/* Only show UPI option on larger screens */}
          {!isSmallScreen && (
            <button 
              className="flex flex-col items-center justify-center h-32 border-2 rounded hover:border-[#064D51]"
              onClick={() => setLinkingMethod("upi")}
            >
              <div className="flex items-center justify-center w-20 h-10 mt-4 mb-2">
                <Image width={1000} height={1000} src="/new-signup/upi.png" alt="UPI" className="h-full w-20"  />
              </div>
              <div className="font-medium">Link with UPI</div>
              <div className="text-xs text-gray-500">(recommended)</div>
            </button>
          )}
          
          <button 
            className={`flex flex-col items-center justify-center h-32 border-2 rounded hover:border-[#064D51] ${isSmallScreen ? "col-span-1" : ""}`}
            onClick={() => setLinkingMethod("manual")}
          >
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Image width={1000} height={1000} src="/new-signup/threebanks.png" alt="Bank" className="h-full w-20"  />
            </div>
            <div className="font-medium">Enter bank</div>
            <div className="font-medium">details manually</div>
          </button>
        </div>
      </div>
    );
  };
  
  return renderLinkingOption();
};

export default BankAccountLinking;