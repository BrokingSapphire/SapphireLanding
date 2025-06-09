import React from "react";

interface ContactCardProps {
  title: string;
  hours: string;
  satHours: string;
  phone: string;
}

interface ContactOption {
  title: string;
  hours: string;
  satHours: string;
  phone: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  hours,
  satHours,
  phone,
}) => (
  <div
    className="rounded-lg p-4 sm:p-6 h-full border-4 border-[#C4FDD866] shadow-[0_4px_15px_rgba(196,253,216,0.6)]"
    style={{
      background: "linear-gradient(to bottom, #FDFEFF 0%, #EEF9F499 60%)",
    }}
  >
    <div className="flex flex-col h-full">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-teal-800 inline-block border-b-2 border-yellow-400">
          {title}
        </h3>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <p className="text-sm sm:text-base text-gray-700">{phone}</p>
        <p className="text-sm sm:text-base text-gray-600">Mon-Fri: {hours}</p>
        <p className="text-sm sm:text-base text-gray-600">Sat: {satHours}</p>
      </div>
    </div>
  </div>
);

const HQCard: React.FC = () => (
  <div
    className="rounded-lg p-4 sm:p-6 h-full border border-[#C4FDD866] shadow-[0_4px_15px_rgba(196,253,216,0.6)]"
    style={{
      background: "linear-gradient(to bottom, #FDFEFF 0%, #EEF9F499 60%)",
    }}
  >
    <div className="flex flex-col h-full">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-teal-800 inline-block border-b-2 border-yellow-400">
          HQ
        </h3>
      </div>
      <p className="text-sm sm:text-base text-gray-600">
      📍 Plot No. 33, Pratap Nagar, Khamla, Nagpur, Maharashtra
        <br />
        Pincode : 440025
      </p>
    </div>
  </div>
);

const ContactCards: React.FC = () => {
  const contactOptions: ContactOption[] = [
    {
      title: "Account opening",
      hours: "8:00 AM - 11:55 PM",
      satHours: "10:30 AM - 2:30 PM",
      phone: "+91 84466-09679",
    },
    {
      title: "Support",
      hours: "8:00 AM - 11:55 PM",
      satHours: "10:30 AM - 2:30 PM",
      phone: "+91 84466-09679",
    },
    {
      title: "Call & Trade",
      hours: "8:00 AM - 11:55 PM",
      satHours: "Closed",
      phone: "+91 84466-09679",
    },
    {
      title: "Partner Support",
      hours: "8:00 AM - 6:00 PM",
      satHours: "10:30 AM - 2:30 PM",
      phone: "+91 84466-09679",
    },
  ];

  return (
    <div className="bg-[#F5F7FA] py-6 sm:py-8 md:py-11 px-9 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* First row with 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {contactOptions.slice(0, 3).map((option, index) => (
            <ContactCard
              key={index}
              title={option.title}
              hours={option.hours}
              satHours={option.satHours}
              phone={option.phone}
            />
          ))}
        </div>
        {/* Second row with partner support and HQ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="sm:col-span-1 h-full">
            <ContactCard
              title={contactOptions[3].title}
              hours={contactOptions[3].hours}
              satHours={contactOptions[3].satHours}
              phone={contactOptions[3].phone}
            />
          </div>
          <div className="sm:col-span-1 md:col-span-2 h-full">
            <HQCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
