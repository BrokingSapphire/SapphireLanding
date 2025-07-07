// This file was moved from src/app/product/ipo/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const IPOPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Ongoing' | 'Upcoming' | 'Closed'>('Ongoing');
  // const [selectedIPO, setSelectedIPO] = useState<string>('Magsons Learning Ltd');

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white py-10 sm:py-14 lg:py-16 w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between relative w-full min-h-[240px] md:min-h-[340px] px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
            {/* Left Content */}
            <div className="z-10 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl pt-8 md:pt-0 pl-0 md:pl-8 lg:pl-8 xl:pl-15 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 font-lexend">
                Invest in IPOs & more
              </h1>
              <div className="space-y-3 sm:space-y-4 text-gray-600 mb-5 sm:mb-6">
                <p className='text-base sm:text-lg md:text-xl'>
                  Apply for IPOs for a chance to own the shares of up-and-coming 
                  companies right from their first listing.
                </p>
                <p className='text-base sm:text-lg md:text-xl'>
                  IPOs offer early access to high-growth companies, letting you invest before 
                  they list. Ideal for both new investors and experienced market participants.
                </p>
              </div>
              <button className="bg-[#064D51] hover:bg-teal-800 text-white px-6 sm:px-8 py-3 sm:py-[14px] rounded-lg font-semibold transition-colors shadow-lg w-full md:w-auto">
                Apply for IPO Now
              </button>
            </div>
            {/* Right Side - IPO Images */}
            <div className="relative w-full flex justify-center md:justify-end mb-6 md:mb-0 md:w-auto">
              <Image
                src="/ipo/frame.png"
                alt="IPO Frame"
                width={380}
                height={444}
                className="w-48 sm:w-64 md:w-[320px] lg:w-[380px] h-auto max-h-[300px] md:max-h-[444px] drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* How Easy It Is Section */}
        <div className="bg-[#F7F9FB] py-16 lg:py-24 rounded-2xl mt-12 px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4 justify-center">
              <span className="text-3xl font-bold text-gray-900 font-lexend">Checkout How Easy</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-lexend">
              It Is to Apply for an IPO on Sapphire
            </h2>
            <p className="text-gray-600 text-[20px] font-poppins  mb-8">
              Apply for IPOs in 3 easy steps
            </p>
          </div>

          {/* Steps */}
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 w-full">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-[200px]">
              <div className=" py-6 mb-4 flex flex-col items-center">
                <Image src="/ipo/demataccount.png" alt="Demat Account" width={100} height={100} className="w-[100px] h-[100px] mb-2" />
                <h3 className="text-lg font-bold text-[#00706C] mb-1">Create A Demat Account</h3>
                <p className="text-gray-600 text-base">Create a Demat Account with Sapphire. Skip if you already have one.</p>
              </div>
            </div>
            {/* Arrow 1 */}
            <div className="hidden lg:block flex relative" style={{ top: '-100px' }}>
              <Image
              src="/ipo/Arc 2.png"
              alt="Arrow 2"
              width={270}
              height={28}
              className="-mx-15"
              draggable={false}
              />
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-[200px]">
              <div className=" py-6 mb-4 flex flex-col items-center">
                <Image src="/ipo/sapphireterminal.png" alt="Sapphire Terminal" width={100} height={100} className="w-[100px] h-[100px] mb-2" />
                <h3 className="text-lg font-bold text-[#00706C] mb-1">Go To Sapphire Terminal</h3>
                <p className="text-gray-600 text-base">Go to the terminal by clicking here and click apply on the IPO of your choosing and enter the required details.</p>
              </div>
            </div>
            {/* Arrow 2 */}
            <div className="hidden lg:block flex relative" style={{ top: '-30px' }}>
              <Image
                src="/ipo/Arc 1.png"
                alt="Arrow 1"
                width={270}
                height={28}
                className="-mx-15"
                draggable={false}
              />
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-[200px]">
              <div className="p-6 mb-4 flex flex-col items-center">
                <Image src="/ipo/upirequest.png" alt="UPI Request" width={100} height={100} className="w-[100px] h-[100px] mb-2" />
                <h3 className="text-lg font-bold text-[#00706C] mb-1">Approve UPI Request</h3>
                <p className="text-gray-600 text-base">Confirm the UPI payment mandate in your preferred UPI app.</p>
              </div>
            </div>
          </div>
        </div>

        {/* IPO Table Section */}
        <div className="bg-white py-10 sm:py-14 lg:py-16 rounded-2xl mt-8 sm:mt-10 lg:mt-12 px-2 sm:px-4 md:px-8 lg:px-20">
          <div className="w-full max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="relative mb-4 sm:mb-6 pt-4 sm:pt-6">
                <div className="flex gap-x-4 sm:gap-x-8 lg:gap-x-20 border-b border-gray-200 overflow-x-auto scrollbar-hide no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {(['Ongoing', 'Upcoming', 'Closed'] as Array<'Ongoing' | 'Upcoming' | 'Closed'>).map((tab) => (
                  <button
                  key={tab}
                  className={`px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 font-semibold text-xs sm:text-sm md:text-base cursor-pointer whitespace-nowrap relative transition-colors ${selectedCategory === tab ? 'text-[#064D51] font-semibold' : 'text-gray-500'}`}
                  style={{ zIndex: selectedCategory === tab ? 10 : 1, borderBottom: selectedCategory === tab ? '4px solid #064D51' : '4px solid transparent', marginBottom: '-1px' }}
                  onClick={() => setSelectedCategory(tab)}
                  >
                  {tab}
                  </button>
                ))}
                <style jsx>{`
                  div::-webkit-scrollbar {
                  display: none;
                  }
                `}</style>
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto scrollbar-hide rounded-xl border border-gray-200 bg-white">
              <table className="min-w-full border-collapse text-xs sm:text-sm md:text-base">
                <thead className="bg-gray-50">
                  <tr style={{ height: "44px" }}>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Stocks</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">IPO Date</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Listing date</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Price range</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {/* Example IPO rows, replace with real data as needed */}
                  {[
                    {
                      logo: '/ipo/logo1.png',
                      name: 'PROFX',
                      badge: 'SME',
                      subtitle: 'PRO FX TECH',
                      ipoDate: '26th–30th JUN 2025',
                      listingDate: '03 Jul 2025',
                      priceRange: '₹82 – ₹87',
                    },
                    {
                      logo: '/ipo/logo2.png',
                      name: 'VALINDIA',
                      badge: 'SME',
                      subtitle: 'Valencia India IPO',
                      ipoDate: '26th – 30th Jun 2025',
                      listingDate: '03 Jul 2025',
                      priceRange: '₹95 – ₹110',
                    },
                    {
                      logo: '/ipo/logo3.png',
                      name: 'SILKY',
                      badge: 'SME',
                      subtitle: 'Silky Overseas IPO',
                      ipoDate: '30th Jun 2025 – 02nd Jul 2025',
                      listingDate: '07 Jul 2025',
                      priceRange: '₹153 – ₹161',
                    },
                    {
                      logo: '/ipo/logo4.png',
                      name: 'VALINDIA',
                      badge: 'SME',
                      subtitle: 'Valencia India IPO',
                      ipoDate: '26th – 30th Jun 2025',
                      listingDate: '03 Jul 2025',
                      priceRange: '₹95 – ₹110',
                    },
                    {
                      logo: '/ipo/logo5.png',
                      name: 'SILKY',
                      badge: 'SME',
                      subtitle: 'Silky Overseas IPO',
                      ipoDate: '30th Jun 2025 – 02nd Jul 2025',
                      listingDate: '07 Jul 2025',
                      priceRange: '₹153 – ₹161',
                    },
                  ].map((ipo, idx) => (
                    <tr key={ipo.name + idx} className={idx % 2 === 1 ? 'bg-gray-50' : ''} style={{ height: "64px" }}>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap flex items-center space-x-2 sm:space-x-3">
                        <Image src={ipo.logo} alt={ipo.name} width={36} height={36} className="w-8 h-8 sm:w-11 sm:h-11" />
                        <div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <span className="font-regular text-gray-500 text-xs sm:text-[16px]">{ipo.name}</span>
                            <span className="bg-purple-100 text-purple-700 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded ml-1">{ipo.badge}</span>
                          </div>
                          <div className="text-[10px] sm:text-[12px] font-regular text-gray-500">{ipo.subtitle}</div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-[16px] font-regular text-gray-500">{ipo.ipoDate}</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-[16px] font-regular text-gray-500">{ipo.listingDate}</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-[16px] font-regular text-gray-500">{ipo.priceRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPOPage;
