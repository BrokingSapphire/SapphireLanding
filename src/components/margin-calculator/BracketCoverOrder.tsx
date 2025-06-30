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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-10">
      <h2 className="text-xl font-semibold mb-6">Bracket & Cover Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {/* Symbol */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Symbol</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder=""
            />
          </div>
        </div>
        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder=""
            />
          </div>
        </div>
        {/* Quantity to trade */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Quantity to trade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder=""
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {/* Stop Loss Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Stop Loss Price</label>
          <input
            type="number"
            value={stopLossPrice}
            onChange={(e) => setStopLossPrice(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder=""
          />
        </div>
        {/* Order Type */}
        <div className="flex items-end gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Order Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="orderType"
                  value="Buy"
                  checked={orderType === 'Buy'}
                  onChange={(e) => setOrderType(e.target.value as OrderType)}
                  className="mr-2"
                />
                Buy
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="orderType"
                  value="Sell"
                  checked={orderType === 'Sell'}
                  onChange={(e) => setOrderType(e.target.value as OrderType)}
                  className="mr-2"
                />
                Sell
              </label>
            </div>
          </div>
        </div>
        {/* Exchange Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Exchange</label>
          <div className="flex flex-wrap gap-4">
            {(['Equity', 'MCX', 'NFO', 'CDS'] as ExchangeType[]).map((exchange) => (
              <label key={exchange} className="flex items-center">
                <input
                  type="radio"
                  name="exchange"
                  value={exchange}
                  checked={selectedExchange === exchange}
                  onChange={(e) => setSelectedExchange(e.target.value as ExchangeType)}
                  className="mr-2"
                />
                {exchange}
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={calculateMargin}
          className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors font-medium"
        >
          Calculate
        </button>
        <button
          onClick={handleReset}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Reset
        </button>
      </div>
      {/* Results Table */}
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-4">Margin Calculator</h3>
        <table className="w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
          <tbody>
            <tr className="bg-gray-50">
              <td className="py-4 px-6 text-gray-500 font-medium border-b border-gray-200">Actual Value</td>
              <td className="py-4 px-6 text-right text-gray-700 font-semibold border-b border-gray-200">{formatCurrency(marginResult.actualValue)}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-4 px-6 text-gray-500 font-medium border-b border-gray-200">Margin Required</td>
              <td className="py-4 px-6 text-right text-gray-700 font-semibold border-b border-gray-200">{formatCurrency(marginResult.marginRequired)}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-4 px-6 text-gray-500 font-medium">Margin Required</td>
              <td className="py-4 px-6 text-right text-gray-700 font-semibold">{formatCurrency(marginResult.marginUtilized)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BracketCoverOrderMarginCalculator; 