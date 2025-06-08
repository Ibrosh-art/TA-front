import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import banner1 from './assets/banner1.jpeg';
import banner2 from './assets/banner2.jpeg' // Adjust the import path as necessary

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Static banner data
  const banner = [
    {
      image: banner1, // Replace with your actual image path

    },
    {
      image: banner2, // Replace with your actual image path
        }
    // Add more banners as needed
  ];

  useEffect(() => {
    if (banner.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }
  }, [banner.length]);

  const currentSlide = banner.length > 0 ? banner[currentIndex] : null;

  return (
    <div className="">
      <section className="relative w-full max-h-[80vh] overflow-hidden">
        <div className="">
          {banner.length === 0 ? (
            <div className="flex justify-center items-center h-[80vh] text-white text-xl">
              No banners available
            </div>
          ) : (
            <>
              <motion.div
                className="absolute inset-0 z-0"
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <img
                  src={banner[currentIndex]?.image}
                  alt={banner[currentIndex]?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-yellow-500/30"></div>
              </motion.div>

              <motion.div
                className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-center px-4 md:px-8"
                key={banner[currentIndex]?.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
               
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>   
  );
};

export default Banner;