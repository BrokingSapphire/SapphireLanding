import React from 'react';
import Image from 'next/image';

interface SapphireDematCardProps {
  className?: string;
}

const SapphireDematCard: React.FC<SapphireDematCardProps> = ({ className = '' }) => {
  return (
    <div className={`w-full bg-white pt-4 md:pt-14 px-4 md:px-12 lg:px-24 flex flex-col lg:flex-row items-start justify-between gap-8 ${className}`}>
      <div className="w-full h-auto">
        <div className="w-full h-full flex flex-col lg:flex-row justify-between items-stretch py-6 gap-16">
          {/* Text Area */}
          <div className="flex-[3] flex flex-col justify-center gap-8 py-[3px]">
            {/* Main Heading */}
            <h1 
              className="w-full text-black opacity-100 leading-tight text-2xl md:text-3xl lg:text-[36px] font-medium"
              style={{
                fontFamily: 'Lexend',
                fontWeight: 500,
                fontSize: '36px',
                lineHeight: '45px',
                letterSpacing: '-0.72px'
              }}
              >
              Invest in Indian Stocks with 0% Brokerage on Delivery
              
            </h1>
            {/* Small Text Box */}
            <div 
              className="w-full flex flex-col justify-center gap-3 text-gray-600 opacity-100 text-base md:text-lg lg:text-[20px]"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '30px',
                letterSpacing: '0%'
              }}
            >
              <p className="mb-3">
              Stock investing is a powerful way to participate in the growth of India’s leading companies while building long-term wealth.
              </p>
              <p>
              With real-time data, intuitive tools, and zero brokerage on delivery trades, Sapphire makes stock investing smarter, faster, and more accessible than ever.
              </p>
            </div>
            {/* Get Started Button */}
            <div 
              className="w-[184px] h-[43px] rounded-[6px] bg-[#064D51] flex items-center justify-center gap-[12px] cursor-pointer hover:opacity-90 transition-opacity group"
              style={{
                paddingTop: '7px',
                paddingRight: '21px',
                paddingBottom: '7px',
                paddingLeft: '21px'
              }}
            >
              <span 
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '145%',
                  letterSpacing: '1%',
                  color: '#FFFFFF'
                }}
              >
                Start Investing
              </span>
              <svg 
                width="20" 
                height="16" 
                viewBox="0 0 20 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M3.33334 8H15.6667M15.6667 8L10.00001 3.33333M15.6667 8L10.00001 12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {/* Image Area */}
          <div className="flex-[2] flex items-center justify-end">
            <Image
              src="/Stocks/context.png"
              alt="Sapphire Corporate Demat Account Illustration"
              width={1000}
              height={1000}
              className="w-full lg:max-w-[900px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SapphireDematCard;