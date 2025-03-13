'use client';

import Image from 'next/image';

const Section2 = () => {
  return (
    <section className="bg-[#F5F7FA] py-16 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-12">
      {/* Left Side - Image */}
      <div className="md:w-2/5 mx-14 flex justify-center items-center">
        <Image
          src="/become-partner/section2.png"
          alt="Ways to Partner with Sapphire"
          width={400}
          height={300}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 text-gray-800">
        <h2 className="text-3xl font-bold mb-4">
          Ways to partner with Sapphire
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          A straightforward and hassle-free process designed to help you take
          the first step toward building a successful and rewarding partnership
          with Sapphire, tailored to support your business goals and drive
          mutual growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Express Your Interest */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Image
                  src="/lightbulb-icon.svg"
                  alt="Express Interest"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Express Your Interest</h3>
              <p className="text-gray-600 text-sm">
                Begin your journey by letting us know yo&apsos;re interested in
                partnering with us. Simply fill out a short form to share your
                initial thoughts and business objectives so we can learn more
                about your goals.
              </p>
            </div>
          </div>

          {/* Submit Your Application */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Image
                  src="/document-icon.svg"
                  alt="Submit Application"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Submit Your Application</h3>
              <p className="text-gray-600 text-sm">
                Take the next step by providing us with detailed information
                about your business and requirements through our application
                form to help us understand your needs, objectives, and how we
                can best support you.
              </p>
            </div>
          </div>

          {/* Get Approved */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Image
                  src="/check-icon.svg"
                  alt="Get Approved"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Get Approved</h3>
              <p className="text-gray-600 text-sm">
                Once we&apsos;ve received your application, our team will
                carefully review all the details and determine if we&apsos;re a
                good fit for the current and next steps. This is your chance to
                ask questions and align on expectations!
              </p>
            </div>
          </div>

          {/* Start Growing Together */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Image
                  src="/growth-icon.svg"
                  alt="Start Growing Together"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Start Growing Together</h3>
              <p className="text-gray-600 text-sm">
                After approval, we&apsos;ll onboard you into our partnership
                program and begin working collaboratively to achieve our shared
                goals. Together, we&apsos;ll create a strong and productive
                partnership tailored to your specific business needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;