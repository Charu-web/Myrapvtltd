import React from 'react'
import { motion } from 'framer-motion'

const Input = React.forwardRef(
  ({ label, error, type = 'text', className = '', ...rest }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500">
            {label}
          </span>
        )}
        <motion.input
          ref={ref}
          type={type}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[14px] text-slate-700
            placeholder:text-slate-400 outline-none transition-colors
            focus:border-brand-blue
            ${error ? 'border-red-400 bg-red-50/60' : 'border-brand-blue/25'}
            ${className}`}
          aria-invalid={!!error}
          {...rest}
        />
        {error && (
          <span className="mt-1 block text-[12px] font-medium text-red-500">{error}</span>
        )}
      </label>
    )
  }
)

Input.displayName = 'Input'
export default Input
