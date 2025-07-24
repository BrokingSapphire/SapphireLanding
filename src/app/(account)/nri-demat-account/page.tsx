import AboutInfo from "@/components/NRI-account/context";
import EasyToUse from "@/components/NRI-account/Easytouse";
import Downloadapp from "@/components/minor-deemat-accnt/downloadapp";
import FAQ from "@/components/NRI-account/FAQ";
import Simplify from "@/components/NRI-account/Simplify";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "NRI Demat Account | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Open an NRI Demat and Trading Account with Sapphire Broking to invest in Indian equities, mutual funds, and more. Learn about PIS and Non-PIS routes, required documents, NRE/NRO accounts, and compliance for seamless NRI investing.",
  keywords:
    "NRI demat account, open NRI trading account, NRI investment account India, Sapphire Broking NRI account, NRI stock market investment, NRI PIS account, NRI non-PIS demat, NRE account trading, NRO account trading, NRI demat documents, how to open NRI demat account, Indian stock market for NRIs, RBI PIS guidelines, NRI mutual fund investment, NRI trading with Sapphire, NRI account charges, NRI tax compliance trading, online NRI demat account, NRI equity trading India",
  openGraph: {
    title: "NRI Demat Account | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Open your NRI Demat Account with Sapphire Broking and start investing in Indian markets from abroad. Easy onboarding, RBI-compliant process, and expert support for PIS and Non-PIS accounts.",
    url: "https://www.sapphirebroking.com/nri-demat-account",
    images: [
      {
        url: "https://www.sapphirebroking.com/logo-white.svg",
        alt: "Sapphire Broking Logo",
      },
    ],
    type: "website",
  },
};

const NriAccountPage = () => {
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
      <section className="w-full bg-white ">
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

export default NriAccountPage;
