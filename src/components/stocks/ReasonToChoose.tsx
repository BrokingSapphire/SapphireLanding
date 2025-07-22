import React from 'react';
import Image from 'next/image';

export default function ReasonsToChooseUs() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full bg-[#F5F7FA] flex flex-col gap-8 py-12 px-4 sm:px-10 md:px-20">
        <div className="w-full flex flex-col gap-2 mb-6">
          <h2 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-[32px] font-lexend font-medium leading-tight mb-2">Simplified Access to Indian Stock Markets</h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-poppins font-normal leading-relaxed">From large-cap giants to promising mid and small-cap companies, Sapphire gives you access to the entire Indian stock landscape.</p>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-poppins font-normal leading-relaxed">Easily explore NSE and BSE-listed stocks, view sector-wise performance, analyze charts, and make informed decisions—all without switching between platforms.</p>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-0 md:gap-0">
          {/* Box 1 */}
          <div className="flex-1 flex flex-row gap-2 bg-[#F5F7FA] border-t border-gray-300 px-7 py-6">
            <div className='w-20 h-20 -mr-2 flex items-start justify-start'>
              <Image src="/minor-demat/arrow.png" alt="Option Chain in glance" width={24} height={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-poppins text-[18px] font-medium text-black">Option Chain in glance</h3>
              </div>
              <p className="font-poppins text-[15px] text-gray-600">Analyze market depth and strike prices across indices and stocks—everything you need, clearly laid out in one view.</p>
            </div>
          </div>
          <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
          {/* Box 2 */}
          <div className="flex-1 flex flex-row gap-2 bg-[#F5F7FA] border-t border-gray-300 px-7 py-6">
            <div className='w-20 h-20 -mr-2 flex items-start justify-start'>
              <Image src="/minor-demat/pointer.png" alt="10x productivity with terminal" width={24} height={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-poppins text-[18px] font-medium text-black">10x productivity with terminal</h3>
              </div>
              <p className="font-poppins text-[15px] text-gray-600">Access powerful trading tools, real-time data, and a fast interface—designed to help you act quickly and trade smarter.</p>
            </div>
          </div>
          <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
          {/* Box 3 */}
          <div className="flex-1 flex flex-row gap-2 bg-[#F5F7FA] border-t border-gray-300 px-7 py-6">
            <div className='w-20 h-20 -mr-2 flex items-start justify-start'>
              <Image src="/minor-demat/coins.png" alt="Expected P&L" width={24} height={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-poppins text-[18px] font-medium text-black">Expected P&L</h3>
              </div>
              <p className="font-poppins text-[15px] text-gray-600">Estimate your potential returns in real time before placing an order. Stay in control with transparent profit-loss projections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}