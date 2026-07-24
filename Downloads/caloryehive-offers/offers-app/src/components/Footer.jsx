import { Instagram, Twitter, Facebook } from 'lucide-react'

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

const SOCIALS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Facebook, label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/70 bg-[#f4f4f2] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-sm font-extrabold tracking-wide text-ink-900">
            CALORYEHIVE BUSINESS
          </p>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-700/55">
            Advancing atmospheric precision in temporal management. We create digital
            environments that respect the fluidity of human attention and the rigidity of time.
          </p>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-white transition-transform hover:scale-105 hover:bg-black"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-900">{col.title}</p>
            <ul className="mt-3 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] text-ink-700/60 transition-colors hover:text-brand-600"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-gray-200/70 pt-5 text-[11px] text-ink-700/40 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Caloryehive Business. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Precision Guaranteed</span>
          <span>Global Coverage</span>
        </div>
      </div>
    </footer>
  )
}
