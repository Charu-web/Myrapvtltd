import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { label, icon: Icon, error, className = '', ...props },
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
        <input
          ref={ref}
          className={`focus-ring w-full rounded-lg border bg-white py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors ${
            Icon ? 'pl-9 pr-3' : 'px-3'
          } ${error ? 'border-red-400' : 'border-gray-200 focus-visible:border-brand-blue'} ${className}`}
          {...props}
        />
      </span>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  )
})

export default Input
