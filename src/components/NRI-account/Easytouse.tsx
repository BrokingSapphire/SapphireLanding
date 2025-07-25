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
    <div className={`w-full bg-[#F5F7FA] relative overflow-hidden ${className}`}>
      {/* Mobile Layout */}
      <div className="block lg:hidden px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Mobile Image */}
          <div className="flex justify-center mb-8">
            <div className="w-64 h-auto">
              <Image
                src="/corporate-demat-account/Easytouse.png"
                alt="Corporate Demat Account Management"
                width={256}
                height={216}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
          {/* Heading */}
          <h2
            className="text-2xl font-medium text-black text-center mb-8"
            style={{
              fontFamily: 'Lexend',
              letterSpacing: '-2%'
            }}
          >
            Built for NRIs
          </h2>
          
          {/* Text Box with Features */}
          <div className="flex flex-col gap-6">
            <FeatureItem
              iconSrc="/corporate-demat-account/pick.png"
              description="Set up your NRI Demat Account quickly with digital onboarding and dedicated support."
            />
            <FeatureItem
              iconSrc="/corporate-demat-account/graph.png"
              description="Invest in Indian markets with ease—buy, sell, and manage holdings from anywhere in the world."
            />
            <FeatureItem
              iconSrc="/corporate-demat-account/security.png"
              description="Securely track and control your portfolio with 24/7 access and transparent reporting."
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-full h-[420px] relative">
        {/* Left Image */}
        <div
          className="absolute w-[387.7285461425781px] h-[327px]"
          style={{
            top: '37px',
            left: '105px'
          }}
        >
          <Image
            src="/corporate-demat-account/Easytouse.png"
            alt="Corporate Demat Account Management"
            width={387.7285461425781}
            height={327}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Right Content Area */}
        <div 
          className="absolute w-[900px] h-[260px] flex flex-col gap-[28px]"
          style={{
            top: '73px',
            left: '590px'
          }}
        >
          {/* Heading */}
          <h2
            className="w-[900px] h-[40px] text-black opacity-100"
            style={{
              fontFamily: 'Lexend',
              fontWeight: 500,
              fontSize: '32px',
              lineHeight: '100%',
              letterSpacing: '-2%'
            }}
          >
            Built for NRIs
          </h2>
          
          {/* Text Box with Features */}
          <div className="w-[900px] h-[192px] flex flex-col gap-[32px]">
            <FeatureItem
              iconSrc="/corporate-demat-account/pick.png"
              description="Set up your NRI Demat Account quickly with digital onboarding and dedicated support."
            />
            <FeatureItem
              iconSrc="/corporate-demat-account/graph.png"
              description="Invest in Indian markets with ease—buy, sell, and manage holdings from anywhere in the world."
            />
            <FeatureItem
              iconSrc="/corporate-demat-account/security.png"
              description="Securely track and control your portfolio with 24/7 access and transparent reporting."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasyToUse;
