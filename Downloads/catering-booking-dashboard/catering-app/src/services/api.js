// Mock API layer.
// In a real application these functions would call axios against a live backend.
// Here they simulate network latency and return realistic mock data so the
// UI can be built and demoed end-to-end without a server.

import axios from 'axios'

// A pre-configured axios instance, ready to point at a real API base URL.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

const MOCK_PACKAGES = [
  {
    id: 1,
    title: 'Corporate Bites',
    description: 'Assorted canapes, light sandwiches, and beverage station.',
    price: 45,
  },
  {
    id: 2,
    title: 'Premium Plated',
    description: '3-course plated meal, premium protein choices, dedicated servers.',
    price: 120,
  },
]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * GET /api/packages
 * Fetches the list of available catering menu packages.
 */
export async function getPackages() {
  await delay(650)
  return { data: MOCK_PACKAGES }
}

/**
 * POST /api/bookings
 * Submits a new booking (either as a confirmed booking or a draft).
 * @param {object} booking - the booking payload
 */
export async function createBooking(booking) {
  await delay(900)

  // Simulate an occasional validation failure from the server for realism.
  if (!booking.eventName || !booking.package) {
    throw new Error('Booking is missing required fields.')
  }

  const saved = {
    id: `BK-${Math.floor(Math.random() * 90000 + 10000)}`,
    ...booking,
    createdAt: new Date().toISOString(),
  }

  return { data: saved }
}
