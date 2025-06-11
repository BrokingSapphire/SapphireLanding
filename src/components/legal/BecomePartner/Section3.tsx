'use client';

import Image from 'next/image';

interface PartnerBenefitProps {
  icon: string;
  title: string;
  description: string;
  alt: string;
}

const PartnerBenefitCard = ({ icon, title, description, alt }: PartnerBenefitProps) => (
  <div className="flex flex-col w-full max-w-72 items-center">
    <div className="mb-4 w-full justify-center sm:justify-start ">
      <Image 
        src={icon} 
        alt={alt} 
        width={48} 
        height={48}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      />
    </div>
    <div className="font-lexend text-xl sm:text-xl md:text-xl lg:text-2xl font-medium mb-2 text-left w-full">{title}</div>
    <p className=" text-left text-sm sm:text-base md:text-base pr-3 w-full">
      {description}
    </p>
  </div>
);

const Section3 = () => {
  const partnerBenefits = [
    {
      icon: "/become-partner/one.png",
      alt: "Technology Icon",
      title: "Access to Cutting-Edge Technology",
      description: "Leverage innovative fintech tools and solutions to enhance efficiency and customer experience."
    },
    {
      icon: "/become-partner/one.png",
      alt: "Support Icon", 
      title: "Expert Support and Guidance",
      description: "Gain insights and personalized support from our industry experts to maximize success."
    },
    {
      icon: "/become-partner/one.png",
      alt: "Data Icon",
      title: "Access to Data-Driven Insights", 
      description: "Utilize analytics and reporting tools to make informed business decisions."
    },
    {
       icon: "/become-partner/one.png",
      alt: "Growth Icon",
      title: "Revenue Growth Opportunities",
      description: "Unlock new revenue streams through our partnership programs, shared profits, and exclusive offers."
    },
    {
       icon: "/become-partner/one.png",
      alt: "Brand Icon",
      title: "Brand Association and Credibility",
      description: "Strengthen your brand by partnering with a trusted and reputable fintech company."
    },
    {
      icon: "/become-partner/one.png",
      alt: "Training Icon", 
      title: "Exclusive Training and Resources",
      description: "Benefit from specialized workshops, training programs, and partner-exclusive materials."
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-6 sm:px-6 md:px-12 lg:px-24 xl:px-40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-14">What our Partners get</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  sm:gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-6 sm:gap-y-8 md:gap-y-10 justify-items-center mx-auto">
          {partnerBenefits.map((benefit, index) => (
            <div key={index} className="flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 w-full">
              <PartnerBenefitCard
                icon={benefit.icon}
                alt={benefit.alt}
                title={benefit.title}
                description={benefit.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;