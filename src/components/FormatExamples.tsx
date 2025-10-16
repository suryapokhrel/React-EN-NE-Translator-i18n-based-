import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function FormatExamples() {
  const { t, i18n } = useTranslation();
  const now = new Date();
  const sampleNumber = 1234567.89;
  const samplePrice = 1299.5;
  const sampleRate = 0.875;

  const locale = i18n.language.startsWith("ne") ? "ne-NP" : "en-US";

  const dateStr = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
        timeStyle: "short",
      }).format(now),
    [locale, now]
  );

  const numberStr = useMemo(
    () => new Intl.NumberFormat(locale).format(sampleNumber),
    [locale]
  );

  const currencyStr = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "NPR",
      }).format(samplePrice),
    [locale]
  );

  const percentStr = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
      }).format(sampleRate),
    [locale]
  );

  return (
    <section>
      <h3 style={{ fontSize: "1.25rem", marginBottom: ".75rem" }}>
        {t("examples.header")}
      </h3>
      <div
        style={{
          display: "grid",
          gap: ".4rem",
          color: "#334155",
          lineHeight: 1.5,
        }}
      >
        <p>{t("examples.date", { date: dateStr })}</p>
        <p>{t("examples.number", { value: numberStr })}</p>
        <p>{t("examples.currency", { npr: currencyStr })}</p>
        <p>{t("examples.percent", { rate: percentStr })}</p>
      </div>
    </section>
  );
}
