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
        className="text-gray-600 opacity-100 text-sm lg:text-[16px]"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 400,
          lineHeight: '140%',
          letterSpacing: '-0.5px'
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
      className={`w-full h-auto lg:h-[325px] bg-[#F5F7FA] mx-auto flex flex-col gap-8 opacity-100 px-4 md:px-8 lg:px-20 ${className}`}
      style={{ paddingTop: '24px', paddingBottom: '24px' }}
    >
      {/* Main Heading */}
      <div className="w-full h-[40px] opacity-100 flex items-center justify-center">
        <h2
          className="text-black text-center opacity-100 text-lg lg:text-[32px]"
          style={{
            fontFamily: 'Lexend',
            fontWeight: 500,
            lineHeight: '100%',
            letterSpacing: '-2%'
          }}
        >
          Reasons to Choose Us
        </h2>
      </div>
      {/* Three Boxes Container */}
      <div className="w-full flex flex-col lg:flex-row lg:h-[191px]  opacity-100">
        {/* Box 1: Value-Added Features */}
        <FeatureBox
          iconSrc="/minor-demat/arrow.png"
          title="Value-Added Features"
          description="Get exclusive access to economic calendars, fundamental & technical analysis tools, expert research reports, and more to make informed investment decisions."
        />
        {/* Divider: only show on desktop */}
        <div className="hidden lg:block w-[1px] bg-gray-300 h-full"></div>
        {/* Box 2: Easy & Hassle-Free Process */}
        <FeatureBox
          iconSrc="/minor-demat/pointer.png"
          title="Easy & Hassle-Free Process"
          description="Enjoy a completely online account opening experience - simple, paperless, and stress-free."
        />
        {/* Divider: only show on desktop */}
        <div className="hidden lg:block w-[1px] bg-gray-300 h-full"></div>
        {/* Box 3: Best Savings Plan for Your Child */}
        <FeatureBox
          iconSrc="/minor-demat/coins.png"
          title="Best Savings Plan for Your Child"
          description="Open a minor account with no minimum balance, and start investing in mutual funds early to support your child's future dreams."
        />
      </div>
    </div>
  );
};

export default ReasonsToChooseUs;