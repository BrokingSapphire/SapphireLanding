import Calculator from "@/components/landing/Caculator";
import FAQ from "@/components/landing/FAQ";
import Gateway from "@/components/landing/Gateway";
import Hero from "@/components/landing/Hero";
import Support from "@/components/landing/Support";
import Guide from "@/components/landing/Guide";
import React from "react";
import TradingCharges from "@/components/landing/TradingCharges";
import SmartTrades from "@/components/landing/SmartTrades";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
  keywords:
    "online trading platform India, stock market analysis tools, real-time market insights, professional trading recommendations, BSE NSE live updates, smart trading solutions, expert trading insights, stock market for beginners, advanced trading platform, corporate announcement tracker, investment decision tools, market intelligence platform, stock trading alerts India, seamless trade execution, next-gen trading platform, stock market education, technical analysis tools India, fundamental analysis platform, market trend analyzer, financial market insights, algorithmic trading India, trading platform comparison, best online broker India, intraday trading platform, portfolio management tools, stock screening tools India, equity research platform, investment analytics India, market data analysis, trading charts and indicators, mobile trading app India, derivatives trading platform, commodity trading solutions, forex trading tools India",
  openGraph: {
    title: "Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

const Home = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
      <Hero />
      <TradingCharges />``
      <SmartTrades />
      <Calculator />
        <Gateway />
      </div>
      <div>
        <Guide />
      </div>
        <FAQ />
      <Support />
      
    </>
  );
};
export default Home;
