import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import FormHeading from "../general-components/formHeading";

// Custom calendar component
const CustomCalendar = ({
  selectedDate,
  onDateSelect,
  minDate,
}: {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
  minDate: Date;
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(minDate);
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([]);

  // Month names for header
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Day names for header
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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
    // Prevent going past current month
    if (nextMonth <= new Date()) {
      setCurrentMonth(nextMonth);
    }
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

  // Check if a date is disabled (future or less than 18 years)
  const isDisabled = (date: Date): boolean => {
    const today = new Date();
    return date > today || date > minDate;
  };

  return (
    <div className="p-3 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-1 rounded-md hover:bg-gray-100"
          disabled={
            new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth() + 1,
              1
            ) > new Date()
          }
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => (
          <div key={index} className="text-center">
            {date ? (
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
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
                `}
                onClick={() => !isDisabled(date) && onDateSelect(date)}
                disabled={isDisabled(date)}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-8 h-8"></div>
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState({
    pan: false,
    dob: false,
  });

  // Calculate the minimum date (18 years ago from today)
  const getCurrentMinDate = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 18);
    return minDate;
  };

  const [minDate] = useState(getCurrentMinDate());

  const validatePan = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const validateDob = (date: Date | undefined) => {
    if (!date) return false;

    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18;
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
    setShowCalendar(false);
    setErrors((prev) => ({
      ...prev,
      dob: !validateDob(date),
    }));
  };

  const handleSubmit = () => {
    if (validatePan(panNumber) && validateDob(dob)) {
      onNext();
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
    <div className="mx-auto">
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
          } rounded focus:outline-none focus:ring-2 focus:ring-teal-500`}
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
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Date of Birth</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className={`w-full flex items-center justify-between px-3 py-2 border ${
              errors.dob ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white`}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
              <span className={dob ? "text-gray-900" : "text-gray-400"}>
                {dob ? formatDate(dob) : "Select your date of birth"}
              </span>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {showCalendar && (
            <div className="absolute mt-1 z-10">
              <CustomCalendar
                selectedDate={dob}
                onDateSelect={handleDateSelect}
                minDate={minDate}
              />
            </div>
          )}
        </div>

        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">
            You must be at least 18 years old
          </p>
        )}
      </div>
      <Button
        onClick={handleSubmit}
        variant="ghost"
        className={`w-full py-6 ${
          !panNumber || !dob ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!panNumber || !dob}
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

// Missing ChevronDown import
const ChevronDown = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default PANVerify;
