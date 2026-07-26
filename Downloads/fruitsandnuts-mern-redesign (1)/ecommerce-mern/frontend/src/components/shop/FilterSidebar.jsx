import { useState } from 'react';
import { FiStar, FiChevronDown } from 'react-icons/fi';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/5 dark:border-white/10 pb-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between font-semibold text-sm text-ink dark:text-white mb-3"
      >
        {title}
        <FiChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && children}
    </div>
  );
};

const FilterSidebar = ({
  categories,
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  brands,
  brand,
  onBrandChange,
  rating,
  onRatingChange,
  inStock,
  onInStockChange,
  onClearAll,
}) => (
  <div className="space-y-5">
    <div className="flex items-center justify-between">
      <h3 className="font-display text-lg font-bold dark:text-white">Filters</h3>
      <button onClick={onClearAll} className="text-xs font-medium text-primary-600 hover:underline">
        Clear all
      </button>
    </div>

    <FilterSection title="Category">
      <div className="space-y-1 text-sm">
        <button
          onClick={() => onCategoryChange('')}
          className={`block w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
            !category ? 'bg-primary-50 text-primary-700 font-medium dark:bg-primary-500/20 dark:text-secondary-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
          }`}
        >
          All Categories
        </button>
        {categories.map((c) => (
          <button
            key={c._id}
            onClick={() => onCategoryChange(c._id)}
            className={`block w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
              category === c._id ? 'bg-primary-50 text-primary-700 font-medium dark:bg-primary-500/20 dark:text-secondary-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </FilterSection>

    <FilterSection title="Price Range">
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          defaultValue={minPrice}
          onBlur={(e) => onPriceChange('minPrice', e.target.value)}
          className="input text-sm"
        />
        <span className="text-gray-300">–</span>
        <input
          type="number"
          placeholder="Max"
          defaultValue={maxPrice}
          onBlur={(e) => onPriceChange('maxPrice', e.target.value)}
          className="input text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {[
          ['Under ₹500', 0, 500],
          ['₹500–1000', 500, 1000],
          ['₹1000+', 1000, ''],
        ].map(([label, lo, hi]) => (
          <button
            key={label}
            onClick={() => {
              onPriceChange('minPrice', String(lo));
              onPriceChange('maxPrice', String(hi));
            }}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-primary-400 hover:text-primary-600 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </FilterSection>

    {brands.length > 0 && (
      <FilterSection title="Brand">
        <div className="space-y-1 text-sm max-h-40 overflow-y-auto pr-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 px-1 py-1 cursor-pointer text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={brand === b}
                onChange={() => onBrandChange(brand === b ? '' : b)}
                className="rounded accent-primary-600"
              />
              {b}
            </label>
          ))}
        </div>
      </FilterSection>
    )}

    <FilterSection title="Rating">
      <div className="space-y-1">
        {[4, 3, 2, 1].map((r) => (
          <button
            key={r}
            onClick={() => onRatingChange(rating === String(r) ? '' : String(r))}
            className={`flex items-center gap-1.5 w-full px-2 py-1.5 rounded-lg text-sm transition-colors ${
              rating === String(r) ? 'bg-primary-50 dark:bg-primary-500/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} size={13} className={i < r ? 'text-accent-400 fill-current' : 'text-gray-300'} />
            ))}
            <span className="text-gray-500 dark:text-gray-400 text-xs">&amp; up</span>
          </button>
        ))}
      </div>
    </FilterSection>

    <FilterSection title="Availability" defaultOpen={false}>
      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => onInStockChange(e.target.checked)}
          className="rounded accent-primary-600"
        />
        In Stock Only
      </label>
    </FilterSection>
  </div>
);

export default FilterSidebar;
