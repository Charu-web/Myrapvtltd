import { useEffect, useState } from 'react'
import './Navbar.css'
import COmpalogog from '../assets/complogo.png'
import { ChevronRight } from 'lucide-react'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services ▾' },
  { id: 'solutions', label: 'Solutions ▾' },
  { id: 'about', label: 'About Us' },
  { id: 'why-us', label: 'Why Choose Us' },
  { id: 'statistics', label: 'Statistics' },
  { id: 'clients', label: 'Clients' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  // Scroll listener for active section & navbar background state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const sectionIds = ['home', 'about', 'services', 'why-us', 'statistics', 'clients', 'contact']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return () => window.removeEventListener('scroll', handleScroll)

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
        threshold: 0.25,
        rootMargin: '-20% 0px -50% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
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

      // Update URL hash without jumping
      if (window.history.pushState) {
        window.history.pushState(null, '', `#${id}`)
      } else {
        window.location.hash = `#${id}`
      }
    }
  }

  return (
    <header className={`sticky-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <a
          href="#home"
          className="brand-logo-link"
          onClick={(e) => scrollToSection(e, 'home')}
          aria-label="MAIRA Home"
        >
          <img src={COmpalogog} alt="MAIRA Logo" className="brand-logo-img" />
          <span className="brand-logo-text">MAIRA</span>
        </a>

        {/* Mobile Toggle Button */}
        <button
          className={`mobile-menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle Navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Desktop Navigation Links */}
        <nav className={`main-nav-links ${menuOpen ? 'open' : ''}`}>
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

        {/* Get Started Contact CTA */}
        <a
          className="header-cta-btn"
          href="#contact"
          onClick={(e) => scrollToSection(e, 'contact')}
        >
          <span>Get Started</span>
          <ChevronRight size={15} />
        </a>
      </div>
    </header>
  )
}

export default Navbar
