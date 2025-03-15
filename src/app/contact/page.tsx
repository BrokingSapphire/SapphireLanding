import ContactCards from "@/components/contact/ContactCards";
import EscalationMatrix from "@/components/contact/EscalationMatrix";
import GetInTouch from "@/components/contact/GetInTouch";
import { Metadata } from "next";
import SubHero from "@/components/general-components/SubHero";
// import Image from 'next/image';
import React from "react";

export const metadata: Metadata = {
  title: "Contact | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
  keywords:
    "contact sapphire, about sapphire broking, online trading platform India, stock market analysis tools, real-time market insights, professional trading recommendations, BSE NSE live updates, smart trading solutions, expert trading insights, stock market for beginners, advanced trading platform, corporate announcement tracker, investment decision tools, market intelligence platform, stock trading alerts India, seamless execution, next-gen trading platform, stock market education, technical analysis tools India, fundamental analysis platform, market trend analyzer, financial market insights, algorithmic trading India, trading platform comparison, best online broker India, intraday trading platform, portfolio management tools, stock screening tools India, equity research platform, investment analytics India, market data analysis, trading charts and indicators, mobile trading app India, derivatives trading platform, commodity trading solutions, forex trading tools India",
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
      <div className="w-full ">
        <div className="max-w-7xl mx-auto">
          <SubHero
            chipText="Contact"
            titleText={["Let's Solve Your", "Together"]}
            gradientText="Challenges"
            description="Contact us for account services, support, and trading assistance—we're here to help."
          />
        </div>
      </div>


      <ContactCards />
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <EscalationMatrix />
        </div>
      </div>

      <GetInTouch />
      {/* <Support /> */}
    </>
  );
};

export default Contact;
