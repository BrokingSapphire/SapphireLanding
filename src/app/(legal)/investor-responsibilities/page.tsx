import { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investor Responsibility | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Essential guidelines for investors to make informed and responsible decisions.",
  keywords:
    "investor responsibility, trading guidelines, responsible investing, sapphire broking",
  openGraph: {
    title: "Investor Responsibility | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Essential guidelines for investors to make informed and responsible decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

// Responsibilities data structure
const responsibilitiesData = [
  {
    id: "before-account-opening",
    title: "1. BEFORE ACCOUNT OPENING",
    sections: [
      {
        id: "research",
        subtitle: "1.1. Research and Due Diligence",
        points: [
          "Research thoroughly about Sapphire Broking before opening an account",
          "Verify Sapphire Broking's registration status with SEBI and relevant exchanges",
          "Check Sapphire Broking's track record, service quality, and reputation",
          "Review client testimonials and feedback if available",
        ],
      },
      {
        id: "documentation",
        subtitle: "1.2. Documentation and KYC",
        points: [
          "Provide complete, accurate, and up-to-date information during the KYC process",
          "Submit genuine and valid documents for identity and address proof",
          "Disclose all required financial information honestly",
          "Ensure all signatures on forms match your specimen signature",
          "Read all account opening documents carefully before signing",
        ],
      },
      {
        id: "understanding-docs",
        subtitle: "1.3. Understanding Documents",
        points: [
          "Read and understand the Rights and Obligations document",
          "Carefully review the Risk Disclosure Document to understand market risks",
          "Understand the fee structure, brokerage, and other charges",
          "Familiarize yourself with the tariff/charge sheet provided by Sapphire Broking",
          "Clarify any doubts before signing any document",
        ],
      },
      {
        id: "nomination",
        subtitle: "1.4. Nomination",
        points: [
          "Provide nomination details for your trading and demat accounts",
          "Update nomination information whenever necessary",
          "Understand the process of claim settlement for nominees",
        ],
      },
    ],
  },
  {
    id: "during-trading",
    title: "2. DURING TRADING/INVESTING",
    sections: [
      {
        id: "order-placement",
        subtitle: "2.1. Order Placement",
        points: [
          "Place orders with clear and specific instructions",
          "Verify that your orders are placed as per your instructions",
          "Confirm order execution through the trading platform or with your broker",
          "Keep record of all orders placed and their status",
          "Be aware of the trading hours and applicable rules for different market segments",
        ],
      },
      {
        id: "financial-discipline",
        subtitle: "2.2. Financial Discipline",
        points: [
          "Ensure sufficient funds/securities in your account before placing orders",
          "Maintain required margins for derivative and other leveraged trades",
          "Pay all dues and settlement obligations on time",
          "Track your trading positions and overall exposure regularly",
          "Avoid trading beyond your financial capacity",
        ],
      },
      {
        id: "contract-notes",
        subtitle: "2.3. Contract Notes and Statements",
        points: [
          "Verify contract notes received for accuracy of trades, brokerage, and other charges",
          "Check that contract notes are received within 24 hours of trade execution",
          "Review your statement of accounts regularly",
          "Reconcile your personal records with official statements",
          "Report any discrepancies immediately to Sapphire Broking",
        ],
      },
      {
        id: "security-practices",
        subtitle: "2.4. Security Practices",
        points: [
          "Keep your login credentials, passwords, and PINs confidential",
          "Do not share OTPs received on your mobile/email with anyone",
          "Change your passwords periodically",
          "Use secure networks when accessing your trading account",
          "Log out from your trading account after each session",
        ],
      },
      {
        id: "monitoring",
        subtitle: "2.5. Monitoring",
        points: [
          "Regularly monitor your investments and trading positions",
          "Track corporate actions (dividends, bonus, splits, etc.) that affect your holdings",
          "Keep track of important market announcements and news",
          "Monitor account statements for any unauthorized transactions",
          "Verify SMS/email alerts received from exchanges against your trading activities",
        ],
      },
    ],
  },
  {
    id: "risk-management",
    title: "3. RISK MANAGEMENT",
    sections: [
      {
        id: "understanding-risk",
        subtitle: "3.1. Understanding Risk",
        points: [
          "Understand that all investments carry varying degrees of risk",
          "Accept that past performance is not indicative of future results",
          "Recognize that leveraged trading amplifies both profits and losses",
          "Be aware of the specific risks associated with different market segments",
          "Understand that market volatility can lead to significant price movements",
        ],
      },
      {
        id: "personal-risk",
        subtitle: "3.2. Personal Risk Assessment",
        points: [
          "Assess your risk tolerance before making investment decisions",
          "Invest according to your financial goals and time horizon",
          "Consider your financial situation when determining investment amount",
          "Diversify your investments to manage risk",
          "Have realistic expectations about investment returns",
        ],
      },
      {
        id: "trading-risks",
        subtitle: "3.3. Managing Trading Risks",
        points: [
          "Use stop-loss orders to limit potential losses",
          "Avoid over-leveraging your positions",
          "Do not invest based on tips, rumors, or unsolicited advice",
          "Be cautious with illiquid securities and penny stocks",
          "Exercise special caution when trading in derivative products",
        ],
      },
      {
        id: "emergency",
        subtitle: "3.4. Emergency Preparedness",
        points: [
          "Maintain an emergency fund separate from your trading capital",
          "Have contingency plans for market disruptions or personal emergencies",
          "Be prepared for margin calls during volatile market conditions",
          "Know the procedure to close positions quickly if needed",
          "Understand circuit breakers and trading halts in the market",
        ],
      },
    ],
  },
  {
    id: "compliance",
    title: "4. COMPLIANCE RESPONSIBILITIES",
    sections: [
      {
        id: "regulatory",
        subtitle: "4.1. Regulatory Compliance",
        points: [
          "Adhere to all exchange rules and SEBI regulations",
          "Respect trading limits and position limits set by regulators",
          "Avoid engaging in manipulative or fraudulent trading practices",
          "Do not participate in synchronized, circular, or artificial transactions",
          "Report any requests to engage in market manipulation",
        ],
      },
      {
        id: "tax",
        subtitle: "4.2. Tax Compliance",
        points: [
          "Maintain proper records of all your trades for tax purposes",
          "Report all investment income and capital gains in your tax returns",
          "Pay applicable securities transaction tax, capital gains tax, and other taxes",
          "Keep track of tax implications of different investment products",
          "Consult a tax professional if needed for complex tax matters",
        ],
      },
      {
        id: "legal",
        subtitle: "4.3. Legal Obligations",
        points: [
          "Honor all contractual obligations with Sapphire Broking",
          "Fulfill all payment and delivery commitments on time",
          "Comply with margin requirements and mark-to-market obligations",
          "Adhere to the terms and conditions accepted during account opening",
          "Follow proper procedures for grievance redressal",
        ],
      },
    ],
  },
  {
    id: "information-management",
    title: "5. INFORMATION MANAGEMENT",
    sections: [
      {
        id: "records",
        subtitle: "5.1. Keeping Records",
        points: [
          "Maintain copies of all account opening documents",
          "Keep records of all contract notes and statements",
          "Save confirmation of fund transfers and securities transfers",
          "Document all communications regarding disputes or issues",
          "Preserve evidence of all transactions and claims",
        ],
      },
      {
        id: "updating",
        subtitle: "5.2. Updating Information",
        points: [
          "Promptly update any changes in your personal information",
          "Inform Sapphire Broking about changes in your contact details",
          "Update your bank account details whenever there's a change",
          "Renew KYC documents before their expiry",
          "Inform about material changes in your financial status",
        ],
      },
      {
        id: "staying-informed",
        subtitle: "5.3. Staying Informed",
        points: [
          "Keep yourself updated about market trends and developments",
          "Read circulars and notices issued by exchanges and regulators",
          "Follow news that might impact your investments",
          "Understand changes in rules, regulations, and trading procedures",
          "Participate in investor education programs when possible",
        ],
      },
    ],
  },
  {
    id: "account-maintenance",
    title: "6. ACCOUNT MAINTENANCE",
    sections: [
      {
        id: "review",
        subtitle: "6.1. Regular Review",
        points: [
          "Periodically review your investment portfolio and trading strategy",
          "Evaluate the performance of your investments against your goals",
          "Reassess your risk tolerance and adjust your portfolio if needed",
          "Review the services provided by Sapphire Broking",
          "Check if brokerage and other charges are as per the agreed terms",
        ],
      },
      {
        id: "activity",
        subtitle: "6.2. Account Activity",
        points: [
          "Ensure your trading account remains active as per regulatory requirements",
          "Be aware of the consequences of an inactive/dormant account",
          "Complete periodic KYC updation as required by regulations",
          "Regularly access your trading and demat accounts",
          "Conduct periodic transactions to maintain active status if desired",
        ],
      },
      {
        id: "delegation",
        subtitle: "6.3. Careful Delegation",
        points: [
          "If authorizing someone else to operate your account, do so formally",
          "Set clear boundaries and limitations when delegating authority",
          "Regularly monitor account activity even when delegated",
          "Review and renew authorizations periodically",
          "Revoke authorizations when no longer needed",
        ],
      },
    ],
  },
  {
    id: "dispute-resolution",
    title: "7. DISPUTE RESOLUTION",
    sections: [
      {
        id: "reporting",
        subtitle: "7.1. Timely Reporting",
        points: [
          "Report discrepancies in your account promptly",
          "Raise concerns about unauthorized transactions immediately",
          "File formal complaints within the prescribed timeframes",
          "Provide all relevant details when reporting an issue",
          "Keep track of complaint reference numbers",
        ],
      },
      {
        id: "documentation",
        subtitle: "7.2. Proper Documentation",
        points: [
          "Support your complaints with proper documentation",
          "Provide evidence to substantiate your claims",
          "Submit all relevant information for effective resolution",
          "Keep copies of all communication related to disputes",
          "Maintain a chronological record of events",
        ],
      },
      {
        id: "procedure",
        subtitle: "7.3. Following Procedure",
        points: [
          "Follow the proper grievance redressal mechanism",
          "Escalate issues as per the defined escalation matrix",
          "Exhaust internal resolution mechanisms before approaching regulators",
          "Respond promptly to requests for additional information",
          "Participate constructively in the resolution process",
        ],
      },
    ],
  },
  {
    id: "ethical-trading",
    title: "8. ETHICAL TRADING PRACTICES",
    sections: [
      {
        id: "market-integrity",
        subtitle: "8.1. Market Integrity",
        points: [
          "Do not engage in price manipulation or creating artificial volumes",
          "Avoid spreading rumors or false information about securities",
          "Do not participate in front-running or insider trading",
          "Report suspicious market activities to appropriate authorities",
          "Trade with integrity and honesty",
        ],
      },
      {
        id: "responsible-trading",
        subtitle: "8.2. Responsible Trading",
        points: [
          "Place orders that you intend to honor",
          "Do not place and cancel orders repeatedly without execution",
          "Avoid disruptive trading practices",
          "Do not attempt to game the trading system",
          "Consider the impact of your trades on market stability",
        ],
      },
      {
        id: "ethical-conduct",
        subtitle: "8.3. Ethical Conduct",
        points: [
          "Deal honestly with Sapphire Broking and other market participants",
          "Honor your contractual and financial obligations",
          "Do not misrepresent facts or circumstances",
          "Respect the confidentiality of market-sensitive information",
          "Encourage fair and transparent market practices",
        ],
      },
    ],
  },
  {
    id: "digital-trading",
    title: "9. DIGITAL TRADING RESPONSIBILITY",
    sections: [
      {
        id: "system-requirements",
        subtitle: "9.1. System Requirements",
        points: [
          "Ensure your computer/device meets the technical requirements for trading platforms",
          "Maintain updated operating systems and browsers",
          "Use licensed and updated antivirus software",
          "Ensure stable internet connectivity for uninterrupted trading",
          "Have backup systems ready in case of primary system failure",
        ],
      },
      {
        id: "digital-security",
        subtitle: "9.2. Digital Security",
        points: [
          "Trade only through official applications provided by Sapphire Broking",
          "Verify the authenticity of trading apps before downloading",
          "Do not access trading accounts from shared or public computers",
          "Be alert to phishing attempts and fraudulent websites",
          "Report suspicious emails or messages claiming to be from Sapphire Broking",
        ],
      },
      {
        id: "digital-behavior",
        subtitle: "9.3. Responsible Digital Behavior",
        points: [
          "Do not automate trading without proper understanding of the risks",
          "Use algorithms and trading bots responsibly if permitted",
          "Understand the implications of high-frequency trading",
          "Be cautious when using third-party trading tools",
          "Verify the legitimacy of investment-related apps and websites",
        ],
      },
    ],
  },
  {
    id: "continuous-learning",
    title: "10. CONTINUOUS LEARNING",
    sections: [
      {
        id: "market-education",
        subtitle: "10.1. Market Education",
        points: [
          "Continuously educate yourself about financial markets",
          "Understand different investment products and their features",
          "Learn about technical and fundamental analysis",
          "Stay updated with trading strategies and risk management techniques",
          "Participate in webinars and workshops offered by Sapphire Broking",
        ],
      },
      {
        id: "financial-literacy",
        subtitle: "10.2. Financial Literacy",
        points: [
          "Improve your understanding of personal finance",
          "Learn about the time value of money and compounding",
          "Understand the impact of inflation on investments",
          "Develop skills to read and interpret financial statements",
          "Build knowledge about portfolio management and asset allocation",
        ],
      },
      {
        id: "regulatory-awareness",
        subtitle: "10.3. Regulatory Awareness",
        points: [
          "Keep abreast of regulatory changes affecting investments",
          "Understand the implications of new rules and regulations",
          "Follow updates from SEBI, exchanges, and other regulatory bodies",
          "Be aware of investor protection mechanisms",
          "Know your rights and responsibilities as an investor",
        ],
      },
    ],
  },
];

// Responsibility section component
const ResponsibilitySection: React.FC<{
  subtitle: string;
  points: string[];
}> = ({ subtitle, points }) => {
  return (
    <div className="mb-6 ml-8">
      <h3 className="text-xl font-medium text-green-heading mb-3">
        {subtitle}
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-500">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

// Main component
const ResponsibilitiesOfInvestors: React.FC = () => {
  return (
    <div className="max-w-4xl py-40 mx-auto p-6 bg-white">
      <h1 className="text-4xl sm:text-6xl font-bold text-green-heading mb-8 uppercase text-center">
        Responsibilities of Investors
      </h1>

      <p className="text-gray-500 mb-14 text-center">
        Know your duties to maintain ethical, transparent, and responsible
        investing practices.
      </p>

      <div className="space-y-10">
        <hr />
        {/* Navigation Links */}

        {/* Quick Access Navigation */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-green-heading mb-4">
            Your Responsibilities at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {responsibilitiesData.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="p-3 flex justify-center items-center bg-white rounded-md shadow-sm hover:shadow border border-gray-200 text-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-green-heading font-medium text-sm">
                  {category.title.substring(2)}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="space-y-8">
          {responsibilitiesData.map((category) => (
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
                  <ResponsibilitySection
                    key={section.id}
                    subtitle={section.subtitle}
                    points={section.points}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Conclusion */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-green-heading mb-4">
            Conclusion
          </h2>
          <div className="space-y-4 text-gray-500">
            <p>
              Remember, being a responsible investor not only protects your own
              interests but also contributes to the overall integrity and
              efficiency of the securities market. Sapphire Broking encourages
              all investors to adopt these responsible practices for a safer and
              more rewarding investment journey.
            </p>
            <p>
              For any clarification or assistance regarding these
              responsibilities, please contact:
            </p>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-medium text-green-heading mb-2">
                Sapphire Broking
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
                    <span className="font-medium">Email:</span>{" "}
                    support@sapphirebroking.com
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
                    <span className="font-medium">Phone:</span> [Customer
                    Support Number]
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    <span className="font-medium">Address:</span> [Sapphire
                    Broking Address]
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Educational Resources */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-green-heading mb-4">
            Educational Resources
          </h2>
          <p className="text-gray-500 mb-4">
            To help you fulfill your responsibilities as an investor, Sapphire
            Broking offers the following educational resources:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <h3 className="font-medium text-green-heading mb-2">
                Market Education
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Learn about market fundamentals, trading strategies, and
                investment approaches.
              </p>
              <Link
                href="/education/market-fundamentals"
                className="text-sm text-green-heading font-medium hover:underline"
              >
                Access resources →
              </Link>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <h3 className="font-medium text-green-heading mb-2">
                Risk Management
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Discover strategies to protect your investments and manage
                trading risks effectively.
              </p>
              <Link
                href="/education/risk-management"
                className="text-sm text-green-heading font-medium hover:underline"
              >
                Access resources →
              </Link>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <h3 className="font-medium text-green-heading mb-2">
                Regulatory Compliance
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Stay updated with regulatory requirements and compliance
                obligations for investors.
              </p>
              <Link
                href="/education/compliance"
                className="text-sm text-green-heading font-medium hover:underline"
              >
                Access resources →
              </Link>
            </div>
          </div>
        </section>

        <div className="text-gray-500 text-center mt-8">
          <p>Last Updated: April 1, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default ResponsibilitiesOfInvestors;
