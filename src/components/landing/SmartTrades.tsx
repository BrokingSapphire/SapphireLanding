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
    <div className="min-h-[500px] mb-12 sm:mb-0 mt-8 md:mt-[90px] md:mb-[110px] px-10 md:px-[48px] lg:px-[100px]">
      {/* Container that stacks on smaller screens */}
      <div className="flex flex-col items-center justify-center gap-8 xl:flex-row xl:gap-20 xl:items-start">
        
        {/* Text Content */}
        <div className="flex flex-col text-center xl:text-left xl:w-1/2 xl:min-w-[500px] xl:h-[400px]">
          <h2 className="font-lexend text-3xl lg:text-4xl font-medium leading-relaxed mb-12">
            {content[currentIndex].title}
            <br className="xl:hidden" />
            <span className='font-lexend'>{content[currentIndex].subtitle}</span>
          </h2>
          
          <div
            className={`transition-all duration-700 ease-in-out flex-1 ${
              fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
          >
            <h3 className="text-lg md:text-[24px]  font-medium mt-[12px] mb-4">
              {content[currentIndex].heading}
            </h3>
            <p className="text-gray-600 text-base md:text-[20px] leading-relaxed md:leading-loose max-w-md mx-auto xl:mx-0 overflow-hidden">
              {content[currentIndex].text}
            </p>
          </div>
        </div>

        {/* Image Container with Fixed Size */}
        <div className="relative flex flex-col items-center xl:mt-[108px] xl:-mb-[280px] xl:h-[400px] xl:flex-shrink-0">
          
          {/* Navigation Dots */}
          <div className="flex gap-3 justify-center mb-6 xl:absolute xl:flex-col xl:left-[-40px] xl:top-[150px] xl:mb-0">
            {content.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                  index === currentIndex
                    ? "bg-[#19A800] scale-125"
                    : "bg-[#D9D9D9]"
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

          {/* Fixed Size Image Container */}
          <div 
            className="overflow-hidden border-[11px] border-[#EFF6FF] rounded-[10px] shadow-lg relative"
            style={{
              width: 'min(550px, calc(100vw - 40px))',
              height: 'min(350px, calc((100vw - 40px) * 350 / 550))',
            }}
          >
            {content.map((item, index) => (
              <Image
                key={index}
                src={item.image}
                alt={item.heading}
                fill
                sizes="(max-width: 640px) calc(100vw - 40px), 550px"
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartTrades;