import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiTruck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { bannerUrl } from '../../utils/format';

const SLIDES = [
  { file: 'banner1.jpeg', eyebrow: 'Small-Batch Roasted', title: 'Real Nuts, Real Fruits,\nReal Flavor', cta: 'Shop All Products', to: '/products' },
  { file: 'banner3.jpeg', eyebrow: 'Handpicked Harvest', title: 'Premium Dry Fruits,\nDelivered Fresh', cta: 'Shop Dry Fruits', to: '/products?keyword=dried' },
  { file: 'banner5.jpeg', eyebrow: 'Limited Time', title: 'Festival Gift Boxes\nFor Every Occasion', cta: 'Explore Gift Boxes', to: '/products?featured=true' },
  { file: 'banner7.jpeg', eyebrow: 'Guilt-Free Indulgence', title: 'Honest Chocolates,\nHonest Ingredients', cta: 'Shop Chocolates', to: '/products?keyword=chocolate' },
];

const AUTO_MS = 5500;

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTO_MS);
    return () => clearInterval(t);
  }, []);

  const go = (dir) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[index];

  return (
    <section className="relative overflow-hidden bg-primary-900 text-white min-h-[86vh] flex items-center">
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.file}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img src={bannerUrl(slide.file)} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/50 to-primary-900/20" />
          <div className="absolute inset-0 bg-orchard-mesh mix-blend-overlay" />
        </motion.div>
      </AnimatePresence>

      <div className="container-x relative py-24 md:py-32">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.file}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow bg-white/10 px-3 py-1.5 rounded-full text-secondary-200">{slide.eyebrow}</span>
              <h1 className="heading-xl text-4xl md:text-6xl mt-5 text-white whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="mt-5 text-primary-100 text-lg max-w-md">
                Small-batch roasted nuts, naturally sweet dried fruits, and honest chocolates — packed fresh and
                delivered to your door.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to={slide.to} className="btn-accent">
                  {slide.cta}
                </Link>
                <Link to="/products?featured=true" className="btn-outline">
                  Best Sellers
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating trust badge cluster — signature element */}
        <motion.div
          className="hidden lg:flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="glass-dark rounded-2xl px-5 py-4 flex items-center gap-3 animate-float">
            <FiTruck className="text-secondary-300" size={20} />
            <div>
              <p className="text-sm font-semibold">Free Shipping</p>
              <p className="text-xs text-primary-200">On orders over ₹999</p>
            </div>
          </div>
          <div className="glass-dark rounded-2xl px-5 py-4 flex items-center gap-3 animate-float-slow">
            <FiShield className="text-secondary-300" size={20} />
            <div>
              <p className="text-sm font-semibold">FSSAI Certified</p>
              <p className="text-xs text-primary-200">Reg 20825005010743</p>
            </div>
          </div>
        </motion.div>

        {/* Slide controls */}
        <div className="flex items-center gap-4 mt-16">
          <button onClick={() => go(-1)} aria-label="Previous slide" className="btn-icon h-10 w-10 border border-white/30 hover:bg-white/10">
            <FiChevronLeft />
          </button>
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.file}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? 'w-8 bg-accent-400' : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next slide" className="btn-icon h-10 w-10 border border-white/30 hover:bg-white/10">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
