'use client';

import React, { useState, useEffect } from 'react';
import EquityMarginCalculator from '@/components/margin-calculator/Equity';
import EquityFutureMarginCalculator from '@/components/margin-calculator/EquityFuture';
import CurrencyFutureMarginCalculator from '@/components/margin-calculator/CurrencyFuture';
import MCXFutureMarginCalculator from '@/components/margin-calculator/MCXFuture';
import BracketCoverOrderMarginCalculator from '@/components/margin-calculator/BracketCoverOrder';
import SpanCalculator from '@/components/margin-calculator/SpanCalculator';
import Link from 'next/link';

type ActiveTab = 'Equity' | 'Equity Future' | 'Currency Future' | 'MCX Future' | 'Bracket & Cover Order' | 'Span Calculator';
type ExchangeType = 'Equity' | 'MCX' | 'NFO' | 'CDS';
type OrderType = 'Buy' | 'Sell';

interface Contract {
  no: number;
  exchange: string;
  symbol: string;
  intradayMultiplier: string;
}

interface MarginResult {
  actualValue: number;
  marginRequired: number;
  marginUtilized: number;
}

const MarginCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Equity');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Bracket & Cover Order states
  const [selectedExchange, setSelectedExchange] = useState<ExchangeType>('Equity');
  const [symbol, setSymbol] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [stopLossPrice, setStopLossPrice] = useState<string>('');
  const [orderType, setOrderType] = useState<OrderType>('Buy');
  const [marginResult, setMarginResult] = useState<MarginResult>({
    actualValue: 105,
    marginRequired: 105,
    marginUtilized: 105
  });

  // Mock contract data
  const contracts: Contract[] = [
    { no: 1, exchange: 'NSE', symbol: 'AJMERA', intradayMultiplier: '1x' },
    { no: 2, exchange: 'NSE', symbol: '3MINDIA', intradayMultiplier: '3x' },
    { no: 3, exchange: 'NSE', symbol: 'RELIANCE', intradayMultiplier: '5x' }
  ];

  // Filter contracts based on search
  const filteredContracts = contracts.filter(contract =>
    contract.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate margin for Bracket & Cover Orders
  const calculateMargin = React.useCallback(() => {
    const priceNum = parseFloat(price) || 0;
    const qtyNum = parseInt(quantity) || 0;

    if (priceNum > 0 && qtyNum > 0) {
      const actualValue = priceNum * qtyNum;
      // Simplified margin calculation - in real scenario this would be more complex
      const marginRequired = actualValue * 0.2; // 20% margin requirement
      const marginUtilized = marginRequired;

      setMarginResult({
        actualValue,
        marginRequired,
        marginUtilized
      });
    }
  }, [price, quantity]);

  useEffect(() => {
    calculateMargin();
  }, [price, quantity, stopLossPrice, orderType, calculateMargin]);

  const handleReset = () => {
    setSymbol('');
    setPrice('');
    setQuantity('');
    setStopLossPrice('');
    setOrderType('Buy');
  };

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(0);
  };

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 px-4 sm:px-0">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-3">
          <nav className="flex items-center text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-[#064D51] transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">›</span>
            <Link href="/" className="text-gray-500 hover:text-[#064D51] transition-colors">Calculators</Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-[#064D51] font-regular">Margin Calculator</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Margin Calculator</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Use the brokerage calculator to calculate exactly how much you will pay in brokerage and your breakeven.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8">
        {/* Tabs */}
        <div className="bg-white w-auto">
          <div className="flex border-b-2 border-gray-200 overflow-x-auto">
            {([
              'Equity',
              'Equity Future',
              'Currency Future',
              'MCX Future',
              'Bracket & Cover Order',
              'Span Calculator'
            ] as ActiveTab[]).map((tab) => (
              <button
                key={tab}
                className={`px-3 sm:px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap -mb-px text-sm sm:text-base ${activeTab === tab
                    ? 'border-[#064D51] text-[#064D51]'
                    : 'border-transparent text-gray-500 hover:text-[#064D51]'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-8"></div>

        {/* Content based on active tab */}
        {activeTab === 'Equity' && (
          <EquityMarginCalculator
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredContracts={filteredContracts}
          />
        )}
        {activeTab === 'Equity Future' && (
          <EquityFutureMarginCalculator
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredContracts={filteredContracts}
          />
        )}
        {activeTab === 'Currency Future' && (
          <CurrencyFutureMarginCalculator
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredContracts={filteredContracts}
          />
        )}
        {activeTab === 'MCX Future' && (
          <MCXFutureMarginCalculator
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredContracts={filteredContracts}
          />
        )}
        {activeTab === 'Bracket & Cover Order' && (
          <BracketCoverOrderMarginCalculator
            selectedExchange={selectedExchange}
            setSelectedExchange={setSelectedExchange}
            symbol={symbol}
            setSymbol={setSymbol}
            price={price}
            setPrice={setPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            stopLossPrice={stopLossPrice}
            setStopLossPrice={setStopLossPrice}
            orderType={orderType}
            setOrderType={setOrderType}
            marginResult={marginResult}
            calculateMargin={calculateMargin}
            handleReset={handleReset}
            formatCurrency={formatCurrency}
          />
        )}
        {activeTab === 'Span Calculator' && <SpanCalculator />}
      </div>
    </div>
  );
};

export default MarginCalculator;