import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'

export default function Gallery() {
  const { t } = useTranslation()
  useHead({ title: t('pages.gallery.title') })

  return (
    <div className="page">
      <h1>{t('nav.gallery')}</h1>
    </div>
  )
}
