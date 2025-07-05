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
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0'>
        <div className="mb-8 flex flex-col items-center w-full lg:w-auto">
          <h2 className="text-base sm:text-lg font-medium mb-4 text-center">Search for a contract</h2>
          <div className="w-full max-w-[648px] px-4 sm:px-0">
            <input
              type="text"
              placeholder="Eg. GOLD"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col items-center w-full lg:w-auto">
          <h2 className="text-base sm:text-lg font-medium mb-4 text-center">Funds Available</h2>
          <div className="w-full max-w-[648px] px-4 sm:px-0">
            <input
              type="text"
              placeholder="Eg. 100000"
              value={fundsAvailable}
              onChange={(e) => setFundsAvailable(e.target.value)}
              className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="mb-4">
          <h3 className="font-bold text-lg sm:text-xl lg:text-2xl">Based on Exchange File Dated: 04/07/2025</h3>
        </div>
        <div className='mb-4'>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <label className="text-gray-700 font-medium text-sm sm:text-base">Exchange :</label>
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
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-full inline-block align-middle">
          <table className="w-full border-collapse border border-gray-200 min-w-[800px]">
            <thead>
              <tr className="bg-white border border-gray-200">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">No.</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">Scrip</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">Expiry</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">Lot Size</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">Margin/Lot</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">Lots</th>
              </tr>
            </thead>
            <tbody>
              {displayContracts.map((contract, idx) => (
                <tr
                  key={contract.no}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-[#F5F7FA]' : 'bg-white'}`}
                >
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">{contract.no}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 font-medium text-sm sm:text-base">{contract.symbol}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">{contract.intradayMultiplier}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">-</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">-</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MCXFutureMarginCalculator; 