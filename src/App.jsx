import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Home from './pages/Home/Home';
import PrivacyPolicyPage from './pages/PrivacyPage';
import TermsOfUsePage from './pages/TermsPage';
import Subscription from './pages/Subscription/Subscription';
import Statistics from './pages/Statistics/Statistics';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './index.css';
import Dashboard from './admin/Dashboard';


const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
        {/* Добавляем Dashboard для админки */}
        
      </main>
      <Footer />
    </I18nextProvider>
  );
};

export default App;