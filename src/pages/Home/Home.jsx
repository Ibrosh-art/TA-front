import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import TrustedBySection from './TrustedBy'
import ProfTrade from './ProfTrade'
import Services from './Services'
import About from './About'
import LegalInformation from './LegalInformation'
import FAQ from './FAQ'
import './Home.css'
const Home = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) return <div>Loading...</div>;

  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const controls = useAnimation()
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [activeParticles, setActiveParticles] = useState([])

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

  const createParticles = () => {
    const particles = []
    const particleCount = 30
    const colors = ['#00BFFF', '#FFD700', '#FFFFFF', '#3b82f6']

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.3,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        direction: Math.random() > 0.5 ? 1 : -1
      })
    }

    setActiveParticles(particles)
  }

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
      <div 
        ref={containerRef}
        className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-[#0A1F44] via-[#0c2657] to-[#0d2c6a] overflow-hidden relative"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(0, 191, 255, 0.15) 0%, transparent 50%)'
        }}
      >
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

        <motion.div  
          className="lg:w-1/2 pl-8 pt-24 lg:p-16 flex items-center justify-center relative z-10 lg:mt-30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }} 
        >
          <div className="w-[620px] space-y-6 1">
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
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
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
          </div>
        </motion.div>

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
              
              {!isVideoLoaded && (
                <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center rounded-2xl">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" style={{
                boxShadow: 'inset 0 0 120px rgba(0, 191, 255, 0.6)'
              }} />
              
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                  transform: 'translateX(-100%) skewX(-20deg)',
                  animation: 'shine 3s infinite'
                }} />
              </div>
              
              <div className="absolute inset-0 rounded-2xl pointer-events-none border-4 border-white/30 group-hover:border-blue-400/70 transition-all duration-700" />
            </div>
            
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

        
      </div>
      
      {/* <TrustedBySection /> */}
      <ProfTrade />
      <Services />
      <About />
      <LegalInformation />
      <FAQ />
    </div>
  )
}

export default Home