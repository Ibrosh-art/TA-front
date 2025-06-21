import { TiLocationArrow, TiStar, TiHeart, TiVolume, TiVolumeMute } from "react-icons/ti";
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Button from "./Button";

const Hero = ({ src }) => {
  const sectionRef = useRef();
  const videoRef = useRef();
  const { scrollYProgress } = useViewportScroll();
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const letters = "DORDOI".split("");
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotate: -15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: i * 0.2,
        duration: 1.2,
        ease: [0.25, 0.8, 0.25, 1]
      }
    })
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const Section = isMobile ? 'section' : motion.section;
  const AnimatedDiv = isMobile ? 'div' : motion.div;
  const AnimatedH1 = isMobile ? 'h1' : motion.h1;
  const AnimatedSpan = isMobile ? 'span' : motion.span;
  const AnimatedP = isMobile ? 'p' : motion.p;

  return (
    <Section
      ref={sectionRef}
      className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-20"
      style={!isMobile ? { scale, opacity } : {}}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <AnimatedDiv
          className="py-10 md:py-20 lg:w-2/5"
          {...(!isMobile && { initial: "hidden", animate: "visible" })}
        >
          <AnimatedH1 className="mb-6 md:mb-10 flex flex-wrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white [text-shadow:_0_2px_10px_rgba(0,0,0,0.5)]">
            {letters.map((letter, i) =>
              isMobile ? (
                <span key={i} className={`${i >= 3 ? 'text-blue-500' : 'text-white'}`}>
                  {letter}
                </span>
              ) : (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  className={`${i >= 3 ? 'text-blue-500' : 'text-white'}`}
                >
                  {letter}
                </motion.span>
              )
            )}
          </AnimatedH1>

          <AnimatedP
            className="mb-8 md:mb-12 text-lg sm:text-xl md:text-2xl text-white [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]"
            {...(!isMobile && {
              initial: { opacity: 0, x: -30 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 1, duration: 0.8, ease: "easeOut" }
            })}
          >
            Откройте для себя будущее с <span className="font-bold text-blue-500">Ассоциацией «Дордой»</span> - 
            где образование, торговля и спорт гармонично сочетаются
          </AnimatedP>
        </AnimatedDiv>

        <AnimatedDiv
          className="relative -mt-0 md:mt-0 lg:w-3/5"
          {...(!isMobile && {
            initial: { opacity: 0, x: 120 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.8, duration: 1.2, ease: "easeOut" }
          })}
        >
          <div className="relative max-w-4xl mx-auto">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full rounded-3xl border-4 border-blue-300/40 shadow-[0_0_60px_rgba(59,130,246,0.5)]"
            >
              <source src={src} type="video/mp4" />
            </video>

            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-20"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <TiVolumeMute className="text-2xl" />
              ) : (
                <TiVolume className="text-2xl" />
              )}
            </button>
          </div>
        </AnimatedDiv>
      </div>

      {!isMobile && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-10 w-6 rounded-full border-2 border-blue-500/50 flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-2 w-1.5 rounded-full bg-blue-500"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </Section>
  );
};

export default React.memo(Hero);