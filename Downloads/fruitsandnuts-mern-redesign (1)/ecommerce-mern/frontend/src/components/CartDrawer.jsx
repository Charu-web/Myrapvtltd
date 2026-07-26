import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

const CartDrawer = ({ open, onClose }) => {
  const { cart, subtotal, updateQuantity, removeItem } = useCart();
  const items = cart.items || [];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-[#141a15] shadow-glass-lg flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/10">
              <h2 className="font-display text-lg font-bold dark:text-white">Your Cart ({items.length})</h2>
              <button onClick={onClose} aria-label="Close cart" className="btn-icon h-9 w-9 hover:bg-gray-100 dark:hover:bg-white/10">
                <FiX size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 gap-3 py-16">
                  <FiShoppingBag size={40} />
                  <p>Your cart is empty.</p>
                  <Link to="/products" onClick={onClose} className="btn-primary mt-2">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item._id} className="flex gap-3 items-center">
                    <img
                      src={item.image || 'https://placehold.co/100x100?text=Item'}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate dark:text-gray-100">{item.name}</p>
                      <p className="text-sm text-primary-600 font-semibold">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                          className="btn-icon h-6 w-6 border border-gray-200 dark:border-white/10"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={11} />
                        </button>
                        <span className="text-sm w-5 text-center dark:text-gray-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="btn-icon h-6 w-6 border border-gray-200 dark:border-white/10"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={11} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      aria-label="Remove item"
                      className="text-gray-400 hover:text-red-500 p-2"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-black/5 dark:border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-lg font-bold text-ink dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                <Link to="/cart" onClick={onClose} className="btn-ghost w-full">
                  View Cart
                </Link>
                <Link to="/checkout" onClick={onClose} className="btn-primary w-full">
                  Checkout Securely
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
