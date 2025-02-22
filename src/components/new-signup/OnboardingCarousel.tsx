"use client";
import React, { useState, useEffect } from "react";
import LeftPanel from "./LeftPanel";
import MobileVerification from "../forms/MobileVerification";
import EmailVerification from "../forms/EmailVerification";
import CardVerification from "../forms/CardVerification";
import PanVerification from "./PanVerification";
import AadhaarVerification from "./AadharVerification";
import TradingAccountDetails from "./TradingAccountDetails";
import PaymentSelection from "./PaymentSelection";

const OnboardingCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const TOTAL_STEPS = 6;

  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % TOTAL_STEPS);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 400);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev - 1 + TOTAL_STEPS) % TOTAL_STEPS);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 400);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === "ArrowUp") {
        handlePrevious();
      } else if (e.key === "ArrowDown") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isAnimating]);

  const components = [
    <MobileVerification onNext={handleNext} />,
    <EmailVerification onNext={handleNext} />,
    <PaymentSelection onNext={handleNext} />,
    <PanVerification onNext={handleNext} />,
    <AadhaarVerification onNext={handleNext} />,
    <CardVerification onNext={handleNext} />,
    <TradingAccountDetails onNext={handleNext} />,
  ];

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

  return (
    <div className="flex min-h-screen">
      {/* Static Left Panel */}
      <div className="bg-green-heading w-1/2 flex items-center justify-center">
        <LeftPanel step={currentStep} />
      </div>

      {/* Animated Right Panel */}
      <div className="w-1/2 bg-white">
        <div className="h-screen flex items-center">
          <div className="p-12 max-w-2xl flex mx-auto relative">
            {/* Previous Screen */}
            {direction === 1 && (
              <div
                className="absolute inset-0 p-12"
                style={{
                  transform: "translateY(-50%)",
                  opacity: 0,
                  transition: "none",
                }}
              >
                {components[(currentStep - 1 + TOTAL_STEPS) % TOTAL_STEPS]}
              </div>
            )}

            {/* Next Screen */}
            {direction === -1 && (
              <div
                className="absolute inset-0 p-12"
                style={{
                  transform: "translateY(50%)",
                  opacity: 0,
                  transition: "none",
                }}
              >
                {components[(currentStep + 1) % TOTAL_STEPS]}
              </div>
            )}

            {/* Current Screen */}
            <div className="w-full relative" style={getAnimationStyles()}>
              {components[currentStep]}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="fixed top-6 right-6 flex gap-2">
          {[...Array(TOTAL_STEPS)].map((_, step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                step === currentStep ? "bg-teal-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-2">
          <button
            className={`p-3 bg-teal-700 hover:bg-teal-600 text-white rounded-lg shadow-lg transition-colors ${
              isAnimating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevious}
            disabled={isAnimating}
            aria-label="Previous step"
          >
            ↑
          </button>
          <button
            className={`p-3 bg-teal-700 hover:bg-teal-600 text-white rounded-lg shadow-lg transition-colors ${
              isAnimating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={isAnimating}
            aria-label="Next step"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
