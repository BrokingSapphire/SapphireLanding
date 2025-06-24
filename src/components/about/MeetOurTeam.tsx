import React from 'react';
import Image from 'next/image';

const MeetOurTeam = () => {
  const teamMembers = [
    {
      name: 'Pratap Thakur',
      role: 'Partner',
      image: '/about/112bfcbe-0fd1-4f98-a9d8-9d46f978ecc9.JPG', 
    },
    {
      name: 'Yash Katyari',
      role: 'Partner',
      image: '/about/8433f5e3-5dd8-4c19-8eee-d08db88bfa4b.JPG', 
    },
    {
      name: 'Prakash Katyari',
      role: 'Partner',
      image: '/about/9d0779c1-5a9e-446f-82ca-2dfa1d7172da.JPG',
    },
  ];
  
  return (
    <div className="text-center mb-10 mt-10 sm:mt-20 sm:mb-12">
      <h1 className="font-lexend text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4">
        Meet Our Team
      </h1>
      <p className="text-sm sm:text-base text-gray-500 mt-3 px-4 max-w-3xl mx-auto">
        Our philosophy is simple — hire a team of diverse, passionate people and
        foster a culture that empowers you to do your best work.
      </p>
      <div className="flex flex-wrap justify-center gap-10 sm:gap-40 mt-16 w-full">
        {teamMembers.map((member, index) => (
          <div key={index} className="space-y-1.5 text-center flex flex-col items-center">
            <div className="w-40 h-40 relative mx-auto mb-6">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl sm:text-3xl font-semibold">{member.name}</h1>
            <p className="text-sm sm:text-xl text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurTeam;