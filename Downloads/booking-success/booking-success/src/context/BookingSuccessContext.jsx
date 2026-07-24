import { createContext, useContext, useEffect, useState } from 'react'
import { getBookingSuccess, getTimeline } from '../services/api'

const BookingSuccessContext = createContext(null)

const BOOKING_ID = 'CH-B821'

export function BookingSuccessProvider({ children }) {
  const [booking, setBooking] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    Promise.all([getBookingSuccess(BOOKING_ID), getTimeline(BOOKING_ID)])
      .then(([bookingRes, timelineRes]) => {
        if (!mounted) return
        setBooking(bookingRes.data)
        setTimeline(timelineRes.data)
      })
      .catch(() => mounted && setError('Could not load your booking confirmation.'))
      .finally(() => mounted && setIsLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const value = { booking, timeline, isLoading, error }

  return (
    <BookingSuccessContext.Provider value={value}>{children}</BookingSuccessContext.Provider>
  )
}

export function useBookingSuccess() {
  const ctx = useContext(BookingSuccessContext)
  if (!ctx) throw new Error('useBookingSuccess must be used within a BookingSuccessProvider')
  return ctx
}
