import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

export const CATEGORIES = ['All Campaigns', 'Flash Sales', 'Customer Loyalty', 'New Member']

export default function FilterTabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter offers by category">
      {CATEGORIES.map((category) => {
        const isActive = active === category
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              'relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200',
              isActive ? 'text-white' : 'text-ink-700/70 hover:text-ink-900 bg-white/70 hover:bg-white',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill-active"
                className="absolute inset-0 rounded-full bg-ink-900"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        )
      })}
    </div>
  )
}
