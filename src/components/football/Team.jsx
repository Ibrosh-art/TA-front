import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const PlayerCard = ({ player }) => {
  return (
    <motion.div
      className="relative w-[260px] h-[320px] md:w-[280px] md:h-[420px] group flex-shrink-0 snap-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="absolute inset-0 z-10 overflow-hidden rounded-xl">
        <div className="relative w-full h-full">
          <img
            src={player.image || '/default-player.jpg'}
            alt={player.full_name}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.target.src = '/default-player.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent" />
          {player.from_academy && (
            <div className="absolute top-2 right-2 md:top-3 md:right-3 w-12 h-12 md:w-14 md:h-14 rounded-full bg-yellow-500/80 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <div className="text-[8px] md:text-[10px] text-center font-bold text-blue-900 rotate-[-15deg] leading-tight">
                <div>ACADEMY</div>
                <div>GRADUATE</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 z-20 p-2 md:p-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight leading-snug">
            {player.full_name.split(' ').length > 1 
              ? <>
                  <div>{player.full_name.split(' ')[0]}</div>
                  <div className="text-yellow-400">{player.full_name.split(' ').slice(1).join(' ')}</div>
                </>
              : player.full_name
            }
          </h2>
          <p className="text-white text-sm md:text-base mt-1">{player.position}</p>
          {player.number && (
            <div className="absolute top-[-60px] md:top-[-70px] right-2 md:right-3 bg-yellow-400/80 text-blue-900 text-xl md:text-2xl font-bold w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
              {player.number}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PlayerCardSkeleton = () => (
  <div className="w-[260px] h-[320px] md:w-[280px] md:h-[420px] bg-blue-900/50 rounded-xl animate-pulse flex-shrink-0 snap-center">
    <div className="w-full h-full relative">
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-blue-900/80 p-3 md:p-4">
        <div className="h-4 md:h-6 bg-blue-800/50 w-3/4 mx-auto mb-2 rounded"></div>
        <div className="h-3 md:h-4 bg-blue-800/50 w-1/2 mx-auto rounded"></div>
      </div>
    </div>
  </div>
);

const Team = () => {
  const [players, setPlayers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Все');
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);

  const positions = ['Все', 'Нападающий', 'Полузащитник', 'Защитник', 'Вратарь'];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data } = await axios.get('https://pavilionmb.pythonanywhere.com/api/footballers');
        setPlayers(data);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(p => activeFilter === 'Все' || p.position === activeFilter);

  const scrollToPlayer = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-blue-800 py-12 md:py-20" id='team'>
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white uppercase tracking-wide">
            PLAYERS
          </h1>
          <div className="h-1 w-16 md:w-24 bg-yellow-400 mt-2 mx-auto"></div>
        </div>

        <div className="flex justify-center mb-8 md:mb-12">
          <div className="inline-flex flex-wrap gap-2 bg-blue-900/50 rounded-full p-1 justify-center">
            {positions.map((position) => (
              <button
                key={position}
                onClick={() => setActiveFilter(position)}
                className={`px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm rounded-full font-bold transition-colors ${
                  activeFilter === position 
                    ? 'bg-yellow-400 text-blue-900' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                {position}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4">
              {[...Array(4)].map((_, i) => (
                <PlayerCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible"
              >
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))
                ) : (
                  <div className="text-center text-white text-lg md:text-xl py-10 w-full">
                    Нет игроков по выбранным критериям
                  </div>
                )}
              </div>

              <button 
                onClick={() => scrollToPlayer('left')}
                className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 bg-blue-900/50 hover:bg-yellow-400 text-white hover:text-blue-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous player"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => scrollToPlayer('right')}
                className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-blue-900/50 hover:bg-yellow-400 text-white hover:text-blue-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Next player"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;