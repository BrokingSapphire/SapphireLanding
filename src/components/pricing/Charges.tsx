import React from "react";
import { Wallet, Binary, Coins } from "lucide-react";

interface ChargesCardProps {
  charge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
}

const ChargesCard: React.FC<ChargesCardProps> = ({
  charge,
  title,
  subtitle,
  description,
  icon: Icon,
}) => {
  return (
    <div className="rounded-2xl h-auto min-h-[300px] sm:h-[360px] p-4 sm:p-5 bg-gradient-to-t from-[#EAFBF099] to-white shadow-[0_4px_15px_rgba(196,253,216,0.6)] w-full sm:w-[340px] md:w-[360px] border-2 border-[#C4FDD866]">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-start rounded-md bg-[#EAFBF0] p-2 sm:p-3 gap-2 sm:gap-3 shadow-[0_4px_10px_rgba(196,253,216,0.5)]">
          <div className="mt-1">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#1F6B12]" />
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <h3 className="text-lg sm:text-xl text-[#1F6B12] font-bold">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-start">
          <span className="text-xl sm:text-2xl text-gray-900 font-normal mt-1.5">
            ₹
          </span>
          <span className="text-5xl sm:text-6xl font-bold text-gray-900 leading-none ml-0.5">
            {charge}
          </span>
          {charge === "20" && (
            <span className="text-2xl sm:text-3xl text-gray-900 font-bold mt-1">
              *
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const Charges: React.FC = () => {
  const chargesData = [
    {
      charge: "20",
      title: "Equity Delivery",
      subtitle: "Transparent Pricing for Long-Term Investments",
      description:
        "0.05% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on Equity Delivery across NSE and BSE.",
      icon: Wallet,
    },
    {
      charge: "20",
      title: "F&O & Intraday",
      subtitle: "Competitive Brokerage for Active Traders",
      description:
        "0.05% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on intraday trades across segments. Flat ₹20 per executed on all options trade.",
      icon: Binary,
    },
    {
      charge: "20",
      title: "Commodity & Currency",
      subtitle: "Affordable Rates for Diversified Trading",
      description:
        "0.05% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on Commodity and Currency Futures. Flat ₹20 per executed on all options trade.",
      icon: Coins,
    },
  ];

  return (
    <div className="mx-auto px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 md:gap-8">
        {chargesData.map((card, index) => (
          <ChargesCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Charges;
