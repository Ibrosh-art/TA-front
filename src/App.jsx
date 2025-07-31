import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n, { i18nReady } from './i18n';
import Home from './pages/Home/Home';
import PrivacyPolicyPage from './pages/PrivacyPage';
import TermsOfUsePage from './pages/TermsPage';
import Subscription from './pages/Subscription/Subscription';
import Statistics from './pages/Statistics/Statistics';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader';
import './index.css';

const TranslationStatus = () => {
  const { t, ready } = useTranslation();
  
  useEffect(() => {
    console.log('Translation status:', { ready, language: i18n.language });
    console.log('Sample translation:', t('company.title'));
  }, [t, ready]);

  return null;
};

const AppContent = () => {
  return (
    <>
      <TranslationStatus />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await i18nReady;
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AppContent />
    </I18nextProvider>
  );
};

export default App;