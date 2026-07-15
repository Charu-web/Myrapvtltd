import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function MenuItemDetail({ item, onBack }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    toast.success(`${item.name} added to cart!`);
    onBack();
  };

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center">
          <button onClick={onBack} className="p-2 hover:bg-light rounded transition">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-dark ml-4">Item Details</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="relative">
            <img
              src={item.image || "https://via.placeholder.com/500"}
              alt={item.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            {item.discount && (
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full font-semibold">
                -{item.discount}%
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-dark mb-2">{item.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="text-gray-600 ml-2">({item.reviews} reviews)</span>
            </div>
            <p className="text-gray-600 text-lg mb-4">{item.description}</p>

            <div className="flex items-center space-x-4 mb-6">
              {item.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${item.originalPrice}
                </span>
              )}
              <span className="text-4xl font-bold text-primary">${item.price}</span>
            </div>
          </div>

          {item.addons && item.addons.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-dark mb-3">Add-ons</h3>
              <div className="space-y-2">
                {item.addons.map((addon) => (
                  <label
                    key={addon.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-light transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      className="w-5 h-5 accent-primary rounded"
                    />
                    <span className="flex-1 ml-3 text-dark">{addon.name}</span>
                    <span className="text-primary font-semibold">+${addon.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-light rounded-lg p-3 flex-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-white rounded transition"
              >
                <Minus size={18} />
              </button>
              <span className="text-xl font-bold text-dark flex-1 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-white rounded transition"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
