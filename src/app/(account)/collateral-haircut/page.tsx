"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collateral Haircut | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Understand collateral haircuts in stock trading and pledging. Learn how haircut percentages affect your margin, the role of SEBI guidelines, and how Sapphire Broking applies haircuts on pledged shares and mutual funds for margin trading.",
  keywords:
    "collateral haircut, haircut in pledging, margin against shares, pledged securities haircut, SEBI haircut rules, Sapphire Broking collateral margin, haircut percentage list, mutual fund haircut, haircut on stocks, how haircuts work, haircut margin trading, collateral value after haircut, haircut calculator, stock pledge haircut, trading margin from collateral, haircut in demat pledge, margin benefit after haircut, collateral risk management",
  openGraph: {
    title: "Collateral Haircut | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Get clarity on how collateral haircuts work in trading. Know the haircut rates applied on stocks and mutual funds pledged for margin, and how they impact your collateral value.",
    url: "https://www.sapphirebroking.com/collateral-haircut",
    images: [
      {
        url: "https://www.sapphirebroking.com/logo-white.svg",
        alt: "Sapphire Broking Logo",
      },
    ],
    type: "website",
  },
};

type CollateralRow = {
    isin: string;
    symbol: string;
    name: string;
    haircut: string;
    collateral: string;
};

const staticData: CollateralRow[] = [
    {
        isin: "INE423A01024",
        symbol: "ADANIENT",
        name: "Adani Enterprises Limited",
        haircut: "18.27%",
        collateral: "81.73%",
    },
    {
        isin: "INE423A01024",
        symbol: "ADANIENT",
        name: "Adani Ports and Special Economic Zone Limited",
        haircut: "18.27%",
        collateral: "81.73%",
    },
    {
        isin: "INE423A01024",
        symbol: "ADANIENT",
        name: "Apollo Hospitals Enterprise Limited",
        haircut: "9.27%",
        collateral: "81.73%",
    },
    {
        isin: "INE423A01024",
        symbol: "ADANIENT",
        name: "Asian Paints Limited",
        haircut: "10.02%",
        collateral: "81.73%",
    },
    {
        isin: "INE423A01024",
        symbol: "ADANIENT",
        name: "Bajaj Finance Limited",
        haircut: "18.27%",
        collateral: "81.73%",
    },
    {
        isin: "INE423A01024",
        symbol: "ADANIENT",
        name: "Dr. Reddy's Laboratories Limited",
        haircut: "9.00%",
        collateral: "81.73%",
    },
    {
        isin: "INE423A01024",
        symbol: "ADANIENT",
        name: "Adani Enterprises Limited",
        haircut: "10.21%",
        collateral: "81.73%",
    },
];

const TABS_NON_CASH = ["Equity", "ETF", "Mutual Funds"];
const TABS_CASH = ["ETF", "Mutual funds", "SGB", "G-Sec", "T-bills"];

