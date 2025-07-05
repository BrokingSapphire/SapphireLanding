'use client';

import React, { useState } from 'react';

const IPOPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Current' | 'Upcoming' | 'Closed'>('Current');
  const [selectedIPO, setSelectedIPO] = useState<string>('Magsons Learning Ltd');

  const ipoData = {
    Current: [
      {
        name: 'Magsons Learning Ltd',
        issueSize: '₹132.18 Cr',
        priceRange: '₹55-58',
        lotSize: '258',
        dates: '11 May 2024 - 15 May 2024',
        status: 'Current'
      }
    ],
    Upcoming: [],
    Closed: []
  };

  const steps = [
    {
      icon: '📱',
      title: 'Create A Demat Account',
      description: 'Create a Demat Account with Sapphire. Skip if you already have one.',
      bgColor: 'bg-blue-500'
    },
    {
      icon: '💻',
      title: 'Go To Sapphire Terminal',
      description: 'Go to the terminal by clicking here and click apply if you IPO of your choosing and enter the required details.',
      bgColor: 'bg-teal-600'
    },
    {
      icon: '✅',
      title: 'Approve UPI Request',
      description: 'Confirm the UPI payment mandate in your preferred UPI app.',
      bgColor: 'bg-blue-600'
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white py-16 px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Invest in IPOs & more
              </h1>
              <div className="space-y-4 text-gray-600">
                <p>
                  Apply for IPOs for a chance to own the shares of up-and-coming 
                  companies right from their first listing.
                </p>
                <p>
                  IPOs offer early access to high-growth companies, letting you invest before 
                  they list. Ideal for both new investors and experienced market participants.
                </p>
              </div>
              <button className="bg-[#064D51] hover:bg-teal-800 text-white px-8 py-[14px] rounded-lg font-semibold transition-colors shadow-lg">
                Apply for IPO Now
              </button>
            </div>
            {/* Right Side - IPO Images */}
            <div className="relative flex items-center pl-60 justify-center w-full h-[300px] sm:h-[400px] md:h-[444px]">
              <img src="/ipo/IPO Application Status.svg" alt="IPO 1" className="absolute -top-[28px] left-[168px] w-40 sm:w-56 md:w-[280px] h-auto max-h-[320px] z-10" />
              <img src="/ipo/IPO 1.svg" alt="IPO 2" className="absolute top-16 left-16 w-40 sm:w-56 md:w-[280px] h-auto max-h-[320px] z-20" />
              <img src="/ipo/third.svg" alt="IPO 3" className="absolute -top-[2rem] right-[20rem] w-40 sm:w-56 md:w-[280px] h-auto max-h-[320px] z-5" />
            </div>
          </div>
        </div>

        {/* How Easy It Is Section */}
        <div className="bg-[#F7F9FB] py-16 lg:py-24 rounded-2xl mt-12 px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4 justify-center">
              <span className="text-3xl font-bold text-gray-900">Checkout How Easy</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              It Is to Apply for an IPO on Sapphire
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Apply for IPOs in 3 easy steps
            </p>
          </div>

          {/* Steps */}
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 w-full">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-[220px]">
              <div className="bg-white rounded-2xl shadow p-6 mb-4 flex flex-col items-center">
                <img src="/support/account.svg" alt="Demat Account" className="w-14 h-14 mb-2" />
                <h3 className="text-lg font-bold text-[#00706C] mb-1">Create A Demat Account</h3>
                <p className="text-gray-600 text-base">Create a Demat Account with Sapphire. Skip if you already have one.</p>
              </div>
            </div>
            {/* Arrow 1 */}
            <div className="hidden lg:block flex-1">
              <svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <path d="M10 50 C60 0, 120 0, 170 50" stroke="#BDBDBD" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                <polygon points="170,50 165,47 165,53" fill="#BDBDBD" />
              </svg>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-[220px]">
              <div className="bg-white rounded-2xl shadow p-6 mb-4 flex flex-col items-center">
                <img src="/products/trading-terminal.svg" alt="Sapphire Terminal" className="w-14 h-14 mb-2" />
                <h3 className="text-lg font-bold text-[#00706C] mb-1">Go To Sapphire Terminal</h3>
                <p className="text-gray-600 text-base">Go to the terminal by clicking here and click apply on the IPO of your choosing and enter the required details.</p>
              </div>
            </div>
            {/* Arrow 2 */}
            <div className="hidden lg:block flex-1">
              <svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <path d="M10 10 C60 60, 120 60, 170 10" stroke="#BDBDBD" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                <polygon points="170,10 165,7 165,13" fill="#BDBDBD" />
              </svg>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-[220px]">
              <div className="bg-white rounded-2xl shadow p-6 mb-4 flex flex-col items-center">
                <img src="/signup/upi.png" alt="UPI Request" className="w-14 h-14 mb-2" />
                <h3 className="text-lg font-bold text-[#00706C] mb-1">Approve UPI Request</h3>
                <p className="text-gray-600 text-base">Confirm the UPI payment mandate in your preferred UPI app.</p>
              </div>
            </div>
          </div>
        </div>

        {/* IPO Table Section */}
        <div className="bg-white py-16 rounded-2xl mt-12">
          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200 mb-4">
            {['Ongoing', 'Upcoming', 'Closed'].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-1 text-lg font-medium focus:outline-none transition-colors border-b-2 ${
                  selectedCategory === tab ? 'border-teal-600 text-teal-700' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedCategory(tab as any)}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stocks</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">IPO Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Listing date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price range</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {/* Example IPO rows, replace with real data as needed */}
                {[
                  {
                    logo: '/ipo/IPO 1.svg',
                    name: 'PROFX',
                    badge: 'SME',
                    subtitle: 'PRO FX TECH',
                    ipoDate: '26th–30th JUN 2025',
                    listingDate: '03 Jul 2025',
                    priceRange: '₹82 – ₹87',
                  },
                  {
                    logo: '/ipo/IPO Application Status.svg',
                    name: 'VALINDIA',
                    badge: 'SME',
                    subtitle: 'Valencia India IPO',
                    ipoDate: '26th – 30th Jun 2025',
                    listingDate: '03 Jul 2025',
                    priceRange: '₹95 – ₹110',
                  },
                  {
                    logo: '/ipo/third.svg',
                    name: 'SILKY',
                    badge: 'SME',
                    subtitle: 'Silky Overseas IPO',
                    ipoDate: '30th Jun 2025 – 02nd Jul 2025',
                    listingDate: '07 Jul 2025',
                    priceRange: '₹153 – ₹161',
                  },
                  {
                    logo: '/ipo/IPO 1.svg',
                    name: 'VALINDIA',
                    badge: 'SME',
                    subtitle: 'Valencia India IPO',
                    ipoDate: '26th – 30th Jun 2025',
                    listingDate: '03 Jul 2025',
                    priceRange: '₹95 – ₹110',
                  },
                  {
                    logo: '/ipo/IPO Application Status.svg',
                    name: 'SILKY',
                    badge: 'SME',
                    subtitle: 'Silky Overseas IPO',
                    ipoDate: '30th Jun 2025 – 02nd Jul 2025',
                    listingDate: '07 Jul 2025',
                    priceRange: '₹153 – ₹161',
                  },
                ].map((ipo, idx) => (
                  <tr key={ipo.name + idx} className={idx % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                      <img src={ipo.logo} alt={ipo.name} className="w-8 h-8 rounded-full border border-gray-200" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900 text-sm">{ipo.name}</span>
                          <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded ml-1">{ipo.badge}</span>
                        </div>
                        <div className="text-xs text-gray-500">{ipo.subtitle}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ipo.ipoDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ipo.listingDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ipo.priceRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPOPage;