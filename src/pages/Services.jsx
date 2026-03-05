import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'
import { Link } from 'react-router-dom'
import { useIntersection } from '../hooks/useIntersection'
import { Icon } from '../components/Icon'
import './Services.css'

export default function Services() {
  const { t } = useTranslation()
  useHead({ title: t('pages.services.title') })

  const hero = t('pages.services.hero', { returnObjects: true })
  const mainServices = t('pages.services.mainServices', { returnObjects: true })
  const process = t('pages.services.process', { returnObjects: true })
  const advantages = t('pages.services.advantages', { returnObjects: true })
  const cta = t('pages.services.cta', { returnObjects: true })

  const [servicesRef, servicesVisible] = useIntersection(0.1)
  const [processRef, processVisible] = useIntersection(0.1)
  const [advantagesRef, advantagesVisible] = useIntersection(0.1)
  const [ctaRef, ctaVisible] = useIntersection(0.2)

  return (
    <div className="services-page">

      {/* ── Hero Section ── */}
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="section__label">{hero.eyebrow}</p>
          <h1 className="page-hero__title">{hero.title}</h1>
          <p className="page-hero__subtitle">{hero.subtitle}</p>
        </div>
        <div className="page-hero__decoration" aria-hidden="true">
          <span className="page-hero__orb page-hero__orb--1" />
          <span className="page-hero__orb page-hero__orb--2" />
        </div>
      </section>

      {/* ── Main Services ── */}
      <section className="services-main" ref={servicesRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${servicesVisible ? 'is-visible' : ''}`}>
            {mainServices.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${servicesVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {mainServices.title}
          </h2>
          <div className="services-grid">
            {mainServices.items.map((s, i) => (
              <div
                key={i}
                className={`service-card reveal reveal--up ${servicesVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              >
                <span className="service-card__icon"><Icon name={s.icon} size={36} /></span>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="services-process" ref={processRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${processVisible ? 'is-visible' : ''}`}>
            {process.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${processVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {process.title}
          </h2>
          <p className={`services-process__desc reveal reveal--up ${processVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.12s' }}>
            {process.description}
          </p>
          <div className="process-flow">
            {process.steps.map((step, i) => (
              <div
                key={i}
                className={`process-item reveal reveal--up ${processVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
              >
                <div className="process-item__number">{step.num}</div>
                <h3 className="process-item__title">{step.title}</h3>
                <p className="process-item__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advantages ── */}
      <section className="services-advantages" ref={advantagesRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${advantagesVisible ? 'is-visible' : ''}`}>
            {advantages.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${advantagesVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {advantages.title}
          </h2>
          <div className="advantages-grid">
            {advantages.items.map((adv, i) => (
              <div
                key={i}
                className={`advantage-card reveal reveal--up ${advantagesVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <span className="advantage-card__icon"><Icon name={adv.icon} size={24} /></span>
                <h3 className="advantage-card__title">{adv.title}</h3>
                <p className="advantage-card__desc">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-cta" ref={ctaRef}>
        <div className="page-cta__bg" aria-hidden="true" />
        <h2 className={`page-cta__title reveal reveal--up ${ctaVisible ? 'is-visible' : ''}`}>
          {cta.label}
        </h2>
        <p className={`page-cta__subtitle reveal reveal--up ${ctaVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.12s' }}>
          {cta.subtitle}
        </p>
        <Link
          to={cta.ctaLink}
          className={`hero__cta reveal reveal--up ${ctaVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.24s' }}
        >
          {cta.ctaButton}
        </Link>
      </section>

    </div>
  )
}
