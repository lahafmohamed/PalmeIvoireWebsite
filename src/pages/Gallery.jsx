import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageSeo } from '../hooks/useSeo'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import { GALLERY_IMAGES as images, CATEGORIES } from '../data/gallery'
import './Gallery.css'

export default function Gallery() {
  const { t } = useTranslation()
  usePageSeo('gallery', '/gallery')

  const [lightbox, setLightbox]               = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const filteredImages = selectedCategory
    ? images.filter(img => img.category === selectedCategory)
    : images

  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox(i => (i - 1 + filteredImages.length) % filteredImages.length)
  const next = () => setLightbox(i => (i + 1) % filteredImages.length)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = e => {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="gallery-page">

      {/* ── Hero ── */}
      <header className="gallery-hero">
        <div className="gallery-hero__bg" aria-hidden="true" />
        <div className="gallery-hero__content">
          <p className="gallery-hero__eyebrow">
            {t('pages.gallery.eyebrow', 'Plantations · Usine · Équipe')}
          </p>
          <h1 className="gallery-hero__title">{t('nav.gallery')}</h1>
          <p className="gallery-hero__subtitle">{t('pages.gallery.subtitle')}</p>
        </div>
        <div className="gallery-hero__meta" aria-hidden="true">
          <div className="gallery-hero__meta-item">
            <span className="gallery-hero__meta-num">{images.length}</span>
            <span className="gallery-hero__meta-label">{t('pages.gallery.photos')}</span>
          </div>
          <div className="gallery-hero__meta-sep" />
          <div className="gallery-hero__meta-item">
            <span className="gallery-hero__meta-num">{CATEGORIES.length}</span>
            <span className="gallery-hero__meta-label">
              {t('pages.gallery.categoriesLabel', 'Catégories')}
            </span>
          </div>
        </div>
      </header>

      {/* ── Sticky Filter Bar ── */}
      <div className="gallery-filters" role="group" aria-label="Filtrer par catégorie">
        <div className="gallery-filters__inner">
          <button
            className={`gallery-filter-btn${!selectedCategory ? ' gallery-filter-btn--active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            {t('pages.gallery.allPhotos')}
            <span className="gallery-filter-btn__count">{images.length}</span>
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`gallery-filter-btn${selectedCategory === cat ? ' gallery-filter-btn--active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {t(`pages.gallery.${cat}`)}
              <span className="gallery-filter-btn__count">
                {images.filter(img => img.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Masonry Grid ── */}
      <section className="gallery-section" aria-label={t('nav.gallery')}>
        <div className="gallery-grid">
          {filteredImages.map((img, i) => (
            <button
              key={img.src + i}
              className="gallery-item"
              data-category={img.category}
              onClick={() => setLightbox(i)}
              aria-label={`Agrandir — ${img.alt}`}
            >
              <OptimizedImage
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, 25vw"
              />
              <div className="gallery-item__overlay" aria-hidden="true">
                <svg className="gallery-item__zoom" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span className="gallery-item__badge">
                  {t(`pages.gallery.${img.category}`)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={filteredImages[lightbox].alt}
        >
          {/* Backdrop — click to close */}
          <button
            className="lightbox__backdrop"
            onClick={closeLightbox}
            tabIndex={-1}
            aria-hidden="true"
          />

          <button className="lightbox__close" onClick={closeLightbox} aria-label="Fermer la galerie">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" width="18" height="18">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button className="lightbox__prev" onClick={prev} aria-label="Image précédente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" width="22" height="22">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="lightbox__stage">
            <div className="lightbox__frame">
              <OptimizedImage
                src={filteredImages[lightbox].src}
                alt={filteredImages[lightbox].alt}
                width={1200}
                height={900}
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
            </div>
            <div className="lightbox__footer">
              <span className="lightbox__category">
                {t(`pages.gallery.${filteredImages[lightbox].category}`)}
              </span>
              <div className="lightbox__progress" aria-hidden="true">
                <div
                  className="lightbox__progress-fill"
                  style={{ width: `${((lightbox + 1) / filteredImages.length) * 100}%` }}
                />
              </div>
              <span className="lightbox__counter" aria-live="polite">
                {lightbox + 1} / {filteredImages.length}
              </span>
            </div>
          </div>

          <button className="lightbox__next" onClick={next} aria-label="Image suivante">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" width="22" height="22">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
