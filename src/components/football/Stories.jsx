import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaShareAlt, FaPlay } from 'react-icons/fa';

// Sample story data - now enhanced with more properties
const storiesData = [
  {
    id: 1,
    title: "Эпичная победа над Алаем",
    subtitle: "Матчдэй",
    description: "Ключевые моменты матча, где FC Dordoi вырвал победу на последних минутах.",
    image: "https://via.placeholder.com/800x1200?text=Match+Highlights",
    thumbnail: "https://via.placeholder.com/400x400?text=Match+Thumbnail",
    video: null,
    isNew: true,
    date: "05.05.2025"
  },
  {
    id: 2,
    title: "Тренировка с капитаном",
    subtitle: "За кулисами",
    description: "Эксклюзивные кадры тренировки с капитаном команды.",
    image: "https://via.placeholder.com/800x1200?text=Training+Session",
    thumbnail: "https://via.placeholder.com/400x400?text=Training+Thumbnail",
    video: "https://via.placeholder.com/800x1200?text=Training+Video",
    isNew: false,
    date: "03.05.2025"
  },
  {
    id: 3,
    title: "Новая форма 2025/26",
    subtitle: "Эксклюзив",
    description: "Презентация эксклюзивной формы FC Dordoi для нового сезона.",
    image: "https://via.placeholder.com/800x1200?text=New+Jersey",
    thumbnail: "https://via.placeholder.com/400x400?text=Jersey+Thumbnail",
    video: null,
    isNew: true,
    date: "02.05.2025"
  },
  {
    id: 4,
    title: "Фанаты на трибунах",
    subtitle: "Атмосфера",
    description: "Энергия болельщиков на последнем домашнем матче.",
    image: "https://via.placeholder.com/800x1200?text=Fans+Cheering",
    thumbnail: "https://via.placeholder.com/400x400?text=Fans+Thumbnail",
    video: "https://via.placeholder.com/800x1200?text=Fans+Video",
    isNew: false,
    date: "30.04.2025"
  },
  {
    id: 5,
    title: "Юные таланты академии",
    subtitle: "Следующее поколение",
    description: "Знакомство с будущими звездами FC Dordoi из нашей академии.",
    image: "https://via.placeholder.com/800x1200?text=Youth+Academy",
    thumbnail: "https://via.placeholder.com/400x400?text=Academy+Thumbnail",
    video: null,
    isNew: true,
    date: "28.04.2025"
  },
  {
    id: 6,
    title: "Интервью с тренером",
    subtitle: "Эксклюзив",
    description: "Главный тренер о планах на сезон и стратегии команды.",
    image: "https://via.placeholder.com/800x1200?text=Coach+Interview",
    thumbnail: "https://via.placeholder.com/400x400?text=Coach+Thumbnail",
    video: "https://via.placeholder.com/800x1200?text=Coach+Video",
    isNew: true,
    date: "25.04.2025"
  }
];

const StoriesPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const carouselRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 });

  // Auto advancing through stories when modal is open
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
      }, 50); // Faster progress for more responsive feel
    }
    return () => clearInterval(timer);
  }, [isModalOpen, currentIndex, autoplay]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      switch(e.key) {
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

  // Carousel navigation
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    
    const scrollAmount = direction === 'left' ? -280 : 280;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Update visible range
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
    // Enhanced share functionality
    const story = storiesData[currentIndex];
    const shareData = {
      title: `FC Dordoi: ${story.title}`,
      text: story.description,
      url: window.location.href
    };
    
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .catch(err => {
          console.error('Error sharing:', err);
          alert('Поделиться сторисом: ' + story.title);
        });
    } else {
      alert('Поделиться сторисом: ' + story.title);
    }
  };

  const handlePause = () => {
    setAutoplay(prev => !prev);
  };

  return (
    <section className="py-10 bg-gradient-to-b from-red-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-900" 
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
            DORDOI STORIES
          </h2>
          
          {/* Desktop navigation arrows */}
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
        
        {/* Carousel with improved design */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 space-x-4 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {storiesData.map((story, index) => (
            <motion.div
              key={story.id}
              className="story-card min-w-[260px] rounded-xl overflow-hidden shadow-lg cursor-pointer relative flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 25px rgba(0, 0, 100, 0.2)" 
              }}
              onClick={() => {
                setCurrentIndex(index);
                setIsModalOpen(true);
                setProgress(0);
                setAutoplay(true);
              }}
            >
              <div className="relative h-[320px]">
                <img
                  src={story.thumbnail || story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Card overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-80"></div>
                
                {/* Content positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="mb-2">
                    <span className="text-xs font-bold bg-blue-700 text-white px-2 py-1 rounded-sm">
                      {story.subtitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2 mb-1" 
                      style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-200">{story.date}</p>
                </div>
                
                {/* New indicator */}
                {story.isNew && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-sm">
                    NEW
                  </span>
                )}
                
                {/* Video indicator */}
                {story.video && (
                  <div className="absolute top-3 right-3 bg-blue-900 bg-opacity-70 p-2 rounded-full">
                    <FaPlay className="text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile navigation dots */}
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

        {/* Full-screen story modal with improved design */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-full max-w-4xl h-[85vh]">
                {/* Story progress bar */}
                <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
                  {storiesData.map((_, index) => (
                    <div key={index} className="flex-1 h-1 bg-gray-500 rounded-full overflow-hidden">
                      {index < currentIndex ? (
                        <div className="h-full w-full bg-white" />
                      ) : index === currentIndex ? (
                        <div 
                          className="h-full bg-white transition-all duration-100 ease-linear" 
                          style={{ width: `${progress}%` }} 
                        />
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
                  {storiesData[currentIndex].video ? (
                    <video
                      src={storiesData[currentIndex].video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={storiesData[currentIndex].image}
                      alt={storiesData[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8 text-white">
                    <div className="mb-3">
                      <span className="text-sm font-bold bg-blue-700 text-white px-3 py-1 rounded-sm">
                        {storiesData[currentIndex].subtitle}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2" 
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {storiesData[currentIndex].title}
                    </h2>
                    <p className="text-lg max-w-2xl" 
                       style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {storiesData[currentIndex].description}
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                      {storiesData[currentIndex].date}
                    </p>
                  </div>
                </motion.div>
                
                {/* Navigation controls */}
                <div 
                  className="absolute inset-0 flex items-center justify-between px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {currentIndex > 0 && (
                    <button
                      className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-4 rounded-full transition-all transform hover:scale-110"
                      onClick={handlePrev}
                      aria-label="Предыдущий сторис"
                    >
                      <FaArrowLeft size={20} />
                    </button>
                  )}
                  {currentIndex < storiesData.length - 1 && (
                    <button
                      className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-4 rounded-full transition-all transform hover:scale-110"
                      onClick={handleNext}
                      aria-label="Следующий сторис"
                    >
                      <FaArrowRight size={20} />
                    </button>
                  )}
                </div>
                
                {/* Control buttons */}
                <div className="absolute top-16 right-4 flex flex-col space-y-3">
                  <button
                    className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Закрыть"
                  >
                    <FaTimes size={18} />
                  </button>
                  <button
                    className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
                    onClick={handlePause}
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
                
                {/* Share button */}
                <button
                  className="absolute bottom-32 right-8 bg-blue-900 text-white p-3 rounded-full transition-all hover:bg-blue-800 hover:scale-110"
                  onClick={handleShare}
                  aria-label="Поделиться"
                >
                  <FaShareAlt size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StoriesPage;
