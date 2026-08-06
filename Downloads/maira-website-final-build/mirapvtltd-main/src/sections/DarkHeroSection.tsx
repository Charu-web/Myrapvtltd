import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './Hero.css'
import heroVideo from '../assets/aivediolog.mp4'
import COmpalogog from '../assets/complogo.png'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'why-us', label: 'Why Choose Us' },
  { id: 'statistics', label: 'Statistics' },
  { id: 'clients', label: 'Clients' },
  { id: 'contact', label: 'Contact' },
]

export default function DarkHeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Mouse movement parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const heroParallaxX = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12])
  const heroParallaxY = useTransform(mouseYSpring, [-0.5, 0.5], [-12, 12])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = (e.clientX - rect.left) / width - 0.5
    const mouseYPos = (e.clientY - rect.top) / height - 0.5
    mouseX.set(mouseXPos)
    mouseY.set(mouseYPos)
  }

  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'why-us', 'statistics', 'clients', 'contact']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: null,
        threshold: 0.35,
        rootMargin: '-35% 0px -55% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.getElementById(id)
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

      if (window.history.pushState) {
        window.history.pushState(null, '', `#${id}`)
      } else {
        window.location.hash = `#${id}`
      }
    }
  }

  return (
    <section className="hero" id="home" onMouseMove={handleMouseMove}>
      <motion.div
        className="hero-card"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Background Particles & Glow Lights */}
        <div className="hero-bg-lights">
          <motion.div
            className="glow-orb orb-1"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.35, 0.6, 0.35],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="glow-orb orb-2"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Full-width Background Video / Industrial Visual */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Dark Gradient Overlay */}
        <div className="hero-overlay" />

        {/* NAVBAR */}
        <motion.header
          className="hero-navbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="logo">
            <img src={COmpalogog} alt="Company Logo" className="company-logo" />
          </div>

          <button
            className={`mobile-toggle ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => scrollToSection(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="contact-btn"
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
          >
            <span>Get Started</span>
            <ChevronRight size={15} />
          </a>
        </motion.header>

        {/* HERO BODY GRID */}
        <div className="hero-body-grid">
          {/* LEFT CONTENT */}
          <motion.div
            className="hero-content"
            style={{ x: heroParallaxX, y: heroParallaxY }}
          >
            {/* Badge */}
            <motion.div
              className="badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="badge-dot" />
              <Sparkles size={13} className="sparkle-icon" />
              <span>ENGINEERING EXCELLENCE</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Smart Engineering
              <br />
              <span className="hero-gradient-text">For Modern Industries</span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              className="paragraphs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Delivering end-to-end MEP, HVAC, Fire Protection,
              Electrical Infrastructure, Plumbing and Specialized
              Industrial Engineering solutions across commercial,
              industrial and cleanroom environments.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                className="primary"
                href="#services"
                onClick={(e) => scrollToSection(e, 'services')}
              >
                <span>Explore Services</span>
                <ArrowRight size={17} className="btn-arrow" />
              </a>

              <a
                className="secondary"
                href="#clients"
                onClick={(e) => scrollToSection(e, 'clients')}
              >
                <span>View Projects</span>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="socials"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* FLOATING STATS ROW */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="stat-card">
            <h3>15+</h3>
            <span>Years Experience</span>
          </div>

          <div className="stat-card">
            <h3>250+</h3>
            <span>Completed Projects</span>
          </div>

          <div className="stat-card">
            <h3>100%</h3>
            <span>Client Satisfaction</span>
          </div>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span />
        </motion.div>
      </motion.div>
    </section>
  )
}