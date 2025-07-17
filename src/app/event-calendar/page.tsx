'use client';
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format, isWithinInterval, parse, addMonths, subMonths } from 'date-fns';
import { FiCalendar, FiFilter, FiSearch } from 'react-icons/fi';

// Set default date range to 1 June - 1 July of the current year
const currentYear = new Date().getFullYear();
const defaultFrom = new Date(currentYear, 5, 1); // 1 June
const defaultTo = new Date(currentYear, 6, 1);   // 1 July

// Event data as shown in the screenshot
const eventData = [
  // Events for default date range (1 June - 1 July)
  {
    date: `Jun 5, ${currentYear}, Wednesday`,
    events: [
      { symbol: 'INFY', company: 'Infosys Limited', purpose: 'Dividend - Rs 10 Per Share' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
      { symbol: 'TCS', company: 'Tata Consultancy Services Limited', purpose: 'Board Meeting' },
    ],
  },
  {
    date: `Jun 15, ${currentYear}, Saturday`,
    events: [
      { symbol: 'HDFCBANK', company: 'HDFC Bank Limited', purpose: 'Quarterly Results' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Bonus Issue' },
    ],
  },
  {
    date: `Jun 28, ${currentYear}, Friday`,
    events: [
      { symbol: 'ITC', company: 'ITC Limited', purpose: 'Dividend - Rs 5 Per Share' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'AGM' },
    ],
  },
  {
    date: 'Feb 19, 2025, Tuesday',
    events: [
      {
        symbol: 'TCS',
        company: 'Tata Consultancy Services Limited',
        purpose: 'Interim Dividend - Rs 11 Per Share',
        info: true,
        bell: true,
      },
      {
        symbol: 'TATATECH',
        company: 'Tata Technologies Limited',
        purpose: 'February 19, 2025, Wednesday',
      },
      {
        symbol: 'CAPTRUST',
        company: 'Capital Trust Limited',
        purpose: 'Interim Dividend - Rs 11 Per Share',
      },
      {
        symbol: 'RIIL',
        company: 'Reliance Industrial Infrastructure Limited',
        purpose: 'Interim Dividend - Rs 11 Per Share',
        bell: true,
      },
      {
        symbol: 'TEJASNET',
        company: 'Tejas Networks Limited',
        purpose: 'Interim Dividend - Rs 11 Per Share',
      },
      {
        symbol: '67GS2029',
        company: 'Government of India',
        purpose: 'Interim Dividend - Rs 11 Per Share',
      },
    ],
  },
  {
    date: 'Feb 20, 2025, Wednesday',
    events: [
      {
        symbol: 'PNB',
        company: 'Punjab National Bank',
        purpose: 'Interim Dividend - Rs 11 Per Share',
      },
      {
        symbol: 'VOLTAS',
        company: 'Voltas Limited',
        purpose: 'Interim Dividend - Rs 11 Per Share',
      },
    ],
  },
  // Additional groups for testing sticky header
  {
    date: 'Feb 21, 2025, Thursday',
    events: [
      { symbol: 'INFY', company: 'Infosys Limited', purpose: 'Board Meeting' },
      { symbol: 'HDFCBANK', company: 'HDFC Bank Limited', purpose: 'Quarterly Results' },
      { symbol: 'SBIN', company: 'State Bank of India', purpose: 'Dividend - Rs 5 Per Share' },
      { symbol: 'ITC', company: 'ITC Limited', purpose: 'Bonus Issue' },
      { symbol: 'RELIANCE', company: 'Reliance Industries Limited', purpose: 'Buyback' },
      { symbol: 'ONGC', company: 'Oil and Natural Gas Corporation', purpose: 'AGM' },
    ],
  },
  {
    date: 'Feb 22, 2025, Friday',
    events: [
      { symbol: 'TATAMOTORS', company: 'Tata Motors Limited', purpose: 'Dividend - Rs 2 Per Share' },
      { symbol: 'BAJAJ-AUTO', company: 'Bajaj Auto Limited', purpose: 'Quarterly Results' },
      { symbol: 'MARUTI', company: 'Maruti Suzuki India Limited', purpose: 'Board Meeting' },
      { symbol: 'AXISBANK', company: 'Axis Bank Limited', purpose: 'Dividend - Rs 3 Per Share' },
      { symbol: 'ICICIBANK', company: 'ICICI Bank Limited', purpose: 'Bonus Issue' },
      { symbol: 'LT', company: 'Larsen & Toubro Limited', purpose: 'AGM' },
    ],
  },
  {
    date: 'Feb 23, 2025, Saturday',
    events: [
      { symbol: 'SUNPHARMA', company: 'Sun Pharmaceutical Industries', purpose: 'Dividend - Rs 1 Per Share' },
      { symbol: 'DRREDDY', company: 'Dr. Reddy’s Laboratories', purpose: 'Quarterly Results' },
      { symbol: 'CIPLA', company: 'Cipla Limited', purpose: 'Board Meeting' },
      { symbol: 'DIVISLAB', company: 'Divi’s Laboratories', purpose: 'Dividend - Rs 4 Per Share' },
      { symbol: 'ULTRACEMCO', company: 'UltraTech Cement', purpose: 'Bonus Issue' },
      { symbol: 'GRASIM', company: 'Grasim Industries', purpose: 'AGM' },
    ],
  },
];

// Remove filterTags and related state
// const filterTags = ['Dividend', 'Bonus', 'Large Cap'];
// const [activeTags, setActiveTags] = useState(filterTags);
// const [appliedTags, setAppliedTags] = useState(filterTags);

function parseEventDate(dateStr: string) {
  return parse(dateStr.split(',')[0] + ',' + dateStr.split(',')[1], 'MMM d, yyyy', new Date());
}

export default function EventCalendarPage() {
  // Filter option states (not applied yet)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: defaultFrom, to: defaultTo });
  const [search, setSearch] = useState('');
  // New: filter checkbox states
  const [showEventsFrom, setShowEventsFrom] = useState<{ watchlist: boolean; holdings: boolean }>({ watchlist: false, holdings: false });
  const [typeOfEvents, setTypeOfEvents] = useState<{
    dividend: boolean;
    bonus: boolean;
    split: boolean;
    reverseSplit: boolean;
    rights: boolean;
    merger: boolean;
    demerger: boolean;
    results: boolean;
    buyback: boolean;
    reductionOfCapital: boolean;
  }>({
    dividend: false,
    bonus: false,
    split: false,
    reverseSplit: false,
    rights: false,
    merger: false,
    demerger: false,
    results: false,
    buyback: false,
    reductionOfCapital: false,
  });
  const [marketCap, setMarketCap] = useState<{ large: boolean; mid: boolean; small: boolean }>({ large: false, mid: false, small: false });
  // Applied filter states
  const [appliedDateRange, setAppliedDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: defaultFrom, to: defaultTo });
  const [appliedSearch, setAppliedSearch] = useState('');
  // Remove filterTags and related state
  // const [activeTags, setActiveTags] = useState(filterTags);
  // const [appliedTags, setAppliedTags] = useState(filterTags);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Add state for filter popover open/close
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);

  // Add state for applied filters
  const [appliedTypeOfEvents, setAppliedTypeOfEvents] = useState<typeof typeOfEvents>(typeOfEvents);
  const [appliedShowEventsFrom, setAppliedShowEventsFrom] = useState<typeof showEventsFrom>(showEventsFrom);
  const [appliedMarketCap, setAppliedMarketCap] = useState<typeof marketCap>(marketCap);

  // Handler for calendar date range selection
  function handleDateRangeChange(range: { from?: Date; to?: Date } | undefined) {
    if (!range) return;
    setDateRange({ from: range.from, to: range.to });
  }

  // Handler for shifting date range by exactly 1 month
  function shiftDateRange(direction: 'back' | 'forward') {
    if (!dateRange.from || !dateRange.to) return;
    let newFrom, newTo;
    if (direction === 'back') {
      newFrom = subMonths(dateRange.from, 1);
      newTo = subMonths(dateRange.to, 1);
    } else {
      newFrom = addMonths(dateRange.from, 1);
      newTo = addMonths(dateRange.to, 1);
    }
    setDateRange({ from: newFrom, to: newTo });
    setAppliedDateRange({ from: newFrom, to: newTo });
  }

  // Apply filters when button is clicked
  function applyFilters() {
    setAppliedTypeOfEvents(typeOfEvents);
    setAppliedShowEventsFrom(showEventsFrom);
    setAppliedMarketCap(marketCap);
    setFilterPopoverOpen(false);
  }

  // Filtered events (only when filters are applied)
  const filteredEventData = eventData.map(group => {
    // Only filter by typeOfEvents (purpose) for now
    const activeTypes = Object.entries(appliedTypeOfEvents).filter(([_, v]) => v).map(([k]) => k.toLowerCase());
    return {
      ...group,
      events: group.events.filter(event => {
        // If no type filters selected, show all
        if (activeTypes.length === 0) return true;
        // Match if any type is in the purpose string
        return activeTypes.some(type => event.purpose.toLowerCase().includes(type));
      })
    };
  }).filter(group => group.events.length > 0);

  // Show all events if no filters are applied
  const showAll = !appliedDateRange.from && !appliedDateRange.to && appliedSearch === '' && appliedTypeOfEvents.dividend === false && appliedTypeOfEvents.bonus === false && appliedTypeOfEvents.split === false && appliedTypeOfEvents.reverseSplit === false && appliedTypeOfEvents.rights === false && appliedTypeOfEvents.merger === false && appliedTypeOfEvents.demerger === false && appliedTypeOfEvents.results === false && appliedTypeOfEvents.buyback === false && appliedTypeOfEvents.reductionOfCapital === false && marketCap.large === false && marketCap.mid === false && marketCap.small === false;
  const displayData = showAll ? eventData : filteredEventData;

  // Calculate total number of events after filtering
  const totalFilteredEvents = displayData.reduce((sum, group) => sum + group.events.length, 0);

  // Calculate event counts for each type for the popover
  const eventTypeCounts: Record<string, number> = {
    dividend: 0,
    bonus: 0,
    split: 0,
    reverseSplit: 0,
    rights: 0,
    merger: 0,
    demerger: 0,
    results: 0,
    buyback: 0,
    reductionOfCapital: 0,
  };
  eventData.forEach(group => {
    group.events.forEach(event => {
      Object.keys(eventTypeCounts).forEach(type => {
        // Match type in purpose string
        if (event.purpose.toLowerCase().includes(type.toLowerCase())) {
          eventTypeCounts[type]++;
        }
      });
    });
  });

  // Helper to get active filter tags
  const getActiveFilterTags = () => {
    const tags: { label: string; type: 'type' | 'from' | 'cap'; key: string }[] = [];
    // Show events from
    if (appliedShowEventsFrom.watchlist) tags.push({ label: 'Watchlist', type: 'from', key: 'watchlist' });
    if (appliedShowEventsFrom.holdings) tags.push({ label: 'Holdings', type: 'from', key: 'holdings' });
    // Type of events
    Object.entries(appliedTypeOfEvents).forEach(([k, v]) => {
      if (v) tags.push({ label: k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1'), type: 'type', key: k });
    });
    // Market Cap
    if (appliedMarketCap.large) tags.push({ label: 'Large Cap', type: 'cap', key: 'large' });
    if (appliedMarketCap.mid) tags.push({ label: 'Mid Cap', type: 'cap', key: 'mid' });
    if (appliedMarketCap.small) tags.push({ label: 'Small Cap', type: 'cap', key: 'small' });
    return tags;
  };
  const activeFilterTags = getActiveFilterTags();

  // Handler to remove a tag
  function removeFilterTag(tag: { label: string; type: 'type' | 'from' | 'cap'; key: string }) {
    if (tag.type === 'from') {
      setShowEventsFrom(s => ({ ...s, [tag.key]: false }));
      setAppliedShowEventsFrom(s => ({ ...s, [tag.key]: false }));
    } else if (tag.type === 'type') {
      setTypeOfEvents(s => ({ ...s, [tag.key]: false }));
      setAppliedTypeOfEvents(s => ({ ...s, [tag.key]: false }));
    } else if (tag.type === 'cap') {
      setMarketCap(s => ({ ...s, [tag.key]: false }));
      setAppliedMarketCap(s => ({ ...s, [tag.key]: false }));
    }
  }

  return (
    <div className="w-full pl-4 pb-12 pt-5 mt-20">
      {/* Replace the two-row layout with a single flex row with wrap for tags and controls */}
      <div className="w-full px-20">
        <h1 className="text-[36px] font-medium font-lexend mb-[4px]">Event Calendar</h1>
        <p className="text-gray-500 mb-8 text-[20px] text-regular font-poppins">
          Your one-stop calendar for all key stock market events and holidays in India.
        </p>
        {/* Tags and Controls in a single flex row with wrap */}
        <div className="flex flex-wrap w-full gap-y-2 mb-6">
          {/* Tags section: flex-1 so it takes available space, min-w-0 for wrapping */}
          <div className="flex-1 flex flex-wrap gap-3 gap-y-2 items-center min-w-0">
            {activeFilterTags.map(tag => (
              <span
                key={tag.label}
                className="flex items-center px-3 py-2 rounded-sm text-sm font-medium border bg-gray-100 text-gray-700 border-gray-200 mr-2 mb-2"
              >
                {tag.label}
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none text-xl font-bold leading-none"
                  onClick={e => { e.stopPropagation(); removeFilterTag(tag); }}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          {/* Controls section: flex-shrink-0 so it stays at the end of the first line */}
          <div className="flex-shrink-0 flex items-top h-10 gap-3">
            {/* Date Range Display with Arrows (no popover, no calendar) */}
            <div className="flex items-center border rounded px-4 py-2 bg-white text-gray-700 text-sm gap-2 min-w-[180px]" style={{ borderColor: '#EBEBEB' }}>
              <FiCalendar className="text-lg text-[#717171]" />
              <span className="font-poppins text-[#717171] text-[14px] font-medium">
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, 'd MMMM')} - ${format(dateRange.to, 'd MMMM')}`
                  : 'Pick a date range'}
              </span>
              <button
                className="ml-2 text-[#717171]  focus:outline-none text-xl font-medium leading-none"
                onClick={() => shiftDateRange('back')}
                type="button"
              >
                &#60;
              </button>
              <button
                className="text-[#717171] focus:outline-none text-xl font- leading-none"
                onClick={() => shiftDateRange('forward')}
                type="button"
              >
                &#62;
              </button>
            </div>
            {/* Filter Button Popover */}
            <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 px-4 py-2 text-gray-700 text-sm border bg-white hover:bg-white hover:text-gray-700 focus:bg-white focus:text-gray-700 active:bg-white active:text-gray-700" style={{ borderColor: '#EBEBEB' }}>
                  <img src="/event-calendar/filter.svg" alt="Filter" className="w-4 h-4" />
                  <span className='text-[14px] font-medium font-poppins text-[#717171]'>Apply Filter</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4" align="end">
                {/* Show events from */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-700 mb-3">Show events from</div>
                  <div className="flex flex-col gap-2">
                    {/* For 'Show events from' options: */}
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={showEventsFrom.watchlist} onChange={e => { setShowEventsFrom(s => { const n = { ...s, watchlist: e.target.checked }; setAppliedShowEventsFrom(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {showEventsFrom.watchlist && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Watchlist</span>
                      </span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={showEventsFrom.holdings} onChange={e => { setShowEventsFrom(s => { const n = { ...s, holdings: e.target.checked }; setAppliedShowEventsFrom(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {showEventsFrom.holdings && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Holdings</span>
                      </span>
                    </label>
                  </div>
                </div>
                {/* Type of events */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-700 mb-3">Type of events</div>
                  <div className="flex flex-col gap-2">
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.dividend} onChange={e => { setTypeOfEvents(s => { const n = { ...s, dividend: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.dividend && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Dividend</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.dividend} events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.bonus} onChange={e => { setTypeOfEvents(s => { const n = { ...s, bonus: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.bonus && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Bonus</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.bonus} events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.split} onChange={e => { setTypeOfEvents(s => { const n = { ...s, split: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.split && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Split</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.split} events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.reverseSplit} onChange={e => { setTypeOfEvents(s => { const n = { ...s, reverseSplit: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.reverseSplit && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Reverse Split</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.reverseSplit} events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.rights} onChange={e => { setTypeOfEvents(s => { const n = { ...s, rights: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.rights && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Rights</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.rights} events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.merger} onChange={e => { setTypeOfEvents(s => { const n = { ...s, merger: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.merger && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Merger</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.merger} events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.demerger} onChange={e => { setTypeOfEvents(s => { const n = { ...s, demerger: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.demerger && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Demerger</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.demerger} events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.results} onChange={e => { setTypeOfEvents(s => { const n = { ...s, results: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.results && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Results</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.results} events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.buyback} onChange={e => { setTypeOfEvents(s => { const n = { ...s, buyback: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.buyback && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Buyback</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.buyback} events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={typeOfEvents.reductionOfCapital} onChange={e => { setTypeOfEvents(s => { const n = { ...s, reductionOfCapital: e.target.checked }; setAppliedTypeOfEvents(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {typeOfEvents.reductionOfCapital && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Reduction of capital</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{eventTypeCounts.reductionOfCapital} events</span>
                    </label>
                  </div>
                </div>
                {/* Market Cap */}
                <div className="mb-2">
                  <div className="text-xs font-semibold text-gray-700 mb-3">Market Cap</div>
                  <div className="flex flex-col gap-2">
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={marketCap.large} onChange={e => { setMarketCap(s => { const n = { ...s, large: e.target.checked }; setAppliedMarketCap(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {marketCap.large && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Large Cap</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">0 events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={marketCap.mid} onChange={e => { setMarketCap(s => { const n = { ...s, mid: e.target.checked }; setAppliedMarketCap(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {marketCap.mid && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Mid Cap</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">0 events</span>
                    </label>
                    <label className="flex w-full items-center cursor-pointer select-none mb-1">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={marketCap.small} onChange={e => { setMarketCap(s => { const n = { ...s, small: e.target.checked }; setAppliedMarketCap(n); return n; }); }} className="hidden peer" />
                        <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[#064d51] peer-checked:border-[#064d51] transition-colors">
                          {marketCap.small && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )}
                        </span>
                        <span className="text-sm">Small Cap</span>
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">0 events</span>
                    </label>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {/* Search Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch />
              </span>
              <input
                type="text"
                placeholder="Search Stocks..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-3 py-2 border rounded text-sm w-[254px] focus:outline-none"
              />
            </div>
          </div>
        </div>
        {/* Event Table */}
        <div className="bg-white rounded shadow w-full max-h-[500px] overflow-y-auto">
          {/* Show filtered count */}
          {/* <div className="px-4 pt-4 pb-2 text-gray-600 text-sm font-medium">
            Showing {totalFilteredEvents} event{totalFilteredEvents !== 1 ? 's' : ''}
          </div> */}
          <table className="w-full text-left">
            <thead className="sticky top-0 z-20 bg-white">
              <tr className="bg-white text-[#000000] border-b border-[#ebebeb] font-lexend text-regular text-[16px] ">
                <th className="px-4 pr-20 py-3 ">Symbol</th>
                <th className="pl-40 py-3 ">Company Name</th>
                <th className="px-4 py-3 ">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {displayData.length === 0 && (
                <tr><td colSpan={3} className="text-center py-8 text-gray-400">No events found.</td></tr>
              )}
              {displayData.map((group) => (
                <React.Fragment key={group.date}>
                  <tr className="bg-white border-b border-[#ebebeb] text-regular font-poppins text-[14px] sticky top-[48px] z-10" style={{ background: 'white' }}>
                    <td colSpan={3} className="px-4 py-2 border-b">{group.date}</td>
                  </tr>
                  {group.events.map((event, idx) => (
                    <tr key={event.symbol + idx} className="border-b text-[#636363] last:border-b-0 hover:bg-[#f5f7fa] group">
                      <td className="pl-4 pr-20 text-regular font-poppins ml-5 text-[14px] py-2 whitespace-nowrap">{event.symbol}</td>
                      <td className="pl-40 text-regular font-poppins text-[14px] py-2 whitespace-nowrap">{event.company}</td>
                      <td className="pl-4 pr-6 text-regular font-poppins text-[14px] py-2">
                        <div className="flex items-center justify-between w-full min-w-[220px]">
                          <span className="flex items-center gap-2">
                            {event.purpose}
                            <span className="relative group/info">
                              <img
                                src="/event-calendar/info.svg"
                                alt="Info"
                                className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer align-middle"
                              />
                              {/* Tooltip on hover */}
                              <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-30 min-w-[260px] bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-gray-700 text-sm font-normal whitespace-pre-line opacity-0 group-hover/info:opacity-100 pointer-events-none transition-opacity duration-200" style={{top: '100%'}}>
                                For each share you hold, you will receive ₹12.00
                              </div>
                            </span>
                          </span>
                          <span className="flex-shrink-0 ml-4">
                            <img
                              src="/event-calendar/bell.svg"
                              alt="Notification"
                              className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer align-middle"
                              style={{ display: 'block' }}
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
