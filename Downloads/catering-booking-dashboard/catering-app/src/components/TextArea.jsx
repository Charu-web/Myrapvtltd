import React from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable multi-line textarea with label and validation error display.
 */
const TextArea = React.forwardRef(
  ({ label, error, rows = 3, className = '', ...rest }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="mb-1.5 block text-[13px] font-medium text-slate-500">
            {label}
          </span>
        )}
        <motion.textarea
          ref={ref}
          rows={rows}
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.15 }}
          className={`w-full resize-none rounded-lg border bg-slate-100/80 px-3.5 py-2.5 text-[14px] text-slate-700
            placeholder:text-slate-400 outline-none transition-colors
            focus:border-brand-blue focus:bg-white
            ${error ? 'border-red-400 bg-red-50/60' : 'border-transparent'}
            ${className}`}
          aria-invalid={!!error}
          {...rest}
        />
        {error && (
          <span className="mt-1 block text-[12px] font-medium text-red-500">
            {error}
          </span>
        )}
      </label>
    )
  }
)

TextArea.displayName = 'TextArea'
export default TextArea
