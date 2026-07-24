import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import MealCard from './MealCard.jsx'
import MealCardSkeleton from './MealCardSkeleton.jsx'

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Vegan', 'Keto']
const MIN_REQUIRED = 1
const MAX_ALLOWED = 8

/**
 * Right-hand "Curate Menu" panel: search, category filter, scrollable meal
 * list, and a live selected-count summary.
 */
export default function MealSelectionPanel({ meals, loading, selectedIds, onToggleMeal, error }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const matchesCategory = category === 'All' || meal.category === category
      const matchesQuery = meal.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [meals, query, category])

  const selectedCount = selectedIds.length

  return (
    <div className="flex h-full flex-col rounded-xl2 bg-brand-blueLight p-4">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue text-[9px] font-bold text-white">
          ✓
        </span>
        <h3 className="text-[13.5px] font-semibold text-slate-800">Curate Menu</h3>
      </div>

      <div className="mb-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2">
        <Search size={14} className="shrink-0 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Meals..."
          aria-label="Search meals"
          className="w-full bg-transparent text-[13px] text-slate-600 placeholder:text-slate-400 outline-none"
        />
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => {
          const active = category === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={active}
              className={`rounded-full px-3 py-1 text-[11.5px] font-medium transition-colors
                ${
                  active
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-white text-slate-500 hover:bg-white/80'
                }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      <div className="meals-scroll flex-1 space-y-2 overflow-y-auto pr-0.5" style={{ maxHeight: 320 }}>
        {loading ? (
          <>
            <MealCardSkeleton />
            <MealCardSkeleton />
            <MealCardSkeleton />
          </>
        ) : filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              selected={selectedIds.includes(meal.id)}
              onToggle={onToggleMeal}
            />
          ))
        ) : (
          <p className="py-6 text-center text-[12.5px] text-slate-400">
            No meals match your search.
          </p>
        )}
      </div>

      <div className="mt-3 border-t border-brand-blue/15 pt-3">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-medium text-slate-500">Selected Items</span>
          <span className={`font-semibold ${error ? 'text-red-500' : 'text-slate-700'}`}>
            {selectedCount} / {MAX_ALLOWED} {selectedCount < MIN_REQUIRED ? 'required' : ''}
          </span>
        </div>
        {error && <p className="mt-1 text-[11.5px] font-medium text-red-500">{error}</p>}
      </div>
    </div>
  )
}
