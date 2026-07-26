import { useState } from 'react';
import client from '../api/client';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const OUTLETS = [
  { name: 'Gurgaon — Sapphire 90 Mall', address: 'K-14 Sapphire 90 Mall, Sector 90, Gurgaon, 122505', phone: '+91-8368301495' },
  { name: 'Gurgaon — Sector 86 Outlet', address: 'Shop No 5, Ground Floor, Sector 86, Gurgaon, 122505', phone: '+91-7633080180' },
  { name: 'Ludhiana — Registered Office', address: 'Sant Tower, Pindi Street, Ludhiana, Punjab', phone: '+91-9718629866' },
  { name: 'Ludhiana Outlet', address: 'D-9 Basant City, Near Le Palm Apartments, Ludhiana, 141002', phone: '' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await client.post('/contact', form);
      toast.success(data.message);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-x py-12">
      <SEO title="Contact Us" description="Get in touch with the Fruits & Nuts team — questions, bulk orders, or corporate gifting." />
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiMail className="text-brand-600" />
              <a href="mailto:support@fruitsandnuts.co.in">support@fruitsandnuts.co.in</a>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-brand-600" />
              <a href="tel:+918368301495">+91 8368301495</a>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Our Outlets</h2>
            <div className="space-y-3">
              {OUTLETS.map((o) => (
                <div key={o.name} className="flex items-start gap-3 text-sm">
                  <FiMapPin className="text-brand-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{o.name}</p>
                    <p className="text-gray-500">{o.address}</p>
                    {o.phone && <p className="text-gray-500">{o.phone}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input" />
          <input required type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="input" />
          <input placeholder="Subject" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className="input" />
          <textarea required placeholder="Your Message" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="input min-h-[120px]" />
          <button disabled={loading} className="btn-primary">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
