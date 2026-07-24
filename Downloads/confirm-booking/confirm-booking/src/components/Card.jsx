import { motion } from 'framer-motion'

export default function Card({ title, icon: Icon, children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2 }}
      className={`rounded-xl border border-gray-100 bg-brand-panel/60 p-4 shadow-sm ${className}`}
    >
      {title && (
        <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-brand-blueDark">
          {Icon && <Icon size={15} />}
          <span>{title}</span>
        </div>
      )}
      {children}
    </motion.div>
  )
}
