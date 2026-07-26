import { motion } from 'framer-motion';
import { FiFeather, FiTruck, FiShield, FiHeart } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const points = [
  { icon: FiFeather, title: 'Small-Batch Roasted', copy: 'Roasted in small batches so every pack tastes freshly made, not warehouse-stale.' },
  { icon: FiShield, title: 'FSSAI Certified', copy: 'Licensed and quality-checked at every step, from sourcing to sealing.' },
  { icon: FiTruck, title: 'Fast, Careful Delivery', copy: 'Free shipping over ₹999, packed to keep nuts crunchy and fruits fresh.' },
  { icon: FiHeart, title: 'No Preservatives', copy: 'Just real ingredients — no additives, no shortcuts, no fillers.' },
];

const WhyChooseUs = () => (
  <section className="container-x section-pad">
    <SectionHeading eyebrow="Our Promise" title="Why Choose Fruits & Nuts" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {points.map(({ icon: Icon, title, copy }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="card card-hover p-6"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white mb-4">
            <Icon size={22} />
          </div>
          <h3 className="font-semibold text-ink dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{copy}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
