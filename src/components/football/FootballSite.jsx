import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

const newsData = [
  {
    id: 1,
    title: "🔥 Dordoi снова чемпион Кыргызской Премьер-Лиги!",
    date: "10 мая 2025",
    summary: "Наша команда одержала победу в захватывающем финальном матче и вновь поднялась на вершину.",
    content: "Dordoi продемонстрировал невероятную волю к победе, выиграв чемпионат в драматичном стиле. Это уже девятая победа клуба в истории лиги, подтверждающая статус лидера кыргызского футбола.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 2,
    title: "🌟 Юношеская академия блистает на региональном турнире",
    date: "28 апреля 2025",
    summary: "Молодые таланты Dordoi завоевали несколько наград, демонстрируя высокий потенциал.",
    content: "Академия Dordoi продолжает воспитывать будущих звезд футбола, показав отличные результаты на последнем региональном турнире. Тренеры отмечают высокий уровень дисциплины и техники игроков.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 3,
    title: "🤝 Новый международный партнёр - шаг к глобальному успеху",
    date: "15 апреля 2025",
    summary: "Подписано соглашение о сотрудничестве с ведущим клубом Азии для обмена опытом и талантами.",
    content: "Это стратегическое партнерство позволит Dordoi расширить горизонты, проводить совместные тренировки и обмениваться игроками, что усилит позиции клуба на международной арене.",
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 4,
    title: "⚡ Звезда команды возвращается после травмы",
    date: "1 апреля 2025",
    summary: "Ключевой нападающий готов к новому сезону и вдохновляет команду на победы.",
    content: "После длительного восстановления наш главный форвард вернулся в строй и уже готов показать свой уровень в предстоящих матчах, что вселяет уверенность в болельщиков.",
    image: "https://images.unsplash.com/photo-1543357480-c60d400e7ef6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
  },
];

// Компонент для параллакс эффекта
const ParallaxImage = ({ src, alt = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-1, 1], [5, -5]);
  const rotateY = useTransform(x, [-1, 1], [-5, 5]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

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
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        animate(x, 0, { duration: 0.5 });
        animate(y, 0, { duration: 0.5 });
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          rotateX,
          rotateY,
          scale: 1.05,
        }}
        className="w-full h-full object-cover absolute inset-0"
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />
    </motion.div>
  );
};

// Компонент для кинетического текста с градиентом
const KineticText = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-1, 1], [3, -3]);
  const rotateY = useTransform(x, [-1, 1], [-3, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      animate(x, [0, 0.1, -0.1, 0.05, -0.05, 0], {
        duration: 8,
        ease: "easeInOut",
      });
      animate(y, [0, 0.05, -0.05, 0.02, -0.02, 0], {
        duration: 8,
        ease: "easeInOut",
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [x, y]);

  return (
    <motion.span
      style={{
        rotateX,
        rotateY,
        x,
        y,
        backgroundImage: "linear-gradient(45deg, #f59e0b, #fbbf24, #fcd34d, #fef3c7)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
      className="inline-block"
      transition={{ type: "spring", stiffness: 50, damping: 10 }}
    >
      {children}
    </motion.span>
  );
};

// Компонент для частиц
const Particles = ({ count = 30 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: [0, 0.7, 0],
            scale: [0, Math.random() * 0.5 + 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            borderRadius: "50%",
            backgroundColor: "#fbbf24",
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
};

// Анимации слайдера
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
    filter: "blur(5px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
    filter: "blur(5px)",
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
  }),
};

// Анимации модального окна
const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, backdropFilter: "blur(8px)" },
};

const modalVariants = {
  hidden: { y: "100vh", opacity: 0, scale: 0.8 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 20,
      mass: 0.5
    } 
  },
  exit: { y: "100vh", opacity: 0, scale: 0.8 },
};

