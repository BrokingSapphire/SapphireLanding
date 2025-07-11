/* eslint-disable */
import React from "react";
import Link from "next/link";
import { investorCharterData } from "@/components/legal/investorattention";
import { DosAndDontsTable } from "@/components/InvestorAttentionComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Do's and Don'ts | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Essential guidelines for investors to make informed and responsible decisions.",
  keywords:
    "investor dos and donts, trading guidelines, responsible investing, sapphire broking",
  openGraph: {
    title: "Investor Do's and Don'ts | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Essential guidelines for investors to make informed and responsible decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

const DosAndDonts: React.FC = () => {
  return (
    <div className="max-w-4xl py-40 mx-auto p-6 bg-white">
      <h1 className="text-4xl sm:text-6xl font-bold text-green-heading mb-8 uppercase text-center">
        Do's and Don'ts
      </h1>

      <p className="text-gray-500 mb-14 text-center">
        Follow essential guidelines to make informed, responsible, and ethical
        investment decisions.
      </p>

      <div className="space-y-10">
        <hr />
        {/* Main Content */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl uppercase font-semibold text-green-heading mb-6">
            Things you should take care of
          </h2>

          <p className="text-gray-500 mb-6">
            Following these guidelines will help ensure a safe and compliant
            trading experience. Please review these important do's and don'ts
            before engaging in any securities transactions.
          </p>

          <DosAndDontsTable
            dos={investorCharterData.dosAndDonts.dos}
            donts={investorCharterData.dosAndDonts.donts}
          />
        </section>

        {/* Expanded Do's Section with Categories */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-green-heading mb-6">
            Detailed Do's Explained
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-green-heading mb-3">
                Account Opening and Documentation
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>
                  Read all documents and terms & conditions carefully before
                  signing
                </li>
                <li>
                  Complete your KYC properly by providing all valid documents
                </li>
                <li>
                  Update your mobile number, email ID, and bank account details
                  regularly
                </li>
                <li>
                  Ensure that the broker's name, SEBI registration number, and
                  exchange logos are clearly visible on the contract notes
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-green-heading mb-3">
                Trading and Transaction Practices
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Issue cheques/fund transfers only in your own name</li>
                <li>
                  Verify your trade details on the contract note and raise
                  queries promptly
                </li>
                <li>
                  Deliver securities to your broker before the pay-in date
                </li>
                <li>Pay required margins on time</li>
                <li>
                  Cross-check confirmations of orders/trades from exchanges
                </li>
                <li>
                  Accept contract notes/confirmation of trades from your broker
                  only
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-green-heading mb-3">
                Security and Record Keeping
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Verify your demat transaction statement carefully</li>
                <li>
                  Check your financial and transaction details periodically on
                  the exchange website
                </li>
                <li>Insist on a proof of every payment made to the broker</li>
                <li>
                  Scrutinize minutely both the transaction confirmation and the
                  account statement
                </li>
                <li>
                  Keep a record of dates when you placed your investment orders
                </li>
                <li>Handle DIS Book issued by DP carefully</li>
                <li>
                  Ensure that the DIS numbers are pre-printed and account number
                  is mentioned on it
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Expanded Don'ts Section with Categories */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-green-heading mb-6">
            Detailed Don'ts Explained
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-green-heading mb-3">
                Security Risks to Avoid
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>
                  Do not share trading credentials or password with anyone
                </li>
                <li>
                  Do not sign blank Delivery Instruction Slips (DIS) while
                  meeting security deposit requirements
                </li>
                <li>
                  Do not share your internet trading account's password with
                  anyone
                </li>
                <li>
                  Do not opt for digital contracts if not familiar with
                  computers
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-green-heading mb-3">
                Transaction Risks to Avoid
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Do not deal with unregistered intermediaries</li>
                <li>
                  Do not enter into any agreements without proper understanding
                </li>
                <li>Do not accept unsigned/duplicate contract notes</li>
                <li>
                  Do not accept contract notes that are not as per the
                  prescribed format
                </li>
                <li>
                  Do not delay payment/deliveries of securities to the broker
                </li>
                <li>
                  Do not transfer funds to any account other than your broker's
                  official account
                </li>
                <li>Do not make payments in cash to the broker</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-green-heading mb-3">
                Investment Risks to Avoid
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>
                  Do not forget to take note of risks involved in the
                  investments
                </li>
                <li>Do not deal based on rumors or tips</li>
                <li>Do not fall prey to fixed/guaranteed returns schemes</li>
                <li>Do not invest based on SMS or email tips</li>
                <li>
                  Do not ignore any emails/SMSs received with regards to trades
                  done, from the exchanges
                </li>
                <li>
                  Do not introduce any other person for trading, settlement, and
                  fund transfer
                </li>
                <li>
                  Do not enter into any unusual arrangements such as payback
                  contracts or agreements
                </li>
                <li>
                  Do not deal through any unauthorized platforms or messaging
                  services for placing orders
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
          <h2 className="text-xl font-semibold text-green-heading mb-4">
            Need More Information?
          </h2>

          <p className="text-gray-500 mb-4">
            For any questions or clarifications regarding these guidelines,
            please contact our support team or visit our office.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="mr-3 p-2 rounded-full bg-green-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-heading"
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
              </div>
              <div>
                <p className="text-sm text-gray-500">Email us at</p>
                <p className="font-medium">support@sapphirebroking.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-3 p-2 rounded-full bg-green-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-heading"
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
              </div>
              <div>
                <p className="text-sm text-gray-500">Call us at</p>
                <p className="font-medium">[Customer Support Phone Number]</p>
              </div>
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

export default DosAndDonts;
