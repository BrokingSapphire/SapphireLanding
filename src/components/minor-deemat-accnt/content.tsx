import React from 'react';
import Image from 'next/image';

interface SapphireDematCardProps {
  className?: string;
}

const SapphireDematCard: React.FC<SapphireDematCardProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white w-full py-10 sm:py-14 lg:py-16 mt-20 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative w-full min-h-[240px] md:min-h-[340px] px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
        {/* Left Content */}
        <div className="z-10 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl pt-8 md:pt-0 pl-0 md:pl-8 lg:pl-8 xl:pl-15 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-tight mb-3 sm:mb-4 font-lexend">
            Secure Your Child's Future with a <br />
            <span className="text-black">Sapphire Minor Demat Account.</span>
          </h1>
          <div className="space-y-3 sm:space-y-4 text-gray-600 mb-5 sm:mb-6 text-base sm:text-lg md:text-xl font-poppins font-normal">
            <p>
              Why settle for outdated children's plans that offer limited growth, when you can give your child a future backed by real financial potential?
            </p>
            <p>
              At Sapphire, we offer a modern, market-driven investment approach that outshines traditional savings and insurance-based child plans. Designed to build long-term wealth with stability and flexibility, our platform empowers you to invest in a way that truly supports your child's dreams — whether it's education, entrepreneurship, or a head start in life.
            </p>
          </div>
        </div>
        {/* Right Side - Illustration */}
        <div className="relative w-full flex justify-center md:justify-end mb-6 md:mb-0 md:w-auto">
          <Image
            src="/minor-demat/minor deemat.png"
            alt="Sapphire Minor Demat Account Illustration"
            width={420}
            height={420}
            className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-[420px] h-auto max-h-[420px] object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SapphireDematCard;