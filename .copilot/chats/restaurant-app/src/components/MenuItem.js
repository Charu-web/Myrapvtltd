import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function MenuItem({ item, onViewDetails }) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(item, quantity);
    toast.success(`${item.name} added to cart`);
    setQuantity(1);
  };

  return (
    <div
      onClick={() => onViewDetails(item)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
    >
      <div className="relative h-48 bg-gray-200">
        <img
          src={item.image || "https://via.placeholder.com/300x200"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-light transition"
        >
          <Heart
            size={18}
            className={isFavorite ? "fill-primary text-primary" : "text-gray-400"}
          />
        </button>
        {item.discount && (
          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-sm font-semibold">
            -{item.discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-dark mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">({item.reviews})</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {item.originalPrice && (
              <span className="text-sm text-gray-400 line-through mr-2">
                ${item.originalPrice}
              </span>
            )}
            <span className="text-xl font-bold text-primary">${item.price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
