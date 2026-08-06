import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './StatisticsSection.css'
import { stats } from '../data/siteContent'
import Counter from '../components/Counter'

export function StatisticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | null = null

    try {
      ctx = gsap.context(() => {
        if (gridRef.current && gridRef.current.children.length > 0) {
          gsap.fromTo(
            Array.from(gridRef.current.children),
            { opacity: 0, scale: 0.95, y: 25 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.4)',
            }
          )
        }
      }, sectionRef)
    } catch (err) {
      console.warn('GSAP StatisticsSection fallback:', err)
    }

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="stats-section-container" id="statistics" ref={sectionRef}>
      <div className="stats-bg-glow" />

      <div className="stats-shell">
        <div className="stats-grid-shell" ref={gridRef}>
          {stats.map((stat) => (
            <div className="glass-stat-box" key={stat.label}>
              <div className="stat-number-val">
                <Counter value={stat.value} />
              </div>
              <span className="stat-label-text">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
