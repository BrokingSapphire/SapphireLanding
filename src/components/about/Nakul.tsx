import Image from "next/image";
import React from "react";

const Nakul = () => {
  return (
    <div className="mt-14 mx-auto p-6">
      <div className="flex items-start flex-col md:flex-row gap-12">
        {/* Content Section */}
        <div className="flex-1">
          <div className="text-left">
            {/* Name and Title */}
            <h2 className="text-2xl sm:text-4xl font-semibold mb-3">Mr. Nakul Thakur</h2>
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
                complex information and making informed decisions. That’s why
                we’ve built a platform that combines cutting-edge technology
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
        <div className="w-96 h-96 rounded-full overflow-hidden bg-pink-50 flex-shrink-0 self-center">
          <Image
            src="/nakul.svg"
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
