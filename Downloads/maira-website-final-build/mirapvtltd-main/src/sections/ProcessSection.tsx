import { motion, type Variants } from 'framer-motion'
import {
  Search,
  Map,
  Pencil,
  CheckCircle,
  TrendingUp,
  LifeBuoy,
  ListOrdered,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './ProcessSection.css'
import { processSteps, type ProcessStep } from '../data/process'

const iconMap: Record<string, LucideIcon> = {
  Search,
  Map,
  Pencil,
  CheckCircle,
  TrendingUp,
  LifeBuoy,
}

const accentColors = [
  '#7c3aed',
  '#00d4ff',
  '#22c55e',
  '#f59e0b',
  '#ec4899',
  '#14b8a6',
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

function ProcessStepCard({ step, index }: { step: ProcessStep; index: number }) {
  const Icon = iconMap[step.icon] ?? CheckCircle
  const accent = accentColors[index % accentColors.length]

  return (
    <motion.article
      className="glass-process-card"
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div className="process-card-header">
        <div
          className="process-number-badge"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}88)` }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <div
          className="process-icon-box"
          style={{
            background: `linear-gradient(135deg, ${accent}18, ${accent}08)`,
            borderColor: `${accent}30`,
          }}
        >
          <Icon size={22} color={accent} strokeWidth={1.7} />
        </div>
      </div>

      <div>
        <h3 className="process-card-title">{step.title}</h3>
        <p className="process-card-desc">{step.description}</p>
      </div>

      <div
        className="process-card-bar"
        style={{ background: `linear-gradient(90deg, ${accent}80, transparent)` }}
      />
    </motion.article>
  )
}

export function ProcessSection() {
  return (
    <section className="process-section-container" id="process">
      <div className="process-bg-glow" />

      <div className="process-shell">
        <div className="process-header">
          <div className="process-eyebrow">
            <ListOrdered size={13} />
            <span>OUR PROCESS</span>
          </div>

          <h2 className="process-main-title">
            A Disciplined Timeline Built For{' '}
            <span className="process-title-accent">Precision Delivery</span>
          </h2>

          <p className="process-main-desc">
            Every project moves through a rigorously structured lifecycle — from initial assessment through long-term operational support — ensuring quality at every milestone.
          </p>
        </div>

        <motion.div
          className="process-grid-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.12 }}
        >
          {processSteps.map((step, i) => (
            <ProcessStepCard key={step.title} step={step} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection
