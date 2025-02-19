import Image from 'next/image';
import React from 'react'

const MeetOurTeam = () => {
  return (
    <div className="text-center mb-10 mt-10 sm:mt-20 mb-8 sm:mb-12">
      <h1 className="text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4">
        Meet Our Team
      </h1>
      <p className="text-sm sm:text-base text-gray-500 mt-3 px-4 max-w-3xl mx-auto">
        Our philosophy is simple — hire a team of diverse, passionate people and
        foster a culture that empowers you to do you best work.
      </p>
      <div className="flex mt-16 w-full mx-auto justify-between items-center">
        <div className="space-y-3">
          <div className="w-56 h-56 rounded-full bg-blue-200"></div>
          <h1 className="text-xl sm:text-2xl font-semibold">Pratap Thakur</h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-3xl mx-auto">
            Partner
          </p>
        </div>
        <div className="space-y-3">
          <div className="w-56 h-56 rounded-full bg-blue-200"></div>
          <h1 className="text-xl sm:text-2xl font-semibold">Pratap Thakur</h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-3xl mx-auto">
            Partner
          </p>
        </div>
        <div className="space-y-3">
          <div className="w-56 h-56 rounded-full bg-blue-200"></div>
          <h1 className="text-xl sm:text-2xl font-semibold">Pratap Thakur</h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-3xl mx-auto">
            Partner
          </p>
        </div>
      </div>
    </div>
  );
}

export default MeetOurTeam