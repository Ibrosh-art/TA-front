import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import enFlag from '../../assets/flags/en.svg';
import ruFlag from '../../assets/flags/ru.svg';
import kzFlag from '../../assets/flags/kz.svg';
import arFlag from '../../assets/flags/ar.svg';

const LanguageSwitcher = ({ mobile = false }) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [animating, setAnimating] = useState(false);

  const languages = [
    { code: 'en', flag: enFlag, name: 'English' },
    { code: 'ru', flag: ruFlag, name: 'Русский' },
    { code: 'kz', flag: kzFlag, name: 'Қазақша' },
    { code: 'ar', flag: arFlag, name: 'العربية' },
  ];

  const changeLanguage = (lng) => {
    if (lng === currentLang) return;
    
    setAnimating(true);
    setTimeout(() => {
      i18n.changeLanguage(lng);
      setCurrentLang(lng);
      setAnimating(false);
    }, 300);
  };

  if (mobile) {
    return (
      <div className="w-full">
        <h3 className="text-sm font-medium text-gray-300 mb-3 px-1">
          {i18n.t('')}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center p-3 rounded-xl transition-all duration-300 border ${
                currentLang === lang.code
                  ? 'bg-blue-600/20 border-blue-500/50 shadow-md'
                  : 'bg-white/5 border-transparent hover:bg-white/10'
              } ${animating && currentLang === lang.code ? 'animate-pulse' : ''}`}
              disabled={animating}
            >
              <div className="relative">
                <img 
                  src={lang.flag} 
                  alt={lang.name} 
                  className="w-8 h-8 rounded-full object-cover border border-gray-600/50"
                />
                {currentLang === lang.code && (
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-800"></span>
                )}
              </div>
              <span className={`ml-3 text-sm ${
                currentLang === lang.code ? 'font-medium text-blue-400' : 'text-gray-200'
              }`}>
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-1`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`relative p-1 transition-all duration-300 ${
            currentLang === lang.code 
              ? 'transform scale-110' 
              : 'opacity-90 hover:opacity-100'
          } ${
            animating && currentLang === lang.code ? 'animate-pulse' : ''
          }`}
          aria-label={lang.name}
          disabled={animating}
        >
          <div className="relative">
            <img 
              src={lang.flag} 
              alt={lang.name} 
              className={`w-8 h-8 rounded-full object-cover border-2 ${
                currentLang === lang.code
                  ? 'border-blue-500 shadow-md'
                  : 'border-transparent hover:border-gray-200'
              }`}
            />
            {currentLang === lang.code && (
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;