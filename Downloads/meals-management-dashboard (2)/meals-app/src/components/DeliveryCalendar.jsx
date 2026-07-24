import React from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const DAYS = [
  { key: 'mon', label: 'M', full: 'Monday' },
  { key: 'tue', label: 'T', full: 'Tuesday' },
  { key: 'wed', label: 'W', full: 'Wednesday' },
  { key: 'thu', label: 'T', full: 'Thursday' },
  { key: 'fri', label: 'F', full: 'Friday' },
  { key: 'sat', label: 'S', full: 'Saturday' },
  { key: 'sun', label: 'S', full: 'Sunday' },
]

/**
 * Section 2 — Delivery Cadence.
 * Weekday multi-select chips plus a numeric stepper for meal choices per day.
 */
export default function DeliveryCalendar({
  activeDays,
  onToggleDay,
  mealsPerDay,
  onIncrement,
  onDecrement,
  error,
}) {
  return (
    <section>
      <SectionHeading number={2} title="Delivery Cadence" />

      <div className="mb-2 text-[13px] font-medium text-slate-500">Active Delivery Days</div>
      <div className="mb-2 flex gap-2" role="group" aria-label="Active delivery days">
        {DAYS.map((day) => {
          const active = activeDays.includes(day.key)
          return (
            <motion.button
              key={day.key}
              type="button"
              onClick={() => onToggleDay(day.key)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.12 }}
              aria-pressed={active}
              aria-label={day.full}
              title={day.full}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[12.5px] font-semibold transition-colors
                ${
                  active
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
            >
              {day.label}
            </motion.button>
          )
        })}
      </div>
      {error && <span className="mb-2 block text-[12px] font-medium text-red-500">{error}</span>}

      <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-blueLight px-4 py-3.5">
        <div>
          <p className="text-[13.5px] font-semibold text-slate-800">Meal Choices Per Day</p>
          <p className="mt-0.5 text-[12px] text-slate-500">
            How many options subscribers can choose from
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            onClick={onDecrement}
            whileTap={{ scale: 0.9 }}
            aria-label="Decrease meal choices per day"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
          >
            <Minus size={14} />
          </motion.button>
          <motion.span
            key={mealsPerDay}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="w-4 text-center text-[15px] font-bold text-slate-800"
          >
            {mealsPerDay}
          </motion.span>
          <motion.button
            type="button"
            onClick={onIncrement}
            whileTap={{ scale: 0.9 }}
            aria-label="Increase meal choices per day"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue text-white shadow-sm transition-colors hover:bg-brand-blueDark"
          >
            <Plus size={14} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
