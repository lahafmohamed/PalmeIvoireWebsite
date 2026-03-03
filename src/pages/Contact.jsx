import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'
import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const { t } = useTranslation()
  useHead({ title: t('pages.contact.title') })
  
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('') // 'loading', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      // TODO: Intégrer EmailJS ou votre backend
      // Exemple avec EmailJS:
      // const response = await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   formData,
      //   'YOUR_PUBLIC_KEY'
      // );
      
      // Pour l'instant, simule un succès
      console.log('Form data:', formData)
      setStatus('success')
      setFormData({ from_name: '', from_email: '', phone: '', subject: '', message: '' })
      
      // Reset success message après 3 secondes
      setTimeout(() => setStatus(''), 3000)
    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  return (
    <div className="contact-page">
      <header className="contact-hero">
        <h1>{t('nav.contact')}</h1>
      </header>
      
      <div className="contact-map-placeholder"></div>
      
      <section className="contact-section">
        <div className="contact-container">
          {/* Infos de contact */}
          <div className="contact-info">
            <h2>{t('pages.contact.getInTouch')}</h2>
            <div className="contact-info__grid">
              <div className="contact-info__card">
                <span className="contact-info__icon">📍</span>
                <h3>{t('pages.contact.address')}</h3>
                <p>Abidjan, Côte d'Ivoire</p>
              </div>
              <div className="contact-info__card">
                <span className="contact-info__icon">📞</span>
                <h3>{t('pages.contact.phone')}</h3>
                <p><a href="tel:+22501020304">+225 01 02 03 04</a></p>
              </div>
              <div className="contact-info__card">
                <span className="contact-info__icon">📧</span>
                <h3>{t('pages.contact.email')}</h3>
                <p><a href="mailto:contact@palmivoire.ci">contact@palmivoire.ci</a></p>
              </div>
              <div className="contact-info__card">
                <span className="contact-info__icon">🕐</span>
                <h3>{t('pages.contact.hours')}</h3>
                <p>{t('pages.contact.hoursText')}</p>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>{t('pages.contact.contactus')}</h2>
            
            {status === 'success' && (
              <div className="form-alert form-alert--success">
                ✓ {t('pages.contact.successMessage')}
              </div>
            )}
            {status === 'error' && (
              <div className="form-alert form-alert--error">
                ✗ {t('pages.contact.errorMessage')}
              </div>
            )}

            <div className="formElement">
              <label htmlFor="from_name">{t('pages.contact.name')}</label>
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
              <label htmlFor="from_email">{t('pages.contact.email')}</label>
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

            <div className="formElement">
              <label htmlFor="subject">{t('pages.contact.subject')}</label>
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
              <label htmlFor="message">{t('pages.contact.message')}</label>
              <textarea 
                id="message" 
                name="message" 
                rows="8" 
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
      </section>
    </div>
  )
}
