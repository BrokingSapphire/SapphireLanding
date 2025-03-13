'use client';

import Image from 'next/image';

const Section3 = () => {
  return (
    <section className=" py-16 px-6 md:px-24 lg:px-40">
      <h2 className="text-4xl font-bold text-center mb-14">What our Partners get</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {/* Access to Cutting-Edge Technology */}
        <div className="flex flex-col w-72 items-center">
          <div className="mb-4 ">
            <Image 
              src="/become-partner/one.png" 
              alt="Technology Icon" 
              width={48} 
              height={48}
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">Access to Cutting-Edge Technology</h3>
          <p className="text-gray-600 text-center">
            Leverage innovative fintech tools and solutions to enhance efficiency and customer experience.
          </p>
        </div>

        {/* Expert Support and Guidance */}
        <div className="flex flex-col w-72 items-center">
          <div className="mb-4">
            <Image 
              src="/become-partner/one.png" 
              alt="Support Icon" 
              width={48} 
              height={48}
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">Expert Support and Guidance</h3>
          <p className="text-gray-600 text-center">
            Gain insights and personalized support from our industry experts to maximize success.
          </p>
        </div>

        {/* Access to Data-Driven Insights */}
        <div className="flex flex-col w-72 items-center">
          <div className="mb-4">
            <Image 
              src="/data-icon.svg" 
              alt="Data Icon" 
              width={48} 
              height={48}
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">Access to Data-Driven Insights</h3>
          <p className="text-gray-600 text-center">
            Utilize analytics and reporting tools to make informed business decisions.
          </p>
        </div>

        {/* Revenue Growth Opportunities */}
        <div className="flex flex-col w-72 items-center">
          <div className="mb-4">
            <Image 
              src="/growth-icon.svg" 
              alt="Growth Icon" 
              width={48} 
              height={48}
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">Revenue Growth Opportunities</h3>
          <p className="text-gray-600 text-center">
            Unlock new revenue streams through our partnership programs, shared profits, and exclusive offers.
          </p>
        </div>

        {/* Brand Association and Credibility */}
        <div className="flex flex-col w-72 items-center">
          <div className="mb-4">
            <Image 
              src="/brand-icon.svg" 
              alt="Brand Icon" 
              width={48} 
              height={48}
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">Brand Association and Credibility</h3>
          <p className="text-gray-600 text-center">
            Strengthen your brand by partnering with a trusted and reputable fintech company.
          </p>
        </div>

        {/* Exclusive Training and Resources */}
        <div className="flex flex-col w-72 items-center">
          <div className="mb-4">
            <Image 
              src="/training-icon.svg" 
              alt="Training Icon" 
              width={48} 
              height={48}
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">Exclusive Training and Resources</h3>
          <p className="text-gray-600 text-center">
            Benefit from specialized workshops, training programs, and partner-exclusive materials.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section3;