import React from "react";

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children }) => (
  <th className="bg-gray-100 px-4 py-2 text-left font-medium text-gray-700">{children}</th>
);

const TableCell: React.FC<TableHeaderProps> = ({ children }) => (
  <td className="px-4 py-2 text-gray-600">{children}</td>
);

const ChargesTable: React.FC = () => {
  const equityData = [
    {
      type: "Equity Delivery",
      brokerage: "₹0 brokerage upto ₹500 free; ₹2.40 or 0.1% per executed order, minimum ₹1",
      transactionCharges: "NSE: 0.00275% BSE*: As Per The Stock Group",
      stt: "0.1%",
      ipft: "NSE: 0.0001%",
      gst: "18%",
      stampDuty: "0.015%",
      sebiCharges: "₹10 / crore"
    },
    {
      type: "Equity Intraday",
      brokerage: "₹0 brokerage upto ₹500 free; ₹2.40 or F&O or 0.1% 0.03%",
      transactionCharges: "NSE: 0.00275% BSE*: As Per The Stock Group",
      stt: "0.025%",
      ipft: "NSE: 0.0001%",
      gst: "18%",
      stampDuty: "0.003%",
      sebiCharges: "₹10 / crore"
    },
    // Add other columns as needed
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
      charges: "For BSDA (Basic Services Demat Account) Clients:\n• Value of holding in Demat account upto Rs 1 Lakh - NIL\n• Value of holdings in Demat account between Rs. 1 Lakh and above - Rs. 25 + GST / Month\n\nFor non-BSDA clients:\n₹50 + GST per month"
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
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Trading Charges Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left font-medium text-gray-700">Brokerage</th>
              <th className="bg-gray-100 px-4 py-2 text-left font-medium text-gray-700">Equity Delivery</th>
              <th className="bg-gray-100 px-4 py-2 text-left font-medium text-gray-700">Equity Intraday</th>
              <th className="bg-gray-100 px-4 py-2 text-left font-medium text-gray-700">Equity Futures</th>
              <th className="bg-gray-100 px-4 py-2 text-left font-medium text-gray-700">Equity Options</th>
            </tr>
          </thead>
          <tbody>
            {/* Add rows for each charge type */}
          </tbody>
        </table>
      </div>

      {/* Account Opening Charges */}
      <div className="bg-white rounded-lg overflow-hidden border">
        <div className="flex items-center px-4 py-2 bg-blue-500 text-white">
          <h2 className="font-medium">Account Opening Charges</h2>
          <span className="ml-2 px-2 py-1 bg-blue-400 rounded text-sm">₹440 + 79$</span>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <TableHeader>Account Type</TableHeader>
              <TableHeader>Opening Charges</TableHeader>
            </tr>
          </thead>
          <tbody>
            {accountOpeningData.map((item, index) => (
              <tr key={index} className="border-t">
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.charges}</TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Non Trade Charges */}
      <div className="bg-white rounded-lg overflow-hidden border">
        <h2 className="px-4 py-2 bg-gray-100 font-medium">Non Trade Charges</h2>
        <table className="w-full">
          <tbody>
            {nonTradeCharges.map((item, index) => (
              <tr key={index} className="border-t">
                <TableCell>{item.title}</TableCell>
                <td className="px-4 py-2 text-gray-600 whitespace-pre-line">{item.charges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MTF Charges */}
      <div className="bg-white rounded-lg overflow-hidden border">
        <h2 className="px-4 py-2 bg-gray-100 font-medium">MTF Charges</h2>
        <table className="w-full">
          <tbody>
            {mtfCharges.map((item, index) => (
              <tr key={index} className="border-t">
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.charges}</TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="text-sm text-gray-600 mt-4">
        <p className="leading-relaxed">
          For Delivery based trades, a minimum of ₹2.5 will be charged per contract note. Client offers to receive physical contract notes will be charged ₹50 per contract note plus courier charges. In case of new account opening fee is ₹200 each for NRI, Partnership, Minor and HUF accounts. • Statutory and regulatory charges will be levied as actuals. Brokerage is also charged on expired, exercised and assigned options contracts. • *BSE charges on A Group shares is 0.00325%, B Group shares is 0.37%, Z Group shares is 0, Bond Price is 0.0002%. • 1 paisa per Lakh (minimum is ₹25 on delivery per scrip) is levied for transactions in physically settled contracts. • BSE transaction charges on F&O trade @ 0.0019% (minimum is ₹1.9 on F&O per lot). Delayed payment charges @ 0.05% per day for shortage/delay in pay-in. • All charges are exclusive of applicable GST.
        </p>
      </div>
    </div>
  );
};

export default ChargesTable;