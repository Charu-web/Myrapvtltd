import { Star, Calendar as CalendarIcon, Clock } from 'lucide-react'
import Card from './Card'

export default function BookingSummary({ booking }) {
  return (
    <Card title="Event Summary" icon={Star}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Event Name
            </p>
            <p className="truncate text-sm font-semibold text-gray-800">{booking.eventName}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Event Type
            </p>
            <p className="text-sm text-gray-600">{booking.eventType}</p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Date
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-600">
                <CalendarIcon size={12} /> {booking.date}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Time
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-600">
                <Clock size={12} /> {booking.time}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-400">
          {booking.image ? (
            <img src={booking.image} alt={booking.eventName} className="h-full w-full rounded-lg object-cover" />
          ) : (
            <CalendarIcon size={22} />
          )}
        </div>
      </div>
    </Card>
  )
}
