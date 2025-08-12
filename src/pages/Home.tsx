import React from 'react';
import Hero from '../components/Hero';
import CoreConcepts from '../components/CoreConcepts';
import PlatformVision from '../components/PlatformVision';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CoreConcepts />
      <PlatformVision />
    </div>
  );
};

export default Home;