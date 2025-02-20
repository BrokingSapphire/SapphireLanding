import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div
      className="relative mt-32 w-full flex flex-col items-center justify-center mx-auto"
      style={{
        backgroundImage: "url('/main/Bg_Landing.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A3F794]/10 to-[#FFDE55]/20 z-0"></div>
      
      <div className="relative z-10 max-w-2xl space-y-5 text-center">
        <div className="text-center font-semibold leading-tight text-5xl">
          Transform Your
          <span className="font-lobster-two pr-2 italic text-transparent bg-clip-text font-[400] bg-gradient-to-r from-[#14A5AD] to-[#21B906]">
            {" "}Investment
          </span>
          <br /> Journey Today!
        </div>
        <div className="text-xl text-gray-heading">
          Trade smarter with advanced tools, real-time insights, and expert
          support to maximize your portfolio&apos;s growth.
        </div>
        <div className="flex justify-center">
          <Button className="flex items-center justify-between gap-1 rounded-full py-5 px-6 w-[150px] bg-teal-800 text-white" variant="signUp">
            <span>Sign up now</span>
            <div className="bg-white rounded-full p-1.5 ml-1 flex items-center justify-center">
              <FaArrowRightLong color="black" size={16} className="rotate-[-35deg] " />
            </div>
          </Button>
        </div>
      </div>
      
      <div className="relative z-10 mt-12">
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