import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TelegramSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#0A1F44] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0A1F44]/90 backdrop-blur-sm rounded-xl p-8 border border-[#00BFFF]/20"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#00BFFF] p-3 rounded-full">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">{t('telegram.title')}</h2>
          <p className="text-xl text-[#6C757D] mb-8">{t('telegram.description')}</p>
          <motion.a
            href="https://t.me/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-[#00BFFF] text-white font-medium rounded-lg hover:bg-[#0096FF] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
            </svg>
            {t('telegram.button')}
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default TelegramSection;