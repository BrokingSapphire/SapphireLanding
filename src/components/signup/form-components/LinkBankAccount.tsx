import Image from "next/image";
import React, { useState } from "react";

// Define image paths
const IMAGES = {
  UPIBlack: "/signup/UPIBlack.png",
  blackbank: "/signup/blackbank.png"
} as const;

// Define types for the form data
interface FormData {
  linkingMethod?: "upi" | "bank";
  isValid: boolean;
}

// Define props interface
interface LinkBankAccountProps {
  onNextStep: () => void;
}

// Define button props interface
interface MethodButtonProps {
  selected: boolean;
  onClick: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
}

const MethodButton: React.FC<MethodButtonProps> = ({
  selected,
  onClick,
  imageSrc,
  imageAlt,
  title,
  subtitle
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-4 transition-colors ${
      selected
        ? "border-teal-800"
        : "border-gray-300 hover:border-teal-800"
    }`}
  >
    <Image src={imageSrc} alt={imageAlt} width={1000} height={1000} className="h-12 w-auto" />
    <div className={`${subtitle ? 'text-2xl' : 'text-sm'} font-bold`}>
      {title}
    </div>
    {subtitle && (
      <div className="text-sm font-bold text-gray-500">{subtitle}</div>
    )}
  </button>
);

const LinkBankAccount: React.FC<LinkBankAccountProps> = ({ onNextStep }) => {
  // Initialize form data with default values
  const [formData, setFormData] = useState<FormData>({
    linkingMethod: undefined,
    isValid: false
  });

  const handleMethodSelect = (method: "upi" | "bank"): void => {
    setFormData({
      linkingMethod: method,
      isValid: true,
    });
  };

  const handleContinue = (): void => {
    if (formData.linkingMethod && formData.isValid) {
      onNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">Link bank account</h2>
        <p className="text-gray-600">Step 6 of 9</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MethodButton
          selected={formData.linkingMethod === "upi"}
          onClick={() => handleMethodSelect("upi")}
          imageSrc={IMAGES.UPIBlack}
          imageAlt="UPI"
          title="Link with UPI"
          subtitle="(Recommended)"
        />

        <MethodButton
          selected={formData.linkingMethod === "bank"}
          onClick={() => handleMethodSelect("bank")}
          imageSrc={IMAGES.blackbank}
          imageAlt="Bank"
          title="Enter bank details manually"
        />
      </div>

      <button
        onClick={handleContinue}
        disabled={!formData.isValid}
        className={`w-full py-3 rounded transition-colors ${
          formData.isValid
            ? "bg-teal-800 text-white hover:bg-teal-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
};

export default LinkBankAccount;