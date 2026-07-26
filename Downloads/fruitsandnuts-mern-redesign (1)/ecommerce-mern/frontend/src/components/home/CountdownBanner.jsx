import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';

// Countdown resets nightly at midnight — gives every visitor a live, ticking
// "flash sale ends in..." timer without needing a backend-stored end date.
const getMsUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight - now;
};

const format = (ms) => {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return { h, m, s };
};

const CountdownBanner = () => {
  const [remaining, setRemaining] = useState(getMsUntilMidnight());

  useEffect(() => {
    const t = setInterval(() => setRemaining(getMsUntilMidnight()), 1000);
    return () => clearInterval(t);
  }, []);

  const { h, m, s } = format(remaining);

  return (
    <section className="container-x">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-400 via-accent-300 to-secondary-300 px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-accent-300 shrink-0">
            <FiZap size={22} />
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-ink">Flash Sale — Today Only</p>
            <p className="text-ink/70 text-sm">Limited-time prices on select dry fruits &amp; nuts. Ends tonight.</p>
          </div>
        </div>

        <div className="relative flex items-center gap-3">
          {[['H', h], ['M', m], ['S', s]].map(([label, val]) => (
            <div key={label} className="flex flex-col items-center bg-ink text-white rounded-xl px-3.5 py-2 min-w-[56px]">
              <span className="font-mono text-xl font-bold tabular-nums">{val}</span>
              <span className="text-[10px] uppercase tracking-wide text-white/60">{label}</span>
            </div>
          ))}
          <Link to="/products?sort=price_asc" className="btn-dark ml-2">
            Shop Deals
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CountdownBanner;
