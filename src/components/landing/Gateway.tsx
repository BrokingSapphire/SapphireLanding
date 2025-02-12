import React from "react";
import Image from "next/image";
import { GatewayItem, gatewayItems } from "@/constants/landing";

const GatewayCard = ({ title, icon, description }: GatewayItem) => (
  <div className="flex justify-center p-4">
    <div className="relative w-full max-w-xs sm:max-w-sm h-64 group">
      <div className="absolute bottom-0 w-full h-36 bg-yellow-400 rounded-xl transform-gpu transition-transform duration-700 ease-in-out origin-top group-hover:-rotate-12" />

      <div className="relative -top-2">
        <div className="bg-gray-100 rounded-xl p-6 sm:p-8 shadow-md h-full flex flex-col justify-between transform-gpu transition-all duration-700 ease-in-out group-hover:-translate-y-4">
          <div className="flex flex-col items-start space-y-3 sm:space-y-4">
            <Image
              src={icon}
              alt={title}
              width={64}
              height={64}
              className="w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300"
            />
            <h3 className="text-2xl sm:text-4xl font-semibold transition-all duration-300">
              {title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base opacity-100 group-hover:opacity-0 transition-opacity duration-200">
              {description}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-teal-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-start p-6 sm:p-8 space-y-3 sm:space-y-4 group-hover:-translate-y-4">
          <Image
            src={icon}
            alt={title}
            width={64}
            height={64}
            className="w-12 h-12 sm:w-16 sm:h-16 text-white"
          />
          <h3 className="text-2xl sm:text-4xl font-semibold text-white">
            {title}
          </h3>
          <button className="px-4 sm:px-6 py-2 sm:py-3 border rounded-full bg-white text-gray-900 text-sm sm:text-base hover:bg-gray-900 hover:text-white transition-colors duration-300">
            Learn more
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Gateway = () => {
  return (
    <section className="max-w-7xl mt-4 mx-auto p-4 sm:p-8">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4">
          Your Gateway to Smart Investing
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-3 px-4">
          Highlighted features that simplify and enhance the investing
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
        {gatewayItems.map((item, index) => (
          <GatewayCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Gateway;
