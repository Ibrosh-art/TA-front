import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EpicDordoyTimeline = () => {
  const [activeEra, setActiveEra] = useState(null);
  const timelineRef = useRef(null);

  const eras = [
    {
      year: "1995-2001",
      title: "Рождение",
      description: "Скромные начинания, заложившие фундамент будущей торговой империи",
      image: "https://cdn-1.aki.kg/st_runews/.storage/runews3/images/Aida/81a8102b7655ee198e4d0d21463d690b.JPG",
      color: "from-blue-500 to-blue-700",
      achievements: [
        "Первые 50 торговых мест",
        "Создание торговой площадки",
        "Формирование команды"
      ]
    },
    {
      year: "2001-2008",
      title: "Эра Экспансии",
      description: "Строительство новых корпусов и расширение ассортимента",
      image: "https://i.banks.kg/2857/dordoi.png",
      color: "from-yellow-400 to-yellow-600",
      achievements: [
        "5 новых торговых корпусов",
        "1000+ торговых точек",
        "Международные бренды"
      ]
    },
    {
      year: "2008-2015",
      title: "Технологический Рывок",
      description: "Модернизация и цифровизация всех процессов",
      image: "https://dordoisecurity.kg/images/dp.jpg",
      color: "from-green-500 to-green-700",
      achievements: [
        "Система электронных платежей",
        "Мобильное приложение",
        "Цифровая навигация"
      ]
    },
    {
      year: "2015-н.в.",
      title: "Эпоха Господства",
      description: "Крупнейший торговый центр Центральной Азии",
      image: "https://static.wixstatic.com/media/d8047e_e6f28e1dadf04f64bc13f5d924601a04~mv2.jpeg/v1/fill/w_824,h_618,al_c,q_85,enc_avif,quality_auto/d8047e_e6f28e1dadf04f64bc13f5d924601a04~mv2.jpeg",
      color: "from-purple-500 to-purple-700",
      achievements: [
        "2000+ торговых точек",
        "5 млн посетителей ежегодно",
        "Полная экосистема услуг"
      ]
    }
  ];

  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
      {/* Анимированный фон */}

      {/* Основной контент */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-500">
              ИСТОРИЯ ДОРДОЙ
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            От маленького рынка до крупнейшего торгового центра региона — наша эпическая история
          </p>
        </motion.div>

        {/* Временная шкала */}
        <div ref={timelineRef} className="relative">
          {/* Линия времени */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-yellow-500 to-purple-500 transform -translate-x-1/2"></div>
          
          {/* Элементы временной шкалы */}
          {eras.map((era, index) => (
            <motion.div
              key={era.year}
              className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center justify-center mb-32`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={`w-full md:w-1/2 p-6 ${index % 2 === 0 ? 'pr-0 md:pr-12' : 'pl-0 md:pl-12'}`}>
                <motion.div 
                  className={`bg-gradient-to-br ${era.color} p-8 rounded-3xl shadow-2xl h-full flex flex-col justify-center relative overflow-hidden group cursor-pointer`}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
                  onClick={() => setActiveEra(era)}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>
                  <div className="relative z-10">
                    <span className="text-lg font-semibold text-white/80">{era.year}</span>
                    <h2 className="text-3xl font-bold text-white mt-2 mb-4">{era.title}</h2>
                    <p className="text-gray-200">{era.description}</p>
                    <button className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition">
                      Подробнее →
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="hidden md:block w-1/2 p-6">
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white/10"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={era.image} 
                    alt={era.title} 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Модальное окно эпохи */}
      <AnimatePresence>
        {activeEra && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${activeEra.color} border border-white/20`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="relative h-96">
                <img 
                  src={activeEra.image} 
                  alt={activeEra.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-4xl font-bold text-white">{activeEra.year}</h2>
                  <h3 className="text-2xl text-white mt-2">{activeEra.title}</h3>
                </div>
                <button 
                  className="absolute top-4 right-4 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl hover:bg-black/80 transition"
                  onClick={() => setActiveEra(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="bg-white p-8">
                <p className="text-xl mb-8">{activeEra.description}</p>
                
                <h4 className="text-2xl font-bold mb-6 text-gray-800">Основные достижения:</h4>
                <ul className="space-y-4 mb-8">
                  {activeEra.achievements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white mr-4 ${activeEra.color.includes('blue') ? 'bg-blue-500' : activeEra.color.includes('yellow') ? 'bg-yellow-500' : activeEra.color.includes('green') ? 'bg-green-500' : 'bg-purple-500'}`}>
                        {index + 1}
                      </div>
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-4">
                  <button className={`px-6 py-3 ${activeEra.color.includes('blue') ? 'bg-blue-600' : activeEra.color.includes('yellow') ? 'bg-yellow-600' : activeEra.color.includes('green') ? 'bg-green-600' : 'bg-purple-600'} text-white rounded-full font-medium hover:opacity-90 transition`}>
                    Смотреть архивные фото
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition">
                    Поделиться
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EpicDordoyTimeline;