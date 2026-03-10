import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageSeo } from '../hooks/useSeo'
import { Link } from 'react-router-dom'
import { useIntersection } from '../hooks/useIntersection'
import { useCountUp } from '../hooks/useCountUp'
import { Icon } from '../components/ui/Icon'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import { SLIDE_META } from '../data/slides'
import './Home.css'

/* ── Hero Slider ── */
function HeroSlider({ slides }) {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [paused, slides.length])

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent(c => (c + 1) % slides.length)

  return (
    <section
      className="hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero__decoration" aria-hidden="true">
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <span className="hero__orb hero__orb--3" />
      </div>

      {slides.map((slide, i) => {
        const meta = SLIDE_META[i] || SLIDE_META[0]
        return (
          <div key={i} className={`hero-slide${i === current ? ' is-active' : ''}`} aria-hidden={i !== current}>
            <div className="hero__content">
              <p className="hero__eyebrow">{slide.eyebrow}</p>
              <h1 className="hero__title">{slide.title}</h1>
              <p className="hero__subtitle">{slide.subtitle}</p>
              <div className="hero__actions">
                <Link to={meta.ctaLink} className="hero__cta hero__cta--white">{slide.cta}</Link>
                {slide.ctaGhost && meta.ctaGhostLink && (
                  <Link to={meta.ctaGhostLink} className="hero__cta hero__cta--ghost">
                    {slide.ctaGhost} →
                  </Link>
                )}
              </div>
            </div>
            <div className="hero__image-wrap">
              <OptimizedImage
                src={meta.image}
                alt={slide.title}
                className="hero__image"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={i === 0}
              />
            </div>
          </div>
        )
      })}

      <button
        className="hero-slider__arrow hero-slider__arrow--prev"
        onClick={prev}
        aria-label="Slide précédent"
      >&#8249;</button>
      <button
        className="hero-slider__arrow hero-slider__arrow--next"
        onClick={next}
        aria-label="Slide suivant"
      >&#8250;</button>

      <div className="hero-slider__dots" role="tablist">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            className={`hero-slider__dot${i === current ? ' is-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

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
  usePageSeo('home', '/')

  const heroSlides   = t('pages.home.heroSlider.slides', { returnObjects: true })
  const stats    = t('pages.home.stats.items',    { returnObjects: true })
  const services = t('pages.home.services.items', { returnObjects: true })
  const products = t('pages.home.productCategories.items', { returnObjects: true })
  const values   = t('pages.home.values.items',   { returnObjects: true })
  const certs    = t('pages.home.certifications.items', { returnObjects: true })

  const [statsRef,    statsVisible]    = useIntersection(0.2)
  const [aboutRef,    aboutVisible]    = useIntersection(0.15)
  const [productsRef, productsVisible] = useIntersection(0.1)
  const [valuesRef,   valuesVisible]   = useIntersection(0.1)
  const [servicesRef, servicesVisible] = useIntersection(0.1)
  const [certsRef,    certsVisible]    = useIntersection(0.1)
  const [contactRef,  contactVisible]  = useIntersection(0.2)

  return (
    <div className="home">

      {/* ── Hero Slider ── */}
      <HeroSlider slides={heroSlides} />

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
          <OptimizedImage
            src="/cpoPhoto.png"
            alt="Transformation d'huile de palme — Palme Ivoire"
            className="home-about__image"
            width={600}
            height={480}
            sizes="(max-width: 768px) 100vw, 50vw"
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

      {/* ── Produits ── */}
      <section className="home-products" ref={productsRef}>
        <p className={`section__label reveal reveal--up ${productsVisible ? 'is-visible' : ''}`}>
          {t('pages.home.productCategories.label')}
        </p>
        <h2 className={`section__heading reveal reveal--up ${productsVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.08s' }}>
          {t('pages.home.productCategories.title')}
        </h2>
        <p className={`section__subtitle reveal reveal--up ${productsVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.12s' }}>
          {t('pages.home.productCategories.subtitle')}
        </p>
        <div className="home-products__grid">
          {products.map((p, i) => (
            <div
              key={i}
              className={`product-card reveal reveal--up ${productsVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
            >
              <span className="product-card__icon"><Icon name={p.icon} size={32} /></span>
              <h3 className="product-card__title">{p.title}</h3>
              <p className="product-card__desc">{p.desc}</p>
              <p className="product-card__specs">{p.specs}</p>
            </div>
          ))}
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
              <span className="value-card__icon"><Icon name={v.icon} size={28} /></span>
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
              <span className="service-card__icon"><Icon name={s.icon} size={32} /></span>
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
              <span className="cert-card__icon"><Icon name={c.icon} size={28} /></span>
              <h3 className="cert-card__title">{c.title}</h3>
              <p className="cert-card__desc">{c.desc}</p>
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
