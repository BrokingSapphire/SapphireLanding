'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SIPCalculation {
  totalInvestment: number;
  estimatedReturns: number;
  totalAmount: number;
}

const SIPCalculator: React.FC = () => {
  const [investment, setInvestment] = useState<number>(8000);
  const [returnRate, setReturnRate] = useState<number>(18);
  const [timePeriod, setTimePeriod] = useState<number>(16);
  const [activeTab, setActiveTab] = useState<'SIPs' | 'Lumpsum'>('SIPs');

  // Calculate SIP returns
  const calculateSIP = (): SIPCalculation => {
    const monthlyRate = returnRate / 100 / 12;
    const months = timePeriod * 12;
    const totalInvestment = investment * months;

    // SIP Future Value formula: PMT * [((1 + r)^n - 1) / r] * (1 + r)
    const futureValue = investment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const estimatedReturns = futureValue - totalInvestment;

    return {
      totalInvestment,
      estimatedReturns,
      totalAmount: futureValue
    };
  };

  const [calculation, setCalculation] = useState<SIPCalculation>(calculateSIP());

  useEffect(() => {
    setCalculation(calculateSIP());
  }, [investment, returnRate, timePeriod]);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('₹', 'Rs.');
  };

  // Format large numbers
  const formatLargeNumber = (num: number): string => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + ' L';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + ' K';
    }
    return num.toString();
  };

  // Calculate chart percentages
  const investedPercentage = (calculation.totalInvestment / calculation.totalAmount) * 100;
  const returnsPercentage = (calculation.estimatedReturns / calculation.totalAmount) * 100;

  return (
    <div className="min-h-screen bg-white pt-20 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="bg-white ">
          <div className="max-w-7xl mx-auto px-20 py-3">
            <nav className="flex items-center text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500  hover:text-[#064D51] transition-colors">Home</Link>
              <span className="mx-2 text-gray-400">›</span>
              <Link href="/" className="text-gray-500  hover:text-[#064D51] transition-colors">Calculators</Link>
              <span className="mx-2 text-gray-400">›</span>
              <span className="text-[#064D51] font-regular">SIP Calculator</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SIP Calculator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Calculating your trading and investment finances made easy. Now access all of your favourite calculators from a common space.
            </p>
          </div>
        </div>

        {/* Full Width Background Section with ColorGradient */}
        <div className="w-full relative h-[400px] mb-[15rem]" style={{
          backgroundImage: 'url(/ColorGradient.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          {/* Tabs */}
          <div className="flex mb-6 max-w-7xl mx-auto px-20 pt-8">
            <div className="flex rounded-full border border-gray-200 bg-white p-1">
              <button
                className={`px-10 py-3 font-semibold rounded-full transition-colors duration-200 h-15 ${activeTab === 'SIPs'
                    ? 'bg-[#064D51] text-white w-[182px]'
                    : 'bg-transparent text-gray-500 w-[182px]'
                  }`}
                onClick={() => setActiveTab('SIPs')}
              >
                SIPs
              </button>
              <button
                className={`px-10 py-3 font-semibold rounded-full transition-colors duration-200 ${activeTab === 'Lumpsum'
                    ? 'bg-[#064D51] text-white w-[182px]'
                    : 'bg-transparent text-gray-500 w-[182px]'
                  }`}
                onClick={() => setActiveTab('Lumpsum')}
              >
                Lumpsum
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-20 py-8">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-stretch" style={{ minHeight: '420px', height: '340px' }}>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col md:flex-row  items-stretch" style={{ minHeight: '420px', height: '340px' }}>
                {/* Left Panel - Controls */}
                <div className="w-1/2 space-y-6 py-12 px-10 md:px-10 flex flex-col h-full">
                  {/* Total Investment Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-gray-700 font-medium text-sm">Total Investment Amount</label>
                      <span
                        className="text-base"
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500,
                          fontStyle: 'normal',
                          fontSize: '18px'
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
                      className="custom-range w-full h-2 rounded-[4px] h-[6px] appearance-none cursor-pointer slider"
                      style={
                        {
                          '--range-progress': `${((investment - 1000) / (10000000 - 1000)) * 100}%`
                        } as any
                      }
                    />
                  </div>

                  {/* Expected Return Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-gray-700 font-medium text-sm">Expected Return Rate(p.a)</label>
                      <span
                        className="text-base"
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500,
                          fontStyle: 'normal',
                          fontSize: '18px'
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
                      className="custom-range w-full h-2 rounded-[6px] h-[6px] appearance-none cursor-pointer slider"
                      style={
                        {
                          '--range-progress': `${((returnRate - 1) / (30 - 1)) * 100}%`
                        } as any
                      }
                    />
                  </div>

                  {/* Time Period */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-gray-700 font-medium text-sm">Time Period</label>
                      <span
                        className="text-base"
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500,
                          fontStyle: 'normal',
                          fontSize: '18px'
                        }}
                      >
                        {timePeriod} years <span className=' ml-1 text-[16px] normal regular'>({timePeriod * 12} months)</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="custom-range w-full h-2 rounded-[6px] h-[6px] appearance-none cursor-pointer slider"
                      style={
                        {
                          '--range-progress': `${((timePeriod - 1) / (50 - 1)) * 100}%`
                        } as any
                      }
                    />
                  </div>

                  {/* Total Income Generated */}
                  <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
                    <div
                      className="mb-1"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        fontSize: '26px',
                        color: '#064D51',
                      }}
                    >
                      {formatCurrency(calculation.totalAmount)}
                    </div>
                    <div className="text-gray-600 text-sm">Total Income Generated</div>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] bg-gray-200 mx-4 h-full z-10 relative" />

                {/* Right Panel - Chart and Results */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center h-full py-9 px-4 md:px-6">
                  {/* Donut Chart */}
                  <div className="relative w-[230px] h-[230px] mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#064D51"
                        strokeWidth="20"
                      />
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
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#064D51] rounded-full mr-2"></div>
                      <div>
                        <div className="font-poppins text-regular text-gray-900 text-[14px]">Estimated Returns</div>
                        <div className="text-gray-700 font-semibold text-[14px]">{formatCurrency(calculation.estimatedReturns)}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#FFD62D] rounded-full mr-2"></div>
                      <div>
                        <div className="font-poppins text-regular text-gray-900 text-[14px]">Invested Amount</div>
                        <div className="text-gray-700 font-semibold text-[14px]">{formatCurrency(calculation.totalInvestment)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Start Investing Button */}
                  <button className="bg-[#064D51] text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition-colors text-base">
                    Start Investing Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIP Calculator Info Section */}
        <div className="max-w-7xl mx-auto px-20 pb-12">
          <h2 className="text-2xl mb-3 mt-8 font-normal font-lexend text-gray-900">What is a SIP Calculator (Systematic Investment Plan)?</h2>
          <p className="text-[#636363] text-base mb-2">
            A SIP Calculator is an intuitive online tool provided by Sapphire Broking to help investors estimate the future value of their mutual fund investments through Systematic Investment Plans (SIPs). SIPs are a disciplined approach to investing, where you contribute a fixed amount regularly into mutual funds.
          </p>
          <p className="text-[#636363] text-base">
            Using inputs like monthly investment, investment tenure, and expected annual return, the SIP calculator gives you a clear estimate of how much wealth you can accumulate over time. Thanks to the power of compounding, even small, consistent investments can grow substantially.
          </p>
        </div>

        {/* How Does the Sapphire SIP Return Calculator Help You? */}
        <div className="max-w-7xl mx-auto px-20 pb-12">
          <h2 className="text-2xl mb-3 font-normal font-lexend text-gray-900">How Does the Sapphire SIP Return Calculator Help You?</h2>
          <p className="text-[#636363] text-base mb-2">The Sapphire Broking SIP Return Calculator empowers investors in multiple ways:</p>
          <ol className="list-decimal list-inside text-[#5F5F5F] space-y-1 pl-4 font-weight-400">
            <li><span className="font-poppins text-[16px] font-weight-500">Estimate Future Returns:</span> Get a projected value of your investment over a chosen period, helping you align your investments with financial goals.</li>
            <li><span className="font-poppins text-[16px] font-weight-500">Compare Options:</span> Try different scenarios—amounts, durations, and rates—to compare potential outcomes across investment options.</li>
            <li><span className="font-poppins text-[16px] font-weight-500">Visualize Investment Growth:</span> See how your capital compounds over time, thanks to graphical insights offered by the calculator.</li>
            <li><span className="font-poppins text-[16px] font-weight-500">Strategic Investment:</span> Choose the right SIP frequency and amount to meet your financial milestones efficiently.</li>
          </ol>
        </div>

        {/* How to Use the Sapphire SIP Calculator? */}
        <div className="max-w-7xl mx-auto px-20 pb-12">
          <h2 className="text-2xl mb-3 font-normal font-lexend text-gray-900">How to Use the Sapphire SIP Calculator?</h2>
          <p className="text-[#636363] text-base mb-2">Using Sapphire's SIP calculator is easy and quick. Just follow these steps:</p>
          <ol className="list-decimal list-inside text-[#5F5F5F] space-y-1 pl-4 font-weight-400">
            <li><span className="font-poppins text-[16px] font-weight-500">Enter Monthly Investment:</span> Specify how much you want to invest monthly.</li>
            <li><span className="font-poppins text-[16px] font-weight-500">Enter Investment:</span> Choose how long you plan to invest, usually in years.</li>
            <li><span className="font-poppins text-[16px] font-weight-500">Expected Annual Return:</span> Provide a reasonable annual return estimate (based on mutual fund history or projections).</li>
            <li><span className="font-poppins text-[16px] font-weight-500">Calculation:</span> The calculator uses the SIP formula: P × [(1 + r)^n – 1]/r × (1 + r),</li>
            <li><span className="font-poppins text-[16px] font-weight-500">View Results:</span> Get an immediate estimate of your final corpus and returns.</li>
          </ol>
        </div>

        {/* Example: SIP Returns with Sapphire Broking */}
        <div className="max-w-7xl mx-auto px-20 pb-8">
          <h2 className="text-2xl mb-3 font-normal font-lexend text-gray-900">Example: SIP Returns with Sapphire Broking</h2>
          <p className="text-[#636363] text-base mb-2">Let's take a simple scenario:</p>
          <ul className="list-disc list-inside text-[#5F5F5F] space-y-1 pl-4 font-weight-400">
            <li><span className="font-poppins text-[16px] font-weight-500">Monthly Investment (P):</span> ₹5,000</li>
            <li><span className="font-poppins text-[16px] font-weight-500">Investment Period (n):</span> 10 years (120 months)</li>
            <li><span className="font-poppins text-[16px] font-weight-500">Expected Annual Return (r):</span> 12% (1% monthly)</li>
          </ul>
          <p className="text-[#5F5F5F] font-weight-400 mb-2 font-poppins text-[16px]">
            <span className="font-poppins text-[16px] font-weight-500">Calculation:</span> Future Value = 5000 × [(1 + 0.01)^120 – 1] ÷ 0.01 × (1.01) ≈ ₹11,61,695
          </p>
          <p className="text-[#5F5F5F] font-weight-400 mb-2 font-poppins text-[16px]">
            <span className="font-poppins text-[16px] font-weight-500">Result:</span> After 10 years of ₹5,000 SIPs with a 12% return rate, your investment will grow to approximately ₹11.61 lakhs—of which ₹6 lakhs is principal and ₹5.61 lakhs is gain.
          </p>
        </div>

        {/* Why Choose SIP Over Lump-Sum Investments? */}
        <div className="max-w-7xl mx-auto px-20 pb-8">
          <h2 className="text-2xl mb-3  font-normal font-lexend text-gray-900">Why Choose SIP Over Lump-Sum Investments?</h2>
          <p className="text-[#636363] text-base mb-2">While both investment methods have their place, SIPs offer unique benefits for long-term investors:</p>
          <ol className="list-decimal list-inside text-[#636363] space-y-1 pl-4">
            <li><span className="font-medium">Rupee Cost Averaging:</span> Buy more units when markets dip and fewer when markets rise—reducing timing risk.</li>
            <li><span className="font-medium">Disciplined Savings:</span> Automate your investment journey and develop a savings routine.</li>
            <li><span className="font-medium">Power of Compounding:</span> Earn returns not just on your investments but also on past returns.</li>
            <li><span className="font-medium">Lower Entry Barrier:</span> No need for large capital upfront—you can begin with as little as ₹500/month.</li>
            <li><span className="font-medium">Flexibility and Control:</span> Pause, increase, or decrease your SIP amounts based on your financial comfort.</li>
          </ol>
        </div>

        {/* Conclusion */}
        <div className="max-w-7xl mx-auto px-20 pb-12">
          <h2 className="text-2xl mb-3  font-normal font-lexend text-gray-900">Conclusion</h2>
          <p className="text-[#636363] text-base mb-2">The Sapphire Broking SIP Calculator is a must-have tool for any investor looking to build wealth systematically. Whether you're saving for your child's future, retirement, or any long-term goal, the SIP calculator helps you plan with confidence.</p>
          <p className="text-[#636363] text-base mb-2">With Sapphire's easy-to-use interface, you can:</p>
          <ul className="list-disc list-inside text-[#636363] space-y-1 pl-4">
            <li>Project returns</li>
            <li>Compare investment strategies</li>
            <li>Stay committed to your financial aspirations</li>
          </ul>
          <p className="text-[#636363] text-base mb-2">Start planning smarter with the <a href="#" className="text-[#5F5F5F] underline">Sapphire SIP Calculator</a> today and unlock the power of consistent, goal-driven investing.</p>
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

export default SIPCalculator;