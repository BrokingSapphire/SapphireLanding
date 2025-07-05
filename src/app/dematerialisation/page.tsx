'use client';

import React from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DematerializationPage: React.FC = () => {
  const steps = [
    {
      image: './dematerialization/01.svg',
      title: 'Open a Demat Account',
      description: 'Choose a DP, submit KYC documents, and receive your Demat Account Number after verification.'
    },
    {
      image: './dematerialization/02.svg',
      title: 'Submit Dematerialisation Request',
      description: 'Fill the DRF, submit physical certificates against request. The entire ensuring name matches Demat account.'
    },
    {
      image: './dematerialization/03.svg',
      title: 'Verification and Processing',
      description: 'DP sends documents to RTA, certificates are verified before approval for electronic conversion.'
    },
    {
      image: './dematerialization/04.svg',
      title: 'Shares Credited Digitally',
      description: 'Dematerialized shares are credited to your demat account by NSDL or CDSL within a week.'
    }
  ];

  const dematerializationFAQs = [
    {
      question: "What is dematerialisation?",
      answer: "You can open your account online in minutes by submitting your PAN card, Aadhaar, and bank details, or visit our office for assistance."
    },
    {
      question: "How long does dematerialisation take?",
      answer: "Typically, the process takes 2 to 3 weeks after submitting the required documents and share certificates to your Depository Participant (DP)."
    },
    {
      question: "Can I dematerialise shares with mismatched names?",
      answer: "Yes, we are SEBI-registered and comply with all regulatory guidelines to ensure the security of your investments."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-20 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-3xl mt-10 font-bold text-gray-900 leading-tight">
                Got dusty share certificates lying around? Let&apos;s uncover their hidden value together!
              </h1>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  SEBI has phased out the use of physical share certificates — all trades must now 
                  be done in electronic (demat) form.
                </p>
                
                <p>
                  Whether you&apos;ve purchased shares in the past or inherited them recently, you&apos;ll 
                  need to convert those paper certificates into a digital format before taking any 
                  action.
                </p>
                
                <p>
                  At Sapphire, we make this process seamless by assisting you with 
                  documentation, verification, and dematerialisation - ensuring your investments 
                  are secure, accessible, and ready for the modern market.
                </p>
              </div>
              
              <button className="bg-[#064D51] hover:bg-teal-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
                Convert Your Physical Shares Now
              </button>
            </div>

            {/* Right Illustration */}
            <div className="flex items-center justify-center w-full h-full">
              <Image src="/dematerialization/first.svg" alt="Dematerialisation Illustration" width={600} height={600} className="w-full max-w-md h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-white py-10 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F5F7FA] py-16 pb-8">
          <div className="text-center mb-16 pl-5">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex text-start pl-20">
              Steps to Dematerialize Your Physical Share Certificates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 p-0 px-20">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-start px-6 min-h-[200px]" style={{
                borderRight: index < steps.length - 1 ? '1px solid #E5E7EB' : 'none',
                borderLeft: '2px solid #E5E7EB'
              }}>
                {/* Step Image */}
                <div className="mb-6 -ml-4">
                  <Image className="h-25 w-25" src={step.image.replace('./', '/')} alt={step.title} width={100} height={100} />
                </div>
                <h3 className="text-lg font-lexend font-regular text-black mb-2 z-10">{step.title}</h3>
                <p className="text-gray-700 text-[16px] z-10">{step.description}</p>
              </div>
            ))}
          </div>

          
        </div>
      </div>

      {/* Why Dematerialization is Important */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Dematerialization is Important</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4 bg-[#E6F4F1] h-10 w-10 flex items-center justify-center">
              <Image className="h-7 w-7" src="/dematerialization/1.svg" alt="" width={28} height={28} />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Improved Security</h3>
            <p className="text-gray-700">Dematerialisation eliminates the risks of losing physical certificates due to theft, misplacement, or damage. Your holdings are safely stored in electronic form under regulated depositories like NSDL or CDSL.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4 bg-[#E6F4F1] h-10 w-10 flex items-center justify-center">
              <Image className="h-7 w-7" src="/dematerialization/2.svg" alt="" width={28} height={28} />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Faster Transactions</h3>
            <p className="text-gray-700">Digital shares allow you to buy, sell, and transfer securities instantly without delays or paperwork. This ensures smooth, real-time trading and better opportunities in fast-moving markets.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4 bg-[#E6F4F1] h-10 w-10 flex items-center justify-center">
              <Image className="h-7 w-7" src="/dematerialization/3.svg" alt="" width={28} height={28} />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Cost Efficiency</h3>
            <p className="text-gray-700">Holding shares in demat form reduces expenses like stamp duty, courier charges, and handling fees. It also minimizes administrative burdens and streamlines investment management for better cost control.</p>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4 bg-[#E6F4F1] h-10 w-10 flex items-center justify-center">
              <Image className="h-7 w-7" src="/dematerialization/4.svg" alt="" width={28} height={28} />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Compliance & Convenience</h3>
            <p className="text-gray-700">SEBI regulations require listed securities to be held in demat form. It also makes it easier to monitor, update, and manage your portfolio anytime through your DP&apos;s digital platform.</p>
          </div>
          {/* Card 5 */}
          <div className="bg-white rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4 bg-[#E6F4F1] h-10 w-10 flex items-center justify-center">
              <Image className="h-7 w-7" src="/dematerialization/5.svg" alt="" width={28} height={28} />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Easy Portfolio Tracking</h3>
            <p className="text-gray-700">With all your holdings in one demat account, you can easily track, monitor, and manage your investments, dividends, and corporate actions through a single digital interface.</p>
          </div>
          {/* Card 6 */}
          <div className="bg-white rounded-lg p-6 flex flex-col h-full">
            <div className="mb-4 bg-[#E6F4F1] h-10 w-10 flex items-center justify-center">
              <Image className="h-7 w-7" src="/dematerialization/6.svg" alt="" width={28} height={28} />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Eco-Friendly & Paperless</h3>
            <p className="text-gray-700">Dematerialisation reduces paper usage and storage needs, making your investment process environmentally friendly while contributing to a cleaner, more sustainable financial ecosystem.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full mb-10 mt-2 px-14 sm:px-6 py-8 sm:p-12">
        <div className="max-w-6xl mx-auto flex flex-col space-y-4 sm:space-y-6 items-center justify-center">
          <h1 className="font-lexend text-3xl sm:text-4xl font-medium text-center">
            Frequently Asked Questions (FAQs)
          </h1>

          <Accordion
            type="single"
            collapsible
            className="w-full space-y-2 sm:space-y-3 mt-4 sm:mt-6"
          >
            {dematerializationFAQs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="py-1 sm:py-2"
              >
                <AccordionTrigger className="font-lexend text-sm sm:text-lg md:text-[24px] hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-lexend font-normal text-gray-600 text-sm sm:text-base md:text-[20px] leading-relaxed pr-2 sm:pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DematerializationPage;