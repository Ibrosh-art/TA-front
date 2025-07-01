import { useState, useEffect } from 'react';
import ruCommon from '../locales/common/ru.json';
import enCommon from '../locales/common/en.json';
import kzCommon from '../locales/common/kz.json';
import arCommon from '../locales/common/ar.json';
import ruLegal from '../locales/legal/ru.json';
import enLegal from '../locales/legal/en.json';
import kzLegal from '../locales/legal/kz.json';
import arLegal from '../locales/legal/ar.json';
import ruStats from '../locales/stats/ru.json';
import enStats from '../locales/stats/en.json';
import kzStats from '../locales/stats/kz.json';
import arStats from '../locales/stats/ar.json';

const allTranslations = {
  common: {
    ru: ruCommon,
    en: enCommon,
    kz: kzCommon,
    ar: arCommon
  },
  legal: {
    ru: ruLegal,
    en: enLegal,
    kz: kzLegal,
    ar: arLegal
  },
  stats: {
    ru: ruStats,
    en: enStats,
    kz: kzStats,
    ar: arStats
  }
};

export default function TextEditor() {
  const [language, setLanguage] = useState('ru');
  const [section, setSection] = useState('common');
  const [translations, setTranslations] = useState(allTranslations.common.ru);
  const [expandedSections, setExpandedSections] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const languages = [
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
    { code: 'kz', name: 'Қазақша' },
    { code: 'ar', name: 'العربية' }
  ];

  const sections = [
    { code: 'common', name: 'Общие переводы' },
    { code: 'legal', name: 'Юридические тексты' },
    { code: 'stats', name: 'Статистика' }
  ];

  useEffect(() => {
    setTranslations(allTranslations[section][language]);
    setExpandedSections({});
  }, [language, section]);

  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (fullKey, newValue) => {
    const keys = fullKey.split('.');
    setTranslations(prev => {
      const newTranslations = JSON.parse(JSON.stringify(prev));
      let current = newTranslations;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      const originalValue = current[keys[keys.length - 1]];
      const isPercentage = typeof originalValue === 'string' && originalValue.includes('%');
      
      if (typeof originalValue === 'number') {
        const numValue = newValue.replace('%', '');
        current[keys[keys.length - 1]] = numValue === '' ? 0 : Number(numValue);
      } else if (typeof originalValue === 'string' && !isNaN(parseFloat(originalValue))) {
        current[keys[keys.length - 1]] = isPercentage && !newValue.endsWith('%')
          ? newValue + '%'
          : newValue;
      } else {
        current[keys[keys.length - 1]] = newValue;
      }
      
      return newTranslations;
    });
  };

  const renderField = (key, value, fullKey, depth = 0) => {
    if (typeof value === 'object' && value !== null) {
      const isExpanded = expandedSections[fullKey] !== false;
      return (
        <div key={fullKey} className={`ml-${depth * 4} my-2`}>
          <div 
            className="flex items-center cursor-pointer font-semibold text-gray-700 hover:text-blue-600"
            onClick={() => toggleSection(fullKey)}
          >
            <span className="mr-2">
              {isExpanded ? '▼' : '▶'}
            </span>
            {key}
          </div>
          {isExpanded && (
            <div className="border-l-2 border-gray-200 pl-4 ml-3">
              {Object.entries(value).map(([subKey, subValue]) => 
                renderField(subKey, subValue, `${fullKey}.${subKey}`, depth + 1)
              )}
            </div>
          )}
        </div>
      );
    }

    const isNumericValue = 
      typeof value === 'number' || 
      (typeof value === 'string' && !isNaN(parseFloat(value)));

    return (
      <div key={fullKey} className={`ml-${depth * 4} flex flex-col sm:flex-row gap-3 items-start sm:items-center my-3 p-2 bg-gray-50 rounded-lg`}>
        <label className="w-full sm:w-1/4 font-medium text-gray-700 break-words">
          {key}:
        </label>
        {isNumericValue ? (
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              if (/^[+-]?\d*\.?\d+%?$/.test(newValue) || newValue === '') {
                const isPercentage = typeof value === 'string' && value.includes('%');
                const formattedValue = isPercentage 
                  ? newValue.endsWith('%') 
                    ? newValue 
                    : newValue + '%'
                  : newValue;
                handleChange(fullKey, formattedValue);
              }
            }}
            onBlur={(e) => {
              const newValue = e.target.value;
              if (typeof value === 'string' && value.includes('%') && !newValue.endsWith('%')) {
                handleChange(fullKey, newValue + '%');
              }
            }}
            className="flex-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : typeof value === 'string' && value.length < 100 ? (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(fullKey, e.target.value)}
            className="flex-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        ) : (
          <textarea
            value={value}
            onChange={(e) => handleChange(fullKey, e.target.value)}
            className="flex-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        )}
      </div>
    );
  };

  const saveTranslations = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:3000/api/update-translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          section,
          translations
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert('Успешно сохранено!');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert(`Ошибка: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Редактор переводов</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Язык:</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Раздел:</label>
            <select 
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sections.map((sec) => (
                <option key={sec.code} value={sec.code}>
                  {sec.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {sections.find(s => s.code === section)?.name} ({languages.find(l => l.code === language)?.name})
          </h3>
          <button 
            onClick={saveTranslations}
            disabled={isSaving}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(translations).map(([key, value]) => 
            renderField(key, value, key)
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={saveTranslations}
            disabled={isSaving}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </div>
    </div>
  );
}