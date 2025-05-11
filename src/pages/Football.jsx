import React from 'react';
import News from '../components/football/News.jsx';
import Banner from '../components/football/banner';
import Foot1 from '../components/football/Foot1';
import HeroFootball from '../components/football/HeroFootball';
import Youtube from '../components/football/Youtube';
import Team from '../components/football/Team';
import Footer from '../components/football/Footer';
import DordoiTrophies from '../components/football/Trophies';
import StoriesPage from '../components/football/StoriesPage/index.js';
import ClubHistory from '../components/football/histrory/ClubHistory.jsx';
import StadiumPage from '../components/football/stadium/StadiumPage.jsx';



const Football = () => {
  const video = '/videos/hero-3.mp4';
  return (
    <div>
      {/* <HeroFootball src={video} /> */}
      <Banner />
      <StoriesPage/>
      <News />
      <Foot1 />
      <Youtube/>
      
      <Team/>
      <DordoiTrophies />
      <StadiumPage />
      <ClubHistory />
      <Footer/>
    </div>
  );
};

export default Football;