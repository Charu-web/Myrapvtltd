import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut, FiGrid,
  FiSun, FiMoon, FiBell, FiChevronDown,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import client from '../api/client';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const loadCategories = useCallback(async () => {
    if (categories.length) return;
    try {
      const { data } = await client.get('/categories');
      setCategories(data.categories || []);
    } catch {
      // ignore — mega menu simply won't show categories
    }
  }, [categories.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?keyword=${encodeURIComponent(query)}`);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-glass'
            : 'bg-white/95 dark:bg-[#0f1410]/95 border-b border-black/5 dark:border-white/10'
        }`}
      >
        <div className="container-x flex items-center gap-4 h-16">
          <button className="lg:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <img
              src="/assets/logo.jfif"
              alt="Fruits & Nuts"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-secondary-300 transition"
            />
            <span className="font-display text-xl font-bold gradient-text hidden sm:inline">Fruits &amp; Nuts</span>
          </Link>

          <div
            className="hidden lg:block relative"
            onMouseEnter={() => {
              setMegaOpen(true);
              loadCategories();
            }}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-ink dark:text-gray-200 hover:text-primary-600 py-2">
              Shop <FiChevronDown size={14} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
            </button>
            {megaOpen && (
              <div className="absolute top-full left-0 pt-3 w-[520px]">
                <div className="glass rounded-2xl p-6 grid grid-cols-2 gap-x-8 gap-y-3">
                  {categories.length === 0 ? (
                    <p className="text-sm text-gray-400 col-span-2">Loading categories…</p>
                  ) : (
                    categories.slice(0, 8).map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/products?category=${cat._id}`}
                        className="text-sm font-medium text-ink dark:text-gray-200 hover:text-primary-600 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))
                  )}
                  <Link to="/products" className="col-span-2 pt-2 mt-2 border-t border-black/5 dark:border-white/10 text-sm font-semibold text-primary-600">
                    View all products →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search nuts, dried fruits, chocolates..."
                className="input pr-10 rounded-full"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" aria-label="Search">
                <FiSearch size={18} />
              </button>
            </div>
          </form>

          <nav className="hidden lg:flex items-center gap-5 ml-auto">
            <Link to="/about" className="text-sm font-medium text-ink dark:text-gray-200 hover:text-primary-600">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-ink dark:text-gray-200 hover:text-primary-600">
              Contact
            </Link>

            <button onClick={toggleTheme} aria-label="Toggle dark mode" className="btn-icon h-9 w-9 text-ink dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10">
              {isDark ? <FiSun size={19} /> : <FiMoon size={19} />}
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                aria-label="Notifications"
                className="btn-icon h-9 w-9 text-ink dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <FiBell size={19} />
              </button>
              {notifOpen && (
                <div onMouseLeave={() => setNotifOpen(false)} className="absolute right-0 mt-2 w-64 card p-4 text-sm">
                  <p className="font-semibold mb-1 dark:text-gray-100">Notifications</p>
                  <p className="text-gray-400">You're all caught up — order and offer alerts will appear here.</p>
                </div>
              )}
            </div>

            <Link to="/wishlist" className="text-ink dark:text-gray-200 hover:text-primary-600" aria-label="Wishlist">
              <FiHeart size={20} />
            </Link>

            <button onClick={() => setCartOpen(true)} className="relative text-ink dark:text-gray-200 hover:text-primary-600" aria-label="Cart">
              <FiShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-400 text-ink text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-1 text-ink dark:text-gray-200 hover:text-primary-600"
                aria-label="Account menu"
              >
                <FiUser size={20} />
              </button>
              {userMenuOpen && (
                <div onMouseLeave={() => setUserMenuOpen(false)} className="absolute right-0 mt-2 w-48 card p-2 text-sm">
                  {user ? (
                    <>
                      <p className="px-3 py-2 text-gray-400 truncate">Hi, {user.name}</p>
                      <Link to="/profile" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 dark:text-gray-200">
                        My Profile
                      </Link>
                      <Link to="/orders" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 dark:text-gray-200">
                        My Orders
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 dark:text-gray-200">
                          <FiGrid /> Admin Dashboard
                        </Link>
                      )}
                      <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-red-500">
                        <FiLogOut /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 dark:text-gray-200">
                        Login
                      </Link>
                      <Link to="/register" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 dark:text-gray-200">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Compact icons for mobile */}
          <div className="flex lg:hidden items-center gap-4 ml-auto">
            <button onClick={toggleTheme} aria-label="Toggle dark mode" className="text-ink dark:text-gray-200">
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative text-ink dark:text-gray-200" aria-label="Cart">
              <FiShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-400 text-ink text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-black/5 dark:border-white/10 p-4 space-y-3 bg-white dark:bg-[#0f1410]">
            <form onSubmit={handleSearch}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="input"
              />
            </form>
            <Link onClick={() => setMenuOpen(false)} to="/products" className="block py-1 dark:text-gray-200">Shop</Link>
            <Link onClick={() => setMenuOpen(false)} to="/about" className="block py-1 dark:text-gray-200">About</Link>
            <Link onClick={() => setMenuOpen(false)} to="/wishlist" className="block py-1 dark:text-gray-200">Wishlist</Link>
            <Link onClick={() => setMenuOpen(false)} to="/contact" className="block py-1 dark:text-gray-200">Contact</Link>
            {user ? (
              <>
                <Link onClick={() => setMenuOpen(false)} to="/profile" className="block py-1 dark:text-gray-200">My Profile</Link>
                <Link onClick={() => setMenuOpen(false)} to="/orders" className="block py-1 dark:text-gray-200">My Orders</Link>
                {isAdmin && (
                  <Link onClick={() => setMenuOpen(false)} to="/admin" className="block py-1 dark:text-gray-200">Admin Dashboard</Link>
                )}
                <button onClick={logout} className="block py-1 text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link onClick={() => setMenuOpen(false)} to="/login" className="block py-1 dark:text-gray-200">Login</Link>
                <Link onClick={() => setMenuOpen(false)} to="/register" className="block py-1 dark:text-gray-200">Register</Link>
              </>
            )}
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
