import React from "react";



const ChargesCard = ({
  charge,
  title,
  description,
}: {
  charge: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="relative flex items-end mb-4">
        <span className="text-yellow-400 mr-2 text-2xl font-bold mb-1">₹</span>
        <span className="text-8xl font-bold text-yellow-400 leading-none -ml-1">
          {charge}
        </span>
        {charge === "20" && (
          <span className="text-4xl text-yellow-400 absolute -right-4 top-0">
            *
          </span>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const Charges = () => {
  const chargesData = [
    {
      charge: "20",
      title: "Equity Delivery",
      description:
        "0.03% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on Equity Delivery across NSE and BSE.",
    },
    {
      charge: "20",
      title: "F&O and Intraday",
      description:
        "0.03% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on intraday trades across segments. Flat ₹20 per executed on all options trade.",
    },
    {
      charge: "20",
      title: "Commodity and Currency",
      description:
        "0.03% or Flat ₹20 per executed order (whichever is lower), minimum ₹2.5 on Commodity and Currency Futures. Flat ₹20 per executed on all options trade.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <section className="header flex flex-col items-center justify-center mb-16 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">
          Simplified Charges for{" "}
          <span className="text-[#152F46]">Hassle-Free</span> Trading
        </h1>
        <h3 className="text-gray-600 text-sm sm:text-base">

            Real-time trading, insightful analytics, and unmatched support—your
            portfolio deserves it.

        </h3>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {chargesData.map((card, index) => (
          <ChargesCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Charges;
