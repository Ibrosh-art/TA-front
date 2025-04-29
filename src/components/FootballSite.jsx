import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaArrowRight, FaFilter, FaTimes, FaStar } from 'react-icons/fa';

// Данные новостей
const newsData = [
  {
    id: 1,
    title: "Дордой FC разгромил соперника 4:0 в товарищеском матче",
    date: "15 СЕН 2024",
    category: "Матчи",
    excerpt: "Хет-трик Азиза Исмаилова принес команде уверенную победу. Главный тренер доволен подготовкой к сезону.",
    image: "https://scontent.ffru6-1.fna.fbcdn.net/v/t39.30808-6/488005836_1107666661382318_1528436289875417196_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=T9ofIpCP1yIQ7kNvwFsOKiB&_nc_oc=AdmsMmTYwls7QKmoNj79dvzjJjN2IPLJ7qwQYUdNTx2eVHEitXS_AK1JPjN72E4mgSk&_nc_zt=23&_nc_ht=scontent.ffru6-1.fna&_nc_gid=CW8XNzKYfsxN6FLYsJwYig&oh=00_AfFZF8HLWoG4442lqDu12_P_MKhTE3LFPHamxBP2RMdS0Q&oe=680A8B43",
    featured: true
  },
  {
    id: 2,
    title: "Новый защитник подписал контракт на 2 года",
    date: "12 СЕН 2024",
    category: "Трансферы",
    excerpt: "Бразилец Лукас Силва усилил оборонительную линию. Подробности сделки и первые слова игрока.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    featured: false
  },
  {
    id: 3,
    title: "Реконструкция стадиона завершена",
    date: "8 СЕН 2024",
    category: "Инфраструктура",
    excerpt: "Вместимость арены увеличилась на 1500 мест. Установлены новые LED-экраны и комфортабельные сиденья.",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Молодежка выиграла турнир в Алматы",
    date: "5 СЕН 2024",
    category: "Академия",
    excerpt: "Юные футболисты одержали 5 побед в 5 матчах. Лучшим игроком признан 17-летний полузащитник.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Капитан команды получил вызов в сборную",
    date: "3 СЕН 2024",
    category: "Матчи",
    excerpt: "Официальное заявление тренерского штаба национальной команды. Игрок пропустит два матча чемпионата.",
    image: "https://images.unsplash.com/photo-1543357480-c60d400e7ef6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    featured: false
  }
];

// Категории для фильтра
const categories = ["Все", "Матчи", "Трансферы", "Академия", "Инфраструктура"];

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
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            Новости Дордой FC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-200"
          >
            Будьте в курсе всех событий клуба
          </motion.p>
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