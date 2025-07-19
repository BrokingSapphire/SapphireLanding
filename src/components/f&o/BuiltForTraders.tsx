import React from 'react';
import Image from 'next/image';

interface FeatureItemProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ iconSrc, title, description }) => {
  return (
    <div 
      className="flex flex-col gap-2 w-full lg:w-auto "
      style={{
        minHeight: '157px',
        minWidth: '380px',
        gap: '8px',
        opacity: 1
      }}
    >
      {/* Icon and Title */}
      <div 
        className="flex items-center gap-3 w-full"
        style={{
          minHeight: '30px',
          gap: '12px',
          opacity: 1,
          width: '100%'
        }}
      >
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <Image src={iconSrc} alt={title} width={24} height={24} />
        </div>
        <h3
          className="text-sm lg:text-base xl:text-lg w-full"
          style={{
            fontFamily: 'Lexend',
            fontWeight: 500,
            fontStyle: 'normal',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000000',
            width: '100%'
          }}
        >
          {title}
        </h3>
      </div>
      
      {/* Description */}
      <p
        className="text-xs lg:text-sm xl:text-base w-full"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 400,
          lineHeight: '140%',
          color: '#666666',
          marginLeft: '36px',
          width: 'calc(100% - 36px)'
        }}
      >
        {description}
      </p>
    </div>
  );
};

const BuiltForTraders: React.FC = () => {
  return (
    <div className="w-full mb-16">
      {/* Top Decorative Wave */}
      <div className="w-full h-20 mb-10 relative overflow-hidden ">
        <Image
          src="/fando/design.png"
          alt="Decorative wave"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          priority
        />
      </div>

      {/* Main Component */}
      <div
        className="w-full mb-10 max-w-[1440px] mx-auto"
        style={{
          height: '420px',
          gap: '10px',
          opacity: 1,
          paddingTop: '8px',
          paddingRight: '20px',
          paddingBottom: '100px',
          paddingLeft: '20px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}
      >
        {/* Inner Container */}
        <div
          className="w-full max-w-[1230px]"
          style={{
            height: '380px',
            gap: '80px',
            opacity: 1,
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            marginLeft: '0px'
          }}
        >
          {/* Left Section - Image */}
          <div
            className="flex-shrink-0"
            style={{
              width: '476px',
              height: '314px',
              opacity: 1,
              borderRadius: '18px',
              position: 'relative',
              overflow: 'hidden',
              marginTop: '40px',
              marginRight: '12px',
              marginLeft: '20px'
            }}
          >
            <Image
              src="/fando/builtfortrader.svg"
              alt="Trading and Investment"
              fill
              style={{ objectFit: 'cover', borderRadius: '18px' }}
            />
          </div>

          {/* Right Section - Content */}
          <div
            className="flex-1 min-w-0"
            style={{
              width: '850px',
              maxWidth: '75%',
              height: '320px',
              gap: '8px',
              opacity: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginTop: '0px'
            }}
          >
            {/* Main Heading */}
            <div
              className="w-full"
              style={{
                height: '30px',
                gap: '12px',
                opacity: 1,
                marginBottom: '12px',
                width: '100%'
              }}
            >
              <h2
                style={{
                  fontFamily: 'Lexend',
                  fontWeight: 500,
                  fontStyle: 'normal',
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#000000',
                  width: '100%'
                }}
              >
                Built for both traders and investors
              </h2>
            </div>

            {/* Features List */}
            <div
              className="w-full"
              style={{
                height: '200px',
                gap: '12px',
                opacity: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              {/* Top Row - 2 boxes horizontally */}
              <div
                className="w-full flex flex-col lg:flex-row"
                style={{
                  gap: '20px',
                  marginBottom: '12px',
                  width: '100%'
                }}
              >
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
              </div>

              {/* Bottom Row - 2 boxes horizontally */}
              <div
                className="w-full flex flex-col lg:flex-row"
                style={{
                  gap: '20px',
                  width: '100%'
                }}
              >
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
      </div>
    </div>
  );
};

export default BuiltForTraders;