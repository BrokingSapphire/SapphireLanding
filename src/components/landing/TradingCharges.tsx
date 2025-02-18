import Image from "next/image";
import React from "react";

const TradingCharges = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Simplified Charges Section */}
        <h2 className="text-center text-5xl font-semibold mb-8">
          Simplified Charges for <span className="text-[#064D51]">Hassle-Free</span> Trading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            {
              title: "Equity Delivery & Intraday, F&O, Currencies & Commodities",
              description: "Trade with confidence! Enjoy zero brokerage on all trades for the first 7 days after onboarding.",
            },
            {
              title: "Annual Maintenance Charges",
              description: "No hidden fees! Get free annual maintenance charges (AMC) for the first 3 months from your onboarding date.",
            },
            {
              title: "Direct Mutual Funds",
              description: "Maximize your returns! Invest in direct mutual funds with absolutely no charges, forever.",
            },
          ].map((item, index) => (
            <div key={index} className=" p-6 ">
              <h3 className="text-9xl font-bold text-[#FFAE00]">₹0*</h3>
              <h4 className="text-2xl font-medium mt-2">{item.title}</h4>
              <p className=" text-gray-600 text-md mt-2 ">{item.description}</p>
            </div>
          ))}
        </div>

 
      </div>
    </div>
  );
};

export default TradingCharges;
