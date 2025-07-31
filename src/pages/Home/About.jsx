import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CompanyOverview = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) return <div>Loading...</div>;

  const [activeTab, setActiveTab] = useState('about');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const tabs = [
    { id: 'about', label: t('company.tabs.about') },
    { id: 'philosophy', label: t('company.tabs.philosophy') },
    { id: 'compliance', label: t('company.tabs.compliance') }
  ];

  return (
    <div className="bg-[#0A1F44] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BFFF] to-[#0077B6]">
              {t('company.title')}
            </span>
            {t('company.premium') && (
              <span className="ml-3 text-[#FFD700]">{t('company.premium')}</span>
            )}
          </h1>
          <p className="text-xl text-[#6C757D] max-w-3xl mx-auto">
            {t('company.subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 rounded-xl bg-[#0A1F44] p-1 border border-[#00BFFF]/20">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#00BFFF] text-white shadow-lg'
                    : 'text-[#6C757D] hover:text-white hover:bg-[#00BFFF]/20'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-[#0A1F44]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#00BFFF]/20"
        >
          {/* About */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-[#00BFFF] text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#00BFFF] mb-3">{t('company.about.title')}</h3>
                  <p className="text-gray-300">
                    {t('company.about.description', {
                      company: t('company.name'),
                      country: t('company.country')
                    })}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {['team', 'tech'].map((section) => (
                  <motion.div
                    key={section}
                    whileHover={{ y: -5 }}
                    className="bg-[#0A1F44] p-5 rounded-lg border border-[#00BFFF]/20 hover:border-[#00BFFF]/40 transition-all"
                  >
                    <h4 className="font-semibold text-lg mb-3 text-[#00BFFF] flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`company.about.${section}.title`)}
                    </h4>
                    <p className="text-gray-300">{t(`company.about.${section}.description`)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Philosophy */}
          {activeTab === 'philosophy' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="text-3xl font-bold text-[#00BFFF]"
                >
                  "{t('company.philosophy.slogan')}"
                </motion.h2>
                
              </div>

              
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mt-8 p-5 bg-[#00BFFF]/10 rounded-lg border border-[#00BFFF]/30"
              >
                <p className="text-center text-xl text-gray-300">
                  <span className="font-bold text-[#00BFFF]">{t('company.philosophy.control.client')}</span>{' '}
                  {t('company.philosophy.control.we')}{' '}
                  <span className="font-bold text-[#00BFFF]">{t('company.philosophy.control.you')}</span>
                </p>
              </motion.div>
            </div>
          )}

          {/* Compliance */}
          {activeTab === 'compliance' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-[#00BFFF] text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#00BFFF] mb-3">{t('company.compliance.title')}</h3>
                  <div className="mt-3 space-y-4 text-gray-300">
                    <p>{t('company.compliance.registered', { country: t('company.country') })}</p>
                    <p>{t('company.compliance.regulation', { regulator: t('company.regulator') })}</p>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mt-8 p-5 bg-[#FF0000]/10 rounded-lg border border-[#FF0000]/30"
              >
                <h4 className="font-semibold text-lg mb-3 text-[#FF0000] flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {t('company.compliance.notice.title')}
                </h4>
                <p className="text-gray-300">
                  {t('company.compliance.notice.description')}
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyOverview;
