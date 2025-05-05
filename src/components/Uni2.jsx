import { motion } from 'framer-motion';
import { FaLaptop, FaUserMd, FaGlobeAmericas, FaGraduationCap } from 'react-icons/fa';

const DepartmentsCards = () => {
  const departments = [
    {
      id: 1,
      title: "Колледж IT и бизнеса",
      subtitle: "Колледж",
      icon: <FaLaptop className="text-blue-500" size={30} />,
      description: "Срок обучения 3 года на базе 9-11 классов",
      highlight: "1,5 года — обучение в Малайзии",
      color: "from-blue-500 to-blue-700",
      animation: {
        hover: { y: -5 }
      }
    },
    {
      id: 2,
      title: "Высшая школа медицины",
      subtitle: "ВШМ",
      icon: <FaUserMd className="text-red-500" size={30} />,
      description: "Срок обучения: 4 и 5 лет",
      highlight: "Лечебное дело",
      color: "from-red-500 to-red-700",
      animation: {
        hover: { y: -5 }
      }
    },
    {
      id: 3,
      title: "Американский институт технологий",
      subtitle: "AIT",
      icon: <FaGlobeAmericas className="text-emerald-500" size={30} />,
      description: "Международные образовательные программы",
      highlight: "Совместные проекты с вузами США",
      color: "from-emerald-500 to-emerald-700",
      animation: {
        hover: { y: -5 }
      }
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-3 text-gray-800"
        >
          Наши учебные подразделения
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto"
        >
          Современное образование с международными возможностями
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: dept.id * 0.1 }}
              whileHover={dept.animation.hover}
              className={`bg-gradient-to-br ${dept.color} rounded-xl shadow-lg overflow-hidden h-full`}
            >
              <div className="p-6 text-white h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-semibold opacity-80 mb-1">{dept.subtitle}</p>
                    <h3 className="text-xl font-bold">{dept.title}</h3>
                  </div>
                  <div className="bg-white/20 p-2 rounded-full">
                    {dept.icon}
                  </div>
                </div>

                <div className="mt-2 mb-4 flex-grow">
                  <p className="text-white/90 text-sm mb-3">{dept.description}</p>
                  <div className="flex items-center bg-white/10 px-3 py-2 rounded-md text-sm">
                    <FaGraduationCap className="mr-2" size={14} />
                    <span>{dept.highlight}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsCards;