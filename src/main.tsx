import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18n, { syncHtmlLang, normalize } from './i18n'
import { detectDefaultLocaleFromGeo } from './locale-detect.ts'

function Root() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    (async () => {
      const cached = localStorage.getItem('i18nextLng')
      if (cached) {
        syncHtmlLang(cached)
        setReady(true)
        return
      }
      try {
        const geoLocale = await detectDefaultLocaleFromGeo()
        const supported = normalize(geoLocale)
        await i18n.changeLanguage(supported)
        syncHtmlLang(supported)
      } catch {
        syncHtmlLang(i18n.language)
      }
      setReady(true)
    })()
  }, [])
  if (!ready) return null
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
