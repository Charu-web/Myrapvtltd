import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingBag,
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
  MessageSquare,
  Receipt,
  Boxes,
  UserCircle,
  Wallet,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Orders', icon: ShoppingBag },
  { label: 'Deliveries', icon: Truck },
  { label: 'Menu', icon: UtensilsCrossed },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Loyalty', icon: Star },
  { label: 'Catering', icon: ChefHat },
  { label: 'Meals', icon: Soup },
  { label: 'Marketing', icon: Megaphone },
  { label: 'Offers', icon: Tag },
  { label: 'Staff', icon: Users, active: true },
  { label: 'Shift', icon: Clock },
  { label: 'Reviews', icon: MessageSquare },
  { label: 'Transactions', icon: Receipt },
  { label: 'Inventory', icon: Boxes },
  { label: 'Profile', icon: UserCircle },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('Staff')

  const NavList = () => (
    <nav className="sidebar-scroll flex-1 space-y-1 overflow-y-auto px-3">
      {navItems.map(({ label, icon: Icon }) => {
        const isActive = active === label
        return (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`focus-ring group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-white text-brand-redDeep shadow-sm'
                : 'text-white/90 hover:bg-white/10 hover:pl-4'
            }`}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </button>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="focus-ring fixed left-4 top-4 z-40 rounded-lg bg-brand-red p-2 text-white shadow-lg md:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 76 : 224 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="sticky top-0 hidden h-screen flex-col bg-gradient-to-b from-brand-red via-brand-redDark to-brand-redDeep py-4 md:flex"
      >
        <div className="mb-4 flex items-center justify-between px-3">
          {!collapsed && (
            <div className="flex items-center gap-2 rounded-lg bg-white/95 px-2 py-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-blue text-xs font-bold text-white">
                CH
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-bold text-gray-800">CH Business</p>
                <p className="text-[8px] font-medium text-gray-500">ACCOUNT</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="focus-ring rounded-md p-1.5 text-white/80 hover:bg-white/10"
            aria-label="Toggle sidebar"
          >
            <Menu size={16} />
          </button>
        </div>
        <NavList />
        <div className="space-y-1 px-3 pt-2">
          <button className="focus-ring flex w-full items-center gap-3 rounded-lg bg-gray-900 px-3 py-2.5 text-sm font-medium text-white hover:bg-black">
            <Wallet size={18} />
            {!collapsed && <span>Withdraw Funds</span>}
          </button>
          <button className="focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10">
            <HelpCircle size={18} />
            {!collapsed && <span>Help</span>}
          </button>
          <button className="focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10">
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-gradient-to-b from-brand-red via-brand-redDark to-brand-redDeep py-4 md:hidden"
          >
            <div className="mb-4 flex items-center justify-between px-3">
              <div className="flex items-center gap-2 rounded-lg bg-white/95 px-2 py-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-blue text-xs font-bold text-white">
                  CH
                </div>
                <p className="text-[11px] font-bold text-gray-800">CH Business</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="focus-ring rounded-md p-1.5 text-white/80 hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <NavList />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
