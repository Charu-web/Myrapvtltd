import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../utils/cn'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  return (
    <nav className="col-span-full mt-2 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-700/60 transition-colors hover:bg-white disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
            n === page ? 'bg-ink-900 text-white' : 'text-ink-700/60 hover:bg-white',
          )}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-700/60 transition-colors hover:bg-white disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
