import { useTranslation } from 'react-i18next'
import { usePageSeo } from '../hooks/useSeo'
import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const { t } = useTranslation()
  usePageSeo('contact', '/contact')
  
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      // TODO: Intégrer EmailJS ou backend
      console.log('Form data:', formData)
      setStatus('success')
      setFormData({ from_name: '', from_email: '', phone: '', company: '', subject: '', message: '' })
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 5000)
    }
  }

  const faqItems = t('pages.contact.faq.items', { returnObjects: true })

  return (
    <div className="contact-page">
      {/* Hero */}
      <header className="contact-hero">
        <div className="contact-hero__content">
          <h1>{t('nav.contact')}</h1>
          <p className="contact-hero__subtitle">{t('pages.contact.heroSubtitle')}</p>
        </div>
      </header>

      {/* Quick Contact Buttons */}
      <section className="quick-contact">
        <div className="quick-contact__inner">
          <div className="quick-contact__header">
            <h2>{t('pages.contact.quickContact')}</h2>
            <p>{t('pages.contact.quickContactDesc')}</p>
          </div>
          <div className="quick-contact__buttons">
            <a href="tel:+2250700000000" className="quick-contact__btn quick-contact__btn--phone">
              <span className="quick-contact__icon">📞</span>
              <span className="quick-contact__label">{t('pages.contact.callUs')}</span>
              <span className="quick-contact__value">+225 07 00 00 00 00</span>
            </a>
            <a href="https://wa.me/2250700000000" target="_blank" rel="noopener noreferrer" className="quick-contact__btn quick-contact__btn--whatsapp">
              <span className="quick-contact__icon">💬</span>
              <span className="quick-contact__label">{t('pages.contact.whatsapp')}</span>
              <span className="quick-contact__value">+225 07 00 00 00 00</span>
            </a>
            <a href="mailto:contact@palmeivoire.ci" className="quick-contact__btn quick-contact__btn--email">
              <span className="quick-contact__icon">📧</span>
              <span className="quick-contact__label">{t('pages.contact.emailUs')}</span>
              <span className="quick-contact__value">contact@palmeivoire.ci</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-main__inner">
          {/* Left Column - Form */}
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__header">
                <h2>{t('pages.contact.contactus')}</h2>
                <span className="contact-form__response-time">⚡ {t('pages.contact.responseTime')}</span>
              </div>
              
              {status === 'success' && (
                <div className="form-alert form-alert--success">
                  {t('pages.contact.successMessage')}
                </div>
              )}
              {status === 'error' && (
                <div className="form-alert form-alert--error">
                  {t('pages.contact.errorMessage')}
                </div>
              )}

              <div className="form-row">
                <div className="formElement">
                  <label htmlFor="from_name">{t('pages.contact.name')} *</label>
                  <input 
                    type="text" 
                    id="from_name" 
                    name="from_name" 
                    placeholder={t('pages.contact.namePlaceholder')} 
                    value={formData.from_name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="formElement">
                  <label htmlFor="company">{t('pages.contact.company')}</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    placeholder={t('pages.contact.companyPlaceholder')} 
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="formElement">
                  <label htmlFor="from_email">{t('pages.contact.email')} *</label>
                  <input 
                    type="email" 
                    id="from_email" 
                    name="from_email" 
                    placeholder={t('pages.contact.emailPlaceholder')} 
                    value={formData.from_email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="formElement">
                  <label htmlFor="phone">{t('pages.contact.phone')}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder={t('pages.contact.phonePlaceholder')}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="formElement">
                <label htmlFor="subject">{t('pages.contact.subject')} *</label>
                <select 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('pages.contact.subjectPlaceholder')}</option>
                  <option value="general_inquiry">{t('pages.contact.subjectOptions.general_inquiry')}</option>
                  <option value="partnership">{t('pages.contact.subjectOptions.partnership')}</option>
                  <option value="job_application">{t('pages.contact.subjectOptions.job_application')}</option>
                  <option value="supplier_request">{t('pages.contact.subjectOptions.supplier_request')}</option>
                  <option value="customer_support">{t('pages.contact.subjectOptions.customer_support')}</option>
                </select>
              </div>

              <div className="formElement">
                <label htmlFor="message">{t('pages.contact.message')} *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  placeholder={t('pages.contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  required 
                />
              </div>

              <button 
                type='submit' 
                className='formButton'
                disabled={status === 'loading'}
              >
                {status === 'loading' ? t('pages.contact.sending') : t('pages.contact.submit')}
              </button>
            </form>
          </div>

          {/* Right Column - Info & Map */}
          <div className="contact-sidebar">
            {/* Info Cards */}
            <div className="contact-info">
              <h3>{t('pages.contact.getInTouch')}</h3>
              
              <div className="contact-info__card">
                <span className="contact-info__icon">📍</span>
                <div>
                  <h4>{t('pages.contact.address')}</h4>
                  <p>{t('pages.contact.addressValue')}</p>
                </div>
              </div>

              <div className="contact-info__card">
                <span className="contact-info__icon">🕐</span>
                <div>
                  <h4>{t('pages.contact.hours')}</h4>
                  <p>{t('pages.contact.hoursText')}</p>
                  <p className="contact-info__secondary">{t('pages.contact.hoursWeekend')}</p>
                </div>
              </div>

              <div className="contact-info__card">
                <span className="contact-info__icon">📞</span>
                <div>
                  <h4>{t('pages.contact.phone')}</h4>
                  <p><a href="tel:+2250700000000">+225 07 00 00 00 00</a></p>
                </div>
              </div>

              <div className="contact-info__card">
                <span className="contact-info__icon">📧</span>
                <div>
                  <h4>{t('pages.contact.email')}</h4>
                  <p><a href="mailto:contact@palmeivoire.ci">contact@palmeivoire.ci</a></p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.36!2d-4.1!3d5.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ea5311959121%3A0x3fe70ddce19221a6!2sYopougon%2C%20Abidjan%2C%20C%C3%B4te%20d'Ivoire!5e0!3m2!1sfr!2s!4v1"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Palme Ivoire Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="contact-faq__inner">
          <h2>{t('pages.contact.faq.title')}</h2>
          <div className="faq-list">
            {faqItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${openFaq === idx ? 'faq-item--open' : ''}`}
              >
                <button 
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="faq-item__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
