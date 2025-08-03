import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0A1F44] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl mt-16 font-bold mb-6 text-[#00BFFF]">
          {t('privacy.title')}
        </h1>
        <p className="text-[#6C757D] mb-8">{t('privacy.updated')}</p>

        <div className="space-y-8">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <section key={n}>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#00BFFF]">
                {t(`privacy.sections.${n}.title`)}
              </h2>
              <p className="text-gray-300">
                {t(`privacy.sections.${n}.content`)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
