import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaShareAlt, FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const StoriesPage = () => {
  const [storiesData, setStoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [mediaProgress, setMediaProgress] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const carouselRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 });

  // Загрузка данных из API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('https://pavilionmb.pythonanywhere.com/api/histories');
        const formattedData = response.data.map(story => ({
          id: story.id,
          title: story.title,
          subtitle: "Матч", // Можно модифицировать в зависимости от данных API
          description: story.description,
          media: story.images.map(image => ({
            type: image.image.endsWith('.mp4') ? 'video' : 'image',
            url: image.image
          })),
          thumbnail: story.images.find(img => img.type === 'default')?.image || story.images[0]?.image,
          isNew: true, // Можно добавить логику для определения новых историй
          date: new Date().toLocaleDateString() // Можно использовать дату из API, если она есть
        }));
        setStoriesData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Автопрокрутка для модального окна
  useEffect(() => {
    let timer;
    if (isModalOpen && autoplay && storiesData.length > 0) {
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
  }, [isModalOpen, currentStoryIndex, currentMediaIndex, autoplay, storiesData]);

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen || storiesData.length === 0) return;
      
      const currentStory = storiesData[currentStoryIndex];
      
      switch (e.key) {
        case 'ArrowRight':
          if (currentMediaIndex < currentStory.media.length - 1) {
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
  }, [isModalOpen, currentStoryIndex, currentMediaIndex, storiesData]);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current || storiesData.length === 0) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    const newStart = Math.max(0, visibleRange.start + (direction === 'left' ? -1 : 1));
    const newEnd = Math.min(storiesData.length - 1, visibleRange.end + (direction === 'left' ? -1 : 1));
    if (newStart !== visibleRange.start || newEnd !== visibleRange.end) {
      setVisibleRange({ start: newStart, end: newEnd });
    }
  };

  const handleShare = () => {
    if (storiesData.length === 0) return;
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

  if (loading) {
    return <div className="text-center py-20">Загрузка историй...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Ошибка загрузки: {error}</div>;
  }

  if (storiesData.length === 0) {
    return <div className="text-center py-20">Нет доступных историй</div>;
  }

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
       
        <AnimatePresence>
          {isModalOpen && (
            
            <StoryModal
              isOpen={isModalOpen} // Добавляем пропс isOpen
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
// Компоненты StoryCard и StoryModal остаются без изменений
// (они уже правильно работают с полученными данными)

const StoryCard = ({ story, onClick }) => (
  <div
  className="min-w-[260px] rounded-xl overflow-hidden shadow-lg cursor-pointer relative flex-shrink-0 transform hover:scale-105 transition-transform"
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
  </div>
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
  setAutoplay,
  isOpen
}) => {
  const story = stories[currentStoryIndex];
  const media = story.media[currentMediaIndex];
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(5);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Начинаем с muted по умолчанию
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  // Обработчик изменения медиа
  useEffect(() => {
    setVideoError(false);
    setIsVideoLoading(media.type === 'video');
    setIsMuted(true); // Сбрасываем на muted при смене медиа
    
    if (media.type === 'video' && videoRef.current) {
      const video = videoRef.current;
      video.muted = true; // Начинаем с выключенного звука
      video.load();
      
      const handleLoadedMetadata = () => {
        setVideoDuration(video.duration || 5);
        setIsVideoLoading(false);
      };
      
      const handleError = () => {
        setVideoError(true);
        setIsVideoLoading(false);
      };
      
      const handleEnded = () => {
        onNextMedia();
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentStoryIndex, currentMediaIndex, media]);

  // Автопрогресс для видео/изображений
useEffect(() => {
  let timer;
  const isVideo = media.type === 'video';
  
  // Для видео используем реальную длительность, для изображений - 5 секунд
  const duration = isVideo ? (videoDuration > 0 ? videoDuration * 1000 : 5000) : 5000;

  if (isOpen && autoplay && !isVideoLoading && !videoError) {
    const startTime = Date.now();
    
    timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setMediaProgress(progress);
      
      if (progress >= 100) {
        clearInterval(timer);
        if (currentMediaIndex < story.media.length - 1) {
          onNextMedia();
        } else if (currentStoryIndex < stories.length - 1) {
          onNextStory();
        } else {
          onClose();
        }
      }
    }, 50);
  }

  return () => {
    if (timer) clearInterval(timer);
  };
}, [
  isOpen,
  autoplay,
  currentMediaIndex,
  currentStoryIndex,
  isVideoLoading,
  videoError,
  videoDuration,
  media.type // Добавляем зависимость от типа медиа
]);

  // Управление видео
  const handleVideoPlayback = () => {
    if (media.type !== 'video') return;
    
    if (autoplay) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play().catch(e => {
        setVideoError(true);
      });
    }
    setAutoplay(!autoplay);
  };

  // Управление звуком
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Изменение громкости
  const handleVolumeChange = (e) => {
    if (videoRef.current) {
      videoRef.current.volume = e.target.value;
      setIsMuted(e.target.value == 0);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-4xl h-[85vh]">
        {/* Прогресс-бар для всего сториса */}
        <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
          {stories.map((_, idx) => (
            <div key={idx} className="flex-1 h-1 bg-gray-500 rounded-full overflow-hidden">
              {idx < currentStoryIndex ? (
                <div className="h-full w-full bg-white" />
              ) : idx === currentStoryIndex ? (
                <div className="h-full bg-white transition-all duration-100 ease-linear" 
                  style={{ width: `${storyProgress}%` }} />
              ) : (
                <div className="h-full w-0 bg-white" />
              )}
            </div>
          ))}
        </div>

        {/* Прогресс-бар для текущего медиа */}
        <div className="absolute top-8 left-4 right-4 z-20 flex space-x-1">
          {story.media.map((_, idx) => (
            <div key={idx} className="flex-1 h-0.5 bg-gray-600 rounded-full overflow-hidden">
              {idx < currentMediaIndex ? (
                <div className="h-full w-full bg-blue-400" />
              ) : idx === currentMediaIndex ? (
                <div className="h-full bg-blue-400 transition-all duration-100 ease-linear" 
                  style={{ width: `${mediaProgress}%` }} />
              ) : (
                <div className="h-full w-0 bg-blue-400" />
              )}
            </div>
          ))}
        </div>

        {/* Контент */}
        <motion.div
          className="h-full rounded-xl overflow-hidden relative"
          key={`${currentStoryIndex}-${currentMediaIndex}`}
          initial={{ opacity: 0.8, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {media.type === 'video' ? (
            <>
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                  Ошибка загрузки видео
                </div>
              )}
              <video
                ref={videoRef}
                src={media.url}
                autoPlay={autoplay}
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setAutoplay(true)}
                onPause={() => setAutoplay(false)}
                onWaiting={() => setIsVideoLoading(true)}
                onPlaying={() => setIsVideoLoading(false)}
              />
            </>
          ) : (
            <img
              src={media.url}
              alt={story.title}
              className="w-full h-full object-cover"
              onLoad={() => setMediaProgress(0)}
              onError={() => setVideoError(true)}
            />
          )}

          {/* Оверлей с информацией */}
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

        {/* Навигация */}
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

        {/* Управление */}
        <div className="absolute top-16 right-4 flex flex-col space-y-3">
          <button
            className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <FaTimes size={18} />
          </button>
          
          {/* Кнопка звука */}
          {media.type === 'video' && (
            <div className="relative">
              <button
                className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
                onClick={toggleMute}
                aria-label={isMuted ? "Включить звук" : "Выключить звук"}
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343" />
                  </svg>
                )}
              </button>
              
              {showVolumeControl && (
                <div className="absolute right-12 top-0 bg-blue-900/90 p-3 rounded-lg">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    defaultValue={isMuted ? 0 : 1}
                    onChange={handleVolumeChange}
                    className="w-24 h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Кнопка паузы */}
          <button
            className="bg-blue-900/50 hover:bg-blue-900/80 text-white p-3 rounded-full transition-all"
            onClick={handleVideoPlayback}
            aria-label={autoplay ? "Пауза" : "Продолжить"}
            disabled={media.type !== 'video' || videoError}
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

        {/* Кнопка поделиться */}
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