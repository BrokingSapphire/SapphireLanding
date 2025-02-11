"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type {
  PaymentMethodType,
  BankLinkMethodType,
  PageData,
  FormBaseData,
} from "../../constants/types/signup-types/form";
import MobileVerification from "./form-components/MobileVerification";
import EmailVerification from "./form-components/EmailVerification";
import CardVerification from "./form-components/CardVerification";
import ProgressBar from "./general/ProgressBar";
import PageNavigation from "./general/PageNavigation";
import PanVerification from "./form-components/PanVerification";

interface StepConfig {
  [key: number]: PageData;
}

interface FormDataType {
  [key: string]: FormBaseData & Record<string, any>;
  // page3: CardFormData
}

// Constants
const STEP_CONFIG: StepConfig = {
  1: {
    title: "Verify Your Mobile Number",
    description:
      "Let's start by verifying your mobile number for secure access.",
    component: MobileVerification,
  },
  2: {
    title: "Verify Your Email",
    description: "Please verify your email to continue with the registration.",
    component: EmailVerification,
  },
  3:{
    title: "Verify Card Details",
    description: "Easily create and manage a personalized business profile that streamlines your operations and connects you to success.",
    component: CardVerification,
  },
  4:{
    title: "Verify PAN Details",
    description: "Easily create and manage a personalized business profile that streamlines your operations and connects you to success.",
    component: PanVerification,
  },
  
  // ... Add other steps
};

const ANIMATIONS = {
  pageVariants: {
    enter: (direction: number) => ({
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  },
  pageTransition: {
    type: "tween",
    duration: 0.3,
    ease: "easeInOut",
  },
};


const Signup = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(null);
  const [bankLinkMethod, setBankLinkMethod] =
    useState<BankLinkMethodType>(null);
const [formData, setFormData] = useState<FormDataType>({
  page1: {
    mobileNumber: "",
    otp: ["", "", "", "", "", ""],
    otpVisible: false,
    otpSent: false,
    mobileError: false,
    isValid: false,
  },
  page2: {
    email: "",
    otp: ["", "", "", "", "", ""],
    otpVisible: false,
    otpSent: false,
    emailError: "",
    isValid: false,
  },
  page3: {
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    isValid: false,
    cardError: false,
  },
});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [currentStep]);

  const updateFormData = (
    pageNumber: number,
    newData: Partial<FormDataType[string]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [`page${pageNumber}`]: {
        ...prev[`page${pageNumber}`],
        ...newData,
      },
    }));
  };

  const handleNextStep = (method?: string) => {
    setDirection(1);
    if (method) {
      if (currentStep === 12) {
        setBankLinkMethod(method as BankLinkMethodType);
      } else {
        setPaymentMethod(method as PaymentMethodType);
      }
    } else if (currentStep < Object.keys(STEP_CONFIG).length) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 0);
    }
  };

  const renderComponent = () => {
    if (bankLinkMethod) {
      const BankComponent = STEP_CONFIG[currentStep]?.component;
      return (
        BankComponent && (
          <BankComponent
            onBack={() => setBankLinkMethod(null)}
            onComplete={(details: any) => {
              updateFormData(13, { bankDetails: details, isValid: true });
              setBankLinkMethod(null);
              setCurrentStep(13);
            }}
          />
        )
      );
    }

    if (paymentMethod) {
      const PaymentComponent = STEP_CONFIG[currentStep]?.component;
      return (
        PaymentComponent && (
          <PaymentComponent
            onBack={() => setPaymentMethod(null)}
            onComplete={() => {
              setCurrentStep(4);
              setPaymentMethod(null);
            }}
          />
        )
      );
    }

    const StepComponent = STEP_CONFIG[currentStep]?.component;
    return (
      StepComponent && (
        <StepComponent
          formData={formData[`page${currentStep}`]}
          updateFormData={(data: any) => updateFormData(currentStep, data)}
          onNextStep={handleNextStep}
        />
      )
    );
  };

  const canNavigateNext = (): boolean => {
    const pageData = formData[`page${currentStep}`];
    if (currentStep === 14) {
      return pageData?.photoTaken || pageData?.isValid;
    }
    return pageData?.isValid && currentStep < Object.keys(STEP_CONFIG).length;
  };

  const canNavigatePrev = (): boolean => {
    return currentStep > 1;
  };

  const handleNavigation = (direction: number) => {
    const nextStep = currentStep + direction;
    if (nextStep >= 1 && nextStep <= Object.keys(STEP_CONFIG).length) {
      setDirection(direction);
      setCurrentStep(nextStep);
    }
  };

  const { title, description } = STEP_CONFIG[currentStep] || {};

  return (
    <div className="flex flex-col min-h-screen">
      {/* {currentStep <= 3 ? <Navbar /> : <Focus_Navbar />} */}

      <ProgressBar
        currentStep={currentStep}
        totalSteps={Object.keys(STEP_CONFIG).length}
      />

      <div className="flex w-full flex-1 relative">
        <div className="w-1/3 bg-teal-800 p-16 text-white relative">
          <div className="max-w-xl mt-40">
            <h1 className="text-5xl font-bold mb-6">
              {paymentMethod ? `Complete ${paymentMethod} Payment` : title}
            </h1>
            <p className="text-xl text-gray-200 mb-12">
              {paymentMethod
                ? `Please complete your payment using ${paymentMethod}`
                : description}
            </p>
            <div className="relative">
              <div className="w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src="/assets/signup.svg"
                  alt="Signup illustration"
                  width={400}
                  height={300}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-white flex items-center justify-center">
          <div className="w-full max-w-md relative ml-[37%]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={ANIMATIONS.pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={ANIMATIONS.pageTransition}
                className="w-full"
              >
                {renderComponent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {!paymentMethod &&
          !bankLinkMethod &&
          currentStep <= Object.keys(STEP_CONFIG).length && (
            <PageNavigation
              currentStep={currentStep}
              canMoveNext={canNavigateNext()}
              canMovePrev={canNavigatePrev()}
              onNavigate={handleNavigation}
            />
          )}
      </div>
    </div>
  );
};

export default Signup;
