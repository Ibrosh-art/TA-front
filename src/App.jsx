import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Football from "./pages/Football";
import Home from "./pages/Home";
import University from "./pages/University";
import Plaza from "./pages/Plaza";
import '../src/components/Nav.css';
import NotFound from "./NotFound";


const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", name: "Home", icon: "🏠" },
    { path: "/football", name: "Football", icon: "⚽" },
    { path: "/university", name: "University", icon: "🎓" },
    { path: "/plaza", name: "Plaza", icon: "🛍️" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/30'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="flex items-center">
            <motion.img
              src="/img/logo.png"
              alt="logo"
              className="w-12 h-12 rounded-full bg-black"
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring" }}
            />
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Dordoi
            </span>
          </Link>
        </motion.div>
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={item.path} 
                className="relative px-5 py-3 font-medium flex items-center group"
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                <span className={`transition-colors ${
                  location.pathname === item.path 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}>
                  {item.name}
                </span>
                
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.button 
          className="md:hidden p-2 rounded-lg bg-gray-100 relative z-50"
          whileHover={{ backgroundColor: "#E5E7EB" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>

        <AnimatePresence>
  {mobileMenuOpen && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 md:hidden"
    >
      {/* Темный полупрозрачный фон */}
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" />
      
      {/* Контейнер меню с прокруткой */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative h-full w-full flex flex-col"
      >
        {/* Шапка меню */}
        <div className="flex justify-between items-center pt-6 pl-6 pr-6 pb-2 ">
          <div className="flex items-center">
            <img 
              src="/img/logo.png" 
              alt="Dordoi Logo"
              className="w-10 h-10 mr-3 rounded-full"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/100  bg-clip-text text-transparent">Dordoi</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-300 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Основное содержимое с прокруткой */}
        <div className="flex-1 bg-gray-800 p-2 pb-4 pt-3 px-6">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    delay: 0.1 + index * 0.05,
                    type: "spring", 
                    stiffness: 300
                  }
                }}
              >
                <Link 
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center py-3 px-4 rounded-lg
                    text-lg font-medium transition-all
                    ${location.pathname === item.path
                      ? 'bg-blue-600/90 text-white shadow-md '
                      : 'bg-gray-800/85 text-gray-200 hover:bg-gray-700/70 border-2 border-white'
                    }
                  `}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span className="flex-1">{item.name}</span>
                  {location.pathname === item.path && (
                    <motion.span
                      layoutId="mobileNavIndicator"
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

         
        </div>

        
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </motion.header>
  );
};

function App() {
  return (
    <main className="overflow-x-hidden min-h-screen relative">
      {/* Animated Background */}
      {/* Professional Dordoi Background */}
<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-gray-50 to-gray-100">
  {/* Abstract Building Silhouettes */}
  <div className="absolute bottom-0 left-0 right-0 h-1/3">
    {/* University Building */}
    <motion.div 
      className="absolute left-5% bottom-0 w-20 h-2/3 bg-gradient-to-t from-blue-800 to-blue-600 opacity-10"
      initial={{ height: 0 }}
      animate={{ height: "60%" }}
      transition={{ duration: 1.5, delay: 0.3 }}
    />
    
    {/* Shopping Center */}
    <motion.div 
      className="absolute left-30% bottom-0 w-25 h-3/4 bg-gradient-to-t from-amber-700 to-amber-600 opacity-10"
      initial={{ height: 0 }}
      animate={{ height: "75%" }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
    
    {/* Stadium */}
    <motion.div 
      className="absolute left-55% bottom-0 w-30 h-1/2 rounded-t-full bg-gradient-to-t from-emerald-700 to-emerald-600 opacity-10"
      initial={{ height: 0 }}
      animate={{ height: "50%" }}
      transition={{ duration: 1.5, delay: 0.7 }}
    />
    
    {/* Market */}
    <motion.div 
      className="absolute left-80% bottom-0 w-25 h-4/5 bg-gradient-to-t from-red-700 to-red-600 opacity-10"
      initial={{ height: 0 }}
      animate={{ height: "80%" }}
      transition={{ duration: 1.5, delay: 0.9 }}
    />
  </div>

  {/* Floating Activity Icons */}
  {[
    { icon: "🎓", color: "text-blue-600", size: "text-3xl", delay: 0.2 }, // University
    { icon: "🛒", color: "text-amber-600", size: "text-4xl", delay: 0.4 }, // Plaza
    { icon: "⚽", color: "text-emerald-600", size: "text-5xl", delay: 0.6 }, // Football
    { icon: "🏪", color: "text-red-600", size: "text-3xl", delay: 0.8 }, // Market
    { icon: "📚", color: "text-blue-500", size: "text-2xl", delay: 1.0 },
    { icon: "👔", color: "text-gray-600", size: "text-3xl", delay: 1.2 }, // Business
  ].map((item, i) => (
    <motion.div
      key={i}
      className={`absolute ${item.color} ${item.size} opacity-30`}
      style={{
        left: `${15 + (i * 12)}%`,
        top: `${20 + (i * 10)}%`,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: 8 + i,
        delay: item.delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {item.icon}
    </motion.div>
  ))}

  {/* Subtle Grid */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

  {/* Pulsing Business Dots */}
  {[...Array(30)].map((_, i) => {
    const size = Math.random() * 6 + 2;
    const duration = Math.random() * 5 + 3;
    const delay = Math.random() * 2;
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    const colors = ["bg-blue-400", "bg-amber-400", "bg-emerald-400", "bg-red-400"];
    const color = colors[i % colors.length];
    
    return (
      <motion.div
        key={i}
        className={`absolute rounded-full ${color} opacity-30`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${xPos}%`,
          top: `${yPos}%`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  })}

  {/* Connection Lines (Animated) */}
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {[...Array(8)].map((_, i) => {
      const x1 = 10 + (i * 10);
      const y1 = 30 + (i * 5);
      const x2 = 50 + (i * 5);
      const y2 = 70 - (i * 5);
      
      return (
        <motion.line
          key={i}
          x1={`${x1}%`}
          y1={`${y1}%`}
          x2={`${x2}%`}
          y2={`${y2}%`}
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      );
    })}
  </svg>
</div>

      <Router>
        <Navbar />
        
        {/* Hero Section */}
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/university" element={<University />} />
            <Route path="/football" element={<Football />} />
            <Route path="/plaza" element={<Plaza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-20px, -10px) rotate(2deg); }
          40% { transform: translate(20px, -20px) rotate(-3deg); }
          60% { transform: translate(-20px, 20px) rotate(3deg); }
          80% { transform: translate(15px, 10px) rotate(-2deg); }
        }
      `}</style>
    </main>
  );
}

export default App;