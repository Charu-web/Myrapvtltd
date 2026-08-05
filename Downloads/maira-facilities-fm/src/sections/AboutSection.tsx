import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
const SafeCountUp = (CountUp as any).default || CountUp
import { Shield, CheckCircle2, Award, Clock } from 'lucide-react'
import heroImg from '../assets/hero.png'

const aboutFeatures = [
  {
    title: 'Integrated Solutions',
    description: 'Coordinated engineering services combining electrical, HVAC, firefighting, and utilities.',
    icon: Shield,
    color: 'text-cyan bg-cyan/10 border-cyan/25'
  },
  {
    title: 'Quality Assured',
    description: 'Rigorous engineering standards with high-grade components for operational longevity.',
    icon: CheckCircle2,
    color: 'text-electric bg-electric/10 border-electric/25'
  },
  {
    title: 'On-Time Delivery',
    description: 'Fast mobilization and execution of critical facility programs, keeping downtime to zero.',
    icon: Clock,
    color: 'text-green-400 bg-green-500/10 border-green-500/25'
  },
  {
    title: 'Safety Compliance',
    description: 'Adhering to strict safety frameworks, hazard protocols, and environmental standards.',
    icon: Award,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/25'
  }
]

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Completed Projects' },
  { value: 150, suffix: '+', label: 'Happy Clients' },
  { value: 24, suffix: '/7', label: 'Support & Care' }
]

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="about" className="py-24 bg-[#060d1a] relative overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-electric/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-cyan/10 text-cyan px-4 py-1.5 rounded-full border border-cyan/20">
            About Company
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-6 mb-4 tracking-tight">
            A Responsive Partner for Industrial Systems & MEP Infrastructure
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            MAIRA Facilities Management Pvt. Ltd. provides operational discipline and state-of-the-art facilities coordination. We ensure environments work seamlessly for modern industries.
          </p>
        </div>

        {/* Grid: Image and Intro Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left: Building Image Mockup */}
          <div className="lg:col-span-6">
            <div className="relative group rounded-[2rem] overflow-hidden border border-cyan/20 shadow-2xl shadow-black/45">
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity z-10" />
              <img
                src={heroImg}
                alt="Corporate Facility"
                className="w-full h-auto object-cover min-h-[350px] max-h-[480px] transform group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Graphic Blueprint overlay */}
              <div className="absolute top-6 right-6 z-20 bg-navy/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-cyan/20 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
                <span className="text-xs font-mono text-cyan uppercase tracking-wider">Maira HQ // Hyd</span>
              </div>
            </div>
          </div>

          {/* Right: Intro & Features */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <h3 className="text-2xl font-bold text-white tracking-wide">
              Engineering Trust, Building the Future
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We design, execute, and service complex electrical grids, air handling units, gas pipes, and customized sterile cleanrooms. Our teams combine domain knowledge with technology to optimize performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {aboutFeatures.map((feat) => {
                const Icon = feat.icon
                return (
                  <div key={feat.title} className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-cyan/20 hover:shadow-[0_4px_20px_rgba(0,212,255,0.05)] transition-all flex gap-4">
                    <div className={`w-10 h-10 rounded-xl shrink-0 border flex items-center justify-center ${feat.color}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold">{feat.title}</h4>
                      <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Statistics block */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10 px-6 rounded-3xl glass-panel border border-cyan/15 relative overflow-hidden bg-navy/40">
          {/* Subtle cyan glow inside stats */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/5 to-transparent pointer-events-none" />

          {stats.map((stat) => (
            <div key={stat.label} className="text-center flex flex-col gap-2 relative z-10">
              <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {inView ? (
                  <SafeCountUp start={0} end={stat.value} duration={2.5} separator="," />
                ) : (
                  <span>0</span>
                )}
                <span className="text-cyan font-bold">{stat.suffix}</span>
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-400 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
