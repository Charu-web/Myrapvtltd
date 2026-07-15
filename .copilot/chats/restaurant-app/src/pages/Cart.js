import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { ShoppingCart, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + tax + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-dark mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious items to get started</p>
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              <ArrowLeft size={18} />
              <span>Back to Menu</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} item(s) in cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-20">
            <h3 className="text-2xl font-bold text-dark mb-6">Order Summary</h3>

            <div className="space-y-3 mb-6 border-b border-gray-200 pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-dark">Total</span>
              <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>

            {deliveryFee > 0 && (
              <p className="text-xs text-green-600 bg-green-50 p-2 rounded mb-4 text-center">
                Free delivery on orders over $50!
              </p>
            )}

            <Link
              to="/checkout"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition mb-3 block text-center"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={clearCart}
              className="w-full border border-gray-300 text-dark py-3 rounded-lg font-semibold hover:bg-light transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
