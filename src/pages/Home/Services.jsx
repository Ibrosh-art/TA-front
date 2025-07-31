import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';


const ServicesSection = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) return <div>Loading...</div>;


  const [activeTab, setActiveTab] = useState('consulting');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const tabs = useMemo(() => [
    { id: 'consulting', label: t('services.tabs.consulting') },
    { id: 'trading', label: t('services.tabs.trading') }
  ], [t]);

  const services = useMemo(() => ({
    consulting: {
      title: t('services.consulting.title'),
      items: Array.from({ length: 4 }, (_, i) => t(`services.consulting.items.${i}`)),
      note: {
        title: t('services.consulting.note.title'),
        content: t('services.consulting.note.content'),
        color: 'yellow'
      }
    },
    trading: {
      title: t('services.trading.title'),
      items: Array.from({ length: 3 }, (_, i) => t(`services.trading.items.${i}`)),
      note: {
        title: t('services.trading.note.title'),
        content: t('services.trading.note.content'),
        color: 'blue'
      }
    }
  }), [t]);

  const colorVariants = {
    yellow: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-400',
      text: 'text-yellow-700',
      title: 'text-yellow-800'
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-400',
      text: 'text-blue-700',
      title: 'text-blue-800'
    }
  };

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-white" id="services">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 300 + 100;
          return (
            <motion.div
              key={`bg-${i}`}
              className="absolute rounded-full bg-blue-400/10"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isVisible ? [0.1, 0.3, 0.1] : 0,
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 5
              }}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(40px)'
              }}
            />
          );
        })}
      </div>

      {/* Основной контейнер */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('services.title.part1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
              {t('services.title.part2')}
            </span>
          </h2>
          <div className="flex justify-center">
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Табы и контент */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Табы */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-1 border border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Контент таба */}
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl transform transition-all duration-500" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative p-8 md:p-12 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Левый блок: список */}
                  <div className="lg:w-2/3">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                      {services[activeTab].title}
                    </h3>
                    <ul className="space-y-5">
                      {services[activeTab].items.map((item, index) => (
                        <motion.li
                          key={`item-${index}`}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.1 }}
                        >
                          <div className="flex-shrink-0 mt-1 mr-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-lg text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Правый блок: заметка */}
                  <div className="lg:w-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`p-6 rounded-xl border-l-4 ${
                        colorVariants[services[activeTab].note.color].border
                      } ${colorVariants[services[activeTab].note.color].bg} h-full`}
                    >
                      <h4 className={`font-bold text-lg mb-3 ${colorVariants[services[activeTab].note.color].title}`}>
                        {services[activeTab].note.title}
                      </h4>
                      <p className={`text-sm ${colorVariants[services[activeTab].note.color].text}`}>
                        {services[activeTab].note.content}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Декоративные круги */}
      <motion.div
        className="absolute left-10 bottom-20 w-32 h-32 rounded-full bg-blue-400/20 blur-3xl"
        animate={isVisible ? { scale: [1, 1.2, 1] } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      <motion.div
        className="absolute right-20 top-1/4 w-40 h-40 rounded-full bg-blue-600/15 blur-3xl"
        animate={isVisible ? { scale: [1, 1.3, 1] } : {}}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 2
        }}
      />
    </section>
  );
};

export default ServicesSection;
