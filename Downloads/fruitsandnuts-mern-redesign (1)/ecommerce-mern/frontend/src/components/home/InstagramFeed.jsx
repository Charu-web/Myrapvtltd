import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';
import { API_ORIGIN } from '../../utils/format';

const INSTAGRAM_URL = 'https://www.instagram.com/fruitsnutsgurgaon';

// Uses the real product/gallery photography already seeded on the backend
// (backend/public/uploads/gallery) rather than fabricating an Instagram API
// integration — no such credentials exist in this project's backend.
const gallery = Array.from({ length: 19 }, (_, i) => `gallery1(${19 + i}).jpeg`).slice(0, 6);
const galleryUrl = (file) => `${API_ORIGIN}/uploads/gallery/${file}`;

const InstagramFeed = () => (
  <section className="container-x section-pad">
    <div className="flex items-center justify-between mb-8">
      <div>
        <span className="eyebrow mb-2 block">Follow Along</span>
        <h2 className="heading-xl text-2xl md:text-3xl">@fruitsnutsgurgaon</h2>
      </div>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600"
      >
        <FiInstagram size={15} /> Follow us
      </a>
    </div>
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {gallery.map((file, i) => (
        <motion.a
          key={file}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="group relative aspect-square overflow-hidden rounded-xl"
        >
          <img src={galleryUrl(file)} alt="Fruits & Nuts on Instagram" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/40 transition-colors flex items-center justify-center">
            <FiInstagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
          </div>
        </motion.a>
      ))}
    </div>
  </section>
);

export default InstagramFeed;
