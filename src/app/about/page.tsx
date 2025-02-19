import AboutInfo from "@/components/about/AboutInfo";
import Glimpses from "@/components/about/Glimpses";
import MeetOurTeam from "@/components/about/MeetOurTeam";
import Nakul from "@/components/about/Nakul";
import SubHero from "@/components/general-components/SubHero";
import Opportunities from "@/components/product/Opportunities";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto">
        <SubHero
          chipText="About"
          titleText={["Define and deliver way that", ""]}
          gradientText="Brighter Future"
          description="Empowering smarter investments with secure tools and expert guidance."
        />
        <div className="space-y-20">
          <AboutInfo />
          <Nakul />
          <MeetOurTeam />
          {/* <SapphireJourney /> */}
          <Glimpses />
        </div>
      </div>
      <Opportunities />
    </>
  );
};

export default Home;
