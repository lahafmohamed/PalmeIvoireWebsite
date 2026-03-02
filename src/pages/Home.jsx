import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const { t } = useTranslation()
  useHead({ title: t('pages.home.title') })

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Palmes Ivoire</p>
          <h1 className="hero__title">{t('pages.home.welcome')}</h1>
          <p className="hero__subtitle">{t('pages.home.subtitle')}</p>
          <Link to="/services" className="hero__cta">
            {t('pages.home.cta')}
          </Link>
        </div>
      </section>
    </div>
  )
}
