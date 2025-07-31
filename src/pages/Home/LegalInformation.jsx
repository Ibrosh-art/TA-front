import React from "react";
import { useTranslation } from "react-i18next";

const LegalInformation = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) return <div>Loading...</div>;


  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-[#0A1F44]/40">
        <h2 className="text-2xl font-bold text-[#0A1F44] mb-6">
          {t("legal.title")}
        </h2>

        <div className="space-y-4 text-[#0A1F44]">
          <div className="flex flex-wrap border-b border-[#6C757D]/20 pb-4">
            <span className="w-full md:w-1/3 font-semibold text-[#6C757D]">
              {t("legal.companyNameLabel")}
            </span>
            <span className="w-full md:w-2/3">{t("company.title")}</span>
          </div>

          <div className="flex flex-wrap border-b border-[#6C757D]/20 pb-4">
            <span className="w-full md:w-1/3 font-semibold text-[#6C757D]">
              {t("legal.registrationNumberLabel")}
            </span>
            <span className="w-full md:w-2/3">{t("legal.registrationNumber")}</span>
          </div>

          <div className="flex flex-wrap border-b border-[#6C757D]/20 pb-4">
            <span className="w-full md:w-1/3 font-semibold text-[#6C757D]">
              {t("legal.addressLabel")}
            </span>
            <span className="w-full md:w-2/3">{t("legal.address")}</span>
          </div>

          <div className="flex flex-wrap border-b border-[#6C757D]/20 pb-4">
            <span className="w-full md:w-1/3 font-semibold text-[#6C757D]">
              {t("legal.contactEmailLabel")}
            </span>
            <span className="w-full md:w-2/3">{t("legal.contactEmail")}</span>
          </div>

          <div className="flex flex-wrap border-b border-[#6C757D]/20 pb-4">
            <span className="w-full md:w-1/3 font-semibold text-[#6C757D]">
              {t("legal.termsLabel")}
            </span>
            <span className="w-full md:w-2/3">
              <a
                href={t("legal.termsLink")}
                className="text-[#00BFFF] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("legal.termsLinkText")}
              </a>
            </span>
          </div>

          <div className="flex flex-wrap">
            <span className="w-full md:w-1/3 font-semibold text-[#6C757D]">
              {t("legal.clientAgreementLabel")}
            </span>
            <span className="w-full md:w-2/3">
              {t("legal.clientAgreementText")}
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <span className="px-4 py-2 bg-[#FFD700] text-[#0A1F44] font-bold rounded-full text-sm">
            {t("legal.premiumBadge")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LegalInformation;
