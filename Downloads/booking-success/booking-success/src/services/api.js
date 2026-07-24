import { mockBookingSuccess, mockTimeline } from '../data/mockBookingSuccess'

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

/** GET /api/booking-success/:id */
export async function getBookingSuccess(id) {
  await delay(700)
  if (!id) throw new Error('Booking id is required')
  return { data: { ...mockBookingSuccess, id } }
}

/** GET /api/timeline/:bookingId */
export async function getTimeline(bookingId) {
  await delay(850)
  if (!bookingId) throw new Error('Booking id is required')
  return { data: mockTimeline }
}
