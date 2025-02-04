
import Image from "next/image";
import React from "react";

interface SupportLink {
  title: string;
  description: string;
}

interface SupportCardProps {
  title: string;
  imagePath: string;
  links: SupportLink[];
}

const SupportCard = ({ title, imagePath, links }: SupportCardProps) => (
  <div className="p-6 rounded-3xl border border-black flex flex-col gap-4">
    <div className="flex items-center gap-3 mb-2">
      <Image src={imagePath} width={50} height={50} alt="Heading icons" />
      <h3 className="text-base font-semibold">{title}</h3>
    </div>
    <div className="border-t border-black  pt-4">
      {links.map((link, index) => (
        <div key={index} className="flex items-start gap-2 mb-2 text-xs">
          <span className="text-blue-500">•</span>
          <div>
            <span className="text-blue-500 hover:underline cursor-pointer">
              {link.title}
            </span>
            <span className="text-gray-600"> - {link.description}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SupportCenter = () => {
  const sections = [
    {
      title: "Account Opening & Management",
      imagePath: "/support/account.svg",
      links: [
        {
          title: "Getting Started",
          description: "Steps to create your account",
        },
        {
          title: "KYC Verification",
          description: "Upload and verify your documents",
        },
        {
          title: "Bank Account Linking",
          description: "Add and update your bank details",
        },
        {
          title: "Account Modification",
          description: "Change details or add trading segments",
        },
        {
          title: "Referral Program",
          description: "Earn rewards by referring friend",
        },
      ],
    },
    {
      title: "Stocks & Trading",
      imagePath: "/support/stock.svg",
      links: [
        {
          title: "Placing & Managing Orders",
          description: "Buy/sell stocks seamlessly",
        },
        { title: "IPO & New Listings", description: "Invest in upcoming IPOs" },
        {
          title: "Demat & Holdings",
          description: "Manage your stock holdings",
        },
        {
          title: "Futures & Options (F&O)",
          description: "Learn about derivatives trading",
        },
        {
          title: "Corporate Actions",
          description: "Dividends, bonuses & stock splits",
        },
      ],
    },
    {
      title: "Mutual Funds & SIPs",
      imagePath: "/support/mutual.svg",
      links: [
        { title: "Starting an SIP", description: "Automate your investments" },
        {
          title: "One-time Mutual Fund Orders",
          description: "Invest in top-performing funds",
        },
        { title: "AutoPay Setup", description: "Enable seamless payments" },
        {
          title: "Switching or Redeeming Funds",
          description: "Withdraw your investments",
        },
      ],
    },
    {
      title: "Payments & Withdrawals",
      imagePath: "/support/payment.svg",
      links: [
        {
          title: "Adding Funds",
          description: "Deposit money via UPI, net banking & more",
        },
        {
          title: "Withdrawals & Payouts",
          description: "Transfer funds to your bank",
        },
        { title: "Failed Transactions", description: "Resolve payment issues" },
        {
          title: "Fund Transfer Timelines",
          description: "Know when your money will reflect",
        },
      ],
    },
    {
      title: "Pricing, Charges & Taxation",
      imagePath: "/support/pricing.svg",
      links: [
        {
          title: "Brokerage & Transaction Fees",
          description: "Know what you pay",
        },
        {
          title: "GST & Other Taxes",
          description: "Taxation on stock & MF investments",
        },
        {
          title: "Capital Gains Tax",
          description: "Short-term vs long-term taxes",
        },
        {
          title: "STT, CTT & Other Charges",
          description: "Market transaction costs explained",
        },
      ],
    },
    {
      title: "Fixed Deposits (FDs)",
      imagePath: "/support/fd.svg",
      links: [
        { title: "Opening an FD", description: "Start an FD with ease" },
        {
          title: "Interest Rates & Payout Options",
          description: "Choose the right FD plan",
        },
        {
          title: "Premature Withdrawal & Closure",
          description: "Exit an FD before maturity",
        },
        { title: "Taxation & TDS", description: "Understand the tax benefits" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4">
          Explore Our <span className="text-green-heading">Support</span> Center
        </h1>
        <p className="text-gray-600">
          Find answers to your queries and manage your finances with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <SupportCard
            key={index}
            title={section.title}
            imagePath={section.imagePath}
            links={section.links}
          />
        ))}
      </div>
    </div>
  );
};

export default SupportCenter;
