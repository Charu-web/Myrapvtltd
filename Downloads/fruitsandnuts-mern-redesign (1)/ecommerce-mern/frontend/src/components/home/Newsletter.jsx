import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import client from '../../api/client';

// There's no dedicated /api/newsletter route in the backend, so this reuses
// the existing, already-validated POST /api/contact endpoint (name/email/message)
// rather than inventing a new backend route — keeps backend surface unchanged.
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await client.post('/contact', {
        name: 'Newsletter Subscriber',
        email,
        subject: 'Newsletter Signup',
        message: `Please add ${email} to the Fruits & Nuts newsletter list.`,
      });
      toast.success("You're subscribed! Watch your inbox for offers.");
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not subscribe right now');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-x section-pad">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-primary-900 text-white px-6 py-14 sm:px-14 text-center bg-orchard-mesh"
      >
        <div className="relative max-w-lg mx-auto">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 mb-5">
            <FiMail className="text-secondary-300" size={22} />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">Get 10% Off Your First Order</h2>
          <p className="text-primary-200 mt-3">
            Join our list for early access to festival gift boxes, flash sales, and fresh harvest drops.
          </p>
          <form onSubmit={handleSubmit} className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input flex-1 !bg-white/95 !text-ink"
            />
            <button type="submit" disabled={submitting} className="btn-accent shrink-0">
              <FiSend size={15} /> {submitting ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
