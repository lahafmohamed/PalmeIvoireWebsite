import { useTranslation } from 'react-i18next'
import { useHead } from '@unhead/react'
import './Contact.css'

export default function Contact() {
  const { t } = useTranslation()
  useHead({ title: t('pages.contact.title') })

  return (
    <div className="contact-page">
      <header className="contact-hero">
        <h1>{t('nav.contact')}</h1>
      </header>
      <div className="contact-map-placeholder"></div>
      <section className="contact-section">
      <form className="contact-form">
        <h2>{t('pages.contact.contactus')}</h2>
        <div className="formElement">
                    <label htmlFor="from_name">{t('pages.contact.name')}</label>
                    <input type="text" id="from_name" name="from_name" placeholder={t('pages.contact.namePlaceholder')} required />
                </div>

                <div className="formElement">
                    <label htmlFor="from_email">{t('pages.contact.email')}</label>
                    <input type="email" id="from_email" name="from_email" placeholder={t('pages.contact.emailPlaceholder')} required />
                </div>

                <div className="formElement">
                    <label htmlFor="phone">{t('pages.contact.phone')}</label>
                    <input type="tel" id="phone" name="phone" placeholder={t('pages.contact.phonePlaceholder')} />
                </div>

                <div className="formElement">
                  <label htmlFor="subject">{t('pages.contact.subject')}</label>
                  <select id="subject" name="subject" required>
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
                    <textarea id="message" name="message" rows="8" placeholder={t('pages.contact.messagePlaceholder')} required />
                </div>
                <button type='submit' className='formButton'>{t('pages.contact.submit')}</button>
      </form>
      </section>
    </div>
  )
}