export default function CollateralHaircutPage() {
    const [activeTab, setActiveTab] = useState("Equity");
    const [selectedOption, setSelectedOption] = useState("Non-Cash");
    const dropdownOptions = ["Non-Cash", "Cash"];
    const [sortConfig, setSortConfig] = useState<{ key: keyof CollateralRow; direction: 'asc' | 'desc' } | null>(null);

    const getTabs = () => selectedOption === "Cash" ? TABS_CASH : TABS_NON_CASH;
    // If switching to cash, reset activeTab to ETF
    const handleSelect = (option: string) => {
        setSelectedOption(option);
        if (option === "Cash") setActiveTab("ETF");
        if (option === "Non-Cash") setActiveTab("Equity");
    };

    // Sorting logic
    const getSortedData = () => {
        if (!sortConfig) return staticData;
        const sorted = [...staticData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            // Remove % for numeric sort
            if (sortConfig.key === 'haircut' || sortConfig.key === 'collateral') {
                const aNum = parseFloat(aValue.replace('%', ''));
                const bNum = parseFloat(bValue.replace('%', ''));
                if (aNum < bNum) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aNum > bNum) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            }
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    };

    const handleSort = (key: keyof CollateralRow) => {
        setSortConfig((prev) => {
            if (prev && prev.key === key) {
                // Toggle direction
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-8 lg:py-10 mt-20 sm:mt-20 lg:mt-20">
            <div className="max-w-7xl px-0 sm:px-6 lg:px-15">
                <h1 className="text-xl sm:text-2xl lg:text-[42px] font-lexend font-medium text-center mb-4 sm:mb-8">Collateral Haircut</h1>
                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-end mb-4 sm:mb-6 gap-3 sm:gap-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <div className="relative w-full sm:w-auto min-w-[180px]">
                            <input
                                type="text"
                                placeholder="Search Stocks..."
                                className="w-full sm:w-64 border rounded px-4 py-2 pl-10 focus:outline-none text-[#717171] text-[13px] sm:text-[14px] font-medium font-poppins placeholder-gray-400"
                                style={{ fontWeight: 500 }}
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <Image src="/collateral-haircut/search.svg" alt="Search" width={18} height={18} />
                            </span>
                        </div>
                        {/* Custom Dropdown */}
                        <div className="relative min-w-[100px] w-full sm:w-auto">
                            <select
                                className="w-full border border-[#D1D5DB] rounded-sm pr-4 h-[42px] text-[#717171] text-[13px] sm:text-[14px] font-medium font-poppins bg-white transition focus:outline-none"
                                value={selectedOption}
                                onChange={e => handleSelect(e.target.value)}
                            >
                                {dropdownOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="flex items-center gap-2 border rounded px-4 py-2 h-10 text-[#717171] text-[13px] sm:text-[14px] font-medium font-poppins w-full sm:w-auto justify-center" style={{ fontWeight: 500 }}>
                            <Image src="/collateral-haircut/download.svg" alt="Download" width={24} height={24} />
                            Download
                        </button>
                    </div>
                </div>
                {/* Tabs styled as in calculators/pricing */}
                <div className="flex border-b-2 border-gray-200 gap-x-2 sm:gap-x-8 mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
                    {getTabs().map((tab) => (
                        <button
                            key={tab}
                            className={`min-w-[80px] sm:min-w-[120px] px-2 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 font-semibold text-xs sm:text-sm lg:text-base cursor-pointer whitespace-nowrap relative transition-colors border-b-2 -mb-px ${activeTab === tab
                                ? "border-[#064D51] text-[#064D51]"
                                : "border-transparent text-gray-500 hover:text-[#064D51]"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#064D51]" style={{ bottom: 0, height: 2 }}></span>
                            )}
                        </button>
                    ))}
                </div>
                {/* Table */}
                <div className="w-full max-w-7xl mx-auto bg-white rounded-sm overflow-x-auto sm:overflow-x-visible">
                    <table
                        className="w-full text-[11px] sm:text-sm border-[0.5px] border-[#D1D5DB]"
                        style={{ minWidth: '600px' }}
                    >
                        <thead>
                            <tr className="bg-[#ffffff]">
                                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left text-[13px] sm:text-[16px] font-poppins text-[#1A1A1A] font-semibold cursor-pointer select-none" onClick={() => handleSort('isin')}>
                                    <div className="flex items-center justify-between w-full">
                                        <span>ISIN</span>
                                        <span className="ml-2 flex-shrink-0">
                                            <Image src="/collateral-haircut/sorticon.svg" alt="Sort" width={16} height={16} style={{ transform: sortConfig?.key === 'isin' ? (sortConfig.direction === 'asc' ? 'rotate(180deg)' : 'none') : undefined }} />
                                        </span>
                                    </div>
                                </th>
                                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left text-[13px] sm:text-[16px] font-poppins text-[#1A1A1A] font-semibold cursor-pointer select-none" onClick={() => handleSort('symbol')}>
                                    <div className="flex items-center justify-between w-full">
                                        <span>Symbol</span>
                                        <span className="ml-2 flex-shrink-0">
                                            <Image src="/collateral-haircut/sorticon.svg" alt="Sort" width={16} height={16} style={{ transform: sortConfig?.key === 'symbol' ? (sortConfig.direction === 'asc' ? 'rotate(180deg)' : 'none') : undefined }} />
                                        </span>
                                    </div>
                                </th>
                                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left font-semibold cursor-pointer select-none" onClick={() => handleSort('name')}>
                                    <div className="flex items-center justify-between w-full">
                                        <span>{activeTab === "Mutual Funds" ? "Fund name" : "Security Name"}</span>
                                        <span className="ml-2 flex-shrink-0">
                                            <Image src="/collateral-haircut/sorticon.svg" alt="Sort" width={14} height={14} style={{ transform: sortConfig?.key === 'name' ? (sortConfig.direction === 'asc' ? 'rotate(180deg)' : 'none') : undefined }} />
                                        </span>
                                    </div>
                                </th>
                                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left text-[13px] sm:text-[16px] font-poppins text-[#1A1A1A] font-semibold cursor-pointer select-none" onClick={() => handleSort('haircut')}>
                                    <div className="flex items-center justify-between w-full">
                                        <span>Haircut</span>
                                        <span className="ml-2 flex-shrink-0">
                                            <Image src="/collateral-haircut/sorticon.svg" alt="Sort" width={16} height={16} style={{ transform: sortConfig?.key === 'haircut' ? (sortConfig.direction === 'asc' ? 'rotate(180deg)' : 'none') : undefined }} />
                                        </span>
                                    </div>
                                </th>
                                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left text-[13px] sm:text-[16px] font-poppins text-[#1A1A1A] font-semibold cursor-pointer select-none" onClick={() => handleSort('collateral')}>
                                    <div className="flex items-center justify-between w-full">
                                        <span>Collateral</span>
                                        <span className="ml-2 flex-shrink-0">
                                            <Image src="/collateral-haircut/sorticon.svg" alt="Sort" width={16} height={16} style={{ transform: sortConfig?.key === 'collateral' ? (sortConfig.direction === 'asc' ? 'rotate(180deg)' : 'none') : undefined }} />
                                        </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[11px] sm:text-[16px] text-regular font-poppins text-[#6B7280]">
                            {getSortedData().map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-[#f5f7fa]" : "bg-white"}>
                                    <td className="px-1 sm:px-4 py-2 sm:py-3">{row.isin}</td>
                                    <td className="px-1 sm:px-4 py-2 sm:py-3">{row.symbol}</td>
                                    <td className="px-1 sm:px-4 py-2 sm:py-3">{row.name}</td>
                                    <td className="px-1 sm:px-4 py-2 sm:py-3">{row.haircut}</td>
                                    <td className="px-1 sm:px-4 py-2 sm:py-3">{row.collateral}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};