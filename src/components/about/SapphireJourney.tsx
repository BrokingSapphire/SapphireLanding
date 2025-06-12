import React from 'react';
import Image from 'next/image';

const SapphireJourney = () => {
  return (
    <>
      <Image
        src="/about/journey.svg"
        width={1500}
        height={1500}
        alt="journey"
        draggable={false} // ✅ disables drag
        className="select-none" // optional: prevents image from being selected
      />
    </>
  );
};

export default SapphireJourney;
