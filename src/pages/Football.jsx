import React from 'react';
import News from '../components/football/News.jsx';
import Banner from '../components/football/banner';
import Foot1 from '../components/football/Foot1';
import HeroFootball from '../components/football/HeroFootball';
import Youtube from '../components/football/Youtube';
import Team from '../components/football/Team';
import Footer from '../components/football/Footer';
import DordoiTrophies from '../components/football/Trophies';
import StoriesPage from '../components/football/stories/StoriesPage.jsx';


const Football = () => {
  const video = '/videos/hero-3.mp4';
  return (
    <div>
      {/* <HeroFootball src={video} /> */}
      <Banner />
      <News />
      <StoriesPage/>
      <Youtube/>
      <Foot1 />
      <Team/>
      <DordoiTrophies />
      <Footer/>
    </div>
  );
};

export default Football;