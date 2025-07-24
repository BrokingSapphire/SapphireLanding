
import React from 'react';
import Image from 'next/image';

interface SapphireDematCardProps {
  className?: string;
}

const SapphireDematCard: React.FC<SapphireDematCardProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white pt-8 sm:pt-12 lg:pt-16 w-full tracking-wide ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative w-full min-h-[240px] md:min-h-[340px] px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 gap-x-12">
        {/* Left Content */}
        <div className="z-10 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl pt-8 md:pt-0 pl-0 md:pl-0 lg:pl-0 xl:pl-8 -ml-5 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-tight mb-5 sm:mb-6 font-lexend">
          Boost Your Buying Power with Margin Trading Facility (MTF)
          </h1>
          <div className="space-y-3 sm:space-y-4 mb-7 sm:mb-8 text-base sm:text-lg md:text-xl font-poppins font-normal" style={{ color: '#717171' }}>
            <p>
            Why limit your trades to available cash? With Sapphire’s MTF, you can trade select stocks by paying only a fraction of the total amount — and take advantage of market opportunities instantly.
            </p>
            <p>
            Experience the power of smart leverage, seamless execution, and competitive interest rates — all with complete control over your positions.
            </p>
          </div>
          <button className="bg-[#064D51] hover:bg-[#04605e] text-white font-semibold rounded-lg px-6 py-3 text-base sm:text-lg shadow transition-all duration-150 w-full md:w-auto flex items-center justify-center gap-2">
            <span>Trade With MTF Now</span>
          </button>
        </div>
        {/* Right Side - Illustration */}
        <div className="relative w-full flex justify-center md:justify-end mb-6 md:mb-0 md:w-auto">
          <Image
            src="/mtf/content .png"
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