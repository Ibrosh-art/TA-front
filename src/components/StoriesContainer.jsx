import React, { useRef, useState, useEffect } from 'react';
import Story from './Story';
import StoryViewer from './StoryViewer';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const StoriesContainer = ({ stories }) => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Добавляем контент для каждой истории
  const storiesWithContent = stories.map((story) => ({
    ...story,
    content: story.content || `https://via.placeholder.com/800x1200/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${story.username}`
  }));

  useEffect(() => {
    if (scrollRef.current) {
      setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    }
  }, [stories]);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const openStoryViewer = (index) => {
    setCurrentStoryIndex(index);
    setViewerOpen(true);
  };

  const closeStoryViewer = () => {
    setViewerOpen(false);
  };

  return (
    <div className="relative mt-4 mb-8">
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Истории</h2>
        <a href="#" className="text-dordoi-primary font-semibold">Смотреть все</a>
      </div>

      <div className="relative group">
        {scrollPosition > 0 && (
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg z-10"
            onClick={scrollLeft}
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        )}

        <div 
          ref={scrollRef} 
          className="flex space-x-4 py-3 px-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
          onScroll={handleScroll}
        >
          {storiesWithContent.map((story, index) => (
            <Story 
              key={story.id} 
              img={story.avatar} 
              username={story.username} 
              viewed={story.viewed}
              onClick={() => openStoryViewer(index)}
            />
          ))}
        </div>

        {scrollPosition < maxScroll && (
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg z-10"
            onClick={scrollRight}
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </div>

      {viewerOpen && (
        <StoryViewer
          stories={storiesWithContent}
          currentIndex={currentStoryIndex}
          onClose={closeStoryViewer}
        />
      )}
    </div>
  );
};

export default StoriesContainer;
