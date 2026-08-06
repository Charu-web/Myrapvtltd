import { motion, type Variants } from 'framer-motion'
import {
  Server,
  HeartPulse,
  FlaskConical,
  Building2,
  Hotel,
  Factory,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './IndustriesSection.css'
import { industries, type Industry } from '../data/industries'

const iconMap: Record<string, LucideIcon> = {
  Server,
  HeartPulse,
  FlaskConical,
  BuildingStore: Building2,
  BedDouble: Hotel,
  Factory,
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

function IndustryCard({ item }: { item: Industry }) {
  const Icon = iconMap[item.icon] ?? Building2

  return (
    <motion.article
      className="glass-industry-card"
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div
        className="industry-icon-wrap"
        style={{
          background: `linear-gradient(135deg, ${item.accent}20, ${item.accent}0a)`,
          borderColor: `${item.accent}30`,
        }}
      >
        <Icon size={26} color={item.accent} strokeWidth={1.7} />
      </div>
      <div>
        <h3 className="industry-name">{item.name}</h3>
        <p className="industry-desc">{item.description}</p>
      </div>
    </motion.article>
  )
}

export function IndustriesSection() {
  return (
    <section className="industries-section-container" id="industries">
      <div className="industries-bg-glow" />

      <div className="industries-shell">
        <div className="industries-header">
          <div className="industries-eyebrow">
            <Building2 size={13} />
            <span>INDUSTRIES WE SERVE</span>
          </div>

          <h2 className="industries-title">
            Tailored Solutions For Every{' '}
            <span className="industries-title-accent">Mission-Critical Sector</span>
          </h2>

          <p className="industries-desc">
            Our engineering and facility expertise spans the full spectrum of modern industry — from precision pharma environments to high-throughput manufacturing plants.
          </p>
        </div>

        <motion.div
          className="industries-grid-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {industries.map((industry) => (
            <IndustryCard key={industry.name} item={industry} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default IndustriesSection
