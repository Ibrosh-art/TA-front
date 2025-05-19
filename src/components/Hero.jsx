import { TiLocationArrow, TiStar, TiHeart } from "react-icons/ti";
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import React, { useRef } from 'react';
import Button from "./Button";

const Hero = ({ src }) => {
  const sectionRef = useRef();
  const { scrollYProgress } = useViewportScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
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

  const icons = [<TiLocationArrow />, <TiStar />, <TiHeart />];

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-20"
      style={{ scale, opacity }}
    >
      <div className="absolute inset-0 -z-10">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-500 opacity-25"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              y: i % 2 === 0 ? y1 : y2,
              fontSize: `${Math.random() * 28 + 18}px`
            }}
            animate={{
              x: [0, Math.random() * 120 - 60],
              y: [0, Math.random() * 120 - 60],
              opacity: [0.15, 0.35, 0.15],
              rotate: [0, Math.random() * 360],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: Math.random() * 15 + 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {icons[Math.floor(Math.random() * icons.length)]}
          </motion.div>
        ))}
      </div>

      <div className="relative  z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <motion.div
          className="py-20 lg:w-2/5"
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-10 flex flex-wrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white [text-shadow:_0_2px_10px_rgba(0,0,0,0.5)]"
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className={`${i >= 3 ? 'text-blue-500' : 'text-white'}`}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mb-12 text-lg sm:text-xl md:text-2xl text-white [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            Откройте для себя будущее с <span className="font-bold text-blue-500">Ассоциацией «Дордой»</span> - 
            где образование, торговля и спорт гармонично сочетаются
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow className="text-2xl" />}
              containerClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:scale-110 flex items-center gap-4 shadow-xl hover:shadow-2xl text-lg"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-16 lg:mt-0 lg:w-3/5"
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
        >
          <div className="relative max-w-4xl mx-auto">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-3xl border-4 border-blue-300/40 shadow-[0_0_60px_rgba(59,130,246,0.5)]"
            >
              <source src={src} type="video/mp4" />
            </video>

            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(59,130,246,0.2) 0%, transparent 50%, rgba(59,130,246,0.2) 100%)',
                  'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, transparent 50%, rgba(59,130,246,0.2) 100%)'
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />

            <motion.div
              className="absolute -inset-8 rounded-3xl bg-blue-400/20 blur-3xl pointer-events-none"
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        </motion.div>
      </div>

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
          <span className="mb-3 text-sm font-semibold tracking-widest text-blue-500 [text-shadow:_0_1px_5px_rgba(0,0,0,0.3)]">Исследуй</span>
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
    </motion.section>
  );
};

export default React.memo(Hero);