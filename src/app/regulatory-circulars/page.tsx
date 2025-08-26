"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, ArrowUpDown, ExternalLink, FileText, Loader2, Home, ChevronRight, WifiOff, X, Check } from 'lucide-react';

interface Circular {
  name: string;
  title: string;
  issuer: string;
  dateIssued: string;
  circularNumber: string;
  circularLink: string;
  Applicable: number;
  industry: string[];
  license: string[];
  topic: string[];
}


// Move fallback data outside component to prevent infinite re-renders
const FALLBACK_DATA: Circular[] = [
  {
    name: "Circular-5110",
    title: "Mock Trading",
    issuer: "MCX",
    dateIssued: "2025-08-21",
    circularNumber: "MCXCCL/TECH/176/2025",
    circularLink: "#",
    Applicable: 0,
    industry: ["MCX"],
    license: ["MCX"],
    topic: ["Mock Trading"]
  },
  {
    name: "Circular-5111",
    title: "Notification of PF, TF and Money Laundering risks to private sector entities",
    issuer: "SEBI",
    dateIssued: "2025-08-21",
    circularNumber: "SEBI/HO/MIRSD/2025/118",
    circularLink: "#",
    Applicable: 0,
    industry: ["All Intermediaries"],
    license: ["SEBI"],
    topic: ["Prevention of Money-Laundering"]
  },
  {
    name: "Circular-5112",
    title: "System Testing Mock on August 23, 2025",
    issuer: "NSE",
    dateIssued: "2025-08-21",
    circularNumber: "NSE/CMTR/69782",
    circularLink: "#",
    Applicable: 0,
    industry: ["NSE"],
    license: ["NSE"],
    topic: ["Mock Trading", "System Testing"]
  },
  {
    name: "Circular-5113",
    title: "Extension of timeline for implementation of margin obligations",
    issuer: "BSE",
    dateIssued: "2025-08-20",
    circularNumber: "BSE/20250820-15",
    circularLink: "#",
    Applicable: 0,
    industry: ["BSE", "Stock Broking"],
    license: ["BSE"],
    topic: ["Margin obligation", "Timeline Extension"]
  },
  {
    name: "Circular-5114",
    title: "Consultation paper on Review of Stock Brokers Regulations",
    issuer: "SEBI",
    dateIssued: "2025-08-19",
    circularNumber: "SEBI/HO/MIRSD/2025/119",
    circularLink: "#",
    Applicable: 0,
    industry: ["Stock Broking", "All Exchanges"],
    license: ["SEBI"],
    topic: ["Stock Brokers", "Consultation Paper"]
  }
];

