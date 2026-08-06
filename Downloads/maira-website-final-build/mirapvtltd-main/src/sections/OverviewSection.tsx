import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './OverviewSection.css'
import mairaBuilding from '../assets/maira-building.jpg'
import Counter from '../components/Counter'
import {
  Layers,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
  Zap,
  Award,
  Headphones,
  ArrowRight,
} from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const featureCards = [
  {
    title: 'Integrated End-to-End Solutions',
    subtitle: 'Complete MEP, HVAC & facilities lifecycle management',
    icon: Layers,
    colorClass: 'icon-purple',
  },
  {
    title: 'Quality Assured',
    subtitle: 'Strict adherence to ISO 9001:2015 & IS standards',
    icon: CheckCircle2,
    colorClass: 'icon-green',
  },
  {
    title: 'On-Time Delivery',
    subtitle: 'Streamlined project execution & zero-downtime commissioning',
    icon: Clock,
    colorClass: 'icon-cyan',
  },
  {
    title: 'Safety & Compliance',
    subtitle: 'Zero-incident workplace commitment & statutory audits',
    icon: ShieldCheck,
    colorClass: 'icon-orange',
  },
]

const strengthItems = [
  {
    title: 'Expert Engineering Team',
    description: 'Certified MEP engineers and facility managers with over 15 years of hands-on industrial and commercial experience.',
    icon: Users,
  },
  {
    title: 'Advanced Technology',
    description: 'State-of-the-art building automation, IoT energy monitoring, and predictive maintenance infrastructure.',
    icon: Zap,
  },
  {
    title: 'Strict Quality Standards',
    description: 'Comprehensive quality assurance protocols, standardized SOPs, and continuous performance auditing.',
    icon: Award,
  },
  {
    title: 'Reliable After-Sales Support',
    description: '24/7 emergency response, SLA-backed maintenance, and dedicated account management.',
    icon: Headphones,
  },
]

const aboutStats = [
  { value: '15+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '150+', label: 'Happy Clients' },
  { value: '24/7', label: 'Support & Maintenance' },
]

export function OverviewSection() {
  // Mouse movement parallax values for building image
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const imgParallaxX = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10])
  const imgParallaxY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = (e.clientX - rect.left) / width - 0.5
    const mouseYPos = (e.clientY - rect.top) / height - 0.5
    mouseX.set(mouseXPos)
    mouseY.set(mouseYPos)
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
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
    }
  }

  return (
    <section className="about-section-container" id="about" onMouseMove={handleMouseMove}>
      {/* Background Ambient Radial Glows */}
      <div className="about-bg-glow glow-cyan-top" />
      <div className="about-bg-glow glow-purple-mid" />
      <div className="about-bg-glow glow-blue-bot" />

      {/* Grid Overlay Background Pattern */}
      <div className="about-grid-overlay" aria-hidden="true" />

      <motion.div
        className="about-shell"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Breadcrumb Navigation */}
        <nav className="about-breadcrumb" aria-label="Breadcrumb">
          <a
            href="#home"
            className="breadcrumb-link"
            onClick={(e) => handleSmoothScroll(e, 'home')}
          >
            Home
          </a>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">About Us</span>
        </nav>

        {/* Top Split Section: Left 45% Content / Right 55% MAIRA Building Visual */}
        <div className="about-top-grid">
          {/* Left Content Column (45%) */}
          <motion.div
            className="about-left-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="about-main-title">
              About Maira
              <span className="about-title-accent">Facilities Management</span>
            </h2>

            <div className="about-gradient-line" />

            <p className="about-paragraph">
              From daily operations to strategic transformation, we help property leaders
              create environments that work beautifully for residents, guests, and teams across India.
            </p>

            <p className="about-paragraph">
              Our integrated MEP, HVAC, Electrical, Fire Protection, Plumbing and Specialized
              Industrial Engineering solutions ensure high efficiency, safety compliance, and long-term asset value.
            </p>

            <div className="about-cta-row">
              <a
                href="#services"
                className="about-btn-primary"
                onClick={(e) => handleSmoothScroll(e, 'services')}
              >
                <span>Explore Services</span>
                <ArrowRight size={17} />
              </a>

              <a
                href="#contact"
                className="about-btn-secondary"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
              >
                <span>Get In Touch</span>
              </a>
            </div>
          </motion.div>

          {/* Right Building Image Column (55%) */}
          <motion.div
            className="about-right-col"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: imgParallaxX, y: imgParallaxY }}
          >
            {/* Ambient Blue Glow Behind Image */}
            <div className="about-img-glow" />

            <motion.div
              className="about-image-frame"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={mairaBuilding}
                alt="MAIRA Official Modern Office Facility Building"
                className="about-building-img"
              />
              <div className="about-image-overlay" />
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Glass Cards Horizontal Row (4 Cards) */}
        <motion.div
          className="about-features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {featureCards.map((card) => {
            const IconComponent = card.icon
            return (
              <motion.article
                key={card.title}
                className="about-feature-card"
                variants={itemFadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                <div className={`feature-icon-box ${card.colorClass}`}>
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3 className="feature-title">{card.title}</h3>
                  <p className="feature-subtitle">{card.subtitle}</p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Our Strengths Sub-section (4 Cards) */}
        <div className="about-strengths-wrapper">
          <motion.div
            className="strengths-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="strengths-eyebrow">OUR STRENGTHS</span>
            <h3 className="strengths-h2">Our Strengths</h3>
            <p className="strengths-sub">
              Key pillars driving our engineering excellence across commercial and industrial estates.
            </p>
          </motion.div>

          <motion.div
            className="strengths-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {strengthItems.map((item) => {
              const IconComp = item.icon
              return (
                <motion.div
                  key={item.title}
                  className="strength-card"
                  variants={itemFadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <div className="strength-icon">
                    <IconComp size={22} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Statistics Row (4 Cards) */}
        <motion.div
          className="about-stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {aboutStats.map((stat) => (
            <motion.div
              key={stat.label}
              className="about-stat-card"
              variants={itemFadeUp}
              whileHover={{ y: -4 }}
            >
              <div className="stat-number">
                <Counter value={stat.value} />
              </div>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default OverviewSection
