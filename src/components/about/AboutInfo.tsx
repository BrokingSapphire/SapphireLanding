"use client"
import React from "react";

const AboutInfo = () => {
  // const handleExplore = () => { };
  return (
    <>
      <div className="py-20 bg-[#F5F7FA] ">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4">
            Our Mission
          </h1>
          <p className="text-sm sm:text-base text-[#5F5F5F] mt-3 px-4 max-w-3xl mx-auto">
            To empower individuals and businesses to achieve financial freedom
            by providing accessible, reliable, and innovative investment
            solutions. We are dedicated to fostering trust and transparency,
            simplifying financial decisions, and building long-term wealth for
            our clients.
          </p>

          <h1 className="text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4 mt-8">
            Vision
          </h1>
          <p className="text-sm sm:text-base text-[#5F5F5F] mt-3 px-4 max-w-3xl mx-auto">
            To become a leading financial partner known for transforming the way
            people invest, trade, and grow wealth. Our goal is to create a
            thriving ecosystem where every investor, regardless of experience,
            can unlock their full financial potential.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutInfo;
