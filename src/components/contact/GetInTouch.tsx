import Image from 'next/image';
import React from 'react';
const LocationSection = () => {
  return (
    <div className="relative w-full bg-gray-50">
      <Image
        src="/contact/locations.png" 
        alt="World map with office locations" 
        className="w-full h-full object-cover"
        width={1000}
        height={1000}
      />

    </div>
  );
};

export default LocationSection;