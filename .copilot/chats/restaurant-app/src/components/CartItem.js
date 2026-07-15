import React from "react";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
      <img
        src={item.image || "https://via.placeholder.com/80"}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-dark">{item.name}</h3>
        <p className="text-primary font-bold">${item.price}</p>
      </div>

      <div className="flex items-center space-x-2 bg-light rounded-lg p-1">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 hover:bg-white rounded transition"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 hover:bg-white rounded transition"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-dark">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded transition"
      >
        <X size={18} />
      </button>
    </div>
  );
}
