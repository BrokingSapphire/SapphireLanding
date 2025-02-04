import Image from "next/image";
import React from "react";

const Nakul = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-start flex-col md:flex-row gap-12">
        {/* Profile Image - Centered */}
        <div className="w-96 h-96 rounded-full overflow-hidden bg-pink-50 flex-shrink-0 self-center">
          <Image
            src="/nakul.svg"
            alt="Nakul Thakur"
            className="w-full h-full object-cover"
            width={384}
            height={384}
          />
        </div>

        {/* Content Section - Left Aligned */}
        <div className="flex-1">
          <div className="text-left">
            {/* Name and Title */}
            <h2 className="text-2xl sm:text-4xl font-semibold mb-3">Nakul</h2>
            <h3 className="text-blue-600 text-base sm:text-xl font-medium mb-3">
              Founder & CEO, Sapphire
            </h3>

            {/* Letter Content */}
            <div className="text-sm sm:text-base text-gray-600 space-y-4">
              <p>Dear Valued Investors,</p>

              <p>
                Welcome to Sapphire. It is an honor to have you join us on this
                exciting journey of financial growth and empowerment. Our
                mission is simple yet powerful: to make investing accessible,
                transparent, and rewarding for everyone.
              </p>

              <p>
                With years of experience in the financial markets, we understand
                the challenges that investors face—whether it's navigating
                complex information, building trust, or making confident
                decisions. That's why we've built a platform designed not just
                to meet these challenges but to redefine how you experience the
                world of investing.
              </p>

              <p>
                At Sapphire, we're committed to innovation, integrity, and
                excellence. Our team works tirelessly to bring you cutting-edge
                tools, personalized insights, and seamless support to help you
                achieve your financial goals.
              </p>

              <p>
                Thank you for trusting us as your partner in this journey.
                Together, let's shape a future of wealth and opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nakul;
