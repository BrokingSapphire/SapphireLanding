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
import LastStepPage from "../forms/LastStepPage";
import CongratulationsPage from "../forms/Congratulations";
import InvestmentSegment from "../forms/InvestmentSegment.tsx";
import TradingPreferences from "../forms/TradingPreferences";
import { ChevronDown, ChevronUp } from "lucide-react";
import BankAccountLinking from "../forms/BankAccountLinking";
import SignatureComponent from "../forms/Signature";
import MPIN from "../forms/MPIN";
import AadhaarPANMismatch from "../forms/AadhaarPANMismatch";
import { useCheckpoint, CheckpointStep } from "@/hooks/useCheckpoint";

const OnboardingCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Use checkpoint hook to manage state
  const { 
    checkpointData, 
    currentStep: resumeStep, 
    isLoading: checkpointLoading,
    error: checkpointError,
    getStepData,
    isStepCompleted,
    isEmailCompleted,
    isMobileCompleted 
  } = useCheckpoint();

  const TOTAL_STEPS = 16;

  // Initialize current step from checkpoint data
  useEffect(() => {
    if (!checkpointLoading && !isInitialized) {
      console.log('Resuming from step:', resumeStep);
      setCurrentStep(resumeStep);
      setIsInitialized(true);
    }
  }, [checkpointLoading, resumeStep, isInitialized]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % TOTAL_STEPS);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 400);
  }, [isAnimating, TOTAL_STEPS]);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev - 1 + TOTAL_STEPS) % TOTAL_STEPS);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 400);
  }, [isAnimating, TOTAL_STEPS]);

  const navigationButtons = [
    {
      icon: <ChevronUp size={18} />,
      onClick: handlePrevious,
      ariaLabel: "Previous step",
    },
    {
      icon: <ChevronDown size={18} />,
      onClick: handleNext,
      ariaLabel: "Next step",
    },
  ];

  // Define components with stable keys and pass checkpoint data
  const components = [
    { 
      id: "email", 
      component: (
        <EmailVerification 
          onNext={handleNext} 
          initialData={null} // Email doesn't have API data
          isCompleted={isEmailCompleted()}
        />
      )
    },
    { 
      id: "mobile", 
      component: (
        <MobileVerification 
          onNext={handleNext}
          initialData={null} // Mobile doesn't have API data
          isCompleted={isMobileCompleted()}
        />
      )
    },
    { 
      id: "pan", 
      component: (
        <PANVerify 
          onNext={handleNext}
          initialData={getStepData(CheckpointStep.PAN)}
          isCompleted={isStepCompleted(CheckpointStep.PAN)}
        />
      )
    },
    { 
      id: "aadhaar", 
      component: (
        <AadhaarVerification 
          onNext={handleNext}
          initialData={getStepData(CheckpointStep.AADHAAR)}
          isCompleted={isStepCompleted(CheckpointStep.AADHAAR)}
          panMaskedAadhaar={getStepData(CheckpointStep.PAN)?.masked_aadhaar}
        />
      )
    },
    {
      id: "investment segment",
      component: (
        <InvestmentSegment 
          onNext={handleNext}
          initialData={getStepData(CheckpointStep.INVESTMENT_SEGMENT)}
          isCompleted={isStepCompleted(CheckpointStep.INVESTMENT_SEGMENT)}
        />
      ),
    },
    { 
      id: "trading", 
      component: (
        <TradingAccountDetails 
          onNext={handleNext}
          initialData={getStepData(CheckpointStep.USER_DETAIL)}
          isCompleted={isStepCompleted(CheckpointStep.USER_DETAIL)}
        />
      )
    },
    {
      id: "trading preference",
      component: (
        <TradingPreferences 
          onNext={handleNext}
          initialData={getStepData(CheckpointStep.PERSONAL_DETAIL)}
          isCompleted={isStepCompleted(CheckpointStep.PERSONAL_DETAIL)}
        />
      ),
    },
    {
      id: "trading2",
      component: (
        <TradingAccountDetails2 
          onNext={handleNext}
          initialData={getStepData(CheckpointStep.OTHER_DETAIL)}
          isCompleted={isStepCompleted(CheckpointStep.OTHER_DETAIL)}
        />
      ),
    },
    {
      id: "bankaccountdetails",
      component: (
        <BankAccountLinking 
          onNext={handleNext}
          initialData={getStepData(CheckpointStep.BANK_VALIDATION)}
          isCompleted={isStepCompleted(CheckpointStep.BANK_VALIDATION)}
        />
      ),
    },
    { id: "ipv", component: <IPVVerification onNext={handleNext} /> },
    { id: "signature", component: <SignatureComponent onNext={handleNext} /> },
    { 
      id: "nominee", 
      component: (
        <NomineeSelection 
          onNext={handleNext}
          initialData={getStepData(CheckpointStep.ADD_NOMINEES)}
          isCompleted={isStepCompleted(CheckpointStep.ADD_NOMINEES)}
        />
      )
    },
    { id: "Last Step", component: <LastStepPage onNext={handleNext} /> },
    { id: "MPIN", component: <MPIN onNext={handleNext} /> },
    { id: "Set Password ", component: <AadhaarPANMismatch onNext={handleNext} /> },
    {
      id: "congratulations",
      component: <CongratulationsPage onNext={handleNext} />,
    },
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === "ArrowUp") {
        handlePrevious();
      } else if (e.key === "ArrowDown") {
        handleNext();
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
            We couldn't retrieve your previous progress. You can start from the beginning.
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
        <div className="hidden sm:block w-[40%] h-full">
          <LeftPanel currentStep={currentStep} />
        </div>
      )}

      {/* Animated Right Panel */}
      <div
        className={`${
          currentStep === components.length - 1 ? "w-full" : "w-full sm:w-[60%] mx-4"
        } bg-white h-full`}
      >
        <div className="h-full flex items-center">
          <div className="p-4 sm:p-10 w-full max-w-2xl flex mx-auto relative">
            {/* Previous Screen */}
            {direction === 1 && (
              <div
                key={`prev-${currentStep}`}
                className="absolute inset-0 p-4 sm:p-12"
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
                className="absolute inset-0 p-4 sm:p-12"
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
        <div className="fixed top-2 sm:top-6 right-2 sm:right-6 flex gap-1 sm:gap-2 flex-wrap max-w-[80%] sm:max-w-none justify-end">
          {components.map((_, index) => (
            <div
              key={`indicator-${index}`}
              className={`w-1 sm:w-2 h-1 sm:h-2 rounded-full transition-colors duration-300 ${
                index === currentStep ? "bg-teal-600" : 
                index < currentStep ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Properly positioned for mobile */}
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 sm:left-auto sm:transform-none sm:right-6 flex gap-1">
          {navigationButtons.map((button, index) => (
            <button
              key={index}
              className={`px-3 py-2 flex items-center justify-center bg-green-heading hover:bg-white hover:text-green-heading transition-all duration-300 ease-in-out border border-green-heading text-white shadow-lg ${
                index === 0 ? "rounded-l-md" : "rounded-r-md"
              } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={button.onClick}
              disabled={isAnimating}
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