import Image from "next/image";
import React from "react";

const Nakul = () => {
  return (
    <div className="mt-14 mx-10 py-6 sm:px-14">
      <div className="flex items-center flex-col-reverse md:flex-row md:items-start gap-12">
        {/* Content Section */}
        <div className="flex-1">
          <div className="text-left">
            {/* Name and Title */}
            <h2 className="font-lexend text-2xl sm:text-4xl font-semibold mb-3">Mr. Nakul Thakur</h2>
            <h3 className="text-blue-600 text-base sm:text-xl font-medium mb-3">
             Managing Partner, Sapphire
            </h3>
            {/* Letter Content */}
            <div className="text-sm sm:text-base text-gray-600 space-y-4">
              <p>
                At Sapphire, we are committed to empowering investors to take
                charge of their financial future with confidence. Our mission is
                to make investing accessible, transparent, and rewarding for
                everyone, regardless of experience.
              </p>
              <p>
                We understand the challenges investors face in navigating
                complex information and making informed decisions. That&apos;s why
                we&apos;ve built a platform that combines cutting-edge technology
                with personalised support, redefining the way you grow and
                manage your wealth.
              </p>
              <p>
                Transparency, trust, and innovation are at the heart of
                everything we do. As your financial partner, we aim to simplify
                your investment journey, helping you unlock new opportunities
                and achieve your financial goals with ease.
              </p>
            </div>
          </div>
        </div>
        {/* Profile Image - Centered */}
        <div className="h-80 w-80 sm:w-96 sm:h-96 rounded-[16px] border-[12px] border-[#F5F7FA] overflow-hidden flex-shrink-0 self-center">
          <Image
            src="/about/about-logo.png"
            alt="Nakul Thakur"
            className="w-full h-full object-cover"
            width={384}
            height={384}
          />
        </div>
      </div>
    </div>
  );
};

export default Nakul;