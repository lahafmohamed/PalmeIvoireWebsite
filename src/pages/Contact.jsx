import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'

export default function Contact() {
  const { t } = useTranslation()
  useHead({ title: t('pages.contact.title') })

  return (
    <div className="page">
      <h1>{t('nav.contact')}</h1>
    </div>
  )
}
