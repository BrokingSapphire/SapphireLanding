import React, { useState } from "react";
import Image from "next/image";

interface PaymentOption {
  id: string;
  label: string;
  icon?: string;
  additionalIcons?: string[];
}

const PaymentSelection = ({ onNext }: { onNext: () => void }) => {
  const [selectedPayment, setSelectedPayment] = useState("upi");

  const paymentOptions: PaymentOption[] = [
    {
      id: "card",
      label: "Debit/Credit Card",
      additionalIcons: [
        "/new-signup/mastercard.svg",
        "/new-signup/visa.svg",
        "/new-signup/rupay.svg",
      ],
    },
    {
      id: "upi",
      label: "UPI",
      icon: "/new-signup/upi.svg",
    },
    {
      id: "netbanking",
      label: "Netbanking",
      icon: "/new-signup/bank.svg",
    },
  ];

  const handlePaymentChange = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold mb-2">
        Unlock Your Trading Potential - Get Started for Just{" "}
        <span className="text-orange-500 font-bold">₹99/- only</span>
      </h2>

      <div className="mt-6">
        <p className="text-gray-600 mb-4">Choose your Payment option</p>

        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center border rounded-lg p-4 cursor-pointer hover:border-blue-500"
              onClick={() => handlePaymentChange(option.id)}
            >
              <input
                type="radio"
                id={option.id}
                name="payment"
                checked={selectedPayment === option.id}
                onChange={() => handlePaymentChange(option.id)}
                className="h-4 w-4 text-blue-600 cursor-pointer"
              />
              <label
                htmlFor={option.id}
                className="ml-3 flex items-center justify-between w-full cursor-pointer"
              >
                <span>{option.label}</span>
                <div className="flex items-center gap-2">
                  {option.icon && (
                    <Image src={option.icon} alt={option.label} className="h-6" width={50} height={50} />
                  )}
                  {option.additionalIcons?.map((icon, index) => (
                    <Image
                      key={index}
                      src={icon}
                      alt="payment method"
                      className="h-6"
                      width={50} 
                      height={50}
                    />
                  ))}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onNext} className="w-full mt-6 bg-teal-800 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors">
        Proceed to pay
      </button>
    </div>
  );
};

export default PaymentSelection;
