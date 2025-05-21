import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaTelegram, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope,
  FaGraduationCap,
  FaExternalLinkAlt,
  FaTimes
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { useState } from 'react';

const UniversityFooter = () => {
  // Состояние для модального окна
  const [isProgramsModalOpen, setIsProgramsModalOpen] = useState(false);

  const socialLinks = [
    { icon: <FaFacebook className="text-blue-600" />, name: "Facebook", url: "https://www.facebook.com/salymbekov.kg/?locale=ru_RU" },
    { icon: <FaInstagram className="text-pink-600" />, name: "Instagram", url: "https://www.instagram.com/salymbekovuniversity/" },
    { icon: <FaYoutube className="text-red-600" />, name: "YouTube", url: "https://www.youtube.com/@salymbekovuniversity8213" },
    { icon: <SiTiktok className="text-black" />, name: "TikTok", url: "https://www.tiktok.com/@salymbekovuniversity" }
  ];

  const quickLinks = [
    { title: "Главная", url: "/" },
    { 
      title: "Программы", 
      onClick: () => setIsProgramsModalOpen(true),
      isButton: true
    },
    { title: "О нас", url: "/about" }
  ];

  const legalLinks = [
    { title: "Политика конфиденциальности", url: "" },
    { title: "Условия использования", url: "/terms" }
  ];

  // Программы обучения для модального окна
  const programs = [
    {
      name: "Компьютерные науки",
      degree: "Бакалавриат",
      duration: "4 года",
      description: "Современное IT-образование с акцентом на практические навыки"
    },
    {
      name: "Бизнес-администрирование",
      degree: "Бакалавриат",
      duration: "4 года",
      description: "Подготовка руководителей для международного бизнеса"
    },
    {
      name: "Международные отношения",
      degree: "Бакалавриат",
      duration: "4 года",
      description: "Изучение глобальных политических и экономических процессов"
    },
    {
      name: "Data Science",
      degree: "Магистратура",
      duration: "2 года",
      description: "Углубленное изучение анализа больших данных"
    }
  ];

  return (
    <footer className="bg-white text-gray-800 border-t border-blue-100 relative overflow-hidden">
      {/* Анимированный фон */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * (i % 2 === 0 ? 1 : -1)],
              y: [0, 50 * (i % 3 === 0 ? 1 : -1)],
              rotate: [0, 360]
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            className={`absolute rounded-full opacity-70 ${i % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}`}
            style={{
              width: 100 + i * 30,
              height: 100 + i * 30,
              left: `${10 + i * 10}%`,
              top: `${i * 15}%`
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Блок 1: Лого и соцсети */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <FaGraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-blue-800">Salymbekov University</h3>
            </div>
            <p className="text-gray-600">
              Лидер современного образования в Кыргызстане. Международные стандарты, инновационные подходы.
            </p>
            
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Блок 2: Быстрые ссылки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Быстрые ссылки</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.isButton ? (
                    <button
                      onClick={link.onClick}
                      className="text-gray-600 hover:text-blue-600 transition-colors flex items-center w-full text-left"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {link.title}
                    </button>
                  ) : (
                    <a 
                      href={link.url} 
                      className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {link.title}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Блок 3: Контакты */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <a 
                  href="https://www.google.com/maps/place/%D0%A1%D0%B0%D0%BB%D1%8B%D0%BC%D0%B1%D0%B5%D0%BA%D0%BE%D0%B2+%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82/@42.8449473,74.5990326,18.6z/data=!4m14!1m7!3m6!1s0x389eb6214e82a5a3:0x5e3d1db6ebfef592!2zMjQg0YPQuy4g0JDQsdC00YvQu9Cw0YHQsCDQnNCw0LvQtNGL0LHQsNC10LLQsCwg0JHQuNGI0LrQtdC6!3b1!8m2!3d42.8455601!4d74.5978483!3m5!1s0x389ec987f324329b:0x2cd99bcd0df5fc1f!8m2!3d42.8441282!4d74.6001724!16s%2Fg%2F11lh2dfxc_?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 flex items-center"
                >
                  г. Бишкек, ул. Фучика 3 <FaExternalLinkAlt className="ml-1 text-xs" />
                </a>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-blue-500 mr-3" />
                <a href="tel:+996312658538" className="text-gray-600 hover:text-blue-600">
                  +996 (312) 658-538
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3" />
                <a href="mailto:info@salymbekov.com" className="text-gray-600 hover:text-blue-600">
                  info@salymbekov.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Блок 4: Подписка на новости */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-blue-800">Подписаться на новости</h4>
            <p className="text-gray-600">Будьте в курсе последних событий университета</p>
            
            <motion.form 
              action="https://university.us21.list-manage.com/subscribe/post" 
              method="POST"
              whileHover={{ scale: 1.01 }}
              className="flex flex-col space-y-3"
            >
              <input 
                type="email" 
                name="EMAIL"
                placeholder="Ваш email" 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Подписаться
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Нижняя часть футера */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Salymbekov University. Все права защищены.
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {legalLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                whileHover={{ scale: 1.05 }}
                className="text-gray-500 hover:text-blue-600 text-sm"
              >
                {link.title}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Анимированная полоса внизу */}
      <motion.div 
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="h-1 bg-gradient-to-r from-blue-100 via-blue-400 to-blue-100 bg-[length:300%_100%]"
      />

      {/* Модальное окно программ обучения */}
      {isProgramsModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsProgramsModalOpen(false)}
        >
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 relative">
              <button 
                onClick={() => setIsProgramsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>

              <h2 className="text-2xl font-bold text-blue-800 mb-6">Программы обучения</h2>
              
              <div className="space-y-6">
                {programs.map((program, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{program.name}</h3>
                        <p className="text-gray-600">{program.degree}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {program.duration}
                      </span>
                    </div>
                    <p className="mt-3 text-gray-700">{program.description}</p>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                      Подробнее о программе →
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Хотите узнать больше?</h3>
                <p className="text-gray-600 mb-4">Оставьте заявку, и наш менеджер свяжется с вами для консультации</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Оставить заявку
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </footer>
  );
};

export default UniversityFooter;