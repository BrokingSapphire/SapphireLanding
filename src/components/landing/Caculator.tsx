"use client";
import React from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

interface CalculatorButtonProps {
  label: string;
  imageSrc: string;
  onClick?: () => void;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  imageSrc,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="w-full flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
  >
    <div className="flex items-center gap-2 sm:gap-4 text-[#5B5B5B] text-base sm:text-lg font-medium">
      <Image
        src={imageSrc}
        alt={label}
        width={30}
        height={30}
        className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
      />
      {label}
    </div>
    <FaChevronRight className="text-gray-500 text-lg sm:text-xl" />
  </button>
);

const calculatorTypes = [
  { label: "SIP Calculator", id: "sip", imageSrc: "/main/image_24.png" },
  { label: "Margin Calculator", id: "margin", imageSrc: "/main/image_25.png" },
  {
    label: "Brokerage Calculator",
    id: "brokerage",
    imageSrc: "/main/image_26.png",
  },
];

const Calculator: React.FC = () => {
  const handleCalculatorClick = (calculatorId: string) => {
    console.log(`Selected calculator: ${calculatorId}`);
  };

  return (
    <section className="bg-[#F5F7FA] py-8 sm:py-12 px-12 md:py-16">
      <div className="max-w-7xl flex flex-col-reverse md:flex-col lg:flex-row justify-between items-center mx-auto px-4 sm:px-6 lg:px-12">
        {/* Text & Buttons Section */}
        <div className="w-full lg:w-1/2 mt-6 md:mt-0">
          <h1 className="font-lexend text-3xl sm:text-3xl font-semibold text-black mb-8 sm:mb-6 text-center lg:text-left">
            Simplify your investments with our smart calculators!
          </h1>

          <div className="space-y-3 mb-8 sm:space-y-4">
            {calculatorTypes.map((calc) => (
              <CalculatorButton
                key={calc.id}
                label={calc.label}
                imageSrc={calc.imageSrc}
                onClick={() => handleCalculatorClick(calc.id)}
              />
            ))}
          </div>
        </div>

        {/* Illustration Image */}
        <div className="hidden md:flex w-full justify-center lg:w-auto lg:mt-0 relative lg:left-[-70px] mb-4 md:mb-6 lg:mb-0">
          <Image
            src="/Calc.png"
            alt="Investment Calculator Illustration"
            className="w-[150px] md:w-[180px] lg:mx-0"
            width={180}
            height={180}
          />
        </div>
      </div>
    </section>
  );
};

export default Calculator;
