import React from 'react';
import Hero from '../components/Hero';
import Facu from '../components/FacultyPage'
import Caru from '../components/NewCarusel'
import Part from '../components/PartnersGallery'
import Part2 from '../components/Uni2'
import Par from '../components/UnHero'
import News from '../components/UnNews'
import Footer from '../components/UnFooter'
const Universiy = () => {
  const video = '/videos/hero-2.mp4';
  return (
    <div>
      <Hero src={video} />
      <Par />
      <Facu /> 
      <Part2 />
      <News />
      <Caru />
      <Part />
      <Footer />
    </div>
  );
};

export default Universiy