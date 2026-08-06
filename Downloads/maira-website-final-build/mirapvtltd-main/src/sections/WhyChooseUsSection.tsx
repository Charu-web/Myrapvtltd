import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './WhyChooseUsSection.css'
import { whyChooseUs } from '../data/siteContent'
import { ShieldCheck } from 'lucide-react'

export function WhyChooseUsSection() {
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
      console.warn('GSAP WhyChooseUsSection fallback:', err)
    }

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="whyus-section-container" id="why-us" ref={sectionRef}>
      {/* Background Radial Glow Blobs */}
      <div className="whyus-bg-glow whyus-glow-left" />
      <div className="whyus-bg-glow whyus-glow-right" />

      <div className="whyus-shell">
        {/* Section Header */}
        <div className="whyus-header">
          <div className="whyus-eyebrow">
            <ShieldCheck size={13} />
            <span>WHY CHOOSE US</span>
          </div>

          <h2 className="whyus-title">
            Operational Discipline, Warm Service &{' '}
            <span className="whyus-title-accent">Measurable Impact</span>
          </h2>

          <p className="whyus-desc">
            From industrial power distribution to mission-critical healthcare facilities, our certified team keeps
            operations safe, compliant, and completely predictable.
          </p>
        </div>

        {/* Why Choose Us Cards Grid */}
        <div className="whyus-grid" ref={gridRef}>
          {whyChooseUs.map((item) => {
            const Icon = item.icon
            return (
              <article className="whyus-card" key={item.title}>
                <div className="whyus-icon-box">
                  <Icon size={28} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="whyus-card-line" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