const ComplianceCircularsDashboard: React.FC = () => {
  // State for API data - ensure proper initialization
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for search and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'issuer' | 'title'>('date');
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20);

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Sort options
  const sortOptions = [
    { value: 'date', label: 'Date (Newest first)' },
    { value: 'issuer', label: 'Issuer (A-Z)' },
    { value: 'title', label: 'Title (A-Z)' }
  ];

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close sort popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.sort-popup-container')) {
        setShowSortPopup(false);
      }
    };

    if (showSortPopup) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSortPopup]);

  // Fetch data from API with fallback - FIXED
  const fetchCirculars = useCallback(async (page: number = 1, search: string = '') => {
    if (loading) return; // Keep the guard, but don't depend on loading
    
    setLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * limit;
      const requestBody = {
        limit,
        offset,
        ...(search.trim() && { search: search.trim() })
      };
  
      const response = await fetch('http://localhost:3000/api/v1/proxy/compliance/regulations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
  
      const apiResponse = await response.json();
      const data = apiResponse.data?.data;
      
      if (!data || !Array.isArray(data.circular)) {
        throw new Error('Invalid API response structure');
      }
      
      const newCirculars = data.circular;
      
      if (page === 1) {
        setCirculars(newCirculars);
      } else {
        setCirculars(prev => Array.isArray(prev) ? [...prev, ...newCirculars] : newCirculars);
      }
      
      setTotalCount(data.circular_total_count || 0);
      
    } catch (err) {
      console.error('API Error, using fallback data:', err);
      setError('Unable to connect to server. Showing sample data.');
      
      if (page === 1) {
        setCirculars(FALLBACK_DATA);
        setTotalCount(FALLBACK_DATA.length);
      }
    } finally {
      setLoading(false);
    }
  }, [limit]); // ✅ Remove 'loading' dependency

  // Initial load
  useEffect(() => {
    fetchCirculars(1);
  }, [fetchCirculars]);

  // Handle search - FIXED
  useEffect(() => {
    setCurrentPage(1);
    fetchCirculars(1, debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchCirculars]); // Removed searchTerm dependency

  // Filter and sort circulars - FIXED
  const filteredCirculars = useMemo(() => {
    // Safety check: ensure circulars is an array
    if (!Array.isArray(circulars)) {
      return [];
    }
    
    const filtered = [...circulars];

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime();
        case 'issuer':
          return a.issuer.localeCompare(b.issuer);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [circulars, sortBy]);

  // Load more data
  const loadMore = () => {
    if (!error && Array.isArray(circulars)) { // Add safety check
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCirculars(nextPage, debouncedSearchTerm);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getIssuerColor = (issuer: string) => {
    const colors: { [key: string]: string } = {
      'SEBI': 'bg-blue-50 text-blue-700 border-blue-200',
      'NSE': 'bg-green-50 text-green-700 border-green-200',
      'BSE': 'bg-orange-50 text-orange-700 border-orange-200',
      'MCX': 'bg-purple-50 text-purple-700 border-purple-200',
      'NCDEX': 'bg-pink-50 text-pink-700 border-pink-200',
      'CDSL': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'NSDL': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'MCX-SX': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'MSEI': 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[issuer] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // FIXED: Add safety check for hasMoreData
  const hasMoreData = !error && Array.isArray(circulars) && circulars.length < totalCount;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Compliance</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Regulatory Circulars</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">REGULATORY CIRCULARS</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete guide for regulatory compliance, notifications, and industry updates from SEBI, exchanges, and depositories.
          </p>
        </div>

        {/* Connection Status */}
        {error && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2">
              <WifiOff className="h-5 w-5 text-orange-600" />
              <span className="text-orange-800 font-medium">Offline Mode:</span>
              <span className="text-orange-700">Showing sample data. Please check your connection.</span>
            </div>
          </div>
        )}

        {/* Search Bar with Sort */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              {loading && searchTerm && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
              )}
              <input
                type="text"
                placeholder="Eg: Computer to Computer Link (CTCL)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Sort Button */}
            <div className="relative sort-popup-container">
              <button
                onClick={() => setShowSortPopup(!showSortPopup)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowUpDown className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Sort</span>
              </button>

              {/* Sort Popup */}
              {showSortPopup && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="flex items-center justify-between p-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Sort by</span>
                      <button
                        onClick={() => setShowSortPopup(false)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="py-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value as 'date' | 'issuer' | 'title');
                            setShowSortPopup(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        >
                          <span>{option.label}</span>
                          {sortBy === option.value && (
                            <Check className="h-4 w-4 text-teal-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
            <span>
              Showing {filteredCirculars.length} of {circulars?.length || 0} loaded
              {totalCount > (circulars?.length || 0) && ` (${totalCount.toLocaleString()} total)`}
            </span>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setDebouncedSearchTerm('');
                }}
                className="text-teal-600 hover:text-teal-800 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && circulars.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 text-teal-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading circulars...</p>
            </div>
          </div>
        )}

        {/* Circulars List */}
        {!loading || circulars.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {filteredCirculars.map((circular) => (
              <div key={circular.name} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getIssuerColor(circular.issuer)}`}>
                        {circular.issuer}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(circular.dateIssued)}</span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight">
                      {circular.title}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Circular No:</span> {circular.circularNumber}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {circular.topic.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {circular.industry.length > 1 && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Applicable to:</span>{' '}
                        {circular.industry.join(', ')}
                      </div>
                    )}
                  </div>
                  
                  <a
                    href={circular.circularLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                  >
                    <span>View PDF</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}

            {/* Load More Button */}
            {hasMoreData && (
              <div className="p-6 text-center border-t border-gray-200">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading more...</span>
                    </>
                  ) : (
                    <span>Load More Circulars</span>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : null}

        {/* No Results */}
        {filteredCirculars.length === 0 && !loading && circulars.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No circulars found</h3>
            <p className="text-gray-500">Try adjusting your search term to find relevant circulars.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceCircularsDashboard;