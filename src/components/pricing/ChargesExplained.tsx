import React from 'react';

const ChargesExplained: React.FC = () => {
  return (
    <div className='flex flex-col justify-start gap-y-6 py-[42px] max-w-7xl mx-auto'>
      <h1 className='font-lexend font-semibold text-2xl mb-[8px]'>Charges explained</h1>
      
      {/* Securities/Commodities transaction tax */}
      <div className='rounded-lg'>
        <h2 className='font-lexend font-normal text-2xl mb-3 text-gray-900'>Securities/Commodities transaction tax</h2>
        <div className='space-y-3'>
          <p className='text-[#636363] text-base leading-relaxed'>
            Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.
          </p>
          <p className='text-[#636363] text-base leading-relaxed'>
            When trading at Sapphire, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.
          </p>
        </div>
      </div>

      {/* Transaction/Turnover Charges */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Transaction/Turnover Charges</h2>
        <p className='text-[#636363] text-base'>
          Charged by exchanges (NSE, BSE, MCX, and NCDEX) on the value of your transactions.
        </p>
        
        <div className='space-y-4'>
          <p className='text-[#636363] text-base leading-relaxed'>
            BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)
          </p>
          
          <p className='text-[#636363] text-base leading-relaxed'>
            BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.
          </p>
          
          <p className='text-[#636363] text-base leading-relaxed'>
            BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.
          </p>
          
          <p className='text-[#636363] text-base leading-relaxed'>
            BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.
          </p>
        </div>
      </div>

      {/* Call & trade */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Call & trade</h2>
        <p className='text-[#636363] text-base'>
          Additional charges of ₹50 per order for orders placed through a dealer at Sapphire including auto square off orders.
        </p>
      </div>

      {/* Stamp charges */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Stamp charges</h2>
        <p className='text-[#636363] text-base leading-relaxed'>
          Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.
        </p>
      </div>

      {/* NRI brokerage charges */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>NRI brokerage charges</h2>
        <div className='space-y-2'>
          <div className='flex items-center'>
            <div className='flex justify-center items-center w-6 h-6 bg-[#E6FFED] rounded-full mr-3 flex-shrink-0'> 
                <div className='w-3 h-3 bg-[#91E8AACC] rounded-full'></div>
            </div>
            <p className='text-[#636363] text-base'>₹100 per order for futures and options.</p>
          </div>
          <div className='flex items-start'>
            <div className='flex justify-center items-center w-6 h-6 bg-[#E6FFED] rounded-full mr-3 flex-shrink-0'> 
                <div className='w-3 h-3 bg-[#91E8AACC] rounded-full'></div>
            </div>
            <p className='text-[#636363] text-base'>For a non-PIS account, 0.05% or ₹100 per executed order for equity (whichever is lower).</p>
          </div>
          <div className='flex items-start'>
            <div className='flex justify-center items-center w-6 h-6 bg-[#E6FFED] rounded-full mr-3 flex-shrink-0'> 
                <div className='w-3 h-3 bg-[#91E8AACC] rounded-full'></div>
            </div>
            <p className='text-[#636363] text-base'>For a PIS account, 0.05% or ₹200 per executed order for equity (whichever is lower).</p>
          </div>
          <div className='flex items-start'>
            <div className='flex justify-center items-center w-6 h-6 bg-[#E6FFED] rounded-full mr-3 flex-shrink-0'> 
                <div className='w-3 h-3 bg-[#91E8AACC] rounded-full'></div>
            </div>
            <p className='text-[#636363] text-base'>₹500 + GST as yearly account maintenance charges (AMC) charges.</p>
          </div>
        </div>
      </div>

      {/* Account with debit balance */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Account with debit balance</h2>
        <p className='text-[#636363] text-base'>
          If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.
        </p>
      </div>

      {/* Charges for Investor's Protection Fund Trust (IPFT) by NSE */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Charges for Investor&apos;s Protection Fund Trust (IPFT) by NSE</h2>
        <div className='space-y-2'>
          <div className='flex items-start'>
            <div className='flex justify-center items-center w-6 h-6 bg-[#E6FFED] rounded-full mr-3 flex-shrink-0'> 
                <div className='w-3 h-3 bg-[#91E8AACC] rounded-full'></div>
            </div>
            <p className='text-[#636363] text-base'>Equity and Futures - ₹10 per crore + GST of the traded value.</p>
          </div>
          <div className='flex items-start'>
            <div className='flex justify-center items-center w-6 h-6 bg-[#E6FFED] rounded-full mr-3 flex-shrink-0'> 
                <div className='w-3 h-3 bg-[#91E8AACC] rounded-full'></div>
            </div>
            <p className='text-[#636363] text-base'>Options - ₹50 per crore + GST traded value (premium value).</p>
          </div>
          <div className='flex items-start'>
            <div className='flex justify-center items-center w-6 h-6 bg-[#E6FFED] rounded-full mr-3 flex-shrink-0'> 
                <div className='w-3 h-3 bg-[#91E8AACC] rounded-full'></div>
            </div>
            <p className='text-[#636363] text-base'>Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.</p>
          </div>
        </div>
      </div>

      {/* GST */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>GST</h2>
        <p className='text-[#636363] text-base'>
          Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)
        </p>
      </div>

      {/* SEBI Charges */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>SEBI Charges</h2>
        <p className='text-[#636363] text-base'>
          Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.
        </p>
      </div>

      {/* Pledging charges */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Pledging charges</h2>
        <p className='text-[#636363] text-base'>
          ₹25 + GST per pledge request per ISIN.
        </p>
      </div>

      {/* Corporate action order charges */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Corporate action order charges</h2>
        <p className='text-[#636363] text-base'>
          ₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.
        </p>
      </div>

      {/* Off-market transfer charges */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Off-market transfer charges</h2>
        <p className='text-[#636363] text-base'>
          ₹50 / outgoing transaction.
        </p>
      </div>

      {/* Physical CMR request */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Physical CMR request</h2>
        <p className='text-[#636363] text-base'>
          First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.
        </p>
      </div>

      {/* Payment gateway charges */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Payment gateway charges</h2>
        <p className='text-[#636363] text-base'>
          ₹9 + GST (Not levied on transfers done via UPI)
        </p>
      </div>

      {/* Delayed Payment Charges */}
      <div className='space-y-4'>
        <h2 className='font-lexend font-normal text-2xl text-gray-900'>Delayed Payment Charges</h2>
        <p className='text-[#636363] text-base'>
          Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account. <span className='text-blue-600 underline cursor-pointer'>Learn more</span>
        </p>
      </div>
    </div>
  );
};

export default ChargesExplained;