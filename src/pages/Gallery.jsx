import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'
import './Gallery.css'

const images = Array.from({ length: 22 }, (_, i) => ({
  src: `/gallery${i + 2}.jpeg`,
  alt: `Palme Ivoire — photo ${i + 1}`,
}))

export default function Gallery() {
  const { t } = useTranslation()
  useHead({ title: t('pages.gallery.title') })

  const [lightbox, setLightbox] = useState(null)

  const prev = () => setLightbox(i => (i - 1 + images.length) % images.length)
  const next = () => setLightbox(i => (i + 1) % images.length)

  return (
    <div className="gallery-page">

      <header className="gallery-hero">
        <h1>{t('nav.gallery')}</h1>
        <p className="gallery-hero__subtitle">{t('pages.gallery.subtitle')}</p>
      </header>

      <section className="gallery-section">
        <div className="gallery-grid">
          {images.map((img, i) => (
            <button
              key={i}
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
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            onClick={e => e.stopPropagation()}
          />
          <button className="lightbox__next" onClick={e => { e.stopPropagation(); next() }} aria-label="Next">›</button>
        </div>
      )}

    </div>
  )
}
