/* eslint-disable */
import React from "react";
import Link from "next/link";

// Rights data structure
const rightsData = [
  {
    id: "right-to-receive",
    title: "1. RIGHT TO RECEIVE",
    sections: [
      {
        id: "kyc-documents",
        subtitle: "1.1. Copy of KYC, Copy of Account Opening Documents",
        points: [
          "You have the right to receive copies of all the KYC documents that you sign",
          "You have the right to receive a copy of the Client Member Agreement, Rights and Obligations document, Risk Disclosure Document, Guidance Note, and Policies & Procedures document",
          "These should be provided to you at the time of account opening",
        ],
      },
      {
        id: "ucc-trade-details",
        subtitle: "1.2. Unique Client Code (UCC) and Trade Details",
        points: [
          "You have the right to receive your unique client code assigned by Sapphire Broking",
          "You have the right to know the associated contact details of relevant exchanges, SEBI, and Sapphire Broking's senior management",
          "You have the right to receive trade confirmations of the trades executed on your behalf",
          "You should receive information about the trades, either through SMS, email, or access to the trading platform",
        ],
      },
      {
        id: "contract-notes",
        subtitle: "1.3. Contract Notes, Statement of Accounts",
        points: [
          "You have the right to receive contract notes for trades executed within 24 hours of execution in the prescribed format",
          "You have the right to receive a complete Statement of Accounts for both funds and securities",
          "These should be provided to you periodically (quarterly if specified, or monthly if requested)",
        ],
      },
      {
        id: "tick-data",
        subtitle: "1.4. Tick-by-Tick Data",
        points: [
          "You have the right to receive the tick by tick data (detailed trade information) on payment basis as per the terms prescribed by the exchanges",
        ],
      },
      {
        id: "delay-rejection",
        subtitle: "1.5. Reasons for Delay/Rejection of Instructions",
        points: [
          "You have the right to know the reasons for delay, if any, in processing your order placement, modification, or cancellation requests",
          "You have the right to know the reasons for rejection of your instructions",
        ],
      },
      {
        id: "order-info",
        subtitle: "1.6. Information About Your Order/Transactions",
        points: [
          "You have the right to receive information about the status of your pending orders",
          "You have the right to receive daily oral or written confirmation of all transactions",
          "You have the right to receive detailed information about commissions, fees, and other charges levied on your transactions",
        ],
      },
      {
        id: "payment-receipt",
        subtitle: "1.7. Receipt of Payment/Securities",
        points: [
          "You have the right to receive funds and/or securities as per the settlement schedule",
          "Payout of funds or securities should be made to you within one working day from the receipt of payout from the exchange",
        ],
      },
      {
        id: "running-statement",
        subtitle: "1.8. Statement for Running Account Settlement",
        points: [
          "You have the right to receive statement of accounts with information about funds and securities retained by Sapphire Broking",
          "This statement should be provided when funds/securities are retained with Sapphire Broking at the time of settlement",
        ],
      },
      {
        id: "margin-statements",
        subtitle: "1.9. Receive Margin Statements",
        points: [
          "You have the right to receive margin statements with details about margin collected, utilized, and maintained on your behalf",
          "This information can be provided daily through trading platforms or through other communications",
        ],
      },
      {
        id: "order-execution",
        subtitle: "1.10. Order Execution Information",
        points: [
          "You have the right to receive information about order execution policies of Sapphire Broking",
          "You have the right to receive information about margin collection policies and related aspects",
        ],
      },
    ],
  },
  {
    id: "right-to-services",
    title: "2. RIGHT TO SERVICES",
    sections: [
      {
        id: "execution-trades",
        subtitle: "2.1. Execution of Trades",
        points: [
          "You have the right to receive service related to execution of trades in a fair, equitable, and timely manner",
          "Orders placed by you should be executed in accordance with the instructions given and at the best available price",
        ],
      },
      {
        id: "grievance-redressal",
        subtitle: "2.2. Investor Grievance Redressal",
        points: [
          "You have the right to timely redressal of your grievances through the designated complaint handling and redressal mechanism",
          "You have the right to receive a proper reply within the specified timelines for any complaints lodged",
          "Escalation matrix for grievances should be made available to you",
        ],
      },
      {
        id: "protection-funds",
        subtitle: "2.3. Protection of Funds and Securities",
        points: [
          "You have the right to protection of your funds and securities from misuse by brokers/employees of Sapphire Broking",
          "Your funds and securities should be segregated from Sapphire Broking's own funds and securities",
          "Your assets should be protected from misappropriation",
        ],
      },
      {
        id: "guidance",
        subtitle: "2.4. Guidance",
        points: [
          "You have the right to ask for guidance from Sapphire Broking to properly use the trading platforms",
          "You have the right to receive guidance regarding the rights and obligations in the stock market",
        ],
      },
      {
        id: "pre-trade",
        subtitle: "2.5. Pre-Trade Verification",
        points: [
          "You have the right to pre-trade verification explicitly mentioning available limits, including cash and margin limits",
          "This information should be available to you before executing trades",
        ],
      },
    ],
  },
  {
    id: "right-to-information",
    title: "3. RIGHT TO INFORMATION",
    sections: [
      {
        id: "risk-profile",
        subtitle: "3.1. Risk Profile",
        points: [
          "You have the right to be informed about your risk profile and the categorization as a client",
          "You have the right to be educated about the implications of your risk categorization",
        ],
      },
      {
        id: "privacy-protection",
        subtitle: "3.2. Protection of Privacy",
        points: [
          "You have the right to ensure privacy of your information",
          "Your personal information should not be shared with any third party without your explicit consent, except where required by law",
        ],
      },
      {
        id: "confidentiality",
        subtitle: "3.3. Confidentiality",
        points: [
          "You have the right to expect confidentiality of information shared with Sapphire Broking",
          "Information should be used only for the purpose for which it is submitted",
        ],
      },
      {
        id: "market-updates",
        subtitle: "3.4. Updates on Market Information",
        points: [
          "You have the right to receive information about significant market developments that may affect your investment decisions",
          "This information may include circulars, clarifications, and notices issued by exchanges and regulators",
        ],
      },
      {
        id: "compliance-details",
        subtitle: "3.5. Compliance Officer Details",
        points: [
          "You have the right to receive the contact details of the Compliance Officer of Sapphire Broking",
          "The compliance officer is responsible for ensuring adherence to rules and regulations",
        ],
      },
    ],
  },
  {
    id: "right-to-modification",
    title: "4. RIGHT TO MODIFICATION / CLOSURE",
    sections: [
      {
        id: "client-details",
        subtitle: "4.1. Modification of Client Details",
        points: [
          "You have the right to modify your client details in the trading system, as and when required",
          "Sapphire Broking must process legitimate modification requests within a reasonable timeframe",
        ],
      },
      {
        id: "account-closure",
        subtitle: "4.2. Account Closure",
        points: [
          "You have the right to close your account with Sapphire Broking at any time",
          "Account closure should be processed within a reasonable timeframe, subject to fulfillment of requisite formalities",
          "You have the right to receive any credit balance in your account after adjusting for applicable charges and dues",
          "All valid securities should be transferred to your designated demat account",
        ],
      },
      {
        id: "voluntary-clauses",
        subtitle: "4.3. Amendment to Voluntary Clauses",
        points: [
          "You have the right to amend the voluntary clauses in the agreement, with mutual consent",
        ],
      },
    ],
  },
  {
    id: "right-to-choose",
    title: "5. RIGHT TO CHOOSE",
    sections: [
      {
        id: "digital-services",
        subtitle: "5.1. Availing Services Digitally",
        points: [
          "You have the right to choose to avail services from Sapphire Broking in a physical or digital mode",
          "Digital services include electronic contract notes and digital KYC process",
        ],
      },
      {
        id: "running-settlement",
        subtitle: "5.2. Running Account Settlement",
        points: [
          "You have the right to choose the frequency of settlement of the running account of funds and securities",
          "Options include monthly or quarterly settlement",
          "You can opt out of running account settlement and request settlement after every trade",
        ],
      },
      {
        id: "trade-info",
        subtitle: "5.3. Receiving Trade Info on Mobile/Email",
        points: [
          "You have the right to choose to receive trade confirmations, statements, and other information on your mobile phone or email",
          "You can choose the mode of delivery for contract notes, statements, and other documents",
        ],
      },
      {
        id: "broker-choice",
        subtitle: "5.4. Choosing Broker",
        points: [
          "You have the right to choose your broker of choice",
          "You are not obligated to continue with Sapphire Broking if you are not satisfied with the services",
        ],
      },
      {
        id: "segments",
        subtitle: "5.5. Selecting Trading Segments",
        points: [
          "You have the right to choose the trading segments in which you wish to trade",
          "You can add or remove trading segments according to your investment preferences",
        ],
      },
      {
        id: "poa",
        subtitle: "5.6. Use of POA (Power of Attorney)",
        points: [
          "POA is not mandatory for opening a trading account with Sapphire Broking",
          "You have the right to revoke any POA given to Sapphire Broking at any time",
          "POA should not be insisted upon as a condition for opening an account",
        ],
      },
      {
        id: "nomination",
        subtitle: "5.7. Nomination Facility",
        points: [
          "You have the right to register a nomination for your trading and demat account",
          "You can change this nomination at any time during the existence of the account",
        ],
      },
    ],
  },
  {
    id: "right-to-fair-treatment",
    title: "6. RIGHT TO FAIR AND TRANSPARENT DEALING",
    sections: [
      {
        id: "clear-communication",
        subtitle: "6.1. Clear Communication",
        points: [
          "You have the right to receive clear and transparent communication from Sapphire Broking",
          "All charges, fees, and other costs should be clearly communicated to you upfront",
        ],
      },
      {
        id: "no-restrictive",
        subtitle: "6.2. No Restrictive Practices",
        points: [
          "You should not be subjected to unfair, discriminatory, or restrictive practices, such as:",
          "Forced bundling of products/services",
          "Unreasonable or hidden charges",
          "Misleading representations or marketing practices",
        ],
      },
      {
        id: "fair-treatment",
        subtitle: "6.3. Fair Treatment",
        points: [
          "You have the right to fair and equitable treatment, without any bias or prejudice",
          "All services and facilities should be extended without discrimination",
        ],
      },
    ],
  },
  {
    id: "special-rights",
    title: "7. SPECIAL RIGHTS",
    sections: [
      {
        id: "special-categories",
        subtitle:
          "7.1. Rights for Senior Citizens and Persons with Disabilities",
        points: [
          "If you are a senior citizen or a person with disability, you are entitled to certain additional facilities and considerations",
          "These include priority service at branches, doorstep banking, special assistance for using digital services, etc.",
        ],
      },
      {
        id: "incapacitation",
        subtitle: "7.2. Rights in Case of Sudden Incapacitation",
        points: [
          "You have the right to make a nomination to protect the interests of your legal heirs in case of any sudden incapacitation",
          "Clear processes should be in place to handle accounts in case of such events",
        ],
      },
      {
        id: "remote-areas",
        subtitle: "7.3. Rights for Investors in Remote Areas",
        points: [
          "If you are in remote or less developed areas, you have the right to adequate and appropriate services",
          "Alternative methods of service delivery should be available",
        ],
      },
    ],
  },
  {
    id: "responsibilities",
    title: "8. RESPONSIBILITIES OF INVESTORS",
    sections: [
      {
        id: "stay-informed",
        subtitle: "8.1. Stay Informed",
        points: [
          "Keep yourself updated about market developments, regulatory changes, and notices",
          "Read all communications sent by Sapphire Broking, exchanges, and regulators",
        ],
      },
      {
        id: "accurate-info",
        subtitle: "8.2. Provide Accurate Information",
        points: [
          "Provide complete and accurate information during account opening and KYC process",
          "Update your personal and financial information promptly when there are changes",
        ],
      },
      {
        id: "understand-risks",
        subtitle: "8.3. Understand Risks",
        points: [
          "Read and understand the Risk Disclosure Document and all other account opening documents",
          "Be aware of the risks associated with trading and investing in securities markets",
        ],
      },
      {
        id: "trade-responsibly",
        subtitle: "8.4. Trade Responsibly",
        points: [
          "Trade within your financial capacity and risk tolerance",
          "Do not engage in manipulative or fraudulent trading practices",
        ],
      },
      {
        id: "safeguard-account",
        subtitle: "8.5. Safeguard Your Account",
        points: [
          "Keep your account details, passwords, and PINs confidential",
          "Monitor your account regularly for any unauthorized activities",
        ],
      },
      {
        id: "fulfill-obligations",
        subtitle: "8.6. Fulfill Obligations",
        points: [
          "Meet all payment and delivery obligations on time",
          "Maintain the required margins for trading",
        ],
      },
      {
        id: "report-grievances",
        subtitle: "8.7. Report Grievances",
        points: [
          "Report any grievances or issues promptly through proper channels",
          "Provide all relevant information and documents when filing a complaint",
        ],
      },
    ],
  },
];

