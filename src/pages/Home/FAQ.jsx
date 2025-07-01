import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border-b border-[#6C757D]/20 last:border-b-0 overflow-hidden bg-white"
    >
      <motion.button
        whileHover={{ backgroundColor: '#F8F9FA' }}
        className="flex justify-between items-center w-full py-5 px-6 text-left rounded-lg transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-[#0A1F44] font-medium text-lg">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-[#00BFFF] text-2xl font-light"
          aria-hidden="true"
        >
          +
        </motion.span>
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6"
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
          >
            <div className="pb-5 text-[#6C757D] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const { t } = useTranslation();

  // Массив вопросов и ответов из i18n (ожидается, что они будут массивами в переводах)
  const faqs = t('faq.items', { returnObjects: true });

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#0A1F44] to-[#0A1F44]/90 text-white p-6 rounded-xl mb-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-2">
            {t('faq.title')}
          </h2>
          <p className="text-[#00BFFF] font-light">
            {t('faq.subtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer} 
              index={index} 
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-8 p-6 border border-[#FFD700] bg-[#FFD700]/10 rounded-xl flex items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-[#FFD700] text-[#0A1F44] p-2 rounded-lg mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-[#0A1F44] font-bold mb-2">{t('faq.premium.title')}</h3>
            <p className="text-[#6C757D]">{t('faq.premium.description')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
