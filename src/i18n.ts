import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import ne from './locales/ne.json'

// Helper: normalize language code to our supported set
export const normalize = (lng?: string) => {
  if (!lng) return 'en'
  const low = lng.toLowerCase()
  if (low.startsWith('ne')) return 'ne'
  return 'en'
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ne: { translation: ne },
    },
    fallbackLng: 'en',
    lng: 'en', // default; detector/geo may override
    interpolation: { escapeValue: false },
    detection: {
      // order: try localStorage, then querystring (?lng=ne), then navigator
      order: ['localStorage', 'querystring', 'navigator'],
      lookupQuerystring: 'lng',
      caches: ['localStorage']
    }
  })

// Keep <html lang> in sync for fonts, A11y, SEO
export function syncHtmlLang(current = i18n.language) {
  const lang = normalize(current) === 'ne' ? 'ne-NP' : 'en'
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', lang)
  }
}

// update <html lang> whenever language changes
i18n.on('languageChanged', syncHtmlLang)

export default i18n
