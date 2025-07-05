import React from 'react';

interface Contract {
  no: number;
  exchange: string;
  symbol: string;
  intradayMultiplier: string;
}

interface EquityMarginCalculatorProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filteredContracts: Contract[];
}

const EquityMarginCalculator: React.FC<EquityMarginCalculatorProps> = ({ searchQuery, setSearchQuery, filteredContracts }) => {
  return (
    <div>
      {/* Search Section */}
      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-base sm:text-lg font-medium mb-4 text-center">Search for a contract</h2>
        <div className="w-full max-w-[600px] px-4 sm:px-0">
          <input
            type="text"
            placeholder="Eg. RELIANCE"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 sm:py-[8px] border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-transparent text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Contracts Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-full inline-block align-middle">
          <table className="w-full border-collapse border border-gray-200 min-w-[600px]">
            <thead>
              <tr className="bg-white border border-gray-200">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">No.</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">Exchange</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">Symbol</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm sm:text-base">Intraday Multiplier</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract, index) => (
                <tr key={contract.no} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-[#F5F7FA]' : 'bg-white'}`}>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">{contract.no}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">{contract.exchange}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 font-medium text-sm sm:text-base">{contract.symbol}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">{contract.intradayMultiplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquityMarginCalculator; 