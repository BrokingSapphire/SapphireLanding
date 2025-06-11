import React from 'react';
import Image from 'next/image';

interface PartnerCardProps {
  icon: string;
  title: string;
  description: string;
}

const PartnerCard = ({ icon, title, description }: PartnerCardProps) => (
  <div className="flex flex-col items-start rounded-[6px] bg-[#EAFBF0] p-[18px]">
    <div className="mb-3">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center">
        <Image
          src={icon}
          alt={title}
          width={53}
          height={53}
          className="w-10 h-10 bg-[#BFE7D5] p-1 object-contain"
        />
      </div>
    </div>
    <h3 className="font-lexend text-xl sm:text-[24px] md:text-[28px] font-semibold  mb-4 leading-tight">
      {title}
    </h3>
    <p className=" text-base md:text-[20px] text-[#525252] font-medium  leading-relaxed">
      {description}
    </p>
  </div>
);

function Section4() {
  const partners = [
    {
      icon: "/become-partner/circuit.svg",
      title: "Chartered Accountant",
      description: "Streamline accounting processes and enhance client satisfaction with innovative fintech tools."
    },
    {
       icon: "/become-partner/circuit.svg",
      title: "Finance Enthusiast",
      description: "Discover fintech solutions to optimize personal finance and improve financial decision-making."
    },
    {
    icon: "/become-partner/circuit.svg",
      title: "Amature Investors",
      description: "Simplify investing and grow your portfolio with easy-to-use fintech platforms."
    }
  ];

  return (
    <div className='bg-[#F5FFFC] px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[125px] py-[39px]'>
      <h2 className='font-lexend text-3xl md:text-[48px] font-medium mb-12 text-center'>
        Who we partner with
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8 md:gap-8 lg:gap-16 xl:gap-[90px]'>
        {partners.map((partner, index) => (
          <PartnerCard
            key={index}
            icon={partner.icon}
            title={partner.title}
            description={partner.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Section4;