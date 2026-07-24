import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle } from 'lucide-react'

/**
 * Selectable menu package card.
 * @param {object} pkg - { id, title, description, price }
 * @param {boolean} selected
 * @param {function} onSelect
 */
export default function PackageCard({ pkg, selected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(pkg.id)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
      aria-pressed={selected}
      className={`relative flex flex-col rounded-xl border p-4 text-left transition-colors
        ${
          selected
            ? 'border-brand-blue bg-blue-50/60 shadow-sm'
            : 'border-transparent bg-slate-100/80 hover:bg-slate-100'
        }`}
    >
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <span className="text-[14px] font-semibold text-slate-800">{pkg.title}</span>
        {selected ? (
          <CheckCircle2 size={18} className="shrink-0 text-brand-blue" />
        ) : (
          <Circle size={18} className="shrink-0 text-slate-300" />
        )}
      </div>
      <p className="mb-3 text-[12.5px] leading-relaxed text-slate-500">{pkg.description}</p>
      <span className="text-[13px] font-semibold text-brand-blue">
        ${pkg.price} <span className="font-normal text-slate-400">/ guest</span>
      </span>
    </motion.button>
  )
}
