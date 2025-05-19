import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTelegramPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, color: 'bg-blue-600' },
    { icon: <FaInstagram />, color: 'bg-pink-600' },
    { icon: <FaYoutube />, color: 'bg-red-600' },
    { icon: <FaTelegramPlane />, color: 'bg-blue-500' }
  ];

  const footerLinks = [
    {
      title: "Компания",
      links: ["О нас", "История", "Команда", "Карьера", "Новости"]
    },
    {
      title: "Проекты",
      links: ["Дордой Плаза", "Университет", "ФК Дордой", "Инновации", "Партнеры"]
    },
    {
      title: "Ресурсы",
      links: ["Блог", "Документы", "FAQ", "Мероприятия", "Контакты"]
    }
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* 3D эффект фона */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      {/* Основное содержимое */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Верхняя часть */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Лого и описание */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-gray-900 font-bold text-xl">D</span>
              </div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300">
                ДОРДОЙ
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg"
            >
              Лидер в сфере торговли, образования и спорта в Кыргызстане
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Навигационные ссылки */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-yellow-400">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Контактная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-yellow-500/10 rounded-lg">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm">Адрес</h4>
              <p className="text-white mt-1">г. Бишкек, пр. Чуй, 155</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-yellow-500/10 rounded-lg">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm">Телефон</h4>
              <p className="text-white mt-1">+996 (312) 54-05-05</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-yellow-500/10 rounded-lg">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm">Email</h4>
              <p className="text-white mt-1">info@dordoi.kg</p>
            </div>
          </div>
        </motion.div>

        {/* Нижняя часть */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Дордой. Все права защищены.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Условия использования</a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Карта сайта</a>
          </div>
        </motion.div>
      </div>

      {/* Декоративный элемент */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </footer>
  );
};

export default Footer;