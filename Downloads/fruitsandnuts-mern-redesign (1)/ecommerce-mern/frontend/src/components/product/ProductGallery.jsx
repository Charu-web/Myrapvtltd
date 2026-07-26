import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiRotateCw, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const FALLBACK = 'https://placehold.co/700x700/f8f9fa/2e7d32?text=Fruits+%26+Nuts';

const ProductGallery = ({ images = [], name }) => {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [lens, setLens] = useState({ x: 50, y: 50, show: false });
  const [spin360, setSpin360] = useState(false);
  const frameRef = useRef(null);

  const slides = images.length ? images : [{ url: FALLBACK, alt: name }];
  const current = slides[active];

  const handleMouseMove = (e) => {
    const rect = frameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLens({ x, y, show: true });
  };

  return (
    <div>
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setLens((l) => ({ ...l, show: false }))}
        className={`relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 cursor-zoom-in ${
          spin360 ? 'animate-[spin_2.4s_linear]' : ''
        }`}
        onClick={() => setZoomOpen(true)}
      >
        <img src={current.url} alt={current.alt || name} className="w-full h-full object-cover" />

        {/* Hover zoom lens */}
        {lens.show && (
          <div
            className="hidden md:block absolute inset-0 pointer-events-none bg-no-repeat"
            style={{
              backgroundImage: `url(${current.url})`,
              backgroundSize: '220%',
              backgroundPosition: `${lens.x}% ${lens.y}%`,
            }}
          />
        )}

        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSpin360(true);
              setTimeout(() => setSpin360(false), 2400);
            }}
            aria-label="360 degree view"
            className="btn-icon h-9 w-9 bg-white/90 text-gray-600 shadow-card"
            title="360° view (preview)"
          >
            <FiRotateCw size={15} />
          </button>
          <button
            aria-label="Zoom image"
            className="btn-icon h-9 w-9 bg-white/90 text-gray-600 shadow-card"
          >
            <FiZoomIn size={15} />
          </button>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {slides.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`h-16 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                active === idx ? 'border-primary-600' : 'border-transparent'
              }`}
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen zoom modal */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomOpen(false)}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button
              onClick={() => setZoomOpen(false)}
              aria-label="Close zoom"
              className="btn-icon absolute top-5 right-5 h-10 w-10 bg-white/10 text-white"
            >
              <FiX size={20} />
            </button>
            {slides.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((a) => (a - 1 + slides.length) % slides.length);
                  }}
                  className="btn-icon absolute left-5 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/10 text-white"
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((a) => (a + 1) % slides.length);
                  }}
                  className="btn-icon absolute right-5 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/10 text-white"
                  aria-label="Next image"
                >
                  <FiChevronRight size={20} />
                </button>
              </>
            )}
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              src={current.url}
              alt={current.alt || name}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGallery;
