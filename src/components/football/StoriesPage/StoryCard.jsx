// src/stories/StoryCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const StoryCard = ({ story, onClick }) => (
  <motion.div
    className="story-card min-w-[260px] rounded-xl overflow-hidden shadow-lg cursor-pointer relative flex-shrink-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.04 }}
    onClick={onClick}
  >
    <div className="relative h-[320px]">
      <img
        src={story.thumbnail || story.image}
        alt={story.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-80"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="mb-2">
          <span className="text-xs font-bold bg-blue-700 text-white px-2 py-1 rounded-sm">
            {story.subtitle}
          </span>
        </div>
        <h3 className="text-xl font-bold line-clamp-2 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {story.title}
        </h3>
        <p className="text-sm text-gray-200">{story.date}</p>
      </div>
      {story.isNew && (
        <span className="absolute top-3 left-3 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-sm z-10">
          NEW
        </span>
      )}
      {story.video && (
        <div className="absolute top-3 right-3 bg-blue-900 bg-opacity-70 p-2 rounded-full z-10">
          <FaPlay className="text-white" />
        </div>
      )}
    </div>
  </motion.div>
);

export default StoryCard;
