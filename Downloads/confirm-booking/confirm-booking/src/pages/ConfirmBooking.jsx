import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import BookingSummary from '../components/BookingSummary'
import LogisticsCard from '../components/LogisticsCard'
import MenuSelectionCard from '../components/MenuSelectionCard'
import FinancialSummary from '../components/FinancialSummary'
import BookingActions from '../components/BookingActions'
import Footer from '../components/Footer'
import { useBooking } from '../context/BookingContext'
import { confirmBooking } from '../services/api'

function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  )
}

export default function ConfirmBooking() {
  const { booking, isLoading, error, totals, toggleOption } = useBooking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleConfirm = async () => {
    if (!booking) return
    setIsSubmitting(true)
    try {
      await confirmBooking({ ...booking, ...totals })
      toast.success('Booking confirmed! A confirmation email is on its way.')
    } catch {
      toast.error('Could not confirm the booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = () => {
    toast('Returning to booking details...', { icon: '↩️' })
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header search={search} onSearchChange={setSearch} />

        <main className="flex-1 px-4 py-2 md:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-xl2 bg-white shadow-modal"
            >
              {/* Blue header */}
              <div className="flex items-start justify-between bg-gradient-to-r from-brand-blue to-brand-blueDark px-6 py-5 text-white">
                <div>
                  <h1 className="text-lg font-semibold">Confirm Booking</h1>
                  <p className="mt-1 text-xs text-white/85">
                    Review all details before finalizing.
                  </p>
                </div>
                <button
                  onClick={() => navigate(-1)}
                  aria-label="Close"
                  className="focus-ring rounded-full p-1.5 hover:bg-white/15"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 py-5">
                {isLoading && <CardSkeleton />}

                {!isLoading && error && (
                  <div className="flex flex-col items-center gap-2 py-12 text-center text-gray-400">
                    <AlertTriangle size={28} className="text-amber-500" />
                    <p className="text-sm font-medium text-gray-600">{error}</p>
                    <p className="text-xs">Please refresh the page to try again.</p>
                  </div>
                )}

                {!isLoading && !error && !booking && (
                  <div className="py-12 text-center text-sm text-gray-400">
                    No booking found for this reference.
                  </div>
                )}

                {!isLoading && !error && booking && totals && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <BookingSummary booking={booking} />
                    <LogisticsCard booking={booking} />
                    <MenuSelectionCard booking={booking} onToggleOption={toggleOption} />
                    <FinancialSummary totals={totals} />
                  </div>
                )}
              </div>

              {!isLoading && !error && booking && (
                <BookingActions onEdit={handleEdit} onConfirm={handleConfirm} isSubmitting={isSubmitting} />
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
