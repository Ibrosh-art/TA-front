import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiCalendar, FiShare2 } from 'react-icons/fi';
import '../components/NewCarusel.css';

const articles = [
  {
    id: 1,
    title: "Запуск новой лаборатории VR-разработки",
    date: "15 октября 2023",
    excerpt: "Студенты получили доступ к оборудованию нового поколения для создания иммерсивных проектов",
    category: "Технологии",
    image: "https://www.marketresearchintellect.com/images/blogs/ar-vr-software-transforming-entertainment-education-and-beyond.webp"
  },
  {
    id: 2,
    title: "Международная конференция по дизайну",
    date: "28 октября 2023",
    excerpt: "Ведущие мировые дизайнеры проведут мастер-классы для наших студентов",
    category: "Дизайн",
    image: "https://media.licdn.com/dms/image/v2/C5612AQEP9xYjKJm8NA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1591210411766?e=2147483647&v=beta&t=hT-uzDBxyV8tddlNjINxCxz_fAA_0TkwqjYvi039CS4"
  },
  {
    id: 3,
    title: "Прорыв в генетических исследованиях",
    date: "5 ноября 2023",
    excerpt: "Научная группа университета опубликовала революционное исследование в Nature",
    category: "Наука",
    image: "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg?semt=ais_hybrid&w=740"
  }
];

const NewsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrent(prev => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent(prev => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Автопрокрутка
  useEffect(() => {
    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, isHovered]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    })
  };

  return (
    <div 
      className="creative-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="carousel-header">
        <span className="header-highlight">Актуальные</span> события
      </h2>

      <div className="carousel-container">
        <motion.button 
          className="nav-btn prev"
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowLeft size={24} />
        </motion.button>

        <div className="slider-wrapper">
          <AnimatePresence custom={direction} initial={false}>
            <motion.article
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="news-card"
            >
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${articles[current].image})` }}
              >
                <span className="category-badge">
                  {articles[current].category}
                </span>
              </div>
              
              <div className="card-content">
                <div className="meta-data">
                  <FiCalendar className="meta-icon" />
                  <span>{articles[current].date}</span>
                </div>
                
                <h3 className="card-title">{articles[current].title}</h3>
                <p className="card-excerpt">{articles[current].excerpt}</p>
                
                <div className="card-actions">
                  <motion.button 
                    className="read-btn"
                    whileHover={{ x: 5 }}
                  >
                    Читать полностью
                  </motion.button>
                  <button className="share-btn">
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <motion.button 
          className="nav-btn next"
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowRight size={24} />
        </motion.button>
      </div>

      <div className="pagination">
        {articles.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === current ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsCarousel;