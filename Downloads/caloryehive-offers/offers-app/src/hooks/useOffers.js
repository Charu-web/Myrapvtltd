import { useEffect, useState, useCallback, useMemo } from 'react'
import { fetchOffers } from '../services/api'

const PAGE_SIZE = 6

export function useOffers({ search, category }) {
  const [allOffers, setAllOffers] = useState([])
  const [status, setStatus] = useState('loading') // loading | success | error | empty
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const data = await fetchOffers({ search, category })
      setAllOffers(data)
      setPage(1)
      setStatus(data.length === 0 ? 'empty' : 'success')
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setStatus('error')
    }
  }, [search, category])

  useEffect(() => {
    load()
  }, [load])

  const totalPages = Math.max(1, Math.ceil(allOffers.length / PAGE_SIZE))
  const paginated = useMemo(
    () => allOffers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [allOffers, page],
  )

  return {
    offers: paginated,
    allCount: allOffers.length,
    status,
    error,
    reload: load,
    page,
    setPage,
    totalPages,
  }
}
