import React from 'react';
import Image from 'next/image';

export default function AppDownloadSection() {
  return (
    <div className="max-w-7xl mx-auto">
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
    </div>
  );
}