import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const API_BASE_URL = 'https://ta-backend-9c7h.onrender.com';
const CACHE_VERSION = 'v2'; // Увеличивайте при изменениях структуры

// 1. Улучшенное кэширование с версионированием
const getCacheKey = (lang) => `translations_${CACHE_VERSION}_${lang}`;

const getCachedTranslations = (lang) => {
  const cached = localStorage.getItem(getCacheKey(lang));
  if (!cached) return null;
  
  try {
    const { data, timestamp } = JSON.parse(cached);
    // Кэш действителен 1 час (можно настроить)
    if (Date.now() - timestamp < 3600 * 1000) {
      return data;
    }
  } catch (e) {
    console.error('Failed to parse cached translations', e);
  }
  return null;
};

const saveTranslationsToCache = (lang, data) => {
  localStorage.setItem(
    getCacheKey(lang),
    JSON.stringify({
      data,
      timestamp: Date.now()
    })
  );
};

// 2. Загрузка с проверкой свежести данных
const loadTranslations = async (lang) => {
  const cacheKey = getCacheKey(lang);
  const cached = getCachedTranslations(lang);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/translations/${lang}/`, {
      headers: {
        'Cache-Control': 'no-cache',
        ...(cached ? { 'If-None-Match': cacheKey } : {})
      }
    });

    if (response.status === 304 && cached) {
      return cached; // Данные не изменились
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    saveTranslationsToCache(lang, data);
    return data;
  } catch (error) {
    console.error(`Error loading ${lang} translations:`, error);
    return cached || {};
  }
};

// 3. Инициализация i18n
const initializeI18n = async () => {
  const defaultLang = localStorage.getItem('appLanguage') || 'ru';
  const translations = await loadTranslations(defaultLang);

  await i18n.use(initReactI18next).init({
    lng: defaultLang,
    fallbackLng: 'ru',
    resources: {
      [defaultLang]: translations
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    }
  });

  // Предзагрузка других языков
  ['en', 'kz', 'ar'].forEach(lang => {
    if (lang !== defaultLang) {
      loadTranslations(lang).then(data => {
        i18n.addResourceBundle(lang, 'translation', data);
      });
    }
  });
};

// 4. Обновлённая функция смены языка
export const changeLanguage = async (lang) => {
  try {
    const translations = await loadTranslations(lang);
    i18n.addResourceBundle(lang, 'translation', translations);
    
    await i18n.changeLanguage(lang);
    localStorage.setItem('appLanguage', lang);
    
    // Обновляем direction для RTL
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    return true;
  } catch (error) {
    console.error('Language change failed:', error);
    return false;
  }
};

// 5. Функция для принудительного обновления переводов
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