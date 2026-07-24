import { Search, Headphones, Bell, Settings, User } from 'lucide-react'

export default function Header({ search, onSearchChange }) {
  return (
    <header className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="relative w-full max-w-xs">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search activities..."
          className="focus-ring w-full rounded-full border border-gray-200 bg-gray-100 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus-visible:border-brand-blue"
        />
      </div>

      <div className="flex items-center gap-1 self-end md:self-auto">
        {[
          { icon: Headphones, label: 'Support' },
          { icon: Bell, label: 'Notifications' },
          { icon: Settings, label: 'Settings' },
          { icon: User, label: 'Profile' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className="focus-ring rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100"
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </header>
  )
}
