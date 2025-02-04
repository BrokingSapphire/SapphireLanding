import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const CustomHero = ({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) => {
  return (
    <section className="relative w-full min-h-screen" aria-label="Hero section">
      <div className="absolute w-full">
        <img
          src={img}
          alt="line"
          className="w-full object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        <div className="flex flex-col items-center justify-center flex-grow py-12">
          <h1
            dangerouslySetInnerHTML={{ __html: title }}
            className="text-5xl leading-tight font-bold text-center mb-8 px-4"
          />

          <p className="text-lg text-gray-500 text-center max-w-4xl mb-12 px-4">
            {description}
          </p>

          <button className="bg-white text-black border border-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors flex items-center text-sm sm:text-base">
            Get Started
            <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomHero;
