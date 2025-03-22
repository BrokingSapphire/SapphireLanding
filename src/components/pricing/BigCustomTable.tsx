"use client";

import React, { useState } from "react";
import {
  equityData,
  currencyData,
  commodityData,
  accountOpeningData,
  nonTradeCharges,
  mtfCharges,
  EquityRowType,
  OtherRowType,
  AccountType,
  ChargeType
} from "@/constants/ChargesTable";

const ChargesTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Equity");

  // Functions to render different table types
  const renderEquityTable = (): React.ReactNode => (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base"></th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                Equity Delivery
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                Equity Intraday
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                Equity Futures
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                Equity Options
              </th>
            </tr>
          </thead>
          <tbody>
            {equityData.map((row: EquityRowType, index: number) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4 font-medium text-gray-700 flex items-center text-sm sm:text-base">
                  {row.type}
                  {index < 7 && (
                    <span className="ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12" y2="8"></line>
                      </svg>
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                  {row.equityDelivery}
                </td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                  {row.equityIntraday}
                </td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                  {row.equityFutures}
                </td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                  {row.equityOptions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCurrencyTable = (): React.ReactNode => (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base"></th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                Currency Futures
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                Currency Options
              </th>
            </tr>
          </thead>
          <tbody>
            {currencyData.map((row: OtherRowType, index: number) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4 font-medium text-gray-700 flex items-center text-sm sm:text-base">
                  {row.type}
                  <span className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12" y2="8"></line>
                    </svg>
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                  {row.futures}
                </td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                  {row.options}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCommodityTable = (): React.ReactNode => (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base"></th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                Commodities Futures
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                Commodities Options
              </th>
            </tr>
          </thead>
          <tbody>
            {commodityData.map((row: OtherRowType, index: number) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4 font-medium text-gray-700 flex items-center text-sm sm:text-base">
                  {row.type}
                  <span className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12" y2="8"></line>
                    </svg>
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                  {row.futures}
                </td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                  {row.options}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render table based on active tab
  const renderActiveTable = (): React.ReactNode => {
    switch (activeTab) {
      case "Currency":
        return renderCurrencyTable();
      case "Commodity":
        return renderCommodityTable();
      case "Equity":
      default:
        return renderEquityTable();
    }
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-24 space-y-6 sm:space-y-8">
        {/* Navigation Bar */}
        <div className="flex border-b pt-6 gap-x-16 sm:gap-x-20 overflow-x-auto hide-scrollbar">
          {["Equity", "Currency", "Commodity", "Other Charges"].map((tab: string) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base cursor-pointer whitespace-nowrap relative ${
                activeTab === tab
                  ? "text-[#064D51]"
                  : "text-gray-700 hover:text-[#064D51]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#064D51]"
                  style={{
                    bottom: "0px",
                    height: "2px",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Trading Charges Table - Dynamically render based on active tab */}
        {renderActiveTable()}

        {/* Account Opening Charges */}
        <div>
          <div className="font-lexend ml-3 py-4 text-xl sm:text-2xl font-semibold text-gray-800">
            Account Opening Charges
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/2 text-sm sm:text-base">
                      Account Type
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/2 text-sm sm:text-base">
                      Opening Charges
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accountOpeningData.map((item: AccountType, index: number) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4 text-gray-600 text-sm sm:text-base">
                        {item.type}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm sm:text-base">
                        {item.charges}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Non Trade Charges */}
        <div>
          <div className="font-lexend ml-3 py-4 text-xl sm:text-2xl font-semibold text-gray-800">
            Non Trade Charges
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/2 text-sm sm:text-base">
                      Charges
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/2 text-sm sm:text-base">
                      Charges
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nonTradeCharges.map((item: ChargeType, index: number) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4 text-gray-600 text-sm sm:text-base">
                        {item.title}
                      </td>
                      <td className="py-3 px-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                        {item.charges}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MTF Charges */}
        <div className="">
          <div className="font-lexend ml-3 py-4 text-xl sm:text-2xl font-semibold text-gray-800">
            MTF Charges
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                      Charges
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                      Charges
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mtfCharges.map((item: ChargeType, index: number) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4 text-gray-600 text-sm sm:text-base">
                        {item.title}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm sm:text-base">
                        {item.charges}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:py-16 sm:px-24 text-sm bg-gray-100 text-gray-600">
        <span className=" font-lexend text-xl sm:text-2xl font-semibold text-black">
          Disclaimer
        </span>
        <p className="mt-4 sm:mt-5 leading-relaxed">
          For Delivery based trades, a minimum of ₹2.5 will be charged per
          contract note. Clients who opt to receive physical contract notes will
          be charged ₹50 per contract note plus courier charges. Brokerage will
          not exceed the rates specified by SEBI and the exchanges. All
          statutory and regulatory charges will be levied as actuals. Brokerage
          is also charged on expired, exercised and assigned options contracts.
          Free investments are available only for our retail individual clients.
          Companies, Partnerships, Trusts, and HUF would pay ₹15 + ₹3 (minimum
          of ₹1 per trade (except delivery)). Additional charges for investors
          who opt for physical delivery of payout of securities, where physical
          delivery happens. For renewal of packages for continued where physical
          delivery happens is ₹199 per month.
        </p>
      </div>
    </>
  );
};

export default ChargesTable;