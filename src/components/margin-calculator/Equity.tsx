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
        <h2 className="text-l font-medium mb-4">Search for a contract</h2>
        <div className="w-[600px]">
          <input
            type="text"
            placeholder="Eg. RELIANCE"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-[8px] border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-transparent"
          />
        </div>
      </div>

      {/* Contracts Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-white border border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">No.</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Exchange</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Symbol</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Intraday Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((contract, index) => (
              <tr key={contract.no} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-[#F5F7FA]' : 'bg-white'}`}>
                <td className="py-3 px-4 text-gray-600">{contract.no}</td>
                <td className="py-3 px-4 text-gray-600">{contract.exchange}</td>
                <td className="py-3 px-4 text-gray-600 font-medium">{contract.symbol}</td>
                <td className="py-3 px-4 text-gray-600">{contract.intradayMultiplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquityMarginCalculator; 