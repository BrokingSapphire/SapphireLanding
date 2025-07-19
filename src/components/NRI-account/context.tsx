import React from 'react';
import Image from 'next/image';

interface SapphireDematCardProps {
  className?: string;
}

const SapphireDematCard: React.FC<SapphireDematCardProps> = ({ className = '' }) => {
  return (
    <div className={`w-full bg-white pt-2 md:pt-14 px-4 md:px-12 lg:px-24 flex flex-col lg:flex-row items-start justify-between gap-8 rounded-2xl ${className}`}>
      <div className="w-full h-auto">
        <div className="w-full h-full flex flex-col lg:flex-row justify-between items-stretch py-3 md:py-6 gap-16">
          {/* Text Area */}
          <div className="flex-[2] flex flex-col justify-center gap-8 py-[3px]">
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
              Invest in India, Wherever You Are.
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
                Sapphire&apos;s NRI Demat Account lets you invest, manage, and repatriate funds seamlessly—compliant, paperless, and expertly supported from anywhere in the world.
              </p>
              <p>
                Sapphire&apos;s NRI Demat Account lets you invest, manage, and repatriate funds seamlessly—compliant, paperless, and expertly supported from anywhere in the world. Now grow your Indian portfolio with global ease.
              </p>
            </div>
            
            {/* Get Started Button */}
            <div 
              className="w-[184px] h-[43px] rounded-[6px] bg-[#064D51] flex items-center justify-center gap-1 cursor-pointer hover:opacity-90 transition-opacity group"
              style={{
                padding: '7px 21px'
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
                Get Started
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
          <div className="flex-1 flex items-start lg:items-center justify-center lg:justify-end mr-4 sm:mr-16 lg:mr-16 -mt-4 lg:mt-0">
            <Image
              src="/NRI-account/image.png"
              alt="Sapphire NRI Demat Account Illustration"
              width={280}
              height={280}
              className="w-full h-auto max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] border-2 border-gray-200 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SapphireDematCard;