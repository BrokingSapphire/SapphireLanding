import React from 'react';
import Image from 'next/image';

interface SapphireDematCardProps {
  className?: string;
}

const SapphireDematCard: React.FC<SapphireDematCardProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white py-8 sm:py-12 lg:py-16 w-full ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative w-full min-h-[240px] md:min-h-[340px] px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
        {/* Left Content */}
        <div className="z-10 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl pt-8 md:pt-0 pl-0 md:pl-8 lg:pl-8 xl:pl-15 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-tight mb-3 sm:mb-4 font-lexend">
            Commodities: Smart Diversification, Smarter Platform
          </h1>
          <div className="space-y-3 sm:space-y-4 text-gray-600 mb-5 sm:mb-6 text-base sm:text-lg md:text-xl font-poppins font-normal">
            <p>
              Sapphire makes it easy to diversify beyond stocks. Enter the world of commodities with advanced tools, powerful insights, and a simplified experience.
            </p>
            <p>
              Commodities offer a smart hedge against market volatility. With Sapphire, you get a seamless trading experience and live market insights — all in one place.
            </p>
          </div>
          <button className="bg-[#064D51] hover:bg-[#04605e] text-white font-semibold rounded-lg px-6 py-3 text-base sm:text-lg shadow transition-all duration-150 w-full md:w-auto flex items-center justify-center gap-2">
            <span>Start Investing</span>
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1 ml-2">
              <path d="M3.33334 8H15.6667M15.6667 8L10.00001 3.33333M15.6667 8L10.00001 12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {/* Right Side - Illustration */}
        <div className="relative w-full flex justify-center md:justify-end mb-6 md:mb-0 md:w-auto">
          <Image
            src="/Stocks/context.png"
            alt="Sapphire Corporate Demat Account Illustration"
            width={820}
            height={700}
            className="w-[320px] sm:w-[440px] md:w-[560px] lg:w-[820px] h-auto max-h-[700px] object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SapphireDematCard;