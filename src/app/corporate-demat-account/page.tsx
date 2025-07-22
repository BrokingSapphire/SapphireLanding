import AboutInfo from "@/components/corporate-demat-account/content";
import EasyToUse from "@/components/corporate-demat-account/EasyToUse";
import Downloadapp from "@/components/minor-deemat-accnt/downloadapp";
import FAQ from "@/components/corporate-demat-account/FAQ";
import Simplify from "@/components/corporate-demat-account/Simplify";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Corporate Demat Account | Sapphire Broking",
  description:
    "Open a Corporate Demat Account with Sapphire Broking. Manage your company's investments with our secure, streamlined platform. Get expert support and paperless operations.",
  keywords:
    "corporate demat account, company demat account, business demat account, corporate trading account, institutional demat account, corporate investment account, ESOP management, securities management",
  openGraph: {
    title: "Corporate Demat Account | Sapphire Broking",
    description:
      "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
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
