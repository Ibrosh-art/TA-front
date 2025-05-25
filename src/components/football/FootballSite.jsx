import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

// Цветовая схема
const colors = {
  primary: "#1E3A8A", // Темно-синий
  secondary: "#FBBF24", // Желтый
  accent: "#3B82F6", // Ярко-синий
  light: "#FEF3C7", // Светло-желтый
  dark: "#1F2937" // Темно-серый
};

// Данные новостей
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

// Компонент изображения с параллакс-эффектом
const ParallaxImage = React.memo(({ src, alt = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-1, 1], [5, -5]);
  const rotateY = useTransform(x, [-1, 1], [-5, 5]);

  const handleMouse = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const resetPosition = useCallback(() => {
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  }, [x, y]);

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetPosition}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ rotateX, rotateY, scale: 1.05 }}
        className="w-full h-full object-cover absolute inset-0"
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />
    </motion.div>
  );
});

// Компонент анимированного текста
const KineticText = React.memo(({ children, color = colors.primary }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-1, 1], [3, -3]);
  const rotateY = useTransform(x, [-1, 1], [-3, 3]);

  useEffect(() => {
    const animateText = () => {
      animate(x, [0, 0.1, -0.1, 0.05, -0.05, 0], {
        duration: 8,
        ease: "easeInOut",
      });
      animate(y, [0, 0.05, -0.05, 0.02, -0.02, 0], {
        duration: 8,
        ease: "easeInOut",
      });
    };

    const interval = setInterval(animateText, 8000);
    animateText();

    return () => clearInterval(interval);
  }, [x, y]);

  return (
    <motion.span
      style={{ rotateX, rotateY, x, y, color }}
      className="inline-block"
      transition={{ type: "spring", stiffness: 50, damping: 10 }}
    >
      {children}
    </motion.span>
  );
});

// Анимации
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

const NewsSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [modalNews, setModalNews] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const index = ((page % newsData.length) + newsData.length) % newsData.length;

  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]);
    setAutoPlay(false);
    const timer = setTimeout(() => setAutoPlay(true), 10000);
    return () => clearTimeout(timer);
  }, [page]);

  // Автопрокрутка
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, paginate]);

  // Обработчики клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'Escape' && modalNews) {
        setModalNews(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate, modalNews]);

  // Закрытие модального окна при клике вне его
  useEffect(() => {
    if (!modalNews) return;

    const handleClickOutside = (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        setModalNews(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [modalNews]);

  const goToSlide = useCallback((slideIndex) => {
    const newDirection = slideIndex > index ? 1 : -1;
    setPage([slideIndex, newDirection]);
    setAutoPlay(false);
    const timer = setTimeout(() => setAutoPlay(true), 10000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[${colors.light}] to-white text-gray-800 p-4 md:p-8 lg:p-12 font-sans relative overflow-hidden`}>
      {/* Главный контейнер */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 h-full">
        {/* Левая часть: слайдер */}
        <div 
          className={`lg:w-2/3 h-[60vh] lg:h-[80vh] bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-lg border border-[${colors.primary}]/20 relative overflow-hidden`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Индикатор прогресса */}
          <motion.div 
            className="absolute top-0 left-0 h-1 z-20"
            style={{ backgroundColor: colors.secondary }}
            initial={{ width: 0 }}
            animate={{ width: isHovering || !autoPlay ? 0 : '100%' }}
            transition={{ duration: 5, ease: "linear" }}
            key={page}
          />

          {/* Фоновое изображение */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <ParallaxImage src={newsData[index].image} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-gray-800/10 to-transparent"></div>
          </div>

          {/* Содержимое слайда */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
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
              <div className={`relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-3xl border-t-4 border-[${colors.secondary}]`}>
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-gray-900 tracking-tight leading-tight"
                  whileHover={{ x: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <KineticText color={colors.primary}>{newsData[index].title}</KineticText>
                </motion.h2>
                
                <motion.time 
                  className={`text-[${colors.primary}] text-lg md:text-xl block mb-4 md:mb-6 tracking-wide font-medium`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {newsData[index].date}
                </motion.time>
                
                <motion.p 
                  className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mb-6 md:mb-8"
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
                    whileHover={{ scale: 1.05, backgroundColor: colors.primary }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-[${colors.accent}] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all`}
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
          </AnimatePresence>

          {/* Навигационные точки */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
            {newsData.map((_, i) => (
              <motion.div
                key={i}
                className={`h-3 w-3 rounded-full cursor-pointer ${index === i ? 'bg-[${colors.secondary}]' : 'bg-gray-300'}`}
                onClick={() => goToSlide(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === i ? [1, 1.2, 1] : 1,
                  backgroundColor: index === i ? colors.secondary : "#d1d5db"
                }}
                transition={{ duration: 0.5, repeat: index === i ? Infinity : 0, repeatDelay: 2 }}
              />
            ))}
          </div>

          {/* Кнопки навигации */}
          <motion.button
            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-[${colors.primary}] p-3 rounded-full z-20 shadow-md`}
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Предыдущая новость"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-[${colors.primary}] p-3 rounded-full z-20 shadow-md`}
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Следующая новость"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Правая часть: список новостей */}
        <div className={`lg:w-1/3 bg-white rounded-3xl p-6 shadow-lg border border-[${colors.primary}]/20 overflow-hidden h-[60vh] lg:h-[80vh] flex flex-col`}>
          <motion.h3 
            className={`text-2xl md:text-3xl font-bold mb-6 text-[${colors.primary}] tracking-wide select-none`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Последние новости
          </motion.h3>
          
          <ul className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {newsData.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className={`cursor-pointer p-4 rounded-xl transition-all duration-300 select-none border-b border-gray-100 last:border-0 ${
                  item.id === newsData[index].id ? `bg-[${colors.light}] ring-2 ring-[${colors.secondary}]` : 'hover:bg-[${colors.light}]'
                }`}
                onClick={() => {
                  setModalNews(item);
                  goToSlide(i);
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-4">
                  <div className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-[${colors.primary}]/20`}>
                    <motion.img 
                      src={item.image} 
                      alt="" 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg line-clamp-2 text-[${colors.primary}]`}>{item.title}</h4>
                    <time className={`text-[${colors.accent}] text-sm font-medium`}>{item.date}</time>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.summary}</p>
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
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className={`bg-white rounded-3xl p-6 md:p-8 lg:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-[${colors.secondary}]`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setModalNews(null)}
                className={`absolute top-4 right-4 text-[${colors.primary}] hover:text-[${colors.accent}] text-3xl font-bold focus:outline-none z-10 bg-[${colors.light}] rounded-full w-10 h-10 flex items-center justify-center`}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Закрыть окно"
              >
                &times;
              </motion.button>
              
              <div className={`relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-6 md:mb-8 border border-[${colors.primary}]/20`}>
                <ParallaxImage src={modalNews.image} alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-gray-800/10 to-transparent"></div>
              </div>
              
              <motion.h2 
                className={`text-3xl md:text-4xl font-extrabold mb-4 text-[${colors.primary}]`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <KineticText color={colors.primary}>{modalNews.title}</KineticText>
              </motion.h2>
              
              <motion.time 
                className={`text-[${colors.accent}] block mb-6 font-medium`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {modalNews.date}
              </motion.time>
              
              <motion.p 
                className="text-lg leading-relaxed text-gray-700 mb-6"
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
                  whileHover={{ scale: 1.05, backgroundColor: colors.primary }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-[${colors.accent}] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all`}
                  onClick={() => setModalNews(null)}
                >
                  Закрыть
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Глобальные стили */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.secondary};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${colors.primary};
        }
        
        body {
          background: linear-gradient(to bottom right, ${colors.light}, white);
        }
      `}</style>
    </div>
  );
};

export default NewsSlider;