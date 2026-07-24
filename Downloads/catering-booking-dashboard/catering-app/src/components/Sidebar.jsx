import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutGrid,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
  BarChart3,
  Star,
  ChefHat,
  Salad,
  Megaphone,
  Tag,
  Users,
  Clock,
  MessageSquare,
  Receipt,
  Package,
  User,
  Wallet,
  HelpCircle,
  LogOut,
  ChevronLeft,
  X,
} from 'lucide-react'
import { useSidebar } from '../context/SidebarContext.jsx'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Orders', icon: ShoppingBag },
  { label: 'Deliveries', icon: Truck },
  { label: 'Menu', icon: UtensilsCrossed },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Loyalty', icon: Star },
  { label: 'Catering', icon: ChefHat, active: true },
  { label: 'Meals', icon: Salad },
  { label: 'Marketing', icon: Megaphone },
  { label: 'Offers', icon: Tag },
  { label: 'Staff', icon: Users },
  { label: 'Shift', icon: Clock },
  { label: 'Reviews', icon: MessageSquare },
  { label: 'Transactions', icon: Receipt },
  { label: 'Inventory', icon: Package },
  { label: 'Profile', icon: User },
]

function NavButton({ item, collapsed }) {
  const Icon = item.icon
  return (
    <motion.button
      whileHover={{ x: item.active ? 0 : 3 }}
      transition={{ duration: 0.15 }}
      className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium
        transition-colors
        ${
          item.active
            ? 'bg-white text-sidebar-to shadow-md'
            : 'text-white/90 hover:bg-white/10'
        }
        ${collapsed ? 'justify-center' : ''}`}
      aria-current={item.active ? 'page' : undefined}
      title={collapsed ? item.label : undefined}
    >
      <Icon size={17} className="shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </motion.button>
  )
}

function SidebarContent({ collapsed }) {
  return (
    <>
      <div className={`mb-2 ${collapsed ? 'flex justify-center' : ''}`}>
        <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          {collapsed ? '●' : 'Active Now'}
        </span>
      </div>

      <nav className="sidebar-scroll flex-1 space-y-1 overflow-y-auto pr-1">
        {NAV_ITEMS.map((item) => (
          <NavButton key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="mt-3 space-y-1 border-t border-white/15 pt-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.15 }}
          className={`flex w-full items-center gap-3 rounded-lg bg-slate-900 px-3 py-2.5 text-[13.5px] font-semibold
            text-white transition-colors hover:bg-slate-800 ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Withdraw Funds' : undefined}
        >
          <Wallet size={17} className="shrink-0" />
          {!collapsed && <span>Withdraw Funds</span>}
        </motion.button>

        <NavButton item={{ label: 'Help', icon: HelpCircle }} collapsed={collapsed} />
        <NavButton item={{ label: 'Logout', icon: LogOut }} collapsed={collapsed} />
      </div>
    </>
  )
}

export default function Sidebar() {
  const { collapsed, toggleCollapsed, mobileOpen, closeMobile } = useSidebar()

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 84 : 264 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="relative hidden shrink-0 flex-col bg-gradient-to-b from-sidebar-from to-sidebar-to
          p-4 shadow-sidebar md:flex"
      >
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full
            bg-white text-sidebar-to shadow-md transition-transform hover:scale-110"
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronLeft size={14} />
          </motion.span>
        </button>
        <SidebarContent collapsed={collapsed} />
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col bg-gradient-to-b
                from-sidebar-from to-sidebar-to p-4 shadow-sidebar md:hidden"
            >
              <button
                onClick={closeMobile}
                aria-label="Close menu"
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white"
              >
                <X size={15} />
              </button>
              <div className="mt-8">
                <SidebarContent collapsed={false} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
