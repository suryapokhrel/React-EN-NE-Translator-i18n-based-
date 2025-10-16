import { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";

type Props = {
  tz: string;
  detectedCountry?: string;
  detectedLang?: string;
};

export default function FormatExamples({ tz, detectedCountry, detectedLang }: Props) {
  const { t, i18n } = useTranslation();
  const now = new Date();
  const numberSample = 1234567.89;
  const price = 1299.5;

  const locale = i18n.language.startsWith("ne") ? "ne-NP" : "en-US";

  const dateStr = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: tz,
      }).format(now),
    [locale, now, tz]
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

  const percentStr = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
      }).format(0.875),
    [locale]
  );

  const unsupported =
    detectedLang && !["en", "ne"].includes(detectedLang.toLowerCase());

  return (
    <section>
      <h3 style={{ fontSize: "1.25rem", marginBottom: ".75rem", fontWeight: 700 }}>
        {t("examples.header")}
      </h3>

      <div
        style={{
          display: "grid",
          gap: ".6rem",
          color: "#334155",
          lineHeight: 1.55,
          marginBottom: "1.25rem",
        }}
      >
        <p>{t("examples.date", { date: dateStr })}</p>
        <p>{t("examples.number", { value: numberStr })}</p>
        <p>{t("examples.currency", { npr: nprStr })}</p>
        <p>{t("examples.percent", { rate: percentStr })}</p>

        {unsupported && (
          <p style={{ fontSize: ".95rem", color: "#475569" }}>
            {t("messages.unsupportedCountry", {
              country: detectedCountry || t("labels.country.unknown"),
            })}
          </p>
        )}
      </div>

      {/* Desktop table */}
      <div className="pricing-table">
        <div className="pricing-table__head">{t("pricing.title")}</div>
        <table>
          <thead>
            <tr>
              <th>{t("pricing.col.method")}</th>
              <th>{t("pricing.col.cost")}</th>
              <th>{t("pricing.col.pros")}</th>
              <th>{t("pricing.col.cons")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("pricing.rows.i18n.name")}</td>
              <td>{t("pricing.rows.i18n.cost")}</td>
              <td>{t("pricing.rows.i18n.pros")}</td>
              <td>{t("pricing.rows.i18n.cons")}</td>
            </tr>
            <tr>
              <td>{t("pricing.rows.cloud.name")}</td>
              <td>{t("pricing.rows.cloud.cost")}</td>
              <td>{t("pricing.rows.cloud.pros")}</td>
              <td>{t("pricing.rows.cloud.cons")}</td>
            </tr>
            <tr>
              <td>{t("pricing.rows.hybrid.name")}</td>
              <td>{t("pricing.rows.hybrid.cost")}</td>
              <td>{t("pricing.rows.hybrid.pros")}</td>
              <td>{t("pricing.rows.hybrid.cons")}</td>
            </tr>
          </tbody>
        </table>
        <div className="pricing-table__refs">
          <Trans
            i18nKey="pricing.refs"
            components={{
              g: (
                <a
                  href="https://cloud.google.com/translate/pricing"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
              m: (
                <a
                  href="https://azure.microsoft.com/pricing/details/cognitive-services/translator/"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
              a: (
                <a
                  href="https://aws.amazon.com/translate/pricing/"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
            }}
          />
        </div>
      </div>

      {/* Mobile list */}
      <div className="pricing-list">
        <div className="pricing-list__title">{t("pricing.title")}</div>

        <div className="pricing-card">
          <div className="pricing-card__method">{t("pricing.rows.i18n.name")}</div>
          <div className="pricing-card__row">
            <span>{t("pricing.col.cost")}</span>
            <span>{t("pricing.rows.i18n.cost")}</span>
          </div>
          <div className="pricing-card__row">
            <span>{t("pricing.col.pros")}</span>
            <span>{t("pricing.rows.i18n.pros")}</span>
          </div>
          <div className="pricing-card__row">
            <span>{t("pricing.col.cons")}</span>
            <span>{t("pricing.rows.i18n.cons")}</span>
          </div>
        </div>

        <div className="pricing-card">
          <div className="pricing-card__method">{t("pricing.rows.cloud.name")}</div>
          <div className="pricing-card__row">
            <span>{t("pricing.col.cost")}</span>
            <span>{t("pricing.rows.cloud.cost")}</span>
          </div>
          <div className="pricing-card__row">
            <span>{t("pricing.col.pros")}</span>
            <span>{t("pricing.rows.cloud.pros")}</span>
          </div>
          <div className="pricing-card__row">
            <span>{t("pricing.col.cons")}</span>
            <span>{t("pricing.rows.cloud.cons")}</span>
          </div>
        </div>

        <div className="pricing-card">
          <div className="pricing-card__method">{t("pricing.rows.hybrid.name")}</div>
          <div className="pricing-card__row">
            <span>{t("pricing.col.cost")}</span>
            <span>{t("pricing.rows.hybrid.cost")}</span>
          </div>
          <div className="pricing-card__row">
            <span>{t("pricing.col.pros")}</span>
            <span>{t("pricing.rows.hybrid.pros")}</span>
          </div>
          <div className="pricing-card__row">
            <span>{t("pricing.col.cons")}</span>
            <span>{t("pricing.rows.hybrid.cons")}</span>
          </div>
        </div>

        <div className="pricing-list__refs">
          <Trans
            i18nKey="pricing.refs"
            components={{
              g: <a href="https://cloud.google.com/translate/pricing" target="_blank" rel="noreferrer" />,
              m: <a href="https://azure.microsoft.com/pricing/details/cognitive-services/translator/" target="_blank" rel="noreferrer" />,
              a: <a href="https://aws.amazon.com/translate/pricing/" target="_blank" rel="noreferrer" />
            }}
          />
        </div>
      </div>
    </section>
  );
}
