// Central place for small display helpers used across the redesigned UI.
// Keeping these here (instead of duplicated inline in every component) is
// part of the de-duplication pass requested alongside the visual redesign.

export const formatPrice = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Backend serves seeded banner/gallery imagery from /uploads on the API's
// origin (see server.js static middleware) — derive that origin once so the
// Home page hero can reference /uploads/banners/* without hardcoding a host.
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

export const bannerUrl = (file) => `${API_ORIGIN}/uploads/banners/${file}`;

export const discountInfo = (product) => {
  const hasDiscount = product?.discountPrice > 0 && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice : product?.price;
  const pct = hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
  return { hasDiscount, displayPrice, pct };
};
