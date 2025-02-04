import Image from 'next/image';
import React from 'react'

const SupportHero = () => {
  return (
    <section className="relative min-h-screen" aria-label="Hero section">
      <div className="absolute inset-0">
        <Image
          src="support-line.svg"
          alt="line"
          className="w-full h-[90%] object-cover"
          aria-hidden="true"
          
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        <div className="flex flex-col items-center justify-center flex-grow py-12">
          <h1 className="text-5xl leading-tight font-bold text-center mb-4 px-4">
            Welcome to Support Center
          </h1>

          <p className="text-lg text-gray-500 text-center max-w-4xl mb-2 px-4">
            Find answers or reach out for help.
          </p>
          <p className="text-lg text-blue-500 underline space-y-20 text-center max-w-4xl mb-12 px-4">
            Track Tickets
          </p>

          <input className='px-7 py-3 rounded-md drop-shadow-lg border-2 border-gray-500' type='text' placeholder='Search topics or FAQs...' />
        </div>
      </div>
    </section>
  );
}

export default SupportHero