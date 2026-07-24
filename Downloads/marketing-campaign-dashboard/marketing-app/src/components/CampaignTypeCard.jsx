import React from 'react'
import { motion } from 'framer-motion'
import { Megaphone, Video, CheckCircle2 } from 'lucide-react'

const ICON_MAP = {
  megaphone: Megaphone,
  video: Video,
}

/**
 * Selectable campaign format card (e.g. "Sponsored Listing", "Video Ad").
 * @param {object} format - { id, title, description, icon }
 * @param {boolean} selected
 * @param {function} onSelect
 */
export default function CampaignTypeCard({ format, selected, onSelect }) {
  const Icon = ICON_MAP[format.icon] || Megaphone

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(format.id)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
      aria-pressed={selected}
      className={`relative flex flex-1 flex-col items-start rounded-xl p-4 text-left transition-colors
        ${
          selected
            ? 'bg-gradient-to-br from-brand-blue to-brand-blueDark text-white shadow-card'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
        }`}
    >
      <div className="mb-4 flex w-full items-start justify-between">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg
            ${selected ? 'bg-white/20' : 'bg-white text-slate-500'}`}
        >
          <Icon size={17} />
        </span>
        {selected ? (
          <CheckCircle2 size={18} className="text-white" />
        ) : (
          <span className="h-[18px] w-[18px] rounded-full border-2 border-slate-300" />
        )}
      </div>

      <span className="text-[14px] font-semibold">{format.title}</span>
      <span className={`mt-1 text-[12px] leading-relaxed ${selected ? 'text-white/85' : 'text-slate-500'}`}>
        {format.description}
      </span>
    </motion.button>
  )
}
