import { useEffect, useState } from 'react'
import { getMeals } from '../services/api.js'

/**
 * Fetches the meal catalog on mount.
 * Returns { meals, loading, error }.
 */
export function useMeals() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await getMeals()
        if (!cancelled) setMeals(res.data)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { meals, loading, error }
}
