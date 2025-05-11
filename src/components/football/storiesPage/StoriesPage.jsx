// src/stories/StoriesPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { storiesData } from './storiesData';
import StoryCard from './StoryCard';
import StoryModal from './StoryModal';

const StoriesPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const carouselRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 });

  useEffect(() => {
    let timer;
    if (isModalOpen && autoplay) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isModalOpen, currentIndex, autoplay]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'Escape':
          setIsModalOpen(false);
          break;
        case ' ':
          setAutoplay(prev => !prev);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentIndex]);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    const newStart = Math.max(0, visibleRange.start + (direction === 'left' ? -1 : 1));
    const newEnd = Math.min(storiesData.length - 1, visibleRange.end + (direction === 'left' ? -1 : 1));
    if (newStart !== visibleRange.start || newEnd !== visibleRange.end) {
      setVisibleRange({ start: newStart, end: newEnd });
    }
  };

  const handleNext = () => {
    if (currentIndex < storiesData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      setIsModalOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const handleShare = () => {
    const story = storiesData[currentIndex];
    const shareData = {
      title: `FC Dordoi: ${story.title}`,
      text: story.description,
      url: window.location.href
    };
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(err => {
        alert('Поделиться сторисом: ' + story.title);
      });
    } else {
      alert('Поделиться сторисом: ' + story.title);
    }
  };

  const handlePause = () => setAutoplay(prev => !prev);

  return (
    <section className="py-10 bg-gradient-to-b from-blue-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            DORDOI STORIES
          </h2>
          <div className="hidden md:flex space-x-2">
            <button
              className="bg-blue-900 text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
              onClick={() => scrollCarousel('left')}
              aria-label="Предыдущие сторисы"
            >
              <FaArrowLeft />
            </button>
            <button
              className="bg-blue-900 text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
              onClick={() => scrollCarousel('right')}
              aria-label="Следующие сторисы"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 space-x-4 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {storiesData.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={() => {
                setCurrentIndex(index);
                setIsModalOpen(true);
                setProgress(0);
                setAutoplay(true);
              }}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4 md:hidden">
          {Array.from({ length: Math.ceil(storiesData.length / 3) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${
                index === Math.floor(visibleRange.start / 3) ? 'bg-blue-900' : 'bg-gray-300'
              }`}
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({
                    left: index * (280 * 3),
                    behavior: 'smooth'
                  });
                }
              }}
              aria-label={`Перейти к сторисам ${index + 1}`}
            />
          ))}
        </div>
        <AnimatePresence>
          {isModalOpen && (
            <StoryModal
              stories={storiesData}
              currentIndex={currentIndex}
              progress={progress}
              onPrev={handlePrev}
              onNext={handleNext}
              onClose={() => setIsModalOpen(false)}
              onShare={handleShare}
              onPause={handlePause}
              autoplay={autoplay}
              setAutoplay={setAutoplay}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StoriesPage;