// src/components/LocaleSwitcher.tsx
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function LocaleSwitcher({
  detectedLang,
  detectedCountryLabel,
  detectedLangLabel,
  onDetectedClick
}: {
  detectedLang: string;        // e.g., "ja", "en", "ne"
  detectedCountryLabel: string;// e.g., "Japan"
  detectedLangLabel: string;   // e.g., "Japanese"
  onDetectedClick?: (isSupported: boolean) => void;
}) {
  const { i18n, t } = useTranslation();
  const current = i18n.language.startsWith("ne") ? "ne" : "en";

  const isSupported = (lng: string) => ["en", "ne"].includes(lng);

  const handleClickDetected = async () => {
    if (isSupported(detectedLang)) {
      await i18n.changeLanguage(detectedLang);
      onDetectedClick?.(true);
    } else {
      onDetectedClick?.(false);
    }
  };

  return (
    <div className="row" role="group" aria-label="Language switcher" style={{ gap: 8 }}>
      <button
        onClick={() => i18n.changeLanguage("en")}
        disabled={current === "en"}
        style={{
          border: "1px solid #d1d5db",
          background: current === "en" ? "#e5e7eb" : "#fff",
          borderRadius: 8,
          padding: "8px 12px",
          cursor: current === "en" ? "default" : "pointer",
        }}
      >
        {t("nav.english")}
      </button>

      <button
        onClick={() => i18n.changeLanguage("ne")}
        disabled={current === "ne"}
        style={{
          border: "1px solid #d1d5db",
          background: current === "ne" ? "#e5e7eb" : "#fff",
          borderRadius: 8,
          padding: "8px 12px",
          cursor: current === "ne" ? "default" : "pointer",
        }}
      >
        {t("nav.nepali")}
      </button>

      <button
        onClick={handleClickDetected}
        style={{
          border: "1px solid #d1d5db",
          background: "#fff",
          borderRadius: 8,
          padding: "8px 12px",
          cursor: "pointer",
        }}
        aria-haspopup="dialog"
        title={t("labels.detectedButton", { lang: detectedLangLabel, country: detectedCountryLabel })}
      >
        {t("labels.detectedButton", {
          lang: detectedLangLabel,
          country: detectedCountryLabel,
        })}
      </button>
    </div>
  );
}
