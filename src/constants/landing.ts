export const cardData = [
  {
    type: "Opening",
    price: "99",
    subtitle: "Account Opening",
    description:
      "Open an account in just a few clicks! and Immerse yourself in real-time trading",
    icon: "bank.svg",
    hoverContent: {
      description:
        "Enjoy a fast, hassle-free signup process and unlock access to a world of opportunities without any upfront cost.",
      features: [
        "No paperwork required – 100% online process",
        "Instant KYC verification",
        "Start trading in just a few minutes",
      ],
    },
  },
  {
    type: "Brokerage",
    price: "20",
    subtitle: "for all trades",
    description:
      "Enjoy flat brokerage on every order and trade with no hidden costs.",
    icon: "handshake.svg",
    hoverContent: {
      description:
        "Experience a simple and transparent pricing structure. Pay a flat ₹20 or 0.1% of order value per order.",
      features: [
        "Flat fee per executed order",
        "No hidden charges, ever",
        "Works for intraday, delivery, F&O, and commodities",
      ],
    },
  },
  {
    type: "Maintenance",
    price: "0",
    subtitle: "Maintenance",
    description: "Say goodbye to annual/monthly fees and maintenance charges",
    icon: "agent.svg",
    hoverContent: {
      description:
        "Enjoy a completely maintenance-free account for first 3 months. Later on ₹25 + GST will be charged as AMC.",
      features: [
        "Zero AMC for first Three months",
        "No hidden renewal fees – Complete transparency",
      ],
    },
  },
  {
    type: "Security",
    price: "0",
    subtitle: "Hidden Charges",
    description:
      "Trade with confidence knowing there are no extra fees or hidden charges.",
    icon: "money.svg",
    hoverContent: {
      description:
        "Your security is our top priority. We ensure that your personal data and funds are fully protected.",
      features: [
        "Bank-grade encryption",
        "Two-factor authentication (2FA)",
        "SEBI-registered broker",
      ],
    },
  },
];


export interface GatewayItem {
  title: string;
  icon: string;
  description: string;
}

export const gatewayItems: GatewayItem[] = [
  {
    title: "Stocks",
    icon: "/features/stocks.svg",
    description: "Trade seamlessly and build your portfolio with confidence.",
  },
  {
    title: "Mutual Fund",
    icon: "/features/mf.svg",
    description: "Trade seamlessly and build your portfolio with confidence.",
  },
  {
    title: "F&O",
    icon: "/features/fno.svg",
    description: "Trade seamlessly and build your portfolio with confidence.",
  },
  {
    title: "Commodities",
    icon: "/features/commodity.svg",
    description: "Trade seamlessly and build your portfolio with confidence.",
  },
  {
    title: "IPO",
    icon: "/features/ipo.svg",
    description: "Trade seamlessly and build your portfolio with confidence.",
  },
  {
    title: "US Stocks",
    icon: "/features/usstocks.svg",
    description: "Trade seamlessly and build your portfolio with confidence.",
  },
];

export const faqs = [
  {
    question: "What is Sapphire Broking?",
    answer:
      "Sapphire Broking is a stock brokerage firm offering trading and investment services in equities, derivatives, commodities, and mutual funds with advanced tools and a seamless user experience.",
  },
  {
    question: "How do I open an account?",
    answer:
      "You can open an account online by completing the e-KYC process with your PAN, Aadhaar, and bank details. The process is quick, paperless, and takes only a few minutes.",
  },
  {
    question: "What are the brokerage charges?",
    answer:
      "We offer competitive and transparent brokerage plans. Visit our pricing section for detailed information on brokerage charges and other fees.",
  },
  {
    question: "Which stock exchanges can I trade on?",
    answer:
      "Sapphire Broking provides access to NSE, BSE, MCX, and NCDEX, enabling trading in equities, derivatives, commodities, and currencies.",
  },
  {
    question: "How do I add funds to my trading account?",
    answer:
      "You can add funds via net banking, UPI, or bank transfers. Funds are credited instantly, allowing you to start trading without delays.",
  },
];
