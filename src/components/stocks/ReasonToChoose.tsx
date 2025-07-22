import React from 'react';
import Image from 'next/image';

interface FeatureBoxProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ iconSrc, title, description }) => {
  return (
    <div className="flex-1 min-h-[160px] sm:min-h-[180px] lg:min-h-[191px] bg-[#F5F7FA] border-t-[0.5px] border-gray-300 flex flex-col gap-2 opacity-100 px-4 sm:px-5 md:px-6 lg:px-7 py-4 sm:py-5 lg:py-6">
      {/* Icon + Heading in one line */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 flex items-center justify-center">
          <Image src={iconSrc} alt={title + ' icon'} width={20} height={20} />
        </div>
        <h3 className="text-black opacity-100 text-sm sm:text-base lg:text-[18px] font-medium font-poppins leading-tight">
          {title}
        </h3>
      </div>
      {/* Description */}
      <p className="text-gray-600 opacity-100 text-xs sm:text-sm lg:text-[16px] pl-7 font-poppins font-normal leading-relaxed break-words">
        {description}
      </p>
    </div>
  );
};

interface ReasonsToChooseUsProps {
  className?: string;
}

const ReasonsToChooseUs: React.FC<ReasonsToChooseUsProps> = ({ className = '' }) => {
  return (
    <div
      className={`w-full bg-[#F5F7FA] mx-auto flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-10 sm:py-14 lg:py-16 pb-5 sm:pb-7 lg:pb-8 ${className}`}
    >
      {/* Main Heading */}
      <div className="w-full flex items-center justify-start mb-2 sm:mb-3 lg:mb-4">
        <h2 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-lexend font-medium leading-tight">
          Simplified Access to F&O Markets
        </h2>
      </div>
      {/* Description Text */}
      <div className="w-full flex items-center justify-start mb-4 sm:mb-6 lg:mb-8">
        <div className="w-full">
          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 font-poppins font-normal leading-relaxed">
            From index futures to stock options, Sapphire gives you access to the entire F&O trading landscape with advanced tools and analytics.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg font-poppins font-normal leading-relaxed">
            Easily explore option chains, analyze market trends, and execute trades with precision—all from a single, powerful platform designed for serious traders.
          </p>
        </div>
      </div>
      {/* Three Boxes Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureBox
          iconSrc="/minor-demat/arrow.png"
          title="Option Chain in glance"
          description="Analyze market depth and strike prices across indices and stocks—everything you need, clearly laid out in one view."
        />
        <FeatureBox
          iconSrc="/minor-demat/pointer.png"
          title="10x productivity with terminal"
          description="Access powerful trading tools, real-time data, and a fast interface—designed to help you act quickly and trade smarter."
        />
        <FeatureBox
          iconSrc="/minor-demat/coins.png"
          title="Expected P&L"
          description="Estimate your potential returns in real time before placing an order. Stay in control with transparent profit-loss projections."
        />
      </div>
    </div>
  );
};

export default ReasonsToChooseUs;