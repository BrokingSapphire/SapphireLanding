import React from 'react';
import Image from 'next/image';

interface SapphireDematCardProps {
  className?: string;
}

const SapphireDematCard: React.FC<SapphireDematCardProps> = ({ className = '' }) => {
  return (
    <div className={`w-[1440px] h-[375px] bg-white mt-20  flex items-center justify-center ${className}`}>
      <div className="w-[1290px] h-[390px] px-2 ">
        <div className="w-full h-full px-2 gap-28 flex justify-between items-center py-6">
          {/* Text Area */}
          <div className="w-[754px] h-[342px] flex flex-col justify-center gap-8 py-[3px]">
            {/* Main Heading */}
            <h1 
              className="w-[657px] h-[90px] text-black opacity-100 leading-tight"
              style={{
                fontFamily: 'Lexend',
                fontWeight: 500,
                fontSize: '36px',
                lineHeight: '45px',
                letterSpacing: '-0.72px'
              }}
            >
              Secure Your Childs Future with Sapphire Minor Demat Account.
            </h1>
            
            {/* Small Text Box */}
            <div 
              className="w-[754px] h-[222px] flex flex-col justify-center gap-3 text-gray-600 opacity-100"
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
          <div className="w-[550px] h-[550px] opacity-100 flex items-center justify-center">
            <Image
              src="/minor-demat/minor deemat.png" // Replace with your actual image path
              alt="Sapphire Minor Demat Account Illustration"
              width={550}
              height={500}
              className="width-[550px] height-[500px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SapphireDematCard;