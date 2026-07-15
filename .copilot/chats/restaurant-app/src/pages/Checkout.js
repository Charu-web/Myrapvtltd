import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { ArrowLeft, Check } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    instructions: "",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-bold text-dark mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-8">Please sign in to continue with checkout</p>
            <button
              onClick={() => navigate("/login")}
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-bold text-dark mb-4">Your Cart is Empty</h2>
            <button
              onClick={() => navigate("/menu")}
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + tax + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.address || !formData.city || !formData.zipCode || !formData.phone) {
      toast.error("Please fill all delivery details");
      return;
    }

    if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVC) {
      toast.error("Please fill all payment details");
      return;
    }

    setOrderPlaced(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-dark mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">Your order has been placed successfully</p>
            <p className="text-lg text-dark mb-8">Order ID: <span className="font-bold">ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span></p>
            <p className="text-gray-600 mb-8">Your food will be delivered in approximately 30 minutes</p>
            <div className="space-y-2 mb-8 text-left">
              <p className="font-semibold text-dark">Delivery to:</p>
              <p className="text-gray-600">{formData.address}</p>
              <p className="text-gray-600">{formData.city}, {formData.zipCode}</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Steps */}
        <div className="flex items-center justify-between mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-primary" : "bg-gray-300"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Delivery Details */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-6">Delivery Details</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-dark font-medium mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-dark font-medium mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="New York"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                        />
                      </div>
                      <div>
                        <label className="block text-dark font-medium mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="10001"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-dark font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                      />
                    </div>
                    <div>
                      <label className="block text-dark font-medium mb-2">Delivery Instructions (Optional)</label>
                      <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        placeholder="E.g., Ring the bell twice, leave at the door, etc."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition h-24 resize-none"
                      />
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition mt-6"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {/* Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-6">Payment Method</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-dark font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-dark font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                        />
                      </div>
                      <div>
                        <label className="block text-dark font-medium mb-2">CVC</label>
                        <input
                          type="text"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleChange}
                          placeholder="123"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-6">Review Order</h2>
                  <div className="space-y-4 mb-8">
                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-dark mb-3">Items</h3>
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-gray-600">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-dark mb-3">Delivery Address</h3>
                      <p className="text-gray-600">{formData.address}</p>
                      <p className="text-gray-600">{formData.city}, {formData.zipCode}</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-20">
            <h3 className="text-xl font-bold text-dark mb-6">Order Summary</h3>

            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600 pb-2 border-b">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <span className="font-bold text-dark">Total</span>
              <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
