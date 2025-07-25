

import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HUF Demat Account | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Open a HUF Demat and Trading Account with Sapphire Broking. Understand eligibility, required documents, and the complete process to invest in the stock market under a Hindu Undivided Family structure. Enjoy expert support and seamless onboarding.",
  keywords:
    "HUF demat account, Hindu Undivided Family demat account, open HUF trading account, HUF account opening process, documents for HUF demat account, HUF account in stock market, Sapphire Broking HUF account, HUF investment account, HUF Karta demat, stock trading under HUF, how to open HUF demat account, HUF PAN card for demat, HUF account online, HUF trading benefits, HUF income from capital market, joint family investment account",
  openGraph: {
    title: "HUF Demat Account | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Looking to open a Demat and Trading Account for your Hindu Undivided Family? Sapphire Broking offers complete guidance, eligibility criteria, and document checklist to start investing as a HUF.",
    url: "https://www.sapphirebroking.com/huf-demat-account",
    images: [
      {
        url: "https://www.sapphirebroking.com/logo-white.svg",
        alt: "Sapphire Broking Logo",
      },
    ],
    type: "website",
  },
};

const faqs = [
    {
        question: 'Who can open an HUF Demat Account?',
        answer: 'An HUF Demat Account can be opened by the Karta, who manages and operates it on behalf of the entire Hindu Undivided Family.'
    },
    {
        question: 'What documents are required to open an HUF Demat Account?',
        answer: "Documents include PAN of HUF, Karta's PAN and Aadhaar, HUF declaration deed, address proof, and bank account proof in the HUF's name."
    },
    {
        question: 'Can members other than the Karta operate the HUF Demat Account?',
        answer: 'No, only the Karta is authorized to operate the HUF Demat Account. Other members cannot transact or manage the account independently.'
    }
];

