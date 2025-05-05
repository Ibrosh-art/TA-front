import { motion } from "framer-motion";
import { useState } from "react";
import { FaCalendarAlt, FaYoutube, FaChalkboardTeacher, FaRegClock, FaRegCalendarCheck } from "react-icons/fa";

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const events = {
    upcoming: [
      {
        id: 1,
        title: "День открытых дверей онлайн",
        date: "15 октября 2023",
        time: "15:00 (GMT+6)",
        type: "zoom",
        speaker: "Ректор университета",
        description: "Презентация программ и ответы на вопросы"
      },
      {
        id: 2,
        title: "Мастер-класс по Data Science",
        date: "20 октября 2023",
        time: "18:30 (GMT+6)",
        type: "youtube",
        speaker: "CTO TechCompany",
        description: "Разбор реальных кейсов из индустрии"
      }
    ],
    past: [
      {
        id: 3,
        title: "Веб-конференция 'Образование будущего'",
        date: "5 сентября 2023",
        recording: "https://youtube.com/...",
        speaker: "3 эксперта из разных стран"
      }
    ]
  };

  const liveStreams = [
    {
      title: "Лекция по искусственному интеллекту",
      time: "Сейчас в эфире",
      viewers: 142,
      link: "https://youtube.com/live/...",
      preview: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Разбор вступительных заданий",
      time: "Начнётся в 17:00",
      viewers: null,
      link: "#",
      preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-blue-600">Мероприятия</span> и трансляции
        </motion.h2>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-md font-medium ${activeTab === 'upcoming' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Расписание
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-3 rounded-md font-medium ${activeTab === 'live' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Онлайн-трансляции
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {activeTab === 'upcoming' ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <FaCalendarAlt className="mr-3 text-blue-500" />
                  Ближайшие мероприятия
                </h3>
                <button className="text-blue-600 hover:text-blue-800">
                  Весь календарь →
                </button>
              </div>

              <div className="space-y-6">
                {events.upcoming.map(event => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaRegCalendarCheck className="mr-2" />
                          {event.date} | {event.time}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaChalkboardTeacher className="mr-2" />
                          {event.speaker}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Записаться
                        </button>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          Подробнее
                        </button>
                      </div>
                    </div>
                    {event.description && (
                      <p className="mt-4 text-gray-700">{event.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaYoutube className="mr-3 text-red-500" />
                  Записи прошедших мероприятий
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.past.map(event => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-48 bg-gray-200 relative">
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <FaYoutube className="text-red-500 text-5xl" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-lg mb-2">{event.title}</h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaRegCalendarCheck className="mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <FaChalkboardTeacher className="mr-2" />
                          {event.speaker}
                        </div>
                        <a 
                          href={event.recording} 
                          className="text-blue-600 hover:text-blue-800 font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Смотреть запись →
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <FaYoutube className="mr-3 text-red-500" />
                Прямые трансляции
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {liveStreams.map((stream, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      <img 
                        src={stream.preview} 
                        alt={stream.title}
                        className="w-full h-48 object-cover"
                      />
                      {stream.time === "Сейчас в эфире" && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          LIVE
                        </div>
                      )}
                    </div>
                    <div className="p-6 bg-white">
                      <h4 className="text-xl font-bold mb-2">{stream.title}</h4>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaRegClock className="mr-2" />
                        {stream.time}
                        {stream.viewers && (
                          <span className="ml-4 flex items-center">
                            👤 {stream.viewers}
                          </span>
                        )}
                      </div>
                      <a
                        href={stream.link}
                        className={`inline-block px-6 py-3 rounded-lg font-bold ${stream.time === "Сейчас в эфире" ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {stream.time === "Сейчас в эфире" ? 'Присоединиться' : 'Напомнить мне'}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4">Как подключиться к трансляциям?</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Нажмите кнопку "Присоединиться" за 5 минут до начала</li>
                  <li>Трансляции проходят на YouTube (аккаунт не требуется)</li>
                  <li>Задавайте вопросы в чате трансляции</li>
                  <li>Все трансляции сохраняются в записи</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsSection;