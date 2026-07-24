import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

/**
 * Selectable meal card shown in the Curate Menu panel.
 * @param {object} meal - { id, name, description, price, tag, image }
 * @param {boolean} selected
 * @param {function} onToggle
 */
export default function MealCard({ meal, selected, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={() => onToggle(meal.id)}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
      aria-pressed={selected}
      className={`relative flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors
        ${
          selected
            ? 'border-brand-blue bg-white shadow-sm'
            : 'border-transparent bg-white/70 hover:bg-white'
        }`}
    >
      <img
        src={meal.image}
        alt={meal.name}
        loading="lazy"
        className="h-14 w-14 shrink-0 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold text-slate-800">{meal.name}</p>
        <p className="truncate text-[12px] text-slate-500">{meal.description}</p>
        <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {meal.tag}
        </span>
      </div>

      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors
          ${selected ? 'bg-brand-blue text-white' : 'border border-slate-300 bg-white'}`}
      >
        {selected && <Check size={12} strokeWidth={3} />}
      </span>
    </motion.button>
  )
}
