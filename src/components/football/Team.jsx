import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const PlayerCard = ({ player }) => {
  return (
    <motion.div
      className="relative w-[280px] h-[400px] group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Full-height player image */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={player.image || '/default-player.jpg'}
            alt={player.full_name}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.target.src = '/default-player.jpg';
            }}
          />
          
          {/* Diagonal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent" />
          
          {/* If player is from academy, show badge */}
          {player.from_academy && (
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-yellow-500/80 flex items-center justify-center">
              <div className="text-xs text-center font-bold text-blue-900 rotate-[-15deg]">
                <div>ACADEMY</div>
                <div>GRADUATE</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Player name and position overlay */}
      <div className="absolute left-0 right-0 bottom-0 z-20 p-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
            {player.full_name.split(' ').length > 1 
              ? <>
                  <div>{player.full_name.split(' ')[0]}</div>
                  <div className="text-yellow-400">{player.full_name.split(' ').slice(1).join(' ')}</div>
                </>
              : player.full_name
            }
          </h2>
          <p className="text-white text-lg mt-1">{player.position}</p>
          
          {/* Player number badge */}
          {player.number && (
            <div className="absolute top-[-80px] right-4 bg-yellow-400/80 text-blue-900 text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full">
              {player.number}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PlayerCardSkeleton = () => (
  <div className="w-[280px] h-[400px] bg-blue-900/50 rounded animate-pulse">
    <div className="w-full h-full relative">
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-blue-900/80 p-4">
        <div className="h-6 bg-blue-800/50 w-3/4 mx-auto mb-2 rounded"></div>
        <div className="h-4 bg-blue-800/50 w-1/2 mx-auto rounded"></div>
      </div>
    </div>
  </div>
);

const Team = () => {
  const [players, setPlayers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Все');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const playersPerPage = 4; // Show 4 players at a time in carousel

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

  // Filter players by position
  const filteredPlayers = players.filter(p => activeFilter === 'Все' || p.position === activeFilter);
  
  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  
  // Get current page players
  const currentPlayers = filteredPlayers.slice(
    currentPage * playersPerPage, 
    (currentPage + 1) * playersPerPage
  );

  // Navigation functions
  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section className="min-h-screen bg-blue-800 py-20" id='team'>
      <div className="container mx-auto px-4">
        {/* PLAYERS heading similar to Barcelona site */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white uppercase tracking-wide">
            PLAYERS
          </h1>
          <div className="h-1 w-full bg-yellow-400 mt-2"></div>
        </div>
        
        {/* Filters styled like top navigation tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-blue-900/50 rounded-full p-1.5">
            {positions.map((position) => (
              <button
                key={position}
                onClick={() => {
                  setActiveFilter(position);
                  setCurrentPage(0); // Reset to first page when filter changes
                }}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${
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

        {/* Carousel navigation */}
        <div className="relative">
          {/* Players Carousel */}
          {isLoading ? (
            <div className="flex justify-center gap-6 mx-auto">
              {[...Array(4)].map((_, i) => (
                <PlayerCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <motion.div 
                className="flex justify-center gap-6 mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={currentPage}
              >
                <AnimatePresence>
                  {currentPlayers.length > 0 ? (
                    currentPlayers.map(player => (
                      <PlayerCard 
                        key={player.id}
                        player={player}
                      />
                    ))
                  ) : (
                    <div className="text-center text-white text-xl py-10">
                      Нет игроков по выбранным критериям
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Navigation arrows */}
              {filteredPlayers.length > playersPerPage && (
                <>
                  <button 
                    onClick={prevPage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-900/50 hover:bg-yellow-400 text-white hover:text-blue-900 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Previous page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextPage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-900/50 hover:bg-yellow-400 text-white hover:text-blue-900 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Next page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </>
          )}
        </div>
        
        {/* Pagination dots */}
        {filteredPlayers.length > playersPerPage && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full ${
                  currentPage === i ? 'bg-yellow-400' : 'bg-white/30'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
