import React from 'react'; 
import Image from 'next/image'; 

export default function AppDownloadSection() { 
  return ( 
    <>
      {/* Desktop/Tablet Layout */}
      <div className="relative w-full h-[340px] bg-[#F5F7FA] overflow-hidden hidden md:block"> 
        {/* Background Circle */} 
        <div 
          className="absolute w-[402px] h-[351px] bg-[#E6EBF2] rounded-full" 
          style={{ 
            top: '90px', 
            left: '164px', 
          }} 
        /> 

        {/* Mobile Phone Image - Half Cut */} 
        <div 
          className="absolute w-[275px] h-[282px] z-10 overflow-hidden" 
          style={{ 
            top: '59px', 
            left: '227px', 
            filter: 'drop-shadow(12px 78px 19.6px rgba(0, 0, 0, 0.25))', 
          }} 
        > 
          <Image 
            src="/minor-demat/newmobile.png" 
            alt="Mobile App Screenshot" 
            width={275} 
            height={350} 
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
            src="/minor-demat/appstore.png" 
            alt="Download on App Store" 
            width={135} 
            height={30} 
            className="object-contain" 
          /> 
          <Image 
            src="/minor-demat/paystore.png" 
            alt="Get it on Google Play" 
            width={135} 
            height={45} 
            className="object-contain" 
          /> 
        </div> 
      </div>

      {/* Mobile Layout */}
      <div className="w-full bg-[#F5F7FA] flex flex-col items-center py-6 px-4 mt-8 space-y-4 md:hidden">
        {/* Circle + Phone Overlap - Responsive */}
        <div className="relative w-full flex justify-center items-start mb-2" style={{height: '110px'}}>
          {/* Half Circle */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[28px] w-[150px] h-[150px] bg-[#E6EBF2] rounded-full z-0 overflow-hidden" style={{clipPath: 'inset(0 0 50% 0)'}}></div>
          {/* Phone image, half inside the circle, half outside */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[12px] w-[100px] h-[120px] z-10 flex items-start justify-center">
            <Image 
              src="/minor-demat/mobilehalf.png" 
              alt="Mobile App Screenshot" 
              width={100} 
              height={120} 
              className="w-[100px] h-[120px] object-contain" 
            />
          </div>
        </div>
        <h2 
          className="text-lg font-normal text-black text-center"
          style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0%' }}
        >
          Scan the QR to<br />Download the app
        </h2>
        <div className="w-[120px] h-[120px] flex items-center justify-center">
          <Image 
            src="/minor-demat/qr.png" 
            alt="QR Code" 
            width={120} 
            height={120} 
            className="object-contain w-full h-full" 
          />
        </div>
        <div className="flex flex-row gap-3 mt-2">
          <Image 
            src="/minor-demat/appstore.png" 
            alt="Download on App Store" 
            width={150} 
            height={32} 
            className="object-contain w-[150px] h-[32px]" 
          />
          <Image 
            src="/minor-demat/paystore.png" 
            alt="Get it on Google Play" 
            width={100} 
            height={32} 
            className="object-contain w-[100px] h-[32px]" 
          />
        </div>
      </div>
    </>
  ); 
}