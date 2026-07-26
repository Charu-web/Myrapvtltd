import { Link } from 'react-router-dom';
import { FiInstagram, FiShield, FiTruck, FiRefreshCw, FiCreditCard } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

// Real brand details from fruitsandnuts.co.in
const INSTAGRAM_URL = 'https://www.instagram.com/fruitsnutsgurgaon';
const WHATSAPP_URL = 'https://wa.me/918368301495';
const FSSAI_REG = '20825005010743';

const trustBadges = [
  { icon: FiTruck, label: 'Free Shipping', sub: 'On orders over ₹999' },
  { icon: FiShield, label: 'FSSAI Certified', sub: `Reg No: ${FSSAI_REG}` },
  { icon: FiRefreshCw, label: 'Freshly Packed', sub: 'Small-batch, no preservatives' },
  { icon: FiCreditCard, label: 'Secure Payments', sub: 'Cards, UPI & COD' },
];

const Footer = () => (
  <footer className="mt-16 bg-primary-900 text-primary-100 dark:bg-[#0a120b]">
    {/* Trust strip */}
    <div className="border-b border-white/10">
      <div className="container-x py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {trustBadges.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-secondary-300">
              <Icon size={18} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{label}</p>
              <p className="text-xs text-primary-300">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="container-x py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
      <div className="col-span-2">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.jfif" alt="Fruits & Nuts" className="h-9 w-9 rounded-full object-cover" />
          <h3 className="font-display text-white text-xl font-bold">Fruits &amp; Nuts</h3>
        </div>
        <p className="text-sm text-primary-200 mt-3 max-w-xs">
          Premium roasted nuts, dried fruits and chocolates — freshly packed and delivered.
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-secondary-300 mt-3 font-semibold">
          Nutritions With An Emotion
        </p>
        <div className="flex gap-3 mt-5">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-secondary-400 hover:text-primary-900 transition-colors"
          >
            <FiInstagram size={16} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-secondary-400 hover:text-primary-900 transition-colors"
          >
            <FaWhatsapp size={16} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3 text-sm">Shop</h4>
        <ul className="space-y-2 text-sm text-primary-200">
          <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
          <li><Link to="/products?featured=true" className="hover:text-white transition-colors">Featured</Link></li>
          <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3 text-sm">Account</h4>
        <ul className="space-y-2 text-sm text-primary-200">
          <li><Link to="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
          <li><Link to="/orders" className="hover:text-white transition-colors">Order Tracking</Link></li>
          <li><Link to="/login" className="hover:text-white transition-colors">Login / Register</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3 text-sm">Contact</h4>
        <ul className="space-y-2 text-sm text-primary-200">
          <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          <li><a href="tel:+918368301495" className="hover:text-white transition-colors">+91 8368301495</a></li>
          <li><a href="mailto:support@fruitsandnuts.co.in" className="hover:text-white transition-colors">support@fruitsandnuts.co.in</a></li>
          <li className="text-primary-400 text-xs pt-1">K-14 Sapphire 90 Mall, Sector 90, Gurgaon, 122505</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10 py-5">
      <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-300">
        <span>© {new Date().getFullYear()} Fruits &amp; Nuts. All rights reserved.</span>
        <div className="flex items-center gap-3">
          <span>FSSAI Reg No: {FSSAI_REG}</span>
          <span className="hidden sm:inline text-primary-500">•</span>
          <span className="tracking-wide">VISA · Mastercard · UPI · COD</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
