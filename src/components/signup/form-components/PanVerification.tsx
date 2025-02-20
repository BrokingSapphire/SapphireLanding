import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";

interface PanVerificationProps {
  onNextStep: () => void;
}

const PanVerification: React.FC<PanVerificationProps> = ({ onNextStep }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    panNumber: "",
    dob: "",
    isValid: false,
    panError: false,
    dobError: false,
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Calculate the max date (18 years ago from today)
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const validateForm = (updatedData: Partial<typeof formData>) => {
    const currentData = { ...formData, ...updatedData };

    // PAN validation: 10 characters, alphanumeric
    const isPanValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(currentData.panNumber);

    // DOB validation: should be a valid date and person should be at least 18 years old
    const isValidDate = (dateString: string) => {
      if (!dateString) return false;
      const today = new Date();
      const birthDate = new Date(dateString);
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

    return {
      isValid: isPanValid && isValidDate(currentData.dob),
      panError: currentData.panNumber.length > 0 && !isPanValid,
      dobError: currentData.dob.length > 0 && !isValidDate(currentData.dob),
    };
  };

  const updateFormData = (data: Partial<typeof formData>): void => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    const currentLength = value.length;
    
    // Validate each character based on position
    if (currentLength <= 5) {
      // First 5 characters should be letters
      if (/^[A-Z]*$/.test(value)) {
        updateFormData({
          panNumber: value,
          ...validateForm({ panNumber: value }),
        });
      }
    } else if (currentLength <= 9) {
      // Next 4 characters should be numbers
      const firstPart = value.slice(0, 5);
      const middlePart = value.slice(5, currentLength);
      if (/^[A-Z]{5}$/.test(firstPart) && /^[0-9]*$/.test(middlePart)) {
        updateFormData({
          panNumber: value,
          ...validateForm({ panNumber: value }),
        });
      }
    } else if (currentLength <= 10) {
      // Last character should be a letter
      const lastChar = value.slice(9);
      const restOfPan = value.slice(0, 9);
      if (
        /^[A-Z]{5}[0-9]{4}$/.test(restOfPan) &&
        /^[A-Z]?$/.test(lastChar)
      ) {
        updateFormData({
          panNumber: value,
          ...validateForm({ panNumber: value }),
        });
      }
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
    
    const dateString = date.toISOString().split('T')[0];
    const updates = {
      dob: dateString,
    };
    
    updateFormData({
      ...updates,
      ...validateForm(updates),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onNextStep();
    } catch (error) {
      console.error("Error during submission:", error);
      updateFormData({
        panError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom styles to match your design system
  const customDatePickerStyles = `
    .react-datepicker {
      font-family: inherit;
      border-radius: 0.5rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .react-datepicker__header {
      background-color: #f3f4f6;
      border-bottom: 1px solid #e2e8f0;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      padding-top: 0.75rem;
    }
    .react-datepicker__month {
      margin: 0.5rem;
    }
    .react-datepicker__day-name, .react-datepicker__day {
      width: 2rem;
      line-height: 2rem;
      margin: 0.2rem;
    }
    .react-datepicker__day--selected {
      background-color: #115e59;
      border-radius: 0.3rem;
    }
    .react-datepicker__day--selected:hover {
      background-color: #134e4a;
    }
    .react-datepicker__day:hover {
      background-color: #e6fffa;
    }
    .react-datepicker__day--disabled {
      color: #cbd5e0;
    }
    .react-datepicker__navigation {
      top: 0.75rem;
    }
    .react-datepicker__year-dropdown-container,
    .react-datepicker__month-dropdown-container {
      margin: 0 0.5rem;
    }
    .react-datepicker__year-dropdown,
    .react-datepicker__month-dropdown {
      background-color: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.25rem;
    }
    .react-datepicker__year-option,
    .react-datepicker__month-option {
      padding: 0.5rem;
    }
    .react-datepicker__year-option:hover,
    .react-datepicker__month-option:hover {
      background-color: #f3f4f6;
    }
  `;

  return (
    <div className="max-w-2xl mx-auto -mt-40 p-4">
      <style>{customDatePickerStyles}</style>
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-4">
          Enter your PAN to Continue
        </h1>
        <p className="text-gray-600 mb-2">Step 1 of 9</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">PAN Number</label>
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2"
                placeholder="AAAAA1234A"
                value={formData.panNumber}
                onChange={handlePanChange}
                maxLength={10}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  e.currentTarget.value = e.currentTarget.value.toUpperCase();
                }}
                disabled={isSubmitting}
              />
              {formData.panError && (
                <p className="text-red-500 mt-2">
                  Please enter a valid PAN number.
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  maxDate={maxDate}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={70}
                  scrollableYearDropdown
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select your date of birth"
                  className="w-full border rounded-md px-4 py-2 cursor-pointer"
                  disabled={isSubmitting}
                  customInput={
                    <div className="relative w-full">
                      <input
                        className="w-full  pr-10"
                        readOnly
                        placeholder="Select your date of birth"
                        value={selectedDate ? selectedDate.toLocaleDateString('en-GB') : ''}
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    </div>
                  }
                />
              </div>
              {formData.dobError && (
                <p className="text-red-500 mt-2">
                  You must be at least 18 years old to continue.
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-700 ${
                formData.isValid && !isSubmitting
                  ? ""
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!formData.isValid || isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PanVerification;