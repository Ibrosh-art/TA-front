import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import './Prof.css'; // Импорт стилей

const   ProfTrade = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) return <div>Loading...</div>;

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const videoRef = useRef(null);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [inView]);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10 animate-float"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Текстовая часть */}
        <div className="lg:w-1/2 mb-16 lg:mb-0 lg:pr-12 ml-0 lg:ml-24">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  {t('prof.title1')}
                </span>
              </span>
              <span className="block mt-2">{t('prof.title2')}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              {t('prof.description')}
            </p>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://t.me/sd_tradesadvisor"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  {t('prof.button1')}
                </a>
                {/* <a
                  href="statistics"
                  className="px-8 py-4 border-2 border-blue-500 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  {t('prof.button2')}
                </a> */}
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm text-gray-600">
                  <strong>{t('prof.important')}</strong> {t('prof.disclaimer')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Видео и метрики */}
        <div className="lg:w-1/2 relative">
          <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:shadow-3xl hover:-translate-y-2">
              <img src="https://img.freepik.com/free-vector/financial-chart-globe-background-forex-trading-stock-market_1017-44838.jpg?semt=ais_hybrid&w=740" alt="" />
        

            <div className="absolute inset-0 pointer-events-none" style={{
              boxShadow: 'inset 0 0 80px rgba(59, 130, 246, 0.2)'
            }} />

            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent ${inView ? 'animate-shine' : ''}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-1">10+</div>
              <div className="text-sm text-gray-600">{t('prof.metric1')}</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">{t('prof.metric2')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Анимации */}
      
    </section>
  );
};

export default ProfTrade;
