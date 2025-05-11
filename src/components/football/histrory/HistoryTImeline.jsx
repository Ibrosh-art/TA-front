import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { historyData } from './HistoryData';
import HistoryCard from './HistoryCard';

const HistoryTimeline = () => {
  const timelineRef = useRef(null);
  
  return (
    <div className="relative">
      {/* Вертикальная линия для десктопов */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-700 transform -translate-x-1/2"></div>
      
      {/* Горизонтальная линия для мобильных */}
      <div className="md:hidden absolute left-0 right-0 h-1 bg-blue-700 top-24"></div>
      
      {/* События на десктопе - вертикально */}
      <div className="hidden md:block">
        {historyData.map((item, index) => (
          <div key={item.id} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-16`}>
            <div className="w-1/2 px-8">
              <HistoryCard item={item} index={index} />
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <motion.div 
                className="w-6 h-6 bg-yellow-400 rounded-full border-4 border-blue-700 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* События на мобильных - горизонтально */}
      <div className="md:hidden overflow-x-auto" ref={timelineRef}>
        <div className="flex py-12 px-4" style={{ width: `${historyData.length * 300}px` }}>
          {historyData.map((item, index) => (
            <div key={item.id} className="min-w-[280px] mx-2">
              <motion.div 
                className="w-6 h-6 bg-yellow-400 rounded-full border-4 border-blue-700 z-10 mx-auto mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
              />
              <HistoryCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryTimeline;
