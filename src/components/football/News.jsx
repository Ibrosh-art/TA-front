import React, { useState } from 'react';
import logo from './assets/logo.png';
import { motion } from 'framer-motion';
import { newsData } from './const';// Импорт данных новостей
import { FaSearch, FaCalendarAlt, FaArrowRight, FaFilter, FaTimes, FaStar } from 'react-icons/fa';

// Данные новостей


// Категории для фильтра
export const categories = ["Все", "Матчи", "Трансферы", "Академия", "Инфраструктура"];

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Фильтрация новостей
  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Все" || news.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Шапка */}
      <header className="bg-blue-900 text-white shadow-lg h-[13vh] flex items-center " >
         
        <div className="flex flex-col items-center justify-center w-full">
          
             
          {/* <img src={logo} alt="Logo" className="h-16 "/> */}
          <h1 
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            Новости Дордой FC
          </h1>
          <p
            className="text-blue-200"
          >
            
          </p>

          
        </div>
      </header>

      {/* Поиск и фильтры */}
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Поле поиска */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Поиск новостей..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Кнопка фильтров (мобильная) */}
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:hidden flex items-center justify-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-lg"
            >
              {isFiltersOpen ? <FaTimes /> : <FaFilter />}
              <span>Фильтры</span>
            </button>

            {/* Фильтры по категориям (десктоп) */}
            <div className="hidden md:flex gap-2">
              {categories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-lg transition ${activeCategory === category ? 'bg-blue-900 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Мобильные фильтры (раскрывающиеся) */}
          {isFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-2 gap-2 md:hidden"
            >
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setIsFiltersOpen(false);
                  }}
                  className={`px-3 py-2 text-sm rounded-lg transition ${activeCategory === category ? 'bg-blue-900 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Главная новость (если есть featured) */}
        {filteredNews.some(news => news.featured) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Главная новость
            </h2>
            {filteredNews.filter(news => news.featured).map(news => (
              <motion.div
                key={news.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-2/3 h-64 md:h-96">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 md:w-1/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-gray-500 text-sm">
                          <FaCalendarAlt className="mr-2" />
                          <span>{news.date}</span>
                        </div>
                        <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full text-xs">
                          {news.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{news.title}</h3>
                      <p className="text-gray-600 mb-4">{news.excerpt}</p>
                    </div>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-blue-900 font-semibold flex items-center self-start"
                    >
                      Читать подробнее <FaArrowRight className="ml-2" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Все новости */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Последние новости</h2>
          
          {filteredNews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-8 text-center"
            >
              <p className="text-gray-600">Новости не найдены. Попробуйте изменить параметры поиска.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.filter(news => !news.featured).map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-gray-500 text-sm">
                        <FaCalendarAlt className="mr-2" />
                        <span>{news.date}</span>
                      </div>
                      <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full text-xs">
                        {news.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{news.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{news.excerpt}</p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-blue-900 font-semibold flex items-center text-sm"
                    >
                      Читать далее <FaArrowRight className="ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Пагинация */}
      {filteredNews.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="container mx-auto px-4 py-8 flex justify-center"
        >
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
              1
            </button>
            <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg transition">
              2
            </button>
            <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg transition">
              3
            </button>
            <motion.button
              whileHover={{ x: 5 }}
              className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg flex items-center transition"
            >
              Далее <FaArrowRight className="ml-2" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NewsPage;