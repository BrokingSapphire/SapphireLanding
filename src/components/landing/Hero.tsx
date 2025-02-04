import React from "react";

import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with triangular shape */}
      <div className="absolute top-0 left-0 w-full">
        <div className="relative w-full h-full">
          <Image
            src="/green-background.svg"
            alt="Background Pattern"
            width={100}
            height={100}
            className="absolute object-contain top-0 left-0 w-full"
            priority
          />
        </div>
        <div className="relative bg-black rounded-full blur-2xl opacity-90 -top-24 -left-40 w-[250px] h-[250px]"></div>
      </div>

      {/* Main Content */}
      <div className="flex sm:mt-14 flex-col max-w-7xl lg:flex-row items-start justify-between px-8 lg:px-16 pt-20 mx-auto relative z-10">
        {/* Left Section */}
        <div className="w-full space-y-8">
          <div className="space-y-12">
            <div className="space-y-2 list-none">
              <li className="text-6xl font-bold text-white">Transform Your</li>
              <li className="text-6xl font-bold text-white">
                Investment Journey
              </li>
              <li className="text-6xl font-bold text-white">Today!</li>
            </div>
            <h3
              className="text-[#616161]  list-none
 text-xl max-w-xl"
            >
              <li>
                Experience intuitive trading with advanced tools, real-time
                insights, and unparalleled support designed to maximize your
                portfolio's growth potential effortlessly.
              </li>
            </h3>
          </div>

          <button className="bg-teal-700 hover:bg-teal-600 text-white rounded-lg px-8 py-3 text-lg font-medium transition-colors duration-200 shadow-lg">
            Sign Up Now
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full left-0 relative mt-12 sm:mt-0">
          {/* Mobile View */}
          <div className="absolute top-8 left-20 z-20">
            <Image
              src="/hero-mobile.svg"
              alt="Mobile App Interface"
              width={400}
              height={800}
              className="w-auto h-auto"
              priority
            />
          </div>

          {/* Desktop View */}
          <div className="absolute -top-20 -right-48 z-10">
            <Image
              src="/hero.svg"
              alt="Desktop Interface"
              width={900}
              height={600}
              className="w-auto h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// Add to your global CSS:
/*
.clip-triangle {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 65%);
}
*/