export default function DordoiEpicNews() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [modalNews, setModalNews] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const index = ((page % newsData.length) + newsData.length) % newsData.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  // Автопрокрутка
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white p-4 md:p-8 lg:p-12 font-sans relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-10"></div>
        <Particles count={50} />
      </div>

      {/* Главный контейнер */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 h-full">
        {/* Левая часть: слайдер */}
        <div 
          className="lg:w-2/3 h-[60vh] lg:h-[80vh] bg-white/5 rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl border-l-8 border-yellow-400 relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Индикатор прогресса */}
          <motion.div 
            className="absolute top-0 left-0 h-1 bg-yellow-400 z-20"
            initial={{ width: 0 }}
            animate={{ width: isHovering || !autoPlay ? 0 : '100%' }}
            transition={{ duration: 5, ease: "linear" }}
            key={page}
          />

          {/* Фоновое изображение */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <ParallaxImage src={newsData[index].image} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-900/10"></div>
          </div>

          {/* Содержимое слайда */}
          <AnimatePresence initial={false} custom={direction}>
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
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12 cursor-pointer select-none"
              onClick={() => setModalNews(newsData[index])}
              title="Нажмите для подробностей"
            >
              <div className="relative z-10">
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 md:mb-6 text-white drop-shadow-2xl tracking-tight leading-tight"
                  whileHover={{ x: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <KineticText>{newsData[index].title}</KineticText>
                </motion.h2>
                
                <motion.time 
                  className="text-yellow-300 text-lg md:text-xl block mb-4 md:mb-6 tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {newsData[index].date}
                </motion.time>
                
                <motion.p 
                  className="text-lg md:text-xl leading-relaxed text-white/90 max-w-3xl drop-shadow-md mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {newsData[index].summary}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#f59e0b" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalNews(newsData[index]);
                    }}
                  >
                    Читать полностью
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
          </AnimatePresence>

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
          {/* Навигация */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
            {newsData.map((_, i) => (
              <motion.div
                key={i}
                className={`h-3 w-3 rounded-full cursor-pointer ${index === i ? 'bg-yellow-400' : 'bg-white/30'}`}
                onClick={() => {
                  const direction = i > index ? 1 : -1;
                  setPage([i, direction]);
                  setAutoPlay(false);
                  setTimeout(() => setAutoPlay(true), 10000);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === i ? [1, 1.2, 1] : 1,
                  backgroundColor: index === i ? "#f59e0b" : "rgba(255, 255, 255, 0.3)"
                }}
                transition={{ duration: 0.5, repeat: index === i ? Infinity : 0, repeatDelay: 2 }}
              />
            ))}
          </div>

          {/* Кнопки навигации */}
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full z-20"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Предыдущая новость"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full z-20"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Следующая новость"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Правая часть: список новостей */}
        <div className="lg:w-1/3 bg-white/5 rounded-3xl p-6 shadow-2xl border-l-8 border-yellow-400 overflow-hidden h-[60vh] lg:h-[80vh] flex flex-col">
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 tracking-wide drop-shadow-lg select-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Последние новости
          </motion.h3>
          
          <ul className="space-y-4 overflow-y-auto pr-2">
            {newsData.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="cursor-pointer p-4 rounded-xl hover:bg-yellow-400/20 transition-all duration-300 select-none border-b border-white/10 last:border-0"
                onClick={() => setModalNews(item)}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <motion.img 
                      src={item.image} 
                      alt="" 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg line-clamp-2">{item.title}</h4>
                    <time className="text-yellow-300 text-sm">{item.date}</time>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Модальное окно с подробностями новости */}
      <AnimatePresence>
        {modalNews && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setModalNews(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-6 md:p-8 lg:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border-2 border-yellow-400/30"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setModalNews(null)}
                className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 text-3xl font-bold focus:outline-none z-10 bg-blue-900/50 rounded-full w-10 h-10 flex items-center justify-center"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Закрыть окно"
              >
                &times;
              </motion.button>
              
              <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-6 md:mb-8">
                <ParallaxImage src={modalNews.image} alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent"></div>
              </div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {modalNews.title}
              </motion.h2>
              
              <motion.time 
                className="text-yellow-300 block mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {modalNews.date}
              </motion.time>
              
              <motion.p 
                className="text-lg leading-relaxed text-white mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {modalNews.content}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f59e0b" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setModalNews(null)}
                >
                  Закрыть
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}