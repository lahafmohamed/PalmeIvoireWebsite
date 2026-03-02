import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'

export default function Services() {
  const { t } = useTranslation()
  useHead({ title: t('pages.services.title') })

  return (
    <div className="page">
      <h1>{t('nav.services')}</h1>
      <p>{t('pages.services.subtitle')}</p>
    </div>
  )
}
