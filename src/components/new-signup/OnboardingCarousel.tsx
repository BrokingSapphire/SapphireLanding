// Updated OnboardingCarousel with localStorage for client ID management

"use client";
import React, { useState, useEffect, useCallback } from "react";
import LeftPanel from "./LeftPanel";
import MobileVerification from "../forms/MobileVerification";
import EmailVerification from "../forms/EmailVerification";
import AadhaarVerification from "../forms/AadharVerification";
import TradingAccountDetails from "../forms/TradingAccountDetails";
import PANVerify from "../forms/PANVerify";
import TradingAccountDetails2 from "../forms/TradingAccountDetails2";
import IPVVerification from "../forms/IPV";
import NomineeSelection from "../forms/NomineeSelection";
import LastStepPage from "../forms/ESign";
import CongratulationsPage from "../forms/Congratulations";
import InvestmentSegment from "../forms/InvestmentSegment.tsx";
import TradingPreferences from "../forms/TradingPreferences";
import { ChevronDown, ChevronUp } from "lucide-react";
import BankAccountLinking from "../forms/BankAccountLinking";
import SignatureComponent from "../forms/Signature";
import MPIN from "../forms/MPIN";
import { useCheckpoint, CheckpointStep } from "@/hooks/useCheckpoint";
import SetPassword from "../forms/SetPassword";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

const OnboardingCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [forceProgress, setForceProgress] = useState(false);

  // Use checkpoint hook to manage state
  const { 
    currentStep: resumeStep, 
    isLoading: checkpointLoading,
    error: checkpointError,
    getStepData,
    isStepCompleted,
    isEmailCompleted,
    isMobileCompleted,
    getClientId,
    refetchStep,
  } = useCheckpoint();

  const TOTAL_STEPS = 16;

  // Initialize current step from checkpoint data and client ID from localStorage
  useEffect(() => {
    if (!checkpointLoading && !isInitialized) {
      console.log('Resuming from step:', resumeStep);
      setCurrentStep(resumeStep);
      
      // Check localStorage for existing client ID
      if (typeof window !== 'undefined') {
        const storedClientId = localStorage.getItem('clientId');
        if (storedClientId) {
          console.log('Found existing client ID in localStorage:', storedClientId);
        } else {
          // Try to get client ID from checkpoint data and save to localStorage
          const existingClientId = getClientId();
          if (existingClientId) {
            localStorage.setItem('clientId', existingClientId);
            console.log('Saved client ID from checkpoint to localStorage:', existingClientId);
          }
        }
      }
      
      setIsInitialized(true);
    }
  }, [checkpointLoading, resumeStep, isInitialized, getClientId]);

  // Special effect to handle income proof progress
  useEffect(() => {
    // If we're on the investment segment and forceProgress is true
    if (currentStep === 4 && forceProgress) {
      // Check if income proof exists
      const checkIncomeProof = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/income-proof/`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('authToken')}`
              }
            }
          );
          
          if (response.status === 200 && response.data?.data?.url) {
            console.log("Income proof is confirmed, proceeding to next step");
            
            // Refetch investment segment data
            refetchStep(CheckpointStep.INVESTMENT_SEGMENT);
            refetchStep(CheckpointStep.INCOME_PROOF);
            
            // Proceed to next step with a delay
            setTimeout(() => {
              setCurrentStep(5); // Move to the User Details step
              setForceProgress(false);
            }, 1000);
          } else {
            // Reset force progress if no valid income proof
            setForceProgress(false);
          }
        } catch (error) {
          console.error("Error checking income proof:", error);
          setForceProgress(false);
        }
      };
      
      checkIncomeProof();
    }
  }, [currentStep, forceProgress, refetchStep]);

  // Helper function to get client ID from localStorage
  const getStoredClientId = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('clientId');
  };

  // Check if the current step is completed
  const isCurrentStepCompleted = () => {
    // If force progress is enabled, always consider current step completed
    if (forceProgress && currentStep === 4) {
      return true;
    }
    
    switch (currentStep) {
      case 0: // Email
        return isEmailCompleted();
      case 1: // Mobile
        return isMobileCompleted();
      case 2: // PAN
        return isStepCompleted(CheckpointStep.PAN);
      case 3: // Aadhaar
        return isStepCompleted(CheckpointStep.AADHAAR);
      case 4: // Investment Segment
        // Enhanced check: Investment segment is complete if:
        // 1. Investment segment step is completed AND
        // 2. If income proof is required, it must also be completed
        const investmentCompleted = isStepCompleted(CheckpointStep.INVESTMENT_SEGMENT);
        if (!investmentCompleted) {
          return false;
        }

        const investmentData = getStepData(CheckpointStep.INVESTMENT_SEGMENT);
        const requiresIncomeProof = investmentData?.requiresIncomeProof === true;
        
        // Check if user selected risk segments
        const selectedSegments: string[] = Array.isArray(investmentData?.segments) ? investmentData.segments : [];
        const hasRiskSegments = selectedSegments.some((segment: string) => 
          segment === "F&O" || segment === "Currency" || segment === "Commodity"
        );
        
        // If income proof is required (either by backend flag or risk segments)
        if (requiresIncomeProof || hasRiskSegments) {
          const incomeProofCompleted = isStepCompleted(CheckpointStep.INCOME_PROOF);
          console.log(`Investment step completion check: investmentCompleted=${investmentCompleted}, requiresIncomeProof=${requiresIncomeProof}, hasRiskSegments=${hasRiskSegments}, incomeProofCompleted=${incomeProofCompleted}`);
          return incomeProofCompleted;
        }
        
        // If no income proof required, investment segment completion is sufficient
        console.log(`Investment step completion check: investmentCompleted=${investmentCompleted}, no income proof required`);
        return true;
      case 5: // User Detail
        return isStepCompleted(CheckpointStep.USER_DETAIL);
      case 6: // Personal Detail
        return isStepCompleted(CheckpointStep.PERSONAL_DETAIL);
      case 7: // Other Detail
        return isStepCompleted(CheckpointStep.OTHER_DETAIL);
      case 8: // Bank Validation
        return isStepCompleted(CheckpointStep.BANK_VALIDATION);
      case 9: // IPV
        const ipvData = getStepData(CheckpointStep.IPV);
        return isStepCompleted(CheckpointStep.IPV) && ipvData && ipvData.url;
      case 10: // Signature
        const signatureData = getStepData(CheckpointStep.SIGNATURE);
        return isStepCompleted(CheckpointStep.SIGNATURE) && signatureData && signatureData.url;
      case 11: // Add Nominees
        return isStepCompleted(CheckpointStep.ADD_NOMINEES);
      case 12: // E-Sign
        return isStepCompleted(CheckpointStep.ESIGN);
      case 13: // Password Setup
        return isStepCompleted(CheckpointStep.PASSWORD_SETUP);
      case 14: // MPIN Setup
        return isStepCompleted(CheckpointStep.MPIN_SETUP);
      case 15: // Congratulations - always allow to proceed
        return true;
      default:
        return false;
    }
  };

  // Determine if going back to a step is allowed
  const isBackNavigationAllowed = (targetStep: number): boolean => {
    // Never allow going back before PAN if email and mobile are completed
    if (targetStep < 2 && isEmailCompleted() && isMobileCompleted()) {
      toast.error("Email and phone verification are already completed.");
      return false;
    }
    
    return true;
  };

  // NEW: Enhanced handleNext that handles step completion properly
  const handleNext = useCallback(async (forceNext = false) => {
    if (isAnimating) return;
    
    // Special case for investment segment with income proof
    if (currentStep === 4 && isStepCompleted(CheckpointStep.INCOME_PROOF)) {
      // Force proceed to next step
      setDirection(1);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(5); // User Detail step
        setTimeout(() => {
          setIsAnimating(false);
        }, 100);
      }, 400);
      return;
    }
    
    // If forceNext is true, skip completion check (used after successful API calls)
    if (!forceNext) {
      // Check if current step is completed before allowing navigation
      if (!isCurrentStepCompleted()) {
        toast.error("Please complete the current step before proceeding.");
        return;
      }
    }
    
    setDirection(1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % TOTAL_STEPS);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 400);
  }, [isAnimating, TOTAL_STEPS, isCurrentStepCompleted, currentStep, isStepCompleted]);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    
    // Don't allow going back from the first step
    if (currentStep === 0) {
      toast.error("You're already at the first step.");
      return;
    }
    
    // Calculate the target step
    const targetStep = currentStep - 1;
    
    // Check if going back is allowed
    if (!isBackNavigationAllowed(targetStep)) {
      return;
    }
    
    setDirection(-1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(targetStep);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 400);
  }, [isAnimating, currentStep, isBackNavigationAllowed]);

  // NEW: Enhanced step completion handler
  const handleStepCompletion = useCallback(async (stepType: CheckpointStep) => {
    console.log(`Step ${stepType} completed, invalidating cache and proceeding...`);
    
    // Invalidate the specific step cache
    refetchStep(stepType);
    
    // Wait a moment for cache invalidation, then proceed
    setTimeout(() => {
      handleNext(true); // Force next with true parameter
    }, 500);
  }, [refetchStep, handleNext]);

  const navigationButtons = [
    {
      icon: <ChevronUp size={18} />,
      onClick: handlePrevious,
      ariaLabel: "Previous step",
    },
    {
      icon: <ChevronDown size={18} />,
      onClick: () => handleNext(false),
      ariaLabel: "Next step",
      // Disable next button when current step is not completed
      disabled: !isCurrentStepCompleted(),
    },
  ];

  // Special handler for investment segment next
  const handleInvestmentNext = useCallback(async () => {
    // Check if income proof exists
    const checkIncomeProof = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/income-proof/`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('authToken')}`
            }
          }
        );
        
        if (response.status === 200 && response.data?.data?.url) {
          console.log("Income proof is confirmed, proceeding to next step");
          
          // Force advance to next step
          setForceProgress(true);
          handleNext(true);
        } else {
          // Normal next behavior - but use step completion handler
          await handleStepCompletion(CheckpointStep.INVESTMENT_SEGMENT);
        }
      } catch (error) {
        console.error("Error checking income proof:", error);
        // Proceed anyway with step completion handler
        await handleStepCompletion(CheckpointStep.INVESTMENT_SEGMENT);
      }
    };
    
    // Check income proof before proceeding
    checkIncomeProof();
  }, [handleNext, handleStepCompletion]);

  // Define components with enhanced onNext handlers
  const components = [
    { 
      id: "email", 
      component: (
        <EmailVerification 
          onNext={() => handleNext(true)} // Email verification handles its own completion
          initialData={undefined}
          isCompleted={isEmailCompleted()}
        />
      )
    },
    { 
      id: "mobile", 
      component: (
        <MobileVerification 
          onNext={() => handleNext(true)} // Mobile verification handles its own completion
          initialData={undefined}
          isCompleted={isMobileCompleted()}
        />
      )
    },
    
    { 
      id: "pan", 
      component: (
        <PANVerify 
          onNext={() => handleStepCompletion(CheckpointStep.PAN)}
          initialData={getStepData(CheckpointStep.PAN)}
          isCompleted={isStepCompleted(CheckpointStep.PAN)}
        />
      )
    },
    { 
      id: "aadhaar", 
      component: (
        <AadhaarVerification 
          onNext={() => handleStepCompletion(CheckpointStep.AADHAAR)}
          initialData={getStepData(CheckpointStep.AADHAAR)}
          isCompleted={isStepCompleted(CheckpointStep.AADHAAR)}
          panMaskedAadhaar={getStepData(CheckpointStep.PAN)?.masked_aadhaar as string | undefined}
        />
      )
    },
    {
      id: "investment segment",
      component: (
        <InvestmentSegment 
          onNext={handleInvestmentNext} // Use special handler
          initialData={getStepData(CheckpointStep.INVESTMENT_SEGMENT) ?? undefined}
          isCompleted={isStepCompleted(CheckpointStep.INVESTMENT_SEGMENT)}
        />
      ),
    },
    { 
      id: "trading", 
      component: (
        <TradingAccountDetails 
          onNext={() => handleStepCompletion(CheckpointStep.USER_DETAIL)}
          initialData={getStepData(CheckpointStep.USER_DETAIL) ?? undefined}
          isCompleted={isStepCompleted(CheckpointStep.USER_DETAIL)}
        />
      )
    },
    {
      id: "trading preference",
      component: (
        <TradingPreferences 
          onNext={() => handleStepCompletion(CheckpointStep.PERSONAL_DETAIL)}
          initialData={getStepData(CheckpointStep.PERSONAL_DETAIL)}
          isCompleted={isStepCompleted(CheckpointStep.PERSONAL_DETAIL)}
        />
      ),
    },
    {
      id: "trading2",
      component: (
        <TradingAccountDetails2 
          onNext={() => handleStepCompletion(CheckpointStep.OTHER_DETAIL)}
          initialData={getStepData(CheckpointStep.OTHER_DETAIL)}
          isCompleted={isStepCompleted(CheckpointStep.OTHER_DETAIL)}
        />
      ),
    },
    {
      id: "bankaccountdetails",
      component: (
        <BankAccountLinking 
          onNext={() => handleStepCompletion(CheckpointStep.BANK_VALIDATION)}
          initialData={getStepData(CheckpointStep.BANK_VALIDATION) ?? undefined}
          isCompleted={isStepCompleted(CheckpointStep.BANK_VALIDATION)}
        />
      ),
    },
    { 
      id: "ipv", 
      component: (
        <IPVVerification 
          onNext={() => handleStepCompletion(CheckpointStep.IPV)}
          initialData={getStepData(CheckpointStep.IPV) ?? undefined}
          isCompleted={isStepCompleted(CheckpointStep.IPV)}
        />
      )
    },
    { 
      id: "signature", 
      component: (
        <SignatureComponent 
          onNext={() => handleStepCompletion(CheckpointStep.SIGNATURE)}
          initialData={getStepData(CheckpointStep.SIGNATURE) ?? undefined}
          isCompleted={isStepCompleted(CheckpointStep.SIGNATURE)}
        />
      )
    },
    { 
      id: "nominee", 
      component: (
        <NomineeSelection 
          onNext={() => handleStepCompletion(CheckpointStep.ADD_NOMINEES)}
          initialData={getStepData(CheckpointStep.ADD_NOMINEES)}
          isCompleted={isStepCompleted(CheckpointStep.ADD_NOMINEES)}
        />
      )
    },
    {
      id: "Last Step", 
      component: (
        <LastStepPage 
          onNext={() => handleStepCompletion(CheckpointStep.ESIGN)}
          initialData={getStepData(CheckpointStep.ESIGN)}
          isCompleted={isStepCompleted(CheckpointStep.ESIGN)}
        />
      )
    },
    { 
      id: "Set Password", 
      component: (
        <SetPassword 
          onNext={() => {
            console.log('SetPassword completed');
            // Client ID is now handled in localStorage within SetPassword component
            handleStepCompletion(CheckpointStep.PASSWORD_SETUP);
          }}
          initialData={getStepData(CheckpointStep.PASSWORD_SETUP) ?? undefined}
          isCompleted={isStepCompleted(CheckpointStep.PASSWORD_SETUP)}
        />
      )
    },
    { 
      id: "MPIN", 
      component: (
        <MPIN 
          onNext={() => {
            console.log('MPIN completed');
            // Client ID is now retrieved from localStorage within MPIN component
            handleStepCompletion(CheckpointStep.MPIN_SETUP);
          }}
          clientId={getStoredClientId() ?? undefined} // Pass client ID from localStorage, convert null to undefined
          initialData={getStepData(CheckpointStep.MPIN_SETUP) ?? undefined}
          isCompleted={isStepCompleted(CheckpointStep.MPIN_SETUP)}
        />
      )
    },
    {
      id: "congratulations",
      component: (
        <CongratulationsPage 
          onNext={() => handleNext(true)}
          clientId={getStoredClientId() ?? undefined} // Pass client ID from localStorage, convert null to undefined
        />
      ),
    },
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === "ArrowUp") {
        handlePrevious();
      } else if (e.key === "ArrowDown") {
        handleNext(false);
      }
    };

    // Prevent scrolling
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "";
    };
  }, [handleNext, handlePrevious]);

  const getAnimationStyles = () => {
    if (!isAnimating) {
      return {
        transform: "translateY(0)",
        opacity: 1,
        transition: "none",
      };
    }

    return {
      transform: `translateY(${direction * -50}%)`,
      opacity: 0,
      transition:
        "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in-out",
    };
  };

  // Show loading state while fetching checkpoint data
  if (checkpointLoading && !isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  // Show error state if checkpoint fetch failed
  if (checkpointError && !isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Progress</h3>
          <p className="text-gray-600 mb-4">
            We couldn&apos;t retrieve your previous progress. You can start from the beginning.
          </p>
          <button 
            onClick={() => {
              setCurrentStep(0);
              setIsInitialized(true);
            }}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      {/* Static Left Panel */}
      {currentStep === components.length - 1 ? (
        <></>
      ) : (
        <div className="hidden lg:block w-[40%] h-full">
          <LeftPanel currentStep={currentStep} />
        </div>
      )}

      {/* Animated Right Panel */}
      <div
        className={`${
          currentStep === components.length - 1 ? "w-full" : "w-full lg:w-[60%] mx-4"
        } bg-white h-full`}
      >
        <div className="h-full flex items-center">
          <div className="p-4 lg:p-10 w-full max-w-2xl flex mx-auto relative">
            {/* Previous Screen */}
            {direction === 1 && (
              <div
                key={`prev-${currentStep}`}
                className="absolute inset-0 p-4 lg:p-12"
                style={{
                  transform: "translateY(-50%)",
                  opacity: 0,
                  transition: "none",
                }}
              >
                {
                  components[(currentStep - 1 + TOTAL_STEPS) % TOTAL_STEPS]
                    .component
                }
              </div>
            )}

            {/* Next Screen */}
            {direction === -1 && (
              <div
                key={`next-${currentStep}`}
                className="absolute inset-0 p-4 lg:p-12"
                style={{
                  transform: "translateY(50%)",
                  opacity: 0,
                  transition: "none",
                }}
              >
                {components[(currentStep + 1) % TOTAL_STEPS].component}
              </div>
            )}

            {/* Current Screen */}
            <div
              key={`current-${currentStep}`}
              className="w-full relative"
              style={getAnimationStyles()}
            >
              {components[currentStep].component}
            </div>
          </div>
        </div>

        {/* Progress Indicator - Smaller on mobile */}
        <div className="fixed top-2 lg:top-6 right-2 lg:right-6 flex gap-1 lg:gap-2 flex-wrap max-w-[80%] lg:max-w-none justify-end">
          {components.map((_, index) => (
            <div
              key={`indicator-${index}`}
              className={`w-1 lg:w-2 h-1 lg:h-2 rounded-full transition-colors duration-300 ${
                index === currentStep ? "bg-teal-600" : 
                index < currentStep ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Properly positioned for mobile */}
        <div className="fixed bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 lg:left-auto lg:transform-none lg:right-6 flex gap-1">
          {navigationButtons.map((button, index) => (
            <button
              key={index}
              className={`px-3 py-2 flex items-center justify-center ${
                button.disabled 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-green-heading hover:bg-white hover:text-green-heading"
              } transition-all duration-300 ease-in-out border ${
                button.disabled 
                  ? "border-gray-400" 
                  : "border-green-heading"
              } text-white shadow-lg ${
                index === 0 ? "rounded-l-md" : "rounded-r-md"
              } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={button.onClick}
              disabled={isAnimating || button.disabled}
              aria-label={button.ariaLabel}
            >
              {button.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Global style to prevent scrolling */}
      <style jsx global>{`
        html,
        body {
          overflow: hidden;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default OnboardingCarousel;