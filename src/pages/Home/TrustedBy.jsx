import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import freedomFinanceLogo from '../../assets/partners/placeholder_600x400.svg';
// Импортируйте другие логотипы по аналогии

const TrustedBySection = () => {
  const [hoveredBroker, setHoveredBroker] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true // Анимация только при первом появлении
  });

  const brokers = [
    { id: 1, name: 'Freedom Finance', logo: freedomFinanceLogo, compatible: true },
    { id: 2, name: 'Interactive Brokers', logo: freedomFinanceLogo, compatible: true },
    { id: 3, name: 'TD Ameritrade', logo: freedomFinanceLogo, compatible: false },
    { id: 4, name: 'E*TRADE', logo: freedomFinanceLogo, compatible: true },
    { id: 5, name: 'Charles Schwab', logo: freedomFinanceLogo, compatible: false },
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a254b] to-white relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-orange-500 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          ref={ref}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Нам доверяют
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ведущие брокерские компании выбирают наши решения
          </motion.p>
        </motion.div>
        
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {brokers.map((broker) => (
            <motion.div
              key={broker.id}
              variants={item}
              className="relative"
              onMouseEnter={() => setHoveredBroker(broker.id)}
              onMouseLeave={() => setHoveredBroker(null)}
            >
              <motion.div
                className="w-48 h-32 flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                {hoveredBroker === broker.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 opacity-70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <motion.img 
                  src={broker.logo} 
                  alt={broker.name} 
                  className="max-h-16 max-w-full object-contain relative z-10"
                  loading="lazy"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: hoveredBroker === broker.id ? 1.1 : 1,
                    filter: hoveredBroker === broker.id ? "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))" : "none"
                  }}
                />
              </motion.div>
              {broker.compatible && (
                <motion.span 
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full whitespace-nowrap shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredBroker === broker.id ? 1 : 0.8,
                    y: hoveredBroker === broker.id ? 0 : 5
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  Compatible
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Линии соединения */}
        <motion.div 
          className="hidden md:block absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
        >
          {brokers.filter(b => b.compatible).map((broker, i) => {
            if (i % 2 === 0 && i < brokers.length - 1) {
              return (
                <motion.svg
                  key={`line-${broker.id}`}
                  className="absolute top-1/2 left-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d={`M${10 + i*20},50 Q50,${30 + i*10} ${90 - i*20},50`}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className="text-orange-400"
                  />
                </motion.svg>
              );
            }
            return null;
          })}
        </motion.div>
      </div>

      {/* Фоновый градиент снизу */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-0"></div>
    </section>
  );
};

export default TrustedBySection;
