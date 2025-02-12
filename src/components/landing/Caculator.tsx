"use client"
import React from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

interface CalculatorButtonProps {
  label: string;
  imageSrc: string;
  onClick?: () => void;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, imageSrc, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex justify-between items-center px-6 py-4 bg-white border-[1px] border-gray-300 rounded-lg hover:bg-gray-100 transition"
  >
    <div className="flex items-center gap-4 text-[#5B5B5B] text-lg font-medium">
      <Image src={imageSrc} alt={label} width={40} height={40} /> {/* Increased image size */}
      {label}
    </div>
    <FaChevronRight className="text-gray-500 text-xl" /> {/* Keep arrow at the extreme right */}
  </button>
);

const calculatorTypes = [
  { label: "SIP Calculator", id: "sip", imageSrc: "/main/image_24.png" },
  { label: "Margin Calculator", id: "margin", imageSrc: "/main/image_25.png" },
  { label: "Brokerage Calculator", id: "brokerage", imageSrc: "/main/image_26.png" },
];

const Calculator: React.FC = () => {
  const handleCalculatorClick = (calculatorId: string) => {
    console.log(`Selected calculator: ${calculatorId}`);
  };

  return (
    <section className="bg-[#F5F7FA] py-12">
      <div className="max-w-7xl flex flex-col lg:flex-row justify-between items-center mx-auto px-6 lg:px-12">
        {/* Text & Buttons Section */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-black mb-6">
            Simplify your investments with our smart calculators!
          </h1>

          <div className="space-y-4">
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

        {/* Illustration Image (right side) */}
        <div className="w-full lg:w-auto mt-8 lg:mt-0">
          <Image
            src="/Calc.png"
            alt="Investment Calculator Illustration"
            className="max-w-xs mx-auto lg:mx-0"
            width={180}
            height={180}
          />
        </div>
      </div>
    </section>
  );
};

export default Calculator;
