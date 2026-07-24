export const DEPOSIT_RATE = 0.3

/**
 * Calculates the estimated total cost for a booking.
 * @param {number} guestCount
 * @param {number} packagePrice - price per guest
 */
export function calculateEstimatedTotal(guestCount, packagePrice) {
  const guests = Number.isFinite(guestCount) ? guestCount : 0
  const price = Number.isFinite(packagePrice) ? packagePrice : 0
  return guests * price
}

/**
 * Calculates the required deposit (30% of the estimated total by default).
 * @param {number} estimatedTotal
 */
export function calculateDeposit(estimatedTotal, rate = DEPOSIT_RATE) {
  return estimatedTotal * rate
}
