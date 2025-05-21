import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChalkboardTeacher, FaSearch, FaGraduationCap, FaFlask, FaLaptopCode, FaTimes } from 'react-icons/fa';
import { FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './PartnersGallery.css';

const TeachersPage = () => {
  const [activeDept, setActiveDept] = useState('it');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredTeacher, setHoveredTeacher] = useState(null);
  const [showProgramsModal, setShowProgramsModal] = useState(false);

  const departments = {
    it: {
      icon: <FaLaptopCode className="text-blue-500" />,
      title: "IT & Кибербезопасность",
      teachers: [
        {
          id: 1,
          name: "Адилхан Сатымкулов",
          subject: "Data Science",
          specialty: "Машинное обучение, Python",
          exp: "5 лет",
          achievements: [
            "Экс-руководитель отдела аналитики в Google",
            "Автор 30+ научных работ",
            "Сертифицированный специалист TensorFlow"
          ]
        },
        {
          id: 2,
          name: "Ибро Абдраимов",
          subject: "Кибербезопасность",
          specialty: "Application Security, Cloud Security",
          exp: "10 лет",
          achievements: [
            "CEO VixrumTech",
            "Бывший руководитель в Facebook",
            "Автор курса по кибербезопасности",
          ]
        },
        {
          id: 3,
          name: "Илияр Мидинов",
          subject: "Кибербезопасность",
          specialty: "Ethical Hacking, Blockchain",
          exp: "5 лет",
          achievements: [
            "Бывший пентестер в NASA",
            "Сертифицированный этичный хакер (CEH)",
            "Разработчик криптографических протоколов"
          ]
        }
      ]
    },
    science: {
      icon: <FaFlask className="text-emerald-500" />,
      title: "Наука",
      teachers: [
        {
          id: 3,
          name: "Валентина Сидорова",
          subject: "Биотехнологии",
          specialty: "Генная инженерия",
          exp: "12 лет",
          achievements: [
            "Ведущий исследователь в Johns Hopkins",
            "Лауреат премии за инновации в медицине",
            "Автор патентов в области генной терапии"
          ]
        }
      ]
    },
    business: {
      icon: <FaGraduationCap className="text-purple-500" />,
      title: "Бизнес",
      teachers: [
        {
          id: 4,
          name: "Дмитрий Петров",
          subject: "Маркетинг",
          specialty: "Digital Marketing, SMM",
          exp: "8 лет",
          achievements: [
            "Основатель маркетингового агентства",
            "Эксперт по цифровой трансформации",
            "Автор курса по SMM-стратегиям"
          ]
        }
      ]
    }
  };

  const programs = [
    {
      id: 1,
      title: "Data Science Professional",
      duration: "12 месяцев",
      format: "Онлайн",
      description: "Полный курс по машинному обучению и анализу данных с нуля до профессионального уровня",
      department: "it"
    },
    {
      id: 2,
      title: "Кибербезопасность и Ethical Hacking",
      duration: "10 месяцев",
      format: "Онлайн + Оффлайн",
      description: "Обучение методам защиты информации и тестирования на проникновение",
      department: "it"
    },
    {
      id: 3,
      title: "Генная инженерия и биотехнологии",
      duration: "14 месяцев",
      format: "Онлайн",
      description: "Современные методы генетических исследований и их применение в медицине",
      department: "science"
    },
    {
      id: 4,
      title: "Digital Marketing Pro",
      duration: "8 месяцев",
      format: "Онлайн",
      description: "Полный курс по цифровому маркетингу, SMM и аналитике",
      department: "business"
    }
  ];

  const filteredTeachers = departments[activeDept].teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPrograms = programs.filter(program => 
    program.department === activeDept
  );

  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pt-20 pb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Наши преподаватели
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Профессионалы с реальным опытом работы в ведущих компаниях
          </p>
        </motion.div>

        <div className="container mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-full md:w-96"
            >
              <input
                type="text"
                placeholder="Найти преподавателя..."
                className="w-full pl-12 pr-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </motion.div>

            <div className="flex flex-wrap gap-2 justify-center">
              {Object.keys(departments).map((key) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveDept(key)}
                  className={`px-6 py-3 rounded-xl flex items-center transition-colors ${activeDept === key ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="mr-2">{departments[key].icon}</span>
                  {departments[key].title}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTeachers.map((teacher) => (
                <motion.div
                  key={teacher.id}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setHoveredTeacher(teacher.id)}
                  onHoverEnd={() => setHoveredTeacher(null)}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
                >
                  <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                    {hoveredTeacher === teacher.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaChalkboardTeacher className="text-white/20" size={80} />
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <motion.h3
                        className="text-xl font-bold mb-1"
                        animate={{
                          x: hoveredTeacher === teacher.id ? 5 : 0
                        }}
                      >
                        {teacher.name}
                      </motion.h3>
                      <p className="text-blue-100 text-sm">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-500 text-sm">Специализация</h4>
                        <p className="text-md">{teacher.specialty}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                        {teacher.exp} опыта
                      </span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-500 text-sm mb-2">Ключевые достижения:</h4>
                      <ul className="space-y-2">
                        {teacher.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-sm text-gray-600">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredTeachers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-xl text-gray-500">Преподаватели не найдены</h3>
              <p className="text-gray-400">Попробуйте изменить параметры поиска</p>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16"
        >
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Узнайте больше о наших программах
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Мы готовим специалистов, востребованных на международном рынке труда
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProgramsModal(true)}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              Посмотреть программы обучения
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно программ обучения */}
      <AnimatePresence>
        {showProgramsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowProgramsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowProgramsModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>

              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                  Программы обучения - {departments[activeDept].title}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPrograms.map(program => (
                    <motion.div
                      key={program.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                    >
                      <h3 className="text-xl font-bold mb-2 text-blue-800">{program.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <span className="mr-4">⏱ {program.duration}</span>
                        <span>📌 {program.format}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{program.description}</p>
                      <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        Подробнее <FiExternalLink className="ml-1" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {filteredPrograms.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Программы для этого направления пока не добавлены</p>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Хотите индивидуальную консультацию?</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Отправить заявку
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeachersPage;