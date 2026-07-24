import { motion } from 'framer-motion'
import TimelineStep from './TimelineStep'

export default function ProgressTimeline({ timeline }) {
  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 text-sm font-semibold text-gray-800"
      >
        What happens next?
      </motion.h2>

      <div className="space-y-6">
        {timeline.map((step, i) => (
          <TimelineStep key={step.id} step={step} index={i} isLast={i === timeline.length - 1} />
        ))}
      </div>
    </section>
  )
}
