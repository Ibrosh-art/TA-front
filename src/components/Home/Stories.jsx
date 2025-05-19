import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const EpicStoryPage = () => {
  const [activeYear, setActiveYear] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Параллакс эффекты без react-scroll-parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.5, 0]);

  // Данные для временной шкалы
  const timelineData = [
    {
      year: "1995",
      title: "Основание компании",
      description: "Дордой начинает свою историю как небольшая торговая компания в Бишкеке.",
      image: "https://cdn-1.aki.kg/st_runews/.storage/runews3/images/Aida/81a8102b7655ee198e4d0d21463d690b.JPG",
      achievements: ["Первые торговые операции", "10 сотрудников в штате"],
      bgColor: "bg-gradient-to-br from-blue-900 to-blue-800"
    },
    {
      year: "2000",
      title: "Первый крупный проект",
      description: "Завершение строительства первого торгового комплекса площадью 5000 м².",
      image: "https://www.utrk.kg/img/thumbnail/892881739968112_big.png",
      achievements: ["Площадь 5000 м²", "50 новых рабочих мест"],
      bgColor: "bg-gradient-to-br from-yellow-600 to-yellow-500"
    },
    {
      year: "2006",
      title: "Экспансия на международные рынки",
      description: "Открытие представительств в 3 странах Центральной Азии.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/7c/45/99/caption.jpg?w=1200&h=1200&s=1",
      achievements: ["5 филиалов", "200+ сотрудников"],
      bgColor: "bg-gradient-to-br from-blue-800 to-blue-700"
    },
    {
      year: "2018",
      title: "Современный торговый центр",
      description: "Запуск флагманского торгового центра с инновационными технологиями.",
      image: "https://cdn-1.aki.kg/st_runews/.storage/runews/images/dordoiplaza/28b0489b63e169ddbc77e560986e6e70.jpg",
      achievements: ["Площадь 25000 м²", "300 магазинов", "Кинотеатр и фудкорт"],
      bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-400"
    },
    {
      year: "2023",
      title: "Лидер рынка",
      description: "Дордой признан лидером в сфере торговой недвижимости в регионе.",
      image: "https://avatars.mds.yandex.net/get-altay/6319069/2a0000017f976787c1c7068474d2aeb58660/orig",
      achievements: ["1 место в рейтинге", "5000+ сотрудников", "5 млн посетителей ежегодно"],
      bgColor: "bg-gradient-to-br from-blue-700 to-blue-600"
    }
  ];

  // Анимация счетчиков
  useEffect(() => {
    const animateCounters = () => {
      const counters = [
        { id: 'years-counter', target: 28 },
        { id: 'employees-counter', target: 5000 },
        { id: 'area-counter', target: 25000 },
        { id: 'visitors-counter', target: 5000000 }
      ];

      counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
          const duration = 2000;
          const start = 0;
          const increment = counter.target / (duration / 16);
          let current = start;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
              clearInterval(timer);
              current = counter.target;
            }
            element.textContent = Math.floor(current).toLocaleString();
          }, 16);
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Автоматическое перелистывание таймлайна
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveYear(prev => (prev + 1) % timelineData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans overflow-hidden" ref={containerRef}>
      {/* Эпичный герой-баннер */}


      {/* Основной контент */}
      <div className="container mx-auto px-4 py-16 relative">
        {/* Анимированный фон */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
          style={{ y: y2 }}
        >
          <div className="pattern-dots pattern-blue-500 pattern-bg-white pattern-size-6 pattern-opacity-20 w-full h-full"></div>
        </motion.div>

        {/* Интерактивная временная шкала */}
        <div className="my-24 relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-900"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Наш <span className="text-yellow-500">путь</span>
          </motion.h2>
          
          <div className="relative flex flex-wrap justify-between items-center mb-20">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0 hidden md:block"></div>
            
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer transition-all duration-500 ${
                  activeYear === index 
                    ? 'bg-blue-600 text-white scale-125 shadow-xl shadow-blue-500/40 ring-4 ring-yellow-400' 
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-100 hover:scale-110'
                }`}
                onClick={() => setActiveYear(index)}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
              >
                {item.year}
                {activeYear === index && (
                  <motion.div 
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Контент для выбранного года */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, x: -100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 100, rotateY: -90 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className={`flex flex-col lg:flex-row gap-8 rounded-2xl overflow-hidden shadow-2xl ${timelineData[activeYear].bgColor} text-white`}
            >
              <div className="lg:w-1/2 p-10">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-6"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {timelineData[activeYear].title}
                </motion.h2>
                
                <motion.p 
                  className="text-lg md:text-xl mb-8 leading-relaxed"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {timelineData[activeYear].description}
                </motion.p>
                
                <ul className="space-y-4">
                  {timelineData[activeYear].achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <span className="flex-shrink-0 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-sm mr-3 mt-1 text-blue-900 font-bold">✓</span>
                      <span className="text-lg">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:w-1/2 relative">
                <motion.img
                  src={timelineData[activeYear].image}
                  alt={timelineData[activeYear].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                />
                <motion.div 
                  className="absolute inset-0 border-8 border-white opacity-30 pointer-events-none"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Статистика */}
        <motion.div 
          className="stats-section my-32 py-20 px-6 rounded-3xl bg-gradient-to-r from-blue-900 to-blue-700 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="pattern-grid pattern-blue-400 pattern-bg-transparent pattern-size-20 pattern-opacity-100 w-full h-full"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
              Дордой <span className="text-yellow-400">в цифрах</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: 'years-counter', value: '0', label: 'Лет на рынке', icon: '🕰️' },
                { id: 'employees-counter', value: '0', label: 'Сотрудников', icon: '👥' },
                { id: 'area-counter', value: '0', label: 'м² торговых площадей', icon: '🏢' },
                { id: 'visitors-counter', value: '0', label: 'Посетителей ежегодно', icon: '👣' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div id={stat.id} className="text-5xl font-bold mb-2 text-yellow-300">{stat.value}</div>
                  <div className="text-xl">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

       
      </div>
    </div>
  );
};

export default EpicStoryPage;