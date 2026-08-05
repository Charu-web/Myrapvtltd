import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import COmpalogog from '../assets/complogo.png'
import { companyName } from '../data/siteContent'

export default function Footer() {
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
      const newPath = targetId === 'home' ? '/' : `/${targetId}`
      window.history.pushState(null, '', newPath)
    }
  }

  return (
    <footer className="bg-navy border-t border-cyan/15 relative overflow-hidden">
      {/* Background cyan glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-electric/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Branding & Intro */}
          <div className="flex flex-col gap-6">
            <img src={COmpalogog} alt={companyName} className="h-10 w-auto object-contain self-start" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Leading developer and service provider of MEP, HVAC, Fire Fighting, Electrical Infrastructure, and Specialized Cleanroom solutions for modern industries.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-cyan/20 flex items-center justify-center text-gray-300 hover:text-cyan hover:border-cyan hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all duration-300">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-cyan/20 flex items-center justify-center text-gray-300 hover:text-cyan hover:border-cyan hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all duration-300">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-cyan/20 flex items-center justify-center text-gray-300 hover:text-cyan hover:border-cyan hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all duration-300">
                <FaLinkedinIn size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-cyan/20 flex items-center justify-center text-gray-300 hover:text-cyan hover:border-cyan hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all duration-300">
                <FaTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white text-base font-semibold uppercase tracking-wider border-l-2 border-cyan pl-3">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {['home', 'about', 'solutions', 'projects', 'clients', 'contact'].map((item) => (
                <li key={item}>
                  <a
                    href={item === 'home' ? '/' : `/${item}`}
                    onClick={(e) => handleScrollTo(e, item)}
                    className="text-gray-400 hover:text-cyan text-sm capitalize transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan group-hover:scale-125 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white text-base font-semibold uppercase tracking-wider border-l-2 border-cyan pl-3">Our Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li className="hover:text-cyan transition-colors duration-200 cursor-pointer">Electrical Infrastructure</li>
              <li className="hover:text-cyan transition-colors duration-200 cursor-pointer">HVAC & Climate Control</li>
              <li className="hover:text-cyan transition-colors duration-200 cursor-pointer">Fire & Safety Systems</li>
              <li className="hover:text-cyan transition-colors duration-200 cursor-pointer">Plumbing & Utility Piping</li>
              <li className="hover:text-cyan transition-colors duration-200 cursor-pointer">Cleanroom & Lab Solutions</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white text-base font-semibold uppercase tracking-wider border-l-2 border-cyan pl-3">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-cyan shrink-0" size={18} />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-cyan shrink-0" size={18} />
                <span>+91 40 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-cyan shrink-0" size={18} />
                <span>hello@maira-facilities.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-cyan shrink-0" size={18} />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {companyName} Facilities Management Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
