import { useTranslation } from 'react-i18next'
import { usePageSeo } from '../hooks/useSeo'
import { Link } from 'react-router-dom'
import { useIntersection } from '../hooks/useIntersection'
import { useCountUp } from '../hooks/useCountUp'
import { Icon } from '../components/ui/Icon'
import './About.css'

export default function About() {
  const { t } = useTranslation()
  usePageSeo('about', '/about')

  const mission = t('pages.about.mission', { returnObjects: true })
  const story = t('pages.about.story', { returnObjects: true })
  const expertise = t('pages.about.expertise', { returnObjects: true })
  const process = t('pages.about.process', { returnObjects: true })
  const impact = t('pages.about.impact', { returnObjects: true })
  const values = t('pages.about.values', { returnObjects: true })
  const cta = t('pages.about.cta', { returnObjects: true })

  const [missionRef, missionVisible] = useIntersection(0.2)
  const [storyRef, storyVisible] = useIntersection(0.15)
  const [expertiseRef, expertiseVisible] = useIntersection(0.1)
  const [processRef, processVisible] = useIntersection(0.1)
  const [impactRef, impactVisible] = useIntersection(0.2)
  const [valuesRef, valuesVisible] = useIntersection(0.1)
  const [ctaRef, ctaVisible] = useIntersection(0.2)

  return (
    <div className="about-page">

      {/* ── Hero Section ── */}
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="section__label">{t('pages.about.hero.eyebrow')}</p>
          <h1 className="page-hero__title">{t('pages.about.hero.title')}</h1>
          <p className="page-hero__subtitle">{t('pages.about.hero.subtitle')}</p>
        </div>
        <div className="page-hero__decoration" aria-hidden="true">
          <span className="page-hero__orb page-hero__orb--1" />
          <span className="page-hero__orb page-hero__orb--2" />
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="about-mission" ref={missionRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${missionVisible ? 'is-visible' : ''}`}>
            {mission.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${missionVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {mission.title}
          </h2>
          <p className={`about-mission__body reveal reveal--up ${missionVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.16s' }}>
            {mission.body}
          </p>
        </div>
      </section>

      {/* ── Story / Timeline ── */}
      <section className="about-story" ref={storyRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${storyVisible ? 'is-visible' : ''}`}>
            {story.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${storyVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {story.title}
          </h2>
          <div className="story-timeline">
            {story.highlights.map((h, i) => (
              <div
                key={i}
                className={`timeline-item reveal reveal--up ${storyVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
              >
                <div className="timeline-item__marker" />
                <div className="timeline-item__content card--thin">
                  <span className="timeline-item__year tag tag--primary">{h.year}</span>
                  <h3 className="timeline-item__title">{h.title}</h3>
                  <p className="timeline-item__desc">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise ── */}
      <section className="about-expertise" ref={expertiseRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${expertiseVisible ? 'is-visible' : ''}`}>
            {expertise.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${expertiseVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {expertise.title}
          </h2>
          <div className="expertise-grid grid-2">
            {expertise.items.map((e, i) => (
              <div
                key={i}
                className={`expertise-card card card--hover reveal reveal--up ${expertiseVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              >
                <span className="card__icon"><Icon name={e.icon} size={32} /></span>
                <h3 className="card__title">{e.title}</h3>
                <p className="card__desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="about-process" ref={processRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${processVisible ? 'is-visible' : ''}`}>
            {process.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${processVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {process.title}
          </h2>
          <div className="process-steps grid-3">
            {process.steps.map((s, i) => (
              <div
                key={i}
                className={`process-step card--thin reveal reveal--up ${processVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="process-step__number step-badge">{s.num}</div>
                <div className="process-step__icon"><Icon name={s.icon} size={28} /></div>
                <h3 className="process-step__title">{s.title}</h3>
                <p className="process-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section className="about-impact" ref={impactRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${impactVisible ? 'is-visible' : ''}`}>
            {impact.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${impactVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {impact.title}
          </h2>
          <div className="impact-stats grid-4">
            {impact.stats.map((stat, i) => (
              <ImpactStatCard
                key={i}
                num={stat.num}
                label={stat.label}
                desc={stat.desc}
                isActive={impactVisible}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values" ref={valuesRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${valuesVisible ? 'is-visible' : ''}`}>
            {values.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${valuesVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {values.title}
          </h2>
          <div className="values-grid grid-2">
            {values.items.map((v, i) => (
              <div
                key={i}
                className={`value-card card card--hover reveal reveal--up ${valuesVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
              >
                <span className="card__icon"><Icon name={v.icon} size={28} /></span>
                <h3 className="card__title">{v.title}</h3>
                <p className="card__desc">{v.desc}</p>
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

/* ── Impact Stat Card ── */
function ImpactStatCard({ num, label, desc, isActive, index }) {
  const count = useCountUp(parseInt(num), 1800, isActive)
  const formatted = new Intl.NumberFormat().format(count)

  return (
    <div
      className={`impact-stat-card card card--hover reveal reveal--up ${isActive ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
    >
      <div className="impact-stat-card__num">{formatted}+</div>
      <div className="impact-stat-card__label">{label}</div>
      <p className="impact-stat-card__desc">{desc}</p>
    </div>
  )
}
