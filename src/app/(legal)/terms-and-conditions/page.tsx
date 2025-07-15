/* eslint-disable */
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Essential information about the rights of investors to make informed and responsible decisions.",
  keywords:
    "terms and conditions, trading rights, responsible investing, sapphire broking",
  openGraph: {
    title: "Terms and Conditions | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Essential information about the rights of investors to make informed and responsible decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 px-8">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-3">
          <nav className="flex items-center text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-[#064D51] transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">›</span>
            <Link href="/" className="text-gray-500 hover:text-[#064D51] transition-colors">Legal</Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-[#064D51] font-regular">Terms and Conditions</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <h1 className="text-4xl sm:text-6xl font-bold text-green-heading mb-8 uppercase text-center pt-6">
          TERMS & CONDITIONS
        </h1>

        <p className="text-gray-500 mb-14 text-center">
          Understand our platform's terms, policies, and user responsibilities for
          secure trading.
        </p>

        <div className="space-y-8">
           <hr />
          <div className="text-gray-500">
            <p className="mb-4">
              These Terms and Conditions ("Terms") constitute a legally binding
              agreement between you (hereinafter referred to as "User", "Client",
              "you" or "your") and Sapphire Broking (hereinafter referred to as
              "Sapphire", "we", "us" or "our"), a stock broker registered with the
              Securities and Exchange Board of India (SEBI).
            </p>
            <p className="mb-4">
              These Terms govern your access to and use of the Sapphire Terminal
              mobile application and website (collectively referred to as "Platform") and
              the services offered therein. By registering on or using our
              Platform, you agree to be bound by these Terms.
            </p>
            <p className="mb-4">
              Sapphire broking is registered under The Indian Partnership Act, 1932 (ACT NO. IX of 1932) भारतीय भागीदारी अिधिनयम, १९३२  ( सन १९३२ चा अिधिनयम  मांक ९ ) with registration no. NG000010895 with its registered head office at  First Floor, East Side (Front), Plot No. 84A, Kh No. 72 & 73, Mouza Khamla, Ward No. 75, Pande Layout, New Sneh Nagar, Nagpur, Maharashtra , 440015. India.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              1. DEFINITIONS
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>
                "Account" refers to the trading and demat account opened with
                Sapphire.
              </li>
              <li>
                "Applicable Laws" means all applicable statutes, laws, ordinances,
                rules, regulations, judgments, injunctions, orders, decrees,
                by-laws, and regulatory policies, guidelines, licensing
                requirements of any relevant jurisdiction, as amended from time to
                time.
              </li>
              <li>
                "Exchange" means any stock exchange registered under the
                Securities Contracts (Regulation) Act, 1956.
              </li>
              <li>
                "KYC" means Know Your Customer procedures as prescribed by SEBI
                and other regulatory authorities.
              </li>
              <li>
                "Sapphire Terminal" refers to the trading mobile application and website provided by
                Sapphire Broking for executing trades on various exchanges.
              </li>
              <li>"SEBI" means the Securities and Exchange Board of India.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              2. ELIGIBILITY AND ACCOUNT REGISTRATION
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                2.1. To register and maintain an Account with Sapphire, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Be at least 18 years of age (Not in case of minor account opening)</li>
                <li>Be a resident of India (Not in case of NRI account)</li>
                <li>Possess a valid Permanent Account Number (PAN)</li>
                <li>Complete the KYC process as per regulatory requirements</li>
                <li>
                  Provide accurate, current, and complete information during the
                  registration process
                </li>
                <li>
                  Have a valid bank account in your name with a bank approved by
                  Sapphire
                </li>
              </ul>
              <p>
                2.2. Sapphire reserves the right to refuse registration, suspend,
                or terminate your Account at its discretion without assigning any
                reason.
              </p>
              <p>
                2.3. You agree to promptly inform Sapphire of any changes to your
                registration information.
              </p>
              <p>
                2.4. Online account opening using Aadhaar is currently available only for residents of India opening individual accounts, where the person's mobile number is linked to the Aadhaar. This is not permissible for non-residents. However, for all types of non-individual accounts (such as HUFs, companies, LLPs, partnerships, etc.), we allow online account opening.
              </p>
              <p>
                2.5. In case of online account opening using Aadhaar, data will be fetched from the KYC database and cannot be edited.
              </p>
              <p>
                2.6. Any pickup of the required documentation pertaining to the account opening procedure is subject to the availability of our representatives at any particular time and location.
              </p>
              <p>
                2.7. You are solely responsible for maintaining the
                confidentiality of your Account credentials and for all activities
                that occur under your Account.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              3. SERVICE OFFERINGS
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                3.1. Sapphire provides the following services, subject to these
                Terms:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Trading facilities for securities on various Exchanges</li>
                <li>Research reports and market information</li>
                <li>Any other services as may be introduced from time to time</li>
              </ul>
              <p>
                3.2. Sapphire may, at its sole discretion, add, modify, or
                discontinue any services without prior notice.
              </p>
              <p>
                3.3. The services provided are subject to the rules, regulations,
                byelaws, and circulars of the respective Exchanges and SEBI.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              4. SAPPHIRE TERMINAL
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                4.1. Sapphire Terminal is provided on an "as is" and "as
                available" basis without any warranties.
              </p>
              <p>4.2. You agree that you will:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Use Sapphire Terminal only for lawful purposes</li>
                <li>
                  Not attempt to gain unauthorized access to any part of Sapphire
                  Terminal
                </li>
                <li>
                  Not upload or transmit any viruses, malware, or other malicious
                  code
                </li>
                <li>
                  Not modify, reverse engineer, or disassemble any part of
                  Sapphire Terminal
                </li>
              </ul>
              <p>
                4.3. Sapphire grants you a limited, non-exclusive,
                non-transferable, revocable license to use Sapphire Terminal.
              </p>
              <p>
                4.4. Sapphire reserves the right to restrict, suspend, or
                terminate your access to Sapphire Terminal without prior notice if
                you breach these Terms.
              </p>
              <p>
                4.5. Technical Requirements: You are responsible for maintaining
                compatible hardware and internet connectivity necessary to access
                and use Sapphire Terminal. Minimum system requirements will be
                specified on our website and may be updated from time to time.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              5. FEES AND CHARGES
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                5.1. You agree to pay all applicable fees and charges for the
                services as specified in the fee schedule available on our website
                Pricing or as communicated to you from time to time.
              </p>
              <p>5.2. Fees and charges may include, but are not limited to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Brokerage fees for trade execution</li>
                <li>
                  Statutory charges including Securities Transaction Tax (STT),
                  GST, stamp duty, etc.
                </li>
                <li>Annual maintenance charges for demat accounts</li>
                <li>Account opening charges</li>
                <li>Bank charges for fund transfers</li>
                <li>Any other charges as applicable</li>
              </ul>
              <p>
                5.3. Sapphire reserves the right to revise the fee structure at
                any time, and such revisions will be effective immediately upon
                posting on our website or notification through other communication
                channels.
              </p>
              <p>
                5.4. You authorize Sapphire to debit your trading account or
                linked bank account for all applicable fees and charges.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              6. MODIFICATIONS OF DETAILS
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                6.1. The Client declares that the modification information provided by them, is true to the best of their knowledge.
              </p>
              <p>
                6.2. The Client undertakes to inform M/s. Sapphire Broking of any discrepancies, changes, or incorrect information that they become aware of, immediately.
              </p>
              <p>
                6.3. The Client understands and accepts that in case any information provided for modifying bank account details is incorrect or misleading, they would be held liable for all such consequences/actions taken.
              </p>
              <p>
                6.4. The Client agrees that this change will affect the Trading and Demat account that they hold with M/s. Sapphire Broking.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              7. ORDERS AND EXECUTION
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>7.1. Orders placed through Sapphire Terminal are subject to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>
                  Availability of sufficient funds/securities in your Account
                </li>
                <li>Trading hours of the respective Exchanges</li>
                <li>Market conditions and liquidity</li>
                <li>System performance and availability</li>
              </ul>
              <p>
                7.2. The Client understands that all orders placed on the Platform shall be forwarded to the Exchange. In the event the order is placed during trading hours, it shall immediately be routed to and executed on the Exchange, subject to the availability of counterparties. The Client understands that Sapphire does not exercise control over the execution of any orders that have already been sent to the Exchange. Fulfilment of all orders is subject to the vagaries of the market.
              </p>
              <p>
                7.3. You acknowledge that there may be delays in order execution
                due to system issues, market volatility, or other factors beyond
                Sapphire's control.
              </p>
              <p>
                7.4. You shall be solely responsible for all orders placed through
                your Account, whether authorized by you or not.
              </p>
              <p>
                7.5. Sapphire reserves the right to refuse to process any order if
                it believes that the order may be in violation of any Applicable
                Laws or Exchange rules.
              </p>
              <p>
                7.6. Orders placed over the telephone will only be accepted if the client calls from their registered mobile number or sends a confirmation email from their registered email ID after verifying the details with a Sapphire employee during the same call. We reserve the right to deny order placement if these conditions are not met.
              </p>
              <p>
                7.7. In case of a market order placed on the Platform, the Client understands that the price received shall be the price at which the order is executed by the Exchange's computer system and that such price may be different from the prevailing price the security was trading at when the order was entered on the Platform.
              </p>
              <p>
                7.8. Sapphire cannot guarantee the cancellation or modification of an order pursuant to a Client's request to that effect. The order will be cancelled or modified only if the Client's request for cancellation or modification is received by the Exchange before it is executed. Market orders are usually subject to immediate execution.
              </p>
              <p>
                7.9. The Client shall not presume an order to have been executed, cancelled or modified until a confirmation from Sapphire is received. Sometimes, due to technical or administrative reasons, a confirmation may not be immediately transmitted to or received by a Client. Such delay does not imply that the order has been executed, cancelled or modified, unless Sapphire confirms so to the Client in writing.
              </p>
              <p>
                7.10. Sapphire may, from time to time impose or vary limitations on the orders or instructions the Client may place on the Platform. Such limitations include, but are not restricted to exposure limits, turnover limits, limits on the number, value and/or types of securities for which orders may be placed, scrips in respect of which orders can be placed, etc. The Client is aware that Sapphire may need to vary or increase such limitation, or impose new limitations altogether on an urgent basis, based on Sapphire's assessment of the risk involved and such other factors Sapphire may consider relevant. The Client understands and agrees that Sapphire may at any time, at its sole discretion and without prior notice, prohibit or restrict the Client's ability to place orders or trade in securities through Sapphire.
              </p>
              <p>
                7.11. The Client understands that Sapphire may be unable to inform the Client of any such variations, reductions or impositions in advance. The Client agrees that Sapphire shall not be liable to the Client for any losses resulting from such variations, reductions or impositions, or for the Client's inability to route any order through the Platform. The Client understands and agrees that Sapphire may at any time, at its sole discretion and without prior notice, prohibit or restrict the Client's ability to place orders or trade in any securities on the Platform.
              </p>
              <p>
                7.12. Sapphire may, at its sole discretion, reject any order on the Platform for any reason whatsoever, including but not limited to the non-availability of funds in the Client's trading account, non-availability of securities in the Client's Demat account, insufficient margin amounts, suspension of scrip- specific trading activities by or on an Exchange, and applicability of circuit breakers to a scrip for which orders have been placed. The Client agrees that in the event that an order is not accepted on the Platform for any reason, Sapphire shall have the right to treat such order as having lapsed.
              </p>
              <p>
                7.13. The Client understands that if, for any circumstance or for any reason, the markets close before the acceptance by the Exchange of any order, such order may be rejected. The Client further agrees that Sapphire may reject any orders that are being rejected by the Exchange. In case of rejection of an order due to rejection by the Exchange, the Client agrees that the order shall remain declined and shall not be reprocessed in any circumstance.
              </p>
              <p>
                7.14. Without prejudice to the provisions above, Sapphire may at its sole discretion permit the execution of any orders, irrespective of the balance amount in the Client's account. This may subsequently be recovered by Sapphire during settlement.
              </p>
              <p>
                7.15. Pending orders shall be handled as per exchange systems and norms after the market closes for the day.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              8. MARGIN REQUIREMENTS
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                8.1. The Client agrees to abide by the exposure limits, as set from time to time by Sapphire, the Exchange, the Clearing Corporation or SEBI.
              </p>
              <p>
                8.2. Sapphire may, at its discretion, set higher margin
                requirements than those prescribed by the Exchanges or SEBI.
              </p>
              <p>
                8.3. Without prejudice to any of Sapphire's other rights, Sapphire shall be entitled to liquidate or close out any or all of the Client's positions for non-payment of margins or outstanding debts. The proceeds of such liquidation or close outs, if any, shall be adjusted against the Client's liabilities and obligations. Any and all losses and financial charges on account of such liquidation or closing-out shall be charged to and borne by the Client.
              </p>
              <p>
                8.4. The Client authorises Sapphire to determine the market value of all securities placed as margin after applying a haircut that Sapphire may deem appropriate. The Client undertakes to monitor the market value of such securities on a continuous basis. The Client further undertakes to immediately replenish any shortfall in the value of the margin consequent to a fall in the market value of such securities placed as margin, whether or not Sapphire intimates the Client of such shortfall.
              </p>
              <p>
                8.5. The Client is aware that Sapphire is required to deposit sufficient margin with the Exchange to enable all its eligible clients to trade, subject to such limits as may be imposed. However, there may be times of extreme volatility wherein the deposits made by Sapphire with the Exchange may not be sufficient to cover the positions of all its Clients. In such circumstances, Sapphire's trading terminals may be temporarily suspended on account of the cumulative effect of shortfall of margin obligations by various Clients. In these circumstances, no Client shall have the right to claim any damages from Sapphire for any losses that they might incur on account of such suspension of trading.
              </p>
              <p>
                8.6. The Client agrees that any securities or cash placed as margin with Sapphire may in turn be placed as margin by Sapphire with the Exchanges, banks, clearing corporations or any other institutions that Sapphire may deem fit. The Client authorises Sapphire to do all such acts and deeds that may be necessary for placing such securities or cash with the Exchanges/banks/clearing corporations/other institutions as margins.
              </p>
              <p>
                8.7. Any reference in these Terms to sale or transfer of securities by Sapphire shall be deemed to include sale of securities that form part of the margin maintained by the Client with Sapphire. In exercise of Sapphire's right to sell securities under these Terms, the Client agrees that the choice of specific securities to be sold shall be solely at the discretion of Sapphire.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              9. RISKS OF ONLINE TRADING
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                9.1. You acknowledge that trading in securities involves risk of
                loss and is not suitable for all investors.
              </p>
              <p>
                9.2. You understand and accept the following risks associated with
                online trading through Sapphire Terminal:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Market volatility and price fluctuations</li>
                <li>
                  System failures, network issues, and connectivity problems
                </li>
                <li>Delays in order execution, modification, or cancellation</li>
                <li>Errors in displaying market data or order status</li>
                <li>Unauthorized access to your Account</li>
              </ul>
              <p>
                9.3. Sapphire shall not be liable for any losses arising from the
                risks mentioned above.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              10. RESEARCH AND MARKET INFORMATION
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                10.1. Any research reports, market analysis, investment ideas, or
                other information provided through Sapphire Terminal are for
                informational purposes only and do not constitute investment
                advice.
              </p>
              <p>
                10.2. Such information may be sourced from third parties, and
                Sapphire does not guarantee its accuracy, completeness, or
                timeliness.
              </p>
              <p>
                10.3. You should not rely solely on such information for making
                investment decisions and should conduct your own research.
              </p>
              <p>10.4. Past performance is not indicative of future results.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              11. INTELLECTUAL PROPERTY
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                11.1. All intellectual property rights in Sapphire Terminal,
                including but not limited to trademarks, logos, software, content,
                and design, are owned by Sapphire or its licensors.
              </p>
              <p>
                11.2. You are not granted any rights to use Sapphire's
                intellectual property except as expressly provided in these Terms.
              </p>
              <p>
                11.3. You shall not copy, modify, distribute, sell, or lease any
                part of Sapphire Terminal or its content without prior written
                consent from Sapphire.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              12. DATA PRIVACY AND SECURITY
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                12.1. Sapphire collects, processes, and stores your personal
                information in accordance with its Privacy Policy, which is
                incorporated by reference into these Terms.
              </p>
              <p>
                12.2. You consent to the collection, storage, processing, and
                disclosure of your personal information as described in the
                Privacy Policy.
              </p>
              <p>
                12.3. Sapphire implements reasonable security measures to protect
                your information but cannot guarantee absolute security.
              </p>
              <p>
                12.4. You acknowledge that internet transmissions are never
                completely private or secure, and any message or information you
                send using Sapphire Terminal may be read or intercepted by others.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              13. LIMITATION OF LIABILITY
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                13.1. To the maximum extent permitted by law, Sapphire shall not
                be liable for any direct, indirect, incidental, special,
                consequential, or exemplary damages, including but not limited to
                damages for loss of profits, goodwill, data, or other intangible
                losses.
              </p>
              <p>
                13.2. Sapphire shall not be liable for any damages arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Use or inability to use Sapphire Terminal</li>
                <li>
                  Unauthorized access to or alteration of your transmissions or
                  data
                </li>
                <li>
                  Statements or conduct of any third party on Sapphire Terminal
                </li>
                <li>System failures, network issues, or connectivity problems</li>
                <li>
                  Any other matter relating to Sapphire Terminal or the services
                </li>
              </ul>
              <p>
                13.3. Sapphire's total liability to you for any claim arising from
                or relating to these Terms or Sapphire Terminal shall not exceed
                the amount of fees paid by you to Sapphire during the three (3)
                months preceding the event giving rise to the claim.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              14. INDEMNIFICATION
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                14.1. You agree to indemnify, defend, and hold harmless Sapphire,
                its directors, officers, employees, agents, and affiliates from
                and against any claims, liabilities, damages, losses, costs,
                expenses, or fees (including reasonable attorneys' fees) arising
                from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of a third party</li>
                <li>Your use or misuse of Sapphire Terminal</li>
                <li>Your violation of any Applicable Laws or Exchange rules</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              15. TERMINATION
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                15.1. You may terminate your Account by providing written notice
                to Sapphire and fulfilling all outstanding obligations.
              </p>
              <p>
                15.2. Sapphire may terminate or suspend your Account and access to
                Sapphire Terminal at any time without notice if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>You breach these Terms</li>
                <li>You violate any Applicable Laws or Exchange rules</li>
                <li>You fail to provide information requested by Sapphire</li>
                <li>
                  Sapphire is required to do so by any regulatory authority or
                  court order
                </li>
                <li>
                  Sapphire has reason to believe that you are engaged in
                  fraudulent or illegal activities
                </li>
              </ul>
              <p>15.3. Upon termination:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                <li>You shall pay all outstanding fees and charges</li>
                <li>
                  You shall return or destroy all materials provided by Sapphire
                </li>
                <li>You shall cease all use of Sapphire Terminal</li>
                <li>
                  Sapphire shall settle your Account as per regulatory
                  requirements
                </li>
              </ul>
              <p>
                15.4. The provisions of these Terms that by their nature should
                survive termination shall survive termination, including but not
                limited to Sections 11, 12, 13, 14, and 19.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              16. FORCE MAJEURE
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                16.1. Sapphire shall not be liable for any failure or delay in
                performing its obligations under these Terms due to events beyond
                its reasonable control, including but not limited to natural
                disasters, acts of government, war, terrorism, riots, civil
                unrest, fire, explosion, flood, epidemic, pandemic, strikes, or
                other labor problems.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              17. AMENDMENTS
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                17.1. Sapphire reserves the right to modify or replace these Terms
                at any time without prior notice.
              </p>
              <p>
                17.2. The updated Terms will be posted on our website, and your
                continued use of Sapphire Terminal after such posting constitutes
                your acceptance of the modified Terms.
              </p>
              <p>
                17.3. It is your responsibility to review these Terms periodically
                for changes.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              18. GOVERNING LAW AND DISPUTE RESOLUTION
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                18.1. These Terms shall be governed by and construed in accordance
                with the laws of India.
              </p>
              <p>
                18.2. Any dispute, controversy, or claim arising out of or
                relating to these Terms shall be settled through arbitration in
                accordance with the Arbitration and Conciliation Act, 1996.
              </p>
              <p>
                18.3. The arbitration shall be conducted by a sole arbitrator
                appointed by Sapphire, and the arbitration proceedings shall be
                held in [City Name].
              </p>
              <p>18.4. The language of arbitration shall be English.</p>
              <p>
                18.5. The decision of the arbitrator shall be final and binding on
                both parties.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              19. GENERAL PROVISIONS
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                19.1. Entire Agreement: These Terms, together with the Privacy
                Policy and any other agreements or policies referenced herein,
                constitute the entire agreement between you and Sapphire regarding
                the subject matter hereof.
              </p>
              <p>
                19.2. Severability: If any provision of these Terms is held to be
                invalid or unenforceable, such provision shall be struck, and the
                remaining provisions shall be enforced.
              </p>
              <p>
                19.3. Waiver: The failure of Sapphire to enforce any right or
                provision of these Terms shall not be deemed a waiver of such
                right or provision.
              </p>
              <p>
                19.4. Assignment: You may not assign or transfer these Terms
                without the prior written consent of Sapphire. Sapphire may assign
                or transfer these Terms without your consent.
              </p>
              <p>
                19.5. Notices: Sapphire may provide notices to you via email,
                regular mail, or postings on our website or Sapphire Terminal. You
                may provide notices to Sapphire by contacting customer support.
              </p>
              <p>
                19.6. Relationship: Nothing in these Terms shall be construed as
                creating any agency, partnership, joint venture, employment, or
                fiduciary relationship between you and Sapphire.
              </p>
              <p>
                19.7. Third-Party Beneficiaries: These Terms do not confer any
                third-party beneficiary rights.
              </p>
              <p>
                19.8. Headings: The section titles in these Terms are for
                convenience only and have no legal or contractual effect.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-heading">
              20. CONTACT INFORMATION
            </h2>
            <div className="space-y-2 text-gray-500">
              <p>
                20.1. If you have any questions, concerns, or feedback regarding
                these Terms or Sapphire Terminal, please contact our customer
                support at:
              </p>
              <ul className="list-none space-y-1">
                <li>Email: support@sapphirebroking.com</li>
                <li>Phone: +91 98903 36989</li>
                <li>Address: Plot No. 84-A, Pande Layout, New Sneh Nagar, Khamla, Ward No. 75, Nagpur, Maharashtra – 440025</li>
              </ul>
            </div>
          </section>

          <div className="text-gray-500 italic mt-8">
            <p>
              Please note that the information contained herein is subject to
              change without notice.
            </p>
          </div>

          <div className="text-gray-500 text-center mt-8 pb-12">
            <p>Last Updated: July 15, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;