"use client";

import { useState, useEffect } from 'react';

const LocationSection = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Preload the map by creating a hidden iframe
    const preloadFrame = document.createElement('iframe');
    preloadFrame.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.1439111889517!2d79.06169807526517!3d21.106827985092572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bf9d5e47096d%3A0x57a1ef685c1f8bfa!2s84A%2C%20Pande%20Layout%2C%20New%20Sneh%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440015!5e0!3m2!1sen!2sin!4v1749885386280!5m2!1sen!2sin";
    preloadFrame.style.position = 'absolute';
    preloadFrame.style.left = '-9999px';
    preloadFrame.style.width = '1000px';
    preloadFrame.style.height = '500px';
    
    preloadFrame.onload = () => {
      // Small delay to ensure smooth transition
      setTimeout(() => setShowContent(true), 100);
      document.body.removeChild(preloadFrame);
    };
    
    document.body.appendChild(preloadFrame);

    return () => {
      if (document.body.contains(preloadFrame)) {
        document.body.removeChild(preloadFrame);
      }
    };
  }, []);

  if (!showContent) {
    return (
      <div className="relative mx-auto w-full bg-gray-50 py-12 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-[36px] text-center font-bold leading-tight">
            Your trusted broking partner, <br /> just a step away.
          </h2>
          <div className="relative mt-6 w-full mx-auto flex justify-center items-center">
            <div className="w-[1000px] h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading map...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full bg-gray-50 py-12 pb-20 px-6 max-w-7xl mx-auto">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-[36px] text-center font-bold leading-tight">
          Your trusted broking partner, <br /> just a step away.
        </h2>

        {/* Image and Info */}
        <div className="relative mt-6 w-full mx-auto flex justify-center items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.1439111889517!2d79.06169807526517!3d21.106827985092572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bf9d5e47096d%3A0x57a1ef685c1f8bfa!2s84A%2C%20Pande%20Layout%2C%20New%20Sneh%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440015!5e0!3m2!1sen!2sin!4v1749885386280!5m2!1sen!2sin"
            width="1000"
            height="500"
            allowFullScreen={true}
            loading="eager"
            className="rounded-lg shadow-lg transition-opacity duration-300"
            title="Office Location Map"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSection;