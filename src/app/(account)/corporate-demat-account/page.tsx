import AboutInfo from "@/components/corporate-demat-account/content";
import EasyToUse from "@/components/corporate-demat-account/EasyToUse";
import Downloadapp from "@/components/minor-deemat-accnt/downloadapp";
import FAQ from "@/components/corporate-demat-account/FAQ";
import Simplify from "@/components/corporate-demat-account/Simplify";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Corporate Demat Account | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Open a Corporate Demat and Trading Account with Sapphire Broking. Simplify your company's investment operations with secure, compliant, and paperless account management. Get expert guidance, seamless onboarding, and efficient portfolio tracking for your business entity.",
  keywords:
    "corporate demat account, company demat account, business demat account, corporate trading account, institutional demat account, corporate investment account, ESOP management, securities management, open corporate demat account online, demat for private limited company, LLP demat account, demat for corporate entity, Sapphire Broking business account, demat for startups, company stock account, corporate holdings demat, investment account for companies",
  openGraph: {
    title: "Corporate Demat Account | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Streamline your company’s investments with Sapphire Broking’s Corporate Demat Account. Paperless onboarding, secure holdings, and expert assistance for managing business trading and compliance.",
    url: "https://www.sapphirebroking.com/corporate-demat-account",
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
    <div className="w-full max-w-7xl mx-auto">
      {/* Hero/About Section */}
      <section className="bg-white mt-10">
        <AboutInfo />
      </section>

      {/* Easy To Use Section */}
      <section className="w-full bg-[#F5F7FA] ">
        <EasyToUse />
      </section>

      {/* Simplify Section */}
      <section className="w-full bg-white">
        <Simplify />
      </section>

      {/* App Download Section */}
      <section className="w-full bg-[#F5F7FA]">
        <Downloadapp />
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white ">
        <FAQ />
      </section>
    </div>
  );
};

export default Home;
