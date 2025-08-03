// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const API_BASE_URL = 'https://ta-backend-087e.onrender.com/api';

const CACHE_VERSION = 'v4';

// Генерация ключа кэша
const getCacheKey = (lang) => `translations_${CACHE_VERSION}_${lang}`;

// Получение кэшированных переводов
const getCachedTranslations = (lang) => {
  const cached = localStorage.getItem(getCacheKey(lang));
  if (!cached) return null;
  
  try {
    const { data, timestamp } = JSON.parse(cached);
    // Кэш актуален 24 часа
    if (Date.now() - timestamp < 86400 * 1000) {
      return data;
    }
  } catch (e) {
    console.error('Failed to parse cached translations', e);
  }
  return null;
};

// Сохранение переводов в кэш
const saveTranslationsToCache = (lang, data) => {
  localStorage.setItem(
    getCacheKey(lang),
    JSON.stringify({
      data,
      timestamp: Date.now()
    })
  );
};

// Загрузка переводов с сервера
const loadTranslations = async (lang) => {
  try {
    const response = await fetch(`${API_BASE_URL}/translations/by_language/${lang}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    saveTranslationsToCache(lang, data);
    return data;
  } catch (error) {
    console.error(`Error loading ${lang} translations:`, error);
    return getCachedTranslations(lang) || {};
  }
};

// Инициализация i18n
const initializeI18n = async () => {
  const defaultLang = localStorage.getItem('appLanguage') || 'ru';
  const translations = await loadTranslations(defaultLang);

  await i18n.use(initReactI18next).init({
    lng: defaultLang,
    fallbackLng: 'ru',
    resources: {
      [defaultLang]: {
        translation: translations
      }
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    }
  });

  // Предзагрузка других языков
  ['en', 'kz', 'ar'].forEach(async lang => {
    if (lang !== defaultLang) {
      const data = await loadTranslations(lang);
      i18n.addResourceBundle(lang, 'translation', data);
    }
  });
};

// Экспортируемые функции
export const changeLanguage = async (lang) => {
  try {
    const translations = await loadTranslations(lang);
    i18n.addResourceBundle(lang, 'translation', translations);
    
    await i18n.changeLanguage(lang);
    localStorage.setItem('appLanguage', lang);
    
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    return true;
  } catch (error) {
    console.error('Language change failed:', error);
    return false;
  }
};

export const refreshTranslations = async (lang = i18n.language) => {
  const cacheKey = getCacheKey(lang);
  localStorage.removeItem(cacheKey);
  
  const translations = await loadTranslations(lang);
  i18n.addResourceBundle(lang, 'translation', translations, true, true);
  
  if (i18n.language === lang) {
    i18n.emit('languageChanged');
  }
};

export const i18nReady = initializeI18n();
export default i18n;