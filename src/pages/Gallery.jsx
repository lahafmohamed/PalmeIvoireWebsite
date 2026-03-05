import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'
import './Gallery.css'

const images = Array.from({ length: 22 }, (_, i) => ({
  src: `/gallery${i + 2}.jpeg`,
  alt: `Palme Ivoire — photo ${i + 1}`,
  category: ['production', 'installations', 'team', 'products'][i % 4],
}))

export default function Gallery() {
  const { t } = useTranslation()
  useHead({ title: t('pages.gallery.title') })

  const [lightbox, setLightbox] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const filteredImages = selectedCategory
    ? images.filter(img => img.category === selectedCategory)
    : images

  const prev = () => setLightbox(i => (i - 1 + filteredImages.length) % filteredImages.length)
  const next = () => setLightbox(i => (i + 1) % filteredImages.length)

  return (
    <div className="gallery-page">
      <header className="gallery-hero">
        <div className="gallery-hero__content">
          <h1>{t('nav.gallery')}</h1>
          <p className="gallery-hero__subtitle">{t('pages.gallery.subtitle')}</p>
          <p className="gallery-hero__counter">{filteredImages.length} {t('pages.gallery.photos')}</p>
        </div>
      </header>

      {/* Filters */}
      <div className="gallery-filters">
        <div className="gallery-filters__inner">
          <button 
            className={`gallery-filter-btn ${!selectedCategory ? 'gallery-filter-btn--active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            {t('pages.gallery.allPhotos')}
          </button>
          <button 
            className={`gallery-filter-btn ${selectedCategory === 'production' ? 'gallery-filter-btn--active' : ''}`}
            onClick={() => setSelectedCategory('production')}
          >
            {t('pages.gallery.production')}
          </button>
          <button 
            className={`gallery-filter-btn ${selectedCategory === 'installations' ? 'gallery-filter-btn--active' : ''}`}
            onClick={() => setSelectedCategory('installations')}
          >
            {t('pages.gallery.installations')}
          </button>
          <button 
            className={`gallery-filter-btn ${selectedCategory === 'team' ? 'gallery-filter-btn--active' : ''}`}
            onClick={() => setSelectedCategory('team')}
          >
            {t('pages.gallery.team')}
          </button>
          <button 
            className={`gallery-filter-btn ${selectedCategory === 'products' ? 'gallery-filter-btn--active' : ''}`}
            onClick={() => setSelectedCategory('products')}
          >
            {t('pages.gallery.products')}
          </button>
        </div>
      </div>

      <section className="gallery-section">
        <div className="gallery-grid">
          {filteredImages.map((img, i) => (
            <button
              key={filteredImages.indexOf(img)}
              className="gallery-item"
              onClick={() => setLightbox(i)}
              aria-label={img.alt}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button className="lightbox__prev" onClick={e => { e.stopPropagation(); prev() }} aria-label="Previous">‹</button>
          <div className="lightbox__container">
            <img
              src={filteredImages[lightbox].src}
              alt={filteredImages[lightbox].alt}
              onClick={e => e.stopPropagation()}
            />
            <div className="lightbox__counter">
              {lightbox + 1} / {filteredImages.length}
            </div>
          </div>
          <button className="lightbox__next" onClick={e => { e.stopPropagation(); next() }} aria-label="Next">›</button>
        </div>
      )}
    </div>
  )
}
