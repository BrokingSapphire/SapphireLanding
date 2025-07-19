import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const steps = [
  {
    img: '/minor-demat/1.png',
    title: 'Guardian Setup',
    desc: "Add the parent or guardian's basic information like name, PAN, Aadhaar and contact number. This helps us verify your identity quickly.",
  },
  {
    img: '/minor-demat/2.png',
    title: 'Minor Details & Documents',
    desc: "Provide the minor's details such as name, date of birth and Aadhaar. You'll also need to upload documents like the birth certificate and a recent photo.",
  },
  {
    img: '/minor-demat/3.png',
    title: 'eSign & Activate',
    desc: 'Complete the eSign process using your OTP. After verification, the Minor Demat Account will be created and ready to use.',
  },
];

const MinorDematAccount: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-20">
      {/* Main heading */}
      <div className="w-full flex justify-center mt-12">
        <div className="font-lexend text-[24px] sm:text-[28px] md:text-[32px] font-medium text-black text-center max-w-3xl mx-auto">
          Ready to open a Minor Demat Account?
        </div>
      </div>
      <div
        className="w-full max-w-7xl rounded-[32px] md:rounded-[64px] mt-5 px-4 sm:px-8 md:px-0 py-10 md:py-0 flex flex-col items-center justify-center pb-10"
        style={{
          background: 'linear-gradient(173.66deg, rgba(255,255,255,0.2) 0.86%, rgba(255,222,85,0.06) 55.98%, rgba(163,247,148,0.16) 95.84%)',
        }}
      >
        {/* Desktop: steps in a row */}
        <div className="hidden md:flex flex-row justify-between items-start gap-8 md:gap-[61px] w-full max-w-7xl px-5">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center w-full md:w-[328px] mb-8 md:mb-0">
              <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-[12px] bg-[#64748B]">
                <Image src={step.img} alt={String(idx + 1)} width={48} height={48} className="object-contain" />
              </div>
              <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] sm:text-[18px] text-black">{step.title}</div>
              <div className="w-full text-center font-poppins text-[14px] text-[#717171]">{step.desc}</div>
            </div>
          ))}
        </div>
        {/* Mobile: steps stacked */}
        <div className="flex flex-col md:hidden gap-8 w-full mt-2">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center w-full">
              <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-[12px] bg-[#64748B]">
                <Image src={step.img} alt={String(idx + 1)} width={48} height={48} className="object-contain" />
              </div>
              <div className="w-full text-center mb-[12px] font-poppins font-semibold text-[16px] text-black">{step.title}</div>
              <div className="w-full text-center font-poppins text-[14px] text-[#717171]">{step.desc}</div>
            </div>
          ))}
        </div>
        {/* Sign Up Button */}
        <div className="flex justify-center mt-[34px] md:mt-[34px] w-full mb-[28px]">
          <Link href="/signup" className="flex items-center gap-2 bg-[#064D51] hover:bg-teal-800 rounded-[6px] px-8 py-3 cursor-pointer transition-opacity mx-auto">
            <span className="font-poppins font-medium text-[14px] text-white">Sign Up</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3.333 8h8M11.333 8l-3-3M11.333 8l-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MinorDematAccount;