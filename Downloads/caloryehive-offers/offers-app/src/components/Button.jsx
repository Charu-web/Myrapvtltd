import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const VARIANTS = {
  primary: 'bg-ink-900 text-white hover:bg-black shadow-card',
  outline: 'bg-white text-ink-900 border border-gray-200 hover:border-gray-300',
  ghost: 'bg-gray-100 text-ink-800 hover:bg-gray-200',
  brand: 'bg-brand-600 text-white hover:bg-brand-700 shadow-card',
}

const SIZES = {
  sm: 'text-xs px-3 py-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 rounded-xl',
  lg: 'text-sm px-5 py-3.5 rounded-2xl',
}

/**
 * Reusable button with a subtle ripple + press animation.
 * type defaults to "button" so it never accidentally submits a form.
 */
const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', className, type = 'button', disabled, loading, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <>
          <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          <span>Please wait…</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  )
})

export default Button
