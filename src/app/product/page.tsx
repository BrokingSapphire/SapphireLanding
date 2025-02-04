
import CustomHero from '@/components/CustomHero';
import Opportunities from '@/components/product/Opportunities'
import Product from '@/components/product/Product'
import React from 'react'

const Home = () => {
  return (
    <>
      <CustomHero
        title="Revolutionize Your Trading and Investment <br /> Journey with
        Cutting-Edge Platforms"
        description="Discover advanced tools, expert-driven insights, and cutting-edge
        platforms designed to revolutionize your workflow, maximize
        efficiency, boost performance, and empower you to achieve
        unparalleled success in today's fast-paced, ever-evolving world of
        possibilities."
        img="product-line.svg"
        />
        <div className="max-w-7xl mx-auto">
      <Product />
    </div>
      <Opportunities />
        </>
  );
}

export default Home