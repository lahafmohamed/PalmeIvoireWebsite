import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'
import { Link } from 'react-router-dom'
import { useIntersection } from '../hooks/useIntersection'
import { useCountUp } from '../hooks/useCountUp'
import './Home.css'

/* ── Animated stat card ── */
function StatCard({ num, suffix, label, isActive, locale }) {
  const count = useCountUp(num, 1800, isActive)
  const formatted = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(count)
  return (
    <div className="stat-card">
      <span className="stat-card__value">{formatted}{suffix}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  )
}

export default function Home() {
  const { t, i18n } = useTranslation()
  useHead({ title: t('pages.home.title') })

  const stats    = t('pages.home.stats.items',    { returnObjects: true })
  const services = t('pages.home.services.items', { returnObjects: true })
  const values   = t('pages.home.values.items',   { returnObjects: true })
  const certs    = t('pages.home.certifications.items', { returnObjects: true })
  const testimonials = t('pages.home.testimonials.items', { returnObjects: true })

  const [statsRef,    statsVisible]    = useIntersection(0.2)
  const [aboutRef,    aboutVisible]    = useIntersection(0.15)
  const [valuesRef,   valuesVisible]   = useIntersection(0.1)
  const [servicesRef, servicesVisible] = useIntersection(0.1)
  const [certsRef,    certsVisible]    = useIntersection(0.1)
  const [testiRef,    testiVisible]    = useIntersection(0.1)
  const [contactRef,  contactVisible]  = useIntersection(0.2)

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__decoration" aria-hidden="true">
          <span className="hero__orb hero__orb--1" />
          <span className="hero__orb hero__orb--2" />
          <span className="hero__orb hero__orb--3" />
        </div>
        <div className="hero__content">
          <p className="hero__eyebrow">Palme Ivoire</p>
          <h1 className="hero__title">{t('pages.home.welcome')}</h1>
          <p className="hero__subtitle">{t('pages.home.subtitle')}</p>
          <div className="hero__actions">
            <Link to="/services" className="hero__cta">
              {t('pages.home.cta')}
            </Link>
            <Link to="/about" className="hero__cta hero__cta--ghost">
              {t('pages.home.about.cta')} →
            </Link>
          </div>
        </div>
        <div className="hero__image-wrap">
          <img
            src="https://images.pexels.com/photos/2950868/pexels-photo-2950868.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Plantation de palmiers à huile — Palme Ivoire"
            className="hero__image"
          />
        </div>
      </section>

      {/* ── Chiffres clés ── */}
      <section className="stats" ref={statsRef}>
        <p className={`section__label reveal reveal--up ${statsVisible ? 'is-visible' : ''}`}>
          {t('pages.home.stats.label')}
        </p>
        <div className="stats__grid">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`stat-card reveal reveal--up ${statsVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <StatCard
                num={s.num}
                suffix={s.suffix}
                label={s.label}
                isActive={statsVisible}
                locale={i18n.language}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── À propos teaser ── */}
      <section className="home-about" ref={aboutRef}>
        <div className={`home-about__image-wrap reveal reveal--left ${aboutVisible ? 'is-visible' : ''}`}>
          <img
            src="https://images.pexels.com/photos/1382102/pexels-photo-1382102.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Transformation d'huile de palme — Palme Ivoire"
            className="home-about__image"
          />
          <div className="home-about__image-badge">
            <span className="home-about__badge-value">100%</span>
            <span className="home-about__badge-label">Premium CPO/PKO</span>
          </div>
        </div>
        <div className={`home-about__content reveal reveal--right ${aboutVisible ? 'is-visible' : ''}`}>
          <p className="section__label">{t('pages.home.about.label')}</p>
          <h2 className="home-about__title">{t('pages.home.about.title')}</h2>
          <p className="home-about__body">{t('pages.home.about.body')}</p>
          <Link to="/about" className="home-about__cta">{t('pages.home.about.cta')} →</Link>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="home-values" ref={valuesRef}>
        <p className={`section__label reveal reveal--up ${valuesVisible ? 'is-visible' : ''}`}>
          {t('pages.home.values.label')}
        </p>
        <h2 className={`section__heading reveal reveal--up ${valuesVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.08s' }}>
          {t('pages.home.values.title')}
        </h2>
        <div className="home-values__grid">
          {values.map((v, i) => (
            <div
              key={i}
              className={`value-card reveal reveal--up ${valuesVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
            >
              <span className="value-card__icon">{v.icon}</span>
              <h3 className="value-card__title">{v.title}</h3>
              <p className="value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="home-services" ref={servicesRef}>
        <div className={`home-services__header reveal reveal--up ${servicesVisible ? 'is-visible' : ''}`}>
          <p className="section__label">{t('pages.home.services.label')}</p>
          <p className="section__subtitle">{t('pages.home.services.subtitle')}</p>
        </div>
        <div className="home-services__grid">
          {services.map((s, i) => (
            <div
              key={i}
              className={`service-card reveal reveal--up ${servicesVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              <span className="service-card__icon">{s.icon}</span>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className={`home-services__cta reveal reveal--up ${servicesVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.6s' }}>
          <Link to="/services" className="hero__cta">
            {t('pages.home.services.cta')}
          </Link>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="home-certifications" ref={certsRef}>
        <p className={`section__label reveal reveal--up ${certsVisible ? 'is-visible' : ''}`}>
          {t('pages.home.certifications.label')}
        </p>
        <h2 className={`section__heading reveal reveal--up ${certsVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.08s' }}>
          {t('pages.home.certifications.title')}
        </h2>
        <div className="certifications__grid">
          {certs.map((c, i) => (
            <div
              key={i}
              className={`cert-card reveal reveal--up ${certsVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
            >
              <span className="cert-card__icon">{c.icon}</span>
              <h3 className="cert-card__title">{c.title}</h3>
              <p className="cert-card__desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="home-testimonials" ref={testiRef}>
        <p className={`section__label reveal reveal--up ${testiVisible ? 'is-visible' : ''}`}>
          {t('pages.home.testimonials.label')}
        </p>
        <h2 className={`section__heading reveal reveal--up ${testiVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.08s' }}>
          {t('pages.home.testimonials.title')}
        </h2>
        <div className="testimonials__grid">
          {testimonials.map((test, i) => (
            <div
              key={i}
              className={`testimonial-card reveal reveal--up ${testiVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
            >
              <p className="testimonial-card__text">"{test.text}"</p>
              <div className="testimonial-card__author">
                <span className="testimonial-card__avatar">{test.icon}</span>
                <div>
                  <p className="testimonial-card__name">{test.author}</p>
                  <p className="testimonial-card__role">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Contact ── */}
      <section className="home-contact" ref={contactRef}>
        <div className="home-contact__bg" aria-hidden="true" />
        <h2 className={`home-contact__title reveal reveal--up ${contactVisible ? 'is-visible' : ''}`}>
          {t('pages.home.contact.label')}
        </h2>
        <p className={`home-contact__subtitle reveal reveal--up ${contactVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.12s' }}>
          {t('pages.home.contact.subtitle')}
        </p>
        <Link
          to="/contact"
          className={`home-contact__cta reveal reveal--up ${contactVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.24s' }}
        >
          {t('pages.home.contact.cta')}
        </Link>
      </section>

    </div>
  )
}
