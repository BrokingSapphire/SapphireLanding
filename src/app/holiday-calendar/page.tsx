"use client";
import React, { useState, useEffect } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holiday Calendar | Sapphire Broking: NSE, BSE, MCX & NCDEX Market Holidays",
  description:
    "Check the latest stock market holiday calendar with Sapphire Broking. Stay updated on NSE, BSE, MCX, and NCDEX trading holidays for equities, derivatives, commodities, and currency markets to plan your trades better.",
  keywords:
    "market holiday calendar, NSE holidays, BSE holidays, MCX trading holidays, NCDEX market holidays, stock market holiday list India, trading holidays 2025, equity market holidays, commodity market holidays, forex trading holidays India, derivatives market holidays, stock exchange holiday calendar, financial market holidays India, trading day schedule, Indian stock market holidays, investment planning holidays",
  openGraph: {
    title: "Holiday Calendar | Sapphire Broking: NSE, BSE, MCX & NCDEX Market Holidays",
    description:
      "Stay updated with Sapphire Broking’s holiday calendar for NSE, BSE, MCX, and NCDEX. Find trading holidays for equities, derivatives, commodities, and currency markets to plan your investments effectively.",
    url: "https://www.sapphirebroking.com/holiday-calendar",
    images: [
      {
        url: "https://www.sapphirebroking.com/logo-white.svg",
        alt: "Sapphire Broking Logo",
      },
    ],
    type: "website",
  },
};

// Segment colors mapping
const segmentColors = {
  'Currency': "text-[#A75EFF] bg-[#A75EFF]/10",
  'Clearing': "text-[#2D8A4F] bg-[#dfffe2]",
  'F&O': "text-[#FFAC00] bg-[#FFEFC3]",
  'Commodity Evening': "text-[#D93434] bg-[#ffd6d6]",
  'Commodity Morning': "text-[#D93434] bg-[#ffd6d6]",
  'Equity': "text-[#1A73E8] bg-[#E6F3FF]",
  'CM': "text-[#1A73E8] bg-[#E6F3FF]", // Capital Market (Equity)
  'FO': "text-[#FFAC00] bg-[#FFEFC3]", // Futures & Options
  'CD': "text-[#A75EFF] bg-[#A75EFF]/10", // Currency Derivatives
  'COM': "text-[#D93434] bg-[#ffd6d6]", // Commodity
};

// Function to format date
const formatDate = (dateStr: string | number | Date) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  };
  return date.toLocaleDateString('en-US', options);
};

// Function to get segment color
const getSegmentColor = (segment: string | number) => {
  return segmentColors[segment as keyof typeof segmentColors] || "text-gray-600 bg-gray-100";
};

