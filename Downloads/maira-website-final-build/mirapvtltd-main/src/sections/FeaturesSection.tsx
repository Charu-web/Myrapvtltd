import { motion, type Variants } from 'framer-motion'
import {
  Layers,
  BarChart3,
  ShieldCheck,
  Leaf,
  Users,
  Headphones,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '../components/Container'
import { SectionTitle } from '../components/SectionTitle'
import { features, type FeatureCard } from '../data/features'

const iconMap: Record<string, LucideIcon> = {
  Layers,
  BarChart3,
  ShieldCheck,
  Leaf,
  Users,
  Headset: Headphones,
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

function FeatureCardItem({ item }: { item: FeatureCard }) {
  const Icon = iconMap[item.icon] ?? ShieldCheck

  return (
    <motion.article
      className="feature-card"
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div
        className="feature-icon-wrap"
        style={{
          background: `linear-gradient(135deg, ${item.accent}20, ${item.accent}0a)`,
          borderColor: `${item.accent}28`,
        }}
      >
        <Icon size={26} color={item.accent} strokeWidth={1.7} />
      </div>
      <h3 className="feature-title">{item.title}</h3>
      <p className="feature-desc">{item.description}</p>
      <div
        className="feature-glow"
        style={{ background: `radial-gradient(circle at 0% 100%, ${item.accent}12, transparent 70%)` }}
      />
    </motion.article>
  )
}

export function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            eyebrow="Why Work With Us"
            title="Built for scale, reliability, and operational confidence"
            description="Premium engineering capabilities designed to elevate your facilities, teams, and long-term business outcomes — from day one through the lifetime of the asset."
            align="center"
          />
        </motion.div>

        <motion.div
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {features.map((feature) => (
            <FeatureCardItem key={feature.title} item={feature} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default FeaturesSection
