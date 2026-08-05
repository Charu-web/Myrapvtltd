import { motion } from 'framer-motion'
import { Building2, Server, Settings, FlaskConical, Activity, Box, Factory, Wind } from 'lucide-react'

const industries = [
  {
    name: 'Commercial Buildings',
    description: 'Corporate campuses, retail malls, high-rise residential properties, and institutional environments.',
    icon: Building2,
    color: 'from-blue-500/20 to-cyan-500/20 text-cyan'
  },
  {
    name: 'Data Centers',
    description: 'High-availability infrastructure needing redundant power, precision cooling, and critical security grids.',
    icon: Server,
    color: 'from-purple-500/20 to-blue-500/20 text-purple-400'
  },
  {
    name: 'Manufacturing Plants',
    description: 'Heavy industrial factory floors requiring structural MEP, utility pipes, and automation controls.',
    icon: Settings,
    color: 'from-orange-500/20 to-amber-500/20 text-orange-400'
  },
  {
    name: 'Pharma Industries',
    description: 'Specialized chemical piping, sterile environments, clean HVAC, and strict parameter control.',
    icon: FlaskConical,
    color: 'from-green-500/20 to-teal-500/20 text-green-400'
  },
  {
    name: 'Hospitals & Healthcare',
    description: 'Clean surgical suites, medical gas pipeline grids, emergency back-ups, and custom climate zones.',
    icon: Activity,
    color: 'from-red-500/20 to-pink-500/20 text-red-400'
  },
  {
    name: 'Warehouses & Logistics',
    description: 'Distribution grids, structural sprinkler lines, security monitoring, and large-scale mechanical ventilation.',
    icon: Box,
    color: 'from-amber-500/20 to-yellow-500/20 text-amber-400'
  },
  {
    name: 'Industrial Facilities',
    description: 'End-to-end grid setups, water treatment pumps, and substation utilities for industrial estates.',
    icon: Factory,
    color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400'
  },
  {
    name: 'Cleanrooms',
    description: 'High-precision sterile rooms with strict air changes, particulate filtration, and modular wall partitions.',
    icon: Wind,
    color: 'from-cyan-500/20 to-teal-500/20 text-cyan'
  }
]

export default function SolutionsSection() {
  return (
    <section id="solutions" className="py-24 bg-[#060d1a] relative overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-electric/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-cyan/10 text-cyan px-4 py-1.5 rounded-full border border-cyan/20">
            Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-6 mb-4 tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Providing custom facility planning, industrial engineering, and integrated MEP solutions across diverse sectors.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={ind.name}
                className="group p-6 rounded-2xl glass-panel border border-white/5 hover:border-cyan/30 hover:shadow-[0_8px_30px_rgba(0,212,255,0.08)] transition-all duration-300 flex flex-col items-start text-left gap-4"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ind.color} border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-white text-base font-bold tracking-wide group-hover:text-cyan transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-2 leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
