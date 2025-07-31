import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) return <div>Loading...</div>;

  const [activeQuestion, setActiveQuestion] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const questions = ['q1', 'q2', 'q3'];

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="bg-[#0A1F44] text-white py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto"> {/* Уменьшил максимальную ширину */}
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4 text-white"> {/* Убрал градиент для более чистого вида */}
            {t('faq.title')}
          </h1>
          <p className="text-lg text-[#6C757D]">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        {/* Questions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="space-y-3" 
        >
          {questions.map((q) => (
            <motion.div
              key={q}
              whileHover={{ scale: 1.01 }}
              className="bg-[#0A1F44]/90 rounded-lg p-5 border border-[#00BFFF]/20 cursor-pointer"
              onClick={() => toggleQuestion(q)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#00BFFF]">
                  {t(`faq.questions.${q}.question`)}
                </h3>
                <motion.div
                  animate={{ rotate: activeQuestion === q ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg 
                    className="w-5 h-5 text-[#00BFFF]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeQuestion === q ? 'auto' : 0,
                  opacity: activeQuestion === q ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 text-gray-300 text-base">
                  {t(`faq.questions.${q}.answer`)}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-8 text-center"
        >
          <p className="text-[#6C757D]">
            {t('faq.moreQuestions')}{' '}
            <a href="https://t.me/saletradesadvisor">
            <button className="text-[#FFD700] font-medium hover:underline">
              {t('faq.contactUs')}
            </button>
            </a>
            
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;