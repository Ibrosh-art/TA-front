// src/stories/StoryModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaShareAlt } from 'react-icons/fa';

const StoryModal = ({
  stories,
  currentIndex,
  progress,
  onPrev,
  onNext,
  onClose,
  onShare,
  onPause,
  autoplay,
  setAutoplay
}) => {
  const story = stories[currentIndex];

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-4xl h-[85vh]">
        {/* Progress bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
          {stories.map((_, idx) => (
            <div key={idx} className="flex-1 h-1 bg-gray-500 rounded-full overflow-hidden">
              {idx < currentIndex ? (
                <div className="h-full w-full bg-white" />
              ) : idx === currentIndex ? (
                <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
              ) : (
                <div className="h-full w-0 bg-white" />
              )}
            </div>
          ))}
        </div>
        {/* Story content */}
        <motion.div
          className="h-full rounded-xl overflow-hidden"
          key={currentIndex}
          initial={{ opacity: 0.8, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {story.video ? (
            <video
              src={story.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          )}
          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8 text-white">
            <div className="mb-3">
              <span className="text-sm font-bold bg-blue-700 text-white px-3 py-1 rounded-sm">
                {story.subtitle}
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {story.title}
            </h2>
            <p className="text-lg max-w-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {story.description}
            </p>
            <p className="text-sm text-gray-300 mt-2">{story.date}</p>
          </div>
        </motion.div>
        {/* Navigation */}
        <div className="absolute inset-0 flex items-center justify-between px-4" onClick={e => e.stopPropagation()}>
          {currentIndex > 0 && (
            <button
              className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-4 rounded-full transition-all transform hover:scale-110"
              onClick={onPrev}
              aria-label="Предыдущий сторис"
            >
              <FaArrowLeft size={20} />
            </button>
          )}
          {currentIndex < stories.length - 1 && (
            <button
              className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-4 rounded-full transition-all transform hover:scale-110"
              onClick={onNext}
              aria-label="Следующий сторис"
            >
              <FaArrowRight size={20} />
            </button>
          )}
        </div>
        {/* Controls */}
        <div className="absolute top-16 right-4 flex flex-col space-y-3">
          <button
            className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <FaTimes size={18} />
          </button>
          <button
            className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
            onClick={onPause}
            aria-label={autoplay ? "Пауза" : "Продолжить"}
          >
            {autoplay ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
        {/* Share */}
        <button
          className="absolute bottom-32 right-8 bg-blue-900 text-white p-3 rounded-full transition-all hover:bg-blue-800 hover:scale-110"
          onClick={onShare}
          aria-label="Поделиться"
        >
          <FaShareAlt size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default StoryModal;