//@ts-nocheck
import React from "react";
import { Phone, Users, UserPlus, Building } from "lucide-react";

const ContactCard = ({ title, icon, hours, satHours, phone }) => (
  <div className="relative bg-white rounded-lg p-6 border-2 border-dashed border-teal-100">
    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
      <div className="bg-teal-100 rounded-full p-4">{icon}</div>
    </div>

    <div className="mt-6 text-center">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>Mon-Fri: {hours}</p>
        <p>Sat: {satHours}</p>
      </div>

      <div className="relative">
        <div className="bg-white border border-gray-200 rounded p-2 mb-1">
          <span className="text-gray-700">{phone}</span>
        </div>
        <div className="h-1 bg-yellow-400 w-full rounded"></div>
      </div>
    </div>
  </div>
);

const ContactCards = () => {
  const contactOptions = [
    {
      title: "Account Opening",
      icon: <UserPlus className="w-6 h-6 text-teal-700" />,
      hours: "8:00 AM - 11:55 PM",
      satHours: "10:30 AM - 02:30 PM",
      phone: "+91 98765 43210",
    },
    {
      title: "Support",
      icon: <Users className="w-6 h-6 text-teal-700" />,
      hours: "8:00 AM - 11:55 PM",
      satHours: "10:30 AM - 02:30 PM",
      phone: "+91 98765 43210",
    },
    {
      title: "Call & Trade",
      icon: <Phone className="w-6 h-6 text-teal-700" />,
      hours: "8:00 AM - 11:55 PM",
      satHours: "Closed",
      phone: "+91 98765 43210",
    },
    {
      title: "Partner Support",
      icon: <Building className="w-6 h-6 text-teal-700" />,
      hours: "8:00 AM - 6:00 PM",
      satHours: "10:30 AM - 02:30 PM",
      phone: "+91 98765 43210",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">
            Contact Us for{" "}
            <span className="text-teal-700">Support and Assistance</span>
          </h2>
          <p className="text-gray-600">
            Get in touch with our support team or reach out to our partners for
            dedicated assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {contactOptions.map((option, index) => (
            <ContactCard
              key={index}
              title={option.title}
              icon={option.icon}
              hours={option.hours}
              satHours={option.satHours}
              phone={option.phone}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
