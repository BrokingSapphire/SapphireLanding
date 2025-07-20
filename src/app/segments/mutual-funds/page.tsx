import React from 'react';

const TradingCalendar = () => {
  const tradingData = [
    { date: '2025-01-15', holiday: 'Makar Sankranti', segment: 'Equity', currency: 'INR', category: 'equity' },
    { date: '2025-01-26', holiday: 'Republic Day', segment: 'F&O', currency: 'USD', category: 'fno' },
    { date: '2025-02-12', holiday: 'Maha Shivratri', segment: 'Commodity', currency: 'INR', category: 'commodity' },
    { date: '2025-03-14', holiday: 'Holi', segment: 'Clearing', currency: 'EUR', category: 'clearing' },
    { date: '2025-04-18', holiday: 'Good Friday', segment: 'Equity', currency: 'INR', category: 'equity' },
    { date: '2025-05-01', holiday: 'Labour Day', segment: 'F&O', currency: 'USD', category: 'fno' },
    { date: '2025-08-15', holiday: 'Independence Day', segment: 'Commodity', currency: 'INR', category: 'commodity' },
    { date: '2025-10-02', holiday: 'Gandhi Jayanti', segment: 'Clearing', currency: 'GBP', category: 'clearing' },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'equity':
        return '#1A73E8';
      case 'fno':
        return '#FFAC00';
      case 'commodity':
        return '#D93434';
      case 'clearing':
        return '#A75EFF';
      default:
        return '#2D8A4F';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Trading Calendar</h1>
          <p className="text-gray-600">Market holidays and important dates</p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-black text-white">
            <div className="px-4 py-3 text-center">
              <span 
                style={{
                  fontFamily: 'Lexend, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FFFFFF'
                }}
              >
                Date
              </span>
            </div>
            <div className="px-4 py-3 text-center">
              <span 
                style={{
                  fontFamily: 'Lexend, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FFFFFF'
                }}
              >
                Holiday
              </span>
            </div>
            <div className="px-4 py-3 text-center">
              <span 
                style={{
                  fontFamily: 'Lexend, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FFFFFF'
                }}
              >
                Segment
              </span>
            </div>
            <div className="px-4 py-3 text-center">
              <span 
                style={{
                  fontFamily: 'Lexend, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FFFFFF'
                }}
              >
                Currency
              </span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {tradingData.map((item, index) => (
              <div key={index} className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                {/* Date Column */}
                <div className="px-4 py-4 text-center flex items-center justify-center">
                  <span 
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#636363'
                    }}
                  >
                    {item.date}
                  </span>
                </div>

                {/* Holiday Column */}
                <div className="px-4 py-4 text-center flex items-center justify-center">
                  <span 
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#636363'
                    }}
                  >
                    {item.holiday}
                  </span>
                </div>

                {/* Segment Column */}
                <div className="px-4 py-4 text-center flex items-center justify-center">
                  <span 
                    className="px-3 py-1 rounded-full text-white text-xs font-medium"
                    style={{
                      backgroundColor: getCategoryColor(item.category),
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontSize: '12px',
                      lineHeight: '100%',
                      letterSpacing: '0%'
                    }}
                  >
                    {item.segment}
                  </span>
                </div>

                {/* Currency Column */}
                <div className="px-4 py-4 text-center flex items-center justify-center">
                  <span 
                    style={{
                      fontFamily: 'SF Pro, system-ui, sans-serif',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#636363'
                    }}
                  >
                    {item.currency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Segment Categories</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: '#1A73E8' }}
              ></div>
              <span className="text-sm text-gray-700">Equity</span>
            </div>
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: '#FFAC00' }}
              ></div>
              <span className="text-sm text-gray-700">F&O</span>
            </div>
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: '#D93434' }}
              ></div>
              <span className="text-sm text-gray-700">Commodity</span>
            </div>
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: '#A75EFF' }}
              ></div>
              <span className="text-sm text-gray-700">Clearing</span>
            </div>
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: '#2D8A4F' }}
              ></div>
              <span className="text-sm text-gray-700">General</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingCalendar;