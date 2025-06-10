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
    <div className="rounded-2xl h-auto min-h-[220px] sm:min-h-[240px] md:min-h-[260px] lg:min-h-[420px] xl:min-h-[420px] p-4 sm:p-5 md:p-5 lg:p-5 xl:p-6 bg-gradient-to-t from-[#EAFBF099] to-white shadow-[0_4px_15px_rgba(196,253,216,0.6)] w-full sm:w-full md:w-full lg:w-full lg:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[380px] min-w-[280px] lg:min-w-[280px] xl:min-w-[320px] border-2 border-[#C4FDD866] flex-1 lg:flex-shrink">
      <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
        {/* Header */}
        <div className="flex items-start rounded-md bg-[#EAFBF0] p-2 sm:p-3 md:p-3.5 gap-2 sm:gap-3 shadow-[0_4px_10px_rgba(196,253,216,0.5)]">
          <div className="mt-1 flex-shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#1F6B12]" />
          </div>
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
            <h3 className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl text-[#1F6B12] font-bold leading-tight break-words">
              {title}
            </h3>
            <p className="text-sm sm:text-xs md:text-base lg:text-base xl:text-base text-gray-600 leading-snug break-words">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-start">
          <span className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl text-gray-900 font-normal mt-1.5 flex-shrink-0">
            ₹
          </span>
          <span className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-gray-900 leading-none ml-0.5 flex-shrink-0">
            {charge}
          </span>
          {charge === "20" && (
            <span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl text-gray-900 font-bold mt-1 flex-shrink-0">
              *
            </span>
          )}
        </div>

        {/* Description */}
        <div className="min-w-0">
          <p className="text-sm sm:text-base md:text-sm lg:text-sm xl:text-base text-gray-800 leading-relaxed break-words hyphens-auto">
            {description}
          </p>
        </div>
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
    <div className="w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-4 xl:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-4 md:gap-6 lg:gap-4 xl:gap-6 2xl:gap-8 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
        {chargesData.map((card, index) => (
          <ChargesCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Charges;