import Calculator from "@/components/landing/Caculator";
import FAQ from "@/components/landing/FAQ";
import Gateway from "@/components/landing/Gateway";
import Hero from "@/components/landing/Hero";
import Support from "@/components/landing/Support";
import Guide from "@/components/landing/Guide";
import React from "react";
import TradingCharges from "@/components/landing/TradingCharges";
import SmartTrades from "@/components/landing/SmartTrades";

const Home = () => {
  return (
    <>
      <Hero />
      <TradingCharges />
      <SmartTrades />
      <Calculator />
      <div className="max-w-7xl mx-auto">
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
