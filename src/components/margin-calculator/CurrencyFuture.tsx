import React, { useState } from 'react';

interface Contract {
  no: number;
  exchange: string;
  symbol: string;
  intradayMultiplier: string;
}

type ExchangeType = 'NSE' | 'BSE';

interface CurrencyFutureMarginCalculatorProps {
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  filteredContracts?: Contract[];
}

const CurrencyFutureMarginCalculator: React.FC<CurrencyFutureMarginCalculatorProps> = ({ 
  searchQuery = '', 
  setSearchQuery = () => {}, 
  filteredContracts = [] 
}) => {
  const [selectedExchange, setSelectedExchange] = useState<ExchangeType>('NSE');
  const [fundsAvailable, setFundsAvailable] = useState<string>('');

  // Sample data for currency futures
  const sampleContracts: Contract[] = [
    {
      no: 1,
      exchange: 'NSE',
      symbol: 'USDINR',
      intradayMultiplier: '31 Jul 2025'
    },
    {
      no: 2,
      exchange: 'NSE',
      symbol: 'USDINR',
      intradayMultiplier: '28 Aug 2025'
    },
    {
      no: 3,
      exchange: 'NSE',
      symbol: 'USDINR',
      intradayMultiplier: '30 Sep 2025'
    },
    {
      no: 4,
      exchange: 'NSE',
      symbol: 'EURINR',
      intradayMultiplier: '31 Jul 2025'
    }
  ];

  const displayContracts = filteredContracts && filteredContracts.length > 0 ? filteredContracts : sampleContracts;

  return (
    <div>
      {/* Search Section */}
      <div className='flex flex-row justify-between items-center'>
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Search for a contract</h2>
          <div className="w-[648px]">
            <input
              type="text"
              placeholder="Eg. USDINR"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-[8px] border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Funds Available</h2>
          <div className="w-[648px]">
            <input
              type="text"
              placeholder="Eg. 100000"
              value={fundsAvailable}
              onChange={(e) => setFundsAvailable(e.target.value)}
              className="w-full px-4 py-[8px] border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-row items-center justify-between">
        <div className="mb-4">
          <h3 className="font-bold text-2xl">Based on Exchange File Dated: 04/07/2025</h3>
        </div>
        <div className='mb-4'>
          <div className="flex flex-row items-center gap-4">
            <label className="text-gray-700 font-medium">Exchange :</label>
            <div className="flex flex-row gap-4">
              {(['NSE', 'BSE'] as ExchangeType[]).map((exchange) => (
                <label key={exchange} className="flex items-center text-sm cursor-pointer">
                  <div className="relative mr-2">
                    <input
                      type="radio"
                      name="exchange"
                      value={exchange}
                      checked={selectedExchange === exchange}
                      onChange={(e) => setSelectedExchange(e.target.value as ExchangeType)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedExchange === exchange
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
        </div>
      </div>

      {/* Contracts Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-white border border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">No.</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Scrip</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Expiry</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Lot Size</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Margin/Lot</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Lots</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50 bg-[#F5F7FA]">
              <td className="py-3 px-4 text-gray-600">1</td>
              <td className="py-3 px-4 text-gray-600 font-medium">USDINR</td>
              <td className="py-3 px-4 text-gray-600">31 Jul 2025</td>
              <td className="py-3 px-4 text-gray-600">1000</td>
              <td className="py-3 px-4 text-gray-600">₹ 2,58,125.0</td>
              <td className="py-3 px-4 text-gray-600">0</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50 bg-white">
              <td className="py-3 px-4 text-gray-600">2</td>
              <td className="py-3 px-4 text-gray-600 font-medium">USDINR</td>
              <td className="py-3 px-4 text-gray-600">28 Aug 2025</td>
              <td className="py-3 px-4 text-gray-600">1000</td>
              <td className="py-3 px-4 text-gray-600">₹ 2,59,750.0</td>
              <td className="py-3 px-4 text-gray-600">0</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50 bg-[#F5F7FA]">
              <td className="py-3 px-4 text-gray-600">3</td>
              <td className="py-3 px-4 text-gray-600 font-medium">USDINR</td>
              <td className="py-3 px-4 text-gray-600">30 Sep 2025</td>
              <td className="py-3 px-4 text-gray-600">1000</td>
              <td className="py-3 px-4 text-gray-600">₹ 2,61,375.0</td>
              <td className="py-3 px-4 text-gray-600">0</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50 bg-white">
              <td className="py-3 px-4 text-gray-600">4</td>
              <td className="py-3 px-4 text-gray-600 font-medium">EURINR</td>
              <td className="py-3 px-4 text-gray-600">31 Jul 2025</td>
              <td className="py-3 px-4 text-gray-600">1000</td>
              <td className="py-3 px-4 text-gray-600">₹ 2,85,450.0</td>
              <td className="py-3 px-4 text-gray-600">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyFutureMarginCalculator; 