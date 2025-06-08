import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import banner1 from './assets/banner1.jpg';
import banner2 from './assets/banner2.png' // Adjust the import path as necessary
import banner3 from './assets/banner3.png' // Adjust the import path as necessary
import banner1Mobile from './assets/banner1Mobile.jpg'; // Добавьте мобильные версии изображений
import banner2Mobile from './assets/banner2Mobile.jpg';
import banner3Mobile from './assets/banner3Mobile.jpg';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Определяем, мобильный ли экран
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // 640px — tailwind sm
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Static banner data
  const banner = [
    {
      image: isMobile ? banner1Mobile : banner1,
      title: 'Расторжение контракта с Лукой'
    },
    {
      image: isMobile ? banner2Mobile : banner2,
      title: 'Матч 11 тура КПЛ: Мурас Юнайтед - ФК Дордой'
    },
    {
      image: isMobile ? banner3Mobile : banner3,
      title: 'Дордой победил Илбирс в Матче 10 тура КПЛ: Илбирс - ФК Дордой'
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

              <motion.div
                className="absolute bottom-0 left-0 w-full z-10 flex flex-col items-center justify-end h-full text-center px-4 md:px-8 pb-14"
                key={banner[currentIndex]?.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-4xl font-extrabold text-yellow-400 drop-shadow-lg bg-black/60 rounded-lg px-4 py-2 mb-0 max-w-3xl mx-auto">
                  {banner[currentIndex]?.title}
                </h2>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>   
  );
};

export default Banner;