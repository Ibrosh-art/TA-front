import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserGraduate, FaBook, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

// Данные факультетов
const faculties = [
  {
    id: 1,
    name: "Инженерный факультет",
    programs: ["Компьютерные науки", "Робототехника", "Строительство"],
    image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    name: "Экономический факультет",
    programs: ["Финансы", "Маркетинг", "Международный бизнес"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    name: "Гуманитарный факультет",
    programs: ["Психология", "Журналистика", "Международные отношения"],
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  }
];

// Новости университета
const news = [
  {
    id: 1,
    title: "Открытие новой лаборатории искусственного интеллекта",
    date: "15 СЕН 2024",
    excerpt: "Современное оборудование для исследований в области машинного обучения",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    title: "Международная конференция по устойчивому развитию",
    date: "10 СЕН 2024",
    excerpt: "Ученые из 15 стран обсудят экологические инициативы",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  }
];

// Мероприятия
const events = [
  {
    id: 1,
    title: "День открытых дверей",
    date: "25 СЕН 2024",
    time: "10:00 - 16:00",
    location: "Главный корпус"
  },
  {
    id: 2,
    title: "Научная олимпиада для школьников",
    date: "5 ОКТ 2024",
    time: "09:00 - 14:00",
    location: "Корпус инженерного факультета"
  }
];

const UniversityHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaculty, setActiveFaculty] = useState(null);

  return (
    
    <div>
      {/* Новости и события */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Новости */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-900">Новости</h2>
              <div className="space-y-6">
                {news.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{item.date}</p>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.excerpt}</p>
                    </div>
                  </div>
                ))}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-blue-900 font-semibold flex items-center"
                >
                </motion.button>
              </div>
            </motion.div>

            {/* Мероприятия */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-900">Ближайшие мероприятия</h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold mb-1">{event.title}</h3>
                        <p className="text-gray-600 text-sm">{event.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-blue-900">{event.date}</p>
                        <p className="text-gray-500 text-sm">{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-blue-900 font-semibold flex items-center"
                >
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Контакты
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-blue-800 rounded-xl p-6 text-center"
            >
              <div className="text-yellow-500 text-3xl mb-4 flex justify-center">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-bold mb-2">Адрес</h3>
              <p>г. Бишкек, ул. Университетская, 1</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-blue-800 rounded-xl p-6 text-center"
            >
              <div className="text-yellow-500 text-3xl mb-4 flex justify-center">
                <FaPhone />
              </div>
              <h3 className="text-xl font-bold mb-2">Телефон</h3>
              <p>+996 (312) 123-456</p>
              <p>+996 (555) 987-654</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blue-800 rounded-xl p-6 text-center"
            >
              <div className="text-yellow-500 text-3xl mb-4 flex justify-center">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p>info@university.kg</p>
              <p>admission@university.kg</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Университет Прогресса</h3>
              <p>Лидер в образовании с 1990 года</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Навигация</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-500 transition">Главная</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Факультеты</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Поступление</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Ресурсы</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-500 transition">Библиотека</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Научные центры</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Студенческий совет</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Соцсети</h4>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="text-2xl hover:text-yellow-500 transition"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="text-2xl hover:text-yellow-500 transition"
                >
                  <FaTwitter />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="text-2xl hover:text-yellow-500 transition"
                >
                  <FaInstagram />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="text-2xl hover:text-yellow-500 transition"
                >
                  <FaYoutube />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <p>© {new Date().getFullYear()} Университет Прогресса. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UniversityHomepage;