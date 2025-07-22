
import React from 'react';
import Image from 'next/image';

interface FeatureItemProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ iconSrc, title, description }) => {
  return (
    <div className="flex flex-col gap-2 w-full min-h-[140px] sm:min-h-[150px] lg:min-h-[157px] pr-2">
      {/* Icon and Title */}
      <div className="flex items-center gap-2 sm:gap-3 w-full min-h-[30px]">
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <Image src={iconSrc} alt={title} width={24} height={24} />
        </div>
        <h3 className="text-sm sm:text-base xl:text-lg w-full font-lexend font-medium text-black leading-tight">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm xl:text-base w-full text-gray-600 font-poppins font-normal leading-relaxed ml-8 sm:ml-9 w-[calc(100%-32px)] sm:w-[calc(100%-36px)] break-words">
        {description}
      </p>
    </div>
  );
};

const BuiltForTraders: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* Top Decorative Wave */}
      <div className="w-full h-20 sm:h-20 lg:h-20 xl:h-30 mb-0 relative overflow-visible z-10">
        <Image
          src="/fando/design.png"
          alt="Decorative wave"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          priority
        />
      </div>
      {/* Main Component */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-4 md:pt-6 lg:pt-8">
        {/* Left Section - Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Main Heading */}
          <div className="w-full mb-4 sm:mb-6 lg:mb-8">
            <h2 className="font-lexend font-semibold text-xl sm:text-2xl lg:text-3xl text-black w-full leading-tight tracking-tight">
              Trade, Hedge, and Grow — All in One Place
            </h2>
          </div>
          {/* Features List */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1">
            <FeatureItem
              iconSrc="/fando/gift.svg"
              title="Instant Margin & Collateral Access"
              description="Trade gold, silver, or crude with benefits like Commodity Margin Trading, Loan Against Holdings, and same-day funding."
            />
            <FeatureItem
              iconSrc="/fando/touch.svg"
              title="Smart Commodity Insights"
              description="Track global commodity trends, volatility reports, and curated watchlists to help you take timely positions."
            />
            <FeatureItem
              iconSrc="/fando/newspaper.svg"
              title="Market News & Research"
              description="Stay updated with expert insights, global economic indicators, and commodity-specific research straight from our desk."
            />
            <FeatureItem
              iconSrc="/fando/ruppes.svg"
              title="Transparent & Affordable Pricing"
              description="Trade commodities at competitive rates — no hidden fees, just INR 20/order with real-time data access."
            />
          </div>
        </div>
        {/* Right Section - Image */}
        <div className="flex-shrink-0 w-full lg:w-[40%] xl:w-[420px] h-[220px] sm:h-[260px] lg:h-[320px] relative overflow-hidden rounded-[18px] flex items-center justify-center border border-gray-100 bg-white">
          <Image
            src="/fando/builtfortrader.svg"
            alt="Trading and Investment"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BuiltForTraders;