/* eslint-disable */

import React from "react";

const holidays = [
  {
    date: "January 1, 2025, Wednesday",
    holiday: "New Year Day",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "Clearing", color: "text-[#2D8A4F] bg-[#dfffe2]" },
    ],
  },
  {
    date: "February 19, 2025, Wednesday",
    holiday: "Chhatrapati Shivaji Maharaj Jayanti",
    segments: [
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
      { name: "Clearing", color: "text-[#2D8A4F] bg-[#dfffe2]" },
    ],
  },
  {
    date: "February 26, 2025, Wednesday",
    holiday: "Mahashivratri",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "Commodity Evening", color: "text-[#D93434] bg-[#ffd6d6]" },
    ],
  },
  {
    date: "March 14, 2025, Friday",
    holiday: "Holi",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
    ],
  },
  {
    date: "March 31, 2025, Monday",
    holiday: "Id-Ul-Fitr (Ramzan Eid)",
    segments: [
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
    ],
  },
  {
    date: "April 1, 2025, Tuesday",
    holiday: "Annual Closing of Banks",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "Commodity Evening", color: "text-[#D93434] bg-[#ffd6d6]" },
    ],
  },
  {
    date: "April 10, 2025, Thursday",
    holiday: "Shri Mahavir Jayanti",
    segments: [
      { name: "Equity", color: "text-[#1A73E8] bg-[#E6F3FF]" },
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
    ],
  },
  {
    date: "April 14, 2025, Monday",
    holiday: "Dr. Baba Saheb Ambedkar Jayanti",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "Commodity Evening", color: "text-[#D93434] bg-[#ffd6d6]" },
      { name: "Equity", color: "text-[#1A73E8] bg-[#E6F3FF]" },
    ],
  },
  {
    date: "April 18, 2025, Friday",
    holiday: "Good Friday",
    segments: [
      { name: "Equity", color: "text-[#1A73E8] bg-[#E6F3FF]" },
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
    ],
  },
  {
    date: "May 01, 2025, Thursday",
    holiday: "Maharashtra Day",
    segments: [
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
    ],
  },
  {
    date: "May 12, 2025, Monday",
    holiday: "Buddha Pournima",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
    ],
  },
  {
    date: "August 15, 2025, Friday",
    holiday: "Independence Day",
    segments: [
      { name: "Commodity Evening", color: "text-[#D93434] bg-[#ffd6d6]" },
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
    ],
  },
  {
    date: "August 27, 2025, Wednesday",
    holiday: "Ganesh Chaturthi",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "Commodity Evening", color: "text-[#D93434] bg-[#ffd6d6]" },
      { name: "Equity", color: "text-[#1A73E8] bg-[#E6F3FF]" },
    ],
  },
  {
    date: "September 05, 2025, Friday",
    holiday: "Eid-E-Milad",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "Equity", color: "text-[#1A73E8] bg-[#E6F3FF]" },
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
    ],
  },
  {
    date: "October 02, 2025, Thursday",
    holiday: "Mahatma Gandhi Jayanti/Dussehra",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "Clearing", color: "text-[#2D8A4F] bg-[#2D8A4F]/10" },
    ],
  },
  {
    date: "October 21, 2025, Tuesday",
    holiday: "Diwali & Laxmi Pujan",
    segments: [
      { name: "Commodity Morning", color: "text-[#D93434] bg-[#ffd6d6]" },
      { name: "Equity", color: "text-[#1A73E8] bg-[#E6F3FF]" },
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
    ],
  },
  {
    date: "October 22, 2025, Wednesday",
    holiday: "Diwali-BalipratipadaE",
    segments: [
      { name: "Commodity Morning", color: "text-[#D93434] bg-[#ffd6d6]" },
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
    ],
  },
  {
    date: "November 05, 2025, Wednesday",
    holiday: "Guru Nanak Jayanti",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "Equity", color: "text-[#1A73E8] bg-[#E6F3FF]" },
    ],
  },
  {
    date: "December 25, 2025, Thursday",
    holiday: "Christmas",
    segments: [
      { name: "Currency", color: "text-[#A75EFF] bg-[#A75EFF]/10" },
      { name: "F&O", color: "text-[#FFAC00] bg-[#FFEFC3]" },
    ],
  },
];

export default function HolidayCalendarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-8 lg:py-10 mt-8 sm:mt-12 lg:mt-20">
      <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-medium font-lexend mb-1 mt-4 sm:mt-0">Holiday Calander</h1>
      <p className="text-gray-500 mb-6 sm:mb-8 text-regular font-poppins text-base sm:text-lg lg:text-[20px]">One-Stop-Shop to track all the stock market holidays in India.</p>
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
            {holidays.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#f5f7f8]"}>
                <td className="py-2 text-[#636363] text-xs sm:text-[14px] font-poppins text-regular px-2 sm:px-4 border-b border-[#ebebeb] align-top whitespace-nowrap">{row.date}</td>
                <td className="py-2 px-2 sm:px-4 text-[#636363] text-xs sm:text-[14px] font-poppins text-regular border-b border-[#ebebeb] align-top">{row.holiday}</td>
                <td className="py-2 px-2 sm:px-4 border-b border-[#ebebeb] align-top">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {row.segments.map((seg, i) => (
                      <span
                        key={i}
                        className={`text-xs font-medium px-2 py-1 rounded ${seg.color}`}
                      >
                        {seg.name}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 sm:mt-6 text-[#5B5B5B] text-xs sm:text-[14px] font-poppins text-regular">
        *Note: The data displayed is only indicative and is subject to change without prior notice. You can also visit individual exchanges' links as mentioned above.
      </p>
      <p className="mt-2 text-[#5B5B5B] text-xs sm:text-[14px] font-poppins text-regular">
      *Muhurat Trading will be conducted on Tuesday, October 21, 2025. Timings of Muhurat Trading shall be notified subsequently.
      </p>
    </div>
  );
}