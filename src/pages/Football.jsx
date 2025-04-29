import React from 'react';
import Hero from '../components/Hero';
import Foot from '../components/FootballSite';
import Foot1 from '../components/Foot1';

const Football = () => {
  const video = '/videos/hero-3.mp4';
  return (
    <div>
      <Hero src={video} />
      <Foot />
      <Foot1 />
    </div>
  );
};

export default Football;