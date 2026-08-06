import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react'
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import './ContactSection.css'
import { contactDetails } from '../data/siteContent'

type FormState = {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const businessHours = [
  { day: 'Monday – Friday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
  { day: 'Sunday', hours: 'Emergency Only' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: FaLinkedinIn },
  { label: 'Facebook', href: 'https://facebook.com', Icon: FaFacebookF },
  { label: 'Instagram', href: 'https://instagram.com', Icon: FaInstagram },
  { label: 'Twitter / X', href: 'https://twitter.com', Icon: FaXTwitter },
]

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Full name is required.'
  if (!form.email.includes('@') || !form.email.includes('.'))
    errors.email = 'Please enter a valid email address.'
  if (form.phone && !/^[+\d\s\-()]{7,}$/.test(form.phone))
    errors.phone = 'Please enter a valid phone number.'
  if (!form.message.trim() || form.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.'
  return errors
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', company: '', message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const errs = validate({ ...form, [field]: value })
      setErrors((prev) => ({ ...prev, [field]: errs[field] }))
    }
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const errs = validate(form)
    setErrors((prev) => ({ ...prev, [field]: errs[field] }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const allTouched = Object.fromEntries(
      (Object.keys(form) as (keyof FormState)[]).map((k) => [k, true])
    ) as Partial<Record<keyof FormState, boolean>>
    setTouched(allTouched)
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    const subject = encodeURIComponent('Enquiry from MAIRA Website')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\n\n${form.message}`
    )
    window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`
    setTimeout(() => {
      setSent(true)
      setSubmitting(false)
    }, 800)
  }

  return (
    <section className="contact-section-container" id="contact">
      <div className="contact-bg-glow" />

      <div className="contact-shell">
        <div className="contact-header">
          <div className="contact-eyebrow">
            <MessageSquare size={13} />
            <span>CONTACT US</span>
          </div>

          <h2 className="contact-main-title">
            Let's Build Something Exceptional{' '}
            <span className="contact-title-accent">Together</span>
          </h2>

          <p className="contact-main-desc">
            Reach out for bespoke facility management, MEP project delivery, and long-term service partnerships. Our team responds within one business day.
          </p>
        </div>

        <div className="contact-grid-layout">
          {/* Left: Info */}
          <motion.div
            className="contact-info-panel"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="glass-contact-card">
              <h3 className="contact-card-heading">Get In Touch</h3>
              <ul className="contact-detail-list">
                <li>
                  <div className="contact-detail-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-detail-label">Email</span>
                    <a href={`mailto:${contactDetails.email}`} className="contact-detail-value">
                      {contactDetails.email}
                    </a>
                  </div>
                </li>
                <li>
                  <div className="contact-detail-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-detail-label">Phone</span>
                    <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className="contact-detail-value">
                      {contactDetails.phone}
                    </a>
                  </div>
                </li>
                <li>
                  <div className="contact-detail-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="contact-detail-label">Address</span>
                    <span className="contact-detail-value">{contactDetails.address}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass-contact-card">
              <h3 className="contact-card-heading">
                <Clock size={16} />
                Business Hours
              </h3>
              <ul className="hours-list">
                {businessHours.map((row) => (
                  <li key={row.day}>
                    <span className="hours-day">{row.day}</span>
                    <span className="hours-time">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-contact-card">
              <h3 className="contact-card-heading">Follow Us</h3>
              <div className="contact-socials-row">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="glass-form-panel"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={52} color="#22c55e" strokeWidth={1.5} />
                <h3 style={{ fontSize: '24px', margin: '16px 0 8px' }}>Message Sent!</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
                  Thank you for reaching out. Your mail client should open momentarily.
                </p>
                <button
                  className="cf-submit"
                  onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', company: '', message: '' }) }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <h3 className="contact-form-heading">Send Us A Message</h3>

                <div className="cf-row">
                  <div className="cf-field">
                    <label htmlFor="cf-name" className="cf-label">Full Name *</label>
                    <input
                      id="cf-name"
                      type="text"
                      className="cf-input"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                    />
                    {errors.name && touched.name && (
                      <span className="cf-error"><AlertCircle size={13} />{errors.name}</span>
                    )}
                  </div>

                  <div className="cf-field">
                    <label htmlFor="cf-email" className="cf-label">Email Address *</label>
                    <input
                      id="cf-email"
                      type="email"
                      className="cf-input"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                    />
                    {errors.email && touched.email && (
                      <span className="cf-error"><AlertCircle size={13} />{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="cf-row">
                  <div className="cf-field">
                    <label htmlFor="cf-phone" className="cf-label">Phone Number</label>
                    <input
                      id="cf-phone"
                      type="tel"
                      className="cf-input"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                    />
                    {errors.phone && touched.phone && (
                      <span className="cf-error"><AlertCircle size={13} />{errors.phone}</span>
                    )}
                  </div>

                  <div className="cf-field">
                    <label htmlFor="cf-company" className="cf-label">Company</label>
                    <input
                      id="cf-company"
                      type="text"
                      className="cf-input"
                      placeholder="Your Organisation"
                      value={form.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                    />
                  </div>
                </div>

                <div className="cf-field">
                  <label htmlFor="cf-message" className="cf-label">Message *</label>
                  <textarea
                    id="cf-message"
                    className="cf-input cf-textarea"
                    placeholder="Tell us about your project, requirements, or timeline (minimum 20 characters)..."
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    rows={5}
                  />
                  {errors.message && touched.message && (
                    <span className="cf-error"><AlertCircle size={13} />{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="cf-submit"
                  disabled={submitting}
                >
                  <Send size={17} />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>

                <p className="cf-privacy">
                  Your information is kept confidential and never shared with third parties.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
