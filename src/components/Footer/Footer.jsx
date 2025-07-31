import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) return <div>Loading...</div>;

  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Анимация появления элементов футера
    const animateFooter = () => {
      const sections = footerRef.current.querySelectorAll('.footer-section');
      const disclaimer = footerRef.current.querySelector('.disclaimer');
      
      sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        
        setTimeout(() => {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }, 100);
      });
      
      disclaimer.style.opacity = '0';
      setTimeout(() => {
        disclaimer.style.transition = 'all 0.8s ease-out';
        disclaimer.style.opacity = '1';
      }, sections.length * 150 + 100);
    };

    animateFooter();

    // Эффект параллакса для фона
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      footerRef.current.style.setProperty('--mouse-x', x);
      footerRef.current.style.setProperty('--mouse-y', y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      {/* Анимированный фон */}
      <div className="footer-bg"></div>
      
      <div className="footer-container">
        {/* Контакты */}
        <div className="footer-section">
          <h3 className="section-title">
            <span className="title-text">{t('footer.contacts.title')}</span>
            <span className="title-underline"></span>
          </h3>
          <ul className="contact-list">
            <li className="contact-item">
              <div className="contact-icon">✉️</div>
              <span>{t('footer.contacts.email')}: </span>
              <a href="mailto:info@example.com" className="contact-link">info@example.com</a>
            </li>
            <li className="contact-item">
              <div className="contact-icon">📱</div>
              <span>{t('footer.contacts.phone')}: </span>
              <a href="tel:+7XXXXXXXXXX" className="contact-link">+7 (XXX) XXX-XXXX</a>
            </li>
            <li className="contact-item">
              <div className="contact-icon">📍</div>
              <span>{t('footer.contacts.address')}: </span>
              <span className="address-text">{t('company.address')}</span>
            </li>
          </ul>
        </div>

        {/* Юридическая информация */}
        <div className="footer-section">
          <h3 className="section-title">
            <span className="title-text">{t('footer.legal.title')}</span>
            <span className="title-underline"></span>
          </h3>
          <ul className="legal-list">
            <li className="legal-item">
              <Link to="/terms" className="legal-link">
                <span className="link-hover">{t('footer.legal.terms')}</span>
                <span className="link-underline"></span>
              </Link>
            </li>
            <li className="legal-item">
              <Link to="/privacy" className="legal-link">
                <span className="link-hover">{t('footer.legal.privacy')}</span>
                <span className="link-underline"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Соцсети */}
        {/* <div className="footer-section">
          <h3 className="section-title">
            <span className="title-text">{t('footer.social.title')}</span>
            <span className="title-underline"></span>
          </h3>
          <div className="social-links">
            <a href="https://t.me/yourchannel" 
               target="_blank" 
               rel="noopener noreferrer"
               className="social-link telegram">
              <div className="social-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.33 1.48-.74 3.13-1.05 4.16-.4 1.34-.83 1.79-1.36 1.84-.87.08-1.53-.57-2.38-1.12-1.34-.85-2.1-1.38-3.4-2.21-.52-.34-.99-.52-1.13-.83-.12-.31-.13-.58-.12-.58.01-.21.33-.3.89-.52 1.47-.56 2.37-.91 3.8-1.46.9-.35 1.72-.54 2.2-.56.46-.02.75.06.98.24.22.17.29.38.32.53.03.14.07.46.03.74-.1.79-1.03 5.07-1.45 6.76-.18.73-.37 1.04-.68 1.07-.56.06-.98-.38-1.52-.74-.85-.58-1.33-.94-2.15-1.51-.94-.65-1.16-1.06-1.84-1.06-.5 0-1.07.24-1.6.44l-.01.01z"/>
                </svg>
              </div>
              <span className="social-tooltip">Telegram</span>
            </a>
            <a href="https://linkedin.com/company/yourcompany" 
               target="_blank" 
               rel="noopener noreferrer"
               className="social-link linkedin">
              <div className="social-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </div>
              <span className="social-tooltip">LinkedIn</span>
            </a>
            <a href="https://instagram.com/yourcompany" 
               target="_blank" 
               rel="noopener noreferrer"
               className="social-link instagram">
              <div className="social-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
                </svg>
              </div>
              <span className="social-tooltip">Instagram</span>
            </a>
          </div>
          
        </div>*/}
      </div> 

      {/* Юридический дисклеймер */}
      <div className="disclaimer">
        <p className="disclaimer-text">
          {t('footer.disclaimer.text')}
        </p>
        <p className="disclaimer-legal">
          TradesAdvisor is not a registered investment adviser (RIA) or broker-dealer. 
          All materials and content provided are for informational and educational purposes only 
          and do not constitute investment advice, portfolio management, or solicitation to buy 
          or sell any financial instrument.
        </p>
        <p className="copyright">
          <span className="copyright-symbol">©</span> {currentYear} {t('company.title')}. {t('footer.disclaimer.rights')}
        </p>
      </div>
      
      {/* Кнопка "Наверх" */}
      <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;