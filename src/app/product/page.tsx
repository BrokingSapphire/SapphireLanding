import SubHero from "@/components/general-components/SubHero";
import Product from "@/components/product/Product";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Product | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
  keywords:
    "product sapphire, pricing sapphire, contact sapphire, about sapphire broking, online trading platform India, stock market analysis tools, real-time market insights, professional trading recommendations, BSE NSE live updates, smart trading solutions, expert trading insights, stock market for beginners, advanced trading platform, corporate announcement tracker, investment decision tools, market intelligence platform, stock trading alerts India, seamless trade execution, next-gen trading platform, stock market education, technical analysis tools India, fundamental analysis platform, market trend analyzer, financial market insights, algorithmic trading India, trading platform comparison, best online broker India, intraday trading platform, portfolio management tools, stock screening tools India, equity research platform, investment analytics India, market data analysis, trading charts and indicators, mobile trading app India, derivatives trading platform, commodity trading solutions, forex trading tools India",
  openGraph: {
    title: "Product | Sapphire Broking: Smarter Trading, Expert Insights",
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
      {/* Full width on laptop screens, max-w-7xl on wider screens */}
      <div className="w-full 2xl:max-w-7xl mx-auto">
        <SubHero
          chipText="Product"
          titleText={["Delivering Products", "Love"]}
          gradientText="Traders"
          description="Seamless trading with real-time insights and a secure platform."
        />
        <Product />
      </div>
    </>
  );
};

export default Home;
