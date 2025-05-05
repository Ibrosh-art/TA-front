import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PlayerCard = ({ name, surname, position, image, bgColor = '#004d98' }) => {
  const defaultImage = "https://via.placeholder.com/250x200?text=No+Image";
  return (
    <motion.div
      className="min-w-[250px] rounded-xl overflow-hidden transition-transform duration-300"
      style={{ background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), ${bgColor}` }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
    >
      <img
        src={image || defaultImage}
        alt={`${name} ${surname}`}
        className="w-full h-[200px] object-cover text-center" 
      />
      <div className="p-4 text-white">
        <div className="text-xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          <span>{name}</span> <span>{surname}</span>
        </div>
        <p className="text-base mt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {position}
        </p>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const players = [
    {
      name: "Azamat",
      surname: "Baimatov",
      position: "Defender",
      image: "https://via.placeholder.com/250x200?text=Azamat+Baimatov",
      bgColor: "#004d98"
    },
    {
      name: "Mirlan",
      surname: "Murzaev",
      position: "Forward",
      image: "https://via.placeholder.com/250x200?text=Mirlan+Murzaev",
      bgColor: "#ffcc00"
    },
    {
      name: "Kairat",
      surname: "Zhyrgalbek",
      position: "Midfielder",
      image: "https://via.placeholder.com/250x200?text=Kairat+Zhyrgalbek",
      bgColor: "#004d98"
    },
    {
      name: "Alimardon",
      surname: "Shukurov",
      position: "Midfielder",
      image: "https://via.placeholder.com/250x200?text=Alimardon+Shukurov",
      bgColor: "#ffcc00"
    },
    {
      name: "Ernist",
      surname: "Batyrkanov",
      position: "Forward",
      image: "https://via.placeholder.com/250x200?text=Ernist+Batyrkanov",
      bgColor: "#004d98"
    },
    {
      name: "Valery",
      surname: "Kichin",
      position: "Defender",
      image: "https://via.placeholder.com/250x200?text=Valery+Kichin",
      bgColor: "#ffcc00"
    }
  ];

  const filters = ["All", "Forward", "Midfielder", "Defender"];

  const filteredPlayers = activeFilter === "All"
    ? players
    : players.filter(player => player.position === activeFilter);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Наши Игроки
          </h1>
          <div className="flex justify-center">
            <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex gap-2 flex-wrap">
            {filters.map(filter => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium transition duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {filter === "All" ? "Все" : filter === "Forward" ? "Нападающие" : filter === "Midfielder" ? "Полузащитники" : "Защитники"}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 space-x-4">
          {filteredPlayers.length === 0 ? (
            <div className="w-full text-center text-gray-600 text-lg">
              Игроки не найдены
            </div>
          ) : (
            filteredPlayers.map((player, index) => (
              <PlayerCard
                key={index}
                name={player.name}
                surname={player.surname}
                position={player.position}
                image={player.image}
                bgColor={player.bgColor}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;