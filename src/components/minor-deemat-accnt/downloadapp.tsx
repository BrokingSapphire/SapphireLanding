import React from 'react'; 
import Image from 'next/image'; 

export default function AppDownloadSection() { 
  return ( 
    <div className="relative w-full h-[340px] bg-[#F5F7FA] overflow-hidden"> 
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
          src="/minor-demat/mobile.png" 
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
          src="/app-store-badge.png" 
          alt="Download on App Store" 
          width={135} 
          height={45} 
          className="object-contain" 
        /> 
        <Image 
          src="/google-play-badge.png" 
          alt="Get it on Google Play" 
          width={135} 
          height={45} 
          className="object-contain" 
        /> 
      </div> 
    </div> 
  ); 
}