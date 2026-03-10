/**
 * Gallery image list & category definitions.
 * alt text is a static fallback — category labels come from i18n at render time.
 */
export const CATEGORIES = ['production', 'installations', 'team', 'products']

export const GALLERY_IMAGES = Array.from({ length: 22 }, (_, i) => ({
  src: `/gallery${i + 2}.jpeg`,
  alt: `Palme Ivoire — photo ${i + 1}`,
  category: CATEGORIES[i % CATEGORIES.length],
}))
