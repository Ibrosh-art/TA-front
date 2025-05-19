import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/solid';

const StoryViewer = ({ stories, currentIndex = 0, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [progress, setProgress] = useState(0);
  const storyDuration = 5000; // 5 секунд на историю

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Переключаемся на следующую историю
          if (activeIndex < stories.length - 1) {
            setActiveIndex(activeIndex + 1);
            return 0;
          } else {
            // Закрываем просмотрщик если закончились истории
            clearInterval(timer);
            onClose();
            return 0;
          }
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [activeIndex, stories.length, onClose]);

  const activeStory = stories[activeIndex];

  const handlePrevStory = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setProgress(0);
    }
  };

  const handleNextStory = () => {
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Индикаторы прогресса */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1">
        {stories.map((_, index) => (
          <div key={index} className="h-0.5 bg-gray-500 flex-1 rounded-full overflow-hidden">
            {index === activeIndex && (
              <div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
              />
            )}
            {index < activeIndex && (
              <div className="h-full bg-white w-full" />
            )}
          </div>
        ))}
      </div>

      {/* Кнопка закрытия */}
      <button
        className="absolute top-6 right-6 text-white p-2"
        onClick={onClose}
      >
        <XIcon className="h-6 w-6" />
      </button>

      {/* Содержание истории */}
      <div className="max-w-md w-full h-full max-h-screen relative">
        <img 
          src={activeStory.content || `https://via.placeholder.com/800x1200/0057B8/FFFFFF?text=${activeStory.username}`}
          alt={activeStory.username}
          className="w-full h-full object-cover"
        />

        {/* Информация о пользователе */}
        <div className="absolute top-12 left-4 flex items-center space-x-3">
          <img 
            src={activeStory.avatar} 
            alt={activeStory.username} 
            className="h-10 w-10 rounded-full border-2 border-white"
          />
          <span className="text-white font-semibold">{activeStory.username}</span>
        </div>

        {/* Области для навигации (левая - предыдущая история, правая - следующая) */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full" onClick={handlePrevStory} />
          <div className="w-1/2 h-full" onClick={handleNextStory} />
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
