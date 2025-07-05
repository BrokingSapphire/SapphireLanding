import React, { useState } from 'react';

type ExchangeType = 'Buy' | 'Sell';
type OptionType = 'Call' | 'Put';

interface Contract {
  exchange: string;
  product: string;
  ticker: string;
  expiry: string;
  option: string;
  quantity: string;
  price: string;
  span: string;
  exposure: string;
  total: string;
}

const SpanCalculator: React.FC = () => {
  const [selectedExchange, setSelectedExchange] = useState<ExchangeType>('Buy');
  const [exchangeValue, setExchangeValue] = useState<string>('NSE CDS');
  const [symbol, setSymbol] = useState<string>('EURINR');
  const [expiry, setExpiry] = useState<string>('11-07-2025');
  const [product, setProduct] = useState<string>('Future');
  const [strikePrice, setStrikePrice] = useState<string>('91');
  const [quantity, setQuantity] = useState<string>('1');
  const [optionType, setOptionType] = useState<OptionType>('Call');
  
  // Contracts state
  const [contracts, setContracts] = useState<Contract[]>([
    {
      exchange: 'NSE',
      product: 'Futures',
      ticker: 'EURINR',
      expiry: '11-07-2025',
      option: '0',
      quantity: '1',
      price: '100.84',
      span: '2,849',
      exposure: '151.1',
      total: '3,000.1'
    },
    {
      exchange: 'NSE',
      product: 'Options',
      ticker: 'EURINR',
      expiry: '11-07-2025',
      option: '91 PE',
      quantity: '1',
      price: '0',
      span: '0',
      exposure: '0',
      total: '0'
    },
    {
      exchange: 'NSE',
      product: 'Options',
      ticker: 'EURINR',
      expiry: '11-07-2025',
      option: '91 PE',
      quantity: '1',
      price: '0',
      span: '0',
      exposure: '0',
      total: '0'
    }
  ]);

  const handleReset = () => {
    setSelectedExchange('Buy');
    setExchangeValue('NSE CDS');
    setSymbol('EURINR');
    setExpiry('11-07-2025');
    setProduct('Future');
    setStrikePrice('91');
    setQuantity('1');
    setOptionType('Call');
  };

  const handleAdd = () => {
    // Create new contract based on form values
    const newContract: Contract = {
      exchange: exchangeValue.replace(' CDS', '').replace(' FO', ''),
      product: product === 'Future' ? 'Futures' : 'Options',
      ticker: symbol,
      expiry: expiry,
      option: product === 'Option' ? `${strikePrice} ${optionType === 'Call' ? 'CE' : 'PE'}` : '0',
      quantity: quantity,
      price: '0', // Default price, can be calculated
      span: '0', // Default span, can be calculated
      exposure: '0', // Default exposure, can be calculated
      total: '0' // Default total, can be calculated
    };
    
    setContracts([...contracts, newContract]);
  };

  const handleDeleteContract = (index: number) => {
    const updatedContracts = contracts.filter((_, i) => i !== index);
    setContracts(updatedContracts);
  };

  return (
    <div className="mb-10">
      <div className='border p-4 sm:p-6 flex flex-col rounded-md shadow-sm bg-white'>
        <h2 className="text-lg sm:text-xl font-medium mb-3">Span</h2>

        {/* Exchange Radio Buttons */}
        <div className='mb-4'>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Exchange</label>
          <div className="flex gap-4 sm:gap-6">
            {(['Buy', 'Sell'] as ExchangeType[]).map((exchange) => (
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

        {/* First Row - Exchange, Symbol, Expiry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Exchangnge</label>
            <div className="relative">
              <select
                value={exchangeValue}
                onChange={(e) => setExchangeValue(e.target.value)}
                className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors bg-white appearance-none text-sm sm:text-base"
              >
                <option value="NSE CDS">NSE CDS</option>
                <option value="NSE FO">NSE FO</option>
                <option value="MCX">MCX</option>
                <option value="BSE FO">BSE FO</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Symbol</label>
            <div className="relative">
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors bg-white appearance-none text-sm sm:text-base"
              >
                <option value="EURINR">EURINR</option>
                <option value="GBPINR">GBPINR</option>
                <option value="JPYINR">JPYINR</option>
                <option value="USDINR">USDINR</option>
                <option value="EURUSD">EURUSD</option>
                <option value="GBPUSD">GBPUSD</option>
                <option value="USDJPY">USDJPY</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Expiry</label>
            <div className="relative">
              <select
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors bg-white appearance-none text-sm sm:text-base"
              >
                <option value="11-07-2025">11-07-2025</option>
                <option value="18-07-2025">18-07-2025</option>
                <option value="25-07-2025">25-07-2025</option>
                <option value="29-07-2025">29-07-2025</option>
                <option value="01-08-2025">01-08-2025</option>
                <option value="08-08-2025">08-08-2025</option>
                <option value="14-08-2025">14-08-2025</option>
                <option value="22-08-2025">22-08-2025</option>
                <option value="26-08-2025">26-08-2025</option>
                <option value="29-08-2025">29-08-2025</option>
                <option value="04-09-2025">04-09-2025</option>
                <option value="12-09-2025">12-09-2025</option>
                <option value="19-09-2025">19-09-2025</option>
                <option value="26-09-2025">26-09-2025</option>
                <option value="29-12-2025">29-12-2025</option>
                <option value="27-03-2026">27-03-2026</option>
                <option value="26-06-2026">26-06-2026</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Product, Strike price, Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Product</label>
            <div className="relative">
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors bg-white appearance-none text-sm sm:text-base"
              >
                <option value="Future">Future</option>
                <option value="Option">Option</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Strike price - only visible when Option is selected */}
          {product === 'Option' && (
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Strike price</label>
              <div className="relative mb-3">
                <select
                  value={strikePrice}
                  onChange={(e) => setStrikePrice(e.target.value)}
                  className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors bg-white appearance-none text-sm sm:text-base"
                >
                  <option value="88.75">88.75</option>
                  <option value="89">89</option>
                  <option value="89.25">89.25</option>
                  <option value="89.5">89.5</option>
                  <option value="89.75">89.75</option>
                  <option value="90">90</option>
                  <option value="90.25">90.25</option>
                  <option value="90.5">90.5</option>
                  <option value="90.75">90.75</option>
                  <option value="91">91</option>
                  <option value="91.25">91.25</option>
                  <option value="91.5">91.5</option>
                  <option value="91.75">91.75</option>
                  <option value="92">92</option>
                  <option value="92.25">92.25</option>
                  <option value="92.5">92.5</option>
                  <option value="92.75">92.75</option>
                  <option value="93">93</option>
                  <option value="93.25">93.25</option>
                  <option value="93.5">93.5</option>
                  <option value="93.75">93.75</option>
                  <option value="94">94</option>
                  <option value="94.25">94.25</option>
                  <option value="94.5">94.5</option>
                  <option value="94.75">94.75</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {/* Call/Put Radio Buttons - directly below Strike price */}
                <div className="flex justify-end">
                <div className="flex gap-6">
                  {(['Call', 'Put'] as OptionType[]).map((option) => (
                  <label key={option} className="flex items-center text-sm cursor-pointer">
                    <div className="relative mr-2">
                    <input
                      type="radio"
                      name="optionType"
                      value={option}
                      checked={optionType === option}
                      onChange={(e) => setOptionType(e.target.value as OptionType)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      optionType === option 
                      ? 'border-[#064D51] bg-white' 
                      : 'border-gray-300 bg-white'
                    }`}>
                      {optionType === option && (
                      <div className="w-2 h-2 rounded-full bg-[#064D51]"></div>
                      )}
                    </div>
                    </div>
                    {option}
                  </label>
                  ))}
                </div>
                </div>
            </div>
          )}

          <div className={product === 'Option' ? '' : 'sm:col-start-2'}>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Quantity</label>
            <div className="relative">
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors bg-white appearance-none text-sm sm:text-base"
              >
                <option value="Future">Future</option>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-5 mb-8">
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-[#064D51] text-white rounded-md hover:bg-[#053A3D] transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
          >
            Add
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 border-2 border-[#064D51] text-[#064D51] rounded-md transition-colors font-medium text-sm sm:text-base order-1 sm:order-2"
          >
            Reset
          </button>
        </div>

      {/* Contracts Table */}
      <div className="mb-8">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <table className="w-full border-collapse border border-gray-200 min-w-[1000px]">
              <thead>
                <tr className="bg-white border border-gray-200">
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Exchange</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Product</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Ticker</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Expiry</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Option</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Quantity</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Price</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Span</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Exposure</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Total</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, index) => (
                  <tr key={index} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F5F7FA]'}`}>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{contract.exchange}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{contract.product}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 font-medium text-xs sm:text-sm">{contract.ticker}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{contract.expiry}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{contract.option}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{contract.quantity}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{contract.price}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{contract.span}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{contract.exposure}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{contract.total}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600">
                      <img 
                        src="/delete.svg" 
                        alt="Delete" 
                        className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:opacity-70" 
                        onClick={() => handleDeleteContract(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Required Margin for This Strategy Table */}
      <div className="w-full">
        <h3 className="mb-4" style={{ fontSize: '24px', fontFamily: 'Lexend', fontWeight: 400 }}>
          Required Margin for This Strategy
        </h3>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody>
              <tr className="bg-[#F5F7FA] border-b border-gray-300">
                <td className="py-3 px-6 text-gray-500 font-medium border-r border-gray-300">Span Margin</td>
                <td className="py-3 px-6 text-left text-gray-500 font-medium">5,693</td>
              </tr>
              <tr className="bg-white border-b border-gray-300">
                <td className="py-3 px-6 text-gray-500 font-medium border-r border-gray-300">Exposure Margin</td>
                <td className="py-3 px-6 text-left text-gray-500 font-medium">302.2</td>
              </tr>
              <tr className="bg-[#F5F7FA] border-b border-gray-300">
                <td className="py-3 px-6 text-gray-500 font-medium border-r border-gray-300">Total Amount Required</td>
                <td className="py-3 px-6 text-left text-gray-500 font-medium">5,995.2</td>
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 text-gray-500 font-medium border-r border-gray-300">Margin Benefit</td>
                <td className="py-3 px-6 text-left text-gray-500 font-medium">5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpanCalculator;