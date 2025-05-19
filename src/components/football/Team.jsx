import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const PlayerCard = ({ player }) => {
  return (
    <motion.div
      className="relative h-[500px] w-[350px] rounded-xl overflow-hidden bg-gray-900 shadow-2xl group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Player Image */}
      <div className="relative h-3/4 bg-gray-800">
        <img
          src={player.image || '/default-player.jpg'}
          alt={player.full_name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          onError={(e) => {
            e.target.src = '/default-player.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Player Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-3xl font-bold uppercase tracking-tighter">
              {player.full_name}
            </h3>
            <p className="text-xl text-yellow-400 font-medium">
              {player.position}
            </p>
          </div>
          <span className="text-4xl font-bold text-yellow-400">
            #{player.number}
          </span>
        </div>

        {/* Career Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Гражданство</p>
            <p className="font-medium">{player.citizenship}</p>
          </div>
          <div>
            <p className="text-gray-400">Контракт до</p>
            <p className="font-medium">2025</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const [players, setPlayers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Все');
  const [isLoading, setIsLoading] = useState(true);

  const positions = ['Все', 'Нападающий', 'Полузащитник', 'Защитник', 'Вратарь'];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/footballers');
        setPlayers(data);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayers();
  }, []);

   return (
    <section className="min-h-screen bg-blue-800 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-8 uppercase tracking-wide">
            Основной состав
          </h1>
          
          {/* Filters */}
          <div className="flex justify-center gap-3 flex-wrap">
            {positions.map((position) => (
              <button
                key={position}
                onClick={() => setActiveFilter(position)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === position 
                    ? 'bg-yellow-400 text-blue-900' 
                    : 'bg-blue-900/50 text-white hover:bg-blue-900'
                }`}
              >
                {position}
              </button>
            ))}
          </div>
        </div>

        {/* Players Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[500px] w-[350px] bg-blue-900 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center"
            layout
          >
            <AnimatePresence>
              {players
                .filter(p => activeFilter === 'Все' || p.position === activeFilter)
                .map(player => (
                  <PlayerCard 
                    key={player.id}
                    player={player}
                  />
                ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      
    </section>
  );
};

export default Team;