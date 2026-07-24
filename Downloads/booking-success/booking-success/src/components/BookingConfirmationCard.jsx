import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function BookingConfirmationCard({ booking }) {
  return (
    <div className="flex flex-col items-center px-6 pb-6 pt-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white shadow-card"
      >
        <Check size={22} strokeWidth={3} />
      </motion.div>
      <h1 className="text-lg font-bold text-gray-900">Booking Confirmed!</h1>
      <p className="mt-1 text-sm text-gray-500">
        Event ID: #{booking.id} has been successfully scheduled.
      </p>
    </div>
  )
}
