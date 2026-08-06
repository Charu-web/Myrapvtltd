import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Send, ArrowUpRight } from 'lucide-react'
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import './FooterSection.css'
import { footerLinks, socialLinks } from '../data/footer'

const socialIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaXTwitter,
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function FooterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="footer-section-container" id="footer">
      <div className="footer-bg-glow" />

      <div className="footer-shell">
        {/* Main Grid */}
        <motion.div
          className="footer-main-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.08 }}
        >
          {/* Brand Column */}
          <motion.div className="footer-brand-col" variants={fadeUp}>
            <div className="footer-brand-logo">
              <div className="footer-brand-mark">MF</div>
              <div>
                <strong className="footer-brand-name">MAIRA</strong>
                <small className="footer-brand-tagline">Facilities Management</small>
              </div>
            </div>
            <p className="footer-brand-desc">
              MAIRA Facilities is a premium provider of MEP, HVAC, electrical, fire protection,
              plumbing, and facility management services for mission-critical properties across India.
            </p>

            <div className="footer-socials">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.icon]
                if (!Icon) return null
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label={link.label}
                  >
                    <Icon size={15} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <motion.div key={column.title} className="footer-link-col" variants={fadeUp}>
              <h4 className="footer-col-heading">{column.title}</h4>
              <ul className="footer-link-list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      <ArrowUpRight size={13} className="footer-link-arrow" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Column */}
          <motion.div className="footer-newsletter-col" variants={fadeUp}>
            <h4 className="footer-col-heading">Stay Updated</h4>
            <p className="footer-newsletter-desc">
              Subscribe for engineering insights, project updates, and industry news.
            </p>
            {subscribed ? (
              <div className="footer-subscribed">
                ✓ You're subscribed. Thank you!
              </div>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe} noValidate>
                <input
                  type="email"
                  className="footer-newsletter-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Newsletter email address"
                  required
                />
                <button
                  type="submit"
                  className="footer-newsletter-btn"
                  aria-label="Subscribe to newsletter"
                >
                  <Send size={15} />
                </button>
              </form>
            )}
            <p className="footer-newsletter-note">No spam. Unsubscribe any time.</p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copy">
            © {new Date().getFullYear()} MAIRA Facilities Pvt. Ltd. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <span style={{ color: '#64748b' }}>·</span>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
            <span style={{ color: '#64748b' }}>·</span>
            <a href="#" className="footer-bottom-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
