import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { contactDetails } from '../data/siteContent'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated form submission
    console.log('Submitted data:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-24 bg-[#050a14] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-cyan/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-electric/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-cyan/10 text-cyan px-4 py-1.5 rounded-full border border-cyan/20">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-6 mb-4 tracking-tight">
            Connect with Our Engineering Office
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Reach out to our experts for inquiries, audits, project scheduling, and partnership contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office details & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col gap-6">
              <h3 className="text-white text-xl font-bold tracking-wide">Contact Information</h3>
              
              <div className="flex flex-col gap-5 text-sm text-gray-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/25 flex items-center justify-center text-cyan shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-semibold uppercase tracking-wider text-cyan">Office Address</h4>
                    <p className="mt-1 leading-relaxed">{contactDetails.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-electric/10 border border-electric/25 flex items-center justify-center text-electric shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-semibold uppercase tracking-wider text-electric">Phone Support</h4>
                    <p className="mt-1">{contactDetails.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-semibold uppercase tracking-wider text-green-400">Email Inquiries</h4>
                    <p className="mt-1">{contactDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-semibold uppercase tracking-wider text-purple-400">Working Hours</h4>
                    <p className="mt-1">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Styled Google Maps Mockup */}
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-cyan/15 relative">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m15!1m3!1d243647.3160408544!2d78.26795778848777!3d17.412299801832264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaeb2c49%3A0x6b4c32906b002c49!2sHyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-full border-none invert-[90%] hue-rotate-180 brightness-[85%] grayscale contrast-[120%]"
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-cyan/15 bg-navy/20 relative overflow-hidden h-full flex flex-col justify-center">
              <h3 className="text-white text-xl font-bold tracking-wide text-left mb-6">Send a Message</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(0,200,83,0.3)]">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-white text-lg font-bold">Message Sent Successfully!</h4>
                  <p className="text-gray-400 text-sm max-w-xs">
                    Thank you for reaching out. An engineering representative will respond to your inquiry shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-xl bg-navy/80 border border-white/10 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,212,255,0.2)] text-sm transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-xl bg-navy/80 border border-white/10 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,212,255,0.2)] text-sm transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-xl bg-navy/80 border border-white/10 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,212,255,0.2)] text-sm transition-all duration-200"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    {/* Company */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-xl bg-navy/80 border border-white/10 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,212,255,0.2)] text-sm transition-all duration-200"
                        placeholder="Acme Industrial"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl bg-navy/80 border border-white/10 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,212,255,0.2)] text-sm transition-all duration-200"
                      placeholder="MEP Site Inspection Request"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl bg-navy/80 border border-white/10 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,212,255,0.2)] text-sm transition-all duration-200 resize-none"
                      placeholder="Please specify details of your program..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-2 w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase text-white bg-gradient-to-r from-electric to-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
