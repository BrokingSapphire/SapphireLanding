import AboutInfo from "@/components/mtf/content";
import FAQ from "@/components/mtf/FAQ";
import ReasonToChoose from "@/components/mtf/ReasonToChoose";
import BuiltForTraders from "@/components/mtf/HowItWorks";


import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: "About | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
  keywords:
    "about sapphire broking, online trading platform India, stock market analysis tools, real-time market insights, professional trading recommendations, BSE NSE live updates, smart trading solutions, expert trading insights, stock market for beginners, advanced trading platform, corporate announcement tracker, investment decision tools, market intelligence platform, stock trading alerts India, seamless trade execution, next-gen trading platform, stock market education, technical analysis tools India, fundamental analysis platform, market trend analyzer, financial market insights, algorithmic trading India, trading platform comparison, best online broker India, intraday trading platform, portfolio management tools, stock screening tools India, equity research platform, investment analytics India, market data analysis, trading charts and indicators, mobile trading app India, derivatives trading platform, commodity trading solutions, forex trading tools India",
  openGraph: {
    title: "About | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};


const Home = () => {
    return (
        <main className="w-full bg-white mt-5">
            <div className="bg-white w-full mt-20 ">
                <AboutInfo />
            </div>
            <div className="bg-white w-full -mt-3 mb-6">
                <BuiltForTraders />
            </div>
            <div className="bg-white ml-3 max-w-7xl mx-auto">
                <ReasonToChoose />
            </div>
            <div className="bg-white w-full -mt-4">
                <FAQ />
            </div>
        </main>
    );
};

export default Home;
