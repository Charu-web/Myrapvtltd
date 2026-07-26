import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import FilterSidebar from './FilterSidebar';

const MobileFilterDrawer = ({ open, onClose, ...filterProps }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 z-50 h-full w-full max-w-xs bg-white dark:bg-[#141a15] shadow-glass-lg overflow-y-auto p-5 lg:hidden"
        >
          <div className="flex items-center justify-end mb-3">
            <button onClick={onClose} aria-label="Close filters" className="btn-icon h-9 w-9 hover:bg-gray-100 dark:hover:bg-white/10">
              <FiX size={18} />
            </button>
          </div>
          <FilterSidebar {...filterProps} />
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

export default MobileFilterDrawer;
