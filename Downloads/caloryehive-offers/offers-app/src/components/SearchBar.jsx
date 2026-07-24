import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search activities…' }) {
  return (
    <div className="relative hidden w-full max-w-xs sm:block">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/40" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="w-full rounded-full border border-gray-200 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-700/40 shadow-sm transition-all focus:w-full focus:border-brand-400 focus:bg-white"
      />
    </div>
  )
}
