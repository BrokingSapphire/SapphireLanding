import { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fund Transfer | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
  keywords:
    "about sapphire broking, online trading platform India, stock market analysis tools, real-time market insights, professional trading recommendations, BSE NSE live updates, smart trading solutions, expert trading insights, stock market for beginners, advanced trading platform, corporate announcement tracker, investment decision tools, market intelligence platform, stock trading alerts India, seamless trade execution, next-gen trading platform, stock market education, technical analysis tools India, fundamental analysis platform, market trend analyzer, financial market insights, algorithmic trading India, trading platform comparison, best online broker India, intraday trading platform, portfolio management tools, stock screening tools India, equity research platform, investment analytics India, market data analysis, trading charts and indicators, mobile trading app India, derivatives trading platform, commodity trading solutions, forex trading tools India",
  openGraph: {
    title: "Fund Transfer | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

const bankAccountData = [
  {
    id: "fund-deposit",
    title: "1. FUND DEPOSIT",
    sections: [
      {
        id: "upi-transfer",
        subtitle: "1.1. UPI Transfer (Recommended)",
        points: [
          "Transfer funds instantly from your registered bank account using UPI for free.",
          "All UPI transfers must be initiated from the Sapphire Broking platform only.",
          "Digital wallet transfers or transfers directly from UPI apps are not accepted.",
          "Instant credit to your trading account with no additional charges.",
          "Maximum UPI transfer limit as per your bank's daily limit applies.",
        ],
      },
      {
        id: "payment-gateway",
        subtitle: "1.2. Instant Payment Gateway",
        points: [
          "Transfer funds instantly through net banking from supported banks.",
          "Service charge of ₹9 + 18% GST will be applicable for payment gateway transfers.",
          "Immediate credit to your trading account upon successful transaction.",
          "Secure encrypted payment processing through verified payment partners.",
          "All major banks and financial institutions are supported.",
        ],
      },
      {
        id: "bank-transfer",
        subtitle: "1.3. IMPS/NEFT/RTGS Transfer",
        points: [
          "Transfer funds from your registered bank account to Sapphire Broking bank account.",
          "IMPS transfers are credited within 10 minutes during banking hours.",
          "NEFT/RTGS transfers are credited within 2 hours during banking hours.",
          "No charges from Sapphire Broking, bank charges may apply as per your bank's policy.",
          "Ensure correct bank details are entered before initiating transfer.",
        ],
      },
    ],
  },
  {
    id: "bank-details",
    title: "2. SAPPHIRE BROKING BANK DETAILS",
    sections: [
      {
        id: "bank-details-table",
        subtitle: "2.1. Bank Account Details",
        isTable: true,
        tableData: [
          {
            segment: "Equity, F&O and Commodity",
            bankName: "ICICI Bank Limited",
            accountHolder: "SAPPHIRE BROKING",
            accountNumber: "777705760030",
            accountType: "Current Account",
            branch: "Civill Lines, Nagpur",
            ifscCode: "ICIC0000059"
          },
          {
            segment: "Alternate Account",
            bankName: "Bank of Baroda",
            accountHolder: "SAPPHIRE BROKING",
            accountNumber: "11980200000435",
            accountType: "Current Account",
            branch: "Arvi, Wardha",
            ifscCode: "BARB0ARVIXX"
          }
        ],
      },
      {
        id: "important-notes",
        subtitle: "2.2. Important Notes",
        points: [
          "Virtual Account Numbers contain only alphabets for Equity & Commodity segments.",
          "Add these accounts as payees in your net banking for quick transfers.",
          "Ensure correct account details are entered before initiating any transfer.",
          "Different accounts are maintained for Equity and Commodity as per SEBI regulations.",
          "Use alternate account details if primary accounts face any technical issues.",
        ],
      },
    ],
  },
  {
    id: "fund-withdrawal",
    title: "3. FUND WITHDRAWAL",
    sections: [
      {
        id: "withdrawal-process",
        subtitle: "3.1. Withdrawal Process",
        points: [
          "Fund withdrawal requests can be placed through the Sapphire Broking platform.",
          "Funds can only be withdrawn to your registered bank account.",
          "Same-day withdrawal is not permitted for funds transferred on the same day.",
          "Withdrawal requests are processed at specific cut-off times.",
          "Funds are typically credited within 24 hours of processing.",
        ],
      },
      {
        id: "withdrawal-timings",
        subtitle: "3.2. Withdrawal Cut-off Timings",
        points: [
          "Weekdays (Monday to Friday): Cut-off time is 10:00 PM for Equity & F&O",
          "Weekdays (Monday to Friday): Cut-off time is 11:59 PM for Commodity",
          "Saturday: Cut-off time is 4:30 PM for Equity & F&O, 4:00 PM for Commodity",
          "Sunday and Public Holidays: Processed on next working day",
          "Requests after cut-off time will be processed on the next working day.",
        ],
      },
      {
        id: "withdrawal-requirements",
        subtitle: "3.3. Withdrawal Requirements",
        points: [
          "Sufficient available balance required in your trading account.",
          "No pending obligations or dues should be outstanding.",
          "Bank account details must be verified and updated.",
          "Withdrawal amount should meet minimum threshold requirements.",
          "Valid KYC and documentation should be up to date.",
        ],
      },
    ],
  },
  {
    id: "transfer-methods",
    title: "4. TRANSFER METHODS COMPARISON",
    sections: [
      {
        id: "method-comparison",
        subtitle: "4.1. Transfer Methods & Timings",
        points: [
          "UPI Transfer: Instant credit, No charges, Available 24/7",
          "Payment Gateway: Instant credit, ₹9 + 18% GST, Net banking required",
          "IMPS: Within 10 minutes, No charges from our end, Bank charges may apply",
          "NEFT: Within 2 hours, No charges from our end, Bank charges may apply",
          "RTGS: Within 2 hours, No charges from our end, Bank charges may apply",
        ],
      },
    ],
  },
  {
    id: "important-guidelines",
    title: "5. IMPORTANT GUIDELINES",
    sections: [
      {
        id: "sebi-regulations",
        subtitle: "5.1. SEBI Regulations",
        points: [
          "Funds can only be transferred from your registered bank account.",
          "Third-party transfers are strictly prohibited as per SEBI regulations.",
          "Equity and Commodity account balances are maintained separately.",
          "Different bank accounts are used for Equity and Commodity segments.",
          "Regular reconciliation is performed to ensure fund safety.",
        ],
      },
      {
        id: "security-measures",
        subtitle: "5.2. Security Measures",
        points: [
          "All fund transfers are monitored for suspicious activities.",
          "Two-factor authentication required for withdrawal requests.",
          "Email and SMS notifications sent for all fund transactions.",
          "Real-time balance updates reflected in your account.",
          "Regular audit trails maintained for all financial transactions.",
        ],
      },
      {
        id: "restrictions",
        subtitle: "5.3. Transfer Restrictions",
        points: [
          "Cash deposits are not accepted at any of our bank accounts.",
          "Demand Draft (DD) deposits are not permitted.",
          "Transfers from NRI accounts require special documentation.",
          "Joint account transfers require all account holders' verification.",
          "Corporate account transfers need additional compliance checks.",
        ],
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "6. TROUBLESHOOTING",
    sections: [
      {
        id: "delayed-deposits",
        subtitle: "6.1. Delayed Deposits",
        points: [
          "Check if transfer was made from your registered bank account.",
          "Verify correct bank account details were used for transfer.",
          "Ensure transfer amount meets minimum threshold requirements.",
          "Contact your bank to confirm successful debit from your account.",
          "Allow additional time during bank holidays or technical maintenance.",
        ],
      },
      {
        id: "failed-withdrawals",
        subtitle: "6.2. Failed Withdrawals",
        points: [
          "Verify sufficient available balance in your trading account.",
          "Check if withdrawal request was placed within cut-off timings.",
          "Ensure registered bank account details are correct and updated.",
          "Confirm no pending obligations or margin requirements.",
          "Contact support if withdrawal is delayed beyond specified timeline.",
        ],
      },
      {
        id: "contact-support",
        subtitle: "6.3. Contact Support",
        points: [
          "Create a support ticket through the Sapphire Broking platform.",
          "Call our customer support during business hours.",
          "Email our fund transfer support team with transaction details.",
          "Visit the nearest Sapphire Broking branch for in-person assistance.",
          "Use live chat feature available on our website and mobile app.",
        ],
      },
    ],
  },
];

// Section component
type BankSectionProps = {
  subtitle: string;
  points?: string[];
  isTable?: boolean;
  tableData?: {
    segment: string;
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    accountType: string;
    branch: string;
    ifscCode: string;
  }[];
};

const BankSection: React.FC<BankSectionProps> = ({ subtitle, points, isTable, tableData }) => {
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
                <th className="px-4 py-3 text-left text-sm font-medium text-green-heading border-b border-gray-300">Segment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-green-heading border-b border-gray-300">Bank Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-green-heading border-b border-gray-300">Account Holder</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-green-heading border-b border-gray-300">Account Number</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-green-heading border-b border-gray-300">Account Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-green-heading border-b border-gray-300">Branch</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-green-heading border-b border-gray-300">IFSC Code</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tableData && tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200 font-medium">{row.segment}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">{row.bankName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">{row.accountHolder}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200 font-mono">{row.accountNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">{row.accountType}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">{row.branch}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200 font-mono">{row.ifscCode}</td>
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
const BankAccount = () => {
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
            <span className="text-[#064D51] font-regular">Fund Transfer</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <h1 className="text-4xl sm:text-6xl font-bold text-green-heading mb-8 uppercase text-center">
          Fund Transfer
        </h1>

        <p className="text-gray-500 mb-14 text-center">
          Complete guide for fund deposits, withdrawals, and bank account management.
        </p>

        <div className="space-y-10">
          <hr />
          
          {/* Introduction */}
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
            <div className="space-y-4 text-gray-500">
              <p>
                Manage your funds efficiently with Sapphire Broking&apos;s secure and convenient
                fund transfer system. Transfer funds only from your registered bank account
                to ensure compliance with SEBI regulations.
              </p>
              <p>
                We provide multiple options for fund deposits and withdrawals to make your 
                trading experience seamless and hassle-free.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {bankAccountData.map((category) => (
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
                    <BankSection
                      key={section.id}
                      subtitle={section.subtitle}
                      points={section.points}
                      isTable={section.isTable}
                      tableData={section.tableData}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Information */}
          <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-green-heading mb-4">
              Contact Information
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                For questions or issues related to fund transfers and bank accounts, please contact:
              </p>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-green-heading mb-2">
                  Fund Transfer Support
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
                      <span className="font-medium">Phone:</span> [Fund Transfer Support Number]
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="text-gray-500 text-center mt-8 pb-12">
            <p>Last Updated: June 26, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;