import { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account Closure | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Complete guide for closing your trading account with Sapphire Broking. Learn about the account closure process, required documents, timeline, and important considerations before closing your account.",
  keywords:
    "account closure, close trading account, demat account closure, trading account termination, account closure process, SEBI account closure, broker account closure, investment account closure, trading account cancellation, account closure documents, account closure timeline, account closure charges, account closure procedure",
  openGraph: {
    title: "Account Closure | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Complete guide for closing your trading account with Sapphire Broking. Learn about the account closure process, required documents, timeline, and important considerations before closing your account.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

const accountClosureData = [
  {
    id: "closure-overview",
    title: "1. ACCOUNT CLOSURE OVERVIEW",
    sections: [
      {
        id: "closure-types",
        subtitle: "1.1. Types of Account Closure",
        points: [
          "Voluntary closure initiated by the client for personal reasons.",
          "Inactive account closure due to prolonged non-usage as per SEBI guidelines.",
          "Regulatory closure due to non-compliance with KYC or other requirements.",
          "Deceased account closure following proper legal procedures.",
          "Migration closure when transferring to another broker.",
        ],
      },
      {
        id: "closure-timeline",
        subtitle: "1.2. Account Closure Timeline",
        points: [
          "Standard closure process takes 15-30 working days from request submission.",
          "Complex cases involving pending settlements may take 45-60 working days.",
          "Deceased account closures may take longer due to legal documentation requirements.",
          "Timeline depends on completion of all pending transactions and settlements.",
          "Final confirmation will be provided once closure is completed successfully.",
        ],
      },
      {
        id: "closure-impact",
        subtitle: "1.3. Impact of Account Closure",
        points: [
          "All trading activities will be permanently suspended upon closure initiation.",
          "Access to trading platforms and research reports will be terminated.",
          "Portfolio statements and transaction history will be provided for records.",
          "Tax statements and other documents will be generated for the closure period.",
          "Re-opening the same account will require fresh application and KYC process.",
        ],
      },
    ],
  },
  {
    id: "pre-closure-requirements",
    title: "2. PRE-CLOSURE REQUIREMENTS",
    sections: [
      {
        id: "position-settlement",
        subtitle: "2.1. Position Settlement",
        points: [
          "Close all open equity positions before initiating closure request.",
          "Square off all derivative positions including futures and options.",
          "Settle all commodity positions and clear any pending obligations.",
          "Ensure no pending buy or sell orders in the system.",
          "Complete all SIP/STP transactions and cancel future installments.",
        ],
      },
      {
        id: "fund-settlement",
        subtitle: "2.2. Fund Settlement",
        points: [
          "Withdraw all available cash balances from trading account.",
          "Clear all outstanding dues, penalties, or charges.",
          "Settle margin shortfalls and pay any interest on borrowed funds.",
          "Ensure no pending fund transfers or payment gateway transactions.",
          "Verify that all dividends and corporate action benefits are credited.",
        ],
      },
      {
        id: "document-collection",
        subtitle: "2.3. Document Collection",
        points: [
          "Download and save all required statements and transaction reports.",
          "Collect annual tax statements and capital gains reports.",
          "Obtain contract notes for all executed transactions.",
          "Save portfolio statements and holding summaries.",
          "Backup any research reports or advisory recommendations if needed.",
        ],
      },
    ],
  },
  {
    id: "closure-process",
    title: "3. ACCOUNT CLOSURE PROCESS",
    sections: [
      {
        id: "online-request",
        subtitle: "3.1. Online Closure Request",
        points: [
          "Log in to your Sapphire Broking account and navigate to account settings.",
          "Fill out the online account closure request form completely.",
          "Provide reason for closure and any feedback about our services.",
          "Upload required documents and submit the closure request.",
          "You will receive confirmation email with closure request reference number.",
        ],
      },
      {
        id: "offline-request",
        subtitle: "3.2. Offline Closure Request",
        points: [
          "Download account closure form from our website or collect from branch.",
          "Fill the form completely with accurate information and signatures.",
          "Attach all required documents and submit to nearest branch office.",
          "Alternatively, send the documents via registered post to our head office.",
          "Retain acknowledgment receipt for your records and follow-up.",
        ],
      },
      {
        id: "verification-process",
        subtitle: "3.3. Verification and Processing",
        points: [
          "Our team will verify all submitted documents and information.",
          "Account reconciliation will be performed to ensure clean closure.",
          "Any discrepancies or pending items will be communicated to you.",
          "Final approval will be processed after all requirements are met.",
          "Closure confirmation will be sent via email and registered post.",
        ],
      },
    ],
  },
  {
    id: "required-documents",
    title: "4. REQUIRED DOCUMENTS",
    sections: [
      {
        id: "mandatory-documents",
        subtitle: "4.1. Mandatory Documents",
        isTable: true,
        tableData: [
          {
            document: "Account Closure Form",
            description: "Duly filled and signed closure request form",
            requirement: "Original"
          },
          {
            document: "Client Master Report",
            description: "Latest client master report from DP",
            requirement: "Copy"
          },
          {
            document: "Identity Proof",
            description: "Copy of PAN card, Aadhaar, or passport",
            requirement: "Copy"
          },
          {
            document: "Address Proof",
            description: "Latest utility bill or bank statement",
            requirement: "Copy"
          },
          {
            document: "Bank Statement",
            description: "Last 3 months bank statement",
            requirement: "Copy"
          },
          {
            document: "Cancelled Cheque",
            description: "Cancelled cheque of registered bank account",
            requirement: "Original"
          }
        ],
      },
      {
        id: "additional-documents",
        subtitle: "4.2. Additional Documents (If Applicable)",
        points: [
          "Power of Attorney cancellation letter if PoA was granted.",
          "Legal heir certificates and succession documents for deceased accounts.",
          "No Objection Certificate from co-holders for joint accounts.",
          "Corporate resolution and board approval for corporate accounts.",
          "Court orders or legal documents if account is under litigation.",
        ],
      },
      {
        id: "document-guidelines",
        subtitle: "4.3. Document Guidelines",
        points: [
          "All documents should be clear, legible, and properly signed.",
          "Self-attested copies are acceptable unless originals are specifically required.",
          "Documents should be recent and within validity period.",
          "Foreign documents may require apostille or consular authentication.",
          "Digital signatures are accepted for online submissions.",
        ],
      },
    ],
  },
  {
    id: "charges-fees",
    title: "5. CHARGES AND FEES",
    sections: [
      {
        id: "outstanding-dues",
        subtitle: "5.1. Outstanding Dues Settlement",
        points: [
          "All outstanding brokerage and charges must be settled before closure.",
          "Interest on margin funding or MTF positions needs to be paid.",
          "Penalty charges for any regulatory violations must be cleared.",
          "Annual maintenance charges (AMC) will be prorated till closure date.",
          "Any refundable security deposits will be processed after final settlement.",
        ],
      },
      {
        id: "refund-process",
        subtitle: "5.2. Refund Process",
        points: [
          "Excess funds will be refunded to registered bank account only.",
          "Refund processing takes 7-10 working days after closure completion.",
          "Security deposits will be refunded after adjusting outstanding dues.",
          "Interest accrued on positive balances will be calculated till closure date.",
          "Refund advice will be sent via email with transaction details.",
        ],
      },
    ],
  },
  {
    id: "special-scenarios",
    title: "6. SPECIAL SCENARIOS",
    sections: [
      {
        id: "deceased-closure",
        subtitle: "6.1. Deceased Account Closure",
        points: [
          "Legal heirs must provide death certificate and succession documents.",
          "Nomination details on record will be verified for claim processing.",
          "Court succession certificate may be required for high-value accounts.",
          "Joint account holders can claim assets as per account mandate.",
          "All pending transactions will be settled as per legal guidelines.",
        ],
      },
      {
        id: "nri-closure",
        subtitle: "6.2. NRI Account Closure",
        points: [
          "NRI status verification and current residential proof required.",
          "Repatriation permissions and foreign exchange regulations compliance.",
          "Tax clearance certificates may be required for fund transfers.",
          "FEMA compliance documentation for international fund transfers.",
          "Embassy attestation may be required for overseas residential proof.",
        ],
      },
      {
        id: "corporate-closure",
        subtitle: "6.3. Corporate Account Closure",
        points: [
          "Board resolution authorizing account closure required.",
          "Updated MOA/AOA and certificate of incorporation needed.",
          "Authorized signatory verification and specimen signatures.",
          "Compliance with corporate governance and audit requirements.",
          "Tax clearance and no-objection certificates from relevant authorities.",
        ],
      },
    ],
  },
  {
    id: "post-closure",
    title: "7. POST-CLOSURE PROCEDURES",
    sections: [
      {
        id: "confirmation-delivery",
        subtitle: "7.1. Closure Confirmation",
        points: [
          "Closure confirmation letter will be sent to registered address.",
          "Email confirmation with closure details and final statement.",
          "All account numbers and client codes will be deactivated.",
          "System access will be permanently disabled for security.",
          "Client records will be archived as per regulatory requirements.",
        ],
      },
      {
        id: "data-retention",
        subtitle: "7.2. Data Retention and Privacy",
        points: [
          "Client data will be retained as per SEBI and legal requirements.",
          "Personal information will be kept confidential and secure.",
          "Records retention period is minimum 8 years from closure date.",
          "Data access will be provided for legal or regulatory requirements only.",
          "Client can request data deletion after mandatory retention period.",
        ],
      },
      {
        id: "reopening-process",
        subtitle: "7.3. Account Reopening",
        points: [
          "New account opening process will be required for reopening.",
          "Fresh KYC documentation and verification will be mandatory.",
          "Previous transaction history will not be accessible in new account.",
          "Earlier client code and account numbers cannot be reused.",
          "Waiting period of 30 days applies before reopening same type of account.",
        ],
      },
    ],
  },
];

// Section component (same as other pages)
type ClosureSectionProps = {
  subtitle: string;
  points?: string[];
  isTable?: boolean;
  tableData?: {
    [key: string]: string;
  }[];
};

const ClosureSection: React.FC<ClosureSectionProps> = ({ subtitle, points, isTable, tableData }) => {
  if (isTable && tableData) {
    const headers = Object.keys(tableData[0] || {});
    
    return (
      <div className="mb-6 ml-8">
        <h3 className="text-xl font-medium text-green-heading mb-3">
          {subtitle}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-4 py-3 text-left text-sm font-medium text-green-heading border-b border-gray-300">
                    {header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {headers.map((header) => (
                    <td key={header} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      {row[header]}
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
const AccountClosure = () => {
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
            <span className="text-[#064D51] font-regular">Account Closure</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <h1 className="text-4xl sm:text-6xl font-bold text-green-heading mb-8 uppercase text-center">
          Account Closure
        </h1>

        <p className="text-gray-500 mb-14 text-center">
          Complete guide for closing your trading and demat account with Sapphire Broking.
        </p>

        <div className="space-y-10">
          <hr />
          
          {/* Introduction */}
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
            <div className="space-y-4 text-gray-500">
              <p>
                <strong className="text-green-heading">Important Notice:</strong> Account closure is a permanent action 
                that will terminate all your trading and investment services with Sapphire Broking. Please ensure you 
                have completed all necessary steps before initiating the closure process.
              </p>
              <p>
                We recommend carefully reviewing your investment portfolio, settling all pending transactions, 
                and downloading important documents before proceeding with account closure.
              </p>
              <p>
                <strong className="text-amber-600">Note:</strong> Once an account is closed, the same account numbers 
                cannot be reactivated. A fresh account opening process will be required if you wish to resume trading.
              </p>
            </div>
          </div>

          {/* Pre-closure Checklist */}
          <div className="p-6 border border-amber-200 bg-amber-50 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">
              Pre-Closure Checklist
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled />
                <span>All open positions have been closed and settled</span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled />
                <span>All pending orders have been cancelled</span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled />
                <span>Available funds have been withdrawn</span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled />
                <span>All outstanding dues have been cleared</span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled />
                <span>Important documents and statements have been downloaded</span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled />
                <span>Tax statements and reports have been collected</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {accountClosureData.map((category) => (
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
                    <ClosureSection
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

          {/* Important Warning */}
          <section className="p-6 border border-red-200 bg-red-50 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Final Warning
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Irreversible Action:</strong> Account closure is permanent and cannot be undone. 
                All trading privileges, research access, and platform features will be permanently terminated.
              </p>
              <p>
                <strong>Data Loss:</strong> Historical data, watchlists, and personalized settings will be 
                permanently deleted and cannot be recovered.
              </p>
              <p>
                <strong>Reopening Requirements:</strong> If you wish to trade again in the future, you will 
                need to complete a fresh account opening process with new documentation.
              </p>
              <p>
                <strong>Alternative Solutions:</strong> Consider account suspension or reduced services instead 
                of permanent closure if you may return to trading in the future.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-green-heading mb-4">
              Contact Information
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                For account closure assistance or to discuss alternatives, please contact our dedicated team:
              </p>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-green-heading mb-2">
                  Account Closure Support
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
                      closure@sapphirebroking.com
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
                      <span className="font-medium">Phone:</span> [Account Closure Support Number]
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
                      <span className="font-medium">Office Hours:</span> Monday to Friday, 9:00 AM to 6:00 PM
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="text-gray-500 text-center mt-8 pb-12">
            <p>Last Updated: July 14, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountClosure;