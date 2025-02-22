"use client"
// src/components/OnboardingCarousel.jsx
import React, { useState, useEffect } from "react";
import LeftPanel from "./LeftPanel";
import MobileVerification from "../forms/MobileVerification";
import EmailVerification from "../forms/EmailVerification";
import PanVerification from "../signup/form-components/PanVerification";


const OnboardingCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
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
      setCurrentStep((prev) => (prev - 1 + 3) % 3);
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
      <PanVerification onNext={handleNext} />,
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
      <LeftPanel step={currentStep} />

      {/* Animated Right Panel */}
      <div className="w-1/2 ml-auto relative bg-white">
        <div className="p-12 h-screen overflow-y-auto">
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
              {components[(currentStep - 1 + 3) % 3]}
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
              {components[(currentStep + 1) % 3]}
            </div>
          )}

          {/* Current Screen */}
          <div className="relative" style={getAnimationStyles()}>
            {components[currentStep]}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="fixed top-6 right-6 flex gap-2">
          {[0, 1, 2].map((step) => (
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
