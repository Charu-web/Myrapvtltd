import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getBooking } from '../services/api'

const BookingContext = createContext(null)

const SERVICE_FEE_RATE = 0.1
const TAX_RATE = 0.08
const DEPOSIT_RATE = 0.3

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    getBooking('bk_2451')
      .then(({ data }) => mounted && setBooking(data))
      .catch(() => mounted && setError('Could not load booking details.'))
      .finally(() => mounted && setIsLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const toggleOption = useCallback((id) => {
    setBooking((prev) => ({
      ...prev,
      customOptions: prev.customOptions.map((opt) =>
        opt.id === id ? { ...opt, selected: !opt.selected } : opt
      ),
    }))
  }, [])

  const totals = useMemo(() => {
    if (!booking) return null
    const subtotal = booking.selectedPackage.pricePerGuest * booking.guestCount
    const customOptionsTotal = booking.customOptions
      .filter((o) => o.selected)
      .reduce((sum, o) => sum + o.price, 0)
    const serviceFee = subtotal * SERVICE_FEE_RATE
    const tax = subtotal * TAX_RATE
    const grandTotal = subtotal + serviceFee + tax + customOptionsTotal
    const deposit = grandTotal * DEPOSIT_RATE
    return { subtotal, customOptionsTotal, serviceFee, tax, grandTotal, deposit }
  }, [booking])

  const value = { booking, isLoading, error, totals, toggleOption }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
