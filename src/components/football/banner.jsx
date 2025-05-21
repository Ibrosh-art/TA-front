import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import logo from './assets/logo.png';
import { use } from 'react';



const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banner, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/banners');
        setBanners(data);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    if (banner.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }
  }, [banner.length]); // ✅ Only runs when banner data updates
  
  const currentSlide = banner.length > 0 ? banner[currentIndex] : null;

  return (

      <div className="">
        <section className="relative w-full max-h-[80vh] overflow-hidden">
          <div className="pt-16">
            {isLoading || banner.length === 0 ? (
              // Show a loading placeholder
              <div className="flex justify-center items-center h-[80vh] text-white text-xl">
                Загрузка баннера...
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
                  <div className="bg-black bg-opacity-50 p-6 rounded-lg max-w-2xl">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 tracking-wide uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                      {banner[currentIndex]?.title}
                    </h2>
                    <p className="mt-3 text-white text-base font-medium sm:text-lg md:text-xl lg:text-2xl">
                      {banner[currentIndex]?.description}
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </div>   
  );
};

export default Banner;