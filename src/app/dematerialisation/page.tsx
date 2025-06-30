'use client';

import React from 'react';
import Image from 'next/image';

const DematerializationPage: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Open a Demat Account',
      description: 'Choose a DP, submit KYC documents, and receive your Demat Account Number after verification.'
    },
    {
      number: '02',
      title: 'Submit Dematerialisation Request',
      description: 'Fill the DRF, submit physical certificates against request. The entire ensuring name matches Demat account.'
    },
    {
      number: '03',
      title: 'Verification and Processing',
      description: 'DP sends documents to RTA, certificates are verified before approval for electronic conversion.'
    },
    {
      number: '04',
      title: 'Shares Credited Digitally',
      description: 'Dematerialized shares are credited to your demat account by NSDL or CDSL within a week.'
    }
  ];

  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Got dusty share certificates lying around? Let's uncover their hidden value together!
              </h1>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  SEBI has phased out the use of physical share certificates — all trades must now 
                  be done in electronic (demat) form.
                </p>
                
                <p>
                  Whether you've purchased shares in the past or inherited them recently, you'll 
                  need to convert those paper certificates into a digital format before taking any 
                  action.
                </p>
                
                <p>
                  At Sapphire, we make this process seamless by assisting you with 
                  documentation, verification, and dematerialisation - ensuring your investments 
                  are secure, accessible, and ready for the modern market.
                </p>
              </div>
              
              <button className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg">
                Convert Your Physical Shares Now
              </button>
            </div>

            {/* Right Illustration */}
            <div className="flex items-center justify-center w-full h-full">
              <Image src="/dematerialization/first.svg" alt="Dematerialisation Illustration" width={400} height={400} className="w-full max-w-md h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Steps to Dematerialize Your Physical Share Certificates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-xl shadow p-0 border border-gray-200">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-start px-6 py-10 min-h-[260px] border-gray-200" style={{borderRight: index < steps.length - 1 ? '1px solid #E5E7EB' : 'none'}}>
                {/* Large Step Number Background */}
                <div className="text-[72px] font-semibold text-gray-300 leading-none mb-4 select-none">{step.number}</div>
                {/* Blue avatar for step 2 */}
                {index === 1 && (
                  <div className="absolute top-10 right-10">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full border-4 border-blue-400 shadow" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-black mb-2 z-10">{step.title}</h3>
                <p className="text-gray-700 text-base z-10">{step.description}</p>
              </div>
            ))}
          </div>

          
        </div>
      </div>

      {/* Why Dematerialization is Important */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Dematerialization is Important</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#E6F4F1] rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-700"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Improved Security</h3>
            <p className="text-gray-700">Dematerialisation eliminates the risks of losing physical certificates due to theft, misplacement, or damage. Your holdings are safely stored in electronic form under regulated depositories like NSDL or CDSL.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-[#E6F4F1] rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-700"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3" /></svg>
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Faster Transactions</h3>
            <p className="text-gray-700">Digital shares allow you to buy, sell, and transfer securities instantly without delays or paperwork. This ensures smooth, real-time trading and better opportunities in fast-moving markets.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-[#E6F4F1] rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-700"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Cost Efficiency</h3>
            <p className="text-gray-700">Holding shares in demat form reduces expenses like stamp duty, courier charges, and handling fees. It also minimizes administrative burdens and streamlines investment management for better cost control.</p>
          </div>
          {/* Card 4 */}
          <div className="bg-[#E6F4F1] rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-700"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M7 6h10M7 18h10" /></svg>
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Compliance & Convenience</h3>
            <p className="text-gray-700">SEBI regulations require listed securities to be held in demat form. It also makes it easier to monitor, update, and manage your portfolio anytime through your DP's digital platform.</p>
          </div>
          {/* Card 5 */}
          <div className="bg-[#E6F4F1] rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-700"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0V7a2 2 0 012-2h2a2 2 0 012 2v10" /></svg>
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Easy Portfolio Tracking</h3>
            <p className="text-gray-700">With all your holdings in one demat account, you can easily track, monitor, and manage your investments, dividends, and corporate actions through a single digital interface.</p>
          </div>
          {/* Card 6 */}
          <div className="bg-[#E6F4F1] rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-700"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Eco-Friendly & Paperless</h3>
            <p className="text-gray-700">Dematerialisation reduces paper usage and storage needs, making your investment process environmentally friendly while contributing to a cleaner, more sustainable financial ecosystem.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#234056]">Frequently Asked Questions (FAQs)</h2>
        <div className="divide-y divide-gray-200 border-t border-b">
          {/* FAQ 1 */}
          <button
            className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
            onClick={() => setOpenFAQ(openFAQ === 0 ? null : 0)}
            aria-expanded={openFAQ === 0}
          >
            <span className="text-lg font-medium text-black">What is dematerialisation?</span>
            <span className="text-2xl text-black">{openFAQ === 0 ? '−' : '+'}</span>
          </button>
          {openFAQ === 0 && (
            <div className="pb-6 pl-1 text-gray-700 text-base">
              Dematerialisation is the process of converting physical share certificates into electronic form, making them easier to manage, transfer, and trade.
            </div>
          )}

          {/* FAQ 2 */}
          <button
            className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
            onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
            aria-expanded={openFAQ === 1}
          >
            <span className="text-lg font-medium text-black">How long does dematerialisation take?</span>
            <span className="text-2xl text-black">{openFAQ === 1 ? '×' : '+'}</span>
          </button>
          {openFAQ === 1 && (
            <div className="pb-6 pl-1 text-gray-700 text-base">
              Typically, the process takes 2–3 weeks after submitting the required documents and share certificates to your Depository Participant (DP).
            </div>
          )}

          {/* FAQ 3 */}
          <button
            className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
            onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
            aria-expanded={openFAQ === 2}
          >
            <span className="text-lg font-medium text-black">Can I dematerialise shares with mismatched names?</span>
            <span className="text-2xl text-black">{openFAQ === 2 ? '−' : '+'}</span>
          </button>
          {openFAQ === 2 && (
            <div className="pb-6 pl-1 text-gray-700 text-base">
              Yes, but you may need to provide supporting documents such as an affidavit, name change certificate, or marriage certificate to prove the name change or correction.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DematerializationPage;