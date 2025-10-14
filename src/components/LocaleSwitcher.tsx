import { useTranslation } from "react-i18next";

export default function LocaleSwitcher() {
  const { i18n, t } = useTranslation();
  const current = i18n.language.startsWith("ne") ? "ne" : "en";

  const setLang = (lng: "en" | "ne") => {
    i18n.changeLanguage(lng);
    // cache choice (detector also caches, this makes it explicit)
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <div className="row" role="group" aria-label="Language switcher">
      <button onClick={() => setLang("en")} disabled={current === "en"}>
        {t("nav.english")}
      </button>
      <button onClick={() => setLang("ne")} disabled={current === "ne"}>
        {t("nav.nepali")}
      </button>
    </div>
  );
}
