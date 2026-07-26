import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  // Keep the pager compact on large catalogs: show first, last, current ±1, and ellipses.
  const items = [];
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || Math.abs(p - page) <= 1) items.push(p);
    else if (items[items.length - 1] !== '…') items.push('…');
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="btn-icon h-9 w-9 border border-gray-200 dark:border-white/10 disabled:opacity-30"
      >
        <FiChevronLeft size={16} />
      </button>
      {items.map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="px-1 text-gray-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
              p === page ? 'bg-primary-600 text-white shadow-card' : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-primary-400'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        aria-label="Next page"
        className="btn-icon h-9 w-9 border border-gray-200 dark:border-white/10 disabled:opacity-30"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
