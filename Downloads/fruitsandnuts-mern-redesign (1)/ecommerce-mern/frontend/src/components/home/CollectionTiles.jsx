import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bannerUrl } from '../../utils/format';
import SectionHeading from './SectionHeading';

const tiles = [
  {
    title: 'Festival Gift Boxes',
    copy: 'Beautifully packed hampers for the season of giving.',
    file: 'banner2.jpeg',
    to: '/products?featured=true',
    span: 'md:col-span-2',
  },
  {
    title: 'Premium Dry Fruits',
    copy: 'Handpicked Medjool dates, almonds & more.',
    file: 'banner4.jpeg',
    to: '/products?keyword=dried',
    span: '',
  },
  {
    title: 'Chocolate Collection',
    copy: 'Honest ingredients, indulgent flavor.',
    file: 'banner6.jpeg',
    to: '/products?keyword=chocolate',
    span: '',
  },
];

const CollectionTiles = () => (
  <section className="container-x section-pad">
    <SectionHeading eyebrow="Seasonal Edits" title="Gift Boxes &amp; Signature Collections" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {tiles.map((t, i) => (
        <motion.div
          key={t.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={t.span}
        >
          <Link
            to={t.to}
            className="group relative flex h-64 md:h-80 items-end overflow-hidden rounded-3xl card-hover"
          >
            <img
              src={bannerUrl(t.file)}
              alt={t.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative p-6">
              <h3 className="font-display text-xl md:text-2xl font-bold text-white">{t.title}</h3>
              <p className="text-white/80 text-sm mt-1 max-w-xs">{t.copy}</p>
              <span className="inline-flex items-center gap-1 text-secondary-300 font-semibold text-sm mt-3">
                Shop now →
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CollectionTiles;
