'use client';

import Image from 'next/image';

interface PartnerStepProps {
  icon: string;
  title: string;
  description: string;
  alt: string;
}

const PartnerStepCard = ({ icon, title, description, alt }: PartnerStepProps) => (
    
    <div>
      <div className="flex-shrink-0">
        <Image
          src={icon}
          alt={alt}
          width={50}
          height={50}
        />
      </div>
      <h3 className="font-lexend font-medium text-xl">{title}</h3>
      <p className="font-lexend text-[#4B4A4A]  text-sm">
        {description}
      </p>
    </div>
);

const Section2 = () => {
  const partnerSteps = [
    {
      icon:"/become-partner/section2.svg",
      alt: "Express Interest",
      title: "Express Your Interest",
      description: "Begin your journey by letting us know you're interested in partnering with us. Simply fill out a short form to share your initial thoughts and business objectives so we can learn more about your goals."
    },
    {
      icon:"/become-partner/section2.svg",
      alt: "Submit Application",
      title: "Submit Your Application",
      description: "Take the next step by providing us with detailed information about your business and requirements through our application form to help us understand your needs, objectives, and how we can best support you."
    },
    {
     icon:"/become-partner/section2.svg",
      alt: "Get Approved",
      title: "Get Approved",
      description: "Once we've received your application, our team will carefully review all the details and determine if we're a good fit for the current and next steps. This is your chance to ask questions and align on expectations!"
    },
    {
      icon:"/become-partner/section2.svg",
      alt: "Start Growing Together",
      title: "Start Growing Together",
      description: "After approval, we'll onboard you into our partnership program and begin working collaboratively to achieve our shared goals. Together, we'll create a strong and productive partnership tailored to your specific business needs."
    }
  ];

  return (
    <section className=" flex flex-col md:flex-row items-center gap-12 bg-[#F5F7FA] py-14 px-[110px]">
      {/* Left Side - Image */}
      <div className="md:w-2/5 mx-14 flex justify-center items-center">
        <Image
          src="/become-partner/section2.svg"
          alt="Ways to Partner with Sapphire"
          width={400}
          height={300}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 text-gray-800">
        <h2 className="font-lexend text-5xl font-medium mb-4">
          Ways to partner with <br /> Sapphire
        </h2>
        <p className="font-lexend text-base text-[#636363] mb-6">
          A straightforward and hassle-free process designed to help you take
          the first step toward building a successful and rewarding partnership
          with Sapphire, tailored to support your business goals and drive
          mutual growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerSteps.map((step, index) => (
            <PartnerStepCard
              key={index}
              icon={step.icon}
              alt={step.alt}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;