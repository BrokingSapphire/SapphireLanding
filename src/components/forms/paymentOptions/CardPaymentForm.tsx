import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const CardPaymentForm = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your card payment logic here
    onSuccess();
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return month < 10 ? `0${month}` : `${month}`;
  });

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-blue-500 mb-6 hover:text-blue-600"
      >
        <span className="mr-2">←</span> Go back
      </button>

      <div>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardNumber: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
              maxLength={16}
              placeholder="Enter your card number"
            />
          </div>

          <div>
            <label htmlFor="cardName" className="block text-gray-700 mb-2">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              value={cardDetails.cardName}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="Enter name as on card"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">
                Expiry Month & Year
              </label>
              <div className="flex gap-2">
                <select
                  value={cardDetails.expiryMonth}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiryMonth: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  value={cardDetails.expiryYear}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiryYear: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">Year</option>
                  {generateYearOptions().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-1/3">
              <label htmlFor="cvv" className="block text-gray-700 mb-2">
                Enter CVV
              </label>
              <input
                type="password"
                id="cvv"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                maxLength={3}
                placeholder="CVV"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 py-6"
            variant={"ghost"}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CardPaymentForm;
