export const accountData = [
    {
      type: "Account Type",
      charges: "Charges",
    },
    {
      type: "Individual Account",
      charges: "₹99",
    },
    {
      type: "Company Account",
      charges: "₹799",
    },
    {
      type: "Partnership Account",
      charges: "₹499",
    },
    {
      type: "LLP Account",
      charges: "₹499",
    },
    {
      type: "Hindu Undivided Family (HUF) Account",
      charges: "₹199",
    },
    {
      type: "Trust Account",
      charges: "₹499",
    },
    {
      type: "Association of Persons (AOP) Account",
      charges: "₹299",
    },
];
  

export const mtfData = [
  {
    type: "MTF Type",
    charges: "Charges",
  },
  {
    type: "MTF Interest",
    charges: "0.041% per day (₹41 per lakh) on the funded amount",
  },
  {
    type: "MTF Brokerage",
    charges:
      "0.03% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on Equity Delivery across NSE and BSE",
  },
  {
    type: "MTF pledge charge",
    charges: "₹30 + GST per pledge request per ISIN",
  },
];


export const nonTradeChargesData = [
  {
    type: "Trade Type",
    charges: "Charges",
  },
  {
    type: "Account Maintenance charges <br/> <strong>(free for first 3 months)</strong>",
    charges: `<strong>For BSDA (Basic Services Demat Account) Clients:</strong><br />
* Value of holdings in Demat account upto Rs. 1 Lakh - NIL<br />
* Value of holdings in Demat account between Rs. 1 Lakh
and above - Rs. 25 + GST / Month. <br />

<strong>For non-BSDA clients:</strong> <br />
₹50 + GST per month`,
  },
  {
    type: "Cash collateral charges",
    charges:
      "0.041% per Day <br />(For cash or cash equivalent margin shortfall exceeding ₹2,000)",
  },
  {
    type: "Debit balance",
    charges: "0.049% per day",
  },
  {
    type: "Call & Trade",
    charges: "₹50 / per executed order",
  },
  {
    type: "DP charges",
    charges:
      "₹25.00 per scrip (₹13.5 CDSL fee + ₹11.5 Sapphire fee + ₹3.00 GST)",
  },
  {
    type: "Pledging charges",
    charges: "₹25 + GST / per scrip",
  },
  {
    type: "Corporate action charges",
    charges:
      "₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders",
  },
  {
    type: "Off-market transfer charges",
    charges: "₹20 per scrip",
  },
];


export const sapphireChargesData = [
  {
    type: "Brokerage",
    charges: [
      {
        category: "Equity Delivery",
        value: "₹20 per executed order or 0.05% (whichever is lower), minimum ₹2.5"
      },
      {
        category: "Equity Intraday",
        value: "₹20 per executed order or 0.05% (whichever is lower), minimum ₹2.5"
      },
      {
        category: "Equity Futures",
        value: "₹20 per executed order or 0.05% (whichever is lower), minimum ₹2.5"
      },
      {
        category: "Equity Options",
        value: "Flat ₹20 per executed order"
      }
    ]
  },
  {
    type: "STT/CTT",
    charges: [
      {
        category: "Equity Delivery",
        value: "0.1% on buy & sell"
      },
      {
        category: "Equity Intraday",
        value: "0.025% on the sell side"
      },
      {
        category: "Equity Futures",
        value: "0.02% on sell-side"
      },
      {
        category: "Equity Options",
        value: "0.1% on sell side (on premium)"
      }
    ]
  },
  {
    type: "GST",
    charges: [
      {
        category: "Equity Delivery",
        value: "18% (on brokerage + transaction + demat charges)"
      },
      {
        category: "Equity Intraday",
        value: "18% (on brokerage + transaction charges)"
      },
      {
        category: "Equity Futures",
        value: "18% (on brokerage + transaction charges)"
      },
      {
        category: "Equity Options",
        value: "18% (on brokerage + transaction charges)"
      }
    ]
  },
  {
    type: "Stamp Duty",
    charges: [
      {
        category: "Equity Delivery",
        value: "0.015% or ₹1500 / crore on buy side"
      },
      {
        category: "Equity Intraday",
        value: "0.003% or ₹300 / crore on buy side"
      },
      {
        category: "Equity Futures",
        value: "0.002% or ₹200 / crore on buy side"
      },
      {
        category: "Equity Options",
        value: "0.003% or ₹300 / crore on buy side"
      }
    ]
  },
  {
    type: "Transaction charges",
    charges: [
      {
        category: "Equity Delivery",
        value: "NSE 0.00325% per trade on buy & sell; BSE charges vary as per the scrip group"
      },
      {
        category: "Equity Intraday",
        value: "NSE 0.00307% per trade on buy & sell; BSE charges vary as per the scrip group"
      },
      {
        category: "Equity Futures",
        value: "NSE Exchange turnover charge: 0.0017%; BSE Nil"
      },
      {
        category: "Equity Options",
        value: "NSE 0.05053% (on premium); BSE 0.0525% (on premium)"
      }
    ]
  },
  {
    type: "DP Charges",
    charges: [
      {
        category: "Equity Delivery",
        value: "₹18.5 per scrip per day only on sell"
      },
      {
        category: "Equity Intraday",
        value: "No charges"
      },
      {
        category: "Equity Futures",
        value: "No charges"
      },
      {
        category: "Equity Options",
        value: "No charges"
      }
    ]
  },
  {
    type: "SEBI Charges",
    charges: [
      {
        category: "Equity Delivery",
        value: "₹10/crore"
      },
      {
        category: "Equity Intraday",
        value: "₹10/crore"
      },
      {
        category: "Equity Futures",
        value: "₹10/crore"
      },
      {
        category: "Equity Options",
        value: "₹10/crore"
      }
    ]
  }
];