export default function HolidayCalendarPage() {
  const [marketHolidays, setMarketHolidays] = useState([]);
  const [clearingHolidays, setClearingHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch holidays data
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent long waits
        const fetchWithTimeout = (url: string | URL | Request, options = {}, timeout = 10000): Promise<Response> => {
          return Promise.race([
            fetch(url, options),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Request timeout')), timeout)
            )
          ]) as Promise<Response>;
        };

        // Fetch both market and clearing holidays with timeout
        const [marketResponse, clearingResponse] = await Promise.all([
          fetchWithTimeout('https://www.nseindia.com/api/holiday-master?type=trading'),
          fetchWithTimeout('https://www.nseindia.com/api/holiday-master?type=clearing')
        ]);

        if (!marketResponse.ok || !clearingResponse.ok) {
          throw new Error('Failed to fetch holiday data from NSE API');
        }

        const marketData = await marketResponse.json();
        const clearingData = await clearingResponse.json();

        // Process market holidays
        if (marketData && marketData.FO) {
          const processedMarketHolidays = marketData.FO.map((holiday: { tradingDate: string | number | Date; description: unknown; Sr_no: string; }) => ({
            date: formatDate(holiday.tradingDate),
            holiday: holiday.description,
            segments: holiday.Sr_no ? holiday.Sr_no.split(',').map(s => s.trim()) : ['Market']
          }));
          setMarketHolidays(processedMarketHolidays);
        } else {
          throw new Error('Invalid market data structure');
        }

        // Process clearing holidays
        if (clearingData && clearingData.FO) {
          const processedClearingHolidays = clearingData.FO.map((holiday: { clearingDate: string | number | Date; tradingDate: string | number | Date; description: unknown; }) => ({
            date: formatDate(holiday.clearingDate || holiday.tradingDate),
            holiday: holiday.description,
            segments: ['Clearing']
          }));
          setClearingHolidays(processedClearingHolidays);
        } else {
          throw new Error('Invalid clearing data structure');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching holidays from API:', err);
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-8 lg:py-10 mt-8 sm:mt-12 lg:mt-20">
        <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-medium font-lexend mb-1 mt-4 sm:mt-0">Holiday Calendar</h1>
        <p className="text-gray-500 mb-6 sm:mb-8 text-regular font-poppins text-base sm:text-lg lg:text-[20px]">One-Stop-Shop to track all the stock market holidays in India.</p>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-gray-600">Loading holiday data from NSE...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-8 lg:py-10 mt-8 sm:mt-12 lg:mt-20">
        <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-medium font-lexend mb-1 mt-4 sm:mt-0">Holiday Calendar</h1>
        <p className="text-gray-500 mb-6 sm:mb-8 text-regular font-poppins text-base sm:text-lg lg:text-[20px]">One-Stop-Shop to track all the stock market holidays in India.</p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Unable to Load Holiday Data</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Try Again
            </button>
            <div className="text-sm text-red-600">
              <p>You can also visit{' '}
                <a 
                  href="https://www.nseindia.com/market-data/securities-available-for-trading" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:no-underline font-medium"
                >
                  NSE India
                </a>
                {' '}directly for holiday information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  interface Holiday {
    date: string;
    holiday: string;
    segments: string[];
  }
  
  // Render holiday table
    const renderHolidayTable = (holidays: Holiday[], title: React.ReactNode) => (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-medium font-lexend mb-4 text-gray-800">{title}</h2>
      <div className="overflow-x-auto rounded-sm">
        <table className="min-w-full bg-white border border-[#ebebeb]">
          <thead>
            <tr className="bg-white text-left">
              <th className="py-3 px-2 sm:px-4 font-semibold border-b border-[#ebebeb] text-sm sm:text-base text-[#000000]">Date</th>
              <th className="py-3 px-2 sm:px-4 font-semibold border-b border-[#ebebeb] text-sm sm:text-base text-[#000000]">Holidays</th>
              <th className="py-3 px-2 sm:px-4 font-semibold border-b border-[#ebebeb] text-sm sm:text-base text-[#000000]">Segments Closed</th>
            </tr>
          </thead>
          <tbody>
            {holidays.length > 0 ? holidays.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#f5f7f8]"}>
                <td className="py-2 text-[#636363] text-xs sm:text-[14px] font-poppins text-regular px-2 sm:px-4 border-b border-[#ebebeb] align-top whitespace-nowrap">{row.date}</td>
                <td className="py-2 px-2 sm:px-4 text-[#636363] text-xs sm:text-[14px] font-poppins text-regular border-b border-[#ebebeb] align-top">{row.holiday}</td>
                <td className="py-2 px-2 sm:px-4 border-b border-[#ebebeb] align-top">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {row.segments.map((seg, i) => (
                      <span
                        key={i}
                        className={`text-xs font-medium px-2 py-1 rounded ${getSegmentColor(seg)}`}
                      >
                        {seg}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-500 text-sm">
                  No holidays found for this category
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-8 lg:py-10 mt-8 sm:mt-12 lg:mt-20">
      <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-medium font-lexend mb-1 mt-4 sm:mt-0">Holiday Calendar</h1>
      <p className="text-gray-500 mb-8 sm:mb-12 text-regular font-poppins text-base sm:text-lg lg:text-[20px]">One-Stop-Shop to track all the stock market holidays in India.</p>
      
      {/* Market Holidays Section */}
      {renderHolidayTable(marketHolidays, "Market Holidays")}
      
      {/* Clearing Holidays Section */}
      {renderHolidayTable(clearingHolidays, "Clearing Holidays")}
      
      <div className="mt-6 space-y-2">
        <p className="text-[#5B5B5B] text-xs sm:text-[14px] font-poppins text-regular">
          *Note: The data displayed is only indicative and is subject to change without prior notice. Data is sourced from NSE India.
        </p>
        <p className="text-[#5B5B5B] text-xs sm:text-[14px] font-poppins text-regular">
          *Muhurat Trading timings will be notified separately for applicable dates.
        </p>
      </div>
    </div>
  );
}