import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import BookingConfirmationCard from '../components/BookingConfirmationCard'
import BookingSummary from '../components/BookingSummary'
import ProgressTimeline from '../components/ProgressTimeline'
import ActionButtons from '../components/ActionButtons'
import Footer from '../components/Footer'
import { useBookingSuccess } from '../context/BookingSuccessContext'

function CardSkeleton() {
  return (
    <div className="space-y-4 px-6 pb-6">
      <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-gray-100" />
      <div className="mx-auto h-4 w-40 animate-pulse rounded bg-gray-100" />
      <div className="h-16 animate-pulse rounded-xl bg-gray-100" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    </div>
  )
}

export default function BookingSuccess() {
  const { booking, timeline, isLoading, error } = useBookingSuccess()
  const [search, setSearch] = useState('')

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header search={search} onSearchChange={setSearch} />

        <main className="flex-1 px-4 py-2 md:px-8">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-xl2 border-t-4 border-brand-blue bg-white shadow-modal"
            >
              {isLoading && <CardSkeleton />}

              {!isLoading && error && (
                <div className="flex flex-col items-center gap-2 px-6 py-14 text-center text-gray-400">
                  <AlertTriangle size={28} className="text-amber-500" />
                  <p className="text-sm font-medium text-gray-600">{error}</p>
                  <p className="text-xs">Please refresh the page to try again.</p>
                </div>
              )}

              {!isLoading && !error && !booking && (
                <div className="px-6 py-14 text-center text-sm text-gray-400">
                  No confirmation found for this booking.
                </div>
              )}

              {!isLoading && !error && booking && (
                <>
                  <BookingConfirmationCard booking={booking} />
                  <div className="space-y-6 px-6 pb-6">
                    <BookingSummary booking={booking} />
                    <ProgressTimeline timeline={timeline} />
                  </div>
                  <ActionButtons booking={booking} />
                </>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
