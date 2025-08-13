import React from 'react';
import Hero from '../components/Hero';
import CoreConcepts from '../components/CoreConcepts';
import PlatformVision from '../components/PlatformVision';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Hero />
      <CoreConcepts />
      <PlatformVision />
    </div>
  );
};

export default Home;