import { FiSearch, FiGrid, FiList, FiSliders } from 'react-icons/fi';

const ShopToolbar = ({
  total,
  keyword,
  onSearch,
  sort,
  onSortChange,
  view,
  onViewChange,
  onOpenMobileFilters,
}) => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
    <div className="flex items-center gap-3">
      <button
        onClick={onOpenMobileFilters}
        className="btn-ghost lg:hidden shrink-0"
        aria-label="Open filters"
      >
        <FiSliders size={15} /> Filters
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold text-ink dark:text-white">{total}</span> product{total !== 1 ? 's' : ''} found
        {keyword && (
          <>
            {' '}for "<span className="font-medium text-ink dark:text-white">{keyword}</span>"
          </>
        )}
      </p>
    </div>

    <div className="flex items-center gap-3">
      <form onSubmit={onSearch} className="relative flex-1 sm:w-56">
        <input
          name="q"
          defaultValue={keyword}
          type="text"
          placeholder="Search products..."
          className="input text-sm pr-9"
        />
        <button type="submit" aria-label="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch size={15} />
        </button>
      </form>

      <select value={sort} onChange={(e) => onSortChange(e.target.value)} className="input w-auto text-sm">
        <option value="">Sort: Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
        <option value="name">Name: A-Z</option>
      </select>

      <div className="hidden sm:flex items-center rounded-full border border-gray-200 dark:border-white/10 p-1">
        <button
          onClick={() => onViewChange('grid')}
          aria-label="Grid view"
          aria-pressed={view === 'grid'}
          className={`btn-icon h-8 w-8 ${view === 'grid' ? 'bg-ink text-white' : 'text-gray-400'}`}
        >
          <FiGrid size={14} />
        </button>
        <button
          onClick={() => onViewChange('list')}
          aria-label="List view"
          aria-pressed={view === 'list'}
          className={`btn-icon h-8 w-8 ${view === 'list' ? 'bg-ink text-white' : 'text-gray-400'}`}
        >
          <FiList size={14} />
        </button>
      </div>
    </div>
  </div>
);

export default ShopToolbar;
