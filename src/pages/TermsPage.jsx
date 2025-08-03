import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0A1F44] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl mt-16 font-bold mb-8 text-[#00BFFF]">
          {t('terms.title')}
        </h1>

        <div className="space-y-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <section key={n}>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#00BFFF]">
                {t(`terms.sections.${n}.title`)}
              </h2>
              <p className="text-gray-300">
                {t(`terms.sections.${n}.content`)}
              </p>
            </section>
          ))}

          {/* Дисклеймер */}
          <section className="bg-[#0A1F44] border border-[#00BFFF] rounded-lg p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FFD700]">
              {t('terms.disclaimer.title')}
            </h2>
            {[0, 1, 2, 3, 4].map((i) => (
              <p key={i} className="text-gray-300 mb-4">
                {t(`terms.disclaimer.items.${i}`)}
              </p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
