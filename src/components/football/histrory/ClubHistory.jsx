import React from 'react';
import HistoryTimeline from './HistoryTImeline';

const ClubHistory = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          История ФК Дордой
        </h2>
        <p className="text-xl text-center text-gray-700 mb-16 max-w-3xl mx-auto">
          Ключевые моменты в истории нашего клуба с момента основания в 1997 году до настоящего времени
        </p>
        
        <HistoryTimeline />
      </div>
    </section>
  );
};

export default ClubHistory;
