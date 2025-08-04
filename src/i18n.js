// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Динамические импорты для каждого языка и категории
const importLocale = async (lang, category) => {
  try {
    // Для Vite (использует import.meta.glob)
    if (import.meta.glob) {
      const modules = import.meta.glob('../locales/**/*.json');
      const path = `../locales/${category}/${lang}.json`;
      return (await modules[path]()).default;
    }
    // Для Webpack (использует require.context или динамический import)
    else {
      return (await import(`./locales/${category}/${lang}.json`)).default;
    }
  } catch (error) {
    console.error(`Failed to load ${lang} ${category} translations:`, error);
    return {};
  }
};

// Загрузка всех переводов для языка
const loadLanguageResources = async (lang) => {
  const [common, legal, stats] = await Promise.all([
    importLocale(lang, 'common'),
    importLocale(lang, 'legal'),
    importLocale(lang, 'stats'),
  ]);

  return {
    common,
    legal,
    stats,
    // Добавьте другие категории по необходимости
  };
};

// Функция для объединения переводов из разных категорий
const mergeTranslations = (resources) => {
  return {
    ...resources.common,
    ...resources.legal,
    ...resources.stats,
    // Добавьте другие категории по необходимости
  };
};

// Инициализация i18n
const initializeI18n = async () => {
  const defaultLang = localStorage.getItem('appLanguage') || 'ru';
  
  // Предзагрузка ресурсов для языка по умолчанию
  const defaultResources = await loadLanguageResources(defaultLang);

  await i18n.use(initReactI18next).init({
    lng: defaultLang,
    fallbackLng: 'ru',
    resources: {
      [defaultLang]: {
        translation: mergeTranslations(defaultResources)
      }
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    }
  });

  // Предзагрузка других языков в фоне
  ['en', 'kz', 'ar'].forEach(async (lang) => {
    if (lang !== defaultLang) {
      const resources = await loadLanguageResources(lang);
      i18n.addResourceBundle(lang, 'translation', mergeTranslations(resources));
    }
  });

  // Установка направления текста и языка для HTML
  document.documentElement.dir = defaultLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = defaultLang;
};

// Экспортируемые функции
export const changeLanguage = async (lang) => {
  try {
    // Если ресурсы для языка еще не загружены
    if (!i18n.hasResourceBundle(lang, 'translation')) {
      const resources = await loadLanguageResources(lang);
      i18n.addResourceBundle(lang, 'translation', mergeTranslations(resources));
    }
    
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

// В этой версии refresh просто перезагружает текущий язык
export const refreshTranslations = async (lang = i18n.language) => {
  try {
    const resources = await loadLanguageResources(lang);
    i18n.addResourceBundle(lang, 'translation', mergeTranslations(resources), true, true);
    
    if (i18n.language === lang) {
      i18n.emit('languageChanged');
    }
    return true;
  } catch (error) {
    console.error('Failed to refresh translations:', error);
    return false;
  }
};

export const i18nReady = initializeI18n();
export default i18n;