// src/components/CountryBanner.tsx
export default function CountryBanner({
  countryLabel,
  onClick
}: { countryLabel: string; onClick?: () => void }) {
  const clickable = typeof onClick === "function";
  return (
    <div
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) onClick?.();
      }}
      style={{
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 14,
        color: "#334155",
        cursor: clickable ? "pointer" : "default",
        userSelect: "none"
      }}
      aria-live="polite"
      title={clickable ? "Show language availability" : undefined}
    >
      <strong style={{ fontWeight: 700 }}>Detected country:</strong>{" "}
      <span style={{ textDecoration: clickable ? "underline" : "none" }}>
        {countryLabel}
      </span>
    </div>
  );
}
