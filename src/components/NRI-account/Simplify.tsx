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
      className={`min-h-[72px] bg-[#ECFDF5] rounded-[18px] flex items-center gap-4 px-5 py-4 w-full ${width || ''}`}
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
        className="opacity-100 break-words text-[16px] font-semibold text-[#047857] font-poppins"
        style={{ letterSpacing: '-2%' }}
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
            <div className="flex flex-col space-y-5 lg:space-y-7 w-full">
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 lg:gap-5 w-full">
                <FeatureBox
                  iconSrc="/NRI-account/one.png"
                  text="Hassle-free registration process"
                  width="sm:w-[380px]"
                />
                <FeatureBox
                  iconSrc="/NRI-account/fingerprint.png"
                  text="Fully digital onboarding"
                  width="sm:w-[320px]"
                />
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 lg:gap-5 w-full">
                <FeatureBox
                  iconSrc="/NRI-account/lock.png"
                  text="Bank-grade security"
                  width="sm:w-[300px]"
                />
                <FeatureBox
                  iconSrc="/NRI-account/calendar.png"
                  text="One-time documentation, lifetime access"
                  width="sm:w-[480px]"
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
