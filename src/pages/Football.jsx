import React from 'react';
import Foot from '../components/football/FootballSite';
import Foot1 from '../components/football/Foot1';
import HeroFootball from '../components/football/HeroFootball';

const Football = () => {
  const video = '/videos/hero-3.mp4';
  return (
    <div>
      <HeroFootball src={video} />
      <Foot />
      <Foot1 />
    </div>
  );
};

export default Football;