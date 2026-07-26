import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const reviews = [
  { name: 'Ananya R.', location: 'Gurgaon', rating: 5, text: 'The almonds taste like they were roasted this morning. Genuinely the freshest packaged nuts I have bought.' },
  { name: 'Karan M.', location: 'Delhi', rating: 5, text: 'Ordered a gift box for Diwali and it arrived beautifully packed. My family loved the dates especially.' },
  { name: 'Priya S.', location: 'Noida', rating: 4, text: 'Great quality overall, the cashews are creamy and not over-salted. Delivery was quick too.' },
  { name: 'Rohit V.', location: 'Gurgaon', rating: 5, text: 'Been ordering monthly for six months now. Consistent quality and the granola bites are addictive.' },
];

const Testimonials = () => (
  <section className="section-pad bg-gray-50 dark:bg-white/[0.02]">
    <div className="container-x">
      <SectionHeading eyebrow="Customer Love" title="What Our Customers Say" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="card card-hover p-6 flex flex-col"
          >
            <div className="flex gap-0.5 text-accent-400 mb-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <FiStar key={idx} size={14} className={idx < r.rating ? 'fill-current' : 'opacity-30'} />
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">"{r.text}"</p>
            <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10">
              <p className="font-semibold text-sm text-ink dark:text-white">{r.name}</p>
              <p className="text-xs text-gray-400">{r.location} · Verified Buyer</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
