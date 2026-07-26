import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CategorySkeleton } from '../Skeleton';
import { API_ORIGIN } from '../../utils/format';
import SectionHeading from './SectionHeading';

const FALLBACK = 'https://placehold.co/400x500/eaf4ea/2e7d32?text=Category';

const resolveImage = (img) => {
  if (!img) return FALLBACK;
  return img.startsWith('http') ? img : `${API_ORIGIN}${img.startsWith('/') ? '' : '/'}${img}`;
};

const CategoryGrid = ({ categories, loading }) => {
  if (loading) {
    return (
      <section className="container-x section-pad">
        <SectionHeading eyebrow="Curated Collections" title="Shop by Category" />
        <CategorySkeleton />
      </section>
    );
  }

  if (!categories?.length) return null;

  return (
    <section className="container-x section-pad">
      <SectionHeading
        eyebrow="Curated Collections"
        title="Shop by Category"
        subtitle="From roasted nuts to naturally sweet dried fruits — find exactly what your kitchen is craving."
        viewAllTo="/products"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.slice(0, 6).map((cat, i) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/products?category=${cat._id}`}
              className="group relative block aspect-[4/5] rounded-2xl overflow-hidden card-hover"
            >
              <img
                src={resolveImage(cat.image)}
                alt={cat.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-0 right-0 text-center text-white font-semibold text-sm px-2">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
