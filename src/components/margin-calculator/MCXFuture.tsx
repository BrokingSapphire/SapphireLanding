import React, { useState } from 'react';

interface Contract {
  no: number;
  exchange: string;
  symbol: string;
  intradayMultiplier: string;
}

type ExchangeType = 'MCX' | 'NCDEX';

interface MCXFutureMarginCalculatorProps {
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  filteredContracts?: Contract[];
}

const MCXFutureMarginCalculator: React.FC<MCXFutureMarginCalculatorProps> = ({ 
  searchQuery = '', 
  setSearchQuery = () => {}, 
  filteredContracts = [] 
}) => {
  const [selectedExchange, setSelectedExchange] = useState<ExchangeType>('MCX');
  const [fundsAvailable, setFundsAvailable] = useState<string>('');

  // Sample data for MCX futures
  const sampleContracts: Contract[] = [
    {
      no: 1,
      exchange: 'MCX',
      symbol: 'GOLD',
      intradayMultiplier: '31 Jul 2025'
    },
    {
      no: 2,
      exchange: 'MCX',
      symbol: 'GOLD',
      intradayMultiplier: '28 Aug 2025'
    },
    {
      no: 3,
      exchange: 'MCX',
      symbol: 'SILVER',
      intradayMultiplier: '31 Jul 2025'
    },
    {
      no: 4,
      exchange: 'MCX',
      symbol: 'CRUDE OIL',
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
              placeholder="Eg. GOLD"
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
              {(['MCX', 'NCDEX'] as ExchangeType[]).map((exchange) => (
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
            {displayContracts.map((contract, idx) => (
              <tr
                key={contract.no}
                className={`border-b border-gray-200 hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-[#F5F7FA]' : 'bg-white'}`}
              >
                <td className="py-3 px-4 text-gray-600">{contract.no}</td>
                <td className="py-3 px-4 text-gray-600 font-medium">{contract.symbol}</td>
                <td className="py-3 px-4 text-gray-600">{contract.intradayMultiplier}</td>
                <td className="py-3 px-4 text-gray-600">-</td>
                <td className="py-3 px-4 text-gray-600">-</td>
                <td className="py-3 px-4 text-gray-600">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MCXFutureMarginCalculator; 