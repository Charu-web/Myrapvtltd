export const MIN_MEALS_REQUIRED = 1
export const MAX_MEALS_ALLOWED = 8

/**
 * Returns a validation error message if the selected meal count is invalid,
 * or null when the selection is valid.
 */
export function validateMealSelection(selectedIds) {
  if (selectedIds.length < MIN_MEALS_REQUIRED) {
    return `Select at least ${MIN_MEALS_REQUIRED} meal to continue.`
  }
  if (selectedIds.length > MAX_MEALS_ALLOWED) {
    return `You can select up to ${MAX_MEALS_ALLOWED} meals.`
  }
  return null
}
