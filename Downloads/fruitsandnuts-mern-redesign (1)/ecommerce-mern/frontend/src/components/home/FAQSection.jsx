import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const faqs = [
  { q: 'How fresh are your nuts and dried fruits?', a: 'We roast and pack in small batches, so most orders ship within a few days of roasting — no long warehouse shelf time.' },
  { q: 'Do you offer free shipping?', a: 'Yes — orders over ₹999 ship free across India. Smaller orders have a flat shipping fee shown at checkout.' },
  { q: 'What payment methods do you accept?', a: 'Credit/debit cards, UPI, net banking, and Cash on Delivery (COD) where available.' },
  { q: 'Can I return a product if I am not satisfied?', a: 'Yes, reach out through our Contact page within a few days of delivery and our team will help sort it out.' },
  { q: 'Are your products FSSAI certified?', a: 'Yes — we are FSSAI certified (Reg No: 20825005010743) and follow strict quality checks at every step.' },
];

const FAQItem = ({ q, a, open, onClick }) => (
  <div className="card overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      aria-expanded={open}
    >
      <span className="font-medium text-ink dark:text-white">{q}</span>
      <span className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
        <FiPlus className="text-primary-600" />
      </span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="container-x section-pad max-w-3xl">
      <SectionHeading eyebrow="Good to Know" title="Frequently Asked Questions" />
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <FAQItem
            key={f.q}
            q={f.q}
            a={f.a}
            open={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
