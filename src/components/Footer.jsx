import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-blue-900 to-blue-950 text-white overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-yellow-300 rounded-full filter blur-3xl opacity-5"></div>
      </div>

      {/* Основное содержимое */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Лого и описание */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">D</span>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300">
                ДОРДОЙ
              </h2>
            </motion.div>
            <p className="text-blue-200">
              Ведущий холдинг Кыргызстана, объединяющий торговые центры, 
              образовательные учреждения и спортивные клубы.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-blue-200 hover:text-yellow-400 transition-all"
                >
                  <Icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Навигация */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold text-yellow-400">Навигация</h3>
            <ul className="space-y-3">
              {['О компании', 'Проекты', 'Новости', 'Карьера', 'Контакты'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a href="#" className="text-blue-200 hover:text-yellow-400 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Проекты */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold text-yellow-400">Проекты</h3>
            <ul className="space-y-3">
              {['Дордой Плаза', 'Университет Дордой', 'ФК Дордой', 'Строительные проекты', 'Социальные инициативы'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a href="#" className="text-blue-200 hover:text-yellow-400 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Контакты */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold text-yellow-400">Контакты</h3>
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3"
              >
                <HiLocationMarker className="text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-blue-200">г. Бишкек, пр. Чуй, 155</span>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3"
              >
                <HiPhone className="text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-blue-200">+996 (312) 54-05-05</span>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3"
              >
                <HiMail className="text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-blue-200">info@dordoi.kg</span>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3"
              >
                <HiClock className="text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-blue-200">Пн-Пт: 9:00 - 18:00</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Нижняя часть */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} Дордой. Все права защищены.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Политика конфиденциальности', 'Условия использования', 'Карта сайта'].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-300 hover:text-yellow-400 text-sm transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Волнообразный разделитель */}
      <div className="w-full h-20 bg-gradient-to-t from-blue-950 to-transparent -mb-1">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-current text-blue-950"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-current text-blue-950"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-current text-blue-950"
          ></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;