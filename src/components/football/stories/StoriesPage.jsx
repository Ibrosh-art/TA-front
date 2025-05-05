import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, FaArrowRight, FaTimes, FaShareAlt, FaPlay, 
  FaBookmark, FaRegBookmark, FaVolumeUp, FaVolumeMute,
  FaFilter, FaHeart, FaRegHeart, FaEllipsisH
} from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

// Enhanced story data with categories and more fields
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
    date: "05.05.2025",
    category: "matchday",
    views: 1245,
    likes: 87,
    isLiked: false,
    isBookmarked: false
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
    date: "03.05.2025",
    category: "backstage",
    views: 982,
    likes: 56,
    isLiked: false,
    isBookmarked: false
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
    date: "02.05.2025",
    category: "exclusive",
    views: 1567,
    likes: 124,
    isLiked: false,
    isBookmarked: false
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
    date: "30.04.2025",
    category: "fans",
    views: 876,
    likes: 62,
    isLiked: false,
    isBookmarked: false
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
    date: "28.04.2025",
    category: "academy",
    views: 723,
    likes: 47,
    isLiked: false,
    isBookmarked: false
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
    date: "25.04.2025",
    category: "exclusive",
    views: 1032,
    likes: 79,
    isLiked: false,
    isBookmarked: false
  }
];

// Vertical clips data for TikTok-style experience
const clipsData = [
  {
    id: 1,
    title: "Гол в ворота Алая",
    description: "Решающий гол в матче с ФК Алай",
    video: "https://via.placeholder.com/400x720?text=Goal+Video",
    thumbnail: "https://via.placeholder.com/400x720?text=Goal+Thumbnail",
    duration: "0:24",
    date: "05.05.2025",
    views: 2456,
    isNew: true
  },
  {
    id: 2,
    title: "Финт капитана",
    description: "Невероятный финт нашего капитана на тренировке",
    video: "https://via.placeholder.com/400x720?text=Skills+Video",
    thumbnail: "https://via.placeholder.com/400x720?text=Skills+Thumbnail",
    duration: "0:18",
    date: "03.05.2025",
    views: 1876,
    isNew: true
  },
  {
    id: 3,
    title: "Сейв вратаря",
    description: "Фантастический сейв нашего голкипера",
    video: "https://via.placeholder.com/400x720?text=Save+Video",
    thumbnail: "https://via.placeholder.com/400x720?text=Save+Thumbnail",
    duration: "0:15",
    date: "01.05.2025",
    views: 1543,
    isNew: false
  },
  {
    id: 4,
    title: "Празднование победы",
    description: "Как команда отмечала важную победу в раздевалке",
    video: "https://via.placeholder.com/400x720?text=Celebration+Video",
    thumbnail: "https://via.placeholder.com/400x720?text=Celebration+Thumbnail",
    duration: "0:32",
    date: "30.04.2025",
    views: 1987,
    isNew: false
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'Все' },
  { id: 'matchday', name: 'Матчдэй' },
  { id: 'backstage', name: 'За кулисами' },
  { id: 'exclusive', name: 'Эксклюзив' },
  { id: 'training', name: 'Тренировки' },
  { id: 'fans', name: 'Фанаты' },
  { id: 'academy', name: 'Академия' }
];

