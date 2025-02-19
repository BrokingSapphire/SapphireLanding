import SubHero from "@/components/general-components/SubHero";
import Opportunities from "@/components/product/Opportunities";
import Product from "@/components/product/Product";
import React from "react";

const Home = () => {
  return (
    <>
      {/* Full width on laptop screens, max-w-7xl on wider screens */}
      <div className="w-full 2xl:max-w-7xl mx-auto">
        <SubHero
          chipText="Product"
          titleText={["Define and deliver way that", "love"]}
          gradientText="traders"
          description="Unlock seamless trading with powerful tools, real-time market insights, and a secure platform designed to help you invest smarter and grow your wealth effortlessly."
        />
        <Product />
      </div>

      <Opportunities />
    </>
  );
};

export default Home;
