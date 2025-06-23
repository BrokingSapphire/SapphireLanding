import Image from "next/image";
import React from "react";

const Glimpses = () => {
  const images = [
    {
      id: 1,
      src: "/about/IMG_3190.jpg",
      className: "col-span-2 row-span-2",
      alt: "Sapphire team working together",
    },
    {
      id: 2,
      src: "/about/glimpses.svg",
      alt: "Team meeting view 1",
    },
    {
      id: 3,
      src: "/about/glimpses.svg",
      alt: "Team meeting view 2",
    },
    {
      id: 4,
      src: "/about/glimpses.svg",
      alt: "Team meeting view 3",
    },
    {
      id: 5,
      src: "/about/glimpses.svg",
      alt: "Team meeting view 4",
    },
  ];

  return (
    <div className="font-lexend container text-center w-full mx-auto px-8 sm:px-20">
      <h1 className="font-lexend text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4">
        Glipmses at Sapphire
      </h1>
      <p className="text-sm sm:text-base text-gray-500 mt-3 px-4 mb-8 max-w-3xl mx-auto">
        Experience candid moments at Sapphire, where innovation, teamwork, and integrity 
        come together to shape the future of financial excellence.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`overflow-hidden rounded-lg ${image.className || ""}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Glimpses;