const StoriesPage = () => {
  // Core state variables
  const [stories, setStories] = useState(storiesData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  // New feature state variables
  const [activeTab, setActiveTab] = useState('stories'); // 'stories' or 'clips'
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCategories, setShowCategories] = useState(false);
  const [likedStories, setLikedStories] = useState([]);
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [isClipModalOpen, setIsClipModalOpen] = useState(false);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  
  // Refs
  const carouselRef = useRef(null);
  const clipsCarouselRef = useRef(null);
  const videoRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 });
  const [clipsVisibleRange, setClipsVisibleRange] = useState({ start: 0, end: 3 });
  
  // Filtered stories based on active category
  const filteredStories = activeCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === activeCategory);

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
      if (!isModalOpen && !isClipModalOpen) return;
      
      if (isModalOpen) {
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
      } else if (isClipModalOpen) {
        switch(e.key) {
          case 'ArrowUp':
          case 'ArrowLeft':
            handlePrevClip();
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            handleNextClip();
            break;
          case 'Escape':
            setIsClipModalOpen(false);
            break;
          case 'm':
            setIsMuted(prev => !prev);
            break;
          default:
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isClipModalOpen, currentIndex, currentClipIndex]);

  // Update video muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, videoRef.current, currentClipIndex, isClipModalOpen]);

  // Swipe handlers for stories
  const storySwipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    onSwipedUp: () => setIsModalOpen(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  // Swipe handlers for clips
  const clipSwipeHandlers = useSwipeable({
    onSwipedUp: () => handlePrevClip(),
    onSwipedDown: () => handleNextClip(),
    onSwipedLeft: () => setIsClipModalOpen(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  // Stories carousel navigation
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    
    const scrollAmount = direction === 'left' ? -280 : 280;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Update visible range
    const newStart = Math.max(0, visibleRange.start + (direction === 'left' ? -1 : 1));
    const newEnd = Math.min(filteredStories.length - 1, visibleRange.end + (direction === 'left' ? -1 : 1));
    
    if (newStart !== visibleRange.start || newEnd !== visibleRange.end) {
      setVisibleRange({ start: newStart, end: newEnd });
    }
  };

  // Clips carousel navigation
  const scrollClipsCarousel = (direction) => {
    if (!clipsCarouselRef.current) return;
    
    const scrollAmount = direction === 'left' ? -220 : 220;
    clipsCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Update visible range
    const newStart = Math.max(0, clipsVisibleRange.start + (direction === 'left' ? -1 : 1));
    const newEnd = Math.min(clipsData.length - 1, clipsVisibleRange.end + (direction === 'left' ? -1 : 1));
    
    if (newStart !== clipsVisibleRange.start || newEnd !== clipsVisibleRange.end) {
      setClipsVisibleRange({ start: newStart, end: newEnd });
    }
  };

  // Story navigation
  const handleNext = () => {
    if (currentIndex < filteredStories.length - 1) {
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

  // Clip navigation
  const handleNextClip = () => {
    if (currentClipIndex < clipsData.length - 1) {
      setCurrentClipIndex(currentClipIndex + 1);
    } else {
      setIsClipModalOpen(false);
    }
  };

  const handlePrevClip = () => {
    if (currentClipIndex > 0) {
      setCurrentClipIndex(currentClipIndex - 1);
    }
  };

  // Share functionality
  const handleShare = () => {
    const story = filteredStories[currentIndex];
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

  // Share clip functionality
  const handleShareClip = () => {
    const clip = clipsData[currentClipIndex];
    const shareData = {
      title: `FC Dordoi Clip: ${clip.title}`,
      text: clip.description,
      url: window.location.href
    };
    
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .catch(err => {
          console.error('Error sharing:', err);
          alert('Поделиться клипом: ' + clip.title);
        });
    } else {
      alert('Поделиться клипом: ' + clip.title);
    }
  };

  // Toggle like/bookmark functionality
  const toggleLike = (storyId) => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { 
            ...story, 
            isLiked: !story.isLiked,
            likes: story.isLiked ? story.likes - 1 : story.likes + 1
          } 
        : story
    ));
    
    if (likedStories.includes(storyId)) {
      setLikedStories(likedStories.filter(id => id !== storyId));
    } else {
      setLikedStories([...likedStories, storyId]);
    }
    
    // Visual feedback for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const toggleBookmark = (storyId) => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, isBookmarked: !story.isBookmarked } 
        : story
    ));
    
    if (bookmarkedStories.includes(storyId)) {
      setBookmarkedStories(bookmarkedStories.filter(id => id !== storyId));
    } else {
      setBookmarkedStories([...bookmarkedStories, storyId]);
    }
    
    // Visual feedback for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handlePause = () => {
    setAutoplay(prev => !prev);
  };

  return (
    <section className="py-10 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        {/* Top section with title and tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4 md:mb-0" 
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
            DORDOI STORIES
          </h2>
          
          {/* Tabs for Stories and Clips */}
          <div className="flex space-x-2 border-b border-blue-200 pb-2">
            <button
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'stories' 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
              onClick={() => setActiveTab('stories')}
            >
              Stories
            </button>
            <button
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'clips' 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
              onClick={() => setActiveTab('clips')}
            >
              Clips
            </button>
          </div>
        </div>
        
        {/* Stories View */}
        {activeTab === 'stories' && (
          <>
            {/* Categories filter */}
            <div className="mb-6 relative">
              <div className="flex items-center mb-2">
                <button
                  className="flex items-center mr-4 bg-blue-900 text-white px-3 py-2 rounded-md hover:bg-blue-800 transition-colors"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  <FaFilter className="mr-2" />
                  <span>Фильтр</span>
                </button>
                <div className="text-blue-900 font-bold">
                  {categories.find(cat => cat.id === activeCategory)?.name || 'Все'}
                </div>
              </div>
              
              {/* Categories dropdown */}
              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    className="absolute left-0 z-20 bg-white shadow-lg rounded-md overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2 grid grid-cols-2 gap-1">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          className={`px-4 py-2 text-left rounded ${
                            activeCategory === category.id
                              ? 'bg-blue-900 text-white'
                              : 'bg-gray-50 text-blue-900 hover:bg-gray-100'
                          }`}
                          onClick={() => {
                            setActiveCategory(category.id);
                            setShowCategories(false);
                          }}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Stories section with navigation arrows */}
            <div className="relative">
              {/* Desktop navigation arrows */}
              <div className="hidden md:flex justify-end space-x-2 mb-4">
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
              
              {/* Stories carousel */}
              <div 
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 space-x-4 pb-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredStories.map((story, index) => (
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
                        loading="lazy"
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
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-200">{story.date}</p>
                          <p className="text-sm text-gray-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            {story.views.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      {/* New indicator */}
                      {story.isNew && (
                        <span className="absolute top-3 left-3 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-sm z-10">
                          NEW
                        </span>
                      )}
                      
                      {/* Video indicator */}
                      {story.video && (
                        <div className="absolute top-3 right-3 bg-blue-900 bg-opacity-70 p-2 rounded-full z-10">
                          <FaPlay className="text-white" />
                        </div>
                      )}
                      
                      {/* Like and Bookmark buttons */}
                      <div className="absolute top-14 right-3 flex flex-col space-y-2 z-10">
                        <button
                          className="bg-blue-900 bg-opacity-70 p-2 rounded-full text-white hover:bg-blue-800 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(story.id);
                          }}
                          aria-label={story.isLiked ? "Убрать лайк" : "Поставить лайк"}
                        >
                          {story.isLiked ? <FaHeart /> : <FaRegHeart />}
                        </button>
                        <button
                          className="bg-blue-900 bg-opacity-70 p-2 rounded-full text-white hover:bg-blue-800 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(story.id);
                          }}
                          aria-label={story.isBookmarked ? "Убрать из закладок" : "Добавить в закладки"}
                        >
                          {story.isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Empty state when no stories match the filter */}
                {filteredStories.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center py-20 text-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-xl font-bold mb-2">Нет историй в этой категории</p>
                    <p className="text-gray-600 text-center max-w-md">Выберите другую категорию или вернитесь позже для новых историй</p>
                  </div>
                )}
              </div>
              
              {/* Mobile navigation dots */}
              <div className="flex justify-center mt-4 md:hidden">
                {Array.from({ length: Math.ceil(filteredStories.length / 3) }).map((_, index) => (
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
            </div>
          </>
        )}

        {/* Clips View */}
        {activeTab === 'clips' && (
          <div className="relative">
            {/* Desktop navigation arrows for clips */}
            <div className="hidden md:flex justify-end space-x-2 mb-4">
              <button 
                className="bg-blue-900 text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
                onClick={() => scrollClipsCarousel('left')}
                aria-label="Предыдущие клипы"
              >
                <FaArrowLeft />
              </button>
              <button 
                className="bg-blue-900 text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
                onClick={() => scrollClipsCarousel('right')}
                aria-label="Следующие клипы"
              >
                <FaArrowRight />
              </button>
            </div>
            
            {/* Clips carousel */}
            <div 
              ref={clipsCarouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 space-x-4 pb-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {clipsData.map((clip, index) => (
                <motion.div
                  key={clip.id}
                  className="clip-card min-w-[200px] rounded-xl overflow-hidden shadow-lg cursor-pointer relative flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 10px 25px rgba(0, 0, 100, 0.2)" 
                  }}
                  onClick={() => {
                    setCurrentClipIndex(index);
                    setIsClipModalOpen(true);
                    setIsMuted(false);
                  }}
                >
                  <div className="relative h-[360px]">
                    <img
                      src={clip.thumbnail}
                      alt={clip.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <div className="bg-blue-900 bg-opacity-90 p-4 rounded-full">
                        <FaPlay className="text-white text-xl" />
                      </div>
                    </div>
                    
                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 px-2 py-1 rounded-sm">
                      <span className="text-white text-xs font-bold">{clip.duration}</span>
                    </div>
                    
                    {/* Title and views */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {clip.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-300">{clip.date}</p>
                        <p className="text-xs text-gray-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          {clip.views.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* New indicator */}
                    {clip.isNew && (
                      <span className="absolute top-3 left-3 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-sm">
                        NEW
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile navigation dots */}
            <div className="flex justify-center mt-4 md:hidden">
              {Array.from({ length: Math.ceil(clipsData.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    index === Math.floor(clipsVisibleRange.start / 3) ? 'bg-blue-900' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    if (clipsCarouselRef.current) {
                      clipsCarouselRef.current.scrollTo({ 
                        left: index * (220 * 3), 
                        behavior: 'smooth' 
                      });
                    }
                  }}
                  aria-label={`Перейти к клипам ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Story Full-screen Modal */}
        <AnimatePresence>
          {isModalOpen && filteredStories.length > 0 && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...storySwipeHandlers}
            >
              <div className="relative w-full max-w-4xl h-[85vh]">
                {/* Story progress bar */}
                <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
                  {filteredStories.map((_, index) => (
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
                  {filteredStories[currentIndex].video ? (
                    <video
                      ref={videoRef}
                      src={filteredStories[currentIndex].video}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={filteredStories[currentIndex].image}
                      alt={filteredStories[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8 text-white">
                    <div className="mb-3">
                      <span className="text-sm font-bold bg-blue-700 text-white px-3 py-1 rounded-sm">
                        {filteredStories[currentIndex].subtitle}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2" 
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {filteredStories[currentIndex].title}
                    </h2>
                    <p className="text-lg max-w-2xl" 
                       style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {filteredStories[currentIndex].description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-gray-300">
                        {filteredStories[currentIndex].date}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <button
                            className={`text-white p-2 rounded-full transition-all ${
                              filteredStories[currentIndex].isLiked ? 'text-yellow-400' : 'text-white'
                            }`}
                            onClick={() => toggleLike(filteredStories[currentIndex].id)}
                            aria-label={filteredStories[currentIndex].isLiked ? "Убрать лайк" : "Поставить лайк"}
                          >
                            {filteredStories[currentIndex].isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                          </button>
                          <span className="ml-1">{filteredStories[currentIndex].likes}</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span>{filteredStories[currentIndex].views}</span>
                        </div>
                      </div>
                    </div>
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
                  {currentIndex < filteredStories.length - 1 && (
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
                  {filteredStories[currentIndex].video && (
                    <button
                      className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
                      onClick={() => setIsMuted(!isMuted)}
                      aria-label={isMuted ? "Включить звук" : "Выключить звук"}
                    >
                      {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                    </button>
                  )}
                  <button
                    className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
                    onClick={() => toggleBookmark(filteredStories[currentIndex].id)}
                    aria-label={filteredStories[currentIndex].isBookmarked ? "Убрать из закладок" : "Добавить в закладки"}
                  >
                    {filteredStories[currentIndex].isBookmarked ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
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

        {/* Clips Full-screen Modal - TikTok style */}
        <AnimatePresence>
          {isClipModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...clipSwipeHandlers}
            >
              <div className="relative w-full h-full max-w-md mx-auto">
                {/* Video content */}
                <motion.div
                  className="h-full"
                  key={currentClipIndex}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <video
                    ref={videoRef}
                    src={clipsData[currentClipIndex].video}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    playsInline
                    controls={false}
                    onClick={() => setIsMuted(!isMuted)}
                  />
                  
                  {/* Control overlay */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                    <button
                      className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
                      onClick={() => setIsClipModalOpen(false)}
                      aria-label="Закрыть"
                    >
                      <FaTimes size={18} />
                    </button>
                    <button
                      className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
                      onClick={() => setIsMuted(!isMuted)}
                      aria-label={isMuted ? "Включить звук" : "Выключить звук"}
                    >
                      {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                    </button>
                  </div>
                  
                  {/* Right-side interactive buttons (similar to TikTok) */}
                  <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6">
                    <button className="text-white flex flex-col items-center">
                      <div className="bg-blue-900/50 p-3 rounded-full mb-1">
                        <FaHeart size={24} />
                      </div>
                      <span className="text-xs">12.5K</span>
                    </button>
                    <button className="text-white flex flex-col items-center" onClick={handleShareClip}>
                      <div className="bg-blue-900/50 p-3 rounded-full mb-1">
                        <FaShareAlt size={24} />
                      </div>
                      <span className="text-xs">Поделиться</span>
                    </button>
                  </div>
                  
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {clipsData[currentClipIndex].title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
                      {clipsData[currentClipIndex].description}
                    </p>
                    <div className="flex justify-between items-center mb-8">
                      <p className="text-sm text-gray-300">{clipsData[currentClipIndex].date}</p>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{clipsData[currentClipIndex].views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation dots */}
                  <div className="absolute bottom-24 left-0 right-0 flex justify-center space-x-1 px-4">
                    {clipsData.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentClipIndex ? 'bg-yellow-400' : 'bg-gray-500'
                        }`}
                        onClick={() => setCurrentClipIndex(index)}
                        aria-label={`Перейти к клипу ${index + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
                
                {/* Swipe navigation areas */}
                <div className="absolute inset-y-0 left-0 w-1/3" onClick={handlePrevClip}></div>
                <div className="absolute inset-y-0 right-0 w-1/3" onClick={handleNextClip}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StoriesPage;
