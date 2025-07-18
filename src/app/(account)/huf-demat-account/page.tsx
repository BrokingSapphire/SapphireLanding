"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Plus, ArrowRight } from 'lucide-react';

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
                <div className="flex items-center justify-center mb-8">
                    <h2 className="font-lexend text-[32px] font-medium text-black text-center">Reasons to Choose Us</h2>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-0 md:gap-0">
                    {/* Box 1 */}
                    <div className="flex-1 flex flex-col gap-2 bg-[#F5F7FA] border-t-[0.5px] border-gray-300 px-7 py-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Image src="/us-stocks/1st.svg" alt="Collective Wealth Management" width={24} height={24} />
                            <h3 className="font-poppins text-[18px] font-medium text-black">Collective Wealth Management</h3>
                        </div>
                        <p className="font-poppins text-[16px] text-gray-600">Manage family investments under one account. Invest in stocks, mutual funds, ETFs, and bonds while maintaining HUF structure and tax benefits.</p>
                    </div>
                    <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
                    {/* Box 2 */}
                    <div className="flex-1 flex flex-col gap-2 bg-[#F5F7FA] border-t-[0.5px] border-gray-300 px-7 py-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Image src="/us-stocks/2nd.svg" alt="Seamless Online Setup" width={24} height={24} />
                            <h3 className="font-poppins text-[18px] font-medium text-black">Seamless Online Setup</h3>
                        </div>
                        <p className="font-poppins text-[16px] text-gray-600">Open your HUF Demat Account completely online. Quick, paperless onboarding designed to minimize effort and maximize convenience.</p>
                    </div>
                    <div className="w-[1px] bg-gray-300 h-auto hidden md:block"></div>
                    {/* Box 3 */}
                    <div className="flex-1 flex flex-col gap-2 bg-[#F5F7FA] border-t-[0.5px] border-gray-300 px-7 py-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Image src="/us-stocks/3rd.svg" alt="Built for Legacy & Compliance" width={24} height={24} />
                            <h3 className="font-poppins text-[18px] font-medium text-black">Built for Legacy & Compliance</h3>
                        </div>
                        <p className="font-poppins text-[16px] text-gray-600">Operate under the Karta’s authority, ensuring legal compliance and smooth wealth distribution across generations — all while optimizing tax planning.</p>
                    </div>
                </div>
            </div>

            {/* Steps/How it Works Section - Minor Demat style */}
            <div className="relative w-full bg-white overflow-hidden mt-16 rounded-[32px] md:rounded-[64px] px-4 sm:px-8 md:px-0 py-10 md:py-0">
                {/* Main heading */}
                <div className="w-full flex justify-center mb-8 md:mb-0">
                    <h2 className="font-lexend text-[24px] sm:text-[28px] md:text-[32px] font-medium text-black text-center max-w-3xl">Ready to open a HUF Demat Account?</h2>
                </div>
                {/* Gradient background box - hide on mobile */}
                <div className="hidden md:block absolute top-[242px] left-[108px] w-[1224px] h-[258px] rounded-[64px]" style={{ background: 'linear-gradient(173.66deg, rgba(255,255,255,0.2) 0.86%, rgba(255,222,85,0.06) 55.98%, rgba(163,247,148,0.16) 95.84%)' }} />
                {/* Steps */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-[61px] z-10 relative w-full max-w-6xl mx-auto">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center w-full md:w-[328px] mb-8 md:mb-0">
                        <div className="w-[60px] h-[60px] rounded-full bg-[#64748B] flex items-center justify-center mb-[20px]">
                            <Image src="/huf-demat-account/1.png" alt="1" width={60} height={60} className="object-contain" />
                        </div>
                        <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] sm:text-[18px] text-black">Karta Setup</div>
                        <div className="w-full text-center font-poppins text-[12px] text-[#717171]">Add the HUF Karta’s basic information like name, PAN, Aadhaar, and contact number. This helps verify the Karta’s identity as the primary representative of the HUF.</div>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center w-full md:w-[328px] mb-8 md:mb-0">
                        <div className="w-[60px] h-[60px] rounded-full bg-[#64748B] flex items-center justify-center mb-[20px]">
                            <Image src="/huf-demat-account/2.png" alt="2" width={60} height={60} className="object-contain" />
                        </div>
                        <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] sm:text-[18px] text-black">HUF Details & Documents</div>
                        <div className="w-full text-center font-poppins text-[12px] text-[#717171]">Provide HUF details such as HUF PAN, Deed or Declaration, and the HUF bank account details. You’ll also need to upload documents like the Karta’s PAN, Aadhaar, and a recent photo.</div>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center w-full md:w-[328px]">
                        <div className="w-[60px] h-[60px] rounded-full bg-[#64748B] flex items-center justify-center mb-[20px]">
                            <Image src="/huf-demat-account/3.png" alt="3" width={60} height={60} className="object-contain" />
                        </div>
                        <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] sm:text-[18px] text-black">eSign & Activate</div>
                        <div className="w-full text-center font-poppins text-[12px] text-[#717171]">Complete the eSign process using Aadhaar OTP (of the Karta). Once verified, the HUF Demat Account will be created and ready to use.</div>
                    </div>
                </div>
                {/* Sign Up Button */}
                <div className="flex justify-center mt-10 md:mt-16">
                    <Link href="/signup" className="flex items-center gap-2 bg-[#064D51] hover:bg-teal-800 rounded-[6px] px-8 py-3 cursor-pointer transition-opacity">
                        <span className="font-poppins font-medium text-[14px] text-white">Sign Up</span>
                        <ArrowRight size={16} color="#fff" />
                    </Link>
                </div>
            </div>

            {/* How Does HUF Demat Account Work? (refined positioning) */}
            <div className="bg-white py-14 px-4 sm:px-6 lg:px-20 mt-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 items-center">
                    {/* Left: Text and How it works SVG */}
                    <div className="relative flex flex-col justify-center md:col-span-3">
                        <div className="relative mb-2 min-h-[48px]">
                            <Image src="/huf-demat-account/how 1.svg" alt="How it works arrow" width={145} height={84} className="absolute -top-8 -left-2 hidden md:block" />
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
            <div className="relative w-full h-[340px] bg-[#F5F7FA] overflow-hidden mt-16">
                {/* Mobile Phone Image - stick to bottom (unchanged) */}
                <div className="absolute w-[392px] h-[281px] z-10 overflow-hidden left-[180px] bottom-0">
                    <Image src="/huf-demat-account/mobile frame.png" alt="Mobile App Screenshot" width={350} height={360} className="w-full object-cover object-top" />
                </div>
                {/* Scan QR Code Text */}
                <div className="absolute z-20" style={{ top: '146px', left: '581px', width: '280px', height: '84px' }}>
                    <h2 className="text-[28px] font-normal leading-[100%] ml-10 text-black font-poppins">Scan the QR to<br />Download the app</h2>
                </div>
                {/* QR Code - match minor demat layout */}
                <div className="absolute z-20 ml-5" style={{ top: '95px', left: '870px' }}>
                    <Image src="/minor-demat/qr.png" alt="QR Code" width={200} height={200} className="object-contain" />
                </div>
                {/* App Store Buttons - match minor demat layout */}
                <div className="absolute z-20 flex flex-col space-y-3 ml-20" style={{ top: '146px', left: '1050px' }}>
                    <Image src="/appstore.svg" alt="Download on App Store" width={135} height={45} className="object-contain" />
                    <Image src="/playstore.svg" alt="Get it on Google Play" width={135} height={45} className="object-contain" />
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
