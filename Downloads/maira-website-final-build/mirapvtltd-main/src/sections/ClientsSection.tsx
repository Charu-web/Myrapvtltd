import { motion, type Variants } from 'framer-motion'
import './ClientsSection.css'
import { clients } from '../data/clients'
import { Building2 } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function ClientsSection() {
  return (
    <section className="clients-section-container" id="clients">
      <div className="clients-bg-glow" />

      <div className="clients-shell">
        <div className="clients-header">
          <div className="clients-eyebrow">
            <Building2 size={13} />
            <span>TRUSTED PARTNERS</span>
          </div>

          <h2 className="clients-title">
            Organisations Relying On Our{' '}
            <span className="clients-title-accent">Engineering Excellence</span>
          </h2>

          <p className="clients-desc">
            From energy conglomerates to pharmaceutical giants — leading enterprises across India choose MAIRA for precision,
            reliability, and service without compromise.
          </p>
        </div>

        {/* Responsive Grid */}
        <motion.div
          className="client-grid-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {clients.map((client) => (
            <motion.figure
              key={client.name}
              className="client-logo-card"
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              aria-label={`Client: ${client.name}`}
            >
              <div
                className="client-logo-mark"
                style={{
                  background: `linear-gradient(135deg, ${client.accent}22, ${client.accent}10)`,
                  borderColor: `${client.accent}30`,
                }}
              >
                <span className="client-logo-initials" style={{ color: client.accent }}>
                  {client.initials}
                </span>
              </div>
              <figcaption className="client-logo-caption">
                <span className="client-logo-name">{client.name}</span>
                <small className="client-logo-sector">{client.sector}</small>
                <small className="client-logo-tagline">{client.tagline}</small>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ClientsSection
