import { Instagram, Facebook, Twitter } from 'lucide-react'

const columns = [
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

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-100 bg-white px-6 py-10 md:px-10">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-gray-800">
            Calorye Hive Business
          </h4>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
            Advancing atmospheric precision in temporal management. We create digital
            environments that respect the fluidity of human attention and the rigidity of time.
          </p>
          <div className="mt-4 flex items-center gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <button
                key={i}
                aria-label="Social link"
                className="focus-ring flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-900 hover:text-white"
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h5 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {col.title}
            </h5>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="focus-ring text-sm text-gray-600 hover:text-brand-blue">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-gray-100 pt-6 text-xs text-gray-400 sm:flex-row">
        <span>© 2026 Calorye Hive Business. All rights reserved.</span>
        <span className="tracking-wide">PRECISION ELSEWHERE · GLOBAL ELSEWHERE</span>
      </div>
    </footer>
  )
}
