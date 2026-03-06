import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  const { t } = useTranslation()
  const [countdown, setCountdown] = useState(15)

  /* Auto-redirect after countdown */
  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = '/'
      return
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <section className="notfound">
      {/* Decorative background elements */}
      <div className="notfound__decoration" aria-hidden="true">
        <span className="notfound__orb notfound__orb--1" />
        <span className="notfound__orb notfound__orb--2" />

        {/* Falling leaf shapes (CSS-only) */}
        <span className="notfound__leaf notfound__leaf--1" />
        <span className="notfound__leaf notfound__leaf--2" />
        <span className="notfound__leaf notfound__leaf--3" />
      </div>

      <div className="notfound__content">
        <div className="notfound__hero">
          <h1 className="notfound__code">
            4<span className="notfound__zero">0</span>4
          </h1>
        </div>

        <p className="notfound__eyebrow">{t('notFound.eyebrow')}</p>
        <h2 className="notfound__title">{t('notFound.title')}</h2>
        <p className="notfound__subtitle">{t('notFound.subtitle')}</p>

        {/* Countdown */}
        <div className="notfound__countdown">
          <div className="notfound__countdown-ring">
            <svg viewBox="0 0 80 80" className="notfound__countdown-svg">
              <circle
                cx="40" cy="40" r="36"
                className="notfound__countdown-track"
              />
              <circle
                cx="40" cy="40" r="36"
                className="notfound__countdown-progress"
                style={{
                  strokeDasharray: `${2 * Math.PI * 36}`,
                  strokeDashoffset: `${2 * Math.PI * 36 * (1 - countdown / 15)}`,
                }}
              />
            </svg>
            <span className="notfound__countdown-number">{countdown}</span>
          </div>
          <p className="notfound__countdown-label">
            {t('notFound.redirect', { seconds: countdown })}
          </p>
        </div>

        {/* Navigation links */}
        <div className="notfound__actions">
          <Link to="/" className="notfound__btn notfound__btn--primary">
            {t('notFound.goHome')}
          </Link>
          <Link to="/contact" className="notfound__btn notfound__btn--ghost">
            {t('notFound.goContact')}
          </Link>
        </div>

        {/* Quick links */}
        <div className="notfound__quicklinks">
          <p className="notfound__quicklinks-label">{t('notFound.explore')}</p>
          <div className="notfound__quicklinks-grid">
            <Link to="/about" className="notfound__quicklink">
              {t('nav.about')}
            </Link>
            <Link to="/services" className="notfound__quicklink">
              {t('nav.services')}
            </Link>
            <Link to="/products" className="notfound__quicklink">
              {t('nav.products')}
            </Link>
            <Link to="/gallery" className="notfound__quicklink">
              {t('nav.gallery')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
