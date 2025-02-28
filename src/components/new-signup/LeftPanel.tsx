import React, { useState, useEffect } from "react";

interface FeaturePoint {
  title: string;
  description: string;
}

interface StepItem {
  id: number;
  label: string;
  completed: boolean;
  active: boolean;
}

const LeftPanel = ({ currentStep }: { currentStep: number }) => {
  // Track previous step to detect changes
  const [prevStep, setPrevStep] = useState(currentStep);
  const [transitioningStep, setTransitioningStep] = useState<number | null>(
    null
  );

  // Detect step changes to trigger animations
  useEffect(() => {
    if (currentStep !== prevStep) {
      // Set the step that is transitioning
      setTransitioningStep(currentStep);

      // Clear the transitioning state after animation completes
      const timer = setTimeout(() => {
        setTransitioningStep(null);
        setPrevStep(currentStep);
      }, 800); // Match this with the animation duration

      return () => clearTimeout(timer);
    }
  }, [currentStep, prevStep]);

  // Define all onboarding steps for the progress stepper
  const steps: StepItem[] = [
    {
      id: 0,
      label: "PAN Verification",
      completed: currentStep > 3,
      active: currentStep === 3,
    },
    {
      id: 1,
      label: "Aadhar Verification",
      completed: currentStep > 4,
      active: currentStep === 4,
    },
    {
      id: 2,
      label: "Choose Segment",
      completed: currentStep > 5,
      active: currentStep === 5,
    },
    {
      id: 3,
      label: "Trading Account details",
      completed: currentStep > 6,
      active: currentStep === 6,
    },
    {
      id: 4,
      label: "Bank Account Details",
      completed: currentStep > 8,
      active: currentStep === 8,
    },
    {
      id: 5,
      label: "Complete Video Verification",
      completed: currentStep > 9,
      active: currentStep === 9,
    },
    {
      id: 6,
      label: "Draw Signature",
      completed: currentStep > 9,
      active: false,
    },
    {
      id: 7,
      label: "Add Nominee (Optional)",
      completed: currentStep > 10,
      active: currentStep === 10,
    },
    {
      id: 8,
      label: "Digitally Sign Documents",
      completed: currentStep > 11,
      active: currentStep === 11,
    },
  ];

  const features: FeaturePoint[] = [
    {
      title: "Seamless Account Creation",
      description:
        "Effortless and quick sign-up process with secure verification to get you started in minutes.",
    },
    {
      title: "Advanced Trading Tools",
      description:
        "Access real-time market insights, analytics, and AI-powered strategies to maximize your trading potential.",
    },
    {
      title: "Secure & Trusted Platform",
      description:
        "Trade with confidence on a highly secure platform backed by industry-leading encryption and compliance.",
    },
  ];

  // Display progress stepper for verification steps (starting from PAN verification)
  const showProgressStepper = currentStep >= 3;

  return (
    <div className="w-full h-full flex flex-col justify-between relative px-20 py-14 overflow-hidden">
      {/* Background decorative elements with enhanced animations */}
      <div className="absolute left-32 top-2 bg-yellow-400 w-96 h-40 blur-[70px] opacity-40 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute -left-6 -top-2 bg-green-500 w-44 h-32 blur-[70px] opacity-40 rounded-full animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute -right-6 -top-2 bg-green-500 w-44 h-32 blur-[70px] opacity-40 rounded-full animate-[float_10s_ease-in-out_infinite]"></div>

      <div className="absolute left-2 top-56 blur animate-[spin_15s_linear_infinite]">
        <div className="w-0 h-0 border-solid -rotate-45 border-l-[25px] border-r-[25px] border-b-[50px] border-l-transparent border-r-transparent border-b-green-500"></div>
      </div>

      <div className="absolute left-16 bottom-24 z-0 blur animate-[float_12s_ease-in-out_infinite]">
        <div className="w-0 h-0 border-solid rotate-45 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-yellow-400"></div>
      </div>

      <div className="w-6 h-6 bg-purple-500 blur opacity-70 rounded-full absolute right-24 bottom-32 z-0 animate-[float_12s_ease-in-out_infinite]"></div>
      <div className="w-3 h-3 bg-blue-400 blur opacity-60 rounded-full absolute right-40 top-40 z-0 animate-[ping_5s_ease-in-out_infinite]"></div>

      <div className="flex-grow relative z-10 flex items-center">
        <div className="max-w-2xl w-full">
          <div className="mb-12 mt-16">
            <h1 className="text-4xl font-bold text-gray-900 animate-[fadeIn_1s_ease-out]">
              Trusted Broking for
              <br />
              Smarter Investments.
            </h1>
          </div>

          {/* Conditional rendering based on the current step */}
          {!showProgressStepper ? (
            // Show features for the initial steps
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start"
                  style={{
                    animation: `fadeIn 0.5s ease-out ${
                      0.5 + index * 0.2
                    }s both`,
                  }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Show progress steps for verification process
            <div className="relative animate-[fadeIn_0.5s_ease-out] space-y-6">
              {steps.map((step, index) => {
                // Check if this step is transitioning (newly active)
                const isTransitioning = step.id + 3 === transitioningStep;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center relative ${
                      isTransitioning
                        ? "animate-[smoothFadeIn_0.8s_ease-in-out]"
                        : ""
                    }`}
                  >
                    {/* Step indicator with pulsing effect for active step */}
                    <div className="flex-shrink-0 rounded-full flex items-center justify-center z-10">
                      {step.active ? (
                        <div className="relative w-6 h-6">
                          {/* Pulsing animation for active step */}
                          <div
                            className="absolute inset-0 w-full h-full rounded-full"
                            style={{
                              animation: "smooth-pulse 2s ease-in-out infinite",
                              opacity: 0.8,
                            }}
                          ></div>
                          <div
                            className="absolute inset-0 w-full h-full rounded-full"
                            style={{
                              animation:
                                "smooth-pulse-delayed 2s ease-in-out infinite",
                              animationDelay: "1s",
                              opacity: 0.6,
                            }}
                          ></div>

                          {/* Active step indicator */}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-90 rounded-full z-10"
                          >
                            <circle cx="15" cy="15" r="12" fill="white" />
                            <circle
                              cx="15"
                              cy="15"
                              r="11.75"
                              stroke="#1DB954"
                              strokeWidth="0.5"
                            />
                            <circle cx="15" cy="15" r="5" fill="#1DB954" />
                          </svg>
                        </div>
                      ) : step.completed ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transform scale-90 rounded-full"
                        >
                          <circle cx="15" cy="15" r="12" fill="white" />
                          <circle
                            cx="15"
                            cy="15"
                            r="11.75"
                            stroke="#1DB954"
                            strokeWidth="0.5"
                          />
                          <circle cx="15" cy="15" r="5" fill="#1DB954" />
                        </svg>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-200/60"></div>
                      )}
                    </div>

                    {/* Vertical line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-2.5 top-6 w-px h-10 bg-gray-200/50"></div>
                    )}

                    {/* Step label with transition animation */}
                    <div
                      className={`ml-4 ${
                        step.active
                          ? "text-gray-900 font-medium"
                          : step.completed
                          ? "text-gray-700"
                          : "text-gray-300"
                      } transition-colors duration-300 ease-in-out`}
                    >
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <footer className="w-full pt-6 animate-[fadeIn_0.5s_ease-out_1.2s_both]">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>© Sapphire Broking</div>
          <div className="flex items-center space-x-2">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>T&C</span>
            <span>•</span>
            <span>Contact Us</span>
          </div>
        </div>
      </footer>

      {/* Add global keyframes for custom animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes smoothFadeIn {
          0% {
            opacity: 0.3;
            transform: scale(0.98) translateX(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
        }

        @keyframes smooth-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(29, 185, 84, 0.2);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(29, 185, 84, 0);
            transform: scale(1);
          }
        }

        @keyframes smooth-pulse-delayed {
          0% {
            box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(29, 185, 84, 0.1);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(29, 185, 84, 0);
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LeftPanel;
