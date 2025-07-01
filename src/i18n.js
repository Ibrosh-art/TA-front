import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импорт переводов
import enLegal from './locales/legal/en.json';
import ruLegal from './locales/legal/ru.json';
import kzLegal from './locales/legal/kz.json';
import arLegal from './locales/legal/ar.json';

import enCommon from './locales/common/en.json';
import ruCommon from './locales/common/ru.json';
import kzCommon from './locales/common/kz.json';
import arCommon from './locales/common/ar.json';

import enStats from './locales/stats/en.json';
import ruStats from './locales/stats/ru.json';
import kzStats from './locales/stats/kz.json';
import arStats from './locales/stats/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        legal: enLegal,
        common: enCommon,
        stats: enStats
      },
      ru: {
        legal: ruLegal,
        common: ruCommon,
        stats: ruStats
      },
      kz: {
        legal: kzLegal,
        common: kzCommon,
        stats: kzStats
      },
      ar: {
        legal: arLegal,
        common: arCommon,
        stats: arStats
      }
    },
    lng: localStorage.getItem('appLanguage') || 'ru',
    fallbackLng: 'ru',
    ns: ['legal', 'common', 'stats'], // Добавлен stats namespace
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
      defaultVariables: {
        companyName: 'MyCompany'
      }
    }
  });

// Обработка RTL для арабского
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  localStorage.setItem('appLanguage', lng);
});

export default i18n;