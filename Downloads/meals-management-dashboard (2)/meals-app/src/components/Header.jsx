import React from 'react'
import { Search, Headphones, Bell, Settings, UserCircle2, Menu, Plus } from 'lucide-react'
import { useSidebar } from '../context/SidebarContext.jsx'
import Logo from './Logo.jsx'

const ICON_ACTIONS = [
  { label: 'Support', icon: Headphones },
  { label: 'Notifications', icon: Bell },
  { label: 'Settings', icon: Settings },
  { label: 'Profile', icon: UserCircle2 },
]

export default function Header({ onCreateMealPlan }) {
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
            placeholder="Search for meals..."
            aria-label="Search for meals"
            className="w-40 bg-transparent text-[13px] text-slate-600 placeholder:text-slate-500 outline-none md:w-56"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pr-4 sm:gap-4 md:pr-8">
        {ICON_ACTIONS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            aria-label={label}
            title={label}
            className="hidden flex-col items-center gap-0.5 text-slate-500 transition-colors hover:text-slate-800 sm:flex"
          >
            <Icon size={19} strokeWidth={1.8} />
            <span className="hidden text-[9px] font-medium leading-none lg:block">{label}</span>
          </button>
        ))}

        <button
          onClick={onCreateMealPlan}
          className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-[12.5px] font-semibold
            text-white transition-colors hover:bg-slate-800"
        >
          <Plus size={15} />
          <span className="hidden sm:inline">Create New Meal Plan</span>
        </button>
      </div>
    </header>
  )
}
