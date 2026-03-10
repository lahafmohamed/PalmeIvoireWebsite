import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Navbar.css'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleLang() {
    const next = i18n.language === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  const links = [
    { to: '/',          label: t('nav.home') },
    { to: '/about',     label: t('nav.about') },
    { to: '/services',  label: t('nav.services') },
    { to: '/products',  label: t('nav.products') },
    { to: '/gallery',   label: t('nav.gallery') },
    { to: '/locations', label: t('nav.locations') },
    { to: '/contact',   label: t('nav.contact') },
  ]

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo" aria-label="Palme Ivoire — Accueil">
          <img src="/logo.svg" alt="" className="navbar__logo-img" width={160} height={48} fetchPriority="high" decoding="sync" />
        </NavLink>

        <nav
          id="navbar-nav"
          className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`}
          aria-label="Navigation principale"
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__lang"
            onClick={toggleLang}
            aria-label={i18n.language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            {i18n.language === 'fr' ? 'FR' : 'EN'}
          </button>
          <button
            className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="navbar-nav"
          >
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
