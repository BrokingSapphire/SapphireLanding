"use client"
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const LocateUs = () => {
  const [selectedCity, setSelectedCity] = useState("");

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ];

  return (
    <div className="bg-gradient-to-b from-teal-50/50 to-white">
      <div className="mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Locate Us in Your <span className="text-teal-600">City!</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Find us near you and experience seamless service. Select your city
              to get started.
            </p>

            <div className="space-y-4 max-w-md">
              <h2 className="text-xl font-semibold">Find us in your city</h2>
              <p className="text-gray-600 text-sm">
                Locate an office in your city
              </p>

              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select your city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[400px] lg:h-[500px]">
            <Image
              src="/contact/locate-us.svg"
              alt="Locate Us Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocateUs;
