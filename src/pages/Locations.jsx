import { useTranslation } from 'react-i18next'
import { usePageSeo } from '../hooks/useSeo'
import './Locations.css'

export default function Locations() {
  const { t } = useTranslation()
  
  usePageSeo('locations', '/locations')

  const sites = t('pages.locations.sites', { returnObjects: true })

  return (
    <div className="locations-page">
      {/* Hero */}
      <section className="locations-hero">
        <h1>{t('pages.locations.heading')}</h1>
        <p className="locations-hero__subtitle">{t('pages.locations.subtitle')}</p>
      </section>

      {/* Sites Grid */}
      <section className="locations-grid container">
        {sites.map((site, idx) => (
          <article key={idx} className={`location-card card--hover-sm ${site.status === 'upcoming' ? 'location-card--upcoming' : ''}`}>
            <div className="location-card__image-wrap">
              <img 
                src={site.image} 
                alt={site.name} 
                className="location-card__image"
                loading="lazy"
              />
              {site.status === 'upcoming' && (
                <span className="location-card__badge">{t('pages.locations.comingSoon')}</span>
              )}
            </div>
            <div className="location-card__content">
              <span className="location-card__type tag tag--primary">{site.type}</span>
              <h2 className="location-card__name">{site.name}</h2>
              <p className="location-card__address">
                <span className="location-card__icon">📍</span>
                {site.address}
              </p>
              <p className="location-card__desc">{site.description}</p>
              
              {site.features && (
                <ul className="location-card__features checklist">
                  {site.features.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Map embed */}
            {site.mapUrl && (
              <div className="location-card__map">
                <iframe
                  src={site.mapUrl}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${t('pages.locations.mapOf')} ${site.name}`}
                />
              </div>
            )}
          </article>
        ))}
      </section>

      {/* Contact CTA */}
      <section className="locations-cta">
        <div className="locations-cta__bg" />
        <h2 className="locations-cta__title">{t('pages.locations.cta.title')}</h2>
        <p className="locations-cta__subtitle">{t('pages.locations.cta.subtitle')}</p>
        <a href="/contact" className="locations-cta__btn">{t('pages.locations.cta.button')}</a>
      </section>
    </div>
  )
}
