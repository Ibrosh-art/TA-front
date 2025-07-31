import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationTest = () => {
  const { t, i18n, ready } = useTranslation();
  
  useEffect(() => {
    console.log('Translation status:', { ready, language: i18n.language });
    console.log('Sample translation:', t('company.title'));
  }, [t, ready, i18n]);

  return (
    <div>
      <h2>Translation Test</h2>
      <p>Company title: {t('company.title')}</p>
      <p>Current language: {i18n.language}</p>
      <p>Translation ready: {ready ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default TranslationTest;