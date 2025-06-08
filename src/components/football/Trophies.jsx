import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaStar, FaFlag } from 'react-icons/fa';

const trophies = [
  {
    category: 'Национальные трофеи',
    icon: <FaFlag className="text-3xl text-yellow-400" />,
    items: [
      {
        title: 'Чемпионат Кыргызстана',
        count: 13,
        years: '2004–2021',
        icon: <FaTrophy className="text-4xl text-yellow-500" />,
        color: 'from-blue-600 to-blue-800'
      },
      {
        title: 'Кубок Кыргызстана',
        count: 10,
        years: '2004–2018',
        icon: <FaMedal className="text-4xl text-yellow-500" />,
        color: 'from-red-600 to-red-800'
      },
      {
        title: 'Суперкубок Кыргызстана',
        count: 6,
        years: '2012–2022',
        icon: <FaStar className="text-4xl text-yellow-500" />,
        color: 'from-green-600 to-green-800'
      },
    ],
  },
  {
    category: 'Международные трофеи',
    icon: <FaStar className="text-3xl text-yellow-400" />,
    items: [
      {
        title: 'Кубок Президента АФК',
        count: 2,
        years: '2006, 2007',
        icon: <FaTrophy className="text-4xl text-yellow-500" />,
        color: 'from-purple-600 to-purple-800'
      },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.17, 0.67, 0.83, 0.67],
    },
  }),
  hover: {
    y: -10,
    scale: 1.05,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const DordoiTrophies = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-yellow-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              Легендарные трофеи
            </span>
          </h1>
          <p className="text-2xl text-yellow-300 font-medium">
            ФК «Дордой» Бишкек
          </p>
        </div>

        {trophies.map((section) => (
          <div key={section.category} className="mb-24">
            <div className="flex items-center justify-center mb-12">
              {section.icon}
              <h2 className="text-4xl font-bold text-yellow-300 ml-4 text-center">
                {section.category}
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {section.items.map((trophy, i) => {
                const Wrapper = isMobile ? 'div' : motion.div;
                return (
                  <Wrapper
                    key={trophy.title}
                    className={`relative bg-gradient-to-br ${trophy.color} rounded-2xl p-8 w-full max-w-sm text-center shadow-xl backdrop-blur-sm border-2 border-yellow-400`}
                    {...(!isMobile && {
                      variants: cardVariants,
                      initial: "hidden",
                      whileInView: "visible",
                      whileHover: "hover",
                      custom: i,
                      viewport: { once: true, amount: 0.3 },
                    })}
                  >
                    <div className="absolute -top-6 -right-6 bg-yellow-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                      {trophy.icon}
                    </div>
                    <div className="text-7xl font-extrabold text-yellow-300 mb-4 drop-shadow-md">
                      {trophy.count}×
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {trophy.title}
                    </div>
                    <p className="text-lg text-yellow-200 italic">
                      {trophy.years}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400 rounded-b-lg"></div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center mt-24">
          <p className="text-xl text-yellow-300 font-medium">
            Всего: {trophies.reduce((sum, section) => sum + section.items.reduce((s, item) => s + item.count, 0), 0)} трофеев
          </p>
        </div>
      </div>
    </section>
  );
};

export default DordoiTrophies;
