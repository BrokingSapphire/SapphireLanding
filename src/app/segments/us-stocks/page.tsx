"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Can I invest in US stocks from India through Sapphire Broking?',
    answer:
      'Yes, Indian investors and NRIs can invest in US stocks and ETFs through Sapphire Broking, powered by Vested.',
  },
  {
    question: 'Is there a minimum investment amount required?',
    answer:
      'You can start investing with as little as $1, thanks to fractional investing.',
  },
  {
    question: 'Are my investments in US stocks safe?',
    answer:
      'Your investments are held with a US SEC-registered advisor and are protected by regulatory safeguards.',
  },
];

export default function UsStocksPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white py-10 sm:py-14 lg:py-10 w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between relative w-full min-h-[240px] md:min-h-[340px] px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
            {/* Left Content */}
            <div className="z-10 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl pt-8 md:pt-0 pl-0 md:pl-8 lg:pl-8 xl:pl-15 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 font-lexend">
                Invest in US Stocks with Confidence
              </h1>
              <div className="space-y-3 sm:space-y-4 text-gray-600 mb-5 sm:mb-6">
                <p className='text-base sm:text-lg md:text-xl'>
                  Invest in the world’s leading companies like Apple, Amazon, Microsoft, Tesla, and Google through the Sapphire Broking app.
                </p>
                <p className='text-base sm:text-lg md:text-xl'>
                  Powered by Vested, our platform gives you seamless access to US stocks and ETFs. Start your global investment journey today — simple, secure, and tailored for Indian investors and NRIs.
                </p>
              </div>
              <button className="bg-[#064D51] hover:bg-teal-800 text-white px-6 sm:px-8 py-3 sm:py-[14px] rounded-lg font-semibold transition-colors shadow-lg w-full md:w-auto">
                Explore more
              </button>
            </div>
            {/* Right Side - IPO Images */}
            <div className="relative w-full flex justify-center md:justify-end mb-6 md:mb-0 md:w-auto">
              <Image
                src="/us-stocks/image.png"
                alt="IPO Frame"
                width={461}
                height={308}
                className="w-[300px] sm:w-[380px] md:w-[420px] lg:w-[461px] h-auto max-h-[308px]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Why Invest Section */}
        <section id="why-invest" className="bg-gray-100 py-14 px-20 md:px-2">
          <div className="max-w-7xl px-20 mx-6">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Invest in US Stocks via Sapphire</h2>
            <p className="text-lg text-gray-700 mb-2">Invest in US stocks and ETFs easily through the Sapphire Broking app, powered by Vested, a US SEC-registered advisor. Indian investors and NRIs can access global markets with a trusted platform and expert-backed portfolios.</p>
            <p className="text-lg text-gray-600 mb-8">Start your global investing journey today with Sapphire Broking.</p>
            <div className="hidden md:block border-t border-gray-300"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">
              <div className="flex flex-col items-start px-0 md:px-8 py-8 md:py-0">
                <div className="pt-6 w-full flex items-center">
                  <Image src="/us-stocks/1st.svg" alt="Curated Portfolios" width={24} height={24} className="mb-4" />
                </div>
                <div className="font-poppins text-[18px] text-regular mb-1 text-black">Readymade Curated Portfolios</div>
                <div className="text-regular font-poppins text-[16px] text-[#717171]">Diversify easily with expertly designed portfolios (Vests) tailored to different investment goals and risk profiles.</div>
              </div>
              <div className="flex flex-col items-start px-0 md:px-8 py-8 md:py-0">
                <div className="pt-6 w-full flex items-center">
                  <Image src="/us-stocks/2nd.svg" alt="Easy Digital Account Opening" width={24} height={24} className="mb-4" />
                </div>
                <div className="font-poppins text-[18px] text-regular mb-1 text-black">Easy Digital Account Opening</div>
                <div className="text-regular font-poppins text-[16px] text-[#717171]">Get started in just minutes with our fully digital onboarding process. Open your account quickly and enjoy simplified fund transfer capabilities.</div>
              </div>
              <div className="flex flex-col items-start px-0 md:px-8 py-8 md:py-0">
                <div className="pt-6 w-full flex items-center">
                  <Image src="/us-stocks/3rd.svg" alt="Fractional Investing" width={24} height={24} className="mb-4" />
                </div>
                <div className="font-poppins text-[18px] text-regular mb-1 text-black">Fractional Investing</div>
                <div className="text-regular font-poppins text-[16px] text-[#717171]">Invest in top companies like Amazon and Google without buying a full share. Start with as little as $1 and build your portfolio at your pace.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Calculators */}
        <section className="py-10 px-10 md:px-20">
          <h3 className="text-2xl font-bold mb-8 px-5 text-gray-900">Explore Calculators</h3>
          <div className="grid grid-cols-1 px-8 md:grid-cols-3 gap-8">
            <Link href="/calculators/sip" className="group">
              <div className="bg-[#F7F9FB] rounded-lg shadow-sm hover:shadow-md transition flex items-center px-4 py-6 cursor-pointer w-full h-full">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#F1F3F6] mr-6">
                  <Image src="/us-stocks/calculator.png" alt="SIP Calculator" width={54} height={54} />
                </div>
                <div className="flex-1">
                  <div className="font-poppins text-[18px] text-regular  text-black mb-1">SIP Calculator</div>
                  <div className="font-poppins text-[16px] text-regular text-[#717171] truncate whitespace-nowrap">Plan smart monthly SIPs</div>
                </div>
                <div className="ml-0 group-hover:translate-x-1 transition-transform">
                  <Image src="/us-stocks/rightarrow.svg" alt="Right Arrow" width={24} height={24} />
                </div>
              </div>
            </Link>
            <Link href="/calculators/brokerage" className="group">
              <div className="bg-[#F7F9FB] rounded-lg shadow-sm hover:shadow-md transition flex items-center px-4 py-6 cursor-pointer w-full h-full">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#F1F3F6] mr-6">
                  <Image src="/us-stocks/calculator.png" alt="Brokerage Calculator" width={54} height={54} />
                </div>
                <div className="flex-1">
                  <div className="font-poppins text-[18px] text-regular text-black mb-1">Brokerage Calculator</div>
                  <div className="font-poppins text-[16px] text-regular text-[#717171] truncate whitespace-nowrap">Calculate brokerage in seconds</div>
                </div>
                <div className="ml-0 group-hover:translate-x-1 transition-transform">
                  <Image src="/us-stocks/rightarrow.svg" alt="Right Arrow" width={24} height={24} />
                </div>
              </div>
            </Link>
            <Link href="/calculators/margin" className="group">
              <div className="bg-[#F7F9FB] rounded-lg shadow-sm hover:shadow-md transition flex items-center px-4 py-6 cursor-pointer w-full h-full">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#F1F3F6] mr-6">
                  <Image src="/us-stocks/calculator.png" alt="Margin Calculator" width={54} height={54} />
                </div>
                <div className="flex-1">
                  <div className="font-poppins text-[18px] text-regular text-black mb-1">Margin Calculator</div>
                  <div className="font-poppins text-[16px] text-regular text-[#717171] truncate whitespace-nowrap">Check required trading margin</div>
                </div>
                <div className="ml-0 group-hover:translate-x-1 transition-transform">
                  <Image src="/us-stocks/rightarrow.svg" alt="Right Arrow" width={24} height={24} />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="w-full mb-6 sm:mb-8 lg:mb-10 mt-2 px-4 sm:px-8 lg:px-14 py-6 sm:py-8 lg:py-12">
          <div className="max-w-6xl mx-auto flex flex-col space-y-3 sm:space-y-4 lg:space-y-6 items-center justify-center">
            <h1 className="font-lexend text-2xl sm:text-3xl lg:text-4xl font-medium text-center px-2">
              Frequently Asked Questions (FAQs)
            </h1>
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-2 sm:space-y-3 mt-3 sm:mt-4 lg:mt-6"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="py-1 sm:py-2"
                >
                  <AccordionTrigger className="font-lexend text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[24px] hover:no-underline text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-lexend font-normal text-gray-600 text-xs sm:text-sm md:text-base lg:text-[18px] xl:text-[20px] leading-relaxed pr-2 sm:pr-4 lg:pr-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
