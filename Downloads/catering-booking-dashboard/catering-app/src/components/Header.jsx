import React from 'react'
import { Search, Headphones, Bell, Settings, UserCircle2, Menu } from 'lucide-react'
import { useSidebar } from '../context/SidebarContext.jsx'
import Logo from './Logo.jsx'

const ICON_ACTIONS = [
  { label: 'Support', icon: Headphones },
  { label: 'Notifications', icon: Bell },
  { label: 'Settings', icon: Settings },
  { label: 'Profile', icon: UserCircle2 },
]

export default function Header() {
  const { toggleMobile } = useSidebar()

  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobile}
          aria-label="Open menu"
          className="ml-4 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 md:hidden"
        >
          <Menu size={18} />
        </button>

        <div className="hidden lg:block">
          <Logo />
        </div>

        <div className="hidden items-center gap-2 rounded-full bg-slate-200/70 px-4 py-2 sm:flex">
          <Search size={15} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search activities..."
            aria-label="Search activities"
            className="w-40 bg-transparent text-[13px] text-slate-600 placeholder:text-slate-500 outline-none md:w-56"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pr-4 sm:gap-4 md:pr-8">
        {ICON_ACTIONS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            aria-label={label}
            title={label}
            className="flex flex-col items-center gap-0.5 text-slate-500 transition-colors hover:text-slate-800"
          >
            <Icon size={19} strokeWidth={1.8} />
            <span className="hidden text-[9px] font-medium leading-none lg:block">{label}</span>
          </button>
        ))}
      </div>
    </header>
  )
}
