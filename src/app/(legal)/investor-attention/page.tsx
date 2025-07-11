/* eslint-disable */
import React from "react";
import Link from "next/link";
import { advisoryData } from "@/components/legal/investorattention";
import { AdvisoryCard } from "@/components/InvestorAttentionComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Attention | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Stay informed with important updates, alerts, and notices for investors.",
  keywords:
    "investor attention, updates, alerts, notices, sapphire broking",
  openGraph: {
    title: "Investor Attention | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Stay informed with important updates, alerts, and notices for investors.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

const InvestorAttention: React.FC = () => {
  return (
    <div className="max-w-4xl py-40 mx-auto p-6 bg-white">
      <h1 className="text-4xl sm:text-6xl font-bold text-green-heading mb-8 uppercase text-center">
        FOR INVESTOR'S ATTENTION
      </h1>

      <p className="text-gray-500 mb-14 text-center">
        Stay informed with important updates, alerts, and notices for
        investors.
      </p>

      <div className="space-y-10">
        <hr />
        {/* Advisories Section */}
        <div className="space-y-8">
          {advisoryData.map((advisory) => (
            <AdvisoryCard
              key={advisory.id}
              title={advisory.title}
              points={advisory.points}
              description={advisory.description}
              contact={advisory.contact}
              sections={advisory.sections}
            />
          ))}
        </div>

        <div className="text-gray-500 mt-8">
          <p>This document was last updated on March 9, 2025.</p>
        </div>

        <div className="text-gray-500 mt-4 italic">
          <p>
            Disclaimer: The information provided in this document is subject to
            change based on regulatory updates. For the most current
            information, please visit our website or contact our customer
            support.
          </p>
        </div>

        <div className="text-gray-500 text-center mt-8">
          <p>Last Updated: April 1, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default InvestorAttention;
