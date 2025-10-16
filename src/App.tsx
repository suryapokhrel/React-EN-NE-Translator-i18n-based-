import { useState } from "react";
import { useTranslation } from "react-i18next";
import LocaleSwitcher from "./components/LocaleSwitcher";
import FormatExamples from "./components/FormatExamples";

export default function App() {
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const name = "Surya";
  const now = new Date();
  const today = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
          width: "min(850px, 100%)",
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
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1 style={{ marginBottom: ".25rem", fontSize: "1.75rem" }}>
              🌐 React i18n Language Translator Demo
            </h1>
            <p style={{ color: "#64748b" }}>
              {t("nav.title")} &nbsp;|&nbsp; {today}
            </p>
          </div>
          <LocaleSwitcher />
        </div>

        <hr style={{ margin: "1.5rem 0", borderColor: "#e2e8f0" }} />

        {/* greeting */}
        <section>
          <p style={{ fontSize: "1.25rem", fontWeight: 500, marginBottom: "0.75rem" }}>
            {t("greeting", { name })}
          </p>
          <p style={{ fontSize: "1rem", color: "#475569", marginBottom: "1rem" }}>
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

        {/* examples */}
        <FormatExamples />
      </div>
    </main>
  );
}
