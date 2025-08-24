'use client';
import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format, addMonths, subMonths } from 'date-fns';
import { FiCalendar, FiSearch, FiFilter, FiInfo, FiBell, FiRefreshCw, FiExternalLink } from 'react-icons/fi';

const currentYear = new Date().getFullYear();
const defaultFrom = new Date(currentYear, 5, 1); // 1 June
const defaultTo = new Date(currentYear, 6, 1);   // 1 July

export default function EventCalendarPage() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ from: defaultFrom, to: defaultTo });
  const [search, setSearch] = useState('');
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
  
  const [typeOfEvents, setTypeOfEvents] = useState({
    dividend: false,
    bonus: false,
    split: false,
    rights: false,
    merger: false,
    agm: false,
    boardMeeting: false,
  });
  
  const [marketCap, setMarketCap] = useState({
    large: false,
    mid: false,
    small: false
  });

  // Helper function to format date
  const formatEventDate = (dateStr) => {
    try {
      if (!dateStr) return 'Date not available';
      
      let date;
      if (dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          date = new Date(parts[2], parts[1] - 1, parts[0]);
        }
      } else if (dateStr.includes('-')) {
        date = new Date(dateStr);
      } else {
        date = new Date(dateStr);
      }
      
      if (isNaN(date.getTime())) {
        return dateStr;
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    } catch (error) {
      return dateStr || 'Date not available';
    }
  };

  // Helper function to determine purpose
  const determinePurpose = (event) => {
    const eventType = event.eventType?.toLowerCase() || '';
    const purpose = event.purpose?.toLowerCase() || '';
    const remarks = event.remarks || '';
    
    if (event.dividend && event.dividend !== '-') {
      return `Dividend - Rs ${event.dividend} Per Share`;
    }
    
    if (eventType.includes('dividend')) {
      return 'Dividend Declaration';
    }
    
    if (eventType.includes('agm')) {
      return 'Annual General Meeting';
    }
    
    if (eventType.includes('egm')) {
      return 'Extraordinary General Meeting';
    }
    
    if (eventType.includes('board meeting')) {
      return remarks ? `Board Meeting - ${remarks}` : 'Board Meeting';
    }
    
    if (eventType.includes('bonus')) {
      return event.ratio && event.ratio !== '-' ? `Bonus Issue - ${event.ratio}` : 'Bonus Issue';
    }
    
    if (eventType.includes('split')) {
      return event.ratio && event.ratio !== '-' ? `Stock Split - ${event.ratio}` : 'Stock Split';
    }
    
    if (purpose === 'pom') {
      return 'Postal Ballot/Meeting';
    }
    
    if (remarks && remarks !== '') {
      return remarks;
    }
    
    return eventType ? eventType.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Corporate Action';
  };

  // Transform API data
  const transformApiData = (apiData) => {
    if (!apiData?.data?.list) return [];

    const groupedEvents = [];
    
    Object.keys(apiData.data.list).forEach(dateKey => {
      const events = apiData.data.list[dateKey];
      
      if (!Array.isArray(events)) return;
      
      const transformedEvents = events.map(event => ({
        symbol: event.scId || event.stockName?.replace(/\s+/g, '').toUpperCase() || 'N/A',
        company: event.stockName || 'Unknown Company',
        purpose: determinePurpose(event),
        eventType: event.eventType || 'Unknown',
        announcementDate: event.announcementDate,
        exDate: event.exDate,
        dividend: event.dividend !== '-' ? event.dividend : null,
        lastValue: event.lastValue,
        perChange: event.perChange,
        marketCap: event.marketCap || 0,
        url: event.url,
        source: event.source,
        ratio: event.ratio !== '-' ? event.ratio : null,
        rawEvent: event
      }));

      const formattedDate = formatEventDate(events[0]?.disp_date || events[0]?.exDate || dateKey);
      
      groupedEvents.push({
        date: formattedDate,
        events: transformedEvents
      });
    });

    return groupedEvents;
  };

  // Fetch events data
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = 'https://api.moneycontrol.com/mcapi/v1/ecalendar/corporate-action?indexId=All&page=1&event=All&apiVersion=161&orderBy=asc&deviceType=W&duration=UP';
      const CORS_PROXY = 'https://api.allorigins.win/get?url=';
      const proxyUrl = CORS_PROXY + encodeURIComponent(apiUrl);
      
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const proxyData = await response.json();
      const apiData = JSON.parse(proxyData.contents);
      const transformedData = transformApiData(apiData);
      
      setEventData(transformedData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(`API Error: ${err.message}. Please try again.`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter data
  const filteredData = eventData.map(group => {
    let filteredEvents = group.events;
    
    if (search) {
      filteredEvents = filteredEvents.filter(event => 
        event.symbol.toLowerCase().includes(search.toLowerCase()) ||
        event.company.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const activeTypes = Object.entries(typeOfEvents).filter(([, v]) => v).map(([k]) => k.toLowerCase());
    if (activeTypes.length > 0) {
      filteredEvents = filteredEvents.filter(event => {
        const purpose = event.purpose.toLowerCase();
        const eventType = event.eventType?.toLowerCase() || '';
        
        return activeTypes.some(type => {
          if (type === 'boardmeeting') return eventType.includes('board meeting');
          if (type === 'agm') return eventType.includes('agm') || eventType.includes('egm');
          return purpose.includes(type) || eventType.includes(type);
        });
      });
    }
    
    const activeMarketCaps = Object.entries(marketCap).filter(([, v]) => v).map(([k]) => k);
    if (activeMarketCaps.length > 0) {
      filteredEvents = filteredEvents.filter(event => {
        const cap = event.marketCap || 0;
        if (activeMarketCaps.includes('large') && cap >= 20000000000) return true;
        if (activeMarketCaps.includes('mid') && cap >= 5000000000 && cap < 20000000000) return true;
        if (activeMarketCaps.includes('small') && cap < 5000000000) return true;
        return false;
      });
    }

    return { ...group, events: filteredEvents };
  }).filter(group => group.events.length > 0);

  const displayData = filteredData;

  // Calculate event counts
  const eventTypeCounts = {
    dividend: 0,
    bonus: 0,
    split: 0,
    rights: 0,
    merger: 0,
    agm: 0,
    boardMeeting: 0,
  };

  eventData.forEach(group => {
    group.events.forEach(event => {
      const purpose = event.purpose.toLowerCase();
      const eventType = event.eventType?.toLowerCase() || '';
      
      if (purpose.includes('dividend')) eventTypeCounts.dividend++;
      if (purpose.includes('bonus')) eventTypeCounts.bonus++;
      if (purpose.includes('split')) eventTypeCounts.split++;
      if (purpose.includes('rights')) eventTypeCounts.rights++;
      if (purpose.includes('merger')) eventTypeCounts.merger++;
      if (eventType.includes('agm') || eventType.includes('egm')) eventTypeCounts.agm++;
      if (eventType.includes('board meeting')) eventTypeCounts.boardMeeting++;
    });
  });

  // Get active filter tags
  const activeFilterTags = [];
  Object.entries(typeOfEvents).forEach(([k, v]) => {
    if (v) {
      let label = k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1');
      if (k === 'boardMeeting') label = 'Board Meeting';
      if (k === 'agm') label = 'AGM';
      activeFilterTags.push({ label, type: 'type', key: k });
    }
  });

  Object.entries(marketCap).forEach(([k, v]) => {
    if (v) {
      activeFilterTags.push({ 
        label: k.charAt(0).toUpperCase() + k.slice(1) + ' Cap', 
        type: 'cap', 
        key: k 
      });
    }
  });

  // Remove filter tag
  const removeFilterTag = (tag) => {
    if (tag.type === 'type') {
      setTypeOfEvents(s => ({ ...s, [tag.key]: false }));
    } else if (tag.type === 'cap') {
      setMarketCap(s => ({ ...s, [tag.key]: false }));
    }
  };

  // Date range handlers
  const shiftDateRange = (direction) => {
    if (!dateRange.from || !dateRange.to) return;
    const newFrom = direction === 'back' ? subMonths(dateRange.from, 1) : addMonths(dateRange.from, 1);
    const newTo = direction === 'back' ? subMonths(dateRange.to, 1) : addMonths(dateRange.to, 1);
    setDateRange({ from: newFrom, to: newTo });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Event Calendar
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Your one-stop calendar for all key stock market events and holidays in India.
              </p>
            </div>
            
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiCalendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <span className="ml-4 text-lg text-gray-600">Loading events...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Event Calendar
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Your one-stop calendar for all key stock market events and holidays in India.
            </p>
          </div>

          {/* Error indicator */}
          {error && (
            <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiInfo className="h-5 w-5 text-amber-600 mr-3" />
                  <span className="text-amber-800 text-sm font-medium">{error}</span>
                </div>
                <button 
                  onClick={fetchEvents}
                  className="ml-4 inline-flex items-center px-3 py-1.5 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200"
                >
                  <FiRefreshCw className="h-4 w-4 mr-1" />
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Filter Controls */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            {/* Active Filter Tags */}
            {activeFilterTags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {activeFilterTags.map(tag => (
                    <span
                      key={tag.label}
                      className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-colors"
                    >
                      {tag.label}
                      <button
                        className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                        onClick={() => removeFilterTag(tag)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Control Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Date Range Selector */}
              <div className="flex items-center bg-gray-50 rounded-xl p-3 border border-gray-200">
                <FiCalendar className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-700 font-medium mr-4">
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, 'd MMM')} - ${format(dateRange.to, 'd MMM')}`
                    : 'Select date range'}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    onClick={() => shiftDateRange('back')}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    onClick={() => shiftDateRange('forward')}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center space-x-4">
                {/* Filter Popover */}
                <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      <FiFilter className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Filter</span>
                      {activeFilterTags.length > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                          {activeFilterTags.length}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 bg-white rounded-xl shadow-xl border border-gray-200" align="end">
                    <div className="p-6">
                      {/* Type of events */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Type of events</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {Object.entries(eventTypeCounts).map(([key, count]) => {
                            let label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                            if (key === 'boardMeeting') label = 'Board Meeting';
                            if (key === 'agm') label = 'AGM';
                            
                            return (
                              <label key={key} className="flex items-center justify-between cursor-pointer group py-1">
                                <div className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    checked={typeOfEvents[key]} 
                                    onChange={e => setTypeOfEvents(s => ({ ...s, [key]: e.target.checked }))}
                                    className="hidden" 
                                  />
                                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                    typeOfEvents[key] 
                                      ? 'bg-blue-600 border-blue-600' 
                                      : 'border-gray-300 group-hover:border-gray-400'
                                  }`}>
                                    {typeOfEvents[key] && (
                                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                                  {count}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Market Cap */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Market Cap</h4>
                        <div className="space-y-3">
                          {[
                            { key: 'large', label: 'Large Cap', count: eventData.reduce((acc, group) => acc + group.events.filter(e => e.marketCap >= 20000000000).length, 0) },
                            { key: 'mid', label: 'Mid Cap', count: eventData.reduce((acc, group) => acc + group.events.filter(e => e.marketCap >= 5000000000 && e.marketCap < 20000000000).length, 0) },
                            { key: 'small', label: 'Small Cap', count: eventData.reduce((acc, group) => acc + group.events.filter(e => e.marketCap < 5000000000).length, 0) }
                          ].map(({ key, label, count }) => (
                            <label key={key} className="flex items-center justify-between cursor-pointer group">
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  checked={marketCap[key]} 
                                  onChange={e => setMarketCap(s => ({ ...s, [key]: e.target.checked }))}
                                  className="hidden" 
                                />
                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                  marketCap[key] 
                                    ? 'bg-blue-600 border-blue-600' 
                                    : 'border-gray-300 group-hover:border-gray-400'
                                }`}>
                                  {marketCap[key] && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
                              </div>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                                {count}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Search Input */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Events Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Corporate Events</h3>
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                  {displayData.reduce((total, group) => total + group.events.length, 0)} events
                </span>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 z-10 bg-white border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Symbol</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Company Name</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Purpose</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Price Info</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center">
                          <FiCalendar className="h-12 w-12 text-gray-300 mb-4" />
                          <p className="text-gray-500 text-lg font-medium">No events found</p>
                          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    displayData.map((group, groupIdx) => (
                      <React.Fragment key={group.date}>
                        {/* Date Header */}
                        <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-[57px] z-10">
                          <td colSpan={5} className="px-6 py-3 border-b border-gray-200">
                            <div className="flex items-center">
                              <FiCalendar className="h-4 w-4 text-blue-600 mr-2" />
                              <span className="text-sm font-semibold text-blue-900">{group.date}</span>
                              <span className="ml-3 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                {group.events.length} events
                              </span>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Events */}
                        {group.events.map((event, idx) => (
                          <tr 
                            key={`${event.symbol}-${idx}`} 
                            className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 group"
                          >
                            <td className="px-6 py-4">
                              <div className="flex flex-col space-y-1">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                                  {event.symbol}
                                </span>
                                {event.announcementDate && (
                                  <span className="text-xs text-gray-500">
                                    Announced: {event.announcementDate}
                                  </span>
                                )}
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={event.company}>
                                  {event.company}
                                </div>
                                {event.source && event.source !== '-' && (
                                  <span className="text-xs text-gray-500 mt-1">
                                    Source: {event.source}
                                  </span>
                                )}
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex flex-col space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-700">{event.purpose}</span>
                                  <div className="relative group/tooltip">
                                    <FiInfo className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-help" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 max-w-xs">
                                      <div className="text-center">
                                        {event.dividend && <div>Dividend: Rs {event.dividend}</div>}
                                        {event.ratio && <div>Ratio: {event.ratio}</div>}
                                        {(!event.dividend && !event.ratio) && 'More details about this corporate action'}
                                      </div>
                                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Event Type Badge */}
                                <div className="flex items-center space-x-2">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    event.eventType.includes('AGM') || event.eventType.includes('EGM') 
                                      ? 'bg-green-100 text-green-800'
                                      : event.eventType.includes('Dividend')
                                      ? 'bg-purple-100 text-purple-800' 
                                      : event.eventType.includes('Board')
                                      ? 'bg-orange-100 text-orange-800'
                                      : event.eventType.includes('Bonus')
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {event.eventType}
                                  </span>
                                </div>
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex flex-col space-y-1 text-sm">
                                {event.lastValue && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">₹{event.lastValue}</span>
                                    {event.perChange && (
                                      <span className={`text-xs font-medium ${
                                        parseFloat(event.perChange) >= 0 
                                          ? 'text-green-600' 
                                          : 'text-red-600'
                                      }`}>
                                        {parseFloat(event.perChange) >= 0 ? '+' : ''}{event.perChange}%
                                      </span>
                                    )}
                                  </div>
                                )}
                                {event.marketCap && (
                                  <span className="text-xs text-gray-500">
                                    MCap: ₹{(event.marketCap / 10000000).toFixed(1)}Cr
                                  </span>
                                )}
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" title="Set Alert">
                                  <FiBell className="h-4 w-4" />
                                </button>
                                {event.url && (
                                  <a 
                                    href={event.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                    title="View Details"
                                  >
                                    <FiExternalLink className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}