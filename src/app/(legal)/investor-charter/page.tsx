/* eslint-disable */
import React from "react";
import Link from "next/link";
import { investorCharterData } from "@/constants/legal/investorattention";
import {
  RightsTable,
  TimelineTable,
  GrievanceSteps,
  ExpectationsTable,
  ServicesTable,
  QuarterlyComplaintsTable,
  MonthlyComplaintsTable,
  AnnualComplaintsTable,
} from "@/components/InvestorAttentionComponents";

const InvestorCharter: React.FC = () => {
  return (
    <div className="max-w-4xl py-40 mx-auto p-6 bg-white">
      <h1 className="text-6xl font-bold text-green-heading mb-8 uppercase text-center">
        Investor Charter
      </h1>

      <p className="text-gray-500 mb-14 text-center">SAPPHIRE BROKING</p>

      <div className="space-y-10">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
          <div>
            <h3 className="text-xl font-semibold text-green-heading mb-2">
              Related Documents
            </h3>
            <p className="text-gray-500">
              Navigate to other important investor information
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/investor-attention"
              className="px-6 py-3 bg-green-heading text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Investor Advisories
            </Link>
            <Link
              href="/investor-dos-and-donts"
              className="px-6 py-3 border border-green-heading text-green-heading rounded-md hover:bg-green-50 transition-colors"
            >
              Do's and Don'ts
            </Link>
          </div>
        </div>

        {/* Charter Content */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-green-heading mb-4">
            VISION
          </h3>
          <p className="text-gray-500">{investorCharterData.vision}</p>
        </section>

        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-green-heading mb-4">
            MISSION
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            {investorCharterData.mission.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-green-heading mb-4">
            A. RIGHTS OF INVESTORS
          </h3>
          <RightsTable rights={investorCharterData.rightsOfInvestors} />
        </section>

        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-green-heading mb-4">
            B. VARIOUS ACTIVITIES OF STOCK BROKERS WITH TIMELINES
          </h3>
          <TimelineTable timelines={investorCharterData.brokerTimelines} />
        </section>

        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-green-heading mb-4">
            C. GRIEVANCE REDRESSAL MECHANISM
          </h3>
          <GrievanceSteps steps={investorCharterData.grievanceRedressal} />
        </section>

        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-green-heading mb-4">
            D. EXPECTATIONS FROM INVESTORS
          </h3>
          <ExpectationsTable
            expectations={investorCharterData.expectationsFromInvestors}
          />
        </section>

        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-green-heading mb-4">
            E. SERVICES PROVIDED BY SAPPHIRE BROKING
          </h3>
          <div className="space-y-6 text-gray-500">
            {investorCharterData.servicesProvided.map(
              (serviceCategory, index) => (
                <ServicesTable
                  key={index}
                  category={serviceCategory.category}
                  segments={serviceCategory.segments}
                />
              )
            )}
          </div>
        </section>

        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-green-heading mb-4">
            G. INVESTOR COMPLAINTS DATA (STOCK BROKER)
          </h3>
          <p className="text-gray-500 mb-4">
            {investorCharterData.complaintsData.quarterly.title}
          </p>

          <QuarterlyComplaintsTable
            data={investorCharterData.complaintsData.quarterly.data}
            total={investorCharterData.complaintsData.quarterly.total}
          />

          <p className="text-gray-500 mb-4">
            {investorCharterData.complaintsData.monthly.title}
          </p>

          <MonthlyComplaintsTable
            data={investorCharterData.complaintsData.monthly.data}
            total={investorCharterData.complaintsData.monthly.total}
          />

          <p className="text-gray-500 mb-4">
            {investorCharterData.complaintsData.annual.title}
          </p>

          <AnnualComplaintsTable
            data={investorCharterData.complaintsData.annual.data}
            total={investorCharterData.complaintsData.annual.total}
          />

          <p className="text-gray-500 italic mt-4">
            {investorCharterData.complaintsData.note}
          </p>
        </section>

        <div className="text-gray-500 text-center mt-8">
          <p>Last Updated: April 1, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default InvestorCharter;
