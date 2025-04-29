import React from 'react';
import Hero from '../components/Hero';
import Facu from '../components/FacultyPage'
import Caru from '../components/NewCarusel'
import Part from '../components/PartnersGallery'
import Part2 from '../components/Uni2'
const Universiy = () => {
  const video = '/videos/hero-2.mp4';
  return (
    <div>
      <Hero src={video} />
      <Facu />
      <Caru />
      <Part />
      <Part2 />
    </div>
  );
};

export default Universiy