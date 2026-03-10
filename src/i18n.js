import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './locales/fr.json'
import en from './locales/en.json'

const initialLang = localStorage.getItem('lang') || 'fr'
document.documentElement.lang = initialLang

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: initialLang,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
  })

i18n.on('languageChanged', lng => {
  document.documentElement.lang = lng
})

export default i18n
