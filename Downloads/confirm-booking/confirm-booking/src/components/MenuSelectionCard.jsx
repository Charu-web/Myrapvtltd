import { UtensilsCrossed, Check } from 'lucide-react'
import Card from './Card'

export default function MenuSelectionCard({ booking, onToggleOption }) {
  return (
    <Card title="Menu Selection" icon={UtensilsCrossed}>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-400">
          {booking.selectedPackage.image ? (
            <img
              src={booking.selectedPackage.image}
              alt={booking.selectedPackage.name}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <UtensilsCrossed size={18} />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            Selected Package
          </p>
          <p className="truncate text-sm font-bold text-gray-800">{booking.selectedPackage.name}</p>
          <p className="truncate text-xs text-gray-500">{booking.selectedPackage.description}</p>
        </div>
      </div>

      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
        Custom Options
      </p>
      <div className="space-y-2">
        {booking.customOptions.map((opt) => (
          <label
            key={opt.id}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition-colors hover:border-brand-blue"
          >
            <span className="flex items-center gap-2.5">
              <span className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={opt.selected}
                  onChange={() => onToggleOption(opt.id)}
                  className="peer sr-only"
                />
                <span className="focus-ring h-4 w-4 rounded border border-gray-300 bg-white peer-checked:border-brand-blue peer-checked:bg-brand-blue" />
                {opt.selected && (
                  <Check size={11} className="absolute text-white" strokeWidth={3} />
                )}
              </span>
              <span className="text-sm text-gray-700">{opt.name}</span>
            </span>
            <span className="text-sm font-semibold text-gray-800">+${opt.price}</span>
          </label>
        ))}
      </div>
    </Card>
  )
}
