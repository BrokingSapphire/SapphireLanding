
  import Charges from '@/components/pricing/Charges'
  import React from 'react'
  import CustomTable from '@/components/pricing/CustomTable'
import { accountData, mtfData, nonTradeChargesData, sapphireChargesData } from '@/constants/pricing'
import { BigCustomTable } from '@/components/pricing/BigCustomTable'
import Opportunities from '@/components/product/Opportunities'
import CustomHero from '@/components/CustomHero'

  const Home = () => {
    return (
      <div>
        <CustomHero
          title="Smart Investments, Transparent Pricing: Your <br /> Journey to
              Financial Freedom Starts Here"
          description="Streamline costs effortlessly, gain clarity in financial planning, and make smarter decisions with simplified tools designed to optimize budgets, enhance savings, and empower you to achieve long-term financial success with confidence."
          img="pricing-line.svg"
        />

        <Charges />
        <BigCustomTable heading="Sapphire Charges" data={sapphireChargesData} />
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
        </div>
        <Opportunities />
      </div>
    );
  }

  export default Home