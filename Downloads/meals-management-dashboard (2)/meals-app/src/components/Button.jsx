import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800',
  secondary: 'bg-white/80 text-slate-700 hover:bg-white',
  ghost: 'bg-transparent text-slate-600 hover:bg-black/5',
  outline: 'border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white',
}

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
  ...rest
}) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      transition={{ duration: 0.12 }}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13.5px] font-semibold
        transition-colors disabled:cursor-not-allowed disabled:opacity-60
        ${fullWidth ? 'w-full' : ''}
        ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </motion.button>
  )
}
