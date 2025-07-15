// This file was moved from src/app/product/ipo/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface SIPCalculation {
  totalInvestment: number;
  estimatedReturns: number;
  totalAmount: number;
}

const MutualFundsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SIPs' | 'Lumpsum'>('Lumpsum');
  const [investment, setInvestment] = useState<number>(8000);
  const [returnRate, setReturnRate] = useState<number>(18);
  const [timePeriod, setTimePeriod] = useState<number>(16);
  const [calculation, setCalculation] = useState<SIPCalculation>({ totalInvestment: 0, estimatedReturns: 0, totalAmount: 0 });

  // SIP calculation logic (reference from SIP calculator)
  const calculateSIP = useCallback((): SIPCalculation => {
    const monthlyRate = returnRate / 100 / 12;
    const months = timePeriod * 12;
    const totalInvestment = investment * months;
    let futureValue = 0;
    if (monthlyRate > 0) {
      futureValue = investment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    } else {
      futureValue = totalInvestment;
    }
    const estimatedReturns = futureValue - totalInvestment;
    return { totalInvestment, estimatedReturns, totalAmount: futureValue };
  }, [investment, returnRate, timePeriod]);

  useEffect(() => {
    setCalculation(calculateSIP());
  }, [investment, returnRate, timePeriod, activeTab, calculateSIP]);

  // Format currency (reference from SIP calculator)
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('₹', 'Rs.');
  };

  // Chart percentages
  const investedPercentage = calculation.totalAmount > 0 ? (calculation.totalInvestment / calculation.totalAmount) * 100 : 0;
  const returnsPercentage = calculation.totalAmount > 0 ? (calculation.estimatedReturns / calculation.totalAmount) * 100 : 0;

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white py-10 pb-2 sm:py-14 sm:pb-0 lg:pb-0 lg:py-16 w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between relative w-full min-h-[240px] md:min-h-[340px] px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
            {/* Left Content */}
            <div className="z-10 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl pt-8 md:pt-0 pl-0 md:pl-8 lg:pl-8 xl:pl-15 text-center md:text-left">
              <p className="text-[36px] sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight mb-2 sm:mb-2 font-lexend">
                Invest in Mutual Funds
              </p>
              <p className="text-[36px] sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight mb-[24px] sm:mb-[24px] font-lexend">
                with 0% Commission*
              </p>
              <div className="space-y-3 sm:space-y-3 text-gray-600 mb-6 sm:mb-6">
                <p className='text-base sm:text-lg md:text-xl'>
                  Mutual funds offer a simple and effective way to invest in a diversified basket of assets, managed by experienced professionals.
                </p>
                <p className='text-base sm:text-lg md:text-xl'>
                  Whether you&#39;re a beginner or a seasoned investor, mutual funds help you build long-term wealth with reduced risk and steady growth potential.
                </p>
                <p className='text-base sm:text-lg md:text-xl'>
                  With flexible investment options and accessibility, mutual funds make it easier than ever to work toward your financial goals.
                </p>
              </div>
              <button className="bg-[#064D51] hover:bg-teal-800 text-white px-6 sm:px-8 py-3 sm:py-[14px] rounded-lg font-semibold transition-colors shadow-lg w-full md:w-auto">
                Open a Free Demat Account Now
              </button>
            </div>
            {/* Right Side - IPO Images */}
            <div className="relative w-full flex justify-center md:justify-end mb-6 md:mb-0 md:w-auto">
              <Image
                src="/mutual-funds/frame.png"
                alt="Mutual Funds Frame"
                width={364}
                height={456}
                className="w-48 sm:w-64 md:w-[320px] lg:w-[380px] h-auto max-h-[300px] md:max-h-[444px] drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* How Easy It Is Section */}
