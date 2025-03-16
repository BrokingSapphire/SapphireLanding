import React from "react";

const TradingCharges = () => {
  return (
    <div className="bg-gray-100 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Simplified Charges Section */}
        <h2 className="text-center text-3xl md:text-5xl font-semibold mb-6 md:mb-8">
          Simplified Charges for{" "}
          <span className="text-green-heading">Hassle-Free</span> Trading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-center">
          {[
            {
              title: "Equity & Derivatives",
              description:
                "Enjoy zero brokerage on all trades for the first 7 days after onboarding. Trade with confidence and save on costs!",
            },
            {
              title: "Account Maintenance",
              description:
                "No hidden fees! Get free annual maintenance charges (AMC) for the first 3 months from your onboarding date.",
            },
            {
              title: "Direct Mutual Funds",
              description:
                "Invest in direct mutual funds with absolutely no charges, forever. Maximize your returns with zero commission fees!",
            },
          ].map((item, index) => (
            <div key={index} className="p-4 md:p-6">
              <div className="flex relative justify-center">
                <h3 className="text-3xl md:text-4xl absolute bottom-4 font-bold text-[#FFAE00] left-[30%] sm:left-[30%] md:left-1/4 lg:left-1/3 xl:left-20">
                  ₹
                </h3>
                <h3 className="text-9xl md:text-9xl font-bold text-[#FFAE00]">
                  0
                </h3>
                <h3 className="text-4xl md:text-4xl font-bold text-[#FFAE00]">
                  *
                </h3>
              </div>
              <h4 className="text-xl md:text-2xl font-medium mt-2">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm md:text-md mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingCharges;