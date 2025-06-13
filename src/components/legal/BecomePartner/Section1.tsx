'use client';

import Image from 'next/image';

const HeroSection = () => {
  return (
   <section className=" relative overflow-hidden px-[66px] pt-[66px] pb-[80px]">
      {/* Floating Feature Pills - Outside the main content container */}
      <div className="absolute hidden lg:flex items-center space-x-2 z-10 left-[35%] xl:left-[40%] top-[12%]" >
        <Image src='become-partner/purple.svg' alt='green' width={30} height={30} className="w-8 h-8 transform rotate-15"/>
        <span className="font-lexend  text-white px-4 py-2 rounded-full text-[15px] font-medium whitespace-nowrap" style={{ backgroundColor: '#9060F7' }}>
          High brokerage sharing
        </span>
      </div>
      {/* <div className="absolute hidden md:flex items-center space-x-2 z-10 left-[35%] xl:left-[40%] top-[7%]" >
        <Image src='become-partner/purple.svg' alt='green' width={30} height={30} className="w-8 h-8 transform rotate-15"/>
        <span className="font-lexend  text-white px-4 py-2 rounded-full text-[15px] font-medium whitespace-nowrap" style={{ backgroundColor: '#9060F7' }}>
          High brokerage sharing
        </span>
      </div> */}

      <div className="absolute hidden lg:flex items-center space-x-2 z-50" style={{ top: '43%', left: '10%', transform: 'translate(-2rem, 4rem)' }}>
        <Image src='become-partner/green.svg' alt='green' width={30} height={30} className="w-7 h-7 transform rotate-15"/>
        <span className=" font-lexend  text-white px-4 py-2 rounded-full text-[15px] font-medium whitespace-nowrap" style={{ backgroundColor: '#00C278' }}>
          Competitive pricing
        </span>
      </div>

      <div className="absolute hidden lg:flex items-center space-x-2 z-10 right-[43%]" style={{ bottom: '16rem',   transform: 'translate(-2rem, 4em)' }}>
        <Image src='become-partner/orange.svg' alt='green' width={30} height={30} className="w-8 h-8 transform rotate-15"/>
        <span className="font-lexend  text-white px-4 py-2 rounded-full text-[15px] font-medium whitespace-nowrap" style={{ backgroundColor: '#FC9235' }}>
          No offline work and expenses
        </span>
      </div>


      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between h-full">
        
        {/* Left Side - Hero Content */}
        <div className="lg:w-[70%]  text-center md:text-left  lg:-mt-40" >
          <div className='flex flex-col items-start xl:items-center'>
          <h1 className="font-lexend font-medium mb-6 text-4xl md:text-5xl xl:text-[55px] leading-tight" >
            Your Collaboration Station
          </h1>
          
          <p className="text-start xl:text-center max-w-xl xl:max-w-2xl  text-base md:text-xl xl:text-[20px] mx-auto lg:mx-0" style={{ color: '#717171'}}>
            Have questions, need guidance, or looking for support? Our team is 
            dedicated to assisting you every step of the way. Reach out to us 
            anytime, and we will help you invest confidently.
          </p>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="lg:w-2/5 max-w-md w-full mt-12 lg:mt-0">
          <div className="bg-white rounded-xl p-8" style={{ boxShadow: '0px 2px 7px 6px rgba(196, 253, 216, 0.4)' }}>
            <h2 className="text-2xl font-bold mb-2 text-center">Register today</h2>
            <p className="mb-6 text-center" style={{fontSize: '12px', color: '#717171'}}>
              Join hands with Sapphire for growth, innovation, and 
              shared success in financial markets.
            </p>
            
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Enter your name hear"
                className="w-full px-4 py-3 border-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <div className="flex border-2 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <div className="flex items-center justify-center px-3 py-3 bg-gray-50 border-r border-blue-300">
                  <span className="text-gray-600 text-sm font-medium">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Your 10 digit mobile number"
                  className="flex-1 px-4 py-3 focus:outline-none"
                />
              </div>
              
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full px-4 py-3 border-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <button
                type="submit"
                className="w-full text-white py-3 rounded-md font-medium hover:opacity-90 transition-colors"
                style={{backgroundColor: '#064D51'}}
              >
                Become a partner
              </button>
            </div>
            
            <div className="text-center mt-2">
              <a href="#" className="text-[#2F7FFF] hover:text-blue-600 text-sm">
                Login to Partner Dashboard
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;