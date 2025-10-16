// src/App.tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import LocaleSwitcher from "./components/LocaleSwitcher";
import FormatExamples from "./components/FormatExamples";
import CountryBanner from "./components/CountryBanner";
import InfoSections from "./components/InfoSections";

import {
  detectGeo,
  languageFromCountry,
  languageDisplayName,
  regionDisplayName,
} from "./utils/geo";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function App() {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState(1);
  const name = "Surya";

  // geo state
  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [countryName, setCountryName] = useState<string>("Unknown");
  const [tz, setTz] = useState<string>(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  );

  // central alert state
  const [unsupportedOpen, setUnsupportedOpen] = useState(false);

  const detectedLang = languageFromCountry(countryCode);

  const detectedCountryLabel = useMemo(
    () =>
      regionDisplayName(
        countryCode,
        i18n.language.startsWith("ne") ? "ne-NP" : "en-US"
      ),
    [countryCode, i18n.language]
  );
  const detectedLangLabel = useMemo(
    () =>
      languageDisplayName(
        detectedLang,
        i18n.language.startsWith("ne") ? "ne-NP" : "en-US"
      ),
    [detectedLang, i18n.language]
  );

  // Geo detection on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const geo = await detectGeo();
        if (cancelled) return;
        setCountryCode(geo.country);
        setCountryName(geo.country_name || "Unknown");
        if (geo.timezone) setTz(geo.timezone);
      } catch {
        // keep defaults
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // date header (UI locale)
  const today = useMemo(() => {
    return new Intl.DateTimeFormat(
      i18n.language.startsWith("ne") ? "ne-NP" : "en-US",
      { weekday: "long", month: "long", day: "numeric", year: "numeric" }
    ).format(new Date());
  }, [i18n.language]);

  const isSupported = ["en", "ne"].includes(detectedLang);

  const handleDetectedClick = (supported?: boolean) => {
    if (typeof supported === "boolean") {
      if (!supported) setUnsupportedOpen(true);
      return;
    }
    // from banner
    if (!isSupported) setUnsupportedOpen(true);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,248,252,0.95))",
        color: "#1e293b",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "min(900px, 100%)",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          padding: "2rem 2.5rem",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h1 style={{ marginBottom: ".25rem", fontSize: "1.75rem" }}>
              🌐 React i18n Language Translator Demo
            </h1>
            <p style={{ color: "#64748b", margin: 0 }}>
              {t("nav.title")} &nbsp;|&nbsp; {today}
            </p>
            <div style={{ marginTop: 8 }}>
              <CountryBanner countryLabel={countryName} onClick={() => handleDetectedClick()} />
            </div>
          </div>

          <LocaleSwitcher
            detectedLang={detectedLang}
            detectedCountryLabel={detectedCountryLabel}
            detectedLangLabel={detectedLangLabel}
            onDetectedClick={handleDetectedClick}
          />
        </div>

        <hr style={{ margin: "1.25rem 0", borderColor: "#e2e8f0" }} />

        {/* greeting */}
        <section>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: 500,
              marginBottom: "0.75rem",
            }}
          >
            {t("greeting", { name })}
          </p>
          <p
            style={{ fontSize: "1rem", color: "#475569", marginBottom: "1rem" }}
          >
            {t("items", { count })}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <button
              onClick={() => setCount(Math.max(0, count - 1))}
              style={{
                border: "none",
                background: "#e2e8f0",
                borderRadius: "8px",
                padding: "0.5rem 0.9rem",
                fontSize: "1.25rem",
                cursor: "pointer",
              }}
            >
              –
            </button>
            <span
              style={{
                fontFamily: "monospace",
                background: "#f1f5f9",
                padding: "0.4rem 0.75rem",
                borderRadius: "6px",
              }}
            >
              {t("countLabel", { count })}
            </span>
            <button
              onClick={() => setCount(count + 1)}
              style={{
                border: "none",
                background: "#2563eb",
                color: "white",
                borderRadius: "8px",
                padding: "0.5rem 0.9rem",
                fontSize: "1.25rem",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        </section>

        <hr style={{ margin: "1.75rem 0", borderColor: "#e2e8f0" }} />

        {/* examples (use detected tz) */}
        <FormatExamples
          tz={tz}
          detectedCountry={countryName}
          detectedLang={detectedLang}
        />
        <hr style={{ margin: "1.75rem 0", borderColor: "#e2e8f0" }} />
        <InfoSections />

        {/* footer with timezone */}
        <footer
          style={{
            marginTop: "1.5rem",
            fontSize: ".95rem",
            color: "#64748b",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span>
            {t("footer.tz")}: <code>{tz}</code>
          </span>
          <span>© {new Date().getFullYear()} i18n Demo</span>
        </footer>
      </div>

      {/* Central AlertDialog */}
      <AlertDialog open={unsupportedOpen} onOpenChange={setUnsupportedOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("alerts.noTranslationTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("alerts.noTranslationRich", {
                country: detectedCountryLabel,
                lang: detectedLangLabel,
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUnsupportedOpen(false)}>
              {t("actions.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setUnsupportedOpen(false);
                i18n.changeLanguage("en");
              }}
            >
              {t("actions.switchToEnglish")}
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => {
                setUnsupportedOpen(false);
                i18n.changeLanguage("ne");
              }}
            >
              {t("actions.switchToNepali")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
