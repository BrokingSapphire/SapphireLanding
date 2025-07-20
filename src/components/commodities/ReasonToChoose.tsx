import React from 'react';
import Image from 'next/image';

interface FeatureBoxProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ iconSrc, title, description }) => {
  return (
    <div className="flex-1 h-[170px] bg-[#F5F7FA] border-t-[0.5px] border-gray-300 flex flex-col gap-2 opacity-100 px-7 py-6">
      {/* Icon + Heading in one line */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 flex items-center justify-center">
          <Image src={iconSrc} alt={title + ' icon'} width={20} height={20} />
        </div>
        <h3
          className="text-black opacity-100 text-base lg:text-[18px]"
          style={{
            fontFamily: 'Poppins',
            fontWeight: 500,
            lineHeight: '120%',
            letterSpacing: '-0.5px'
          }}
        >
          {title}
        </h3>
      </div>
      {/* Description */}
      <p
        className="text-gray-600 opacity-100 text-sm lg:text-[16px] pl-7"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 400,
          lineHeight: '140%',
          letterSpacing: '0px'
        }}
      >
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
      className={`w-full h-auto lg:h-[500px] bg-[#F5F7FA] mx-auto flex flex-col gap-8 opacity-100 px-4 md:px-8 lg:px-20 ${className}`}
      style={{ paddingTop: '60px', paddingBottom: '30px' }}
    >
      {/* Main Heading */}
      <div className="w-full opacity-100 flex items-center justify-start sm:ml-4 lg:ml-4 mb-4">
        <h2
          className="text-black opacity-100 text-lg lg:text-[32px]"
          style={{
            fontFamily: 'Lexend',
            fontWeight: 500,
            lineHeight: '100%',
            letterSpacing: '-2%'
          }}
        >
          Your Gateway to India&apos;s Thriving Commodity Markets
        </h2>
      </div>
      
      {/* Description Text */}
      <div className="w-full opacity-100 flex items-center justify-start mb-8">
        <div className="w-full sm:ml-4 lg:ml-4">
          <p
            className="text-gray-600 opacity-100 text-sm lg:text-[18px] "
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              lineHeight: '140%',
              letterSpacing: '0px'
            }}
          >
            Tap into the pulse of global trade — from energy and metals to agricultural futures. Sapphire empowers both speculators and hedgers to trade confidently in the high-opportunity world of commodities.
          </p>
          
        </div>
      </div>

      {/* Three Boxes Container */}
      <div className="w-full flex flex-col lg:flex-row lg:h-[191px] opacity-100 mb-16 ">
        {/* Box 1: Option Chain in glance */}
        <FeatureBox
          iconSrc="/commodities/search.svg"
          title="Track Global Supply & Demand Trends"
          description="Go beyond charts — stay updated with real-world factors affecting prices like weather, inventory levels, and global news that move the markets."
        />
        {/* Divider: only show on desktop */}
        <div className="hidden lg:block w-[1px] bg-gray-300 h-full"></div>
        {/* Box 2: 10x productivity with terminal */}
        <FeatureBox
          iconSrc="/commodities/arrow.svg"
          title="Precision Trading Tools for Volatile Markets"
          description="Designed for the fast-paced nature of commodity markets, our tools help you spot breakouts, set smart stop-losses, and optimize entries with speed and clarity."
        />
        {/* Divider: only show on desktop */}
        <div className="hidden lg:block w-[1px] bg-gray-300 h-full"></div>
        {/* Box 3: Expected P&L */}
        <FeatureBox
          iconSrc="/commodities/increment.svg"
          title="Smart Margin Insights & Risk Forecasting"
          description="Automatically calculate margins, exposure, and expected drawdowns. Trade with full awareness of cost, risk, and potential returns before every move."
        />
      </div>
    </div>
  );
};

export default ReasonsToChooseUs;