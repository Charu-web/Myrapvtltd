import { motion } from 'framer-motion'
import { MapPin, Calendar, Layers, User } from 'lucide-react'
import heroImg from '../assets/hero.png'
import serviceImg from '../assets/image.png'

const projects = [
  {
    name: 'Data Center MEP Retrofit',
    client: 'Adani Group',
    location: 'Mumbai, India',
    category: 'Electrical & Power',
    year: '2025',
    image: heroImg
  },
  {
    name: 'Modular Cleanroom Facility',
    client: "Dr. Reddy's Laboratories",
    location: 'Hyderabad, India',
    category: 'Cleanroom & Sterile',
    year: '2024',
    image: serviceImg
  },
  {
    name: 'Solar Substation grid (33KV)',
    client: 'JSW Energy',
    location: 'Rajasthan, India',
    category: 'HT Distribution',
    year: '2025',
    image: heroImg
  },
  {
    name: 'Corporate HQ HVAC Installation',
    client: 'Tata Group',
    location: 'Pune, India',
    category: 'HVAC & Climate',
    year: '2023',
    image: serviceImg
  },
  {
    name: 'High-Pressure Utility Piping',
    client: 'Reliance Industries',
    location: 'Jamnagar, India',
    category: 'Plumbing & Process',
    year: '2024',
    image: heroImg
  },
  {
    name: 'Sterile Bio-Lab Suite',
    client: 'Sun Pharma',
    location: 'Bengaluru, India',
    category: 'Laboratory Solutions',
    year: '2023',
    image: serviceImg
  }
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-[#050a14] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-cyan/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-electric/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-cyan/10 text-cyan px-4 py-1.5 rounded-full border border-cyan/20">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-6 mb-4 tracking-tight">
            Recent Completed Projects
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Take a look at some of our complex industrial engineering and MEP deliveries successfully deployed.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={project.name}
              className="group rounded-[2rem] overflow-hidden glass-panel border border-white/5 hover:border-cyan/35 hover:shadow-[0_8px_32px_rgba(0,212,255,0.12)] transition-all duration-300 flex flex-col"
            >
              {/* Image box with overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-80 group-hover:opacity-50 transition-all duration-300 z-10" />
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-md text-[9px] font-mono tracking-widest uppercase bg-cyan/15 text-cyan border border-cyan/30">
                  {project.category}
                </span>
              </div>

              {/* Text metadata */}
              <div className="p-6 flex flex-col gap-4 text-left">
                <h3 className="text-white text-lg font-bold group-hover:text-cyan transition-colors tracking-wide leading-tight">
                  {project.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-cyan" />
                    <span className="truncate">Client: <strong className="text-white font-medium">{project.client}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-cyan" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-cyan" />
                    <span>MEP Project</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-cyan" />
                    <span>Finished: {project.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
