import React from 'react';

interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, description }) => {
  return (
    <div className="flex-1 h-[191px] bg-[#F5F7FA] border-t-[0.5px] border-gray-300 flex flex-col gap-2 opacity-100 px-7 py-6">
      
      {/* Icon + Heading in one line */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5">{icon}</div>
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
  // Simple icon components with gray color
  const ValueAddedIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17L9 11L13 15L21 7" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 7H16M21 7V12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const EasyProcessIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const BestSavingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V22M17 5H9.5C8.57 5 7.78 5.78 7.78 6.71S8.57 8.43 9.5 8.43H14.5C15.43 8.43 16.22 9.21 16.22 10.14S15.43 11.86 14.5 11.86H7M21 12C21 16.97 16.97 21 12 21S3 16.97 3 12S7.03 3 12 3S21 7.03 21 12Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div
      className={`w-full h-auto lg:h-[325px] bg-[#F5F7FA] mx-auto flex flex-col gap-6 opacity-100 px-4 md:px-8 lg:px-20 ${className}`}
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
      <div className="w-full flex flex-col lg:flex-row lg:h-[191px] opacity-100">
        {/* Box 1: Value-Added Features */}
        <FeatureBox
          icon={<ValueAddedIcon />}
          title="Value-Added Features"
          description="Get exclusive access to economic calendars, fundamental & technical analysis tools, expert research reports, and more to make informed investment decisions."
        />
        {/* Divider: only show on desktop */}
        <div className="hidden lg:block w-[1px] bg-gray-300 h-full"></div>
        {/* Box 2: Easy & Hassle-Free Process */}
        <FeatureBox
          icon={<EasyProcessIcon />}
          title="Easy & Hassle-Free Process"
          description="Enjoy a completely online account opening experience - simple, paperless, and stress-free."
        />
        {/* Divider: only show on desktop */}
        <div className="hidden lg:block w-[1px] bg-gray-300 h-full"></div>
        {/* Box 3: Best Savings Plan for Your Child */}
        <FeatureBox
          icon={<BestSavingsIcon />}
          title="Best Savings Plan for Your Child"
          description="Open a minor account with no minimum balance, and start investing in mutual funds early to support your child's future dreams."
        />
      </div>
    </div>
  );
};

export default ReasonsToChooseUs;