// src/utils/geo.ts
export type GeoInfo = {
  country_name?: string; // e.g., "United States"
  country?: string; // e.g., "US"
  timezone?: string; // e.g., "America/New_York"
};

const COUNTRY_TO_LANG: Record<string, string> = {
  NP: "ne",
  IN: "hi",
  US: "en",
  GB: "en",
  AU: "en",
  CA: "en",
  JP: "ja",
  CN: "zh",
  FR: "fr",
  DE: "de",
  ES: "es",
};

async function withTimeout<T>(p: Promise<T>, ms = 3000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("timeout")), ms);
    p.then((v) => {
      clearTimeout(id);
      resolve(v);
    }).catch((e) => {
      clearTimeout(id);
      reject(e);
    });
  });
}

// Try multiple public endpoints (for dev/demo). In prod, proxy through your backend.
async function tryIpapi(): Promise<GeoInfo | null> {
  try {
    const res = await withTimeout(fetch("https://ipapi.co/json/"));
    if (!res.ok) return null;
    const json = await res.json();
    return {
      country_name: json?.country_name,
      country: json?.country,
      timezone: json?.timezone,
    };
  } catch {
    return null;
  }
}

async function tryIpwho(): Promise<GeoInfo | null> {
  try {
    const res = await withTimeout(fetch("https://ipwho.is/"));
    if (!res.ok) return null;
    const json = await res.json();
    return {
      country_name: json?.country,
      country: json?.country_code,
      timezone: json?.timezone?.id,
    };
  } catch {
    return null;
  }
}

async function tryIfconfig(): Promise<GeoInfo | null> {
  try {
    const res = await withTimeout(
      fetch("https://ifconfig.co/json", {
        headers: { Accept: "application/json" },
      })
    );
    if (!res.ok) return null;
    const json = await res.json();
    return {
      country_name: json?.country,
      country: json?.country_iso,
      timezone: json?.timezone,
    };
  } catch {
    return null;
  }
}

export async function detectGeo(): Promise<GeoInfo> {
  return (
    (await tryIpapi()) || (await tryIpwho()) || (await tryIfconfig()) || {}
  );
}

export function languageFromCountry(countryCode?: string): string {
  if (!countryCode) return "en";
  return COUNTRY_TO_LANG[countryCode.toUpperCase()] || "en";
}

export function regionDisplayName(regionCode?: string, locale = "en"): string {
  try {
    const dn = new Intl.DisplayNames([locale], { type: "region" });
    return regionCode ? dn.of(regionCode) || regionCode : "Unknown";
  } catch {
    return regionCode || "Unknown";
  }
}

export function languageDisplayName(langCode: string, locale = "en"): string {
  try {
    const dn = new Intl.DisplayNames([locale], { type: "language" });
    return dn.of(langCode) || langCode;
  } catch {
    return langCode;
  }
}
