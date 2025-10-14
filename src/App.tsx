import { useState } from "react";
import { useTranslation } from "react-i18next";
import LocaleSwitcher from "./components/LocaleSwitcher";
import FormatExamples from "./components/FormatExamples";

export default function App() {
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const name = "Surya";

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>{t("nav.title")}</h2>
        <LocaleSwitcher />
      </div>
      <hr />
      <p style={{ fontSize: "1.25rem" }}>{t("greeting", { name })}</p>
      <div className="row">
        <button onClick={() => setCount(Math.max(0, count - 1))}>–</button>
        <span className="code">count = {count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <p>{t("items", { count })}</p>
      <hr />
      <FormatExamples />
    </div>
  );
}
