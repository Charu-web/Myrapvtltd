import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import COmpalogog from '../assets/complogo.png'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Solutions', id: 'solutions' },
  { label: 'Projects', id: 'projects' },
  { label: 'Clients', id: 'clients' },
  { label: 'Contact', id: 'contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section highlighting on scroll and pathname syncing
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    const observers = navItems.map((item) => {
      const el = document.getElementById(item.id)
      if (!el) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(item.id)
              // Update URL path silently to match current active section
              const newPath = item.id === 'home' ? '/' : `/${item.id}`
              if (window.location.pathname !== newPath) {
                window.history.replaceState(null, '', newPath)
              }
            }
          })
        },
        {
          rootMargin: '-40% 0px -50% 0px'
        }
      )
      observer.observe(el)
      return { observer, el }
    })

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el)
        }
      })
    }
  }, [])

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const navbarHeight = 85
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      try {
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth'
        })
      } catch {
        window.scrollTo(0, elementPosition - navbarHeight)
      }
      const newPath = targetId === 'home' ? '/' : `/${targetId}`
      window.history.pushState(null, '', newPath)
      setActiveSection(targetId)
    }
    setIsOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-navy/80 border-b border-cyan/10 backdrop-blur-md shadow-lg shadow-black/20' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" onClick={(e) => handleNavLinkClick(e, 'home')} className="flex items-center gap-3">
            <img src={COmpalogog} alt="MAIRA Logo" className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105" />
          </a>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.id === 'home' ? '/' : `/${item.id}`}
              onClick={(e) => handleNavLinkClick(e, item.id)}
              className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 py-2 ${
                activeSection === item.id 
                  ? 'text-cyan neon-text-glow' 
                  : 'text-gray-300 hover:text-cyan'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric to-cyan"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href="/contact"
            onClick={(e) => handleNavLinkClick(e, 'contact')}
            className="relative px-6 py-2.5 text-sm font-semibold tracking-wide uppercase text-white rounded-full bg-electric/15 border border-electric/40 hover:border-cyan hover:bg-electric/25 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-cyan focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden absolute top-full left-0 right-0 bg-navy/95 border-b border-cyan/15 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 items-center">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.id === 'home' ? '/' : `/${item.id}`}
                  onClick={(e) => handleNavLinkClick(e, item.id)}
                  className={`text-base font-semibold tracking-wider uppercase transition-colors duration-300 ${
                    activeSection === item.id 
                      ? 'text-cyan neon-text-glow' 
                      : 'text-gray-300 hover:text-cyan'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/contact"
                onClick={(e) => handleNavLinkClick(e, 'contact')}
                className="mt-4 w-full max-w-[250px] text-center py-3 text-sm font-semibold tracking-wide uppercase text-white rounded-full bg-electric/20 border border-electric hover:border-cyan hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all duration-300"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
