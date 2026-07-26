import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import client from '../api/client';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeleton';
import SEO from '../components/SEO';
import FilterSidebar from '../components/shop/FilterSidebar';
import MobileFilterDrawer from '../components/shop/MobileFilterDrawer';
import ShopToolbar from '../components/shop/ShopToolbar';
import Pagination from '../components/shop/Pagination';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const brand = searchParams.get('brand') || '';
  const rating = searchParams.get('rating') || '';
  const inStock = searchParams.get('inStock') === 'true';
  const page = Number(searchParams.get('page')) || 1;

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.set('page', '1');
    setSearchParams(next);
  };

  const updatePrice = (key, value) => updateParam(key, value);

  const clearAll = () => setSearchParams({});

  const activeFilters = useMemo(() => {
    const chips = [];
    if (category) chips.push({ key: 'category', label: categories.find((c) => c._id === category)?.name || 'Category' });
    if (brand) chips.push({ key: 'brand', label: brand });
    if (rating) chips.push({ key: 'rating', label: `${rating}★ & up` });
    if (minPrice || maxPrice) chips.push({ key: 'price', label: `₹${minPrice || 0} – ₹${maxPrice || '∞'}` });
    if (inStock) chips.push({ key: 'inStock', label: 'In Stock' });
    return chips;
  }, [category, brand, rating, minPrice, maxPrice, inStock, categories]);

  const removeChip = (key) => {
    if (key === 'price') {
      updateParam('minPrice', '');
      updateParam('maxPrice', '');
    } else if (key === 'inStock') {
      updateParam('inStock', '');
    } else {
      updateParam(key, '');
    }
  };

  const fetchCategories = useCallback(async () => {
    const { data } = await client.get('/categories');
    setCategories(data.categories || []);
  }, []);

  // One-time, lightweight fetch to build the brand filter list. The backend
  // has no dedicated /brands endpoint, so we derive distinct brands from a
  // wider (unfiltered) product pool rather than adding a new backend route.
  const fetchBrands = useCallback(async () => {
    try {
      const { data } = await client.get('/products', { params: { limit: 100 } });
      const unique = [...new Set((data.products || []).map((p) => p.brand).filter(Boolean))];
      setBrands(unique);
    } catch {
      // brand filter simply won't render
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { keyword, category, sort, minPrice, maxPrice, brand, rating, page, limit: 12 };
      if (inStock) params.inStock = 'true';
      if (searchParams.get('featured')) params.featured = 'true';
      const { data } = await client.get('/products', { params });
      setProducts(data.products || []);
      setPagination({ page: data.page, pages: data.pages, total: data.total });
    } finally {
      setLoading(false);
    }
  }, [keyword, category, sort, minPrice, maxPrice, brand, rating, inStock, page, searchParams]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, [fetchCategories, fetchBrands]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filterProps = {
    categories,
    category,
    onCategoryChange: (v) => updateParam('category', v),
    minPrice,
    maxPrice,
    onPriceChange: updatePrice,
    brands,
    brand,
    onBrandChange: (v) => updateParam('brand', v),
    rating,
    onRatingChange: (v) => updateParam('rating', v),
    inStock,
    onInStockChange: (v) => updateParam('inStock', v ? 'true' : ''),
    onClearAll: clearAll,
  };

  return (
    <div className="bg-surface dark:bg-transparent">
      <SEO title="Shop All Products" description="Browse our full catalog of premium roasted nuts, dried fruits, and chocolates." />

      {/* Page header */}
      <div className="bg-primary-900 text-white bg-orchard-mesh">
        <div className="container-x py-12">
          <span className="eyebrow bg-white/10 px-3 py-1.5 rounded-full text-secondary-200">Full Catalog</span>
          <h1 className="heading-xl text-3xl md:text-4xl text-white mt-4">Shop All Products</h1>
          <p className="text-primary-200 mt-2 max-w-lg">
            Small-batch roasted nuts, naturally sweet dried fruits, and honest chocolates.
          </p>
        </div>
      </div>

      <div className="container-x py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="card p-5 sticky top-24">
              <FilterSidebar {...filterProps} />
            </div>
          </aside>

          <MobileFilterDrawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} {...filterProps} />

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <ShopToolbar
              total={pagination.total}
              keyword={keyword}
              onSearch={(e) => {
                e.preventDefault();
                updateParam('keyword', new FormData(e.target).get('q'));
              }}
              sort={sort}
              onSortChange={(v) => updateParam('sort', v)}
              view={view}
              onViewChange={setView}
              onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            />

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.map((chip) => (
                  <button
                    key={chip.key}
                    onClick={() => removeChip(chip.key)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-500/20 dark:text-secondary-200 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
                  >
                    {chip.label} <FiX size={12} />
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <ProductGridSkeleton count={12} />
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400">No products match your filters.</p>
                <button onClick={clearAll} className="btn-ghost mt-4">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    view === 'grid'
                      ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6'
                      : 'flex flex-col gap-4'
                  }
                >
                  {products.map((p, i) => (
                    <motion.div
                      key={p._id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (i % 12) * 0.03 }}
                    >
                      <ProductCard product={p} layout={view} />
                    </motion.div>
                  ))}
                </div>

                <Pagination page={pagination.page} pages={pagination.pages} onPageChange={(p) => updateParam('page', String(p))} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
