
  import Charges from '@/components/pricing/Charges'
  import React from 'react'
import ChargesTable  from '@/components/pricing/BigCustomTable'
import Opportunities from '@/components/product/Opportunities'
import Image from 'next/image'
  const Home = () => {
    return (
      <div>
             <div className="relative h-[400px] mt-10 w-full flex flex-col items-center justify-center mx-auto px-8">
               <Image 
                 src="/bg-image.png" 
                 alt="Decorative Image"
                 width={300} 
                 height={300} 
                 className="absolute top-8 left-0 " 
               />
       
               <div className="w-full space-y-5 text-center">
                 <span className="bg-[#E4FFEE] text-[#064D51] px-4 py-2 rounded-3xl">Pricing</span>
                 <div className="text-center font-semibold leading-tight text-6xl w-full">
                  Transparent Charges for  <br/> <span className="font-lobster-two pr-2 italic text-transparent bg-clip-text font-[400] bg-gradient-to-r from-[#14A5AD] to-[#21B906]">Hassle-Free</span> <span>Trading</span>
                 </div>
                 <div className="text-xl text-gray-heading w-full">
                 Transparent pricing designed for your success—no hidden fees, just growth.
                 </div>
               </div>
             </div>
        <div className='py-12 bg-[#F5F7FA]'>
        <Charges />
        </div>
        <ChargesTable/>
        {/* <BigCustomTable heading="Sapphire Charges" data={sapphireChargesData} />
        <div className="flex flex-col space-y-16 mt-16 mb-16">
          <CustomTable heading="Account Opening Changes" data={accountData} />
          <CustomTable heading="Non Trade Charges" data={nonTradeChargesData} />
          <CustomTable heading="MTF Changes" data={mtfData} />
        </div>
        <div className="w-full max-w-6xl mb-8 mx-auto">
          <div className="bg-gray-50 rounded-lg border p-6">
            <h3 className="text-xl font-bold mb-4">Disclaimer</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                For Delivery based trades, a minimum of ₹2.5 will be charged per
                contract note. Clients who opt to receive physical contract
                notes will be charged ₹20 per contract note plus courier
                charges. Brokerage will not exceed the rates specified by SEBI
                and the exchanges. All statutory and regulatory charges will be
                levied at actuals. Brokerage is also charged on expired,
                exercised, and assigned options contracts.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Free investments are available only for our retail individual
                clients. Companies, Partnerships, Trusts, and HUFs need to pay
                0.5% or ₹20 (whichever is less), capped minimum to ₹2.5 as
                delivery brokerage. A brokerage of 0.25% of the contract value
                will be charged for contracts where physical delivery happens.
                For netted off positions in physically settled contracts, a
                brokerage of 0.8% will be charged.
              </p>
            </div>
          </div>
        </div> */}
        <Opportunities />
      </div>
    );
  }

  export default Home