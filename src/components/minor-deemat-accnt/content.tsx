import React from 'react';
import Image from 'next/image';

interface SapphireDematCardProps {
  className?: string;
}

const SapphireDematCard: React.FC<SapphireDematCardProps> = ({ className = '' }) => {
  return (
    <div className={`w-full max-w-screen-xl mx-auto bg-white px-4 md:px-8 pt-4 md:pt-16   flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16 ${className}`}>
      <div className="w-full  h-auto ">
        <div className="w-full h-full px-2 gap-16 lg:gap-28 flex flex-col lg:flex-row justify-between items-center py-6">
          {/* Text Area */}
          <div className="w-full lg:w-[754px] h-auto flex flex-col justify-center gap-4 md:gap-8 py-[3px]">
            {/* Main Heading */}
            <h1 
              className="w-full lg:w-[657px] text-black opacity-100 leading-tight text-2xl md:text-3xl lg:text-[36px] font-medium"
              style={{
                fontFamily: 'Lexend',
                fontWeight: 500,
                lineHeight: '45px',
                letterSpacing: '-0.72px'
              }}
            >
              Secure Your Childs Future with Sapphire Minor Demat Account.
            </h1>
            
            {/* Small Text Box */}
            <div 
              className="w-full lg:w-[754px] flex flex-col justify-center gap-2 md:gap-3 text-gray-600 opacity-100 text-base md:text-lg lg:text-[20px]"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                lineHeight: '30px',
                letterSpacing: '0%'
              }}
            >
              <p className="mb-2 md:mb-3">
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
          <div className="w-full max-w-[550px] h-auto flex items-center justify-center mt-6 lg:mt-0">
            <Image
              src="/minor-demat/minor deemat.png" // Replace with your actual image path
              alt="Sapphire Minor Demat Account Illustration"
              width={550}
              height={500}
              className="w-full max-w-[550px] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SapphireDematCard;