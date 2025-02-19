import ContactCards from "@/components/contact/ContactCards";
import EscalationMatrix from "@/components/contact/EscalationMatrix";
import GetInTouch from "@/components/contact/GetInTouch";
import Support from "@/components/landing/Support";
import { Metadata } from "next";
import Image from 'next/image';
import React from "react";

export const metadata: Metadata = {
  title: "Contact | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
  keywords:
    "contact sapphire, about sapphire broking, online trading platform India, stock market analysis tools, real-time market insights, professional trading recommendations, BSE NSE live updates, smart trading solutions, expert trading insights, stock market for beginners, advanced trading platform, corporate announcement tracker, investment decision tools, market intelligence platform, stock trading alerts India, seamless trade execution, next-gen trading platform, stock market education, technical analysis tools India, fundamental analysis platform, market trend analyzer, financial market insights, algorithmic trading India, trading platform comparison, best online broker India, intraday trading platform, portfolio management tools, stock screening tools India, equity research platform, investment analytics India, market data analysis, trading charts and indicators, mobile trading app India, derivatives trading platform, commodity trading solutions, forex trading tools India",
  openGraph: {
    title: "Contact | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

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
            We&apos;re Here to Assist You with <br/> any  <span className="font-lobster-two pr-2 italic text-transparent bg-clip-text font-[400] bg-gradient-to-r from-[#14A5AD] to-[#21B906]">Query</span>
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
