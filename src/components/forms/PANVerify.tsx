import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CalendarIcon, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import FormHeading from "./FormHeading";
import axios from "axios"
// Enhanced calendar component with reduced size
const CustomCalendar = ({
  selectedDate,
  onDateSelect,
  minDate,
}: {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
  minDate: Date;
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate || new Date(Math.max(minDate.getTime(), new Date().getTime() - 365 * 24 * 60 * 60 * 1000))
  );
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([]);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [yearRange, setYearRange] = useState<number[]>([]);

  // Month names for header
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Day names for header
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Generate year range for selector (from max year down to max year - 80)
  useEffect(() => {
    const maxYear = 2007; // This is the year when someone would be 18 years old
    const minYear = maxYear - 80; // 80 years range from max year
    const years = [];
    
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year);
    }
    
    setYearRange(years);
  }, []);

  // Generate calendar days for current month view
  useEffect(() => {
    const days: Array<Date | null> = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of month
    const firstDay = new Date(year, month, 1);
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);

    // Get day of week for first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();

    // Add null placeholders for days before the first of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    setCalendarDays(days);
  }, [currentMonth]);

  // Handler for previous month
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // Handler for next month
  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    
    // Don't restrict this - allow moving past current month as long as the year is valid
    setCurrentMonth(nextMonth);
  };

  // Change year
  const handleYearChange = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setShowYearSelector(false);
  };

  // Format date as YYYY-MM-DD for comparison
  const formatDateForCompare = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  // Check if a date is selected
  const isSelected = (date: Date): boolean => {
    return (
      selectedDate !== undefined &&
      formatDateForCompare(date) === formatDateForCompare(selectedDate)
    );
  };

  // Check if a date is disabled (future dates past 2007 cutoff or before min year)
  const isDisabled = (date: Date): boolean => {
    // Create a cutoff date of Dec 31, 2007 (last day someone can be born and still be 18)
    const cutoffDate = new Date(2007, 11, 31);
    const minYear = 2007 - 80;
    const minYearDate = new Date(minYear, 0, 1);
    
    return date > cutoffDate || date < minYearDate;
  };

  return (
    <div className="p-1 bg-white rounded-md shadow-md w-full sm:w-48 max-w-[calc(100vw-20px)] transition-all duration-200">
      <div className="flex items-center justify-between mb-1 relative">
        <button
          onClick={handlePrevMonth}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={14} />
        </button>
        
        <button 
          onClick={() => setShowYearSelector(!showYearSelector)}
          className="font-medium hover:bg-gray-100 px-1 py-0.5 rounded-md flex items-center transition-colors text-xs overflow-hidden whitespace-nowrap"
        >
          <span className="truncate">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
          <ChevronsUpDown size={12} className="ml-1 opacity-70 flex-shrink-0" />
        </button>
        
        <button
          onClick={handleNextMonth}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={14} />
        </button>
        
        {showYearSelector && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md max-h-32 overflow-y-auto z-20 border border-gray-200">
            <div className="sticky top-0 bg-gray-50 p-1 text-xs font-medium text-gray-500 border-b">
              Select Year
            </div>
            {yearRange.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`w-full text-left p-1 text-xs hover:bg-gray-100 transition-colors ${
                  year === currentMonth.getFullYear() ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-0.5">
        {dayNames.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-medium text-gray-500 py-0.5"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {calendarDays.map((date, index) => (
          <div key={index} className="text-center">
            {date ? (
              <button
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs
                  ${
                    isSelected(date)
                      ? "bg-teal-500 text-white"
                      : "hover:bg-gray-100"
                  }
                  ${
                    isDisabled(date)
                      ? "text-gray-300 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                  transition-colors duration-200
                `}
                onClick={() => {
                  if (!isDisabled(date)) {
                    onDateSelect(date);
                  }
                }}
                disabled={isDisabled(date)}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-5 h-5"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PANVerify = ({ onNext }: { onNext: () => void }) => {
  const [panNumber, setPanNumber] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [dobInput, setDobInput] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState({
    pan: false,
    dob: false,
  });

  // Calculate the minimum date (18 years ago from today - fixed to 2007)
  const getCurrentMinDate = () => {
    return new Date(2007, 11, 31); // December 31, 2007
  };

  const [minDate] = useState(getCurrentMinDate());

  // Handle clicking outside calendar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showCalendar && !target.closest('.calendar-container') && !target.closest('.calendar-trigger')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const validatePan = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const validateDob = (date: Date | undefined) => {
    if (!date) return false;

    // Fixed validation to ensure birth year is not greater than 2007
    const cutoffDate = new Date(2007, 11, 31); // December 31, 2007
    return date <= cutoffDate;
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();

    // Apply PAN pattern formatting: AAAAA1234A
    // First 5 characters must be letters
    const firstPart = value.slice(0, 5).replace(/[^A-Z]/g, "");

    // Next 4 characters must be numbers
    let middlePart = "";
    if (value.length > 5) {
      middlePart = value.slice(5, 9).replace(/[^0-9]/g, "");
    }

    // Last character must be a letter
    let lastPart = "";
    if (value.length > 9) {
      lastPart = value.slice(9, 10).replace(/[^A-Z]/g, "");
    }

    // Combine all parts
    const formattedPan = `${firstPart}${middlePart}${lastPart}`;

    if (formattedPan.length <= 10) {
      setPanNumber(formattedPan);
      setErrors((prev) => ({
        ...prev,
        pan: formattedPan.length === 10 && !validatePan(formattedPan),
      }));
    }
  };

  const handleDateSelect = (date: Date) => {
    setDob(date);
    setDobInput(formatDate(date));
    setShowCalendar(false);
    setErrors((prev) => ({
      ...prev,
      dob: !validateDob(date),
    }));
  };

  // Handle manual date input
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDobInput(value);
    
    // Auto-format as user types (DD/MM/YYYY)
    if (value.length === 2 && !value.includes('/')) {
      setDobInput(`${value}/`);
    } else if (value.length === 5 && value.charAt(2) === '/' && !value.includes('/', 3)) {
      setDobInput(`${value}/`);
    }
    
    // Try to parse the date
    if (value.length === 10) {
      const parts = value.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          const parsedDate = new Date(year, month, day);
          
          // Check if valid date (some combinations like 31/02/2000 will wrap to next month)
          if (
            parsedDate.getDate() === day &&
            parsedDate.getMonth() === month &&
            parsedDate.getFullYear() === year
          ) {
            setDob(parsedDate);
            setErrors((prev) => ({
              ...prev,
              dob: !validateDob(parsedDate),
            }));
          } else {
            setErrors((prev) => ({
              ...prev,
              dob: true,
            }));
          }
        }
      }
    } else {
      // Clear the date object if input is incomplete
      setDob(undefined);
    }
  };

  const handleSubmit = async () => {
    if (validatePan(panNumber) && validateDob(dob)) {
      try {
        
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
          {
            step: "pan",
            pan_number:panNumber
          }
        );
        console.log("Response of pan verifivation:",response)
        if (!response) {
          //TODO: Error handling, preferably by a toast or inbox
          // setError("Failed to send verification code. Please try again.");
          console.error("Send OTP error, Response :", response);
          return;
        }
        
        onNext();
      } catch (error) {
        // setError("Error verifying code. Please try again.");
        console.error("Verification error:", error);
      }
    } else {
      setErrors({
        pan: !validatePan(panNumber),
        dob: !validateDob(dob),
      });
    }
  };

  // Format date as DD/MM/YYYY
  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="mx-auto max-w-full px-4">
      <FormHeading
        title={"Verify PAN to Continue"}
        description={"Secure your identity with PAN verification."}
      />
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">PAN Number</label>
        <input
          type="text"
          placeholder="AAAAA1234A"
          className={`w-full px-3 py-2 border ${
            errors.pan ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all`}
          value={panNumber}
          onChange={handlePanChange}
          maxLength={10}
        />
        {errors.pan && (
          <p className="text-red-500 text-sm mt-1">
            Please enter a valid PAN number
          </p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          Format: ABCDE1234F (5 letters, 4 numbers, 1 letter)
        </p>
      </div>

      <Button
        onClick={handleSubmit}
        variant="ghost"
        className={`w-full py-6 ${
          !panNumber? "opacity-50 cursor-not-allowed" : ""
        } transition-opacity`}
        disabled={!panNumber}
      >
        Continue
      </Button>
      <div className="mt-6 text-sm text-center text-gray-600">
        <p className="mb-4 text-center">
          By continuing, you agree to verify your PAN details with the Income
          Tax Department. Your PAN will be used for KYC verification purposes
          only.
        </p>
      </div>
    </div>
  );
};

export default PANVerify;