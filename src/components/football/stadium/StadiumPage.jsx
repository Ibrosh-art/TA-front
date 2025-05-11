import React from 'react';
import { motion } from 'framer-motion';
import StadiumGallery from './StadiumGallery';
import StadiumMap from './StadiumMap';
import { stadiumData } from './StadiumData';

const StadiumPage = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Наш стадион
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img 
              src={stadiumData.images[0].src} 
              alt={stadiumData.name} 
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {stadiumData.name}
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm text-blue-900 font-semibold">Вместимость</p>
                <p className="text-2xl font-bold text-blue-900">{stadiumData.capacity.toLocaleString()} зрителей</p>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-sm text-blue-900 font-semibold">Год основания</p>
                <p className="text-2xl font-bold text-blue-900">{stadiumData.yearFounded}</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              {stadiumData.description}
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-blue-900 font-semibold mb-2">Адрес:</p>
              <p className="text-gray-700">{stadiumData.address}</p>
            </div>
            
            <div>
              <p className="text-blue-900 font-semibold mb-2">Инфраструктура:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {stadiumData.facilities.map((facility, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        <StadiumGallery images={stadiumData.images} />
        
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Местоположение
          </h3>
          <StadiumMap coordinates={stadiumData.coordinates} />
        </div>
      </div>
    </section>
  );
};

export default StadiumPage;