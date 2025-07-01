import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import TrustedBySection from './TrustedBy'
import ProfTrade from './ProfTrade'
import Services from './Services'
import About from './About'
import LegalInformation from './LegalInformation'
import FAQ from './FAQ'

const Home = () => {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const controls = useAnimation()
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [activeParticles, setActiveParticles] = useState([])

  // Enhanced text animation with better contrast
  const renderAnimatedText = (text, isTitle = false) => {
    return text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: i * 0.03,
          type: 'spring',
          stiffness: 100,
          damping: 12
        }}
        className="inline-block"
        whileHover={{
          scale: 1.2,
          color: isTitle ? '#00BFFF' : '#FFD700',
          y: -5,
          transition: { duration: 0.3 }
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))
  }

  // Create floating particles with better visibility
  const createParticles = () => {
    const particles = []
    const particleCount = 30 // Reduced for better readability
    const colors = ['#00BFFF', '#FFD700', '#FFFFFF', '#3b82f6'] // More visible colors

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3, // Larger particles
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.3, // More opaque
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        direction: Math.random() > 0.5 ? 1 : -1
      })
    }

    setActiveParticles(particles)
  }

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.onloadeddata = () => {
        setIsVideoLoaded(true)
        controls.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { 
            type: 'spring',
            stiffness: 60,
            damping: 15
          }
        })
      }
    }
  }, [controls])

  // Initialize effects
  useEffect(() => {
    createParticles()
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (containerRef.current) {
        containerRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="overflow-hidden bg-[#0A1F44]">
      {/* Hero Section */}
      <div 
        ref={containerRef}
        className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-[#0A1F44] via-[#0c2657] to-[#0d2c6a] overflow-hidden relative "
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(0, 191, 255, 0.15) 0%, transparent 50%)'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {activeParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                x: [0, 100 * particle.direction],
                y: [0, -100, 0],
                rotate: 360,
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
              }}
            />
          ))}
        </div>

        {/* Left Column - Content */}
        <motion.div  
          className="lg:w-1/2 pl-8 pt-24 lg:p-16 flex items-center justify-center relative z-10 lg:mt-30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }} 
        >
          <div className="w-[620px]  space-y-6 1">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
            >
                {t('home.title').split('\n').map((line, index) => (
  <motion.span
    key={index}
    className="block"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 * index }}
  >
    {line}
  </motion.span>
))}

            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-blue-100 leading-relaxed"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }} // Added text shadow
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {renderAnimatedText(t('home.subtitle'))}
              <motion.span 
                className="block w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mt-4 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ scaleX: 1.2 }}
              />
            </motion.p>
            
            {/* <motion.div 
              className="flex flex-col sm:flex-row gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="https://t.me/your_channel"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-medium overflow-hidden group"
                whileHover={{ 
                  y: -5, 
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 191, 255, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.33 1.48-.74 3.13-1.05 4.16-.4 1.34-.83 1.79-1.36 1.84-.87.08-1.53-.57-2.38-1.12-1.34-.85-2.1-1.38-3.4-2.21-.52-.34-.99-.52-1.13-.83-.12-.31-.13-.58-.12-.58.01-.21.33-.3.89-.52 1.47-.56 2.37-.91 3.8-1.46.9-.35 1.72-.54 2.2-.56.46-.02.75.06.98.24.22.17.29.38.32.53.03.14.07.46.03.74-.1.79-1.03 5.07-1.45 6.76-.18.73-.37 1.04-.68 1.07-.56.06-.98-.38-1.52-.74-.85-.58-1.33-.94-2.15-1.51-.94-.65-1.16-1.06-1.84-1.06-.5 0-1.07.24-1.6.44l-.01.01z"/>
                  </svg>
                  <span className="font-semibold">{t('home.cta_button')}</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-0 left-0 w-full h-full border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.a>
              
            </motion.div> */}
            
           
          </div>
        </motion.div>

        {/* Right Column - Video */}
       <motion.div 
  className="w-full lg:w-1/2 flex items-center justify-center pt-24 lg:pt-0 p-10 md:p-19 relative z-10"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
>

          <motion.div 
            className="w-full max-w-2xl rounded-2xl overflow-hidden relative group"
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={controls}
            style={{
              boxShadow: '0 25px 60px -15px rgba(0, 191, 255, 0.6)'
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 35px 80px -10px rgba(0, 191, 255, 0.8)'
            }}
          >
            <div className="relative">
              <video
                ref={videoRef}
                controls
                className="w-full h-auto rounded-2xl cursor-not-allowed"
                poster="/video/preview.jpg"
                autoPlay
                muted
                playsInline
                loop
              >
                <source src="/video/presentation.mp4" type="video/mp4" />
                {t('home.video_fallback')}
              </video>
              
              {/* Loading overlay */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center rounded-2xl">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" style={{
                boxShadow: 'inset 0 0 120px rgba(0, 191, 255, 0.6)'
              }} />
              
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                  transform: 'translateX(-100%) skewX(-20deg)',
                  animation: 'shine 3s infinite'
                }} />
              </div>
              
              {/* Border effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border-4 border-white/30 group-hover:border-blue-400/70 transition-all duration-700" />
            </div>
            
            {/* Play button overlay for mobile */}
            <AnimatePresence>
              {!isVideoLoaded && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl cursor-pointer"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    videoRef.current?.play()
                    setIsVideoLoaded(true)
                  }}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-40" />
                    <div className="relative bg-white p-5 rounded-full shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Scrolling indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="animate-bounce flex flex-col items-center"> 
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>

        {/* CSS animations */}
        <style jsx global>{`
          @keyframes shine {
            0% { transform: translateX(-100%) skewX(-20deg); }
            50%, 100% { transform: translateX(100%) skewX(-20deg); }
          }
        `}</style>
      </div>
        <TrustedBySection />
      
        <ProfTrade />
      
        <Services />
      
        <About />
      
        <LegalInformation />
      
    
        <FAQ />
    </div>
  )
}

// Animated counter component for stats
const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const increment = target / (duration / 16) // 60fps
    
    let start = 0
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      
      if (progress < duration) {
        setCount(Math.min(Math.floor(increment * (progress / 16)), target))
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }
    
    requestAnimationFrame(animate)
  }, [target])
  
  return <>{count.toLocaleString()}+</>
}

export default Home