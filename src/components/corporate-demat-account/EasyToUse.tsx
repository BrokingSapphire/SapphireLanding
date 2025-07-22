import React from 'react';
import Image from 'next/image';

interface FeatureItemProps {
  iconSrc: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ iconSrc, description }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-[36px] h-[36px] flex-shrink-0">
        <Image
          src={iconSrc}
          alt="Feature icon"
          width={36}
          height={36}
          className="w-full h-full object-contain"
        />
      </div>
      <p
        className="text-gray-600 opacity-100 text-base"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '140%',
          letterSpacing: '0%',
          verticalAlign: 'middle'
        }}
      >
        {description}
      </p>
    </div>
  );
};

interface EasyToUseProps {
  className?: string;
}

const EasyToUse: React.FC<EasyToUseProps> = ({ className = '' }) => {
  return (
    <div className={`w-full bg-[#F5F7FA] py-10 sm:py-14 lg:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Left Content */}
        <div className="w-full lg:max-w-2xl xl:max-w-3xl text-center lg:text-left flex flex-col gap-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-4 font-lexend">
            Easy to Use for Corporates
          </h2>
          <div className="flex flex-col gap-6">
            <FeatureItem
              iconSrc="/corporate-demat-account/pick.png"
              description="Open your Corporate Demat Account in days with seamless documentation and guided onboarding support."
            />
            <FeatureItem
              iconSrc="/corporate-demat-account/graph.png"
              description="Manage securities, transfers, and corporate actions in just a few clicks no complex steps or delays."
            />
            <FeatureItem
              iconSrc="/corporate-demat-account/security.png"
              description="Set permissions for different teams or departments, with centralized visibility across all branches."
            />
          </div>
        </div>
        {/* Right Side - Illustration */}
        <div className="w-full flex justify-center lg:justify-end lg:w-auto">
          <Image
            src="/corporate-demat-account/Easytouse.png"
            alt="Corporate Demat Account Management"
            width={388}
            height={327}
            className="w-[220px] sm:w-[300px] md:w-[340px] lg:w-[388px] h-auto max-h-[388px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default EasyToUse;
