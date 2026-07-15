import React from "react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">RestaurantApp</h3>
            <p className="text-gray-400">Delivering delicious food to your doorstep</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Menu</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2"><Phone size={16} /><span>+1 (555) 123-4567</span></li>
              <li className="flex items-center space-x-2"><Mail size={16} /><span>info@restaurant.com</span></li>
              <li className="flex items-center space-x-2"><MapPin size={16} /><span>123 Food Street, City</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <ul className="space-y-1 text-gray-400">
              <li>Mon-Fri: 10AM - 10PM</li>
              <li>Sat: 11AM - 11PM</li>
              <li>Sun: 11AM - 9PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 RestaurantApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
