import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const SectionHeading = ({ eyebrow, title, subtitle, viewAllTo, viewAllLabel = 'View all' }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-end justify-between mb-8 gap-4"
  >
    <div>
      {eyebrow && <span className="eyebrow mb-2 block">{eyebrow}</span>}
      <h2 className="heading-xl text-2xl md:text-3xl">{title}</h2>
      {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg text-sm md:text-base">{subtitle}</p>}
    </div>
    {viewAllTo && (
      <Link
        to={viewAllTo}
        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:gap-2.5 transition-all shrink-0"
      >
        {viewAllLabel} <FiArrowRight size={15} />
      </Link>
    )}
  </motion.div>
);

export default SectionHeading;
