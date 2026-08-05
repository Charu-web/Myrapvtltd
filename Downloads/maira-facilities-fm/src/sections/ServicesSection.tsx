import { motion } from 'framer-motion'
import { Zap, Thermometer, Flame, Droplets, ShieldCheck, Check } from 'lucide-react'
import serviceImg from '../assets/image.png'

const serviceList = [
  {
    title: 'Electrical Infrastructure & Power Distribution',
    description: 'Erection & commissioning of sub-stations, transformers, HT/LT panels, and cable distribution networks for heavy industries.',
    icon: Zap,
    bullets: ['Substation Erection (Up to 33KV)', 'HT / LT Panel Installation', 'DG Synchronizing & Panels', 'UPS & Battery Bank Systems'],
    color: 'from-blue-600/20 to-cyan-500/20 text-cyan border-cyan/25',
    neonColor: 'group-hover:border-cyan/60 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.25)]'
  },
  {
    title: 'HVAC & Climate Control Systems',
    description: 'Precision air handling and custom chilling systems designed to run predictably in high-load commercial & industrial operations.',
    icon: Thermometer,
    bullets: ['Industrial Chillers & Piping', 'VRF / VRV System Projects', 'Air Handling Units (AHU)', 'Dehumidifiers & Clean Air Systems'],
    color: 'from-cyan-500/20 to-blue-700/20 text-blue-400 border-blue-500/25',
    neonColor: 'group-hover:border-blue-500/60 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.25)]'
  },
  {
    title: 'Fire Fighting & Safety Systems',
    description: 'State-of-the-art protection grids including sprinklers, high-sensitivity alarms, and advanced gas suppression.',
    icon: Flame,
    bullets: ['Automatic Sprinkler Networks', 'Fire Hydrants & Pumps', 'Gas Suppression Systems', 'Analogue Addressable Alarms'],
    color: 'from-red-500/20 to-amber-600/20 text-red-400 border-red-500/25',
    neonColor: 'group-hover:border-red-500/60 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]'
  },
  {
    title: 'Plumbing & Utility Piping Networks',
    description: 'Heavy utility plumbing lines for high-pressure water, process pipelines, air compressions, and utility grids.',
    icon: Droplets,
    bullets: ['High-Pressure Fluid Piping', 'Compressed Air System Piping', 'Water Treatment Plant (WTP) Piping', 'Utility Distribution Lines'],
    color: 'from-teal-500/20 to-cyan-600/20 text-teal-400 border-teal-500/25',
    neonColor: 'group-hover:border-teal-500/60 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.25)]'
  },
  {
    title: 'Cleanroom & Sterile Laboratory Solutions',
    description: 'End-to-end cleanroom modular structures for pharma, bio-safety, and precision manufacturing.',
    icon: ShieldCheck,
    bullets: ['Modular Cleanroom Partitions', 'EPOXY & PU Self-leveling Flooring', 'Pass Box & Air Showers', 'HEPA Filter & HVAC Integration'],
    color: 'from-green-500/20 to-emerald-600/20 text-green-400 border-green-500/25',
    neonColor: 'group-hover:border-green-500/60 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.25)]'
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#050a14] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-electric/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-cyan/10 text-cyan px-4 py-1.5 rounded-full border border-cyan/20">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-6 mb-4 tracking-tight">
            Futuristic Engineering Services
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Providing modular and scalable services tailored to the operational demands of factories, data centers, labs, and office complexes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={service.title}
                className={`group rounded-[1.75rem] glass-panel p-6 border flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 ${service.neonColor}`}
              >
                {/* Header: Icon & Title */}
                <div className="flex flex-col gap-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} border flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold group-hover:text-cyan transition-colors tracking-wide leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Body: Bullet Points */}
                <ul className="my-6 space-y-2 border-t border-b border-white/5 py-4 text-left">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
                      <Check className="text-cyan shrink-0" size={14} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer: Visual Image Link with overlay */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/7] border border-white/5 mt-auto group-hover:border-cyan/30 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 to-transparent z-10" />
                  <img
                    src={serviceImg}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-3 left-4 z-20">
                    <span className="text-[10px] font-bold text-cyan tracking-widest uppercase font-mono">SPEC_SYS: SECURED</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
