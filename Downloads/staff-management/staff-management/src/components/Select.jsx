import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(function Select(
  { label, icon: Icon, options = [], placeholder, error, className = '', ...props },
  ref
) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      )}
      <span className="relative flex items-center">
        {Icon && (
          <Icon size={16} className="pointer-events-none absolute left-3 text-gray-400" />
        )}
        <select
          ref={ref}
          defaultValue=""
          className={`focus-ring w-full appearance-none rounded-lg border bg-white py-2.5 pr-9 text-sm text-gray-800 transition-colors ${
            Icon ? 'pl-9' : 'px-3'
          } ${error ? 'border-red-400' : 'border-gray-200 focus-visible:border-brand-blue'} ${className}`}
          {...props}
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
        <ChevronDown size={16} className="pointer-events-none absolute right-3 text-gray-400" />
      </span>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  )
})

export default Select
