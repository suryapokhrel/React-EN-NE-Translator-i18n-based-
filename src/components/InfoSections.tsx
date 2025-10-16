import { Trans, useTranslation } from "react-i18next";

const card: React.CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: "1rem 1.25rem",
  background: "#fafafa",
};

const title: React.CSSProperties = {
  margin: 0,
  marginBottom: ".25rem",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#0f172a",
};

const body: React.CSSProperties = { marginTop: ".25rem", color: "#475569" };
const ul: React.CSSProperties = { margin: "0.25rem 0 0 1.25rem", color: "#334155" };
const linkStyle = { color: "#2563eb", textDecoration: "underline" };

export default function InfoSections() {
  const { t } = useTranslation();
  return (
    <section style={{ display: "grid", gap: "1.25rem" }}>
      {/* i18n */}
      <div style={card}>
        <h3 style={title}>{t("info.i18n.title")}</h3>
        <p style={body}>{t("info.i18n.body1")}</p>
        <ul style={ul}>
          <li>{t("info.i18n.points.structured")}</li>
          <li>{t("info.i18n.points.plurals")}</li>
          <li>{t("info.i18n.points.seo")}</li>
        </ul>
        <p style={{ marginTop: ".5rem" }}>
          <Trans
            i18nKey="info.i18n.link"
            components={{
              a: (
                <a
                  href="https://www.i18next.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={linkStyle}
                />
              ),
            }}
          />
        </p>
      </div>

      {/* Cloud Translation */}
      <div style={card}>
        <h3 style={title}>{t("info.cloud.title")}</h3>
        <p style={body}>{t("info.cloud.body1")}</p>
        <ul style={ul}>
          <li>{t("info.cloud.points.dynamic")}</li>
          <li>{t("info.cloud.points.glossary")}</li>
          <li>{t("info.cloud.points.cache")}</li>
        </ul>
        <p style={{ marginTop: ".5rem" }}>
          <Trans
            i18nKey="info.cloud.links"
            components={{
              g: (
                <a
                  href="https://cloud.google.com/translate/docs"
                  target="_blank"
                  rel="noreferrer"
                  style={linkStyle}
                />
              ),
              m: (
                <a
                  href="https://learn.microsoft.com/azure/ai-services/translator/"
                  target="_blank"
                  rel="noreferrer"
                  style={linkStyle}
                />
              ),
              a: (
                <a
                  href="https://docs.aws.amazon.com/translate/"
                  target="_blank"
                  rel="noreferrer"
                  style={linkStyle}
                />
              ),
            }}
          />
        </p>
      </div>

      {/* Hybrid */}
      <div style={card}>
        <h3 style={title}>{t("info.hybrid.title")}</h3>
        <p style={body}>{t("info.hybrid.body1")}</p>
        <ul style={ul}>
          <li>{t("info.hybrid.points.split")}</li>
          <li>{t("info.hybrid.points.quality")}</li>
          <li>{t("info.hybrid.points.scale")}</li>
        </ul>
      </div>
    </section>
  );
}
