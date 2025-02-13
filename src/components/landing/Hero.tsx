import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div
      className="bg-gradient-to-b from-transparent via-[#A3F794]/10 to-[#FFDE55]/20
 mt-32 w-full flex flex-col items-center justify-center   mx-auto"
    >
      <div className="max-w-2xl space-y-5 text-center">
        <div className="text-center font-semibold leading-tight text-5xl">
          Transform Your
          <span className="font-lobster-two pr-2 italic text-transparent bg-clip-text font-[400] bg-gradient-to-r from-[#14A5AD] to-[#21B906]">
            Investment
          </span>
          <br /> Journey Today!
        </div>
        <div className="text-xl text-gray-heading">
          Trade smarter with advanced tools, real-time insights, and expert
          support to maximize your portfolio&apos;s growth.
        </div>
        <Button className="rounded-full py-5" variant="ghost">
          Sign up now
        </Button>
      </div>
      <div className="mt-12">
        <Image
          className="border-8 border-gray-100 rounded-md"
          alt="Platform Photo"
          src="/hero.svg"
          objectFit="contain"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default Hero;
