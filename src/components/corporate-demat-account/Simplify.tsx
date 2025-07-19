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
      className={`h-[72px] bg-[#F8F6FF] rounded-[18px] flex items-center gap-[16px] ${width || ''}`}
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
          color: '#4B2E83'
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
              Simplify Your Corporate Investments
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
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 sm:ml-12 lg:ml-24">
                <FeatureBox
                  iconSrc="/corporate-demat-account/one.png"
                  text="Same day withdrawal"
                  width="w-full sm:w-[280px]"
                />
                <FeatureBox
                  iconSrc="/corporate-demat-account/paperleaf.png"
                  text="Paper Less KYC"
                  width="w-full sm:w-[220px]"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
                <FeatureBox
                  iconSrc="/corporate-demat-account/bag.png"
                  text="Free portfolio analysis"
                  width="w-full sm:w-[320px]"
                />
                <FeatureBox
                  iconSrc="/corporate-demat-account/calendar.png"
                  text="Zero* annual maintenance charges"
                  width="w-full sm:w-auto"
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
