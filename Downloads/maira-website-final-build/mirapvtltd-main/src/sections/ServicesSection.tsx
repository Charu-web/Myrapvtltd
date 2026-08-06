import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './ServicesSection.css'
import { ServiceCard } from '../components/ServiceCard'
import { services } from '../data/siteContent'
import { Sparkles } from 'lucide-react'

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | null = null

    try {
      ctx = gsap.context(() => {
        if (gridRef.current && gridRef.current.children.length > 0) {
          gsap.fromTo(
            Array.from(gridRef.current.children),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
            }
          )
        }
      }, sectionRef)
    } catch (err) {
      console.warn('GSAP ServicesSection fallback:', err)
    }

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

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
    <section className="services-section-container" id="services" ref={sectionRef}>
      {/* Background Radial Glow Blobs */}
      <div className="services-bg-glow services-glow-top" />
      <div className="services-bg-glow services-glow-bot" />

      <div className="services-shell">
        {/* Section Header */}
        <div className="services-header">
          <div className="services-eyebrow">
            <Sparkles size={13} />
            <span>OUR CORE SERVICES</span>
          </div>

          <h2 className="services-title">
            Comprehensive Support For Every{' '}
            <span className="services-title-accent">Mission-Critical Facility</span>
          </h2>

          <p className="services-desc">
            We deliver end-to-end engineering, HVAC, electrical, and facility management solutions tailored
            to the operational rhythm of modern commercial campuses and industrial estates across India.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="services-grid" ref={gridRef}>
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              item={service}
              index={i}
              onContactClick={handleSmoothScroll}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
