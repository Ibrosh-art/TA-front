import React from "react";
import { motion } from "framer-motion";

const FootballNewsSection = () => {
  // Пример данных новостей с картинками
  const news = [
    {
      id: 1,
      title: "Дордой ФК разгромил соперника в дерби со счетом 3:1!",
      date: "12 мая 2024",
      excerpt: "Зрелищный матч, где наша команда показала мастерство во втором тайме.",
      category: "Матчи",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Сенсационный трансфер: Дордой подписал бразильского вингера!",
      date: "10 мая 2024",
      excerpt: "Новый игрок уже назван фанатами «новой звездой лиги».",
      category: "Трансферы",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Главный тренер: «Мы готовы к чемпионской гонке!»",
      date: "8 мая 2024",
      excerpt: "Эксклюзивное интервью о тактике и планах на сезон.",
      category: "Интервью",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Список матчей
  const upcomingMatches = [
    { id: 1, opponent: "Алга БИШ", date: "15 мая 2024", time: "18:00", place: "Стадион Дордой" },
    { id: 2, opponent: "Абдыш-Ата", date: "20 мая 2024", time: "17:30", place: "Стадион им. Кожомкула" },
    { id: 3, opponent: "Нефтчи Кочкор-Ата", date: "25 мая 2024", time: "19:00", place: "Стадион Дордой" },
  ];

  // Анимации
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Заголовок с градиентом и эффектом */}
      <motion.h1 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-4xl md:text-5xl font-extrabold mb-10 text-center"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-800">
          Футбольные Новости
        </span>
        <span className="block text-2xl text-yellow-400 mt-2">Дордой ФК</span>
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Левая часть - Крупные карточки новостей */}
        <div className="lg:w-2/3 space-y-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-blue-900/30 transition-all duration-300"
            >
              {/* Затемненное изображение на фоне */}
              <div className="absolute inset-0 bg-black/30 z-0" />
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-80 object-cover"
              />

              {/* Контент поверх картинки */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-yellow-500 text-blue-900 font-bold px-3 py-1 rounded-full text-xs">
                    {item.category}
                  </span>
                  <span className="text-gray-300 text-sm">{item.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
                <p className="text-gray-200 mb-4">{item.excerpt}</p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
                  Читать далее →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Правая часть - Сайдбар */}
        <div className="lg:w-1/3">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-b from-blue-900 to-blue-800 rounded-2xl p-6 shadow-xl sticky top-4 border-l-4 border-yellow-500"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
              Ближайшие матчи
            </h2>

            <ul className="space-y-4">
              {upcomingMatches.map((match) => (
                <motion.li 
                  key={match.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-800/50 backdrop-blur-sm p-4 rounded-xl hover:bg-blue-700/70 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500/20 p-2 rounded-lg">
                      <span className="text-yellow-500 text-lg">⚽</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{match.opponent}</h3>
                      <div className="flex justify-between text-sm text-gray-300 mt-1">
                        <span>📅 {match.date}</span>
                        <span>⏰ {match.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Турнирная таблица */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                Топ-3 лиги
              </h3>
              <div className="space-y-3">
                {[
                  { team: "Дордой ФК", points: 25 },
                  { team: "Алга БИШ", points: 22 },
                  { team: "Абдыш-Ата", points: 20 }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-blue-800/30 p-3 rounded-lg">
                    <div className="flex items-center">
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 
                        ${index === 0 ? "bg-yellow-500 text-blue-900" : "bg-blue-700 text-white"}`}>
                        {index + 1}
                      </span>
                      <span className="font-medium text-white">{item.team}</span>
                    </div>
                    <span className="bg-blue-900/50 px-2 py-1 rounded text-sm">{item.points} очков</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-[1.02]">
                Полная таблица
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FootballNewsSection;