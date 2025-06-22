"use client";

import React, { useState } from "react";
import {
  equityData,
  currencyData,
  commodityData,
  nonTradeCharges,
  mtfCharges,
  EquityRowType,
  OtherRowType,
  ChargeType
} from "@/constants/ChargesTable";
import ChargesExplained from "./ChargesExplained";

// Info content for each charge type
const infoContent = {
  "Brokerage": "Brokerage is the fee charged by the broker for executing trades. It's typically calculated as a percentage of the trade value or a flat fee per trade.",
  "STT": "Securities Transaction Tax (STT) is a tax levied by the government on the purchase and sale of securities listed on Indian stock exchanges.",
  "Exchange txn charge": "Exchange transaction charges are fees levied by stock exchanges (NSE/BSE) for using their trading platform and infrastructure.",
  "GST": "Goods and Services Tax (GST) is applied on brokerage and other charges as per government regulations. Currently charged at 18%.",
  "SEBI charges": "Securities and Exchange Board of India (SEBI) charges a regulatory fee to fund market oversight and investor protection activities.",
  "Stamp charges": "Stamp duty is a tax charged by state governments on the transfer of securities. Rates vary by state.",
  "DP charges": "Depository Participant (DP) charges are fees for maintaining your demat account and processing transactions through the depository system."
};

const ChargesTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Equity");
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Tooltip component
  const InfoTooltip: React.FC<{ content: string; isVisible: boolean }> = ({ content, isVisible }) => {
    if (!isVisible) return null;
    
    return (
      <div className="absolute z-50 w-80 p-3 bg-white border border-gray-200 rounded-lg shadow-lg text-sm text-gray-700 -top-2 left-8">
        <div className="absolute -left-2 top-4 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white"></div>
        {content}
      </div>
    );
  };

  // Functions to render different table types
  const renderEquityTable = (): React.ReactNode => (
    <div className="overflow-x-auto scrollbar-hide">
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
                <td className="py-3 px-4 font-medium text-gray-700 text-sm sm:text-base">
                  <div className="flex items-center relative">
                    <span>{row.type}</span>
                    {index < 7 && (
                      <div className="relative ml-2">
                        <button
                          onMouseEnter={() => setActiveTooltip(`${row.type}-${index}`)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          onClick={() => setActiveTooltip(activeTooltip === `${row.type}-${index}` ? null : `${row.type}-${index}`)}
                          className="text-current"
                        >
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
                        </button>
                        <InfoTooltip 
                          content={infoContent[row.type as keyof typeof infoContent] || "Information about this charge type."} 
                          isVisible={activeTooltip === `${row.type}-${index}`}
                        />
                      </div>
                    )}
                  </div>
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
    <div className="overflow-x-auto scrollbar-hide">
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
                <td className="py-3 px-4 font-medium text-gray-700 text-sm sm:text-base">
                  <div className="flex items-center relative">
                    <span>{row.type}</span>
                    <div className="relative ml-2">
                      <button
                        onMouseEnter={() => setActiveTooltip(`currency-${row.type}-${index}`)}
                        onMouseLeave={() => setActiveTooltip(null)}
                        onClick={() => setActiveTooltip(activeTooltip === `currency-${row.type}-${index}` ? null : `currency-${row.type}-${index}`)}
                        className="text-current"
                      >
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
                      </button>
                      <InfoTooltip 
                        content={infoContent[row.type as keyof typeof infoContent] || "Information about this charge type for currency trading."} 
                        isVisible={activeTooltip === `currency-${row.type}-${index}`}
                      />
                    </div>
                  </div>
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
    <div className="overflow-x-auto scrollbar-hide">
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
                <td className="py-3 px-4 font-medium text-gray-700 text-sm sm:text-base">
                  <div className="flex items-center relative">
                    <span>{row.type}</span>
                    <div className="relative ml-2">
                      <button
                        onMouseEnter={() => setActiveTooltip(`commodity-${row.type}-${index}`)}
                        onMouseLeave={() => setActiveTooltip(null)}
                        onClick={() => setActiveTooltip(activeTooltip === `commodity-${row.type}-${index}` ? null : `commodity-${row.type}-${index}`)}
                        className="text-current"
                      >
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
                      </button>
                      <InfoTooltip 
                        content={infoContent[row.type as keyof typeof infoContent] || "Information about this charge type for commodity trading."} 
                        isVisible={activeTooltip === `commodity-${row.type}-${index}`}
                      />
                    </div>
                  </div>
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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-24 space-y-6 sm:space-y-8 mb-8 overflow-x-auto scrollbar-hide">
        {/* Navigation Bar */}
        <div className="flex border-b pt-6 gap-x-8 lg:gap-x-20 overflow-x-auto scrollbar-hide">
          {["Equity", "Currency", "Commodity"].map((tab: string) => (
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

        {/* Non Trade Charges */}
        <div>
          <div className="font-lexend ml-3 py-4 text-xl sm:text-2xl font-semibold text-gray-800">
            Non Trade Charges
          </div>
          <div className="overflow-x-auto scrollbar-hide">
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
          <div className="overflow-x-auto scrollbar-hide">
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
        <div>
          <ChargesExplained />
        </div>
      </div>

      <div className="p-6 sm:py-[34px] sm:px-24 text-sm bg-gray-100 text-gray-600">
        <span className="font-lexend text-xl sm:text-2xl font-semibold text-black">
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

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
        
        /* Global scrollbar hiding for any overflow */
        * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        *::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
    </>
  );
};

export default ChargesTable;