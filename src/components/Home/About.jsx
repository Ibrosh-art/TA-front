import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShieldCheckIcon,
  UsersIcon,
  LightBulbIcon,
  HeartIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon,
  TrophyIcon
} from '@heroicons/react/24/solid';
import { useInView } from 'react-intersection-observer';

const DordoiPage = () => {
  const ref = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const [historyRef, historyInView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [missionRef, missionInView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  const coreValues = [
    {
      icon: <ShieldCheckIcon className="h-12 w-12 text-emerald-400" />,
      title: 'Качество',
      description: 'Высокие стандарты во всем, что мы делаем',
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      icon: <UsersIcon className="h-12 w-12 text-blue-400" />,
      title: 'Единство',
      description: 'Сила в сплоченности и взаимной поддержке',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <LightBulbIcon className="h-12 w-12 text-amber-400" />,
      title: 'Инновации',
      description: 'Постоянное развитие и внедрение новых технологий',
      color: 'from-amber-500 to-amber-700'
    },
    {
      icon: <HeartIcon className="h-12 w-12 text-rose-400" />,
      title: 'Ответственность',
      description: 'Перед обществом, клиентами и партнерами',
      color: 'from-rose-500 to-rose-700'
    }
  ];

  const achievements = [
    { icon: <BuildingStorefrontIcon className="h-8 w-8" />, value: '30+', label: 'Торговых центров' },
    { icon: <AcademicCapIcon className="h-8 w-8" />, value: '5+', label: 'Образовательных учреждений' },
    { icon: <TrophyIcon className="h-8 w-8" />, label: 'Футбольный клуб', value: 'Дордой' },
    { icon: <UsersIcon className="h-8 w-8" />, value: '5000+', label: 'Сотрудников' }
  ];

  return (
    <div ref={ref} className="relative bg-gray-900 text-white overflow-hidden">
      {/* Параллакс фон */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
          style={{ y: yBg, opacity: opacityBg }}
        />
      )}
      {isMobile && (
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
      )}

      {/* Частицы */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                rotate: Math.random() * 360
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 100],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      )}

      {/* История компании */}
      <section ref={historyRef} className="relative py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
              Наша история
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-8" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                В начале 1990-х небольшая группа предпринимателей во главе с Аскаром Салымбековым
                основала «Дордой» как торговую базу. Начав с заброшенных болот на окраине Бишкека,
                мы превратились в гигантский торгово-предпринимательский комплекс, объединяющий
                десятки тысяч предпринимателей. Сегодня «Дордой» - это символ успеха и процветания
                отечественного бизнеса.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-gray-800 to-gray-900' : 'from-gray-700 to-gray-800'} rounded-2xl p-6 shadow-lg border border-gray-600/30`}
                >
                  <div className="text-amber-400 mb-3">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-1">{item.value}</h3>
                  <p className="text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Миссия компании */}
      <section ref={missionRef} className="relative py-32 px-6 bg-[url('https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
            Наша миссия
          </h2>
          <div className="text-2xl md:text-3xl italic font-medium mb-8 text-amber-300">
            "Вместе к благополучию и процветанию"
          </div>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Мы создаём условия для успешного развития предпринимательства и роста экономики,
            объединяя опыт и ресурсы ради процветания общества. Наша цель - стать мостом между
            традициями и инновациями, сохраняя культурные ценности и внедряя современные технологии.
          </p>
        </div>
      </section>

      {/* Ценности компании */}
      <section ref={valuesRef} className="relative py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
              Наши ценности
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${value.color} rounded-2xl p-8 shadow-xl overflow-hidden relative`}
              >
                <div className="absolute -inset-1 bg-white/10 rounded-2xl blur-md" />
                <div className="relative z-10">
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DordoiPage;
