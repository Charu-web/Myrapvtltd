import { motion } from 'framer-motion'
import { Award, ArrowRight } from 'lucide-react'

const clientNames = [
  'Tata', 'Adani', 'Reliance', 'L&T Construction', 'Vedanta',
  'JSW', 'Infosys', 'Wipro', 'Hindustan Zinc', 'Piramal',
  'Sun Pharma', 'Dr. Reddy\'s', 'Cipla', 'Torrent Pharma', 'Autobind'
]

export default function ClientsSection() {
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
    <section id="clients" className="py-24 bg-[#060d1a] relative overflow-hidden">
      {/* Background cyan glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-cyan/10 text-cyan px-4 py-1.5 rounded-full border border-cyan/20">
            Partnerships
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-6 mb-4 tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Proud to partner with leading organizations across commercial, industrial, and cleanroom environments.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {clientNames.map((client, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              key={client}
              className="h-24 rounded-2xl glass-panel border border-white/5 flex items-center justify-center p-4 hover:border-cyan/35 hover:shadow-[0_4px_20px_rgba(0,212,255,0.08)] group hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <span className="text-gray-400 font-extrabold text-lg group-hover:text-cyan group-hover:neon-text-glow transition-all duration-300 tracking-wider">
                {client}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Become Our Client Partner CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-[2.5rem] glass-panel-neon border border-cyan/20 relative overflow-hidden bg-navy/40 max-w-4xl mx-auto text-center"
        >
          {/* Neon line decoration */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan shrink-0">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold tracking-wide">Become Our Client Partner</h3>
                <p className="text-gray-400 text-sm mt-1.5 leading-relaxed max-w-lg">
                  Integrate your facility infrastructure with our reliable engineering models. Reach out to setup a site evaluation or consulting program.
                </p>
              </div>
            </div>
            
            <a
              href="/contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase text-white bg-gradient-to-r from-electric to-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300 shrink-0 flex items-center gap-2 group"
            >
              Connect With Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
