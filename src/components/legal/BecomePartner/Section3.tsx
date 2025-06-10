'use client';

import Image from 'next/image';

interface PartnerBenefitProps {
  icon: string;
  title: string;
  description: string;
  alt: string;
}

const PartnerBenefitCard = ({ icon, title, description, alt }: PartnerBenefitProps) => (
  <div className="flex flex-col w-72 sm:w-40 md:w-72 items-center">
    <div className="mb-4 w-full justify-start">
      <Image 
        src={icon} 
        alt={alt} 
        width={48} 
        height={48}
        className="sm:w-8 sm:h-8 md:w-12 md:h-12"
      />
    </div>
    <div className="font-lexend text-lg sm:text-lg md:text-2xl font-medium mb-2 text-left">{title}</div>
    <p className="text-gray-600 text-left text-xs sm:text-sm md:text-base">
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
    <section className="py-16 px-6 md:px-24 lg:px-40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">What our Partners get</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10  justify-items-center mx-auto">
          {partnerBenefits.map((benefit, index) => (
            <div key={index} className="flex justify-center mb-12">
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