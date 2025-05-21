import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { matchesData } from './const';
import { 
  FaCalendarAlt, FaTicketAlt, FaChevronDown, FaChevronUp, 
  FaSearch, FaMapMarkerAlt, FaFilter, FaStar, FaShareAlt 
} from 'react-icons/fa';
import { IoMdNotificationsOutline, IoMdNotifications } from 'react-icons/io';
import { BsClockHistory, BsTrophy } from 'react-icons/bs';

const competitions = ["Все", "Премьер-Лига", "Кубок Кыргызстана", "Дружеские матчи"];
const matchStatuses = ["Все", "Предстоящие", "Завершенные", "Отмененные"];

const MatchesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCompetition, setActiveCompetition] = useState("Все");
  const [activeStatus, setActiveStatus] = useState("Все");
  const [expandedMatch, setExpandedMatch] = useState(null);
  const [notifications, setNotifications] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("matches");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteMatches');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteMatches', JSON.stringify(favorites));
  }, [favorites]);

  // Filter matches based on search, competition, and status
  const filteredMatches = matchesData.filter(match => {
    const matchesSearch = match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCompetition = activeCompetition === "Все" || match.competition === activeCompetition;
    
    const matchesStatus = 
      activeStatus === "Все" ||
      (activeStatus === "Предстоящие" && match.status === "upcoming") ||
      (activeStatus === "Завершенные" && match.status === "completed") ||
      (activeStatus === "Отмененные" && match.status === "canceled");
    
    return matchesSearch && matchesCompetition && matchesStatus;
  });

  // Sort matches: upcoming first, then by date
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (a.status === "upcoming" && b.status !== "upcoming") return -1;
    if (a.status !== "upcoming" && b.status === "upcoming") return 1;
    return new Date(a.date) - new Date(b.date);
  });

  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('ru-RU', options);
  };

  const toggleNotification = (matchId) => {
    setNotifications(prev => ({
      ...prev,
      [matchId]: !prev[matchId]
    }));
    
    // Here you would typically send this to your backend
    console.log(`Notifications ${notifications[matchId] ? 'disabled' : 'enabled'} for match ${matchId}`);
  };

  const toggleFavorite = (matchId) => {
    if (favorites.includes(matchId)) {
      setFavorites(favorites.filter(id => id !== matchId));
    } else {
      setFavorites([...favorites, matchId]);
    }
  };

  const shareMatch = (match) => {
    const shareText = `Матч ${match.homeTeam} vs ${match.awayTeam} ${match.date} в ${match.time} на ${match.venue}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Матч Дордой FC',
        text: shareText,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(shareText);
    }
  };

  const getMatchStatusBadge = (status) => {
    switch(status) {
      case 'upcoming': 
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Предстоящий</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Завершен</span>;
      case 'canceled':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Отменен</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-stadium-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-12 text-center relative">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Календарь матчей
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Полное расписание всех игр ФК Дордой. Не пропустите важные матчи!
          </motion.p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("matches")}
            className={`px-6 py-3 font-medium ${activeTab === "matches" ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Матчи
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-6 py-3 font-medium ${activeTab === "favorites" ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Избранное ({favorites.length})
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Search Field */}
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Поиск по командам, стадиону или дате..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Button (Mobile) */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center"
            >
              <FaFilter className="mr-2" />
              Фильтры
            </button>

            {/* Filter Controls (Desktop) */}
            <div className="hidden md:flex gap-4 w-full md:w-auto">
              <div className="w-full md:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Турнир</label>
                <div className="relative">
                  <BsTrophy className="absolute left-3 top-3 text-gray-400" />
                  <select
                    value={activeCompetition}
                    onChange={(e) => setActiveCompetition(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {competitions.map(comp => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full md:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                <div className="relative">
                  <BsClockHistory className="absolute left-3 top-3 text-gray-400" />
                  <select
                    value={activeStatus}
                    onChange={(e) => setActiveStatus(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {matchStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Filters (Mobile) */}
          {isFilterOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 md:hidden space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Турнир</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                <select
                  value={activeStatus}
                  onChange={(e) => setActiveStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {matchStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Matches List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {(activeTab === "favorites" && favorites.length === 0) ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-8 text-center"
            >
              <FaStar className="mx-auto text-4xl text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Нет избранных матчей</h3>
              <p className="text-gray-600">Добавляйте матчи в избранное, чтобы следить за ними</p>
            </motion.div>
          ) : (sortedMatches.length === 0) ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-8 text-center"
            >
              <p className="text-gray-600">Матчи не найдены. Попробуйте изменить параметры поиска.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {sortedMatches
                  .filter(match => activeTab === "matches" || favorites.includes(match.id))
                  .map((match) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-white rounded-xl shadow-md overflow-hidden ${match.status === 'completed' ? 'opacity-90' : ''}`}
                    >
                      {/* Match Header */}
                      <div 
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center text-gray-500 text-sm">
                            <FaCalendarAlt className="mr-2" />
                            <span>{formatDate(match.date)}</span>
                            <span className="mx-2">•</span>
                            <span>{match.time}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {getMatchStatusBadge(match.status)}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(match.id);
                              }}
                              className="text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                              <FaStar className={favorites.includes(match.id) ? 'text-yellow-400 fill-current' : ''} />
                            </button>
                            {expandedMatch === match.id ? (
                              <FaChevronUp className="text-gray-500" />
                            ) : (
                              <FaChevronDown className="text-gray-500" />
                            )}
                          </div>
                        </div>

                        {/* Teams and Score */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-center flex-1">
                            <div className="flex items-center justify-center">
                              <img 
                                src={match.homeTeamLogo || 'https://via.placeholder.com/40'} 
                                alt={match.homeTeam}
                                className="w-8 h-8 mr-2 object-contain"
                              />
                              <p className="font-bold text-lg">{match.homeTeam}</p>
                            </div>
                            {match.homeScore !== null && (
                              <p className="text-2xl font-bold mt-2">{match.homeScore}</p>
                            )}
                          </div>
                          
                          <div className="mx-4 text-gray-500 font-bold text-sm">VS</div>
                          
                          <div className="text-center flex-1">
                            <div className="flex items-center justify-center">
                              <p className="font-bold text-lg">{match.awayTeam}</p>
                              <img 
                                src={match.awayTeamLogo || 'https://via.placeholder.com/40'} 
                                alt={match.awayTeam}
                                className="w-8 h-8 ml-2 object-contain"
                              />
                            </div>
                            {match.awayScore !== null && (
                              <p className="text-2xl font-bold mt-2">{match.awayScore}</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 text-center text-sm text-gray-500 flex items-center justify-center">
                          <BsTrophy className="mr-1" />
                          {match.competition}
                        </div>
                      </div>

                      {/* Expanded Match Details */}
                      <AnimatePresence>
                        {expandedMatch === match.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 pb-4 border-t border-gray-100"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-bold text-gray-700 mb-2 flex items-center">
                                  <FaMapMarkerAlt className="mr-2 text-blue-600" />
                                  Место проведения
                                </h4>
                                <p className="text-gray-600">{match.venue}</p>
                                {match.venueAddress && (
                                  <p className="text-sm text-gray-500 mt-1">{match.venueAddress}</p>
                                )}
                                {match.venueMap && (
                                  <a 
                                    href={match.venueMap} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 text-sm inline-block mt-2"
                                  >
                                    Посмотреть на карте →
                                  </a>
                                )}
                              </div>

                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-bold text-gray-700 mb-2">Дополнительная информация</h4>
                                {match.broadcast && (
                                  <p className="text-gray-600 mb-2">
                                    <span className="font-medium">Трансляция:</span> {match.broadcast}
                                  </p>
                                )}
                                {match.referee && (
                                  <p className="text-gray-600">
                                    <span className="font-medium">Судья:</span> {match.referee}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap justify-center gap-3">
                              {match.ticketAvailable ? (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
                                  >
                                    <FaTicketAlt className="mr-2" />
                                    Купить билет
                                  </motion.button>
                                  
                                  <button
                                    onClick={() => toggleNotification(match.id)}
                                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                  >
                                    {notifications[match.id] ? (
                                      <>
                                        <IoMdNotifications className="text-blue-600 mr-2" />
                                        Уведомления включены
                                      </>
                                    ) : (
                                      <>
                                        <IoMdNotificationsOutline className="text-gray-500 mr-2" />
                                        Включить уведомления
                                      </>
                                    )}
                                  </button>
                                </>
                              ) : (
                                <button 
                                  disabled
                                  className="bg-gray-200 text-gray-600 px-6 py-2 rounded-lg cursor-not-allowed flex items-center"
                                >
                                  <FaTicketAlt className="mr-2" />
                                  Билеты скоро в продаже
                                </button>
                              )}

                              <button
                                onClick={() => shareMatch(match)}
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <FaShareAlt className="text-gray-500 mr-2" />
                                Поделиться
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 py-8 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Статистика сезона</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-3xl font-bold text-blue-700">12</div>
              <div className="text-gray-600">Матчей сыграно</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-3xl font-bold text-green-600">8</div>
              <div className="text-gray-600">Побед</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-3xl font-bold text-yellow-600">3</div>
              <div className="text-gray-600">Ничьих</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-3xl font-bold text-red-600">1</div>
              <div className="text-gray-600">Поражений</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;