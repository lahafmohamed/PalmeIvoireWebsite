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
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo">
          <img src="/logo.svg" alt="Palme Ivoire" className="navbar__logo-img" />
        </NavLink>

        <div className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`}>
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
        </div>

        <div className="navbar__actions">
          <button className="navbar__lang" onClick={toggleLang}>
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
