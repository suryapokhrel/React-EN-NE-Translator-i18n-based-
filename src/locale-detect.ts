// Minimal geo-based locale detection.
// Strategy:
// - If Geolocation API is available, try it and call a reverse-geo API.
// - Else, fall back to IP geolocation API.
// - Map country code → supported locale (NP → 'ne', otherwise 'en').
// Replace endpoints with your own service in production and handle privacy/consent.

const COUNTRY_TO_LOCALE: Record<string, 'en' | 'ne'> = {
  NP: 'ne',
  // add more if you support them later
}

function mapCountryToLocale(countryCode?: string): 'en' | 'ne' {
  if (!countryCode) return 'en'
  const up = countryCode.toUpperCase()
  return COUNTRY_TO_LOCALE[up] ?? 'en'
}

async function withTimeout<T>(p: Promise<T>, ms = 2500): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('timeout')), ms)
    p.then(v => { clearTimeout(id); resolve(v) })
     .catch(e => { clearTimeout(id); reject(e) })
  })
}

async function detectByIP(): Promise<'en' | 'ne'> {
  // Example public endpoint; swap for your backend or a paid service.
  // ipapi.co returns { country: "NP", ... }
  const res = await withTimeout(fetch('https://ipapi.co/json/'))
  const json = await res.json().catch(() => ({} as any))
  return mapCountryToLocale(json?.country)
}

async function detectByGeoAPI(): Promise<'en' | 'ne'> {
  if (!('geolocation' in navigator)) throw new Error('no geolocation')
  const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: false, timeout: 2000 })
  })
  const { latitude, longitude } = pos.coords
  // Example: Nominatim (OpenStreetMap) — replace with your service
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
  const res = await withTimeout(fetch(url, { headers: { 'Accept-Language': 'en' } }))
  const json = await res.json()
  const countryCode = json?.address?.country_code?.toUpperCase()
  return mapCountryToLocale(countryCode)
}

export async function detectDefaultLocaleFromGeo(): Promise<'en' | 'ne'> {
  try {
    return await detectByGeoAPI()
  } catch {
    try {
      return await detectByIP()
    } catch {
      return 'en'
    }
  }
}
