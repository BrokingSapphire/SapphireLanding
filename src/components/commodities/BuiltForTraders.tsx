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
          className="text-sm lg:text-base xl:text-lg w-full "
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
          fontWeight: 500,
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
    <div className="w-full mb-12">
      {/* Top Decorative Wave */}
      <div className="w-full h-20 mb-20 relative overflow-hidden ">
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
          height: '410px',
          gap: '16px',
          opacity: 1,
          paddingTop: '8px',
          paddingRight: '20px',
          paddingBottom: '60px',
          paddingLeft: '35px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}
      >
        {/* Inner Container */}
        <div
          className="w-full max-w-[1340px]"
          style={{
            height: '380px',
            gap: '160px',
            opacity: 1,
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            marginLeft: '0px'
          }}
        >
          {/* Left Section - Content */}
          <div
            className="flex-shrink-0 min-w-0"
            style={{
              width: '750px',
              maxWidth: '60%',
              height: '320px',
              gap: '8px',
              opacity: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginTop: '0px',
              marginLeft: '20px'
            }}
          >
            {/* Main Heading */}
            <div
              className="w-full mb-16"
              style={{
                height: '36px',
                gap: '16px',
                opacity: 1,
                marginBottom: '16px',
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
                Trade, Hedge, and Grow — All in One Place
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
                  gap: '36px',
                  marginBottom: '12px',
                  width: '100%'
                }}
              >
                <FeatureItem
                  iconSrc="/commodities/star.svg"
                  title="Instant Margin & Collateral Access"
                  description="Trade gold, silver, or crude with benefits like Commodity Margin Trading, Loan Against Holdings, and same-day funding."
                />
                
                <FeatureItem
                  iconSrc="/fando/touch.svg"
                  title="Smart Commodity Insights"
                  description="Track global commodity trends, volatility reports, and curated watchlists to help you take timely positions."
                />
              </div>

              {/* Bottom Row - 2 boxes horizontally */}
              <div
                className="w-full flex flex-col lg:flex-row"
                style={{
                  gap: '36px',
                  width: '100%'
                }}
              >
                <FeatureItem
                  iconSrc="/fando/newspaper.svg"
                  title="Market News & Research"
                  description="Stay updated with expert insights, global economic indicators, and commodity-specific research straight from our desk."
                />
                
                <FeatureItem
                  iconSrc="/fando/ruppes.svg"
                  title="Transparent & Affordable Pricing"
                  description="Trade commodities at competitive rates — no hidden fees, just INR 20/order with real-time data access. "
                />
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div
            className="flex-shrink-0 ml-2"
            style={{
              width: '430px',
              height: '314px',
              opacity: 1,
              borderRadius: '18px',
              position: 'relative',
              overflow: 'hidden',
              marginTop: '40px',
              marginRight: '0px',
              marginLeft: '0px'
            }}
          >
            <Image
              src="/fando/builtfortrader.svg"
              alt="Trading and Investment"
              fill
              style={{ objectFit: 'cover', borderRadius: '18px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuiltForTraders;