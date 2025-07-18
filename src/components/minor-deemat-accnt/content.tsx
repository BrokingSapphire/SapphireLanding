import React from 'react';
import Image from 'next/image';

interface SapphireDematCardProps {
  className?: string;
}

const SapphireDematCard: React.FC<SapphireDematCardProps> = ({ className = '' }) => {
  return (
    <div className={`w-full bg-white pt-4 md:pt-14 px-4 md:px-12 lg:px-24 flex flex-col lg:flex-row items-start justify-between gap-8 ${className}`}>
      <div className="w-full h-auto">
        <div className="w-full h-full flex flex-col lg:flex-row justify-between items-stretch py-6 gap-8">
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
              Secure Your Childs Future with Sapphire<br />
              Minor Demat Account.
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
                Why settle for outdated childrens plans that offer limited growth, when you 
                can give your child a future backed by real financial potential?
              </p>
              <p>
                At Sapphire, we offer a modern, market-driven investment approach that 
                outshines traditional savings and insurance-based child plans. Designed 
                to build long-term wealth with stability and flexibility, our platform 
                empowers you to invest in a way that truly supports your childs dreams — 
                whether its education, entrepreneurship, or a head start in life.
              </p>
            </div>
          </div>
          {/* Image Area */}
          <div className="flex-1 flex items-center justify-end">
            <Image
              src="/minor-demat/minor deemat.png"
              alt="Sapphire Minor Demat Account Illustration"
              width={550}
              height={500}
              className="w-full h-auto max-w-[550px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SapphireDematCard;