import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaShareAlt, FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StoryCard = ({ story, onClick }) => (
  <motion.div
    className="min-w-[260px] rounded-xl overflow-hidden shadow-lg cursor-pointer relative flex-shrink-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.04 }}
    onClick={onClick}
  >
    <div className="relative h-[320px]">
      <img
        src={story.thumbnail || story.media[0]?.url}
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
      {story.media.some(item => item.type === 'video') && (
        <div className="absolute top-3 right-3 bg-blue-900 bg-opacity-70 p-2 rounded-full z-10">
          <FaPlay className="text-white" />
        </div>
      )}
    </div>
  </motion.div>
);

const StoryModal = ({
  stories,
  currentStoryIndex,
  currentMediaIndex,
  storyProgress,
  mediaProgress,
  onPrevStory,
  onNextStory,
  onPrevMedia,
  onNextMedia,
  onClose,
  onShare,
  onPause,
  autoplay,
  setAutoplay
}) => {
  const story = stories[currentStoryIndex];
  const media = story.media[currentMediaIndex];

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-4xl h-[85vh]">
        {/* Story Progress Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
          {stories.map((_, idx) => (
            <div key={idx} className="flex-1 h-1 bg-gray-500 rounded-full overflow-hidden">
              {idx < currentStoryIndex ? (
                <div className="h-full w-full bg-white" />
              ) : idx === currentStoryIndex ? (
                <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${storyProgress}%` }} />
              ) : (
                <div className="h-full w-0 bg-white" />
              )}
            </div>
          ))}
        </div>
        {/* Media Progress Bar */}
        <div className="absolute top-8 left-4 right-4 z-20 flex space-x-1">
          {story.media.map((_, idx) => (
            <div key={idx} className="flex-1 h-0.5 bg-gray-600 rounded-full overflow-hidden">
              {idx < currentMediaIndex ? (
                <div className="h-full w-full bg-blue-400" />
              ) : idx === currentMediaIndex ? (
                <div className="h-full bg-blue-400 transition-all duration-100 ease-linear" style={{ width: `${mediaProgress}%` }} />
              ) : (
                <div className="h-full w-0 bg-blue-400" />
              )}
            </div>
          ))}
        </div>
        {/* Story Content */}
        <motion.div
          className="h-full rounded-xl overflow-hidden"
          key={`${currentStoryIndex}-${currentMediaIndex}`}
          initial={{ opacity: 0.8, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {media.type === 'video' ? (
            <video
              src={media.url}
              autoPlay={autoplay}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={media.url}
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
          {(currentStoryIndex > 0 || currentMediaIndex > 0) && (
            <button
              className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-4 rounded-full transition-all transform hover:scale-110"
              onClick={currentMediaIndex > 0 ? onPrevMedia : onPrevStory}
              aria-label="Предыдущий элемент"
            >
              <FaArrowLeft size={20} />
            </button>
          )}
          {(currentStoryIndex < stories.length - 1 || currentMediaIndex < story.media.length - 1) && (
            <button
              className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-4 rounded-full transition-all transform hover:scale-110"
              onClick={currentMediaIndex < story.media.length - 1 ? onNextMedia : onNextStory}
              aria-label="Следующий элемент"
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

const storiesData = [
  {
    id: 1,
    title: "Эпичная победа над Алаем",
    subtitle: "Матчдэй",
    description: "Ключевые моменты матча, где FC Dordoi вырвал победу на последних минутах.",
    media: [
      { type: 'image', url: "https://via.placeholder.com/800x1200?text=Match+Highlight+1" },
      { type: 'video', url: "https://via.placeholder.com/800x1200?text=Match+Video" },
      { type: 'image', url: "https://via.placeholder.com/800x1200?text=Match+Highlight+2" }
    ],
    thumbnail: "https://via.placeholder.com/400x400?text=Match+Thumbnail",
    isNew: true,
    date: "05.05.2025"
  },
  {
    id: 2,
    title: "Тренировка с капитаном",
    subtitle: "За кулисами",
    description: "Эксклюзивные кадры тренировки с капитаном команды.",
    media: [
      { type: 'video', url: "https://via.placeholder.com/800x1200?text=Training+Video" },
      { type: 'image', url: "https://via.placeholder.com/800x1200?text=Training+Image" }
    ],
    thumbnail: "https://via.placeholder.com/400x400?text=Training+Thumbnail",
    isNew: false,
    date: "03.05.2025"
  },
  {
    id: 3,
    title: "Новая форма 2025/26",
    subtitle: "Эксклюзив",
    description: "Презентация эксклюзивной формы FC Dordoi для нового сезона.",
    media: [
      { type: 'image', url: "https://via.placeholder.com/800x1200?text=Jersey+Image+1" },
      { type: 'image', url: "https://via.placeholder.com/800x1200?text=Jersey+Image+2" },
      { type: 'video', url: "https://via.placeholder.com/800x1200?text=Jersey+Video" }
    ],
    thumbnail: "https://via.placeholder.com/400x400?text=Jersey+Thumbnail",
    isNew: true,
    date: "02.05.2025"
  },
  {
    id: 4,
    title: "Фанаты на трибунах",
    subtitle: "Атмосфера",
    description: "Энергия болельщиков на последнем домашнем матче.",
    media: [
      { type: 'video', url: "https://via.placeholder.com/800x1200?text=Fans+Video" },
      { type: 'image', url: "https://via.placeholder.com/800x1200?text=Fans+Image" }
    ],
    thumbnail: "https://via.placeholder.com/400x400?text=Fans+Thumbnail",
    isNew: false,
    date: "30.04.2025"
  },
  {
    id: 5,
    title: "Юные таланты академии",
    subtitle: "Следующее поколение",
    description: "Знакомство с будущими звездами FC Dordoi из нашей академии.",
    media: [
      { type: 'image', url: "https://via.placeholder.com/800x1200?text=Academy+Image+1" },
      { type: 'image', url: "https://via.placeholder.com/800x1200?text=Academy+Image+2" }
    ],
    thumbnail: "https://via.placeholder.com/400x400?text=Academy+Thumbnail",
    isNew: true,
    date: "28.04.2025"
  },
  {
    id: 6,
    title: "Интервью с тренером",
    subtitle: "Эксклюзив",
    description: "Главный тренер о планах на сезон и стратегии команды.",
    media: [
      { type: 'video', url: "https://via.placeholder.com/800x1200?text=Coach+Video" },
      { type: 'image', url: "https://via.placeholder.com/800x1200?text=Coach+Image" }
    ],
    thumbnail: "https://via.placeholder.com/400x400?text=Coach+Thumbnail",
    isNew: true,
    date: "25.04.2025"
  }
];

const StoriesPage = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [mediaProgress, setMediaProgress] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const carouselRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 });

  useEffect(() => {
    let timer;
    if (isModalOpen && autoplay) {
      timer = setInterval(() => {
        setMediaProgress(prev => {
          if (prev >= 100) {
            const currentStory = storiesData[currentStoryIndex];
            if (currentMediaIndex < currentStory.media.length - 1) {
              setCurrentMediaIndex(currentMediaIndex + 1);
              return 0;
            } else {
              if (currentStoryIndex < storiesData.length - 1) {
                setCurrentStoryIndex(currentStoryIndex + 1);
                setCurrentMediaIndex(0);
                setStoryProgress(0);
                return 0;
              } else {
                setIsModalOpen(false);
                return 0;
              }
            }
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isModalOpen, currentStoryIndex, currentMediaIndex, autoplay]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      switch (e.key) {
        case 'ArrowRight':
          if (currentMediaIndex < storiesData[currentStoryIndex].media.length - 1) {
            setCurrentMediaIndex(currentMediaIndex + 1);
            setMediaProgress(0);
          } else if (currentStoryIndex < storiesData.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            setCurrentMediaIndex(0);
            setStoryProgress(0);
            setMediaProgress(0);
          }
          break;
        case 'ArrowLeft':
          if (currentMediaIndex > 0) {
            setCurrentMediaIndex(currentMediaIndex - 1);
            setMediaProgress(0);
          } else if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
            setCurrentMediaIndex(storiesData[currentStoryIndex - 1].media.length - 1);
            setStoryProgress(0);
            setMediaProgress(0);
          }
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
  }, [isModalOpen, currentStoryIndex, currentMediaIndex]);

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

  const handleShare = () => {
    const story = storiesData[currentStoryIndex];
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
    <section id='storiesPage' className="py-10 bg-gradient-to-b from-blue-50 to-yellow-50">
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
                setCurrentStoryIndex(index);
                setCurrentMediaIndex(0);
                setIsModalOpen(true);
                setStoryProgress(0);
                setMediaProgress(0);
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
              currentStoryIndex={currentStoryIndex}
              currentMediaIndex={currentMediaIndex}
              storyProgress={storyProgress}
              mediaProgress={mediaProgress}
              onPrevStory={() => {
                if (currentStoryIndex > 0) {
                  setCurrentStoryIndex(currentStoryIndex - 1);
                  setCurrentMediaIndex(storiesData[currentStoryIndex - 1].media.length - 1);
                  setStoryProgress(0);
                  setMediaProgress(0);
                }
              }}
              onNextStory={() => {
                if (currentStoryIndex < storiesData.length - 1) {
                  setCurrentStoryIndex(currentStoryIndex + 1);
                  setCurrentMediaIndex(0);
                  setStoryProgress(0);
                  setMediaProgress(0);
                } else {
                  setIsModalOpen(false);
                }
              }}
              onPrevMedia={() => {
                if (currentMediaIndex > 0) {
                  setCurrentMediaIndex(currentMediaIndex - 1);
                  setMediaProgress(0);
                }
              }}
              onNextMedia={() => {
                if (currentMediaIndex < storiesData[currentStoryIndex].media.length - 1) {
                  setCurrentMediaIndex(currentMediaIndex + 1);
                  setMediaProgress(0);
                }
              }}
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