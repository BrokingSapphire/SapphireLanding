import React from 'react';
import Image from 'next/image'
const LocationSection = () => {
  return (
    <div className="relative w-full bg-gray-50">
      {/* Background Image */}
      <img
        src="/contact/locations.png" 
        alt="World map with office locations" 
        className="w-full h-full object-cover"
      />

    </div>
  );
};

export default LocationSection;