"use client";
import React, { useState } from "react";

import { cardData } from "@/constants/landing";
import Image from "next/image";

interface PricingCardProps {
  type: string;
  price: string;
  subtitle: string;
  description?: string;
  hoverContent: {
    description: string;
    features: string[];
  };
  icon: string;
}

const PricingCard = ({
  type,
  price,
  subtitle,
  description,
  hoverContent,
  icon,
}: PricingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white p-4 sm:p-6 border border-black rounded-3xl shadow-lg relative h-[250px] sm:h-[280px] mx-auto overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-full transition-all duration-500 ease-in-out ${
          isHovered
            ? "opacity-0 transform translate-y-full"
            : "opacity-100 transform translate-y-0"
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <span className="px-3 sm:px-4 py-1.5 rounded-full border-2 border-black text-teal-600 text-xs">
              {type}
            </span>
            <div className="mt-4 sm:mt-6 flex items-baseline">
              <span className="text-2xl sm:text-4xl font-bold text-gray-800">
                ₹{price}*
              </span>
            </div>
            <p className="text-base sm:text-lg text-gray-600 mt-2">
              {subtitle}
            </p>
            {description && (
              <p className="text-xs text-gray-500 mt-3 line-clamp-3">
                {description}
              </p>
            )}
          </div>
          <Image
            src={`/price/${icon}`}
            alt={`${type} icon`}
            className="w-10 sm:w-14 h-10 sm:h-14"
          />
        </div>
      </div>

      <div
        className={`absolute inset-0 p-4 sm:p-6 rounded-3xl transition-all duration-500 ease-in-out transform ${
          isHovered
            ? "opacity-100 translate-y-0 bg-gradient-to-b from-[#0EAEB7] via-[#0EAEB7] to-[#064D51]"
            : "opacity-0 -translate-y-full bg-white"
        }`}
      >
        <div className="text-white">
          <div className="flex items-center">
            <span className="text-lg sm:text-2xl font-bold">₹{price}*</span>
            <span className="text-base sm:text-lg font-semibold ml-2">
              {subtitle}
            </span>
          </div>
          <p className="text-xs sm:text-sm mt-2 mb-2 leading-relaxed">
            {hoverContent.description}
          </p>
          <ul className="space-y-1.5 mt-2">
            {hoverContent.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-xs">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Prices = () => {
  return (
    <div className="container my-24 mx-auto  py-5">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 lg:gap-6">
        <div className="w-full lg:w-2/5 text-center lg:text-left lg:ml-24">
          <Image
            src="/price/coins.svg"
            alt="Rupee coins"
            className="w-48 sm:w-64 mx-auto lg:mx-0 mb-6"
            width={256}
            height={256}
          />
          <div className="flex flex-col space-y-4 justify-between">
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
              Transparent Pricing <br /> With{" "}
              <span className="text-[#064D51]">No Hidden Charges</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-700 ">
              Place trades at just ₹20 per order
            </p>
            <button className="px-6 w-fit sm:px-8 py-2 sm:py-3 border-2 border-gray-800 text-gray-800 rounded-full text-base font-semibold hover:bg-[#152F46] hover:text-white transition-colors">
              View Pricing
            </button>
          </div>
        </div>

        <div className="w-full lg:w-3/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto">
            <div className="space-y-4 transform lg:translate-y-12">
              <PricingCard {...cardData[0]} />
              <PricingCard {...cardData[1]} />
            </div>
            <div className="space-y-4 transform lg:-translate-y-12">
              <PricingCard {...cardData[2]} />
              <PricingCard {...cardData[3]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;
