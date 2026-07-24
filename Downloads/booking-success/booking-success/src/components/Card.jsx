import { motion } from 'framer-motion'

export default function Card({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={`rounded-xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  )
}
