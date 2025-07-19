import React from 'react';
import Image from 'next/image';

interface FeatureBoxProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ iconSrc, title, description }) => {
  return (
    <div className="flex-1 h-[191px] bg-[#F5F7FA] border-t-[0.5px] border-gray-300 flex flex-col gap-2 opacity-100 px-7 py-6">
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
      style={{ paddingTop: '48px', paddingBottom: '60px' }}
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
          Simplified Access to Indian Stock Markets
        </h2>
      </div>
      
      {/* Description Text */}
      <div className="w-full opacity-100 flex items-center justify-start mb-8">
        <div className="w-full sm:ml-4 lg:ml-4">
          <p
            className="text-gray-600 opacity-100 text-sm lg:text-[18px] mb-4"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              lineHeight: '140%',
              letterSpacing: '0px'
            }}
          >
            From large-cap giants to promising mid and small-cap companies, Sapphire gives you access to the entire Indian stock landscape.
          </p>
          <p
            className="text-gray-600 opacity-100 text-sm lg:text-[18px]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              lineHeight: '140%',
              letterSpacing: '0px'
            }}
          >
            Easily explore NSE and BSE-listed stocks, view sector-wise performance, analyze charts, and make informed decisions—all without switching between platforms.
          </p>
        </div>
      </div>

      {/* Three Boxes Container */}
      <div className="w-full flex flex-col lg:flex-row lg:h-[191px] opacity-100">
        {/* Box 1: Option Chain in glance */}
        <FeatureBox
          iconSrc="/features/stocks.svg"
          title="Option Chain in glance"
          description="Analyze market depth and strike prices across indices and stocks—everything you need, clearly laid out in one view."
        />
        {/* Divider: only show on desktop */}
        <div className="hidden lg:block w-[1px] bg-gray-300 h-full"></div>
        {/* Box 2: 10x productivity with terminal */}
        <FeatureBox
          iconSrc="/features/stocks.svg"
          title="10x productivity with terminal"
          description="Access powerful trading tools, real-time data, and a fast interface—designed to help you act quickly and trade smarter."
        />
        {/* Divider: only show on desktop */}
        <div className="hidden lg:block w-[1px] bg-gray-300 h-full"></div>
        {/* Box 3: Expected P&L */}
        <FeatureBox
          iconSrc="/features/stocks.svg"
          title="Expected P&L"
          description="Estimate your potential returns in real time before placing an order. Stay in control with transparent profit-loss projections."
        />
      </div>
    </div>
  );
};

export default ReasonsToChooseUs;