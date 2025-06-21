import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Football from "./pages/Football";
import Home from "./pages/Home";
import University from "./pages/University";
import Plaza from "./pages/Plaza";
import '../src/components/Nav.css';
import NotFound from "./NotFound";
import ScrollToTop from "./components/Home/ScrollToTop";


const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const navItems = [
  { path: "/", name: "Главная", iconUrl: "https://static-00.iconduck.com/assets.00/home-icon-512x512-oxfgvghl.png" },
  { path: "/football", name: "Футбол", iconUrl: "https://cdn-icons-png.flaticon.com/512/4498/4498011.png" },
  { path: "/university", name: "Университет", iconUrl: "https://images.freeimages.com/fic/images/icons/2770/ios_7_icons/512/university.png" },
  { path: "/plaza", name: "Плаза", iconUrl: "https://icon-library.com/images/shopping-icon-png/shopping-icon-png-0.jpg" }
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
            /><span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hidden md:inline">
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
                <span  className="w-5 h-5 bg-no-repeat bg-center bg-contain inline-block mr-[6px] mb-[3px]" style={{ backgroundImage: `url(${item.iconUrl})` }} />
   
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

          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white/95 backdrop-blur-lg pt-20 px-6 z-40 md:hidden"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <Link 
                      to={item.path} 
                      className="flex items-center px-6 text-xl rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span  className="w-5 h-5 bg-no-repeat bg-center bg-contain inline-block mr-[6px] mb-[3px]" style={{ backgroundImage: `url(${item.iconUrl})` }} />
                      <span className={`font-medium ${
                        location.pathname === item.path 
                          ? 'text-blue-600' 
                          : 'text-gray-700'
                      }`}>
                        {item.name}
                      </span>
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="mobileNavIndicator"
                          className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
  {mobileMenuOpen && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 md:hidden"
    >
      
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
      </div>
    </motion.header>
  );
};

function App() {
  return (
    <main className="overflow-x-hidden min-h-screen relative">
      <Router>
                <ScrollToTop /> 
        <Navbar />
        
        {/* Hero Section */}
        <div className="pt-20">
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