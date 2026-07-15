import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Header() {
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="text-xl font-bold text-dark">RestaurantApp</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-dark hover:text-primary transition">
              Home
            </Link>
            <Link to="/menu" className="text-dark hover:text-primary transition">
              Menu
            </Link>
            <Link to="/reservations" className="text-dark hover:text-primary transition">
              Reservations
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-dark hover:text-primary transition"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition"
              >
                Login
              </Link>
            )}

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-2 py-2 hover:bg-light rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="block px-2 py-2 hover:bg-light rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/reservations"
              className="block px-2 py-2 hover:bg-light rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservations
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 hover:bg-light rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-2 py-2 hover:bg-light rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
