import { useState } from 'react';
import { FiPlus, FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { formatPrice, discountInfo } from '../../utils/format';

const FALLBACK = 'https://placehold.co/200x200/f8f9fa/2e7d32?text=Item';

// There's no backend concept of "frequently bought together" bundles, so this
// composes the bundle from the existing /products/:id/related endpoint (same
// category recommendations) rather than fabricating purchase-affinity data.
const FrequentlyBoughtTogether = ({ product, related = [] }) => {
  const { addToCart } = useCart();
  const bundleExtras = related.slice(0, 2);
  const bundle = [product, ...bundleExtras];
  const [checked, setChecked] = useState(() => new Set(bundle.map((p) => p._id)));
  const [adding, setAdding] = useState(false);

  if (bundleExtras.length === 0) return null;

  const toggle = (id) => {
    if (id === product._id) return; // main product always included
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const total = bundle.filter((p) => checked.has(p._id)).reduce((sum, p) => sum + discountInfo(p).displayPrice, 0);

  const addBundle = async () => {
    setAdding(true);
    try {
      for (const p of bundle.filter((item) => checked.has(item._id))) {
        // eslint-disable-next-line no-await-in-loop
        await addToCart(p._id, 1);
      }
      toast.success('Bundle added to cart');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="mt-14 card p-6">
      <h2 className="font-display text-xl font-bold mb-5 dark:text-white">Frequently Bought Together</h2>
      <div className="flex flex-wrap items-center gap-3">
        {bundle.map((p, i) => (
          <div key={p._id} className="flex items-center gap-3">
            {i > 0 && <FiPlus className="text-gray-300 shrink-0" />}
            <label className="flex flex-col items-center gap-2 cursor-pointer">
              <div className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 ${checked.has(p._id) ? 'border-primary-500' : 'border-transparent opacity-60'}`}>
                <img src={p.images?.[0]?.url || FALLBACK} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <input
                type="checkbox"
                checked={checked.has(p._id)}
                onChange={() => toggle(p._id)}
                disabled={p._id === product._id}
                className="accent-primary-600"
              />
              <span className="text-xs text-center max-w-[90px] line-clamp-2 text-gray-600 dark:text-gray-300">{p.name}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total for {checked.size} item{checked.size !== 1 ? 's' : ''}:{' '}
          <span className="font-bold text-ink dark:text-white text-lg ml-1">{formatPrice(total)}</span>
        </p>
        <button onClick={addBundle} disabled={adding} className="btn-primary">
          <FiShoppingCart size={15} /> {adding ? 'Adding…' : 'Add Selected to Cart'}
        </button>
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;
