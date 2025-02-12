import Image from "next/image";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Support = () => {
  return (
    <div className="bg-[#064D51] border-y-2 p-4 sm:p-6 flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between w-full">
        
        {/* Centered Text and Button */}
        <div className="ml-48 flex flex-col items-center justify-center text-center flex-1">
          <div className="text-white text-2xl sm:text-6xl font-semibold leading-tight">
            Ready to unlock new <br />
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-yellow-400 bg-clip-text text-transparent">
              revenue opportunities?
            </span>
          </div>
          <button className="bg-white flex items-center text-black sm:text-lg px-7 sm:px-12 py-2 sm:py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 w-full sm:w-auto mt-12">
            <span className="mx-auto">Sign Up</span>
            <FaChevronRight  />
          </button>

        </div>

        {/* Arrow Group Image on the Extreme Right */}
        <div className="w-40 sm:w-56 -mr-8 scale-150">
          <Image
            src="/main/ArrowGroup.svg"
            alt="Arrow Group"
            className="w-full h-full object-contain"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default Support;
