import { ArrowRight, Zap, Thermometer, Flame, Droplets, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import heroVideo from '../assets/aivediolog.mp4'

const featureCards = [
  {
    title: 'Electrical Infrastructure',
    subtitle: 'HT/LT Power & Distribution',
    icon: Zap,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'HVAC & Climate Control',
    subtitle: 'Precision Cooling & AHU',
    icon: Thermometer,
    color: 'from-cyan-500/20 to-blue-600/20'
  },
  {
    title: 'Fire & Safety Systems',
    subtitle: 'Suppression & Alarms',
    icon: Flame,
    color: 'from-red-500/20 to-amber-500/20'
  },
  {
    title: 'Plumbing & Utility Piping',
    subtitle: 'Drainage & Gas Delivery',
    icon: Droplets,
    color: 'from-teal-500/20 to-cyan-500/20'
  },
  {
    title: 'Cleanroom & Lab Solutions',
    subtitle: 'Precision Hygiene & Air',
    icon: ShieldCheck,
    color: 'from-green-500/20 to-emerald-500/20'
  }
]

export default function HeroSection() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
      window.history.pushState(null, '', `/${targetId}`)
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Futuristic dark overlay with color filters */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent z-10" />
      </div>

      {/* Cybernetic Grid & Glowing Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,212,255,0.15),transparent_40%)] pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left mt-8">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-green-500/10 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(0,200,83,0.15)]">
              Engineering Excellence
            </span>
            <span className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan/10 text-cyan border border-cyan/30 shadow-[0_0_10px_rgba(0,212,255,0.15)]">
              Next-Gen Tech
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Integrated Facilities.
            <br />
            <span className="bg-gradient-to-r from-cyan via-electric to-purple-500 bg-clip-text text-transparent">
              Intelligent Solutions.
            </span>
            <br />
            Endless Possibilities.
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
            Providing high-performance engineering systems for modern infrastructures. Delivering top-tier MEP, HVAC, Fire Protection, Electrical Infrastructure, Plumbing, and Specialized Cleanroom environments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="/services"
              onClick={(e) => handleScrollTo(e, 'services')}
              className="px-8 py-3.5 rounded-full text-sm font-bold tracking-wider uppercase text-white bg-gradient-to-r from-electric to-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 group"
            >
              Explore Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/projects"
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="px-8 py-3.5 rounded-full text-sm font-bold tracking-wider uppercase text-white bg-white/5 border border-white/20 hover:border-cyan hover:bg-white/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Right column: Futuristic Visual Placeholder */}
        <div className="lg:col-span-5 hidden lg:flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[420px] aspect-square rounded-[2rem] relative overflow-hidden border border-cyan/30 glass-panel-neon p-6 flex flex-col justify-between"
          >
            {/* Overlay Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-cyan/70">SYS.STATUS: ACTIVE</span>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            </div>

            {/* Glowing Center Ring */}
            <div className="relative w-48 h-48 mx-auto my-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-cyan/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-electric/40 animate-[spin_10s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-electric/25 to-cyan/20 blur-md" />
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white">MAIRA</span>
                <span className="text-[9px] text-cyan uppercase tracking-widest font-mono">Facilities</span>
              </div>
            </div>

            <div className="flex justify-between items-end text-xs font-mono text-gray-400">
              <span>MEP ENG // 2026</span>
              <span>EST. HYD // IN</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
          {featureCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={card.title}
                className="glass-panel hover:border-cyan/40 p-5 rounded-[1.25rem] group hover:shadow-[0_10px_25px_-5px_rgba(0,212,255,0.15)] transition-all duration-300 flex flex-col gap-4 text-left"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} border border-cyan/20 flex items-center justify-center text-cyan group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold tracking-wide group-hover:text-cyan transition-colors">{card.title}</h4>
                  <p className="text-gray-400 text-xs mt-1 leading-normal">{card.subtitle}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
