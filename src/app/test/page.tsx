'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const milestones = [
  {
    year: '2015',
    title: 'The Beginning',
    description: 'Founded with a vision to innovate.',
    image: '',
  },
  {
    year: '2018',
    title: 'First Product',
    description: 'Launched our flagship product.',
    image: '',
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Reached new markets worldwide.',
    image: '',
  },
  {
    year: '2025',
    title: 'Shaping the Future',
    description: 'Leading with cutting-edge tech.',
    image: '',
  },
];

const JourneyTimeline = () => {
  return (
    <section className="h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Our Journey</h1>
      <div className="relative flex w-full max-w-5xl mx-auto space-x-4 overflow-x-auto scrollbar-hide">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2 z-0"></div>
        
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="relative flex-1 min-w-[200px] h-64 rounded-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
          >
            {/* Background Image */}
            <Image
              src={milestone.image}
              alt={milestone.title}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
              <h2 className="text-xl font-bold">{milestone.year}</h2>
              <h3 className="text-lg font-semibold">{milestone.title}</h3>
              <p className="text-sm text-center">{milestone.description}</p>
            </div>
            {/* Timeline Dot */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-4 h-4 bg-blue-600 rounded-full z-10"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JourneyTimeline;