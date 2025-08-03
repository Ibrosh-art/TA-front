import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './LegalPages.module.css';

const LegalPages = ({ type = 'terms' }) => {
  const { t, ready } = useTranslation("legal");
  
  if (!ready) return <div>Loading...</div>;

  const isTerms = type === 'terms';
  const title = isTerms ? t('legal:termsTitle') : t('legal:privacyTitle');
  const lastUpdated = t('legal:lastUpdated', { date: 'June 2025' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '-1';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Частицы с электрик-голубым акцентом
      const particles = [];
      const particleCount = Math.floor(window.innerWidth * window.innerHeight / 8000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.3 - 0.15,
          speedY: Math.random() * 0.3 - 0.15,
          color: i % 5 === 0 ? 'rgba(0, 191, 255, 0.8)' : 'rgba(108, 117, 125, 0.4)'
        });
      }

      const animate = () => {
        ctx.fillStyle = '#0A1F44';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Электрик-голубой градиентный оверлей
        const gradient = ctx.createRadialGradient(
          canvas.width/2, canvas.height/2, 0,
          canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height)/2
        );
        gradient.addColorStop(0, 'rgba(10, 31, 68, 0.9)');
        gradient.addColorStop(0.5, 'rgba(0, 100, 180, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 191, 255, 0.2)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });

        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        document.body.removeChild(canvas);
      };
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lastUpdated}>{lastUpdated}</p>
        <a
          href={`/terms.pdf`}
          download
          className={styles.downloadButton}
        >
          {t('legal:downloadPDF')}
          <svg className={styles.downloadIcon} viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
        </a>
      </div>

      <div className={styles.content}>
        {isTerms ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((section) => (
              <section key={section} className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {t(`legal:terms.section${section}.title`)}
                </h2>
                <p className={styles.sectionText}>
                  {t(`legal:terms.section${section}.text`)}
                </p>
              </section>
            ))}
          </>
        ) : (
          <>
            {['dataCollection', 'dataUsage', 'dataProtection'].map((section) => (
              <section key={section} className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {t(`legal:privacy.${section}.title`)}
                </h2>
                <p className={styles.sectionText}>
                  {t(`legal:privacy.${section}.text`)}
                </p>
              </section>
            ))}
          </>
        )}

        <section className={styles.disclaimer}>
          <h3 className={styles.disclaimerTitle}>{t('legal:disclaimerTitle')}</h3>
          {[1, 2, 3, 4, 5].map((item) => (
            <p key={item} className={styles.disclaimerText}>
              {t(`legal:disclaimer.${item}`)}
            </p>
          ))}
        </section>
      </div>

      <div className={styles.footer}>
        <Link to="/" className={styles.backLink}>
          <svg className={styles.backIcon} viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          {t('common:backToHome')}
        </Link>
      </div>
    </div>
  );
};

export default LegalPages;