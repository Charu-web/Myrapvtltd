import { useEffect, useState } from 'react'
import { Headphones, Bell, Settings, UserRound, Menu } from 'lucide-react'
import SearchBar from './SearchBar'
import CampaignReach from './CampaignReach'
import { useUI } from '../context/UIContext'

const ICON_BUTTONS = [
  { icon: Headphones, label: 'Support' },
  { icon: Bell, label: 'Notifications', dot: true },
  { icon: Settings, label: 'Settings' },
  { icon: UserRound, label: 'Profile' },
]

export default function Header({ search, onSearchChange }) {
  const { openDrawer } = useUI()
  const [reach, setReach] = useState(null)

  useEffect(() => {
    import('../services/api').then(({ fetchCampaignReach }) => {
      fetchCampaignReach().then(setReach)
    })
  }, [])

  return (
    <header className="flex flex-col gap-4 border-b border-gray-100 bg-[#f4f4f2]/80 px-5 py-4 backdrop-blur-sm sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={openDrawer}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-ink-800 md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
        <SearchBar value={search} onChange={onSearchChange} />
      </div>

      <div className="flex items-center justify-between gap-3 sm:gap-5">
        <div className="flex items-center gap-1 sm:gap-2">
          {ICON_BUTTONS.map(({ icon: Icon, label, dot }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="group relative flex h-9 w-9 items-center justify-center rounded-full text-ink-700/70 transition-colors hover:bg-white hover:text-ink-900"
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
              {dot && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-500" />}
              <span className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-md bg-ink-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </button>
          ))}
        </div>

        <CampaignReach reach={reach} />
      </div>
    </header>
  )
}
