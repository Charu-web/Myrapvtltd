import { motion } from 'framer-motion';
import ProductCard from '../ProductCard';
import { ProductGridSkeleton } from '../Skeleton';
import SectionHeading from './SectionHeading';

const ProductRail = ({ eyebrow, title, subtitle, products, loading, viewAllTo, emptyMessage, tone = 'light' }) => {
  const isDarkTone = tone === 'dark';

  return (
    <section className={`section-pad ${isDarkTone ? 'bg-primary-900 text-white' : ''}`}>
      <div className="container-x">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          viewAllTo={viewAllTo}
        />
        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : !products?.length ? (
          <p className={isDarkTone ? 'text-primary-200' : 'text-gray-500'}>{emptyMessage || 'Nothing here yet — check back soon!'}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductRail;
