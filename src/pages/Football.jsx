import React from 'react';
import Foot from '../components/football/FootballSite';
import Banner from '../components/football/banner';
import Foot1 from '../components/football/Foot1';
import HeroFootball from '../components/football/HeroFootball';
import Youtube from '../components/football/Youtube';
import Team from '../components/football/Team';
import Footer from '../components/football/Footer';


const Football = () => {
  const video = '/videos/hero-3.mp4';
  return (
    <div>
      <HeroFootball src={video} />
      <Banner />
      <Foot1 />
      <Youtube/>
      <Foot />
      <Team/>
      <Footer/>
    </div>
  );
};

export default Football;