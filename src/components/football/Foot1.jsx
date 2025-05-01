import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { matchesData } from './ const'; // Импорт данных матчей  
import { FaCalendarAlt, FaTicketAlt, FaChevronDown, FaChevronUp, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

// Данные матчей


// Турниры для фильтрации
const competitions = ["Все", "Премьер-Лига", "Кубок Кыргызстана", "Дружеские матчи"];

const MatchesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCompetition, setActiveCompetition] = useState("Все");
  const [expandedMatch, setExpandedMatch] = useState(null);

  // Фильтрация матчей
  const filteredMatches = matchesData.filter(match => {
    const matchesSearch = match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompetition = activeCompetition === "Все" || match.competition === activeCompetition;
    return matchesSearch && matchesCompetition;
  });

  // Форматирование даты
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split(' ');
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Шапка */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            Календарь матчей
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white"
          >
            Расписание всех игр Дордой FC
          </motion.p>
        </div>
      </header>

      {/* Фильтры и поиск */}
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Поле поиска */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Поиск по командам или стадиону..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Фильтр по турнирам */}
            <div className="w-full md:w-64">
              <select
                value={activeCompetition}
                onChange={(e) => setActiveCompetition(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {competitions.map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Список матчей */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredMatches.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-8 text-center"
            >
              <p className="text-gray-600">Матчи не найдены. Попробуйте изменить параметры поиска.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  {/* Основная информация о матче */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2" />
                        <span>{formatDate(match.date)}</span>
                        <span className="mx-2">•</span>
                        <span>{match.time}</span>
                      </div>
                      <div>
                        {expandedMatch === match.id ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-center flex-1">
                        <p className="font-bold text-lg">{match.homeTeam}</p>
                        {match.homeScore !== null && (
                          <p className="text-2xl font-bold">{match.homeScore}</p>
                        )}
                      </div>
                      
                      <div className="mx-4 text-gray-500 font-bold">vs</div>
                      
                      <div className="text-center flex-1">
                        <p className="font-bold text-lg">{match.awayTeam}</p>
                        {match.awayScore !== null && (
                          <p className="text-2xl font-bold">{match.awayScore}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 text-center text-sm text-gray-500">
                      {match.competition}
                    </div>
                  </div>

                  {/* Дополнительная информация (раскрывающаяся) */}
                  {expandedMatch === match.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 border-t border-gray-100"
                    >
                      <div className="mt-4 flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{match.venue}</span>
                      </div>

                      <div className="mt-4 flex justify-center">
                        {match.ticketAvailable ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-900 text-white px-6 py-2 rounded-lg flex items-center"
                          >
                            <FaTicketAlt className="mr-2" />
                            Купить билет
                          </motion.button>
                        ) : (
                          <button 
                            disabled
                            className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg cursor-not-allowed"
                          >
                            Билеты скоро в продаже
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Дордой FC. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default MatchesPage;