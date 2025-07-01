import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const isRTL = i18n.dir() === 'rtl';
  const location = useLocation();

  // Прокрутка вверх при изменении маршрута
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      headerRef.current.style.setProperty('--mouse-x', x);
      headerRef.current.style.setProperty('--mouse-y', y);
    };

    if (logoRef.current) {
      logoRef.current.style.transform = 'scale(0.8)';
      logoRef.current.style.opacity = '0';
      setTimeout(() => {
        logoRef.current.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        logoRef.current.style.transform = 'scale(1)';
        logoRef.current.style.opacity = '1';
      }, 100);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a1f44] bg-opacity-95 shadow-lg py-0' 
          : 'bg-gradient-to-b from-[#0a1f44]/90 to-transparent py-2'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="header-bg"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-3 z-10"
            onClick={closeMenu}
            ref={logoRef}
          >
            <div className="relative">
              <img 
                src="/public/logo_3.png" 
                alt="TradesAdvisor Logo" 
                className="w-12 h-12 rounded-xl transform transition-all duration-500 hover:rotate-6 hover:scale-105"
              />
              <div className="absolute inset-0 rounded-xl border-2 border-blue-400/30 pointer-events-none transition-all duration-500 hover:border-blue-400/50 hover:scale-105"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent hidden sm:block">
              TradesAdvisor
            </span>
          </Link>

          <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'} z-10`}>
            <Link 
              to="/" 
              className="relative text-white hover:text-yellow-300 font-medium transition-all group"
            >
              <span className="relative z-10 flex items-center">
                {t('header.home')}
                <svg className={`w-4 h-4 ${isRTL ? 'mr-1' : 'ml-1'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/subscription" 
              className="relative text-white hover:text-yellow-300 font-medium transition-all group"
            >
              <span className="relative z-10 flex items-center">
                {t('header.subscription')}
                <svg className={`w-4 h-4 ${isRTL ? 'mr-1' : 'ml-1'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/statistics" 
              className="relative text-white hover:text-yellow-300 font-medium transition-all group"
            >
              <span className="relative z-10 flex items-center">
                {t('header.statistics')}
                <svg className={`w-4 h-4 ${isRTL ? 'mr-1' : 'ml-1'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center z-10">
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center z-50">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-300 focus:outline-none transition-all"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <div className="relative w-6 h-6 group">
                  <span className="absolute top-1 left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-blue-300"></span>
                  <span className="absolute top-3 left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-blue-300"></span>
                  <span className="absolute top-5 left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-blue-300"></span>
                </div>
              ) : (
                <div className="relative w-6 h-6 group">
                  <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white rounded-full transform rotate-45 transition-all duration-300 group-hover:bg-blue-300"></span>
                  <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white rounded-full transform -rotate-45 transition-all duration-300 group-hover:bg-blue-300"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden fixed inset-0 bg-[#0a1f44] bg-opacity-95 backdrop-blur-sm z-40 transition-all duration-500 ease-[cubic-bezier(0.77,0.2,0.05,1)] ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
        style={{ top: '80px' }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-6 py-8 h-full overflow-y-auto">
          <div className="flex flex-col space-y-6">
            <Link
              to="/"
              className="relative text-white text-2xl font-medium py-3 px-4 rounded-lg hover:bg-blue-900/30 transition-all group"
              onClick={closeMenu}
            >
              <span className="relative z-10 flex items-center">
                {t('header.home')}
                <svg className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className={`absolute bottom-2 ${isRTL ? 'right-4' : 'left-4'} w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 group-hover:w-[calc(100%-2rem)]`}></span>
            </Link>
            
            <Link
              to="/subscription"
              className="relative text-white text-2xl font-medium py-3 px-4 rounded-lg hover:bg-blue-900/30 transition-all group"
              onClick={closeMenu}
            >
              <span className="relative z-10 flex items-center">
                {t('header.subscription')}
                <svg className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className={`absolute bottom-2 ${isRTL ? 'right-4' : 'left-4'} w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 group-hover:w-[calc(100%-2rem)]`}></span>
            </Link>
            
            <Link
              to="/statistics"
              className="relative text-white text-2xl font-medium py-3 px-4 rounded-lg hover:bg-blue-900/30 transition-all group"
              onClick={closeMenu}
            >
              <span className="relative z-10 flex items-center">
                {t('header.statistics')}
                <svg className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className={`absolute bottom-2 ${isRTL ? 'right-4' : 'left-4'} w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 group-hover:w-[calc(100%-2rem)]`}></span>
            </Link>
          </div>
          
          <div className="pt-8 mt-8 border-t border-blue-900/30">
            <LanguageSwitcher mobile />
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%),
            rgba(0, 191, 255, 0.15) 0%,
            transparent 70%
          );
          transition: background 0.3s ease-out;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </header>
  );
};

export default Header;