import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const stories = [
  { 
    id: 1, 
    title: 'Основание компании', 
    bg: 'bg-gradient-to-br from-red-600 to-red-800', 
    content: 'В 1992 году на окраине Бишкека началась история Дордоя как небольшой торговой площадки. Сейчас это крупнейший торговый комплекс в Центральной Азии.',
    duration: 8000,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 2, 
    title: 'Расширение', 
    bg: 'bg-gradient-to-br from-green-600 to-green-800', 
    content: 'К 2005 году Дордой превратился в огромный торговый центр с тысячами предпринимателей. Ежедневно его посещают десятки тысяч людей.',
    duration: 8000,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 3, 
    title: 'Образование', 
    bg: 'bg-gradient-to-br from-blue-600 to-blue-800', 
    content: 'В 2012 году открылся Университет Дордой - современное образовательное учреждение, готовящее специалистов международного уровня.',
    duration: 8000,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 4, 
    title: 'Спорт', 
    bg: 'bg-gradient-to-br from-purple-600 to-purple-800', 
    content: 'Футбольный клуб "Дордой" - многократный чемпион страны, представляющий Кыргызстан на международной арене.',
    duration: 8000,
    image: 'https://images.unsplash.com/photo-1543357486-c2505d99b4d9?q=80&w=2070&auto=format&fit=crop'
  },
];

const EpicStories = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const controls = useAnimation();
  const progressControls = useAnimation();
  const storiesRef = useRef(null);

  // Автоматический переход по истечении времени
  useEffect(() => {
    let timer;
    if (activeIndex !== null) {
      progressControls.start({
        width: '100%',
        transition: { duration: stories[activeIndex].duration / 1000, ease: 'linear' }
      });
      
      timer = setTimeout(() => {
        if (activeIndex < stories.length - 1) {
          setActiveIndex(activeIndex + 1);
        } else {
          closeModal();
        }
      }, stories[activeIndex].duration);
    }
    return () => {
      clearTimeout(timer);
      progressControls.stop();
    };
  }, [activeIndex, progressControls]);

  const openStory = async (index) => {
    await controls.start('hidden');
    setActiveIndex(index);
    await controls.start('visible');
    progressControls.set({ width: '0%' });
  };

  const nextStory = async (e) => {
    e.stopPropagation();
    if (activeIndex < stories.length - 1) {
      await controls.start('exit');
      setActiveIndex(activeIndex + 1);
      await controls.start('enter');
      progressControls.set({ width: '0%' });
    }
  };

  const prevStory = async (e) => {
    e.stopPropagation();
    if (activeIndex > 0) {
      await controls.start('exit');
      setActiveIndex(activeIndex - 1);
      await controls.start('enter');
      progressControls.set({ width: '0%' });
    }
  };

  const closeModal = async () => {
    await controls.start('exit');
    setActiveIndex(null);
  };

  // Параллакс эффект для превью сторис
  const handleMouseMove = (e) => {
    if (!storiesRef.current) return;
    const cards = storiesRef.current.children;
    
    Array.from(cards).forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Заголовок */}
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        История успеха Дордой
      </motion.h1>

      {/* Горизонтальная лента сторис */}
      <div 
        className="overflow-x-auto pb-8 cursor-none"
        onMouseMove={handleMouseMove}
        ref={storiesRef}
      >
        <div className="flex space-x-6 px-4">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              onClick={() => openStory(index)}
              className={`flex-none w-64 h-96 ${story.bg} rounded-2xl shadow-2xl cursor-pointer relative overflow-hidden group`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Эффект подсветки */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div 
                  className="absolute w-64 h-64 bg-white rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: 'var(--mouse-x, 50%)',
                    top: 'var(--mouse-y, 50%)',
                  }}
                />
              </div>
              
              {/* Изображение */}
              <div className="absolute inset-0 bg-black opacity-40" />
              <img 
                src={story.image} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" 
              />
              
              <div className="relative z-10 flex flex-col justify-end h-full p-6">
                <motion.h3 
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ x: -20 }}
                  whileInView={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {story.title}
                </motion.h3>
                <motion.p 
                  className="text-white/80 line-clamp-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {story.content}
                </motion.p>
              </div>
              
              {/* Индикатор просмотра */}
              <div className="absolute top-4 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Модальное окно с активной историей */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Прогресс-бар */}
              <div className="relative h-1.5 bg-gray-800">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-yellow-500"
                  initial={{ width: '0%' }}
                  animate={progressControls}
                />
              </div>

              {/* Контент */}
              <motion.div
                key={activeIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative"
              >
                {/* Фон */}
                <div className={`absolute inset-0 ${stories[activeIndex].bg} opacity-80`} />
                <img 
                  src={stories[activeIndex].image} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                
                {/* Текст */}
                <div className="relative z-10 min-h-[70vh] flex flex-col justify-end p-8 md:p-12">
                  <motion.h2 
                    className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {stories[activeIndex].title}
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {stories[activeIndex].content}
                  </motion.p>
                </div>
              </motion.div>

              {/* Навигация */}
              <button
                onClick={prevStory}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 focus:outline-none backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextStory}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 focus:outline-none backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Закрыть */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 focus:outline-none backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Номер истории */}
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {activeIndex + 1} / {stories.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EpicStories;