import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  UtensilsCrossed,
  BarChart3,
  Star,
  ChefHat,
  Soup,
  Megaphone,
  Tag,
  Users,
  Clock,
  MessageSquareText,
  Receipt,
  Boxes,
  UserCircle,
  Wallet,
  HelpCircle,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  X,
} from 'lucide-react'
import { cn } from '../utils/cn'
import { useUI } from '../context/UIContext'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Orders', icon: ClipboardList },
  { label: 'Deliveries', icon: Truck },
  { label: 'Menu', icon: UtensilsCrossed },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Loyalty', icon: Star },
  { label: 'Catering', icon: ChefHat },
  { label: 'Meals', icon: Soup },
  { label: 'Marketing', icon: Megaphone },
  { label: 'Offers', icon: Tag, active: true },
  { label: 'Staff', icon: Users },
  { label: 'Shift', icon: Clock },
  { label: 'Reviews', icon: MessageSquareText },
  { label: 'Transactions', icon: Receipt },
  { label: 'Inventory', icon: Boxes },
  { label: 'Profile', icon: UserCircle },
]

function NavButton({ item, collapsed }) {
  const Icon = item.icon
  return (
    <button
      type="button"
      className={cn(
        'group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium transition-all duration-200',
        item.active
          ? 'bg-white text-brand-600 shadow-pop'
          : 'text-white/80 hover:bg-white/10 hover:text-white',
        collapsed && 'justify-center px-0',
      )}
      aria-current={item.active ? 'page' : undefined}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 z-50">
          {item.label}
        </span>
      )}
    </button>
  )
}

function SidebarContent({ collapsed }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={cn('flex items-center gap-2 px-5 pt-6 pb-5', collapsed && 'justify-center px-0')}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-extrabold text-brand-600 shrink-0">
          CH
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <p className="text-[13px] font-bold text-white">Caloryehive</p>
            <p className="text-[10px] font-medium tracking-wide text-white/60">BUSINESS ACCOUNT</p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="mx-5 mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          ACTIVE NOW
        </div>
      )}

      {/* Nav */}
      <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {NAV_ITEMS.map((item) => (
          <NavButton key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <button
          type="button"
          className={cn(
            'flex w-full items-center gap-3 rounded-xl bg-ink-900 px-3.5 py-2.5 text-left text-[13px] font-semibold text-white transition-colors hover:bg-black',
            collapsed && 'justify-center px-0',
          )}
        >
          <Wallet className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          {!collapsed && <span>Withdraw Funds</span>}
        </button>
        <button
          type="button"
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white',
            collapsed && 'justify-center px-0',
          )}
        >
          <HelpCircle className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          {!collapsed && <span>Help</span>}
        </button>
        <button
          type="button"
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white',
            collapsed && 'justify-center px-0',
          )}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileDrawerOpen, closeDrawer } = useUI()

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 84 : 248 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="relative hidden shrink-0 bg-brand-gradient shadow-sidebar md:block"
      >
        <SidebarContent collapsed={sidebarCollapsed} />
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-600 shadow-card hover:scale-105 transition-transform"
        >
          {sidebarCollapsed ? <ChevronsRight className="h-3.5 w-3.5" /> : <ChevronsLeft className="h-3.5 w-3.5" />}
        </button>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-brand-gradient shadow-sidebar md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close navigation"
                className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent collapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
