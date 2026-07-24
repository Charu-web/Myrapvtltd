import { mockBooking } from '../data/mockBooking'

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

/** GET /api/booking/:id */
export async function getBooking(id) {
  await delay(700)
  if (!id) throw new Error('Booking id is required')
  return { data: { ...mockBooking, id } }
}

/** POST /api/bookings */
export async function confirmBooking(payload) {
  await delay(1100)
  return {
    data: {
      ...payload,
      status: 'Confirmed',
      confirmedAt: new Date().toISOString(),
    },
  }
}
