import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import "./Feat.css";

export const BentoTilt = ({ children, className = "", intensity = 10 }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = window.innerWidth < 768;

  const handleMouseMove = (event) => {
    if (!itemRef.current || isMobile || prefersReducedMotion) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * intensity;
    const tiltY = (relativeX - 0.5) * -intensity;

    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransformStyle(newTransform);
    
    controls.start({
      boxShadow: `${tiltY * -5}px ${tiltX * 5}px 30px rgba(100, 111, 226, 0.3)`,
      transition: { duration: 0.3 }
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setTransformStyle("");
    controls.start({
      boxShadow: "0px 0px 0px rgba(100, 111, 226, 0)",
      transition: { duration: 0.5 }
    });
  };

  return (
    <motion.div
      ref={itemRef}
      className={`${className} bento-tilt-container`}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      style={{ transform: prefersReducedMotion ? undefined : transformStyle }}
      animate={controls}
      initial={{ boxShadow: "0px 0px 0px rgba(100, 111, 226, 0)" }}
      whileTap={isMobile ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const hoverButtonRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (videoRef.current) {
      // На мобильных уменьшаем качество видео для производительности
      videoRef.current.playbackRate = isMobile ? 0.7 : 0.8;
      if (isMobile) {
        videoRef.current.playsInline = true;
      }
    }
  }, [isMobile]);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current || isMobile || prefersReducedMotion) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });

    if (videoRef.current && !isMobile) {
      const moveX = (event.clientX - window.innerWidth / 2) / 50;
      const moveY = (event.clientY - window.innerHeight / 2) / 50;
      videoRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }
  };

  const handleMouseEnter = () => {
    if (prefersReducedMotion) return;
    setHoverOpacity(1);
    setIsHovered(true);
    if (videoRef.current && !isMobile) {
      videoRef.current.playbackRate = 1.2;
    }
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setHoverOpacity(0);
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.playbackRate = isMobile ? 0.7 : 0.8;
      videoRef.current.style.transform = "translate(0, 0) scale(1)";
    }
  };

  const titleVariants = {
    hover: { 
      letterSpacing: !isMobile ? "2px" : "0px",
      textShadow: !isMobile ? "0 0 10px rgba(100, 111, 226, 0.8)" : "none",
      transition: { duration: 0.3 }
    },
    normal: {
      letterSpacing: "0px",
      textShadow: "none",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div 
      className="relative size-full overflow-hidden"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onClick={isMobile ? () => setIsHovered(!isHovered) : undefined}
    >
      <video
        ref={videoRef}
        src={isMobile ? src.replace('.mp4', '-mobile.mp4') || src : src}
        loop
        muted
        autoPlay
        playsInline
        className="absolute left-0 top-0 size-full object-cover object-center transition-transform duration-500"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
      
      <div className="relative z-10 flex size-full flex-col justify-between p-4 md:p-5 text-blue-50">
        <div>
          <motion.h1 
            ref={titleRef}
            className="bento-title special-font text-2xl md:text-3xl"
            variants={titleVariants}
            animate={isHovered ? "hover" : "normal"}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p 
              className="mt-2 md:mt-3 max-w-64 text-xs md:text-base"
              initial={{ opacity: isMobile ? 1 : 0.7 }}
              animate={{ opacity: isHovered || isMobile ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/80 px-4 py-1 md:px-5 md:py-2 text-white uppercase backdrop-blur-sm transition-all duration-300 hover:bg-black hover:shadow-lg hover:shadow-blue-500/20"
          >
            {!prefersReducedMotion && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                  opacity: hoverOpacity,
                  background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, rgba(255, 255, 255, 0.15))`,
                }}
              />
            )}
            <motion.div
              animate={{ rotate: (isHovered && !isMobile) ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TiLocationArrow className="relative z-20 text-sm md:text-base" />
            </motion.div>
            <p className="relative z-20 text-xs md:text-sm">Скоро</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bentoItems = [
    {
      id: 1,
      src: "videos/feature-22.mp4",
      mobileSrc: "videos/feature-22-mobile.mp4",
      title: <>F<b>oo</b>tball</>,
      description: "Инновационные технологии для футбольных клубов",
      className: "bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2",
      intensity: 15
    },
    {
      id: 2,
      src: "videos/feature-3.mp4",
      mobileSrc: "videos/feature-3-mobile.mp4",
      title: <>uni<b>v</b>ersity</>,
      description: "Образовательные решения нового поколения",
      className: "bento-tilt_1 row-span-1 md:col-span-1",
      intensity: 12
    },
    {
      id: 3,
      src: "videos/feature-4.mp4",
      mobileSrc: "videos/feature-4-mobile.mp4",
      title: <>pl<b>a</b>za</>,
      description: "Торговые пространства будущего",
      className: "bento-tilt_1 md:col-span-1",
      intensity: 10
    }
  ];

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bentoItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isMobile, prefersReducedMotion]);

  return (
    <section className="relative pb-10 md:pb-22 overflow-hidden">
      {/* Упрощенный фон для мобильных */}
      {!isMobile && !prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 from-blue-50/10 via-white to-purple-50/10"></div>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-100/20"
              style={{
                width: Math.random() * 200 + 100,
                height: Math.random() * 200 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}
      
      <div className="relative container mx-auto px-4 md:px-8">
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-7'} h-auto md:h-[135vh]`}>
          {bentoItems.map((item, index) => (
            <BentoTilt 
              key={item.id} 
              className={`${item.className} ${isMobile ? '!row-span-1' : ''}`}
              intensity={isMobile ? 0 : item.intensity}
            >
              <BentoCard
                src={isMobile ? item.mobileSrc || item.src : item.src}
                title={item.title}
                description={item.description}
                isComingSoon={true}
              />
            </BentoTilt>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Features;