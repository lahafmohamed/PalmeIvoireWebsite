import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'

export default function About() {
  const { t } = useTranslation()
  useHead({ title: t('pages.about.title') })

  return (
    <div className="page">
      <h1>{t('nav.about')}</h1>
    </div>
  )
}
