import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from './assets/logo.png';
import { banner } from './const';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banner.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = banner[currentIndex];

  return (
    <div className="">
      {/* <motion.div
        className="bg-gradient-to-r from-blue-900 to-blue-600 h-16 flex items-center justify-center shadow-lg border-b-2 border-yellow-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex items-center space-x-4">
          <img src={logo} alt="FC Dordoi Logo" className="h-12 w-12" />
          <h1 className="text-2xl font-extrabold text-yellow-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            FC Dordoi
          </h1>
        </div>
      </motion.div> */}
      <section className="relative w-full max-h-[80vh] overflow-hidden">
        <div className="pt-16">
          <motion.div
            className="absolute inset-0 z-0"
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-yellow-500/30"></div>
          </motion.div>

          <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-center px-4 md:px-8"
            key={currentSlide.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="bg-black bg-opacity-50 p-6 rounded-lg max-w-2xl">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 tracking-wide uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                {currentSlide.title}
              </h2>
              <p className="mt-3 text-white text-base font-medium sm:text-lg md:text-xl lg:text-2xl">
                {currentSlide.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Banner;