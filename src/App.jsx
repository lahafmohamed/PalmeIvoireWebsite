import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import './App.css'

const Home      = lazy(() => import('./pages/Home'))
const About     = lazy(() => import('./pages/About'))
const Services  = lazy(() => import('./pages/Services'))
const Products  = lazy(() => import('./pages/Products'))
const Gallery   = lazy(() => import('./pages/Gallery'))
const Locations = lazy(() => import('./pages/Locations'))
const Contact   = lazy(() => import('./pages/Contact'))
const NotFound  = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return <div style={{ minHeight: '60vh' }} aria-label="Chargement…" />
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/about"     element={<About />} />
              <Route path="/services"  element={<Services />} />
              <Route path="/products"  element={<Products />} />
              <Route path="/gallery"   element={<Gallery />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/contact"   element={<Contact />} />
              <Route path="*"         element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
