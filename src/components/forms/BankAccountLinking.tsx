"use client"
import React, { useState, useEffect } from "react";
import FormHeading from "./FormHeading";
import ManualBankDetails from "./ManualBankDetails";
import UpiLinking from "./UpiLinking";
import Image from "next/image";
import { toast } from "sonner";

interface BankAccountLinkingProps {
  onNext: () => void;
  initialData?: {
    bank?: {
      account_no: string;
      ifsc_code: string;
      account_type: string;
      full_name: string;
    };
  };
  isCompleted?: boolean;
}

// Global flag to track if completion toast has been shown in this session
let hasShownGlobalCompletedToast = false;

const BankAccountLinking: React.FC<BankAccountLinkingProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [linkingMethod, setLinkingMethod] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  interface BankData {
    account_no: string;
    ifsc_code: string;
    account_type: string;
    full_name: string;
  }
  const [bankData, setBankData] = useState<BankData | null>(null);

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
    if (isSmallScreen && linkingMethod === null && !isCompleted) {
      setLinkingMethod("manual");
    }
  }, [isSmallScreen, linkingMethod, isCompleted]);

  // Handle initial data and show completion toast
  useEffect(() => {
    if (isCompleted && initialData?.bank) {
      setBankData(initialData.bank);
      
      // Show completion toast only once per session
      if (!hasShownGlobalCompletedToast) {
        toast.success("Bank account already verified! You can change details or continue.");
        hasShownGlobalCompletedToast = true;
      }
    }
  }, [initialData, isCompleted]);

  // Helper function to mask account number
  const maskAccountNumber = (accountNo: string): string => {
    if (!accountNo) return "";
    if (accountNo.length <= 4) return accountNo;
    return `****${accountNo.slice(-4)}`;
  };

  // Always show the same UI - whether fresh or completed
  const renderLinkingOption = () => {
    if (linkingMethod === "manual") {
      return (
        <ManualBankDetails 
          onNext={onNext} 
          onBack={() => setLinkingMethod(null)} 
          initialData={initialData}
          isCompleted={isCompleted}
        />
      );
    } else if (linkingMethod === "upi") {
      return <UpiLinking onNext={onNext} onBack={() => setLinkingMethod(null)} />;
    }
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <FormHeading 
          title="Bank Account Details" 
          description="Seamlessly link your bank for smooth transactions." 
        />

        {/* Show completion info if already verified */}
        {isCompleted && bankData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-gray-800 font-medium">Bank Account Already Verified</p>
                <p className="text-gray-600 text-sm">You can link a different account or proceed with the current one.</p>
              </div>
            </div>
            
            {/* Show current bank details */}
            <div className="mt-4 p-3 bg-white rounded border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Account Holder:</span>
                  <div className="font-medium text-gray-800">{bankData.full_name}</div>
                </div>
                <div>
                  <span className="text-gray-600">Account Number:</span>
                  <div className="font-medium text-gray-800">{maskAccountNumber(bankData.account_no)}</div>
                </div>
                <div>
                  <span className="text-gray-600">IFSC Code:</span>
                  <div className="font-medium text-gray-800">{bankData.ifsc_code}</div>
                </div>
                <div>
                  <span className="text-gray-600">Account Type:</span>
                  <div className="font-medium text-gray-800 capitalize">{bankData.account_type}</div>
                </div>
              </div>
            </div>

            {/* Continue or Change Options */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={onNext}
                className="flex-1 bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-900 transition-colors"
              >
                Continue
              </button>
              <button 
                onClick={() => setLinkingMethod("manual")}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Link Different Account
              </button>
            </div>
          </div>
        )}

        {/* Show linking options for new users or when changing account */}
        {(!isCompleted || linkingMethod) && (
          <>
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

            {/* Show a back option if user is changing account */}
            {isCompleted && linkingMethod && (
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={() => setLinkingMethod(null)}
                  className="text-gray-600 hover:text-gray-800 text-sm underline"
                >
                  ← Back to current account
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return renderLinkingOption();
}

export default BankAccountLinking;