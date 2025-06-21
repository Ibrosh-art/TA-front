import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Story from '../components/FloatingImage';
import Cards from '../components/Cards';
import Announcment from '../components/Announcment';
import NewFoot from "../components/NewFoot";
import Stories from "../components/Home/Stories";
import Stor from "../components/Home/Stor";
import History from "../components/Home/History";
import About from "../components/Home/About";


const Home = () => {
  const video = '/videos/hero-4.mp4';
  return (
    <div className=''>
        <Hero src={video} />
        <Cards />
        <Stories />
        <About /> 
        <History />
        <Stor />  
      <Announcment />
      <Features />
     <Story /> 
     <NewFoot  />
      
      
    </div>
  );
};

export default Home;
