import { Twitter, Instagram, Linkedin } from "lucide-react";

const footerColumns = [
  {
    title: "Services",
    links: ["Temporal Audits", "Atmospheric UI", "Precision Scheduling", "Focus Flux"],
  },
  {
    title: "Company",
    links: ["Our Philosophy", "Global Offices", "Research Lab", "Careers"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Settings", "Ethics Charter"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-100 pt-10">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-extrabold tracking-wide text-ink-900">
            CALORYE HIVE BUSINESS
          </p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-ink-500">
            Advancing atmospheric precision in temporal management. We create digital
            environments that respect the fluidity of human attention and the rigidity
            of time.
          </p>
          <div className="mt-4 flex items-center gap-2">
            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
              <button
                key={i}
                type="button"
                aria-label="Social link"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition-colors hover:bg-ink-900 hover:text-white"
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">
              {col.title}
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-xs text-ink-700 transition-colors hover:text-brand-red"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-ink-100 py-6 text-[11px] text-ink-500 sm:flex-row">
        <p>© 2026 Calorye Hive Business. All rights reserved.</p>
        <p>PRECISION GUARANTEED · GLOBAL COVERAGE</p>
      </div>
    </footer>
  );
}
