import { motion } from 'framer-motion'
import { Check, ChefHat, Truck, ClipboardCheck, MapPin } from 'lucide-react'

const iconMap = { ChefHat, Truck, ClipboardCheck, MapPin }

function StepCard({ step, align }) {
  const isCompleted = step.status === 'completed'
  return (
    <div
      className={`rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      <div className={`flex items-center gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
          Step {step.id}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
            isCompleted ? 'bg-blue-50 text-brand-blueDark' : 'bg-gray-100 text-gray-400'
          }`}
        >
          {step.status}
        </span>
      </div>
      <p className="mt-1 text-sm font-semibold text-gray-800">{step.title}</p>
      <p className="mt-0.5 text-xs text-gray-500">{step.description}</p>
    </div>
  )
}

export default function TimelineStep({ step, index, isLast }) {
  const Icon = iconMap[step.icon] || ClipboardCheck
  const isCompleted = step.status === 'completed'
  const alignRight = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4"
    >
      {!isLast && (
        <span
          className="absolute left-1/2 top-9 h-[calc(100%+1rem)] w-px -translate-x-1/2 bg-gray-200"
          aria-hidden="true"
        />
      )}

      <div>{alignRight && <StepCard step={step} align="right" />}</div>

      <div
        className={`relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 ${
          isCompleted
            ? 'border-brand-blue bg-brand-blue text-white'
            : 'border-gray-300 bg-white text-gray-400'
        }`}
      >
        {isCompleted ? <Check size={16} strokeWidth={3} /> : <Icon size={15} />}
      </div>

      <div>{!alignRight && <StepCard step={step} align="left" />}</div>
    </motion.div>
  )
}
