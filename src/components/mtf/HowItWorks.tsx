"use client"
import React from 'react';
import Image from 'next/image';

const steps = [
  {
    icon: '/mtf/cash.svg', // Placeholder, replace with actual filename
    label: 'You have Rs. 10,000',
  },
  {
    icon: '/mtf/hand.svg', // Placeholder, replace with actual filename
    label: 'You Select E-Margin',
  },
  {
    icon: '/mtf/flip.svg', // Placeholder, replace with actual filename
    label: 'Sapphire Broking adds up to Rs. 30,000*',
  },
  {
    icon: '/mtf/pointing.svg', // Placeholder, replace with actual filename
    label: 'You take position of up to Rs. 40,000',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <div>
      <div className="relative w-full">
        <Image
          src="/fando/design.png"
          alt="Top Decorative Design"
          width={1920}
          height={120}
          className="w-full object-cover"
          priority
        />
      </div>
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center py-11 px-6 sm:px-10 md:px-24">
        {/* How it works SVG - Desktop */}
        <div className="hidden md:flex w-full justify-center -ml-96 mr-28">
          <Image src="/mtf/howitwork.svg" alt="How it works" width={160} height={40} />
        </div>
        
        <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-lexend font-medium text-center mb-14 -mt-4">
          How does MTF Trading works
        </h2>
        
        {/* Mobile Steps - Horizontal Scrollable */}
        <div className="w-full md:hidden overflow-x-auto scrollbar-hide -ml-8">
          <div className="flex gap-6 min-w-max px-0">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center w-48 flex-shrink-0">
                <Image src={step.icon} alt={step.label} width={64} height={64} className="mb-4 w-16 h-16" />
                <span className="text-[#222] text-sm font-poppins font-medium text-center">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Steps - Original Layout */}
        <div className="hidden md:flex w-full flex-row items-center justify-start gap-20 sm:gap-28 md:gap-36 mr-16">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center w-56 sm:w-64 md:w-72 min-w-0 ">
              <Image src={step.icon} alt={step.label} width={64} height={64} className="mb-2 sm:mb-4 sm:w-[64px] sm:h-[64px]" />
              <span className="text-[#222] text-xs sm:text-base font-poppins font-medium text-center whitespace-nowrap">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
};

export default HowItWorks; 