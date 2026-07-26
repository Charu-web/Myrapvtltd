import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiEye, FiBarChart2, FiX, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { formatPrice, discountInfo } from '../utils/format';

const FALLBACK_IMG = 'https://placehold.co/500x500/f8f9fa/2e7d32?text=Fruits+%26+Nuts';

const toggleCompare = (id) => {
  const list = JSON.parse(localStorage.getItem('compareList') || '[]');
  const exists = list.includes(id);
  const next = exists ? list.filter((x) => x !== id) : [...list, id].slice(-4);
  localStorage.setItem('compareList', JSON.stringify(next));
  toast.success(exists ? 'Removed from compare' : 'Added to compare (up to 4 items)');
};

const ProductCard = ({ product, wishlistIds = [], onWishlistChange, layout = 'grid' }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [wished, setWished] = useState(wishlistIds.includes(product._id));
  const [quickView, setQuickView] = useState(false);
  const [adding, setAdding] = useState(false);

  const { hasDiscount, displayPrice, pct } = discountInfo(product);
  const outOfStock = product.stock === 0;
  const image = product.images?.[0]?.url || FALLBACK_IMG;

  const toggleWishlist = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to use your wishlist');
      return;
    }
    try {
      const { data } = await client.post(`/users/wishlist/${product._id}`);
      setWished(data.added);
      onWishlistChange?.();
      toast.success(data.added ? 'Added to wishlist' : 'Removed from wishlist');
    } catch {
      toast.error('Could not update wishlist');
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setAdding(true);
    await addToCart(product._id, 1);
    setAdding(false);
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to continue');
      return;
    }
    await addToCart(product._id, 1);
    navigate('/checkout');
  };

  const quickViewModal = (
    <AnimatePresence>
      {quickView && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickView(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-0 bg-white dark:bg-[#141a15] rounded-3xl overflow-hidden shadow-glass-lg"
          >
            <button
              onClick={() => setQuickView(false)}
              aria-label="Close quick view"
              className="btn-icon absolute top-3 right-3 h-8 w-8 bg-white/90 text-gray-600 z-10"
            >
              <FiX size={16} />
            </button>
            <div className="aspect-square sm:aspect-auto bg-gray-100 dark:bg-white/5">
              <img src={image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-6 flex flex-col">
              <p className="text-xs uppercase tracking-wide text-gray-400">{product.brand}</p>
              <h3 className="font-display text-xl font-bold mt-1 dark:text-white">{product.name}</h3>
              <div className="flex items-center gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <FiStar className="text-accent-400 fill-current" size={14} />
                <span>{product.rating?.toFixed?.(1) || '0.0'}</span>
                <span>({product.numReviews || 0} reviews)</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-4">
                {product.shortDescription || product.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl font-bold dark:text-white">{formatPrice(displayPrice)}</span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>
                )}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={handleAddToCart} disabled={outOfStock} className="btn-ghost">
                  <FiShoppingCart size={15} /> Add to Cart
                </button>
                <button onClick={handleBuyNow} disabled={outOfStock} className="btn-primary">
                  <FiZap size={15} /> Buy Now
                </button>
              </div>
              <Link
                to={`/products/${product.slug}`}
                className="text-center text-sm font-medium text-primary-600 mt-4 hover:underline"
              >
                View full details →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (layout === 'list') {
    return (
      <>
        <Link
          to={`/products/${product.slug}`}
          className="card card-hover group relative flex gap-4 sm:gap-6 p-3 sm:p-4 overflow-hidden"
        >
          <div className="relative shrink-0 w-28 h-28 sm:w-40 sm:h-40 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5">
            <img
              src={image}
              alt={product.images?.[0]?.alt || product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
            />
            {hasDiscount && <span className="badge absolute top-2 left-2 bg-accent-400 text-ink">-{pct}%</span>}
            {outOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                <span className="badge bg-white text-ink text-[9px]">Out of Stock</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <p className="text-[11px] uppercase tracking-wide text-gray-400">{product.brand}</p>
            <h3 className="font-semibold text-ink dark:text-gray-100 mt-1 leading-snug line-clamp-2">{product.name}</h3>
            <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">
              {product.shortDescription}
            </p>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
              <FiStar className="text-accent-400 fill-current" size={13} />
              <span className="font-medium">{product.rating?.toFixed?.(1) || '0.0'}</span>
              <span>({product.numReviews || 0})</span>
            </div>
            <div className="mt-auto pt-2 flex items-center justify-between gap-3">
              <div>
                <span className="font-bold text-ink dark:text-white">{formatPrice(displayPrice)}</span>
                {hasDiscount && <span className="ml-2 text-xs text-gray-400 line-through">{formatPrice(product.price)}</span>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleWishlist}
                  aria-label="Toggle wishlist"
                  className={`btn-icon h-9 w-9 border ${wished ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-500 hover:text-primary-600'}`}
                >
                  <FiHeart className={wished ? 'fill-current' : ''} size={15} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setQuickView(true);
                  }}
                  aria-label="Quick view"
                  className="btn-icon h-9 w-9 border border-gray-200 text-gray-500 hover:text-primary-600 hidden sm:inline-flex"
                >
                  <FiEye size={15} />
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={outOfStock || adding}
                  aria-label="Add to cart"
                  className="btn-icon h-9 w-9 bg-ink text-white hover:bg-primary-600 disabled:opacity-40"
                >
                  <FiShoppingCart size={15} className={adding ? 'animate-pulse' : ''} />
                </button>
              </div>
            </div>
          </div>
        </Link>
        {quickViewModal}
      </>
    );
  }

  return (
    <>
      <Link
        to={`/products/${product.slug}`}
        className="card card-hover group relative flex flex-col overflow-hidden"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-white/5">
          <img
            src={image}
            alt={product.images?.[0]?.alt || product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {hasDiscount && (
              <span className="badge bg-accent-400 text-ink shadow-card">-{pct}%</span>
            )}
            {product.isFeatured && (
              <span className="badge bg-primary-600 text-white shadow-card">Bestseller</span>
            )}
          </div>

          <button
            onClick={toggleWishlist}
            aria-label="Toggle wishlist"
            className={`btn-icon absolute top-3 right-3 h-9 w-9 shadow-card ${
              wished ? 'bg-primary-600 text-white' : 'bg-white/90 text-gray-500 hover:text-primary-600'
            }`}
          >
            <FiHeart className={wished ? 'fill-current' : ''} size={16} />
          </button>

          {/* Hover action rail: quick view + compare */}
          <div className="absolute right-3 top-14 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-premium">
            <button
              onClick={(e) => {
                e.preventDefault();
                setQuickView(true);
              }}
              aria-label="Quick view"
              className="btn-icon h-9 w-9 bg-white/90 text-gray-600 hover:text-primary-600 shadow-card"
            >
              <FiEye size={16} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCompare(product._id);
              }}
              aria-label="Add to compare"
              className="btn-icon h-9 w-9 bg-white/90 text-gray-600 hover:text-primary-600 shadow-card"
            >
              <FiBarChart2 size={16} />
            </button>
          </div>

          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
              <span className="badge bg-white text-ink">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <p className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">{product.brand}</p>
          <h3 className="font-semibold text-ink dark:text-gray-100 line-clamp-2 mt-1 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            <FiStar className="text-accent-400 fill-current" size={13} />
            <span className="font-medium">{product.rating?.toFixed?.(1) || '0.0'}</span>
            <span>({product.numReviews || 0})</span>
            {!outOfStock && product.stock <= (product.lowStockThreshold || 5) && (
              <span className="ml-auto text-accent-600 font-medium">Only {product.stock} left</span>
            )}
          </div>
          <div className="mt-auto pt-3 flex items-center justify-between gap-2">
            <div>
              <span className="font-bold text-ink dark:text-white">{formatPrice(displayPrice)}</span>
              {hasDiscount && (
                <span className="ml-2 text-xs text-gray-400 line-through">{formatPrice(product.price)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={outOfStock || adding}
              aria-label="Add to cart"
              className="btn-icon h-10 w-10 bg-ink text-white hover:bg-primary-600 disabled:opacity-40"
            >
              <FiShoppingCart size={16} className={adding ? 'animate-pulse' : ''} />
            </button>
          </div>
        </div>
      </Link>

      {quickViewModal}
    </>
  );
};

export default ProductCard;
