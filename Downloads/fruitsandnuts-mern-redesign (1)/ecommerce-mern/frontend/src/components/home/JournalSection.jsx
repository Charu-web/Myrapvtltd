import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { bannerUrl } from '../../utils/format';
import SectionHeading from './SectionHeading';

// No blog/CMS backend exists in this project yet, so these are editorial
// teaser cards (not linked routes) rather than fabricated /blog pages that
// would 404. Swap in a real Journal collection + route when that lands.
const posts = [
  { title: '5 Ways to Store Dry Fruits for Maximum Freshness', read: '4 min read', file: 'banner8.jpeg' },
  { title: 'Almonds vs Cashews: A Nutrition Breakdown', read: '6 min read', file: 'banner1.jpeg' },
  { title: 'Building the Perfect Festival Gift Box', read: '3 min read', file: 'banner3.jpeg' },
];

const JournalSection = () => (
  <section className="container-x section-pad">
    <SectionHeading eyebrow="From the Journal" title="Nutrition Notes &amp; Stories" />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {posts.map((p, i) => (
        <motion.article
          key={p.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="card card-hover overflow-hidden cursor-default"
        >
          <div className="aspect-[16/10] overflow-hidden">
            <img src={bannerUrl(p.file)} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-ink dark:text-white leading-snug">{p.title}</h3>
            <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-3">
              <FiClock size={12} /> {p.read}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default JournalSection;
