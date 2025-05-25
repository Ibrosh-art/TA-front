import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { matchesData } from './const';
import { 
  FaCalendarAlt, FaTicketAlt, FaChevronDown, FaChevronUp, 
  FaSearch, FaMapMarkerAlt, FaFilter, FaStar, FaShareAlt, FaFire
} from 'react-icons/fa';
import { IoMdNotificationsOutline, IoMdNotifications } from 'react-icons/io';
import { BsClockHistory, BsTrophy, BsGraphUp } from 'react-icons/bs';
import { GiSoccerBall, GiSoccerKick } from 'react-icons/gi';

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
  const [isHovered, setIsHovered] = useState(null);

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
      alert(shareText);
    }
  };

  const getMatchStatusBadge = (status) => {
    switch(status) {
      case 'upcoming': 
        return (
          <motion.span 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center"
          >
            <FaFire className="mr-1" /> Предстоящий
          </motion.span>
        );
      case 'completed':
        return (
          <motion.span 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1 rounded-full shadow-md"
          >
            Завершен
          </motion.span>
        );
      case 'canceled':
        return (
          <motion.span 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md"
          >
            Отменен
          </motion.span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Epic Header with Parallax Effect */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gray-900 text-white shadow-2xl"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-900 opacity-90"></div>
          <div className="absolute inset-0 bg-stadium-pattern opacity-20"></div>
          <motion.div 
            animate={{
              x: [0, 10, 0],
              y: [0, 5, 0],
              transition: { duration: 15, repeat: Infinity, ease: "linear" }
            }}
            className="absolute inset-0 bg-soccer-pattern opacity-10"
          ></motion.div>
        </div>
        
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <GiSoccerKick className="text-5xl text-yellow-400" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200"
          >
            КАЛЕНДАРЬ МАТЧЕЙ
          </motion.h1>
          
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <GiSoccerBall className="inline-block text-4xl text-yellow-400 animate-spin-slow" />
          </motion.div>
        </div>
      </motion.header>

      {/* Navigation Tabs with Glow Effect */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="container mx-auto px-4 -mt-8 relative z-20"
      >
        <div className="flex bg-white rounded-t-xl overflow-hidden shadow-lg">
          <button
            onClick={() => setActiveTab("matches")}
            className={`px-8 py-4 font-bold text-sm uppercase tracking-wider relative overflow-hidden ${activeTab === "matches" ? 
              'text-white bg-gradient-to-r from-blue-600 to-blue-800 shadow-blue' : 
              'text-gray-600 hover:text-blue-600 transition-colors'}`}
          >
            {activeTab === "matches" && (
              <motion.span 
                layoutId="tabIndicator"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              <GiSoccerBall className="mr-2" /> Все матчи
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-8 py-4 font-bold text-sm uppercase tracking-wider relative overflow-hidden ${activeTab === "favorites" ? 
              'text-white bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-yellow' : 
              'text-gray-600 hover:text-yellow-600 transition-colors'}`}
          >
            {activeTab === "favorites" && (
              <motion.span 
                layoutId="tabIndicator"
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              <FaStar className="mr-2" /> Избранное ({favorites.length})
            </span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl shadow-xl p-6 mb-8 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Search Field with Glow */}
            <div className="relative flex-grow w-full">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                  <FaSearch className="text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Поиск по командам, стадиону или дате..."
                  className="pl-12 pr-6 py-3 w-full border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>

            {/* Filter Button (Mobile) */}
            <motion.button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="md:hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg flex items-center"
            >
              <FaFilter className="mr-2" />
              Фильтры
            </motion.button>

            {/* Filter Controls (Desktop) */}
            <div className="hidden md:flex gap-4 w-full md:w-auto">
              <motion.div 
                whileHover={{ y: -2 }}
                className="w-full md:w-56"
              >
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-500">
                    <BsTrophy />
                  </div>
                  <select
                    value={activeCompetition}
                    onChange={(e) => setActiveCompetition(e.target.value)}
                    className="pl-12 pr-6 py-3 w-full border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 appearance-none bg-white"
                  >
                    {competitions.map(comp => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                  </select>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2 }}
                className="w-full md:w-56"
              >
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-500">
                    <BsClockHistory />
                  </div>
                  <select
                    value={activeStatus}
                    onChange={(e) => setActiveStatus(e.target.value)}
                    className="pl-12 pr-6 py-3 w-full border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 appearance-none bg-white"
                  >
                    {matchStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Expanded Filters (Mobile) */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 md:hidden space-y-4 overflow-hidden"
              >
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Турнир</label>
                  <select
                    value={activeCompetition}
                    onChange={(e) => setActiveCompetition(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                  >
                    {competitions.map(comp => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select
                    value={activeStatus}
                    onChange={(e) => setActiveStatus(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                  >
                    {matchStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Cards with Floating Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-2xl shadow-2xl text-white relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <GiSoccerBall className="text-6xl" />
            </div>
            <div className="flex items-center z-10 relative">
              <div className="p-3 rounded-xl bg-blue-500 bg-opacity-30 mr-4">
                <BsGraphUp className="text-2xl" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Матчей сыграно</div>
                <div className="text-3xl font-bold">12</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-green-600 to-green-800 p-5 rounded-2xl shadow-2xl text-white relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <BsTrophy className="text-6xl" />
            </div>
            <div className="flex items-center z-10 relative">
              <div className="p-3 rounded-xl bg-green-500 bg-opacity-30 mr-4">
                <BsTrophy className="text-2xl" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Побед</div>
                <div className="text-3xl font-bold">8</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-5 rounded-2xl shadow-2xl text-white relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <BsClockHistory className="text-6xl" />
            </div>
            <div className="flex items-center z-10 relative">
              <div className="p-3 rounded-xl bg-yellow-500 bg-opacity-30 mr-4">
                <BsClockHistory className="text-2xl" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Ничьих</div>
                <div className="text-3xl font-bold">3</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-red-600 to-red-800 p-5 rounded-2xl shadow-2xl text-white relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <GiSoccerKick className="text-6xl" />
            </div>
            <div className="flex items-center z-10 relative">
              <div className="p-3 rounded-xl bg-red-500 bg-opacity-30 mr-4">
                <BsClockHistory className="text-2xl" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Поражений</div>
                <div className="text-3xl font-bold">1</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Matches List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {(activeTab === "favorites" && favorites.length === 0) ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-dashed border-gray-200"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 2, repeat: Infinity }
                }}
              >
                <FaStar className="mx-auto text-6xl text-yellow-400 mb-6 opacity-80" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Нет избранных матчей</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Добавляйте матчи в избранное, чтобы следить за ними. Нажмите на звездочку на карточке матча.
              </p>
            </motion.div>
          ) : (sortedMatches.length === 0) ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-dashed border-gray-200"
            >
              <GiSoccerBall className="mx-auto text-6xl text-gray-400 mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Матчи не найдены</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Попробуйте изменить параметры поиска или выберите другой турнир.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {sortedMatches
                  .filter(match => activeTab === "matches" || favorites.includes(match.id))
                  .map((match) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: match.id % 10 * 0.05 }
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative ${match.status === 'completed' ? 'opacity-90' : ''}`}
                    >
                      {/* Match Card */}
                      <div 
                        className={`bg-white rounded-2xl shadow-xl overflow-hidden border-l-4 ${
                          match.status === 'upcoming' ? 'border-blue-500' :
                          match.status === 'completed' ? 'border-green-500' :
                          'border-red-500'
                        }`}
                        onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                      >
                        {/* Match Header */}
                        <div className="p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center text-gray-500 text-sm">
                              <FaCalendarAlt className="mr-2 text-blue-500" />
                              <span>{formatDate(match.date)}</span>
                              <span className="mx-2">•</span>
                              <span>{match.time}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {getMatchStatusBadge(match.status)}
                              <motion.button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(match.id);
                                }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                className="text-gray-400 hover:text-yellow-500 transition-colors"
                              >
                                <FaStar className={favorites.includes(match.id) ? 'text-yellow-400 fill-current' : ''} />
                              </motion.button>
                              {expandedMatch === match.id ? (
                                <FaChevronUp className="text-gray-500" />
                              ) : (
                                <FaChevronDown className="text-gray-500" />
                              )}
                            </div>
                          </div>

                          {/* Teams and Score */}
                          <div className="mt-5 flex items-center justify-between">
                            <div className="text-center flex-1">
                              <div className="flex items-center justify-center">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="relative"
                                  onMouseEnter={() => setIsHovered(`home-${match.id}`)}
                                  onMouseLeave={() => setIsHovered(null)}
                                >
                                  <img 
                                    src={match.homeTeamLogo || 'https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png'} 
                                    alt={match.homeTeam}
                                    className="w-12 h-12 mr-3 object-contain"
                                  />
                                  {isHovered === `home-${match.id}` && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                                    >
                                      {match.homeTeam}
                                    </motion.div>
                                  )}
                                </motion.div>
                                <p className="font-bold text-gray-900">{match.homeTeam}</p>
                              </div>
                              {match.homeScore !== null && (
                                <motion.p 
                                  initial={{ scale: 0.5 }}
                                  animate={{ scale: 1 }}
                                  className="text-3xl font-bold mt-2 text-gray-900"
                                >
                                  {match.homeScore}
                                </motion.p>
                              )}
                            </div>
                            
                            <div className="mx-4 text-gray-400 font-bold text-sm relative">
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  transition: { duration: 2, repeat: Infinity }
                                }}
                                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs"
                              >
                                VS
                              </motion.div>
                            </div>
                            
                            <div className="text-center flex-1">
                              <div className="flex items-center justify-center">
                                <p className="font-bold text-gray-900">{match.awayTeam}</p>
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="relative"
                                  onMouseEnter={() => setIsHovered(`away-${match.id}`)}
                                  onMouseLeave={() => setIsHovered(null)}
                                >
                                  <img 
                                    src={match.awayTeamLogo || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/FK_Alga_Bishkek_Logo.svg/1200px-FK_Alga_Bishkek_Logo.svg.png'} 
                                    alt={match.awayTeam}
                                    className="w-12 h-12 ml-3 object-contain"
                                  />
                                  {isHovered === `away-${match.id}` && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                                    >
                                      {match.awayTeam}
                                    </motion.div>
                                  )}
                                </motion.div>
                              </div>
                              {match.awayScore !== null && (
                                <motion.p 
                                  initial={{ scale: 0.5 }}
                                  animate={{ scale: 1 }}
                                  className="text-3xl font-bold mt-2 text-gray-900"
                                >
                                  {match.awayScore}
                                </motion.p>
                              )}
                            </div>
                          </div>

                          <div className="mt-3 text-center text-sm text-gray-500 flex items-center justify-center">
                            <BsTrophy className="mr-2 text-yellow-500" />
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
                              className="px-5 pb-5 border-t border-gray-100"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <motion.div
                                  initial={{ x: -20 }}
                                  animate={{ x: 0 }}
                                  className="bg-blue-50 p-4 rounded-xl border border-blue-100"
                                >
                                  <h4 className="font-bold text-gray-700 mb-2 flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-blue-600" />
                                    Место проведения
                                  </h4>
                                  <p className="text-gray-600">{match.venue}</p>
                                  {match.venueAddress && (
                                    <p className="text-sm text-gray-500 mt-1">{match.venueAddress}</p>
                                  )}
                                  {match.venueMap && (
                                    <motion.a 
                                      href={match.venueMap} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      whileHover={{ x: 3 }}
                                      className="text-blue-600 text-sm inline-block mt-2 font-medium flex items-center"
                                    >
                                      Посмотреть на карте <FaChevronRight className="ml-1 text-xs" />
                                    </motion.a>
                                  )}
                                </motion.div>

                                <motion.div
                                  initial={{ x: 20 }}
                                  animate={{ x: 0 }}
                                  className="bg-yellow-50 p-4 rounded-xl border border-yellow-100"
                                >
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
                                </motion.div>
                              </div>

                              <div className="mt-5 flex flex-wrap justify-center gap-3">
                                {match.ticketAvailable ? (
                                  <>
                                    <motion.button
                                      whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                                      }}
                                      whileTap={{ scale: 0.98 }}
                                      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2.5 rounded-xl shadow-lg flex items-center"
                                    >
                                      <FaTicketAlt className="mr-2" />
                                      Купить билет
                                    </motion.button>
                                    
                                    <motion.button
                                      onClick={() => toggleNotification(match.id)}
                                      whileHover={{ y: -2 }}
                                      className="flex items-center px-5 py-2.5 border-2 border-blue-100 rounded-xl hover:bg-blue-50 transition-colors text-blue-600 font-medium"
                                    >
                                      {notifications[match.id] ? (
                                        <>
                                          <IoMdNotifications className="text-blue-600 mr-2" />
                                          Уведомления включены
                                        </>
                                      ) : (
                                        <>
                                          <IoMdNotificationsOutline className="text-blue-600 mr-2" />
                                          Включить уведомления
                                        </>
                                      )}
                                    </motion.button>
                                  </>
                                ) : (
                                  <motion.button 
                                    disabled
                                    whileHover={{ y: -2 }}
                                    className="bg-gray-100 text-gray-500 px-6 py-2.5 rounded-xl cursor-not-allowed flex items-center"
                                  >
                                    <FaTicketAlt className="mr-2" />
                                    Билеты скоро в продаже
                                  </motion.button>
                                )}

                                <motion.button
                                  onClick={() => shareMatch(match)}
                                  whileHover={{ y: -2 }}
                                  className="flex items-center px-5 py-2.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                                >
                                  <FaShareAlt className="text-gray-600 mr-2" />
                                  Поделиться
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default MatchesPage;