export default function HufDematAccountPage() {
    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Hero Section - US Stocks / IPO / Dematerialisation style */}
            <div className="bg-white py-10 sm:py-14 lg:py-16 w-full mt-20">
                <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative w-full min-h-[240px] md:min-h-[340px] px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
                    {/* Left Content */}
                    <div className="z-10 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl pt-8 md:pt-0 pl-0 md:pl-8 lg:pl-8 xl:pl-15 text-center md:text-left">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-tight mb-3 sm:mb-4 font-lexend">
                            Secure Your Family’s Wealth with a <br />
                            <span className="text-black">Sapphire HUF Demat Account.</span>
                        </h1>
                        <div className="space-y-3 sm:space-y-4 text-gray-600 mb-5 sm:mb-6 text-base sm:text-lg md:text-xl font-poppins font-normal">
                            <p>
                                Why limit your family’s financial growth to traditional savings when you can invest collectively and grow wealth under a single umbrella?
                            </p>
                            <p>
                                At Sapphire, we offer a dedicated HUF Demat Account designed for Hindu Undivided Families to invest, manage, and grow assets together. Whether you’re managing inherited wealth or building a legacy for future generations, our platform makes it simple, compliant, and tax-efficient. With complete transparency and flexibility, you can now empower your family to invest smarter — together.
                            </p>
                        </div>
                        <Link href="/signup">
                            <button className="bg-[#064D51] hover:bg-teal-800 text-white px-6 sm:px-8 py-3 sm:py-[14px] rounded-lg font-semibold transition-colors shadow-lg w-full md:w-auto">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                    {/* Right Side - Illustration */}
                    <div className="relative w-full flex justify-center md:justify-end mb-6 md:mb-0 md:w-auto">
                        <Image
                            src="/huf-demat-account/image.png"
                            alt="HUF Demat Illustration"
                            width={420}
                            height={420}
                            className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-[420px] h-auto max-h-[420px] object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Reasons to Choose Us */}
            <div className="w-full bg-[#F5F7FA] flex flex-col gap-6 py-12 px-4 sm:px-10 md:px-20">
                <div className="flex items-center justify-center">
                    <div className="font-lexend text-[32px] font-medium text-black text-center">Reasons to Choose Us</div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-0 md:gap-0">
                    {/* Box 1 */}
                    <div className="flex-1 flex flex-row gap-2 bg-[#F5F7FA] border-t-[0.5px] border-gray-300 px-7 py-6">
                        <div className='w-20 h-20 mr-1'>
                            <Image src="/us-stocks/1st.svg" alt="Collective Wealth Management" width={24} height={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-poppins text-[18px] font-medium text-black">Collective Wealth Management</h3>
                            </div>
                            <p className="font-poppins text-[16px] text-gray-600">Manage family investments under one account. Invest in stocks, mutual funds, ETFs, and bonds while maintaining HUF structure and tax benefits.</p>
                        </div>
                    </div>
                    <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
                    {/* Box 2 */}
                    <div className="flex-1 flex flex-row gap-2 bg-[#F5F7FA] border-t-[0.5px] border-gray-300 px-7 py-6">
                        <div className='w-20 h-20 mr-1'>
                            <Image src="/us-stocks/2nd.svg" alt="Seamless Online Setup" width={24} height={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-poppins text-[18px] font-medium text-black">Seamless Online Setup</h3>
                            </div>
                            <p className="font-poppins text-[16px] text-gray-600">Open your HUF Demat Account completely online. Quick, paperless onboarding designed to minimize effort and maximize convenience.</p>
                        </div>
                    </div>
                    <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
                    {/* Box 3 */}
                    <div className="flex-1 flex flex-row gap-2 bg-[#F5F7FA] border-t-[0.5px] border-gray-300 px-7 py-6">
                        <div className='w-20 h-20 mr-1'>
                            <Image src="/us-stocks/3rd.svg" alt="Built for Legacy & Compliance" width={24} height={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-poppins text-[18px] font-medium text-black">Built for Legacy & Compliance</h3>
                            </div>
                            <p className="font-poppins text-[16px] text-gray-600">Operate under the Karta’s authority, ensuring legal compliance and smooth wealth distribution across generations — all while optimizing tax planning.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Steps/How it Works Section - Minor Demat style with color gradient */}
            <div className='w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-20'>
                {/* Main heading */}
                <div className="w-full flex justify-center mt-12">
                    <div className="font-lexend text-[24px] sm:text-[28px] md:text-[32px] font-medium text-black text-center max-w-3xl mx-auto">Ready to open a HUF Demat Account?</div>
                </div>
                <div
                    className="w-full max-w-7xl rounded-[32px] md:rounded-[64px] lg:mt-16 xl:mt-16 2xl:mt-16 mt-5 px-4 sm:px-8 md:px-0 py-10 md:py-0 flex flex-col items-center justify-center pb-10"
                    style={{
                        background: 'linear-gradient(173.66deg, rgba(255,255,255,0.2) 0.86%, rgba(255,222,85,0.06) 55.98%, rgba(163,247,148,0.16) 95.84%)'
                    }}
                >
                    {/* Steps */}
                    <div className="hidden md:flex flex-row justify-between items-start gap-8 md:gap-[61px] w-full max-w-7xl px-5">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center w-full md:w-[328px] mb-8 md:mb-0">
                            <div className="w-[48px] h-[48px] rounded-full  flex items-center justify-center mb-[12px]">
                                <Image src="/huf-demat-account/1.png" alt="1" width={48} height={48} className="object-contain" />
                            </div>
                            <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] sm:text-[18px] text-black">Karta Setup</div>
                            <div className="w-full text-center font-poppins text-[14px] text-[#717171]">Add the HUF Karta’s basic information like name, PAN, Aadhaar, and contact number. This helps verify the Karta’s identity as the primary representative of the HUF.</div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center w-full md:w-[328px] mb-8 md:mb-0">
                            <div className="w-[48px] h-[48px] rounded-full  flex items-center justify-center mb-[12px]">
                                <Image src="/huf-demat-account/2.png" alt="2" width={48} height={48} className="object-contain" />
                            </div>
                            <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] sm:text-[18px] text-black">HUF Details & Documents</div>
                            <div className="w-full text-center font-poppins text-[14px] text-[#717171]">Provide HUF details such as HUF PAN, Deed or Declaration, and the HUF bank account details. You’ll also need to upload documents like the Karta’s PAN, Aadhaar, and a recent photo.</div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center w-full md:w-[328px]">
                            <div className="w-[48px] h-[48px] rounded-full  flex items-center justify-center mb-[12px]">
                                <Image src="/huf-demat-account/3.png" alt="3" width={48} height={48} className="object-contain" />
                            </div>
                            <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] sm:text-[18px] text-black">eSign & Activate</div>
                            <div className="w-full text-center font-poppins text-[14px] text-[#717171]">Complete the eSign process using Aadhaar OTP (of the Karta). Once verified, the HUF Demat Account will be created and ready to use.</div>
                        </div>
                    </div>
                    {/* Mobile: simple stacked steps, no card */}
                    <div className="flex flex-col md:hidden gap-8 w-full mt-2">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center w-full">
                            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-[12px]">
                                <Image src="/huf-demat-account/1.png" alt="1" width={48} height={48} className="object-contain" />
                            </div>
                            <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] text-black">Karta Setup</div>
                            <div className="w-full text-center font-poppins text-[14px] text-[#717171]">Add the HUF Karta’s basic information like name, PAN, Aadhaar, and contact number. This helps verify the Karta’s identity as the primary representative of the HUF.</div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center w-full">
                            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-[12px]">
                                <Image src="/huf-demat-account/2.png" alt="2" width={48} height={48} className="object-contain" />
                            </div>
                            <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] text-black">HUF Details & Documents</div>
                            <div className="w-full text-center font-poppins text-[14px] text-[#717171]">Provide HUF details such as HUF PAN, Deed or Declaration, and the HUF bank account details. You’ll also need to upload documents like the Karta’s PAN, Aadhaar, and a recent photo.</div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center w-full">
                            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-[12px]">
                                <Image src="/huf-demat-account/3.png" alt="3" width={48} height={48} className="object-contain" />
                            </div>
                            <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] text-black">eSign & Activate</div>
                            <div className="w-full text-center font-poppins text-[14px] text-[#717171]">Complete the eSign process using Aadhaar OTP (of the Karta). Once verified, the HUF Demat Account will be created and ready to use.</div>
                        </div>
                    </div>
                    {/* Sign Up Button */}
                    <div className="flex justify-center mt-[34px] md:mt-[34px] w-full mb-[28px]">
                        <Link href="/signup" className="flex items-center gap-2 bg-[#064D51] hover:bg-teal-800 rounded-[6px] px-8 py-3 cursor-pointer transition-opacity mx-auto">
                            <span className="font-poppins font-medium text-[14px] text-white">Sign Up</span>
                            <ArrowRight size={16} color="#fff" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* How Does HUF Demat Account Work? (refined positioning) */}
            <div className="bg-white py-14 px-4 sm:px-6 lg:px-20 lg:mt-20 xl:mt-20 2xl:mt-20 -mt-10 sm:mt-0 sm:pt-5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 items-center">
                    {/* Left: Text and How it works SVG */}
                    <div className="relative flex flex-col justify-center md:col-span-3">
                        <div className="relative mb-2 min-h-[48px]">
                            <Image src="/huf-demat-account/how 1.svg" alt="How it works arrow" width={145} height={84} className="absolute -top-[5px] -left-2 hidden md:block" />
                        </div>
                        <div className='pl-0 md:pl-20'>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 mt-2 md:mt-0 text-left">How Does HUF Demat Account Work?</h3>
                            <p className="text-gray-600 text-lg sm:text-xl md:text-[20px] text-left">
                                Think of it as a shared family account for holding investments, managed by the Karta. When the HUF buys shares, they’re credited to the HUF’s Demat account. Sale proceeds go directly to the HUF’s linked bank account. As your Depository Participant (DP) with CDSL, Dhan ensures all electronic transactions, corporate actions, and pledges are securely managed and smoothly settled.
                            </p>
                        </div>
                    </div>
                    {/* Right: Illustration */}
                    <div className="flex justify-center items-center w-full h-full md:col-span-2 mt-8 md:mt-0">
                        <Image src="/huf-demat-account/image 67.png" alt="HUF Avatars" width={299} height={299} className="max-w-[299px] w-full h-auto" />
                    </div>
                </div>
            </div>

            {/* App Download Section */}
            {/* Desktop/Tablet Layout */}
            <div className="relative w-full h-[340px] bg-[#F5F7FA] overflow-hidden hidden lg:block">
                {/* Background Circle */}
                <div className="absolute" />
                {/* Mobile Phone Image - Half Cut */}
                <div
                    className="absolute w-[392px] h-[281px] z-10 overflow-hidden"
                    style={{
                        top: '59px',
                        left: '227px',
                    }}
                >
                    <Image
                        src="/huf-demat-account/mobile frame.png"
                        alt="Mobile App Screenshot"
                        width={281}
                        height={392}
                        className="w-full object-cover object-top"
                    />
                </div>
                {/* Scan QR Code Text */}
                <div
                    className="absolute z-20"
                    style={{
                        top: '146px',
                        left: '581px',
                        width: '265px',
                        height: '84px',
                    }}
                >
                    <h2
                        className="text-[28px] font-normal leading-[100%] ml-10 text-black"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            letterSpacing: '0%',
                        }}
                    >
                        Scan the QR to<br />
                        Download the app
                    </h2>
                </div>
                {/* QR Code */}
                <div
                    className="absolute z-20 ml-20 mb-4"
                    style={{
                        top: '95px',
                        left: '870px',
                    }}
                >
                    <Image
                        src="/minor-demat/qr.png"
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>
                {/* App Store Buttons */}
                <div
                    className="absolute z-20 flex flex-col ml-48 space-y-3"
                    style={{
                        top: '146px',
                        left: '1050px',
                    }}
                >
                    <Image
                        src="/appstore.svg"
                        alt="Download on App Store"
                        width={135}
                        height={30}
                        className="object-contain"
                    />
                    <Image
                        src="/playstore.svg"
                        alt="Get it on Google Play"
                        width={135}
                        height={45}
                        className="object-contain"
                    />
                </div>
            </div>
            {/* Tablet Layout (sm/md) */}
            <div className="w-full bg-[#F5F7FA] hidden sm:flex lg:hidden flex-row items-center justify-center py-8 px-4 gap-8">
                {/* Left: Phone image */}
                <div className="flex flex-col items-center flex-1 min-w-[160px] max-w-[220px]">
                    <div className="relative flex justify-center items-start mb-2" style={{ height: '140px', width: '100%' }}>
                        <div className="absolute left-1/2 -translate-x-1/2 top-[28px] w-[120px] h-[120px] bg-[#E6EBF2] rounded-full z-0 overflow-hidden" style={{ clipPath: 'inset(0 0 50% 0)' }}></div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-[12px] w-[120px] h-[130px] z-10 flex items-start justify-center">
                            <Image
                                src="/huf-demat-account/mobile frame.png"
                                alt="Mobile App Screenshot"
                                width={120}
                                height={130}
                                className="w-[120px] h-[130px] object-contain"
                            />
                        </div>
                    </div>
                    <h2
                        className="text-lg font-normal text-black text-center mt-2"
                        style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0%' }}
                    >
                        Scan the QR to<br />Download the app
                    </h2>
                </div>
                {/* Right: QR code and store buttons side by side */}
                <div className="flex flex-col items-center flex-1 gap-4 min-w-[160px] max-w-[220px]">
                    <div className="w-[120px] h-[120px] flex items-center justify-center mb-2">
                        <Image
                            src="/minor-demat/qr.png"
                            alt="QR Code"
                            width={120}
                            height={120}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <div className="flex flex-row gap-2 w-full items-center justify-center">
                        <Image
                            src="/appstore.svg"
                            alt="Download on App Store"
                            width={100}
                            height={32}
                            className="object-contain w-[100px] h-[32px]"
                        />
                        <Image
                            src="/playstore.svg"
                            alt="Get it on Google Play"
                            width={100}
                            height={32}
                            className="object-contain w-[100px] h-[32px]"
                        />
                    </div>
                </div>
            </div>
            {/* Mobile Layout */}
            <div className="w-full bg-[#F5F7FA] flex flex-col items-center py-6 px-4 mt-8 space-y-4 sm:hidden">
                <div className="w-full flex flex-row justify-center items-start gap-4">
                    {/* Left: Phone image and text */}
                    <div className="flex flex-col items-center flex-1">
                        <div className="relative flex justify-center items-start mb-5" style={{ height: '110px', width: '100%' }}>
                            <div className="absolute left-1/2 -translate-x-1/2 top-[12px] w-[150px] h-[130px] z-10 flex items-start justify-center">
                                <Image
                                    src="/huf-demat-account/mobile frame.png"
                                    alt="Mobile App Screenshot"
                                    width={150}
                                    height={130}
                                    className="w-[150px] h-[130px] object-contain"
                                />
                            </div>
                        </div>
                        <h2
                            className="text-lg font-normal text-black text-center mt-2"
                            style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0%' }}
                        >
                            Scan the QR to<br />Download the app
                        </h2>
                    </div>
                    {/* Right: QR code and store buttons stacked */}
                    <div className="flex flex-col items-center flex-1 gap-2">
                        <div className="w-[100px] h-[100px] flex items-center justify-center mb-2">
                            <Image
                                src="/minor-demat/qr.png"
                                alt="QR Code"
                                width={100}
                                height={100}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-2 w-full items-center">
                            <Image
                                src="/appstore.svg"
                                alt="Download on App Store"
                                width={100}
                                height={32}
                                className="object-contain w-[100px] h-[32px]"
                            />
                            <Image
                                src="/playstore.svg"
                                alt="Get it on Google Play"
                                width={100}
                                height={32}
                                className="object-contain w-[100px] h-[32px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="w-full mb-6 sm:mb-8 lg:mb-10 mt-2 px-4 sm:px-8 lg:px-14 py-6 sm:py-8 lg:py-12">
                <div className="max-w-6xl mx-auto flex flex-col space-y-3 sm:space-y-4 lg:space-y-6 items-center justify-center">
                    <h1 className="font-lexend text-2xl sm:text-3xl lg:text-4xl font-medium text-center px-2">Frequently Asked Questions (FAQs)</h1>
                    <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-3 mt-3 sm:mt-4 lg:mt-6">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index + 1}`} className="py-1 sm:py-2">
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
    );
}
