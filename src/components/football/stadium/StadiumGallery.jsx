import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StadiumGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const galleryRef = useRef(null);
  
  const scrollGallery = (direction) => {
    if (!galleryRef.current) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };
  
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold text-blue-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Фотогалерея
      </h3>
      
      {/* Галерея фотографий */}
      <div className="relative">
        <div className="hidden md:flex absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
          <button
            className="bg-blue-900 text-white p-3 rounded-full shadow-lg"
            onClick={() => scrollGallery('left')}
            aria-label="Предыдущие фото"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <div 
          ref={galleryRef}
          className="flex overflow-x-auto py-2 space-x-4 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, index) => (
            <motion.div 
              key={image.id}
              className="min-w-[250px] md:min-w-[300px] cursor-pointer rounded-lg overflow-hidden flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setCurrentIndex(index);
                setShowLightbox(true);
              }}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-48 object-cover"
              />
            </motion.div>
          ))}
        </div>
        
        <div className="hidden md:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
          <button
            className="bg-blue-900 text-white p-3 rounded-full shadow-lg"
            onClick={() => scrollGallery('right')}
            aria-label="Следующие фото"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Лайтбокс для просмотра фотографий */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              className="absolute top-4 right-4 text-white bg-blue-900 rounded-full p-2"
              onClick={() => setShowLightbox(false)}
              aria-label="Закрыть"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative w-full max-w-4xl mx-auto px-4">
              <motion.img 
                src={images[currentIndex].src} 
                alt={images[currentIndex].alt}
                className="w-full max-h-[80vh] object-contain"
                key={`lightbox-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                <p>{images[currentIndex].alt}</p>
                <div className="flex justify-center mt-4 space-x-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentIndex ? 'bg-yellow-400' : 'bg-gray-400'
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Перейти к фото ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {currentIndex > 0 && (
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-3 rounded-full"
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  aria-label="Предыдущее фото"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              {currentIndex < images.length - 1 && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-3 rounded-full"
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  aria-label="Следующее фото"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StadiumGallery;