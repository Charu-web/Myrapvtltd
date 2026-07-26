import { useMemo } from 'react';
import { FiStar } from 'react-icons/fi';

const ReviewsSection = ({ product, reviewForm, setReviewForm, onSubmit, submitting }) => {
  const reviews = product.reviews || [];

  const breakdown = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]; // index 0 = 5 stars ... index 4 = 1 star
    reviews.forEach((r) => {
      const idx = 5 - r.rating;
      if (idx >= 0 && idx < 5) counts[idx]++;
    });
    return counts;
  }, [reviews]);

  const max = Math.max(...breakdown, 1);

  return (
    <section className="mt-16 max-w-3xl">
      <h2 className="font-display text-2xl font-bold mb-6 dark:text-white">Customer Reviews</h2>

      <div className="grid sm:grid-cols-2 gap-8 mb-10">
        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-4xl font-bold text-ink dark:text-white">{product.rating?.toFixed?.(1) || '0.0'}</p>
            <div className="flex gap-0.5 justify-center mt-1 text-accent-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} size={14} className={i < Math.round(product.rating) ? 'fill-current' : 'opacity-25'} />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">{product.numReviews || 0} reviews</p>
          </div>
          <div className="flex-1 space-y-1">
            {breakdown.map((count, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-8">{5 - idx}★</span>
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-accent-400 rounded-full transition-all duration-500"
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                </div>
                <span className="w-5 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="card p-4 space-y-3">
          <h3 className="font-medium dark:text-white">Write a review</h3>
          <select
            value={reviewForm.rating}
            onChange={(e) => setReviewForm((f) => ({ ...f, rating: e.target.value }))}
            className="input w-auto"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          <textarea
            required
            value={reviewForm.comment}
            onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
            placeholder="Share your experience with this product..."
            className="input min-h-[90px]"
          />
          <button disabled={submitting} className="btn-primary">
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="card p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium dark:text-white">{r.name}</p>
                <div className="flex items-center gap-1 text-sm text-accent-500">
                  <FiStar className="fill-current" size={13} /> {r.rating}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
