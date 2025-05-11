import React from 'react';
import { motion } from 'framer-motion';

const HistoryCard = ({ item, index }) => {
  return (
    <motion.div 
      className={`history-card bg-white rounded-xl shadow-lg overflow-hidden ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} md:w-5/6 mb-8 md:mb-16`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <div className="md:flex">
        <div className="md:w-2/5">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-3/5">
          <div className="flex items-center mb-4">
            <span className={`text-lg font-bold px-4 py-2 rounded-full ${item.highlight ? 'bg-blue-700 text-white' : 'bg-yellow-400 text-blue-900'}`}>
              {item.year}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-blue-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {item.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryCard;
