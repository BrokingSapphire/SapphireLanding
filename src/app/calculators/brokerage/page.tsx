'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BrokerageCharges {
  sapphireBrokerage: number;
  turnover: number;
  brokerage: number;
  exchangeTransactionCharges: number;
  gst: number;
  stt: number;
  sebiCharges: number;
  stampDuty: number;
  nseIpft: number;
  totalCharges: number;
  pointsToBreakEven: number;
  netPL: number;
}

type ActiveTab = 'Equity' | 'F&O' | 'Currency' | 'Commodity';
type DeliveryType = 'Delivery' | 'Intraday';

const BrokerageCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Equity');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('Delivery');
  const [exchange, setExchange] = useState<'NSE' | 'BSE'>('NSE');
  const [buyPrice, setBuyPrice] = useState<string>('');
  const [sellPrice, setSellPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('5');

  // Calculate all brokerage charges
  const calculateCharges = (): BrokerageCharges => {
    const buyPriceNum = parseFloat(buyPrice) || 0;
    const sellPriceNum = parseFloat(sellPrice) || 0;
    const qty = parseInt(quantity) || 0;

    if (buyPriceNum === 0 || sellPriceNum === 0 || qty === 0) {
      return {
        sapphireBrokerage: 0,
        turnover: 0,
        brokerage: 0,
        exchangeTransactionCharges: 0,
        gst: 0,
        stt: 0,
        sebiCharges: 0,
        stampDuty: 0,
        nseIpft: 0,
        totalCharges: 0,
        pointsToBreakEven: 0,
        netPL: 0
      };
    }

    const buyValue = buyPriceNum * qty;
    const sellValue = sellPriceNum * qty;
    const turnover = buyValue + sellValue;

    // Brokerage calculation (0.03% for delivery, 0.01% for intraday, max ₹20 per order)
    const brokerageRate = deliveryType === 'Delivery' ? 0.0003 : 0.0001;
    const buyBrokerage = Math.min(buyValue * brokerageRate, 20);
    const sellBrokerage = Math.min(sellValue * brokerageRate, 20);
    const totalBrokerage = buyBrokerage + sellBrokerage;

    // Exchange Transaction Charges (NSE: 0.00325%, BSE: 0.00375%)
    const exchangeRate = exchange === 'NSE' ? 0.0000325 : 0.0000375;
    const exchangeCharges = turnover * exchangeRate;

    // STT (Securities Transaction Tax)
    // For delivery: 0.1% on both buy and sell
    // For intraday: 0.025% on sell side only
    let stt = 0;
    if (deliveryType === 'Delivery') {
      stt = (buyValue + sellValue) * 0.001;
    } else {
      stt = sellValue * 0.00025;
    }

    // SEBI Charges (₹10 per crore)
    const sebiCharges = (turnover / 10000000) * 10;

    // Stamp Duty (0.003% on buy side, ₹1500 max per day)
    const stampDuty = Math.min(buyValue * 0.00003, 1500);

    // GST (18% on brokerage + exchange charges)
    const gst = (totalBrokerage + exchangeCharges + sebiCharges) * 0.18;

    // NSE IPFT (₹10 per crore for NSE)
    const nseIpft = exchange === 'NSE' ? (turnover / 10000000) * 10 : 0;

    // Total charges
    const totalCharges = totalBrokerage + exchangeCharges + stt + sebiCharges +
      stampDuty + gst + nseIpft;

    // Net P/L
    const grossPL = sellValue - buyValue;
    const netPL = grossPL - totalCharges;

    // Points to break even
    const pointsToBreakEven = totalCharges / qty;

    return {
      sapphireBrokerage: totalBrokerage,
      turnover,
      brokerage: totalBrokerage,
      exchangeTransactionCharges: exchangeCharges,
      gst,
      stt,
      sebiCharges,
      stampDuty,
      nseIpft,
      totalCharges,
      pointsToBreakEven,
      netPL
    };
  };

  const [charges, setCharges] = useState<BrokerageCharges>(calculateCharges());

  useEffect(() => {
    setCharges(calculateCharges());
  }, [buyPrice, sellPrice, quantity, deliveryType, exchange, activeTab]);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `₹${amount.toFixed(2)}`;
  };

  // Handle clear button
  const handleClear = () => {
    setBuyPrice('');
    setSellPrice('');
    setQuantity('5');
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-20 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:underline text-gray-600">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/calculators" className="hover:underline text-gray-600">Calculators</Link>
            <span className="mx-2">›</span>
            <span className="text-blue-600">Brokerage Calculator</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Brokerage Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use the brokerage calculator to calculate exactly how much you will
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            pay in brokerage and your breakeven.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-5 max-w-7xl mx-auto px-20">
        {(['Equity', 'F&O', 'Currency', 'Commodity'] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            className={`px-8 py-3 mb-0 font-[24px] border-b-[3px] transition-colors ${activeTab === tab
                ? 'border-[#064D51] text-[#064D51]'
                : 'border-gray-300 text-gray-500 hover:text-gray-700 hover:border-b-[3px] hover:border-[#064D51]'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-20 py-8 ">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex w-full items-stretch min-h-[400px]">
            {/* Left Panel - Input Form */}
            <div className="space-y-6 w-2/5 h-full p-8 px-[50px]">
              {/* Exchange Selection */}
              <div className="p-4">
                <h3 className="font-medium mb-3">Exchange</h3>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exchange"
                      value="NSE"
                      checked={exchange === 'NSE'}
                      onChange={(e) => setExchange(e.target.value as 'NSE' | 'BSE')}
                      className="mr-2 focus:ring-2 focus:ring-[#064D51] focus:border-[#064D51]"
                    />
                    NSE
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exchange"
                      value="BSE"
                      checked={exchange === 'BSE'}
                      onChange={(e) => setExchange(e.target.value as 'NSE' | 'BSE')}
                      className="mr-2"
                    />
                    BSE
                  </label>
                </div>
              </div>

              {/* Buy Price */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Buy Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                  <input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Sell Price */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Sell Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                  <input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Qty.</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              {/* Clear Button */}
              <button
                onClick={handleClear}
                className="bg-[#064D51] text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Vertical Divider */}
            <div className="w-px bg-gray-200 self-stretch" />

            {/* Right Panel - Results */}
            <div className="space-y-6 w-3/5 h-full p-8 px-[90px]">
              {/* Delivery Type Tabs */}
              <div className="flex border-b border-gray-200">
                {(['Delivery', 'Intraday'] as DeliveryType[]).map((type) => (
                  <button
                    key={type}
                    className={`flex-1 py-2 text-center transition-colors duration-200
                      ${deliveryType === type
                        ? 'border-b-2 border-[#064D51] text-[#064D51] font-medium'
                        : 'border-b-2 border-transparent text-gray-400 font-medium'
                      }`}
                    onClick={() => setDeliveryType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Sapphire Charges */}
              <div className="bg-white px-3">
                <h3 className="text-[16px] font-poppins font-medium text-[#152F46] mb-3">Sapphire Charges</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-[14px] font-poppins">Brokerage</span>
                  <span className="font-medium text-green-600 text-[14px] font-poppins">{formatCurrency(charges.sapphireBrokerage)}</span>
                </div>
              </div>

              {/* Regulatory Charges */}
              <div className='px-3 text-[14px] font-poppins'>
                <h3 className="font-medium text-gray-700 mb-3 text-[16px] font-poppins">Regulatory Charges</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Turnover</span>
                    <span className="font-medium">{formatCurrency(charges.turnover)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brokerage</span>
                    <span className="font-medium">{formatCurrency(charges.brokerage)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exchange Transaction Charges</span>
                    <span className="font-medium">{formatCurrency(charges.exchangeTransactionCharges)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST</span>
                    <span className="font-medium">{formatCurrency(charges.gst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">STT</span>
                    <span className="font-medium">{formatCurrency(charges.stt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SEBI Charges</span>
                    <span className="font-medium">{formatCurrency(charges.sebiCharges)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stamp Duty</span>
                    <span className="font-medium">{formatCurrency(charges.stampDuty)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NSE IPFT</span>
                    <span className="font-medium">{formatCurrency(charges.nseIpft)}</span>
                  </div>
                  {/* <hr className="my-2" /> */}
                  <div className="flex justify-between ">
                    <span className="text-gray-700">Total Charges</span>
                    <span>{formatCurrency(charges.totalCharges)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Points to Break Even</span>
                    <span className="font-medium">{formatCurrency(charges.pointsToBreakEven)}</span>
                  </div>
                </div>
              </div>

              {/* Net P/L */}
              <div
                className="bg-white border-t-2 border-dashed border-gray-300 px-3 text-[16px] font-poppins pt-4"
                style={{
                  borderImage: "repeating-linear-gradient(90deg, #d1d5db 0 8px, transparent 6px 12px) 100",
                  borderTopStyle: "solid", // overrides dashed to use image
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#152F46] text-[16px]">Net P/L</span>
                  <span className={`text-[16px] font-medium ${charges.netPL >= 0 ? 'text-[#152F46]' : 'text-red-600'}`}>
                    {formatCurrency(charges.netPL)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">* DP Charges applicable</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Informational Sections */}
      <div className="max-w-7xl mx-auto px-20 pb-8">
        <h2 className="text-[24px] font-poppins mb-2 mt-8 text-gray-900">What is a Brokerage Calculator?</h2>
        <p className="text-[#5F5F5F] font-poppins text-[16px] mb-4">A brokerage calculator is a smart online tool designed to help traders and investors calculate the brokerage fees and other transaction-related charges linked to their trades. By entering trade specifics like price, quantity, and segment, users can quickly assess all costs involved, including brokerage, taxes, and exchange fees. This enables better decision-making and accurate profit or loss projections across market segments such as equities, derivatives, commodities, and currencies.</p>
      </div>

      <div className="max-w-7xl mx-auto px-20 pb-8">
        <h2 className="text-[24px] font-poppins mb-2 mt-8 text-gray-900">How to Calculate Brokerage Using a Brokerage Calculator?</h2>
        <p className="text-[#5F5F5F] font-poppins text-[16px] mb-4">Traditionally, calculating brokerage required understanding a broker's fee structure, which can vary—some charge a flat fee per order, while others apply a percentage on the trade value. With the Sapphire Broking Brokerage Calculator, this becomes seamless. Simply input your trade details and the tool instantly computes the total charges and net P&L, eliminating the guesswork.</p>
      </div>

      <div className="max-w-7xl mx-auto px-20 pb-8">
        <h2 className="text-[24px] font-poppins mb-2 mt-8 text-gray-900">How to Use the Sapphire Broking Online Brokerage Calculator?</h2>
        <p className="text-[#5F5F5F] font-poppins text-[16px] mb-2">Using the Sapphire Broking Brokerage Calculator is simple and intuitive. Just follow these steps:</p>
        <ol className="list-decimal list-inside text-gray-700 space-y-1 pl-4 mb-2">
          <li>Select the Market Segment: Equity, F&O, Currency, or Commodities.</li>
          <li>Enter Trade Details: Buy and/or sell price, quantity of shares or contracts.</li>
          <li>View Instant Results: The calculator will display the brokerage, statutory charges (GST, STT, exchange charges, SEBI fees, etc.), and the total cost.</li>
          <li>Review Net P&L: You'll also see your estimated net profit or loss after all deductions.</li>
        </ol>
        <p className="text-[#5F5F5F] font-poppins text-[16px]">This tool allows traders to assess the real impact of trading costs before placing an order.</p>
      </div>

      <div className="max-w-7xl mx-auto px-20 pb-8">
        <h2 className="text-[24px] font-poppins mb-2 mt-8 text-gray-900">Benefits of Using the Sapphire Broking Brokerage Calculator</h2>
        <ul className="list-disc list-inside text-[#5F5F5F] font-poppins text-[16px] space-y-1 pl-4 mb-2">
          <li><span className="font-semibold">Full Transparency:</span> View a detailed cost breakdown before placing a trade.</li>
          <li><span className="font-semibold">High Accuracy:</span> Avoid manual miscalculations and surprises.</li>
          <li><span className="font-semibold">Time-Efficiency:</span> Get instant results with minimal inputs.</li>
          <li><span className="font-semibold">Cost Optimization:</span> Choose trades that minimize fees and maximize profits.</li>
          <li><span className="font-semibold">Informed Decisions:</span> Know your true profit potential upfront.</li>
        </ul>
      </div>

      <div className="max-w-7xl mx-auto px-20 pb-12">
        <h2 className="text-[24px] font-poppins mb-2 mt-8 text-gray-900">Conclusion</h2>
        <p className="text-[#5F5F5F] font-poppins text-[16px]">The Sapphire Broking Brokerage Calculator is an essential tool for every trader looking to optimize strategy and minimize trading costs. Whether you trade equities, derivatives, commodities, or currencies, this calculator provides instant, accurate, and transparent cost assessments. With Sapphire Broking's client-centric approach, you get the right tools to make well-informed and confident trading decisions.</p>
      </div>
    </div>
  );
};

export default BrokerageCalculator;