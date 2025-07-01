import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import TelegramChannel from './TelegramChannel';

const StatisticsPage = () => {
  const { t, i18n } = useTranslation(['stats']);
  const [_, forceUpdate] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      i18n.reloadResources([i18n.language], ['stats'])
        .then(() => forceUpdate({}))
        .catch(console.error);
    }, 5000);

    return () => clearInterval(interval);
  }, [i18n]);

  const getValueColor = (value) => {
    if (typeof value === 'string') {
      if (value.startsWith('+')) return 'text-green-400';
      if (value.startsWith('-')) return 'text-red-400';
      if (value.includes('/')) {
        const parts = value.split('/');
        return parts[0] > parts[1] ? 'text-green-400' : 'text-red-400';
      }
    }
    return 'text-white';
  };

  const getSectionData = (sectionKey) => {
    try {
      const sectionData = t(`sections.${sectionKey}`, { returnObjects: true, ns: 'stats' });
      return {
        title: t(`title`, { ns: 'stats' }),
        metrics: Object.entries(sectionData.metrics || {}).map(([key, metric]) => ({
          key,
          name: metric?.name || '',
          value: metric?.value || '',
          description: metric?.description || ''
        }))
      };
    } catch (error) {
      console.error('Ошибка загрузки секции:', error);
      return { title: '', metrics: [] };
    }
  };

  const performanceData = getSectionData('performance');
  const behaviorData = getSectionData('behavior');
  const riskData = getSectionData('risk');

  const sectionTitleColors = {
    performance: 'text-[#00BFFF]',
    behavior: 'text-[#FFD700]',
    risk: 'text-[#FF6B6B]'
  };

  const sectionBorderColors = {
    performance: 'border-[#00BFFF]/20',
    behavior: 'border-[#FFD700]/20',
    risk: 'border-[#FF6B6B]/20'
  };

  return (
    <div className="min-h-screen bg-[#0A1F44] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto mt-20">
        <header className="mb-8 mx-auto text-center">
          <h1 className="text-xl sm:text-3xl font-bold text-[#00BFFF] mb-2">
            {t('title', { ns: 'stats' })}
          </h1>
          <p className="text-[#6C757D]">
            {t('lastUpdated', { ns: 'stats', date: new Date().toLocaleString() })}
          </p>
        </header>

        {/* Основные метрики */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {performanceData.metrics.slice(0, 4).map((metric, index) => (
            <div 
              key={index} 
              className="bg-[#0A2540] border border-[#00BFFF]/30 rounded-lg p-4 hover:border-[#00BFFF] transition-all"
            >
              <div className="text-[#6C757D] text-sm">{metric.name}</div>
              <div className={`text-2xl font-bold mt-1 ${getValueColor(metric.value)}`}>
                {metric.value}
              </div>
              <div className="text-[#6C757D] text-xs mt-1">{metric.description}</div>
            </div>
          ))}
        </section>

        {/* Детализированные секции */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Секция производительности */}
          <div className={`bg-[#0A2540] border rounded-lg p-4 ${sectionBorderColors.performance}`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center ${sectionTitleColors.performance}`}>
              {performanceData.title}
            </h2>
            <div className="space-y-3">
              {performanceData.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center pb-2 border-b border-[#6C757D]/30">
                  <div>
                    <div className="text-sm">{metric.name}</div>
                    <div className="text-xs text-[#6C757D]">{metric.description}</div>
                  </div>
                  <div className={`font-medium ${getValueColor(metric.value)}`}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Секция поведения */}
          <div className={`bg-[#0A2540] border rounded-lg p-4 ${sectionBorderColors.behavior}`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center ${sectionTitleColors.behavior}`}>
              {behaviorData.title}
            </h2>
            <div className="space-y-3">
              {behaviorData.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center pb-2 border-b border-[#6C757D]/30">
                  <div>
                    <div className="text-sm">{metric.name}</div>
                    <div className="text-xs text-[#6C757D]">{metric.description}</div>
                  </div>
                  <div className={`font-medium ${getValueColor(metric.value)}`}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Секция рисков */}
          <div className={`bg-[#0A2540] border rounded-lg p-4 ${sectionBorderColors.risk}`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center ${sectionTitleColors.risk}`}>
              {riskData.title}
            </h2>
            <div className="space-y-3">
              {riskData.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center pb-2 border-b border-[#6C757D]/30">
                  <div>
                    <div className="text-sm">{metric.name}</div>
                    <div className="text-xs text-[#6C757D]">{metric.description}</div>
                  </div>
                  <div className={`font-medium ${getValueColor(metric.value)}`}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <TelegramChannel /> */}
    </div>
  );
};

export default StatisticsPage;
