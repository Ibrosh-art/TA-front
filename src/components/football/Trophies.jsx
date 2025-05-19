import React from 'react';
import { motion } from 'framer-motion';

const trophies = [
  {
    category: 'Национальные трофеи',
    items: [
      {
        title: 'Чемпионат Кыргызстана',
        count: 13,
        years: '2004–2021',
      },
      {
        title: 'Кубок Кыргызстана',
        count: 10,
        years: '2004–2018',
      },
      {
        title: 'Суперкубок Кыргызстана',
        count: 6,
        years: '2012–2022',
      },
    ],
  },
  {
    category: 'Международные трофеи',
    items: [
      {
        title: 'Кубок Президента АФК',
        count: 2,
        years: '2006, 2007',
      },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const DordoiTrophies = () => {
  return (
<section className="py-20 px-6 bg-gradient-to-b from-blue-800 via-blue-900 to-yellow-500">
<motion.h1
        className="text-5xl font-extrabold text-center text-white mb-16 drop-shadow-lg"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Трофеи ФК «Дордой» Бишкек
      </motion.h1>

      {trophies.map((section) => (
        <div key={section.category} className="mb-16">
          <motion.h2
            className="text-3xl font-bold text-yellow-300 mb-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {section.category}
          </motion.h2>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {section.items.map((trophy, i) => (
              <motion.div
                key={trophy.title}
                className="relative bg-white border-4 border-yellow-400 rounded-2xl p-8 w-full max-w-md text-center shadow-2xl hover:scale-105 transform transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-6xl font-extrabold text-yellow-500 mb-3 drop-shadow-md">{trophy.count}×</div>
                <div className="text-2xl font-semibold text-gray-800">{trophy.title}</div>
                <p className="text-sm text-gray-500 mt-3 italic">{trophy.years}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default DordoiTrophies;