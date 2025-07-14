import { Metadata } from "next";
import React from "react";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Risk Disclosure | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Understand the risks associated with trading in equity, derivatives, and commodities. Sapphire Broking provides comprehensive risk disclosure to help investors make informed decisions about their trading activities.",
  keywords:
    "risk disclosure, trading risks, investment risks, equity trading risks, derivatives trading risks, commodity trading risks, market risks, financial risks, SEBI risk disclosure, stock market risks, trading warnings, investment disclaimers, margin trading risks, futures and options risks, volatile markets, risk management, trading education",
  openGraph: {
    title: "Risk Disclosure | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Understand the risks associated with trading in equity, derivatives, and commodities. Sapphire Broking provides comprehensive risk disclosure to help investors make informed decisions about their trading activities.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

const riskDisclosureData = [
  {
    id: "general-risks",
    title: "1. GENERAL TRADING RISKS",
    sections: [
      {
        id: "market-volatility",
        subtitle: "1.1. Market Volatility",
        points: [
          "Stock markets are subject to extreme volatility and can experience significant price fluctuations.",
          "Past performance of securities does not guarantee future results or returns.",
          "Market conditions can change rapidly due to economic, political, or other factors.",
          "Investors may lose part or all of their invested capital.",
          "No trading strategy can guarantee profits or protect against losses.",
        ],
      },
      {
        id: "liquidity-risk",
        subtitle: "1.2. Liquidity Risk",
        points: [
          "Some securities may have limited trading volumes, making it difficult to buy or sell.",
          "Lack of liquidity can result in wider bid-ask spreads and higher transaction costs.",
          "During volatile market conditions, liquidity may further deteriorate.",
          "Investors may not be able to exit positions at desired prices.",
          "Illiquid securities may experience more dramatic price movements.",
        ],
      },
      {
        id: "systemic-risk",
        subtitle: "1.3. Systemic Risk",
        points: [
          "Entire market systems can be affected by economic, political, or regulatory changes.",
          "Technology failures or cyber attacks can disrupt trading operations.",
          "Regulatory changes may impact trading rules and market access.",
          "Economic recessions or financial crises can affect all market participants.",
          "Currency fluctuations can impact returns for international investments.",
        ],
      },
    ],
  },
  {
    id: "equity-risks",
    title: "2. EQUITY TRADING RISKS",
    sections: [
      {
        id: "stock-specific-risks",
        subtitle: "2.1. Stock-Specific Risks",
        points: [
          "Individual stocks can experience significant price volatility independent of market conditions.",
          "Company-specific events such as earnings reports, management changes, or legal issues can impact stock prices.",
          "Dividend payments are not guaranteed and may be reduced or eliminated.",
          "Stock prices can decline to zero in case of company bankruptcy or delisting.",
          "Sector-specific risks can affect groups of related stocks simultaneously.",
        ],
      },
      {
        id: "margin-trading-risks",
        subtitle: "2.2. Margin Trading Risks",
        points: [
          "Margin trading involves borrowing funds to purchase securities, amplifying both potential gains and losses.",
          "Investors can lose more than their initial investment in margin trading.",
          "Margin calls may require immediate deposit of additional funds or forced liquidation of positions.",
          "Interest charges on borrowed funds reduce overall returns.",
          "Volatile markets can trigger automatic margin calls and position closures.",
        ],
      },
      {
        id: "intraday-trading-risks",
        subtitle: "2.3. Intraday Trading Risks",
        points: [
          "Intraday trading involves higher frequency transactions and increased transaction costs.",
          "Positions must be squared off within the same trading day, limiting flexibility.",
          "Rapid price movements can result in significant losses within short time periods.",
          "Higher leverage in intraday trading amplifies both profits and losses.",
          "Technical analysis and timing become crucial factors affecting profitability.",
        ],
      },
    ],
  },
  {
    id: "derivatives-risks",
    title: "3. DERIVATIVES TRADING RISKS",
    sections: [
      {
        id: "futures-risks",
        subtitle: "3.1. Futures Trading Risks",
        points: [
          "Futures contracts are highly leveraged instruments that can result in large losses.",
          "Margin requirements can change frequently, requiring additional capital deployment.",
          "Futures contracts have expiration dates and may result in physical delivery obligations.",
          "Price movements in underlying assets can cause significant profit or loss.",
          "Futures trading requires sophisticated understanding of market mechanics.",
        ],
      },
      {
        id: "options-risks",
        subtitle: "3.2. Options Trading Risks",
        points: [
          "Options can expire worthless, resulting in total loss of premium paid.",
          "Writing options involves unlimited loss potential for certain strategies.",
          "Time decay (theta) continuously erodes option values as expiration approaches.",
          "Volatility changes can significantly impact option prices regardless of underlying movement.",
          "Complex options strategies involve multiple risk factors and require advanced knowledge.",
        ],
      },
      {
        id: "derivative-complexity",
        subtitle: "3.3. Derivative Complexity",
        points: [
          "Derivatives are complex financial instruments requiring specialized knowledge.",
          "Multiple factors including time, volatility, and interest rates affect derivative pricing.",
          "Hedging strategies may not always provide expected protection against losses.",
          "Correlation between derivatives and underlying assets may not always hold.",
          "Regulatory changes can impact derivative trading rules and margin requirements.",
        ],
      },
    ],
  },
  {
    id: "commodity-risks",
    title: "4. COMMODITY TRADING RISKS",
    sections: [
      {
        id: "price-volatility",
        subtitle: "4.1. Price Volatility",
        points: [
          "Commodity prices are highly volatile and influenced by supply and demand factors.",
          "Weather conditions, geopolitical events, and economic policies can cause sudden price changes.",
          "Seasonal patterns and storage costs affect commodity pricing.",
          "Currency fluctuations can impact commodity prices in international markets.",
          "Speculative trading can amplify price movements in commodity markets.",
        ],
      },
      {
        id: "delivery-risks",
        subtitle: "4.2. Delivery and Storage Risks",
        points: [
          "Physical delivery of commodities involves additional costs and complexities.",
          "Storage, insurance, and transportation costs can significantly impact returns.",
          "Quality specifications and delivery locations may affect final settlement prices.",
          "Perishable commodities have additional spoilage and deterioration risks.",
          "Warehouse receipts and delivery mechanisms require proper understanding.",
        ],
      },
      {
        id: "regulatory-risks",
        subtitle: "4.3. Regulatory and Policy Risks",
        points: [
          "Government policies on import/export duties can affect commodity prices.",
          "Agricultural policies and subsidies can influence food commodity markets.",
          "Environmental regulations may impact production and pricing of certain commodities.",
          "International trade agreements and tariffs affect global commodity flows.",
          "Regulatory changes in commodity exchanges can impact trading conditions.",
        ],
      },
    ],
  },
  {
    id: "technology-risks",
    title: "5. TECHNOLOGY AND OPERATIONAL RISKS",
    sections: [
      {
        id: "system-failures",
        subtitle: "5.1. System Failures",
        points: [
          "Technology failures can prevent order execution or modification during critical market periods.",
          "Internet connectivity issues may disrupt access to trading platforms.",
          "System maintenance and upgrades may temporarily limit trading capabilities.",
          "Data feed delays or errors can affect trading decisions and order execution.",
          "Backup systems may not always prevent all technology-related disruptions.",
        ],
      },
      {
        id: "cybersecurity-risks",
        subtitle: "5.2. Cybersecurity Risks",
        points: [
          "Cyber attacks can compromise trading platforms and client data security.",
          "Phishing attempts and fraudulent communications can lead to unauthorized access.",
          "Malware and viruses can affect trading software and personal devices.",
          "Identity theft and account compromization can result in unauthorized trading.",
          "Regular security updates and vigilance are essential for protection.",
        ],
      },
      {
        id: "order-execution-risks",
        subtitle: "5.3. Order Execution Risks",
        points: [
          "Orders may not be executed at expected prices due to market volatility.",
          "Slippage can occur between order placement and execution, affecting returns.",
          "Partial fills may result in incomplete position building or closing.",
          "Stop-loss orders may not execute at intended prices during volatile markets.",
          "Order routing and execution algorithms may not always optimize pricing.",
        ],
      },
    ],
  },
  {
    id: "regulatory-compliance",
    title: "6. REGULATORY AND COMPLIANCE RISKS",
    sections: [
      {
        id: "sebi-regulations",
        subtitle: "6.1. SEBI Regulations",
        points: [
          "SEBI regulations are subject to change and may impact trading activities.",
          "Non-compliance with regulations can result in penalties or trading restrictions.",
          "Disclosure requirements must be met for certain types of transactions.",
          "Insider trading laws strictly prohibit trading on material non-public information.",
          "Margin requirements and position limits are subject to regulatory oversight.",
        ],
      },
      {
        id: "tax-implications",
        subtitle: "6.2. Tax Implications",
        points: [
          "Trading activities may have complex tax implications requiring professional advice.",
          "Short-term and long-term capital gains are taxed differently.",
          "Securities Transaction Tax (STT) and other charges reduce overall returns.",
          "Tax laws may change and affect the profitability of trading strategies.",
          "Proper record-keeping is essential for tax compliance and reporting.",
        ],
      },
      {
        id: "legal-risks",
        subtitle: "6.3. Legal Risks",
        points: [
          "Legal disputes may arise from trading activities or broker relationships.",
          "Contractual obligations must be understood and fulfilled.",
          "Regulatory actions can impact market access and trading rights.",
          "International trading may involve additional legal complexities.",
          "Arbitration and dispute resolution mechanisms have specific procedures.",
        ],
      },
    ],
  },
  {
    id: "risk-management",
    title: "7. RISK MANAGEMENT GUIDELINES",
    sections: [
      {
        id: "position-sizing",
        subtitle: "7.1. Position Sizing and Diversification",
        points: [
          "Never invest more than you can afford to lose in any single position.",
          "Diversify investments across different sectors, asset classes, and time horizons.",
          "Maintain appropriate position sizes relative to total portfolio value.",
          "Avoid concentrating investments in highly correlated assets.",
          "Regular portfolio rebalancing helps maintain desired risk levels.",
        ],
      },
      {
        id: "stop-loss-strategies",
        subtitle: "7.2. Stop-Loss and Risk Control",
        points: [
          "Use stop-loss orders to limit potential losses on individual positions.",
          "Set realistic profit targets and risk-reward ratios for trades.",
          "Avoid emotional decision-making during volatile market conditions.",
          "Maintain adequate cash reserves for margin calls and opportunities.",
          "Regular monitoring and adjustment of risk parameters is essential.",
        ],
      },
      {
        id: "education-preparation",
        subtitle: "7.3. Education and Preparation",
        points: [
          "Continuously educate yourself about markets, products, and risks.",
          "Understand all terms and conditions before entering any transaction.",
          "Practice with paper trading before committing real capital.",
          "Stay informed about market news and regulatory developments.",
          "Consider professional advice for complex trading strategies.",
        ],
      },
    ],
  },
];

// Section component (same as Fund Transfer page)
type RiskSectionProps = {
  subtitle: string;
  points?: string[];
  isTable?: boolean;
  tableData?: any[];
};

const RiskSection: React.FC<RiskSectionProps> = ({ subtitle, points, isTable, tableData }) => {
  if (isTable) {
    return (
      <div className="mb-6 ml-8">
        <h3 className="text-xl font-medium text-green-heading mb-3">
          {subtitle}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                {tableData && tableData.length > 0 && Object.keys(tableData[0]).map((key) => (
                  <th key={key} className="px-4 py-3 text-left text-sm font-medium text-green-heading border-b border-gray-300">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {tableData && tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {Object.values(row).map((value, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 ml-8">
      <h3 className="text-xl font-medium text-green-heading mb-3">
        {subtitle}
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-500">
        {points && points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

// Main component
const RiskDisclosure = () => {
  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 px-8">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-3">
          <nav className="flex items-center text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-[#064D51] transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">›</span>
            <Link href="/" className="text-gray-500 hover:text-[#064D51] transition-colors">Account</Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-[#064D51] font-regular">Risk Disclosure</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Risk Disclosure</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Important information about risks associated with trading in equity, derivatives, and commodities.
            </p>
          </div>
        </div>

        <div className="space-y-10 pb-12">
          <hr />
          {/* Introduction */}
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
            <div className="space-y-4 text-gray-500">
              <p>
                <strong className="text-red-600">IMPORTANT:</strong> Trading in equity, derivatives, and commodities 
                involves substantial risk and may not be suitable for all investors. Please read this risk disclosure 
                carefully before engaging in any trading activities.
              </p>
              <p>
                The value of investments can go down as well as up, and you may receive back less than your original 
                investment. Past performance is not indicative of future results. It is important to understand the 
                risks involved before making any investment decisions.
              </p>
              <p>
                <strong className="text-red-600">WARNING:</strong> Derivatives trading involves high risk and may result 
                in loss of your entire investment. Please ensure you fully understand the risks before trading in 
                derivatives.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {riskDisclosureData.map((category) => (
              <section
                id={category.id}
                key={category.id}
                className="p-6 border border-gray-200 rounded-lg shadow-sm scroll-mt-20"
              >
                <h2 className="text-2xl font-semibold text-green-heading mb-6">
                  {category.title}
                </h2>

                <div className="space-y-6">
                  {category.sections.map((section) => (
                    <RiskSection
                      key={section.id}
                      subtitle={section.subtitle}
                      points={section.points}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Disclaimer */}
          <section className="p-6 border border-red-200 bg-red-50 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Important Disclaimers
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Investment Advice:</strong> This risk disclosure does not constitute investment advice. 
                Please consult with qualified financial advisors before making investment decisions.
              </p>
              <p>
                <strong>No Guarantee:</strong> Sapphire Broking does not guarantee profits or protection against 
                losses. All trading involves risk, and past performance does not guarantee future results.
              </p>
              <p>
                <strong>Regulatory Compliance:</strong> This disclosure is prepared in accordance with SEBI 
                regulations and guidelines. Please ensure you comply with all applicable laws and regulations.
              </p>
              <p>
                <strong>Updates:</strong> This risk disclosure may be updated periodically. Please check for 
                the latest version on our website.
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-green-heading mb-4">
              Client Acknowledgment
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                By trading with Sapphire Broking, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have read and understood this risk disclosure document</li>
                <li>You understand the risks involved in trading equity, derivatives, and commodities</li>
                <li>You have the financial capacity to bear potential losses</li>
                <li>You will not hold Sapphire Broking liable for any losses incurred</li>
                <li>You will comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-green-heading mb-4">
              Contact Information
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                For questions or clarifications regarding this risk disclosure, please contact:
              </p>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-green-heading mb-2">
                  Risk Management Team
                </h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-heading"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      <span className="font-medium">Email:</span>{' '}
                      risk@sapphirebroking.com
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-heading"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>
                      <span className="font-medium">Phone:</span> [Risk Management Support Number]
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="text-gray-500 text-center mt-8">
            <p>Last Updated: July 14, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDisclosure;