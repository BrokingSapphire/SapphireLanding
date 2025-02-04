
import AboutInfo from '@/components/about/AboutInfo'
import Nakul from '@/components/about/Nakul'
import CustomHero from '@/components/CustomHero'
import Opportunities from '@/components/product/Opportunities'
import React from 'react'

const Home = () => {
  return (
    <div>
      <CustomHero
        title="Empowering Your Financial Journey: Trade <br /> Smart,Invest
              Smarter!"
        description="At Sapphire, we blend innovation with expertise to simplify
              investing and trading. From seamless stock broking to curated
              mutual fund solutions, we're here to help you achieve your
              financial goals with confidence and clarity."
        img="about-line.svg"
      />
      <AboutInfo />
      <div className="mt-14">
        <Nakul />
      </div>

      <Opportunities />
    </div>
  );
}

export default Home 