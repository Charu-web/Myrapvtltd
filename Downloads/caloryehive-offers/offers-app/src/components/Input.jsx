import { forwardRef } from 'react'
import { cn } from '../utils/cn'

const Input = forwardRef(function Input(
  { label, icon: Icon, error, className, containerClassName, ...rest },
  ref,
) {
  return (
    <label className={cn('block', containerClassName)}>
      {label && (
        <span className="mb-1.5 block text-xs font-medium text-ink-700/70">{label}</span>
      )}
      <span className="relative flex items-center">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 h-4 w-4 text-ink-700/40" aria-hidden="true" />
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-xl border bg-white/80 py-2.5 text-sm text-ink-900 placeholder:text-ink-700/40 transition-colors focus:border-brand-500 focus:bg-white',
            Icon ? 'pl-9 pr-3' : 'px-3',
            error ? 'border-red-400' : 'border-gray-200',
            className,
          )}
          aria-invalid={!!error}
          {...rest}
        />
      </span>
      {error && <span className="mt-1 block text-xs font-medium text-red-500">{error}</span>}
    </label>
  )
})

export default Input
