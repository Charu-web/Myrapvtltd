import React from 'react'
import { Facebook, Instagram, Twitch } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Services',
    links: ['Temporal Audits', 'Atmospheric UI', 'Precision Scheduling', 'Focus Flux'],
  },
  {
    title: 'Company',
    links: ['Our Philosophy', 'Global Offices', 'Research Lab', 'Careers'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Ethics Charter'],
  },
]

const SOCIALS = [Facebook, Instagram, Twitch]

export default function Footer() {
  return (
    <footer className="mt-10 px-4 pb-8 pt-10 md:px-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="text-[15px] font-extrabold uppercase tracking-wide text-slate-800">
            Calorye Hive Business
          </h4>
          <p className="mt-3 max-w-[240px] text-[12.5px] leading-relaxed text-slate-500">
            Advancing atmospheric precision in temporal management. We create digital
            environments that respect the fluidity of human attention and the rigidity of
            time.
          </p>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                aria-label="Social link"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white transition-transform hover:scale-105"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h5 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {col.title}
            </h5>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] text-slate-600 transition-colors hover:text-brand-blue"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-[11px] text-slate-400 sm:flex-row">
        <span>&copy; 2026 Calorye Hive Business. All rights reserved.</span>
        <span className="flex gap-4">
          <span>Precision Guaranteed</span>
          <span>Global Coverage</span>
        </span>
      </div>
    </footer>
  )
}
