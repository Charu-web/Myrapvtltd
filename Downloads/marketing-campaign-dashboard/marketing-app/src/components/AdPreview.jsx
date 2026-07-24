import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Clock } from 'lucide-react'

/**
 * Right-hand live ad preview. Updates instantly as the campaign name or
 * selected format changes.
 * @param {string} campaignName
 * @param {object} selectedFormat - { id, title } | null
 */
export default function AdPreview({ campaignName, selectedFormat }) {
  const title = campaignName?.trim() || 'The Burger Joint (Downtown)'
  const category = selectedFormat ? selectedFormat.title : 'American · Burgers · $$'

  return (
    <div className="rounded-xl2 border border-preview-border bg-gradient-to-b from-preview-from to-preview-to p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[13.5px] font-semibold text-slate-800">Ad Preview</h3>
        <span className="text-[10px] font-medium text-slate-400">Mobile View</span>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-card">
        <div className="relative h-32 w-full bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200">
          <span className="absolute left-2 top-2 rounded-md bg-slate-900/80 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
            Sponsored
          </span>
        </div>

        <div className="p-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={title}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="truncate text-[13.5px] font-semibold text-slate-800"
            >
              {title}
            </motion.p>
          </AnimatePresence>

          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span>4.8</span>
            <span>&middot;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="truncate"
              >
                {category}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
            <Clock size={11} />
            <span>20–30 min</span>
          </div>

          <span className="mt-2.5 inline-block rounded-full bg-brand-blueSoft px-2.5 py-1 text-[10px] font-semibold text-brand-blueDark">
            {selectedFormat ? 'Active Preview' : 'Draft Preview'}
          </span>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400">
        Preview updates automatically as you edit your campaign details.
      </p>
    </div>
  )
}
