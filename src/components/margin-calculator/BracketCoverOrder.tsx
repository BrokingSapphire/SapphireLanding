import React from 'react';

type ExchangeType = 'Equity' | 'MCX' | 'NFO' | 'CDS';
type OrderType = 'Buy' | 'Sell';

interface MarginResult {
  actualValue: number;
  marginRequired: number;
  marginUtilized: number;
}

interface BracketCoverOrderMarginCalculatorProps {
  selectedExchange: ExchangeType;
  setSelectedExchange: (value: ExchangeType) => void;
  symbol: string;
  setSymbol: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  stopLossPrice: string;
  setStopLossPrice: (value: string) => void;
  orderType: OrderType;
  setOrderType: (value: OrderType) => void;
  marginResult: MarginResult;
  calculateMargin: () => void;
  handleReset: () => void;
  formatCurrency: (amount: number) => string;
}

const BracketCoverOrderMarginCalculator: React.FC<BracketCoverOrderMarginCalculatorProps> = ({
  selectedExchange,
  setSelectedExchange,
  symbol,
  setSymbol,
  price,
  setPrice,
  quantity,
  setQuantity,
  stopLossPrice,
  setStopLossPrice,
  orderType,
  setOrderType,
  marginResult,
  calculateMargin,
  handleReset,
  formatCurrency,
}) => {
  return (
    <div className="mb-10">
      <div className='border p-4 sm:p-6 flex flex-col rounded-md shadow-sm bg-white'>
        <h2 className="text-lg sm:text-xl font-medium mb-3">Bracket & Cover Orders</h2>

        <div className='mb-4'>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Exchange</label>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {(['Equity', 'MCX', 'NFO', 'CDS'] as ExchangeType[]).map((exchange) => (
              <label key={exchange} className="flex items-center text-xs sm:text-sm cursor-pointer">
                <div className="relative mr-2">
                  <input
                    type="radio"
                    name="exchange"
                    value={exchange}
                    checked={selectedExchange === exchange}
                    onChange={(e) => setSelectedExchange(e.target.value as ExchangeType)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedExchange === exchange 
                      ? 'border-[#064D51] bg-white' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    {selectedExchange === exchange && (
                      <div className="w-2 h-2 rounded-full bg-[#064D51]"></div>
                    )}
                  </div>
                </div>
                {exchange}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
          {/* Symbol */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Symbol</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base">Rs.</span>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder=""
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base">Rs.</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder=""
              />
            </div>
          </div>

          {/* Quantity to trade */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Quantity to trade</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              placeholder=""
            />
          </div>

          {/* Stop Loss Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Stop Loss Price</label>
            <input
              type="number"
              value={stopLossPrice}
              onChange={(e) => setStopLossPrice(e.target.value)}
              className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              placeholder=""
            />
          </div>

          {/* Order Type */}
          <div className="flex items-end gap-4 sm:col-span-2 lg:col-span-1">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Order Type</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative mr-2">
                    <input
                      type="radio"
                      name="orderType"
                      value="Buy"
                      checked={orderType === 'Buy'}
                      onChange={(e) => setOrderType(e.target.value as OrderType)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      orderType === 'Buy' 
                        ? 'border-[#064D51] bg-white' 
                        : 'border-gray-300 bg-white'
                    }`}>
                      {orderType === 'Buy' && (
                        <div className="w-2 h-2 rounded-full bg-[#064D51]"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm sm:text-base">Buy</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <div className="relative mr-2">
                    <input
                      type="radio"
                      name="orderType"
                      value="Sell"
                      checked={orderType === 'Sell'}
                      onChange={(e) => setOrderType(e.target.value as OrderType)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      orderType === 'Sell' 
                        ? 'border-[#064D51] bg-white' 
                        : 'border-gray-300 bg-white'
                    }`}>
                      {orderType === 'Sell' && (
                        <div className="w-2 h-2 rounded-full bg-[#064D51]"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm sm:text-base">Sell</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8 mt-5">
        <button
          onClick={calculateMargin}
          className="bg-[#064D51] text-white px-6 py-2 sm:py-[8px] rounded-lg hover:bg-teal-800 transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
        >
          Calculate
        </button>
        <button
          onClick={handleReset}
          className="border-2 border-[#064D51] text-[#064D51] px-6 py-2 sm:py-[8px] rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base order-1 sm:order-2"
        >
          Reset
        </button>
      </div>
      {/* Results Table */}
      <div className="w-full">
        <h3 className="mb-4 text-xl sm:text-2xl" style={{ fontSize: '24px', fontFamily: 'Lexend', fontWeight: 400 }}>
          Margin Calculator
        </h3>
        <div className="border border-gray-300 rounded-lg overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <tbody>
              <tr className="bg-[#F5F7FA] border-b border-gray-300">
                <td className="py-3 px-3 sm:px-6 text-gray-500 font-medium border-r border-gray-300 text-sm sm:text-base">Actual Value</td>
                <td className="py-3 px-3 sm:px-6 text-left text-gray-500 font-medium text-sm sm:text-base">{formatCurrency(marginResult.actualValue)}</td>
              </tr>
              <tr className="bg-white border-b border-gray-300">
                <td className="py-3 px-3 sm:px-6 text-gray-500 font-medium border-r border-gray-300 text-sm sm:text-base">Margin Required</td>
                <td className="py-3 px-3 sm:px-6 text-left text-gray-500 font-medium text-sm sm:text-base">{formatCurrency(marginResult.marginRequired)}</td>
              </tr>
              <tr className="bg-[#F5F7FA]">
                <td className="py-3 px-3 sm:px-6 text-gray-500 font-medium border-r border-gray-300 text-sm sm:text-base">Margin Utilized</td>
                <td className="py-3 px-3 sm:px-6 text-left text-gray-500 font-medium text-sm sm:text-base">{formatCurrency(marginResult.marginUtilized)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BracketCoverOrderMarginCalculator; 