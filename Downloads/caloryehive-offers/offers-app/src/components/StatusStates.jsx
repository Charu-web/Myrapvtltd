import { motion } from 'framer-motion'
import { SearchX, AlertTriangle, RotateCcw } from 'lucide-react'
import Button from './Button'

export function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/60 py-16 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <SearchX className="h-5 w-5 text-ink-700/50" aria-hidden="true" />
      </div>
      <p className="font-display text-base font-bold text-ink-900">No offers match yet</p>
      <p className="max-w-xs text-[13px] text-ink-700/55">
        Try a different search term or switch back to All Campaigns.
      </p>
      {onReset && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Clear filters
        </Button>
      )}
    </motion.div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full flex flex-col items-center justify-center gap-3 rounded-3xl bg-red-50/60 py-16 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
      <p className="font-display text-base font-bold text-ink-900">Couldn't load offers</p>
      <p className="max-w-xs text-[13px] text-ink-700/55">{message}</p>
      {onRetry && (
        <Button variant="brand" size="sm" onClick={onRetry}>
          <RotateCcw className="h-3.5 w-3.5" />
          Try again
        </Button>
      )}
    </motion.div>
  )
}
