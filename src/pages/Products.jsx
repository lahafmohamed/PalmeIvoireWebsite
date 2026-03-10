import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageSeo } from '../hooks/useSeo'
import { Link } from 'react-router-dom'
import { useIntersection } from '../hooks/useIntersection'
import { Icon } from '../components/ui/Icon'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import { PRODUCT_IMAGES } from '../data/products'
import './Products.css'

export default function Products() {
  const { t } = useTranslation()
  usePageSeo('products', '/products')

  const hero = t('pages.products.hero', { returnObjects: true })
  const mainProducts = t('pages.products.mainProducts', { returnObjects: true })
  const certifications = t('pages.products.certifications', { returnObjects: true })
  const orders = t('pages.products.orders', { returnObjects: true })
  const cta = t('pages.products.cta', { returnObjects: true })

  const [productsRef, productsVisible] = useIntersection(0.1)
  const [certificationsRef, certificationsVisible] = useIntersection(0.1)
  const [ordersRef, ordersVisible] = useIntersection(0.1)
  const [ctaRef, ctaVisible] = useIntersection(0.2)

  return (
    <div className="products-page">

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

      {/* ── Main Products ── */}
      <section className="products-main" ref={productsRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${productsVisible ? 'is-visible' : ''}`}>
            {mainProducts.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${productsVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {mainProducts.title}
          </h2>
          <p className={`products-main__desc reveal reveal--up ${productsVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.12s' }}>
            {mainProducts.description}
          </p>

          <div className="products-showcase">
            {mainProducts.items.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                index={i}
                isVisible={productsVisible}
                image={PRODUCT_IMAGES[i]}
                specsTitle={mainProducts.specsTitle}
                applicationsTitle={mainProducts.applicationsTitle}
                showMore={mainProducts.showMore}
                showLess={mainProducts.showLess}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="products-certifications" ref={certificationsRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${certificationsVisible ? 'is-visible' : ''}`}>
            {certifications.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${certificationsVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {certifications.title}
          </h2>
          <div className="certifications-grid grid-2">
            {certifications.items.map((cert, i) => (
              <div
                key={i}
                className={`certification-card card card--hover reveal reveal--up ${certificationsVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              >
                <span className="card__icon"><Icon name={cert.icon} size={32} /></span>
                <h3 className="card__title">{cert.name}</h3>
                <p className="card__desc">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Orders Process ── */}
      <section className="products-orders" ref={ordersRef}>
        <div className="container">
          <p className={`section__label reveal reveal--up ${ordersVisible ? 'is-visible' : ''}`}>
            {orders.label}
          </p>
          <h2 className={`section__heading reveal reveal--up ${ordersVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.08s' }}>
            {orders.title}
          </h2>
          <div className="orders-steps">
            {orders.steps.map((step, i) => (
              <div
                key={i}
                className={`order-step card--thin reveal reveal--up ${ordersVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              >
                <div className="order-step__number step-badge">{step.num}</div>
                <h3 className="order-step__title">{step.title}</h3>
                <p className="order-step__desc">{step.desc}</p>
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

/* ── Product Card Component ── */
function ProductCard({ product, index, isVisible, image, specsTitle, applicationsTitle, showMore, showLess }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`product-showcase-card card reveal reveal--up ${isVisible ? 'is-visible' : ''} ${expanded ? 'is-expanded' : ''}`}
      style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
    >
      <div className="product-showcase-card__header">
        <span className="product-showcase-card__icon"><Icon name={product.icon} size={40} /></span>
        <div>
          <h3 className="product-showcase-card__title">{product.title}</h3>
          <p className="product-showcase-card__subtitle">{product.subtitle}</p>
        </div>
      </div>

      {expanded && (
        <div className="product-showcase-card__body">
          {image && (
            <div className="product-showcase-card__image-wrap">
              <OptimizedImage
                src={image}
                alt={product.title}
                className="product-showcase-card__image"
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          <div className="product-showcase-card__details">
            <div className="product-showcase-card__section">
              <h4>{specsTitle}</h4>
              <ul className="product-showcase-card__list checklist">
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="product-showcase-card__section">
              <h4>{applicationsTitle}</h4>
              <ul className="product-showcase-card__list checklist">
                {product.applications.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="product-showcase-card__section">
              <p className="product-showcase-card__specs">{product.specs}</p>
              <p className="product-showcase-card__price">{product.price}</p>
            </div>
          </div>
        </div>
      )}

      <button
        className="product-showcase-card__toggle"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? showLess : showMore}
      </button>
    </div>
  )
}
