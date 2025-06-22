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
    className="w-full min-w-[250px] flex justify-between items-center px-3 sm:px-6 py-3 sm:py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
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
    <FaChevronRight className="text-[#A7A7A7] text-lg sm:text-xl" />
  </button>
);

const calculatorTypes = [
  {
    label: "Brokerage Calculator",
    id: "brokerage",
    imageSrc: "/main/image_26.png",
  },
  { label: "Margin Calculator", id: "margin", imageSrc: "/main/image_25.png" },
  { label: "SIP Calculator", id: "sip", imageSrc: "/main/image_24.png" },
  
];

const Calculator: React.FC = () => {
  const handleCalculatorClick = (calculatorId: string) => {
    // console.log(`Selected calculator: ${calculatorId}`);
  };

  return (
    <section className="bg-[#F5F7FA] py-8 sm:py-12 p-12 md:py-[67px]">
      <div className="max-w-7xl flex flex-col-reverse md:flex-row justify-between items-center mx-auto px-4 sm:px-6 lg:pl-[80px] lg:pr-[126px]">
        {/* Text & Buttons Section */}
        <div className="w-full md:w-1/2 lg:w-1/2 mt-6 md:mt-0">
          <h1 className="font-lexend text-3xl sm:text-2xl md:text-[36px] font-medium text-black mb-8 sm:mb-[58px] text-center md:text-left lg:text-left">
            Simplify your investments with our smart calculators!
          </h1>

          <div className="space-y-3 sm:space-y-6">
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
        <div className="hidden md:flex w-full md:w-[50%] lg:w-auto h-[335px] justify-end mt-6 md:-mb-14 lg:mt-12 xl:mt-12 relative md:left-[-80px] lg:left-[-70px] mb-4 md:-6 lg:mb-0">
          <Image
            src="/Calc.png"
            alt="Investment Calculator Illustration"
            className="w-[150px] md:w-[156px] lg:mx-0"
            width={180}
            height={180}
          />
        </div>
      </div>
    </section>
  );
};

export default Calculator;