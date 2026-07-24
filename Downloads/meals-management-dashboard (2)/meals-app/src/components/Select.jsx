import React from 'react'
import { ChevronDown } from 'lucide-react'

const Select = React.forwardRef(
  ({ label, error, options = [], placeholder = 'Select an option', className = '', ...rest }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="mb-1.5 block text-[13px] font-medium text-slate-500">{label}</span>
        )}
        <div className="relative">
          <select
            ref={ref}
            defaultValue=""
            className={`w-full appearance-none rounded-lg border bg-slate-100/80 px-3.5 py-2.5 pr-9 text-[14px]
              text-slate-700 outline-none transition-colors focus:border-brand-blue focus:bg-white
              ${error ? 'border-red-400 bg-red-50/60' : 'border-transparent'}
              ${className}`}
            aria-invalid={!!error}
            {...rest}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
        {error && (
          <span className="mt-1 block text-[12px] font-medium text-red-500">{error}</span>
        )}
      </label>
    )
  }
)

Select.displayName = 'Select'
export default Select
