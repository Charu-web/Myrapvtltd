import { Truck, Users, MapPin, Info } from 'lucide-react'
import Card from './Card'

export default function LogisticsCard({ booking }) {
  return (
    <Card title="Logistics" icon={Truck}>
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            Guest Count
          </p>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={14} className="text-gray-400" /> Guests
            </span>
            <span className="text-sm font-semibold text-gray-800">{booking.guestCount}</span>
          </div>
        </div>

        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            Venue Address
          </p>
          <p className="flex items-start gap-1.5 text-sm text-gray-600">
            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gray-400" />
            {booking.venue}
          </p>
        </div>

        <div>
          <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-amber-600">
            <Info size={11} /> Special Instructions
          </p>
          <p className="text-sm text-gray-600">{booking.instructions}</p>
        </div>
      </div>
    </Card>
  )
}
