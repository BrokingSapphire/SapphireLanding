import Image from 'next/image';

const LocationSection = () => {
  return (
    <div className="relative w-full bg-gray-50 py-12 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-5xl font-bold  leading-tight">
          Your trusted broking partner, <br /> just a step away.
        </h2>

        {/* Image and Info */}
        <div className="relative mt-6">
          <Image
            src="/contact/locations.png"
            alt="World map with office locations"
            className="w-full rounded-lg shadow-md"
            width={1000}
            height={500}
          />

        </div>
      </div>
    </div>
  );
};

export default LocationSection;
