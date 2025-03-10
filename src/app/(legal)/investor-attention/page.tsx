/* eslint-disable */
import React from "react";
import Link from "next/link";
import { advisoryData } from "@/constants/legal/investorattention";
import { AdvisoryCard } from "@/components/InvestorAttentionComponents";

const InvestorAttention: React.FC = () => {
  return (
    <div className="max-w-4xl py-40 mx-auto p-6 bg-white">
      <h1 className="text-6xl font-bold text-green-heading mb-8 uppercase text-center">
        FOR INVESTOR'S ATTENTION
      </h1>

      <p className="text-gray-500 mb-14 text-center">
        IMPORTANT ADVISORIES FOR INVESTORS
      </p>

      <div className="space-y-10">
        {/* Link to other sections */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
          <div>
            <h3 className="text-xl font-semibold text-green-heading mb-2">
              Additional Resources
            </h3>
            <p className="text-gray-500">
              Please review these important documents for investors
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/investor-charter"
              className="px-6 py-3 bg-green-heading text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Investor Charter
            </Link>
            <Link
              href="/investor-dos-and-donts"
              className="px-6 py-3 border border-green-heading text-green-heading rounded-md hover:bg-green-50 transition-colors"
            >
              Do's and Don'ts
            </Link>
          </div>
        </div>

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