// Rights section component
const RightSection: React.FC<{
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
const RightsOfInvestors: React.FC = () => {
  return (
    <div className="max-w-4xl py-40 mx-auto p-6 bg-white">
      <h1 className="text-6xl font-bold text-green-heading mb-8 uppercase text-center">
        Rights of Investors
      </h1>

      <p className="text-gray-500 mb-14 text-center">SAPPHIRE BROKING</p>

      <div className="space-y-10">


        {/* Quick Access - Moved here from bottom */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-green-heading mb-4">
            Quick Access to Your Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rightsData.map((rightCategory) => (
              <a
                key={rightCategory.id}
                href={`#${rightCategory.id}`}
                className="p-4 flex justify-center items-center bg-white rounded-md shadow-sm hover:shadow border border-gray-200 text-center"
              >
                <h3 className="text-green-heading font-medium">
                  {rightCategory.title.split(".")[1].trim()}
                </h3>
              </a>
            ))}
          </div>
        </section>

        {/* Rights Content */}
        <div className="space-y-8">
          {rightsData.map((rightCategory) => (
            <section
              key={rightCategory.id}
              className="p-6 border border-gray-200 rounded-lg shadow-sm"
            >
              <h2
                id={rightCategory.id}
                className="text-2xl font-semibold text-green-heading mb-6"
              >
                {rightCategory.title}
              </h2>

              <div className="space-y-6">
                {rightCategory.sections.map((section) => (
                  <RightSection
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
              This document outlines your rights as an investor with Sapphire
              Broking. Always remember that with rights come responsibilities.
              Being a responsible investor not only protects your interests but
              also contributes to maintaining market integrity.
            </p>
            <p>
              For more information or clarification on your rights, please
              contact Sapphire Broking's customer service at:
            </p>
            <ul className="list-none pl-6 space-y-2">
              <li>
                <span className="font-medium">Email:</span>{" "}
                support@sapphirebroking.com
              </li>
              <li>
                <span className="font-medium">Phone:</span> [Customer Support
                Number]
              </li>
              <li>
                <span className="font-medium">Address:</span> [Sapphire Broking
                Address]
              </li>
            </ul>
          </div>
        </section>

        <div className="text-gray-500 text-center mt-8">
          <p>Last Updated: April 1, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default RightsOfInvestors;
