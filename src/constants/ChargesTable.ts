// Types for the data structures
export interface EquityRowType {
    type: string;
    equityDelivery: string;
    equityIntraday: string;
    equityFutures: string;
    equityOptions: string;
  }
  
  export interface OtherRowType {
    type: string;
    futures: string;
    options: string;
  }
  
  export interface AccountType {
    type: string;
    charges: string;
  }
  
  export interface ChargeType {
    title: string;
    charges: string;
  }
  
  // Equity related data
  export const equityData = [
    {
      type: "Brokerage",
      equityDelivery:
        "₹0 brokerage upto ₹500 for first 30 days*\nThen lower of ₹20 or 0.05% per executed order, minimum ₹2.5",
      equityIntraday:
        "₹0 brokerage upto ₹500 for first 30 days*\nThen lower of ₹20 or 0.05% per executed order, minimum ₹2.5",
      equityFutures:
        "₹0 brokerage upto ₹500 for first 30 days*\nThen lower of ₹20 or 0.05% per executed order, minimum ₹2.5",
      equityOptions:
        "₹0 brokerage upto ₹500 for first 30 days*\nThen, ₹20 per executed order",
    },
    {
      type: "Transaction Charges",
      equityDelivery: "NSE: 0.00325%\nBSE: As Per The Stock Group",
      equityIntraday: "NSE: 0.00325%\nBSE: As Per The Stock Group",
      equityFutures: "NSE: 0.00171%\nBSE: 0",
      equityOptions:
        "NSE: \nIndex: ₹0/₹tick options 0.0005%\nStock: Index options 0.0345%",
    },
    {
      type: "Security Transaction Tax",
      equityDelivery: "0.1%",
      equityIntraday: "0.025%",
      equityFutures: "NSE: 0.01%\nBSE: 0.01%",
      equityOptions: "NSE: 0.1%\nBSE: 0.1%",
    },
    {
      type: "IPFT",
      equityDelivery: "NSE: 0.0001%",
      equityIntraday: "NSE: 0.0001%",
      equityFutures: "NSE: 0.0001%",
      equityOptions: "NSE: 0.0001%",
    },
    {
      type: "GST",
      equityDelivery: "18%",
      equityIntraday: "18%",
      equityFutures: "18%",
      equityOptions: "18%",
    },
    {
      type: "Stamp Duty Charges",
      equityDelivery: "0.015%",
      equityIntraday: "0.003%",
      equityFutures: "NSE: 0.01%\nBSE: 0.01%",
      equityOptions: "NSE: 0.005%\nBSE: 0.005%",
    },
    {
      type: "SEBI Charges",
      equityDelivery: "₹ 10 / crore",
      equityIntraday: "₹ 10 / crore",
      equityFutures: "₹ 10 / crore",
      equityOptions: "₹ 10 / crore",
    },
  ];
  
  // Currency related data
  export const currencyData = [
    {
      type: "Brokerage",
      futures: "₹0 brokerage upto ₹500 for first 30 days*\nThen, lower of ₹20 or 0.05% per executed order, minimum ₹2.5",
      options: "₹0 brokerage upto ₹500 for first 30 days*\nThen, ₹20 per executed order",
    },
    {
      type: "Transaction Charges",
      futures: "₹0",
      options: "₹0",
    },
    {
      type: "IPFT",
      futures: "0.00005%",
      options: "0.002%",
    },
    {
      type: "GST",
      futures: "18%",
      options: "18%",
    },
    {
      type: "SEBI Charges",
      futures: "₹10 / Crore",
      options: "₹10 / Crore",
    },
    {
      type: "Stamp Duty Charges",
      futures: "0.0001% On Total Turnover Value",
      options: "0.003% On Premium Value",
    },
  ];
  
  // Commodity related data
  export const commodityData = [
    {
      type: "Brokerage",
      futures: "₹0 brokerage upto ₹500 for first 30 days*\nThen, lower of ₹20 or 0.05% per executed order, minimum ₹2.5",
      options: "₹0 brokerage upto ₹500 for first 30 days*\nThen, ₹20 per executed order",
    },
    {
      type: "Transaction Charges",
      futures: "MCX\n0.00210%\n\nNCDEX\n0.0058%",
      options: "MCX\n0.0418%\n\nNCDEX\nOptions 0.03%\nGuar seeds options 0.015%",
    },
    {
      type: "CTT (Commodities Transaction Tax)",
      futures: "0.01% Only on Non-Agri",
      options: "0.05%",
    },
    {
      type: "Risk Management Fee (NCDEX)",
      futures: "0.10%",
      options: "Guar seed options : 0.10%",
    },
    {
      type: "SEBI Charges",
      futures: "₹10 / Crore",
      options: "₹10 / Crore",
    },
    {
      type: "Stamp Duty Charges",
      futures: "0.002% On Total Turnover Value",
      options: "0.003% On Premium Value",
    },
  ];
  
  // Account Opening Charges Data
  export const accountOpeningData = [
    { type: "Individual Account", charges: "Free" },
    { type: "HUF Account", charges: "Free" },
    { type: "Corporate Account", charges: "₹599/-" },
    { type: "Partnership/LLP Account", charges: "₹599/-" },
    { type: "Association of Persons (AOP) Account", charges: "₹599/-" },
    { type: "Trust Account", charges: "₹599/-" },
  ];
  
  // Non Trade Charges
  export const nonTradeCharges = [
    {
      title: "Account Maintenance Charges",
      charges:
        "For BSDA (Basic Services Demat Account) Clients:\n• Value of holding in Demat account upto Rs. ₹4,00,000 - NIL\n• Value of holdings in Demat account between Rs. ₹4,00,000 to ₹10,00,000 - ₹100 + GST / Annually\n\nFor non-BSDA clients (Holdings in Demat Account exceeds ₹10,00,000 or Total No. of Demat Account is more than one):\n₹50 + GST / Quarterly",
    },
    {
      title: "Cash collateral charges",
      charges:
        "0.041% / Day\n(For cash or cash equivalent margin shortfall exceeding ₹50,000)",
    },
    { title: "Debit balance", charges: "0.049% / day" },
    { title: "Call & Trade", charges: "₹50 / per executed order" },
    {
      title: "DP charges",
      charges:
        "Equity ISINs: ₹13.00 + GST\n• Male: ₹3.5 CDSL fee + ₹9.5 Sapphire fee + GST\n• Female: ₹3.25 CDSL fee + ₹9.75 Sapphire fee + GST",
    },
    { title: "Pledging charges", charges: "₹25 + GST / scrip" },
    {
      title: "Corporate action charges",
      charges:
        "₹20 + GST will be charged for OFS / buyback / takeover / delisting orders",
    },
  ];
  
  // MTF Charges
  export const mtfCharges = [
    {
      title: "MTF Interest",
      charges: "0.041% / day (₹41 / lakh) on the borrowed amount.",
    },
    {
      title: "MTF Brokerage",
      charges:
        "0.05% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on Equity Delivery across NSE and BSE.",
    },
    { title: "MTF Pledge", charges: "₹25 + GST per pledge request per ISIN." },
  ];