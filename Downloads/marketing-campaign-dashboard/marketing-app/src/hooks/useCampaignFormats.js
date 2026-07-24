import { useEffect, useState } from 'react'
import { getCampaignFormats } from '../services/api.js'

/**
 * Fetches available campaign formats on mount.
 * Returns { formats, loading, error }.
 */
export function useCampaignFormats() {
  const [formats, setFormats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await getCampaignFormats()
        if (!cancelled) setFormats(res.data)
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

  return { formats, loading, error }
}
