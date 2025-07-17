'use client';
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format, isWithinInterval, parse } from 'date-fns';
import { FiCalendar, FiFilter, FiSearch } from 'react-icons/fi';

// Event data as shown in the screenshot
const eventData = [
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
];

const filterTags = ['Dividend', 'Bonus', 'Large Cap'];

function parseEventDate(dateStr: string) {
  return parse(dateStr.split(',')[0] + ',' + dateStr.split(',')[1], 'MMM d, yyyy', new Date());
}

export default function EventCalendarPage() {
  // Filter option states (not applied yet)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState(filterTags);
  // Applied filter states
  const [appliedDateRange, setAppliedDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedTags, setAppliedTags] = useState(filterTags);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Remove tag (from filter options)
  const removeTag = (tag: string) => setActiveTags(activeTags.filter(t => t !== tag));

  // Handler for calendar date range selection
  function handleDateRangeChange(range: { from?: Date; to?: Date } | undefined) {
    if (!range) return;
    setDateRange({ from: range.from, to: range.to });
  }

  // Apply filters when button is clicked
  function applyFilters() {
    setAppliedDateRange(dateRange);
    setAppliedSearch(search);
    setAppliedTags(activeTags);
  }

  // Filtered events (only when filters are applied)
  const filteredEventData = eventData.map(group => {
    const groupDate = parseEventDate(group.date);
    const inRange = appliedDateRange.from && appliedDateRange.to
      ? isWithinInterval(groupDate, { start: appliedDateRange.from, end: appliedDateRange.to })
      : true;
    return {
      ...group,
      events: group.events.filter(event =>
        (appliedSearch === '' || event.symbol.toLowerCase().includes(appliedSearch.toLowerCase()) || event.company.toLowerCase().includes(appliedSearch.toLowerCase()))
      ),
      inRange,
    };
  }).filter(group => group.events.length > 0 && group.inRange);

  // Show all events if no filters are applied
  const showAll = !appliedDateRange.from && !appliedDateRange.to && appliedSearch === '' && appliedTags.length === filterTags.length;
  const displayData = showAll ? eventData : filteredEventData;

  return (
    <div className="w-full pl-4 pb-12 pt-5 mt-20">
      <div className='w-full px-20'>
        <h1 className="text-[36px] font-medium font-lexend mb-[4px]">Event Calendar</h1>
        <p className="text-gray-500 mb-8 text-[20px] text-regular font-poppins">
          Your one-stop calendar for all key stock market events and holidays in India.
        </p>
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6 w-full">
          {/* Tag Filters */}
          {activeTags.map((tag) => (
            <span key={tag} className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-sm text-sm font-medium">
              {tag}
              <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none text-xl font-bold leading-none" onClick={() => removeTag(tag)}>&times;</button>
            </span>
          ))}
          {/* Date Range Picker */}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <button
                className="flex items-center border rounded px-4 py-2 bg-white text-gray-700 text-sm gap-2 min-w-[180px]"
                onClick={() => setCalendarOpen(!calendarOpen)}
                type="button"
              >
                <FiCalendar className="text-lg text-gray-400" />
                <span>
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, 'd MMMM')} - ${format(dateRange.to, 'd MMMM')}`
                    : 'Pick a date range'}
                </span>
                <span className="ml-2 text-gray-400">&#60;</span>
                <span className="text-gray-400">&#62;</span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {/* Apply Filter Button */}
          <Button variant="outline" className="flex items-center gap-2 px-4 py-2 text-gray-700 text-sm border ml-2" onClick={applyFilters}>
            <FiFilter className="text-lg" /> Apply Filter
          </Button>
          {/* Search Input */}
          <div className="relative ml-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch />
            </span>
            <input
              type="text"
              placeholder="Search Stocks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded text-sm w-48 focus:outline-none"
            />
          </div>
        </div>
        {/* Event Table */}
        <div className="bg-white rounded shadow w-full">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-[#000000] text-regular text-[16px] ">
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
                  <tr className="bg-white text-regular font-poppins text-[14px]">
                    <td colSpan={3} className="px-4 py-2 border-b font-medium">{group.date}</td>
                  </tr>
                  {group.events.map((event, idx) => (
                    <tr key={event.symbol + idx} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="pl-4 pr-20 text-regular font-poppins ml-5 text-[14px] py-2 whitespace-nowrap">{event.symbol}</td>
                      <td className="pl-40 text-regular font-poppins text-[14px] py-2 whitespace-nowrap">{event.company}</td>
                      <td className="pl-4 text-regular font-poppins text-[14px] py-2 flex items-center gap-2 relative group">
                        {event.purpose}
                        {event.info && (
                          <span title="Info" className="ml-1 cursor-pointer">
                            <img
                              src="/event-calendar/info.svg"
                              alt="Info"
                              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            />
                          </span>
                        )}
                        {event.bell && (
                          <span title="Notification" className="cursor-pointer rounded-full">
                            <img
                              src="/event-calendar/bell.svg"
                              alt="Notification"
                              className="w-4 h-4 rounded-full ml-20 bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            />
                          </span>
                        )}
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
