import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function FormatExamples() {
  const { t, i18n } = useTranslation();
  const now = new Date();
  const numberSample = 1234567.89;
  const price = 1299.5;

  const locale = i18n.language.startsWith("ne") ? "ne-NP" : "en-US";

  const dateStr = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(now),
    [locale, now]
  );
  const numberStr = useMemo(
    () => new Intl.NumberFormat(locale).format(numberSample),
    [locale]
  );
  const nprStr = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "NPR",
      }).format(price),
    [locale]
  );

  return (
    <div>
      <h3>{t("examples.header")}</h3>
      <p>{t("examples.date", { date: dateStr })}</p>
      <p>{t("examples.number", { value: numberStr })}</p>
      <p>{t("examples.currency", { npr: nprStr })}</p>
    </div>
  );
}
