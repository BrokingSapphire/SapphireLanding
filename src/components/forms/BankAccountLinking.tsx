"use client"
import React, { useState, useEffect } from "react";
import FormHeading from "./FormHeading";
import ManualBankDetails from "./ManualBankDetails";
import UpiLinking from "./UpiLinking";
import Image from "next/image";

interface BankAccountLinkingProps {
  onNext: () => void;
  initialData?: {
    account_no: string;
    ifsc_code: string;
  };
  isCompleted?: boolean;
}

const BankAccountLinking: React.FC<BankAccountLinkingProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
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

  // Show completed state
  if (isCompleted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <FormHeading 
          title="Bank Account Verified Successfully!" 
          description="Your bank account has been linked and verified. Click continue to proceed." 
        />

        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-green-800 font-medium">Bank Account Linked Successfully!</h3>
              {initialData?.account_no && (
                <p className="text-green-700 text-sm">
                  Account: ****{initialData.account_no.slice(-4)} | IFSC: {initialData.ifsc_code}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={onNext}
            className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-900"
          >
            Continue to Next Step
          </button>
        </div>
      </div>
    );
  }

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
              className="flex flex-col items-center justify-center h-32 border-2 rounded hover:border-[#064D51] transition-colors"
              onClick={() => setLinkingMethod("upi")}
            >
              <div className="flex items-center justify-center w-20 h-10 mt-4 mb-2">
                <Image width={1000} height={1000} src="/new-signup/new-upi.svg" alt="UPI" className="h-full w-20"  />
              </div>
              <div className="font-medium">Link with UPI</div>
              <div className="text-xs text-gray-500">(recommended)</div>
            </button>
          )}
          
          <button 
            className={`flex flex-col items-center justify-center h-32 border-2 rounded hover:border-[#064D51] transition-colors ${isSmallScreen ? "col-span-1" : ""}`}
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