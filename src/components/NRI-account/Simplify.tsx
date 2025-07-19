import React from 'react';
import Image from 'next/image';

interface FeatureBoxProps {
  iconSrc: string;
  text: string;
  width?: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ iconSrc, text, width }) => {
  return (
    <div 
      className={`h-[72px] bg-[#ECFDF5] rounded-[18px] flex items-center gap-[16px] ${width || ''}`}
      style={{
        paddingTop: '20px',
        paddingRight: '24px',
        paddingBottom: '20px',
        paddingLeft: '24px'
      }}
    >
      <div className="w-7 h-7 flex-shrink-0">
        <Image
          src={iconSrc}
          alt="Feature icon"
          width={28}
          height={28}
          className="w-full h-full object-contain"
        />
      </div>
      <span
        className="opacity-100 whitespace-nowrap"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 550,
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '-2%',
          color: '#047857'
        }}
      >
        {text}
      </span>
    </div>
  );
};

interface SimplifyProps {
  className?: string;
}

const Simplify: React.FC<SimplifyProps> = ({ className = '' }) => {
  return (
    <div 
      className={`w-full bg-white relative px-4 py-8 lg:py-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col gap-8 lg:gap-9">
          {/* Text Section */}
          <div className="w-full flex flex-col gap-5 text-center">
            {/* Main Heading */}
            <h2
              className="w-full text-black opacity-100 text-2xl md:text-3xl lg:text-4xl font-medium"
              style={{
                fontFamily: 'Lexend',
                letterSpacing: '-2%'
              }}
            >
              Smart Investing for Global Indians
            </h2>
            
            {/* Description */}
            <p
              className="w-full text-black opacity-100 text-base lg:text-lg max-w-4xl lg:max-w-5xl mx-auto"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                letterSpacing: '0%'
              }}
            >
              From fast KYC to zero maintenance charges, we make managing your company&apos;s holdings effortless.
            </p>
          </div>
          
          {/* Feature Boxes Grid */}
          <div className="w-full flex justify-center">
            <div className="flex flex-col space-y-5 lg:space-y-7">
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 sm:ml-16 lg:ml-16">
                <FeatureBox
                  iconSrc="/NRI-account/one.png"
                  text="Hassle-free registration process"
                  width="w-full sm:w-[380px]"
                />
                <FeatureBox
                  iconSrc="/NRI-account/fingerprint.png"
                  text="Fully digital onboarding"
                  width="w-full sm:w-[320px]"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
                <FeatureBox
                  iconSrc="/NRI-account/lock.png"
                  text="Bank-grade security"
                  width="w-full sm:w-[300px]"
                />
                <FeatureBox
                  iconSrc="/NRI-account/calendar.png"
                  text="One-time documentation, lifetime access"
                  width="w-full sm:w-[480px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simplify;
