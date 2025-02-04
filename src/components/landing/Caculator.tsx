"use client"
import React from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

interface CalculatorButtonProps {
  label: string;
  onClick?: () => void;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="px-6 flex justify-center items-center gap-3 sm:px-8 py-2 sm:py-3 bg-white border-2 text-base sm:text-base font-semibold border-black rounded-full hover:bg-[#152F46] hover:text-white transition"
  >
    {label} <FaChevronRight />
  </button>
);

const calculatorTypes = [
  { label: "SIP Calculator", id: "sip" },
  { label: "Margin Calculator", id: "margin" },
  { label: "Brokerage Calculator", id: "brokerage" },
];

const Calculator: React.FC = () => {
  const handleCalculatorClick = (calculatorId: string) => {
    console.log(`Selected calculator: ${calculatorId}`);
  };

  return (
    <section className="bg-[#DAEAEB] py-8">
      <div className="max-w-7xl flex flex-col lg:flex-row justify-between items-center mx-auto">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
          <h1 className="text-xl sm:text-3xl text-black font-bold text-center lg:text-left px-4 sm:px-8 lg:px-12 mt-4 lg:mt-8 mb-4">
            Simplify your investments with our smart calculators!
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 mt-4 px-4 sm:px-8 lg:px-12 mb-6">
            {calculatorTypes.map((calc) => (
              <CalculatorButton
                key={calc.id}
                label={calc.label}
                onClick={() => handleCalculatorClick(calc.id)}
              />
            ))}
          </div>

          <a
            href="#calculators"
            className="text-blue-500 flex items-center justify-center gap-2 font-semibold text-center lg:text-left px-4 sm:px-8 lg:px-12 mt-2 mb-4 hover:text-blue-700 cursor-pointer"
          >
            EXPLORE CALCULATORS <FaChevronRight />
          </a>
        </div>

        <div className="w-full lg:w-auto px-4 sm:px-8 lg:px-12 mt-4 lg:mt-0">
          <img
            src="/creditscore.svg"
            alt="Investment Calculator Illustration"
            className="max-w-full h-auto mx-auto lg:mx-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Calculator;
