import { Search, Headphones, Bell, Settings, User, ShieldCheck, Plus } from 'lucide-react'
import Button from './Button'

export default function Header({ search, onSearchChange, onAddStaff }) {
  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 bg-white/70 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between md:px-8">
      <div className="relative w-full max-w-xs">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search staff..."
          className="focus-ring w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus-visible:border-brand-blue"
        />
      </div>

      <div className="flex items-center justify-between gap-4 md:justify-end">
        <div className="flex items-center gap-1">
          {[
            { icon: Headphones, label: 'Support' },
            { icon: Bell, label: 'Notifications' },
            { icon: Settings, label: 'Settings' },
            { icon: User, label: 'Profile' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="focus-ring rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" icon={ShieldCheck} className="whitespace-nowrap">
            Edit Permissions
          </Button>
          <Button variant="primary" icon={Plus} className="whitespace-nowrap" onClick={onAddStaff}>
            Add Staff
          </Button>
        </div>
      </div>
    </header>
  )
}
