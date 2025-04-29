import React from 'react';
import Hero from '../components/Hero';
import PlazaTwo from '../components/Plaza_1';
const Plaza = () => {
  const video = '/videos/hero-1.mp4';
  return (
    <div>
      <Hero src={video} />
      <PlazaTwo />
    </div>
  );
};

export default Plaza;