<div className="bg-[#F7F9FB] max-w-7xl h-[420px] mx-auto rounded-2xl mt-12 px-4 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-center overflow-hidden">
  {/* Content Container */}
  <div className='w-full h-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8'>
    
    {/* Left Text Content */}
    <div className="flex-1 flex flex-col justify-center h-full text-center md:text-left max-w-md">
      <h2 className="text-[24px] sm:text-3xl lg:text-4xl font-medium text-gray-900 font-lexend leading-tight">
        5,000+ Mutual Funds. Your
      </h2>
      <h2 className="text-[24px] sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-4 font-lexend leading-tight">
        Growth Start&apos;s with Sapphire.
      </h2>
      <p className="text-gray-600 text-regular font-poppins text-base sm:text-lg md:text-xl">
        Invest with confidence in top-performing
      </p>
      <p className="text-gray-600 text-regular font-poppins text-base sm:text-lg md:text-xl">
        funds, curated for every kind of investor.
      </p>
    </div>
    
    {/* Right Icon Frame */}
    <div className="flex-1 flex justify-center items-center h-full w-full max-w-lg">
      <Image
        src="/mutual-funds/icon-frame.svg"
        alt="Mutual Funds Icon Frame"
        width={800}
        height={400}
        className="w-full h-auto 
                   min-w-[200px] min-h-[120px] 
                   sm:min-w-[280px] sm:min-h-[180px] 
                   md:min-w-[350px] md:min-h-[220px] 
                   lg:min-w-[420px] lg:min-h-[260px] 
                   xl:min-w-[500px] xl:min-h-[300px] 
                   max-w-[600px] max-h-[360px] 
                   object-contain"
        priority
      />
    </div>
  </div>
