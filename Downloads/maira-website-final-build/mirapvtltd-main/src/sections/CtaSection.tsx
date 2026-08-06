import { motion } from 'framer-motion'
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react'
import './CtaSection.css'

export function CtaSection() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('contact')
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="cta-section-container" id="cta">
      <div className="cta-shell">
        <motion.div
          className="glass-cta-banner"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cta-bg-glow" />

          <div className="cta-eyebrow-badge">
            <Sparkles size={13} />
            <span>TRANSFORM YOUR FACILITIES</span>
          </div>

          <h2 className="cta-headline-title">
            Partner With A Team That Delivers{' '}
            <span className="cta-headline-accent">Premium Performance Every Day</span>
          </h2>

          <p className="cta-subtext-desc">
            From MEP design through 24/7 operations, we help you optimize systems, reduce operational risk,
            and exceed compliance standards across every square metre of your commercial or industrial estate.
          </p>

          <div className="cta-btn-row">
            <a
              className="cta-btn-glow"
              href="#contact"
              onClick={handleSmoothScroll}
            >
              <span>Get Started</span>
              <ArrowRight size={17} />
            </a>

            <a
              className="cta-btn-glass"
              href="tel:+914012345678"
            >
              <PhoneCall size={17} />
              <span>Call Us Now</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaSection
