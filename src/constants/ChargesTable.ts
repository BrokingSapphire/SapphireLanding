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
        "₹0 brokerage upto ₹500 for first 30 days*\nThen lower of ₹20 or 0.1% per executed order, minimum ₹1",
      equityIntraday:
        "₹0 brokerage upto ₹500 for first 30 days*\nThen lower of ₹20 or 0.03%",
      equityFutures:
        "₹0 brokerage upto ₹500 for first 30 days*\nThen, ₹20 per executed order",
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
      futures: "₹0 brokerage upto ₹500 for first 30 days*\nThen, ₹20 per executed order",
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
      futures: "₹0 brokerage upto ₹500 for first 30 days*\nThen, ₹20 per executed order",
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
  
  // // Account Opening Charges Data
  // export const accountOpeningData = [
  //   { type: "Individual Account", charges: "₹99/-" },
  //   { type: "Company Account", charges: "₹799/-" },
  //   { type: "Partnership Account", charges: "₹499/-" },
  //   { type: "LLP Account", charges: "₹499/-" },
  //   { type: "Hindu Undivided Family (HUF) Account", charges: "₹199/-" },
  //   { type: "Trust Account", charges: "₹499/-" },
  //   { type: "Association of Persons (AOP) Account", charges: "₹299/-" },
  // ];
  
  // Non Trade Charges
  export const nonTradeCharges = [
    {
      title: "Account Maintenance charges (free for first 3 months)",
      charges:
        "For BSDA (Basic Services Demat Account) Clients:\n• Value of holding in Demat account upto Rs. 1 Lakh - NIL\n• Value of holdings in Demat account between Rs. 1 Lakh and above - Rs. 25 + GST / Month\n\nFor non-BSDA clients:\n₹50 + GST per month",
    },
    {
      title: "Cash collateral charges",
      charges:
        "0.041% per Day\n(For cash or cash equivalent margin shortfall exceeding ₹2,000)",
    },
    { title: "Debit balance", charges: "0.049% per day" },
    { title: "Call & Trade", charges: "₹50 / per executed order" },
    {
      title: "DP charges",
      charges:
        "₹20.00 per scrip (₹8.5 CDSL fee + ₹11.5 Sapphire fee + ₹3.6 GST)",
    },
    { title: "Pledging charges", charges: "₹25 + GST / per scrip" },
    {
      title: "Corporate action charges",
      charges:
        "₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders",
    },
    { title: "Corporate action charges", charges: "₹20 per scrips" },
  ];
  
  // MTF Charges
  export const mtfCharges = [
    {
      title: "MTF Interest",
      charges: "0.041% per day (₹41 per lakh) on the funded amount.",
    },
    {
      title: "MTF Brokerage",
      charges:
        "0.03% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on Equity Delivery across NSE and BSE.",
    },
    { title: "MTF Pledge", charges: "₹50 + GST per pledge request per ISIN." },
  ];