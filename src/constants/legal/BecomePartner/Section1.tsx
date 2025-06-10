'use client';

import { MousePointer } from 'lucide-react';

const HeroSection = () => {
  return (
   <section className=" relative overflow-hidden " style={{ paddingLeft: '66px', paddingRight: '66px', paddingBottom: '80px' }}>
      {/* Floating Feature Pills - Outside the main content container */}
      <div className="absolute hidden lg:flex items-center space-x-2 z-10" style={{ top: '10%', left: '30%', transform: 'translateX(8rem)' }}>
        <MousePointer className="w-7 h-7 transform" style={{ color: '#9060F7', fill:'#9060F7' , transform: 'rotate(20deg)' }} />
        <span className="text-white px-4 py-2 rounded-full text-base font-medium whitespace-nowrap" style={{ backgroundColor: '#9060F7' }}>
          High brokerage sharing
        </span>
      </div>

      <div className="absolute hidden lg:flex items-center space-x-2 z-50" style={{ top: '55%', left: '8%', transform: 'translate(-2rem, 4rem)' }}>
        <MousePointer className="w-7 h-7 transform rotate-12" style={{ color: '#00C278' , fill: '#00C278' ,transform: 'rotate(20deg)'}} />
        <span className="text-white px-4 py-2 rounded-full text-base font-medium whitespace-nowrap" style={{ backgroundColor: '#00C278' }}>
          Competitive pricing
        </span>
      </div>

      <div className="absolute hidden lg:flex items-center space-x-2 z-10" style={{ bottom: '6rem', right: '44rem' }}>
        <MousePointer className="w-7 h-7 transform rotate-12" style={{ color: '#FC9235' , fill:'#FC9235' , transform: 'rotate(20deg)' }} />
        <span className="text-white px-4 py-2 rounded-full text-base font-medium whitespace-nowrap" style={{ backgroundColor: '#FC9235' }}>
          No offline work and expenses
        </span>
      </div>


      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between h-full">
        
        {/* Left Side - Hero Content */}
        <div className="lg:w-[70%]  text-left" style={{ marginTop: '-40px'}}>
          <h1 className="font-lexend font-medium mb-6  text-5xl xl:text-6xl leading-tight" >
            Your Collaboration Station
          </h1>
          
          <p className="text-left max-w-2xl text-xl xl:text-2xl mx-auto lg:mx-0" style={{ color: '#717171'}}>
            Have questions, need guidance, or looking for support? Our team is 
            dedicated to assisting you every step of the way. Reach out to us 
            anytime, and we'll help you invest confidently.
          </p>
        </div>

        {/* Right Side - Registration Form */}
        <div className="lg:w-2/5 max-w-md w-full mt-12 lg:mt-0">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">Register today</h2>
            <p className="mb-6 text-center" style={{fontSize: '12px', color: '#717171'}}>
              Join hands with Sapphire for growth, innovation, and 
              shared success in financial markets.
            </p>
            
            <div className="space-y-8">
              <input
                type="text"
                placeholder="Enter your name hear"
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <div className="flex border-2 border-blue-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
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
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <button
                type="submit"
                className="w-full text-white py-3 rounded-lg font-medium hover:opacity-90 transition-colors"
                style={{backgroundColor: '#064D51'}}
              >
                Become a partner
              </button>
            </div>
            
            <div className="text-center mt-4">
              <a href="#" className="text-blue-500 hover:text-blue-600 text-sm">
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