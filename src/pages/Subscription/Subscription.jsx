import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SubscriptionHero = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) return <div>Loading...</div>;

  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const subscriptionPlans = [
    {
      name: 'Starter',
      price: '$15',
      features: [
        t('subscription.features.starter.1'),
        t('subscription.features.starter.2')
      ],
      color: 'from-[#00BFFF] to-[#0077B6]',
      popular: false

    },
    {
      name: 'Pro',
      price: '$30',
      features: [
        t('subscription.features.pro.1'),
        t('subscription.features.pro.2'),
        t('subscription.features.pro.3')
      ],
      color: 'from-[#00BFFF] to-[#0096FF]',
      popular: true
    },
    {
      name: 'Elite',
      price: '$50',
      features: [
        t('subscription.features.elite.1'),
        t('subscription.features.elite.2')
      ],
      color: 'from-[#FFD700] to-[#FFA500]',
      popular: false
    }
  ];

  return (
    <div className="bg-[#0A1F44] text-white pt-40 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BFFF] to-[#0077B6]">
              {t('subscription.title')}
            </span>
          </h1>
          <p className="text-xl text-[#7d7d6c] max-w-3xl mx-auto">
            {t('subscription.subtitle')}
          </p>
        </motion.div>

        {/* Pricing Table */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className={`relative rounded-xl overflow-hidden border border-[#00BFFF]/20 ${plan.popular ? 'ring-2 ring-[#FFD700]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#FFD700] text-[#0A1F44] px-4 py-1 text-sm font-bold rounded-bl-lg">
                  {t('subscription.popular')}
                </div>
              )}
              
              <div className={`bg-gradient-to-br ${plan.color} p-6 text-center`}>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="my-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-[#ffffff]">/{t('subscription.month')}</span>
                </div>
              </div>
              
              <div className="bg-[#0A1F44] p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-[#00BFFF] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://t.me/sd_tradesadvisor">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full mt-8 py-3 px-6 rounded-lg font-medium transition-all ${
                    plan.popular 
                      ? 'bg-[#FFD700] text-[#0A1F44] hover:bg-[#FFC000]'
                      : 'bg-[#00BFFF] text-white hover:bg-[#0096FF]'
                  }`}
                >
                  {t('subscription.cta')}
                </motion.button>
                </a>
                
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionHero;