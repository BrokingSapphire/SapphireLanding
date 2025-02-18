'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const content = [
  {
    image: '/main/Option1.png',
    title: 'Smarter Trades, Bigger Gains:',
    subtitle: 'Your Edge in the Market',
    heading: 'Market News & Updates',
    text: 'Stay informed with real-time market news, economic trends, and financial insights, all in one place. Get timely updates on stock movements, corporate actions, and global events that impact your investments.'
  },
  {
    image: '/main/Option1.png',
    title: 'Smarter Trades, Bigger Gains:',
    subtitle: 'Your Edge in the Market',
    heading: 'Investment Insights',
    text: 'Discover in-depth analysis, expert opinions, and strategic insights that help you make informed investment decisions with confidence.'
  },
  {
    image: '/main/Option1.png',
    title: 'Smarter Trades, Bigger Gains:',
    subtitle: 'Your Edge in the Market',
    heading: 'Trading Strategies',
    text: 'Leverage advanced trading strategies, AI-driven market predictions, and risk management tools to optimize your trading success.'
  }
];

function SmartTrades() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[500px] mt-16 flex flex-col sm:flex-row items-center justify-center text-left gap-12 pl-20">
      <div className="h-[380px] -mt-28 sm:w-1/2 flex flex-col">
        <h2 className=" text-4xl font-semibold leading-relaxed">
          {content[currentIndex].title} <br />
          <span>{content[currentIndex].subtitle}</span>
        </h2>
        <div className="transition-opacity duration-1000 ease-in-out">
          <h3 className="mt-8 text-xl font-semibold">{content[currentIndex].heading}</h3>
          <p className="text-gray-600 mt-6 text-lg max-w-md leading-loose">{content[currentIndex].text}</p>
        </div>
      </div>
      <div className="sm:w-1/2 relative flex flex-col items-center mt-8">
        <div className="flex flex-col gap-3 absolute left-[-30px] top-1/2 transform -translate-y-1/2">
          {content.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentIndex ? 'bg-blue-500 scale-125' : 'bg-gray-400'}`}
            />
          ))}
        </div>
        <div className="overflow-hidden border-4  w-[550px] h-[350px] rounded-lg shadow-lg relative">
          {content.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              alt="Market News"
              width={530}
              height={350}
              className={`absolute transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SmartTrades;