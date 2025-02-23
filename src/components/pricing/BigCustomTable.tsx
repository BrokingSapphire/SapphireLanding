import React from "react";

// interface TableHeaderProps {
//   children: React.ReactNode;
// }

// const TableHeader: React.FC<TableHeaderProps> = ({ children }) => (
//   <th className="bg-gray-100 px-4 py-2 text-left font-medium text-gray-700">{children}</th>
// );

// const TableCell: React.FC<TableHeaderProps> = ({ children }) => (
//   <td className="px-4 py-2 text-gray-600">{children}</td>
// );

const ChargesTable: React.FC = () => {
  const equityData = [
    {
      type: "Brokerage",
      equityDelivery: "₹0 brokerage upto ₹500 for first 30 days*\nThen lower of ₹20 or 0.1% per executed order, minimum ₹1",
      equityIntraday: "₹0 brokerage upto ₹500 for first 30 days*\nThen lower of ₹20 or 0.03%",
      equityFutures: "₹0 brokerage upto ₹500 for first 30 days*\nThen, ₹20 per executed order",
      equityOptions: "₹0 brokerage upto ₹500 for first 30 days*\nThen, ₹20 per executed order"
    },
    {
      type: "Transaction Charges",
      equityDelivery: "NSE: 0.00325%\nBSE: As Per The Stock Group",
      equityIntraday: "NSE: 0.00325%\nBSE: As Per The Stock Group",
      equityFutures: "NSE: 0.00171%\nBSE: 0",
      equityOptions: "NSE: \nIndex: ₹0/₹tick options 0.0005%\nStock: Index options 0.0345%"
    },
    {
      type: "Security Transaction Tax",
      equityDelivery: "0.1%",
      equityIntraday: "0.025%",
      equityFutures: "NSE: 0.01%\nBSE: 0.01%",
      equityOptions: "NSE: 0.1%\nBSE: 0.1%"
    },
    {
      type: "IPFT",
      equityDelivery: "NSE: 0.0001%",
      equityIntraday: "NSE: 0.0001%",
      equityFutures: "NSE: 0.0001%",
      equityOptions: "NSE: 0.0001%"
    },
    {
      type: "GST",
      equityDelivery: "18%",
      equityIntraday: "18%",
      equityFutures: "18%",
      equityOptions: "18%"
    },
    {
      type: "Stamp Duty Charges",
      equityDelivery: "0.015%",
      equityIntraday: "0.003%",
      equityFutures: "NSE: 0.01%\nBSE: 0.01%",
      equityOptions: "NSE: 0.005%\nBSE: 0.005%"
    },
    {
      type: "SEBI Charges",
      equityDelivery: "₹ 10 / crore",
      equityIntraday: "₹ 10 / crore",
      equityFutures: "₹ 10 / crore",
      equityOptions: "₹ 10 / crore"
    }
  ];

  const accountOpeningData = [
    { type: "Individual Account", charges: "₹99/-" },
    { type: "Company Account", charges: "₹799/-" },
    { type: "Partnership Account", charges: "₹499/-" },
    { type: "LLP Account", charges: "₹499/-" },
    { type: "Hindu Undivided Family (HUF) Account", charges: "₹199/-" },
    { type: "Trust Account", charges: "₹499/-" },
    { type: "Association of Persons (AOP) Account", charges: "₹299/-" },
  ];

  const nonTradeCharges = [
    {
      title: "Account Maintenance charges (free for first 3 months)",
      charges: "For BSDA (Basic Services Demat Account) Clients:\n• Value of holding in Demat account upto Rs. 1 Lakh - NIL\n• Value of holdings in Demat account between Rs. 1 Lakh and above - Rs. 25 + GST / Month\n\nFor non-BSDA clients:\n₹50 + GST per month"
    },
    {
      title: "Cash collateral charges",
      charges: "0.041% per Day\n(For cash or cash equivalent margin shortfall exceeding ₹2,000)"
    },
    { title: "Debit balance", charges: "0.049% per day" },
    { title: "Call & Trade", charges: "₹50 / per executed order" },
    { title: "DP charges", charges: "₹20.00 per scrip (₹8.5 CDSL fee + ₹11.5 Sapphire fee + ₹3.6 GST)" },
    { title: "Pledging charges", charges: "₹25 + GST / per scrip" },
    { title: "Corporate action charges", charges: "₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders" },
    { title: "Corporate action charges", charges: "₹20 per scrips" }
  ];

  const mtfCharges = [
    { title: "MTF Interest", charges: "0.041% per day (₹41 per lakh) on the funded amount." },
    { title: "MTF Brokerage", charges: "0.03% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on Equity Delivery across NSE and BSE." },
    { title: "MTF Pledge", charges: "₹50 + GST per pledge request per ISIN." }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Navigation Bar */}
      <div className="flex border-b">
        <div className="px-6 py-4 font-semibold text-teal-800 border-b-2 border-teal-800">Equity</div>
        <div className="px-6 py-4 font-semibold ">Currency</div>
        <div className="px-6 py-4 font-semibold ">Commodity</div>
      </div>

      {/* Trading Charges Table */}
      <div className="overflow-x-auto px-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left font-semibold text-gray-700"></th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Equity Delivery</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Equity Intraday</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Equity Futures</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Equity Options</th>
            </tr>
          </thead>
          <tbody>
            {equityData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4 font-medium text-gray-700 flex items-center">
                  {row.type}
                  {index < 7 && (
                    <span className="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12" y2="8"></line>
                      </svg>
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line">{row.equityDelivery}</td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line">{row.equityIntraday}</td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line">{row.equityFutures}</td>
                <td className="py-3 px-4 text-gray-600 whitespace-pre-line">{row.equityOptions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Account Opening Charges */}
      <div className="border-t">
        <div className="px-8 py-4 font-semibold text-gray-800">Account Opening Charges</div>
        <div className="px-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/2">Account Type</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/2">Opening Charges</th>
              </tr>
            </thead>
            <tbody>
              {accountOpeningData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">{item.type}</td>
                  <td className="py-3 px-4 text-gray-600">{item.charges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Non Trade Charges */}
      <div className="border-t">
        <div className="px-8 py-4 font-semibold text-gray-800">Non Trade Charges</div>
        <div className="px-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/2">Charges</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/2">Charges</th>
              </tr>
            </thead>
            <tbody>
              {nonTradeCharges.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">{item.title}</td>
                  <td className="py-3 px-4 text-gray-600 whitespace-pre-line">{item.charges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MTF Charges */}
      <div className="border-t">
        <div className="px-8 py-4 font-semibold text-gray-800">MTF Charges</div>
        <div className="px-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Charges</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Charges</th>
              </tr>
            </thead>
            <tbody>
              {mtfCharges.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-600">{item.title}</td>
                  <td className="py-3 px-4 text-gray-600">{item.charges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-8 py-6 text-sm bg-[#F5F5F5] text-gray-600 border-t">
        <span className="text-2xl text-black ">Disclaimer</span>
        <p className="leading-relaxed">
          For Delivery based trades, a minimum of ₹2.5 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹50 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied as actuals. Brokerage is also charged on expired, exercised and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUF would pay ₹15 + ₹3 (minimum of ₹1 per trade (except delivery)). Additional charges for investors who opt for physical delivery of payout of securities, where physical delivery happens. For renewal of packages for continued where physical delivery happens is ₹199 per month.
        </p>

      </div>
    </div>
  );
};

export default ChargesTable;