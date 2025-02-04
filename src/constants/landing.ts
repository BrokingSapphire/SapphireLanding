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
    question: "How do I open a trading and Demat account with your firm?",
    answer:
      "To open a trading and Demat account, visit our website or branch, fill out the application form, and submit KYC documents (Identity, Address, and Income Proof).",
  },
  {
    question: "What services do you offer?",
    answer:
      "We provide stock broking, mutual fund distribution, portfolio management, insurance solutions, and expert financial advisory.",
  },
  {
    question: "Are my investments safe with your firm?",
    answer:
      "Yes, your investments are safe with our firm, as we adhere to strict regulatory standards and employ robust security measures to protect your assets.",
  },
];