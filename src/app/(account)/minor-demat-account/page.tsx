import AboutInfo from "@/components/minor-deemat-accnt/content";
import ReasonToChoose from "@/components/minor-deemat-accnt/ReasonToChoose";
import ReadyToopen from "@/components/minor-deemat-accnt/readytoopen";
import Downloadapp from "@/components/minor-deemat-accnt/downloadapp";
import FAQ from "@/components/minor-deemat-accnt/f&q";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Minor Demat Account | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Open a Minor Demat Account with Sapphire Broking to start investing early for your child's future. Learn about the eligibility, documents, guardian role, and seamless process to open a demat account for a minor in India.",
  keywords:
    "minor demat account, open demat account for minor, child demat account, guardian demat account, Sapphire Broking minor account, minor trading account, investing for children, demat account for minors India, documents for minor demat account, PAN card for minor, stock investment for kids, minor stock trading, minor portfolio account, guardian trading account, child investment demat, how to open demat for minor, minor account rules SEBI, minor account eligibility, minor account Sapphire Broking",
  openGraph: {
    title: "Minor Demat Account | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Start your child’s investment journey with Sapphire Broking's Minor Demat Account. Get complete guidance on the process, required documentation, and guardian responsibilities.",
    url: "https://www.sapphirebroking.com/minor-demat-account",
    images: [
      {
        url: "https://www.sapphirebroking.com/logo-white.svg",
        alt: "Sapphire Broking Logo",
      },
    ],
    type: "website",
  },
};

const Home = () => {
  return (
    <div className="w-full">
      <div>
        <AboutInfo />
        <ReasonToChoose />
        <div className="mb-20 md:mb-20">
          <ReadyToopen />
        </div>
        <Downloadapp />
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
