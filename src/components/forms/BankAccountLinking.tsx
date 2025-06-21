// Enhanced BankAccountLinking component with name validation
"use client"
import React, { useState, useEffect } from "react";
import FormHeading from "./FormHeading";
import ManualBankDetails from "./ManualBankDetails";
import UpiLinking from "./UpiLinking";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

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

interface BankData {
  account_no: string;
  ifsc_code: string;
  account_type: string;
  full_name: string;
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
  const [bankData, setBankData] = useState<BankData | null>(null);
  const [isValidating, setIsValidating] = useState(false);

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

  // Get stored full name from localStorage (try multiple possible keys)
  const getStoredFullName = (): string | null => {
    if (typeof window === 'undefined') return null;
    
    // Try common localStorage keys for full name
    const possibleKeys = ['full_name', 'fullName', 'name', 'user_name', 'userName'];
    
    for (const key of possibleKeys) {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          // Try parsing as JSON first (in case it's stored as an object)
          const parsed = JSON.parse(value);
          if (typeof parsed === 'string') {
            return parsed;
          } else if (typeof parsed === 'object' && parsed.name) {
            return parsed.name;
          } else if (typeof parsed === 'object' && parsed.full_name) {
            return parsed.full_name;
          }
        } catch {
          // If JSON parsing fails, treat as string
          return value;
        }
      }
    }
    
    return null;
  };

  // Validate bank details and full name match
  const validateBankDetails = async (): Promise<boolean> => {
    setIsValidating(true);
    
    try {
      // Get bank details from API
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint/bank_validation`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`
          }
        }
      );

      if (response.data?.data?.bank?.full_name) {
        const apiBankName = response.data.data.bank.full_name.toLowerCase().trim();
        const storedName = getStoredFullName()?.toLowerCase().trim();
        
        if (!storedName) {
          toast.error("Unable to verify identity. Please restart the process.");
          return false;
        }

        // Compare names (allowing for minor variations)
        const namesMatch = compareNames(apiBankName, storedName);
        
        if (!namesMatch) {
          toast.error("Account holder name doesn't match with your official Government ID. Please try again with the correct bank account.");
          
          // Reset to main component to allow retry
          setLinkingMethod(null);
          setBankData(null);
          
          return false;
        }
        
        // Names match, proceed
        return true;
      } else {
        toast.error("Unable to fetch bank account details. Please try again.");
        return false;
      }
      
    } catch (error: any) {
      console.error("Error validating bank details:", error);
      
      if (error.response?.status === 404) {
        toast.error("Bank account details not found. Please complete bank validation first.");
      } else {
        toast.error("Error validating bank details. Please try again.");
      }
      
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  // Enhanced name comparison function
  const compareNames = (name1: string, name2: string): boolean => {
    // Remove common prefixes/suffixes and normalize
    const normalize = (name: string) => {
      return name
        .toLowerCase()
        .replace(/\b(mr|mrs|ms|dr|prof|shri|smt|kumari)\b\.?/g, '')
        .replace(/[.,\-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    };
    
    const normalized1 = normalize(name1);
    const normalized2 = normalize(name2);
    
    // Exact match
    if (normalized1 === normalized2) return true;
    
    // Check if one name contains the other (for cases like "John Doe" vs "John")
    const words1 = normalized1.split(' ').filter(w => w.length > 2);
    const words2 = normalized2.split(' ').filter(w => w.length > 2);
    
    // Check if at least 2 significant words match or if it's a subset
    const matchingWords = words1.filter(word => 
      words2.some(w => w.includes(word) || word.includes(w))
    );
    
    return matchingWords.length >= Math.min(2, Math.min(words1.length, words2.length));
  };

  // Enhanced onNext handler with validation
  const handleNext = async () => {
    // If validation is in progress, don't proceed
    if (isValidating) {
      return;
    }

    // If already completed and no changes, proceed directly
    if (isCompleted && bankData) {
      const isValid = await validateBankDetails();
      if (isValid) {
        onNext();
      }
      return;
    }

    // For new submissions, validation will be handled in the child components
    onNext();
  };

  // Helper function to mask account number
  const maskAccountNumber = (accountNo: string): string => {
    if (!accountNo) return "";
    if (accountNo.length <= 4) return accountNo;
    return `****${accountNo.slice(-4)}`;
  };

  // Enhanced method selection handler
  const handleMethodSelection = (method: string) => {
    setLinkingMethod(method);
  };

  // Rate limit display component
  const RateLimitDisplay = () => {
    return null; // Removed rate limiting
  };

  // Always show the same UI - whether fresh or completed
  const renderLinkingOption = () => {
    if (linkingMethod === "manual") {
      return (
        <ManualBankDetails 
          onNext={handleNext}
          onBack={() => setLinkingMethod(null)} 
          initialData={initialData}
          isCompleted={isCompleted}
          validateBankDetails={validateBankDetails}
        />
      );
    } else if (linkingMethod === "upi") {
      return (
        <UpiLinking 
          onNext={handleNext}
          onBack={() => setLinkingMethod(null)}
          validateBankDetails={validateBankDetails}
        />
      );
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
                onClick={handleNext}
                disabled={isValidating}
                className={`flex-1 bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-900 transition-colors ${
                  isValidating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isValidating ? 'Validating...' : 'Continue'}
              </button>
              <button 
                onClick={() => handleMethodSelection("manual")}
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
                  onClick={() => handleMethodSelection("upi")}
                >
                  <div className="flex items-center justify-center w-20 h-10 mt-4 mb-2">
                    <Image width={1000} height={1000} src="/new-signup/new-upi.svg" alt="UPI" className="h-full w-20"  />
                  </div>
                  <div className="font-medium">Link with UPI</div>
                  <div className="text-xs text-gray-500">(recommended)</div>
                </button>
              )}
              
              <button 
                className={`flex flex-col items-center justify-center h-32 border-2 rounded hover:border-[#064D51] transition-colors ${
                  isSmallScreen ? "col-span-1" : ""
                }`}
                onClick={() => handleMethodSelection("manual")}
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