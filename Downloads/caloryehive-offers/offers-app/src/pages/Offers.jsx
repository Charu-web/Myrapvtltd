import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import FilterTabs from '../components/FilterTabs'
import CampaignCard from '../components/CampaignCard'
import OfferCardSkeleton from '../components/OfferCardSkeleton'
import DiscountForm from '../components/DiscountForm'
import { EmptyState, ErrorState } from '../components/StatusStates'
import Pagination from '../components/Pagination'
import { useOffers } from '../hooks/useOffers'
import { joinPromotion } from '../services/api'
import { useUI } from '../context/UIContext'

function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

export default function Offers() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Campaigns')
  const [joiningId, setJoiningId] = useState(null)
  const { pushToast } = useUI()

  const debouncedSearch = useDebouncedValue(search, 350)
  const { offers, status, error, reload, page, setPage, totalPages } = useOffers({
    search: debouncedSearch,
    category,
  })

  const handleJoin = useCallback(
    async (offer) => {
      setJoiningId(offer.id)
      try {
        await joinPromotion(offer.id)
        pushToast({
          type: 'success',
          title: `You're in: ${offer.title}`,
          message: 'This promotion is now active on your storefront.',
        })
      } catch {
        pushToast({ type: 'error', title: 'Could not join', message: 'Please try again.' })
      } finally {
        setJoiningId(null)
      }
    },
    [pushToast],
  )

  const resetFilters = () => {
    setSearch('')
    setCategory('All Campaigns')
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Header search={search} onSearchChange={setSearch} />

      <main className="flex-1 px-5 py-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-[28px] font-extrabold tracking-tight text-ink-900 sm:text-[32px]">
            Active Offers
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-ink-700/60">
            Boost your visibility and sales by participating in platform-wide promotions.
            Select campaigns that align with your growth goals.
          </p>
        </motion.div>

        <div className="mt-5">
          <FilterTabs active={category} onChange={setCategory} />
        </div>

        <section
          aria-label="Offer campaigns"
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {status === 'loading' &&
            Array.from({ length: 3 }).map((_, i) => (
              <OfferCardSkeleton key={i} featured={i === 0} />
            ))}

          {status === 'error' && <ErrorState message={error} onRetry={reload} />}

          {status === 'empty' && <EmptyState onReset={resetFilters} />}

          {status === 'success' &&
            offers.map((offer, i) => (
              <CampaignCard
                key={offer.id}
                offer={offer}
                featured={i === 0 && page === 1}
                onJoin={handleJoin}
                joining={joiningId === offer.id}
              />
            ))}

          {status === 'success' && page === 1 && (
            <div className="sm:col-span-2">
              <DiscountForm />
            </div>
          )}

          {status === 'success' && (
            <div className="col-span-full">
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
          )}
        </section>

        {status === 'success' && page !== 1 && (
          <div className="mt-8 max-w-md">
            <DiscountForm />
          </div>
        )}
      </main>
    </div>
  )
}
