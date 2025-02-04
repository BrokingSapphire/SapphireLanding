import ContactCards from "@/components/contact/ContactCards";
import EscalationMatrix from "@/components/contact/EscalationMatrix";
import GetInTouch from "@/components/contact/GetInTouch";
import LocateUs from "@/components/contact/LocateUs";
import CustomHero from "@/components/CustomHero";

import React from "react";

const Home = () => {
  return (
    <>
      <CustomHero
        title="We're Always Here to Help You Invest Smarter <br />  and Better!"
        description="Have questions, need guidance, or looking for support? Our team is dedicated to assisting you every step of the way. Reach out to us anytime, and we'll help you invest confidently."
        img="contact-line.svg"
      />
    <div className="max-w-7xl mx-auto">
      <ContactCards />
      <EscalationMatrix />
      <GetInTouch />
      <LocateUs />
      </div>
      </>
  );
};

export default Home;
