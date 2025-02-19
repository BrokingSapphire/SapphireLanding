import ContactCards from "@/components/contact/ContactCards";
import EscalationMatrix from "@/components/contact/EscalationMatrix";
import GetInTouch from "@/components/contact/GetInTouch";
import Support from "@/components/landing/Support";
import Image from 'next/image';
import React from "react";

const Contact = () => {
  return (
    <>
      <div className="relative h-[400px] mt-10 w-full flex flex-col items-center justify-center mx-auto px-8">
        <Image 
          src="/bg-image.png" 
          alt="Decorative Image"
          width={300} 
          height={300} 
          className="absolute top-8 left-0 " 
        />

        <div className="w-full space-y-5 text-center">
          <span className="bg-[#E4FFEE] text-[#064D51] px-4 py-2 rounded-3xl">Contact</span>
          <div className="text-center font-semibold leading-tight text-6xl w-full">
            We're Here to Assist You with <br/> any  <span className="font-lobster-two pr-2 italic text-transparent bg-clip-text font-[400] bg-gradient-to-r from-[#14A5AD] to-[#21B906]">Query</span>
          </div>
          <div className="text-xl text-gray-heading w-full">
            Contact us for account services, support, and trading assistance—we’re here to help.
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <ContactCards />
        <EscalationMatrix />
        <GetInTouch />
      </div>
        <Support/>
    </>
  );
};

export default Contact;
