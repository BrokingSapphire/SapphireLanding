"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const content = [
  {
    image: "/main/Option1.png",
    title: "Smarter Trades, Bigger Gains:",
    subtitle: " Your Edge in the Market",
    heading: "Market News & Updates",
    text: "Stay informed with real-time market news, economic trends, and financial insights, all in one place. Get timely updates on stock movements, corporate actions, and global events that impact your investments.",
  },
  {
    image: "/main/Option1.png",
    title: "Smarter Trades, Bigger Gains:",
    subtitle: " Your Edge in the Market",
    heading: "Investment Insights",
    text: "Discover in-depth analysis, expert opinions, and strategic insights that help you make informed investment decisions with confidence.",
  },
  {
    image: "/main/Option1.png",
    title: "Smarter Trades, Bigger Gains:",
    subtitle: " Your Edge in the Market",
    heading: "Trading Strategies",
    text: "Leverage advanced trading strategies, AI-driven market predictions, and risk management tools to optimize your trading success.",
  },
];

function SmartTrades() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out effect

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
        setFade(true); // Start fade-in effect
      }, 500); // Short delay before updating content
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[500px] mt-8 md:mt-16 flex flex-col md:flex-row items-center justify-center text-left gap-6 md:gap-12 px-4 md:px-28 lg:pl-20 pb-16 md:pb-0">
      <div className="md:h-[380px] md:-mt-28 w-full md:w-1/2 flex flex-col">
        <h2 className="text-3xl text-center mx-auto md:text-3xl lg:text-4xl font-semibold leading-relaxed">
          {content[currentIndex].title}
          <span>{content[currentIndex].subtitle}</span>
        </h2>
        <div
          className={`transition-all duration-700 ease-in-out ${
            fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <h3 className="mt-4 md:mt-8 text-lg md:text-xl font-semibold">
            {content[currentIndex].heading}
          </h3>
          <p className="text-gray-600 mt-3 md:mt-6 text-base md:text-lg max-w-md leading-relaxed md:leading-loose">
            {content[currentIndex].text}
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 relative flex flex-col items-center mt-8 mb-4 md:mb-0">
        <div className="flex  md:flex-col gap-3 justify-center md:justify-start absolute md:left-[-30px] bottom-[-30px] md:bottom-auto md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-x-0 md:-translate-y-1/2">
          {content.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-[#19A800] scale-125"
                  : "bg-gray-400"
              }`}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setFade(true);
                }, 500);
              }}
            />
          ))}
        </div>
        <div className="overflow-hidden -mt-8 border-4 w-full max-w-[550px] h-[250px] md:h-[350px] rounded-lg shadow-lg relative">
          {content.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              alt={item.heading}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SmartTrades;