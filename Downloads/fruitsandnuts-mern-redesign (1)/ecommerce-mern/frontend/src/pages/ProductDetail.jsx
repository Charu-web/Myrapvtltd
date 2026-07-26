import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiShoppingCart, FiHeart, FiZap, FiShield, FiTruck, FiMinus, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import client from '../api/client';
import Loader from '../components/Loader';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/home/SectionHeading';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfoTabs from '../components/product/ProductInfoTabs';
import ReviewsSection from '../components/product/ReviewsSection';
import FrequentlyBoughtTogether from '../components/product/FrequentlyBoughtTogether';
import RecentlyViewed, { recordView } from '../components/product/RecentlyViewed';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, discountInfo } from '../utils/format';

const ProductDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [addingCart, setAddingCart] = useState(false);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(`/products/${slug}`);
      setProduct(data.product);
      recordView(data.product);
      const relRes = await client.get(`/products/${data.product._id}/related`);
      setRelated(relRes.data.products || []);
    } catch {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    setQty(1);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to leave a review');
      return;
    }
    setSubmittingReview(true);
    try {
      await client.post(`/products/${product._id}/reviews`, reviewForm);
      toast.success('Review submitted!');
      setReviewForm({ rating: 5, comment: '' });
      loadProduct();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const toggleWishlist = async () => {
    if (!user) return toast.error('Please log in to use your wishlist');
    try {
      const { data } = await client.post(`/users/wishlist/${product._id}`);
      setWished(data.added);
      toast.success(data.added ? 'Added to wishlist' : 'Removed from wishlist');
    } catch {
      toast.error('Could not update wishlist');
    }
  };

  const handleAddToCart = async () => {
    setAddingCart(true);
    await addToCart(product._id, qty);
    setAddingCart(false);
  };

  const handleBuyNow = async () => {
    if (!user) return toast.error('Please log in to continue');
    await addToCart(product._id, qty);
    navigate('/checkout');
  };

  if (loading) return <Loader full />;
  if (!product)
    return (
      <div className="container-x py-24 text-center">
        <p className="text-lg font-medium dark:text-white">Product not found.</p>
        <Link to="/products" className="text-primary-600 mt-2 inline-block hover:underline">
          Back to shop
        </Link>
      </div>
    );

  const { hasDiscount, displayPrice, pct } = discountInfo(product);
  const outOfStock = product.stock === 0;

  return (
    <div className="container-x py-8">
      <SEO
        title={product.seoTitle || product.name}
        description={product.seoDescription || product.shortDescription}
        image={product.images?.[0]?.url}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
        <Link to="/" className="hover:text-primary-600">Home</Link> /
        <Link to="/products" className="hover:text-primary-600">Shop</Link> /
        <span className="text-ink dark:text-gray-200 truncate">{product.name}</span>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-10"
      >
        <ProductGallery images={product.images} name={product.name} />

        {/* Details */}
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
            {hasDiscount && <span className="badge bg-accent-400 text-ink">-{pct}% OFF</span>}
            {product.isFeatured && <span className="badge bg-primary-600 text-white">Bestseller</span>}
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mt-1 dark:text-white">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <FiStar className="text-accent-400 fill-current" />
            <span>{product.rating?.toFixed?.(1) || '0.0'}</span>
            <span>({product.numReviews || 0} reviews)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-ink dark:text-white">{formatPrice(displayPrice)}</span>
            {hasDiscount && <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>}
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-300">{product.shortDescription || product.description}</p>

          <p className={`mt-4 text-sm font-medium ${outOfStock ? 'text-red-500' : 'text-primary-600'}`}>
            {outOfStock ? 'Out of stock' : `In stock — ${product.stock} available`}
          </p>

          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 text-gray-500 hover:text-primary-600" aria-label="Decrease quantity">
                <FiMinus size={14} />
              </button>
              <span className="w-8 text-center font-medium dark:text-white">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="p-3 text-gray-500 hover:text-primary-600" aria-label="Increase quantity">
                <FiPlus size={14} />
              </button>
            </div>
            <button disabled={outOfStock || addingCart} onClick={handleAddToCart} className="btn-ghost flex-1 min-w-[140px]">
              <FiShoppingCart size={16} /> {addingCart ? 'Adding…' : 'Add to Cart'}
            </button>
            <button disabled={outOfStock} onClick={handleBuyNow} className="btn-primary flex-1 min-w-[140px]">
              <FiZap size={16} /> Buy Now
            </button>
            <button
              onClick={toggleWishlist}
              aria-label="Toggle wishlist"
              className={`btn-icon h-11 w-11 border ${wished ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 dark:border-white/10 text-gray-500 hover:text-primary-600'}`}
            >
              <FiHeart className={wished ? 'fill-current' : ''} size={18} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2"><FiTruck className="text-primary-600" /> Free shipping over ₹999</div>
            <div className="flex items-center gap-2"><FiShield className="text-primary-600" /> FSSAI Certified</div>
          </div>
        </div>
      </motion.div>

      <ProductInfoTabs product={product} />

      <FrequentlyBoughtTogether product={product} related={related} />

      <ReviewsSection
        product={product}
        reviewForm={reviewForm}
        setReviewForm={setReviewForm}
        onSubmit={submitReview}
        submitting={submittingReview}
      />

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading eyebrow="You May Also Like" title="Related Products" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed excludeId={product._id} />
    </div>
  );
};

export default ProductDetail;
