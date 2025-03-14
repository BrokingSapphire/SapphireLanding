import Image from 'next/image';
import React from 'react'

interface SubHeroProps {
  chipText: string;
  titleText: string[];
  gradientText: string;
  description: string;
}

const SubHero = ({ chipText, titleText, gradientText, description }: SubHeroProps) => {
  return (
    <div className="relative h-[400px] mt-10 w-full flex flex-col items-center justify-center mx-auto px-8">
      <Image
        src="/hero-element.svg"
        alt="Decorative Image"
        width={1000}
        height={250}
        draggable={false} 
        className="sm:absolute sm:block top-8 hidden sm:w-64 left-0 "
      />

      <div className="w-full space-y-5 text-center">
        <span className="bg-[#E4FFEE] text-green-heading px-4 py-2 rounded-3xl">
          {chipText}
        </span>
        <div className="text-center font-semibold leading-tight text-4xl sm:text-6xl w-full">
          {titleText[0]} <br />{" "}
          <span className="font-lobster-two pr-2 italic text-transparent tracking-wider bg-clip-text font-[400] bg-gradient-to-r from-[#14A5AD] to-[#21B906]">
            {gradientText}
          </span>{" "}
          <span>{titleText[1]}</span>
        </div>
        <div className="text-xl text-gray-heading max-w-4xl mx-auto ">
          {description}
        </div>
      </div>
    </div>
  );
}

export default SubHero