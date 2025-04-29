import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaFilm, FaUtensils, FaSearch, FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight, FaInstagram, FaFacebook, FaTelegram } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

// Данные для акций
const promotions = [
  {
    id: 1,
    title: "Скидка 50% в Zara",
    description: "Только с 1 по 30 июня на новую коллекцию",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 2,
    title: "2 кофе по цене 1",
    description: "В Gloria Jeans с 12:00 до 15:00",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 3,
    title: "Бесплатный попкорн",
    description: "При покупке билета в кинотеатр",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
];

// Данные для событий
const events = [
  {
    id: 1,
    title: "Фестиваль еды",
    date: "15 июня, 12:00",
    description: "Дегустации от лучших ресторанов",
  },
  {
    id: 2,
    title: "Детский день",
    date: "20 июня, 11:00",
    description: "Аниматоры и мастер-классы",
  },
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Шапка */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full bg-blue-900/90 backdrop-blur-md text-white z-50"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <h1 className="text-3xl font-bold text-yellow-400">Dordoi Plaza</h1>
            </motion.div>

            {/* Мобильное меню */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>

            {/* Десктопное меню */}
            <nav className="hidden md:flex space-x-8">
              {["Магазины", "Кино", "Рестораны", "Акции", "События"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.1, color: "#facc15" }}
                  className="hover:text-yellow-400 transition font-medium"
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-6">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:text-yellow-400"
              >
                <FaSearch size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(250, 204, 21, 0.5)" }}
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition"
              >
                Войти
              </motion.button>
            </div>
          </div>

          {/* Мобильное меню (раскрывающееся) */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4 pb-4"
            >
              {["Магазины", "Кино", "Рестораны", "Акции", "События"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block hover:text-yellow-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="bg-yellow-400 text-blue-900 w-full py-2 rounded-lg font-bold hover:bg-yellow-300 transition">
                Войти
              </button>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Герой-баннер */}
      <section className="relative h-screen flex items-center justify-center bg-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-yellow-400">Dordoi Plaza</span> — ваш идеальный день
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Шопинг, кино, гастрономия и развлечения в одном месте
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(250, 204, 21, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition"
          >
            Начать путешествие
          </motion.button>
        </div>

        {/* Анимированная стрелка вниз */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Секция "Почему мы?" */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-900"
          >
            Почему выбирают нас?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaShoppingBag size={48} className="text-blue-900" />,
                title: "200+ магазинов",
                description: "От люксовых брендов до демократичных марок"
              },
              {
                icon: <FaFilm size={48} className="text-blue-900" />,
                title: "Кинотеатр IMAX",
                description: "Премьеры в лучших залах города"
              },
              {
                icon: <FaUtensils size={48} className="text-blue-900" />,
                title: "Гастрономия",
                description: "Рестораны на любой вкус и бюджет"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="inline-block mb-6"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция акций */}
      <section id="акции" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-900"
          >
            Текущие акции
          </motion.h2>

          <div className="relative">
            <div className="flex overflow-x-auto pb-8 scrollbar-hide space-x-6">
              {promotions.map((promo, index) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="min-w-[300px] md:min-w-[400px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0"
                >
                  <div className="h-60 overflow-hidden">
                    <motion.img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                    <p className="text-gray-600 mb-4">{promo.description}</p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-blue-900 font-semibold flex items-center"
                    >
                      Узнать больше <FaArrowRight className="ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Секция событий */}
      <section id="события" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-900"
          >
            Ближайшие события
          </motion.h2>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-1/2 h-full w-1 bg-blue-200 transform -translate-x-1/2"></div>

            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`mb-12 flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-start`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                  <div className={`p-6 rounded-2xl ${index % 2 === 0 ? "bg-blue-900 text-white" : "bg-yellow-400 text-blue-900"}`}>
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <p className="font-medium mb-2">{event.date}</p>
                    <p>{event.description}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full ${index % 2 === 0 ? "bg-yellow-400" : "bg-blue-900"} border-4 border-white shadow-lg`}></div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Контактная форма */}
      <section className="relative py-20 bg-blue-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Остались вопросы?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl"
            >
              Напишите нам, и мы с радостью ответим!
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 font-medium">Имя</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Сообщение</label>
              <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(30, 58, 138, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition"
            >
              Отправить сообщение
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Dordoi Plaza</h3>
              <p>Лучшее место для шопинга и отдыха в Бишкеке</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Контакты</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-yellow-400" /> пр. Чуй, 155
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-2 text-yellow-400" /> +996 (XXX) XXX-XXX
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2 text-yellow-400" /> info@dordoiplaza.kg
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Часы работы</h4>
              <ul className="space-y-2">
                <li>Пн-Пт: 10:00 - 22:00</li>
                <li>Сб-Вс: 9:00 - 23:00</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Соцсети</h4>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="text-2xl hover:text-yellow-400 transition"
                >
                  <FaInstagram />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="text-2xl hover:text-yellow-400 transition"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="text-2xl hover:text-yellow-400 transition"
                >
                  <FaTelegram />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <p>© {new Date().getFullYear()} Dordoi Plaza. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;