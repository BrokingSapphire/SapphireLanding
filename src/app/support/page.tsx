import CustomHero from '@/components/CustomHero';
import SupportCenter from '@/components/support/SupportCenter';
import SupportHero from '@/components/support/SupportHero';
import React from 'react'

const Home = () => {
  return (
    <div>
          <SupportHero />
          <SupportCenter />
    </div>
  );
}

export default Home