import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage, refreshTranslations } from '../../i18n';
import enFlag from '../../assets/flags/en.svg';
import ruFlag from '../../assets/flags/ru.svg';
import kzFlag from '../../assets/flags/kz.svg';
import arFlag from '../../assets/flags/ar.svg';

const languages = [
  { code: 'en', flag: enFlag },
  { code: 'ru', flag: ruFlag },
  { code: 'kz', flag: kzFlag },
  { code: 'ar', flag: arFlag },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [loadingLang, setLoadingLang] = useState(null);

  // Добавляем обработчик для обновлений переводов
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const handleLanguageChange = async (lang) => {
    if (lang === currentLang || loadingLang) return;
    
    setLoadingLang(lang);
    try {
      await changeLanguage(lang);
    } catch (error) {
      console.error('Language change failed:', error);
    } finally {
      setLoadingLang(null);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className="relative p-1 rounded-full focus:outline-none"
          disabled={!!loadingLang}
          title={lang.code.toUpperCase()}
        >
          {loadingLang === lang.code ? (
            <div className="w-7 h-7 flex items-center justify-center">
              <div className="animate-spin text-[#00BFFF]">↻</div>
            </div>
          ) : (
            <>
              <img 
                src={lang.flag} 
                alt={lang.code} 
                className={`w-7 h-7 rounded-full object-cover transition-all duration-200 ${
                  currentLang === lang.code 
                    ? 'ring-2 ring-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.7)]' 
                    : 'opacity-80 hover:opacity-100 hover:scale-110'
                }`}
              />
              {currentLang === lang.code && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#00BFFF] rounded-full"></div>
              )}
            </>
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;