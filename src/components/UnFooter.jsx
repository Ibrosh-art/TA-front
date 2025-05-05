import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaTelegram, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope,
  FaGraduationCap 
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const UniversityFooter = () => {
  const socialLinks = [
    { icon: <FaFacebook className="text-blue-600" />, name: "Facebook" },
    { icon: <FaInstagram className="text-pink-600" />, name: "Instagram" },
    { icon: <FaYoutube className="text-red-600" />, name: "YouTube" },
    { icon: <FaTelegram className="text-blue-400" />, name: "Telegram" },
    { icon: <SiTiktok className="text-black" />, name: "TikTok" }
  ];

  const quickLinks = [
    { title: "Главная", url: "#" },
    { title: "Поступающим", url: "#" },
    { title: "Программы", url: "#" },
    { title: "Новости", url: "#" }
  ];

  return (
    <footer className="bg-white text-gray-800 border-t border-blue-100 relative overflow-hidden">
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
                  href="#"
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
                  <a href={link.url} className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600">г. Бишкек, ул. Фучика 3</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-blue-500 mr-3" />
                <span className="text-gray-600">+996 (312) 658-538</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3" />
                <span className="text-gray-600">info@salymbekov.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-blue-800">Подписаться на новости</h4>
            <p className="text-gray-600">Будьте в курсе последних событий университета</p>
            
            <motion.form 
              whileHover={{ scale: 1.01 }}
              className="flex flex-col space-y-3"
            >
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Подписаться
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Salymbekov University все права защищены.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-blue-600 text-sm">Политика конфиденциальности</a>
            <a href="#" className="text-gray-500 hover:text-blue-600 text-sm">Условия использования</a>
          </div>
        </motion.div>
      </div>

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
    </footer>
  );
};

export default UniversityFooter;