import React from 'react';
import Image from 'next/image';

const MinorDematAccount: React.FC = () => {
  return (
    <div className="relative w-[1440px] h-[500px]  bg-white overflow-hidden">
      {/* How it works text with arrow */}
      <div className="absolute top-[36px] left-[342px]">
        <Image 
          src="/minor-demat/howitworks.png" 
          alt="How it works" 
          width={120} 
          height={40}
          className="object-contain"
        />
      </div>

      {/* Main heading */}
      <div
  className="absolute top-[93px] left-1/2 transform -translate-x-1/2 w-[700px] text-centre h-[40px]"
  style={{
    fontFamily: 'Lexend',
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#000000',
    textAlign: 'center',
  }}
>
  Ready to open a Minor Demat Account?
</div>


      {/* Gradient background box */}
      <div 
        className="absolute top-[242px] left-[108px] w-[1224px] h-[258px] rounded-[64px]"
        style={{
          background: 'linear-gradient(173.66deg, rgba(255, 255, 255, 0.2) 0.86%, rgba(255, 222, 85, 0.06) 55.98%, rgba(163, 247, 148, 0.16) 95.84%)'
        }}
      />

      {/* Content container with 3 steps */}
      <div className="absolute top-[210px] left-[167px] w-[1106px] h-[153px] flex justify-between items-start gap-[61px]">
        
        {/* Step 1 - Guardian Setup */}
        <div className="flex flex-col items-center w-[328px]">
          {/* Number circle */}
          <div className="w-[60px] h-[60px] rounded-full bg-[#64748B] flex items-center justify-center mb-[20px]">
            <Image 
              src="/minor-demat/1.png" 
              alt="1" 
              width={60} 
              height={60}
              className="object-contain"
            />
          </div>
          
          {/* Step title */}
          <div 
            className="w-[328px] h-[27px] text-center mb-[12px]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000'
            }}
          >
            Guardian Setup
          </div>
          
          {/* Step description */}
          <div 
            className="w-[328px] h-[54px] text-center"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#717171'
            }}
          >
            Add the parent or guardians basic information like name, PAN, Aadhaar and contact number. This helps us verify your identity quickly.
          </div>
        </div>

        {/* Step 2 - Minor Details & Documents */}
        <div className="flex flex-col items-center w-[328px]">
          {/* Number circle */}
          <div className="w-[60px] h-[60px] rounded-full bg-[#64748B] flex items-center justify-center mb-[20px]">
            <Image 
              src="/minor-demat/2.png" 
              alt="2" 
              width={60} 
              height={60}
              className="object-contain"
            />
          </div>
          
          {/* Step title */}
          <div 
            className="w-[328px] h-[27px] text-center mb-[12px]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000'
            }}
          >
            Minor Details & Documents
          </div>
          
          {/* Step description */}
          <div 
            className="w-[328px] h-[54px] text-center"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#717171'
            }}
          >
            Provide the minors details such as name, date of birth and Aadhaar. Youll also need to upload documents like the birth certificate and a recent photo.
          </div>
        </div>

        {/* Step 3 - eSign & Activate */}
        <div className="flex flex-col items-center w-[328px]">
          {/* Number circle */}
          <div className="w-[60px] h-[60px] rounded-full bg-[#64748B] flex items-center justify-center mb-[20px]">
            <Image 
              src="/minor-demat/3.png" 
              alt="3" 
              width={60} 
              height={60}
              className="object-contain"
            />
          </div>
          
          {/* Step title */}
          <div 
            className="w-[328px] h-[27px] text-center mb-[12px]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000'
            }}
          >
            eSign & Activate
          </div>
          
          {/* Step description */}
          <div 
            className="w-[328px] h-[54px] text-center"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#717171'
            }}
          >
            Complete the eSign process using your OTP. After verification, the Minor Demat Account will be created and ready to use.
          </div>
        </div>
      </div>

      {/* Sign Up Button */}
      <div 
        className="absolute top-[430px] left-[628px] w-[184px] h-[43px] rounded-[6px] bg-[#064D51] mb-4 flex items-center justify-center gap-[18px] cursor-pointer hover:opacity-90 transition-opacity"
        style={{
          paddingTop: '7px',
          paddingRight: '21px',
          paddingBottom: '7px',
          paddingLeft: '21px'
        }}
      >
        <span 
          style={{
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '145%',
            letterSpacing: '1%',
            color: '#FFFFFF'
          }}
        >
          Sign Up
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33333M12.6667 8L8.00001 12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default MinorDematAccount;