import React from 'react';
import Image from 'next/image';

interface FeatureItemProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ iconSrc, title, description }) => {
  return (
    <div className="flex flex-col gap-2 w-full min-h-[140px] sm:min-h-[150px] lg:min-h-[157px]">
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
      <p className="text-xs sm:text-sm xl:text-base w-full text-gray-600 font-poppins font-normal leading-relaxed ml-8 sm:ml-9 w-[calc(100%-32px)] sm:w-[calc(100%-36px)]">
        {description}
      </p>
    </div>
  );
};

const BuiltForTraders: React.FC = () => {
  return (
    <div className="w-full bg-white mb-0">
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
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 md:py-12 lg:py-16">
        {/* Left Section - Image */}
        <div className="flex-shrink-0 w-full lg:w-[40%] xl:w-[476px] h-[200px] sm:h-[250px] lg:h-[314px] relative overflow-hidden rounded-[12px] sm:rounded-[18px] mb-8 lg:mb-0 flex items-center justify-center">
          <Image
            src="/fando/builtfortrader.svg"
            alt="Trading and Investment"
            fill
            className="rounded-[12px] sm:rounded-[18px] object-cover"
          />
        </div>
        {/* Right Section - Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Main Heading */}
          <div className="w-full mb-4 sm:mb-6 lg:mb-8">
            <h2 className="font-lexend font-medium text-xl sm:text-2xl lg:text-3xl text-black w-full leading-tight">
              Built for both traders and investors
            </h2>
          </div>
          {/* Features List */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureItem
              iconSrc="/fando/gift.svg"
              title="Instant Margin and Pledge Benefits"
              description="Get benefits such as Margin Trading Funding (T+5), Instant Credit, Loan Against Securities and much more"
            />
            <FeatureItem
              iconSrc="/fando/touch.svg"
              title="Guided Choice"
              description="Delve deeper into 3500+ stocks with Stock Report Plus, curate your own screeners and Invest using stock baskets based on analyst picks"
            />
            <FeatureItem
              iconSrc="/fando/newspaper.svg"
              title="Stock Analysis & News"
              description="Get periodic stock updates and stay ahead of the curve with the latest fundamental and technical analysis from Fisdom's in-house research desk"
            />
            <FeatureItem
              iconSrc="/fando/ruppes.svg"
              title="Competitive Pricing"
              description="Open your account for free and start trading at flat INR 20/trade. "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuiltForTraders;