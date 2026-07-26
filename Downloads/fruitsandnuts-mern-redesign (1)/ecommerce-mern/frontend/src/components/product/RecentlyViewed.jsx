import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import SectionHeading from '../home/SectionHeading';

const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 8;

// Records the current product into localStorage. Called from the ProductDetail
// page itself; kept here so the tracking logic lives next to the display logic.
export const recordView = (product) => {
  if (!product?._id) return;
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const filtered = list.filter((p) => p._id !== product._id);
  const entry = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    price: product.price,
    discountPrice: product.discountPrice,
    stock: product.stock,
    rating: product.rating,
    numReviews: product.numReviews,
    images: product.images,
  };
  const next = [entry, ...filtered].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

const RecentlyViewed = ({ excludeId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setItems(list.filter((p) => p._id !== excludeId));
  }, [excludeId]);

  if (!items.length) return null;

  return (
    <section className="mt-16">
      <SectionHeading eyebrow="Your History" title="Recently Viewed" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {items.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
