import React from 'react';
import News from '../components/football/FootballSite.jsx';
import Banner from '../components/football/banner';
import Foot1 from '../components/football/Foot1';

import Youtube from '../components/football/Youtube';
import Team from '../components/football/Team';
import Footer from '../components/football/Footer';
import DordoiTrophies from '../components/football/Trophies';
import StoriesPage from '../components/football/storiesPage/StoriesPage.jsx';
import ClubHistory from '../components/football/history/ClubHistory.jsx';
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