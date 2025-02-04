import Footer from "@/components/Footer";
import Calculator from "@/components/landing/Caculator";
import FAQ from "@/components/landing/FAQ";
import Gateway from "@/components/landing/Gateway";
import Hero from "@/components/landing/Hero";
import Prices from "@/components/landing/Prices";
import Support from "@/components/landing/Support";

import React from "react";

const Home = () => {
  return (
    <>
        <Hero />
      <div className="max-w-7xl mx-auto">
        <Prices />
      </div>
      <Calculator />
      <div className="max-w-7xl mx-auto">
        <Gateway />
      </div>
        <FAQ />
      <Support />
      
    </>
  );
};
export default Home;
