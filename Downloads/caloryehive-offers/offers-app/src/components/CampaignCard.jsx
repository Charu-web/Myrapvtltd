import { motion } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'
import Button from './Button'
import { cn } from '../utils/cn'

const STATUS_STYLES = {
  'Closing Soon': 'bg-red-50 text-red-600',
  'Flash Sale': 'bg-amber-50 text-amber-600',
  'New Member': 'bg-emerald-50 text-emerald-600',
  Evergreen: 'bg-blue-50 text-blue-600',
}

export default function CampaignCard({ offer, featured = false, onJoin, joining }) {
  const statusClass = STATUS_STYLES[offer.status] || 'bg-gray-100 text-gray-600'

  if (featured) {
    // Large two-column hero-style card (first card in the grid)
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:col-span-2 sm:grid-cols-2"
      >
        <div className="relative h-56 sm:h-full">
          <img src={offer.image} alt="" className="h-full w-full object-cover" loading="lazy" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            {offer.status}
          </span>
        </div>
        <div className="flex flex-col justify-between p-5 sm:p-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-blue-500">
              {offer.eyebrow}
            </span>
            <h3 className="mt-1.5 font-display text-xl font-bold text-ink-900">{offer.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-700/60">{offer.description}</p>

            <div className="mt-4 flex gap-6">
              {offer.impact && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-ink-700/40">Impact</p>
                  <p className="text-sm font-bold text-emerald-600">{offer.impact}</p>
                </div>
              )}
              {offer.eligibility && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-ink-700/40">Eligibility</p>
                  <p className="text-sm font-bold text-ink-900">{offer.eligibility}</p>
                </div>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            className="mt-5 w-full justify-between sm:w-fit"
            onClick={() => onJoin(offer)}
            loading={joining}
          >
            {offer.button}
            {!joining && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="relative h-32">
        <img src={offer.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        <span className={cn('absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold', statusClass)}>
          {offer.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-700/40">{offer.eyebrow}</span>
        <h3 className="mt-1 font-display text-[15px] font-bold leading-snug text-ink-900">{offer.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-700/55">{offer.description}</p>

        <div className="mt-3 flex items-center justify-between text-xs">
          <div>
            <p className="text-[10px] font-medium text-ink-700/40">
              {offer.value ? 'Value' : 'Requirement'}
            </p>
            <p className="font-bold text-ink-900">{offer.value || offer.requirement}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium text-ink-700/40">Est. Impact</p>
            <p className="font-bold text-emerald-600">{offer.impact}</p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-ink-800">{offer.rating}</span>
        </div>

        <Button
          variant="ghost"
          className="mt-4 w-full"
          onClick={() => onJoin(offer)}
          loading={joining}
        >
          {offer.button}
        </Button>
      </div>
    </motion.article>
  )
}
