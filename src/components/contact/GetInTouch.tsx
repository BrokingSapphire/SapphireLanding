//@ts-nocheck
import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Maximize2,
  Minimize2,
  Navigation,
} from "lucide-react";

const ContactInfo = ({ icon, title, children }) => (
  <div className="flex gap-6 items-start mb-8">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      {children}
    </div>
  </div>
);

const GetInTouch = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Contact Information */}
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Get in <span className="text-teal-700">Touch</span>
          </h2>
          <p className="text-gray-600 mb-12 max-w-lg">
            We'd love to hear from you! Whether you have questions, need
            personalized support, or want to explore our services, our friendly
            and dedicated team is always here to assist, guide, and provide the
            information you need.
          </p>

          <ContactInfo
            icon={<MapPin className="w-6 h-6 text-teal-700" />}
            title="Our Address"
          >
            <p className="text-gray-600">
              Plot No. 33, Kotwal Nagar,
              <br />
              Khamla, Nagpur (MH)
              <br />
              Pincode: 440025
            </p>
          </ContactInfo>

          <ContactInfo
            icon={<Mail className="w-6 h-6 text-teal-700" />}
            title="Mail"
          >
            <div className="space-y-1">
              <a
                href="mailto:support@sapphirebroking.com"
                className="text-gray-600 hover:text-teal-700 block"
              >
                support@sapphirebroking.com
              </a>
              <a
                href="mailto:partners@sapphirebroking.com"
                className="text-gray-600 hover:text-teal-700 block"
              >
                partners@sapphirebroking.com
              </a>
            </div>
          </ContactInfo>

          <ContactInfo
            icon={<Phone className="w-6 h-6 text-teal-700" />}
            title="Phone"
          >
            <div className="space-y-1">
              <p className="text-gray-600">080-60001111</p>
              <p className="text-gray-600">080-62341311</p>
            </div>
          </ContactInfo>
        </div>

        {/* Right Column - Map */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50">
                <Maximize2 className="w-5 h-5 text-navy-800" />
              </button>
              <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50">
                <Minimize2 className="w-5 h-5 text-navy-800" />
              </button>
            </div>

            {/* Map Image Placeholder */}
            <div className="aspect-square w-full bg-gray-100">
              <img
                src="/api/placeholder/600/600"
                alt="Location Map"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Get Directions Button */}
            <div className="absolute bottom-4 left-4">
              <button className="bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 flex items-center gap-2">
                <span>Get Directions</span>
                <Navigation className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
