import { Radio } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CampaignReach({ reach }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-w-[176px] flex-col gap-1 rounded-2xl bg-ink-900 px-4 py-3 text-white shadow-pop"
    >
      <span className="text-[11px] font-medium text-white/60">Campaign Reach</span>
      <span className="text-2xl font-extrabold tracking-tight tabular-nums">
        {reach ? reach.impressions : '—'}
      </span>
      <span className="flex items-center gap-1.5 text-[11px] text-white/50">
        <Radio className="h-3 w-3" aria-hidden="true" />
        {reach ? reach.label : 'Loading…'}
      </span>
    </motion.div>
  )
}