</div>

        {/* Full Width Background Section with ColorGradient */}
        <div className="w-full relative h-auto lg:h-[400px] mb-8 lg:mb-[15rem] px-10" style={{
          backgroundImage: 'url(/ColorGradient.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          {/* Tabs */}
          <div className="flex mb-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-8 overflow-x-auto">
            <div className="flex rounded-full border border-gray-200 bg-white p-1 min-w-fit">
              <button
                className={`px-6 sm:px-8 lg:px-10 py-3 font-semibold rounded-full transition-colors duration-200 h-15 text-sm sm:text-base ${activeTab === 'SIPs'
                  ? 'bg-[#064D51] text-white w-[140px] sm:w-[160px] lg:w-[182px]'
                  : 'bg-transparent text-gray-500 w-[140px] sm:w-[160px] lg:w-[182px]'
                  }`}
                onClick={() => setActiveTab('SIPs')}
              >
                SIPs
              </button>
              <button
                className={`px-6 sm:px-8 lg:px-10 py-3 font-semibold rounded-full transition-colors duration-200 text-sm sm:text-base ${activeTab === 'Lumpsum'
                  ? 'bg-[#064D51] text-white w-[140px] sm:w-[160px] lg:w-[182px]'
                  : 'bg-transparent text-gray-500 w-[140px] sm:w-[160px] lg:w-[182px]'
                  }`}
                onClick={() => setActiveTab('Lumpsum')}
              >
                Lumpsum
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 pt-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-stretch" style={{ minHeight: '420px', height: 'auto' }}>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col lg:flex-row items-stretch" style={{ minHeight: '420px', height: 'auto' }}>
                {/* Left Panel - Controls */}
                <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-10 flex flex-col h-full">
                  {/* Total Investment Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-gray-700 font-medium text-xs sm:text-sm">Total Investment Amount</label>
                      <span
                        className="text-sm sm:text-base lg:text-lg"
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500,
                          fontStyle: 'normal',
                        }}
                      >
                        {formatCurrency(investment)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="10000000"
                      step="1000"
                      value={investment}
                      onChange={(e) => setInvestment(Number(e.target.value))}
                      className="custom-range w-full rounded-[4px] h-[6px] appearance-none cursor-pointer slider"
                      style={
                        {
                          '--range-progress': `${((investment - 1000) / (10000000 - 1000)) * 100}%`
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  {/* Expected Return Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-gray-700 font-medium text-xs sm:text-sm">Expected Return Rate(p.a)</label>
                      <span
                        className="text-sm sm:text-base lg:text-lg"
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500,
                          fontStyle: 'normal',
                        }}
                      >
                        {returnRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.5"
                      value={returnRate}
                      onChange={(e) => setReturnRate(Number(e.target.value))}
                      className="custom-range w-full rounded-[6px] h-[6px] appearance-none cursor-pointer slider"
                      style={
                        {
                          '--range-progress': `${((returnRate - 1) / (30 - 1)) * 100}%`
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  {/* Time Period */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-gray-700 font-medium text-xs sm:text-sm">Time Period</label>
                      <span
                        className="text-sm sm:text-base lg:text-lg"
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500,
                          fontStyle: 'normal',
                        }}
                      >
                        {timePeriod} years <span className='ml-1 text-xs sm:text-sm lg:text-base normal regular'>({timePeriod * 12} months)</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="custom-range w-full rounded-[6px] h-[6px] appearance-none cursor-pointer slider"
                      style={
                        {
                          '--range-progress': `${((timePeriod - 1) / (50 - 1)) * 100}%`
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  {/* Total Income Generated */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center border border-gray-200">
                    <div
                      className="mb-1 text-lg sm:text-xl lg:text-2xl"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        color: '#064D51',
                      }}
                    >
                      {formatCurrency(calculation.totalAmount)}
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm">Total Income Generated</div>
                  </div>
                </div>

                {/* Vertical Divider - Hidden on mobile */}
                <div className="hidden lg:block w-[1px] bg-gray-200 mx-4 h-full z-10 relative" />

                {/* Right Panel - Chart and Results */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-full py-6 sm:py-8 lg:py-9 px-4 sm:px-6">
                  {/* Donut Chart */}
                  <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] lg:w-[230px] lg:h-[230px] mb-4 sm:mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle (optional) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#F1F1F1"
                        strokeWidth="20"
                      />
                      {/* Estimated Returns (Dark) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#064D51"
                        strokeWidth="20"
                        strokeDasharray={`${returnsPercentage * 2.2} ${(100 - returnsPercentage) * 2.2}`}
                        strokeDashoffset="0"
                        className="transition-all duration-500"
                      />
                      {/* Invested Amount (Yellow) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#FFD62D"
                        strokeWidth="20"
                        strokeDasharray={`${investedPercentage * 2.2} ${(100 - investedPercentage) * 2.2}`}
                        strokeDashoffset={`-${returnsPercentage * 2.2}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                    <div className="flex items-center justify-center sm:justify-start">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#064D51] rounded-full mr-2"></div>
                      <div>
                        <div className="font-poppins text-regular text-gray-900 text-xs sm:text-sm">Estimated Returns</div>
                        <div className="text-gray-700 font-semibold text-xs sm:text-sm">{formatCurrency(calculation.estimatedReturns)}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#FFD62D] rounded-full mr-2"></div>
                      <div>
                        <div className="font-poppins text-regular text-gray-900 text-xs sm:text-sm">Invested Amount</div>
                        <div className="text-gray-700 font-semibold text-xs sm:text-sm">{formatCurrency(calculation.totalInvestment)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Start Investing Button */}
                  <button className="bg-[#064D51] text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition-colors text-sm sm:text-base w-full sm:w-auto">
                    Start Investing Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx global>{`
        .custom-range {
          background: transparent;
        }
        .custom-range::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 6px;
          background: linear-gradient(
            to right,
            #FFD62D 0%,
            #FFD62D var(--range-progress, 0%),
            #F1F1F1 var(--range-progress, 0%),
            #F1F1F1 100%
          );
        }
        .custom-range::-webkit-slider-thumb {
          appearance: none;
          width: 4px;
          height: 16px;
          border-radius: 3px;
          background: #374151;
          cursor: pointer;
          margin-top: -5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .custom-range:focus {
          outline: none;
        }
        .custom-range::-moz-range-thumb {
          width: 4px;
          height: 16px;
          border-radius: 3px;
          background: #374151;
          cursor: pointer;
        }
        .custom-range::-ms-fill-lower {
          background: #FFD62D;
          border-radius: 6px;
        }
        .custom-range::-ms-fill-upper {
          background: #F1F1F1;
          border-radius: 6px;
        }
        .custom-range::-moz-range-track {
          height: 6px;
          border-radius: 6px;
          background: linear-gradient(
            to right,
            #FFD62D 0%,
            #FFD62D var(--range-progress, 0%),
            #F1F1F1 var(--range-progress, 0%),
            #F1F1F1 100%
          );
        }
      `}</style>
    </div>
  );
};

export default MutualFundsPage;
