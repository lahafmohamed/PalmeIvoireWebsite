import { useHead } from '@unhead/react'
import { useTranslation } from 'react-i18next'

const BASE_URL = 'https://palmeivoire.ci'
const OG_IMAGE = `${BASE_URL}/og-image.jpg`

/**
 * usePageSeo(path)
 * Reads t('pages.<key>.title') and t('pages.<key>.meta') from i18n
 * and injects full SEO head tags for the current page.
 *
 * @param {string} path  - route path, e.g. '/about'
 * @param {string} i18nKey - pages.<key> namespace, e.g. 'about'
 */
export function usePageSeo(i18nKey, path) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language || 'fr'
  const altLang = lang === 'fr' ? 'en' : 'fr'

  const title = t(`pages.${i18nKey}.title`)
  const description = t(`pages.${i18nKey}.meta`)
  const canonical = `${BASE_URL}${path}`
  const altUrl = `${BASE_URL}${path}`

  useHead({
    title,
    htmlAttrs: { lang },
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:locale', content: lang === 'fr' ? 'fr_CI' : 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [
      { rel: 'canonical', href: canonical },
      { rel: 'alternate', hreflang: lang, href: altUrl },
      { rel: 'alternate', hreflang: altLang, href: altUrl },
      { rel: 'alternate', hreflang: 'x-default', href: `${BASE_URL}${path}` },
    ],
  })
}
