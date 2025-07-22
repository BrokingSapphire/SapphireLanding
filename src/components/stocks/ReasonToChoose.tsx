import React from 'react';
import Image from 'next/image';

export default function ReasonsToChooseUs() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full bg-[#F5F7FA] flex flex-col gap-6 py-12 px-4 sm:px-10 md:px-20">
        <div className="flex items-center justify-center">
          <div className="font-lexend text-[32px] font-medium text-black text-center">Reasons to Choose Us</div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-0 md:gap-0">
          {/* Box 1 */}
          <div className="flex-1 flex flex-row gap-2 bg-[#F5F7FA] border-t-[0.5px] border-gray-300 px-7 py-6">
            <div className='w-20 h-20 mr-1'>
              <Image src="/minor-demat/arrow.png" alt="Value-Added Features" width={24} height={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-poppins text-[18px] font-medium text-black">Value-Added Features</h3>
              </div>
              <p className="font-poppins text-[16px] text-gray-600">Get exclusive access to economic calendars, fundamental & technical analysis tools, expert research reports, and more to make informed investment decisions.</p>
            </div>
          </div>
          <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
          {/* Box 2 */}
          <div className="flex-1 flex flex-row gap-2 bg-[#F5F7FA] border-t-[0.5px] border-gray-300 px-7 py-6">
            <div className='w-20 h-20 mr-1'>
              <Image src="/minor-demat/pointer.png" alt="Easy & Hassle-Free Process" width={24} height={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-poppins text-[18px] font-medium text-black">Easy & Hassle-Free Process</h3>
              </div>
              <p className="font-poppins text-[16px] text-gray-600">Enjoy a completely online account opening experience - simple, paperless, and stress-free.</p>
            </div>
          </div>
          <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
          {/* Box 3 */}
          <div className="flex-1 flex flex-row gap-2 bg-[#F5F7FA] border-t-[0.5px] border-gray-300 px-7 py-6">
            <div className='w-20 h-20 mr-1'>
              <Image src="/minor-demat/coins.png" alt="Best Savings Plan for Your Child" width={24} height={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-poppins text-[18px] font-medium text-black">Best Savings Plan for Your Child</h3>
              </div>
              <p className="font-poppins text-[16px] text-gray-600">Open a minor account with no minimum balance, and start investing in mutual funds early to support your child's future dreams.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}