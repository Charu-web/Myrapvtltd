import {
  Building2,
  CloudSnow,
  Flame,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  title: string
  description: string
  icon: LucideIcon
}

export type StatItem = {
  value: string
  label: string
}

export type ClientItem = {
  name: string
}

export type HeroCategory = {
  title: string
  items: string[]
}

export const companyName = 'MAIRA'
export const companyTagline = 'Facilities Management'

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]

export const heroBadge = 'Engineering Excellence. Building Trust.'
export const heroTitle = 'Integrated Facilities. Intelligent Solutions. Endless Possibilities.'
export const heroDescription =
  'End-to-end MEP, HVAC, Electrical, Plumbing & Fire Safety solutions for modern industries and sustainable future.'
export const heroPrimaryCta = 'Explore Services'
export const heroSecondaryCta = 'View Our Projects'

export const heroCategories: HeroCategory[] = [
  {
    title: '01 POWER GENERATION',
    items: ['Solar', 'Wind', 'Hydro', 'Thermal / Grid'],
  },
  {
    title: '02 TRANSMISSION & DISTRIBUTION',
    items: ['HT / LT Panels', 'Transformers', 'Compact Substation', 'Smart Grid'],
  },
  {
    title: '03 INDUSTRIAL & HVAC APPLICATION',
    items: ['Chillers', 'VRF / VRV Systems', 'AHU Systems', 'Air Compressors'],
  },
]

export const overviewEyebrow = 'About Maira Facilities'
export const overviewTitle = 'A modern partner for responsive, high-standard property care.'
export const overviewDescription =
  'From daily operations to strategic transformation, we help property leaders create environments that work beautifully for residents, guests, and teams.'
export const overviewBullets = [
  'Service plans built around each property’s purpose and pace',
  'Certified teams with strong safety and hospitality standards',
  'Clear reporting that keeps you informed without the noise',
]
export const principleItems = [
  'Transparent reporting and live updates',
  'Dedicated account managers and supervisors',
  'Sustainability-led service choices',
]

export const whyChooseUs = [
  {
    title: 'Operational excellence',
    description: 'We blend technology, people, and discipline to deliver reliable service every single day.',
    icon: Building2,
  },
  {
    title: 'Trusted partnerships',
    description: 'Our teams work as an extension of your business, with clear communication and measurable results.',
    icon: CloudSnow,
  },
  {
    title: 'Scalable support',
    description: 'Flexible coverage models adapt as your portfolio grows, changes, or requires special programs.',
    icon: Flame,
  },
]

export const heroFeatures = [
  {
    title: 'Electrical Infrastructure',
    subtitle: 'Power Distribution',
    icon: Building2,
  },
  {
    title: 'HVAC & Climate Control',
    subtitle: 'Cooling Solutions',
    icon: CloudSnow,
  },
  {
    title: 'Fire & Safety Systems',
    subtitle: 'Protection First',
    icon: Flame,
  },
  {
    title: 'Plumbing & Utility Piping',
    subtitle: 'Flow, Supply, Safety',
    icon: Truck,
  },
  {
    title: 'Cleanroom & Lab Solutions',
    subtitle: 'Precision Environments',
    icon: ShieldCheck,
  },
]

export const stats: StatItem[] = [
  { value: '150+', label: 'Corporate Clients' },
  { value: '15+', label: 'Years of Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '24/7', label: 'Support & Maintenance' },
]

export const clientNames: ClientItem[] = [
  { name: 'JSW' },
  { name: 'Adani' },
  { name: 'L&T Construction' },
  { name: 'Reliance' },
  { name: 'Vedanta' },
  { name: 'Infosys' },
  { name: 'Wipro' },
  { name: 'Dr.Reddy’s' },
  { name: 'Cipla' },
  { name: 'Aurobindo' },
]

export const contactDetails = {
  email: 'hello@maira-facilities.com',
  phone: '+91 40 1234 5678',
  address: 'Hyderabad, Telangana, India',
}

export const services: Service[] = [
  {
    title: 'Electrical Infrastructure',
    description: 'Power distribution design and commissioning for industrial estates and commercial campuses.',
    icon: Building2,
  },
  {
    title: 'HVAC & Climate Control',
    description: 'Precision climate systems that support critical spaces and high-performance working environments.',
    icon: CloudSnow,
  },
  {
    title: 'Fire & Safety Systems',
    description: 'Comprehensive fire protection, alarms, and suppression systems built for compliance and confidence.',
    icon: Flame,
  },
  {
    title: 'Plumbing & Utility Piping',
    description: 'End-to-end piping solutions for water, drainage, and industrial fluid handling.',
    icon: Truck,
  },
  {
    title: 'Cleanroom & Lab Solutions',
    description: 'Specialized environments for pharma, labs, and manufacturing with strict air and hygiene control.',
    icon: ShieldCheck,
  },
]

export const solutions = [
  'MEP design and execution',
  'Sustainable energy systems',
  'Integrated facility automation',
  'Safety and compliance frameworks',
]

export const projects = [
  'Data center MEP retrofit',
  'Hospital HVAC upgrade',
  'Industrial campus power distribution',
  'Cleanroom suite delivery',
]

export const careers = [
  'Facility Engineer',
  'MEP Project Lead',
  'Compliance Coordinator',
  'Service Delivery Manager',
]
