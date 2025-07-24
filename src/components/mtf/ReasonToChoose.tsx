import React from 'react';
import Image from 'next/image';

const ReasonsToChooseUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full bg-[#F5F7FA] flex flex-col gap-8 py-12 px-4 sm:px-10 md:px-20">
        <div className="w-full flex flex-col gap-2 mb-6">
          <h2 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-[32px] font-lexend font-medium leading-tight mb-2">Smarter Access to Margin Trading Facility (MTF)</h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-poppins font-normal leading-relaxed">From leveraging trades to boosting capital efficiency, Sapphire’s MTF gives you the flexibility to amplify your market exposure with ease and control.</p>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-0 md:gap-0">
          {/* Box 1 */}
        <div className="flex-1 flex flex-row items-start gap-4 bg-[#F5F7FA] border-t border-gray-300 px-7 py-6">
            <div className='w-20 h-20 -mr-2 flex items-start justify-start'>
              <Image src="/commodities/arrow.svg" alt="Market Depth at a Glance" width={24} height={24} />
            </div>
            <div>
              <h3 className="font-poppins text-[18px] font-medium text-black mb-2 flex items-center gap-2">Real-time Margin Utilization</h3>
              <p className="font-poppins text-[15px]" style={{ color: '#717171' }}>Monitor how much margin you&apos;re using and how much remains — all updated live, so you stay within limits and never miss a trade.</p>
            </div>
          </div>
          <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
          {/* Box 2 */}
        <div className="flex-1 flex flex-row items-start gap-4 bg-[#F5F7FA] border-t border-gray-300 px-7 py-6">
            <div className='w-20 h-20 -mr-2 flex items-start justify-start'>
              <Image src="/commodities/increment.svg" alt="10x Productivity with Terminal" width={24} height={24} />
            </div>
            <div>
              <h3 className="font-poppins text-[18px] font-medium text-black mb-2 flex items-center gap-2">Instant Order Execution</h3>
              <p className="font-poppins text-[15px]" style={{ color: '#717171' }}>Place leveraged orders directly from the terminal with lightning-fast execution speeds — no switching screens, no delays.</p>
            </div>
          </div>
          <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
          {/* Box 3 */}
        <div className="flex-1 flex flex-row items-start gap-4 bg-[#F5F7FA] border-t border-gray-300 px-7 py-6">
            <div className='w-20 h-20 -mr-2 flex items-start justify-start'>
              <Image src="/commodities/star.svg" alt="Expected P&L" width={24} height={24} />
            </div>
            <div>
              <h3 className="font-poppins text-[18px] font-medium text-black mb-2 flex items-center gap-2">Live Interest Calculator</h3>
              <p className="font-poppins text-[15px]" style={{ color: '#717171' }}>Get an upfront view of daily interest on your MTF positions. Transparent, real-time calculations help you plan and manage better.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonsToChooseUs;