import { useEffect, useState } from 'react'
import { getPackages } from '../services/api.js'

/**
 * Fetches available catering packages on mount.
 * Returns { packages, loading, error }.
 */
export function usePackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await getPackages()
        if (!cancelled) setPackages(res.data)
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

  return { packages, loading, error }
}
