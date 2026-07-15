import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import MenuItemDetail from "../components/MenuItemDetail";
import { Search, Filter } from "lucide-react";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "All" },
    { id: "burgers", name: "Burgers" },
    { id: "pizza", name: "Pizza" },
    { id: "salads", name: "Salads" },
    { id: "drinks", name: "Drinks" },
    { id: "desserts", name: "Desserts" },
  ];

  const menuItems = [
    { id: 1, name: "Classic Burger", category: "burgers", price: 12.99, image: "https://via.placeholder.com/300x200?text=Burger", description: "Juicy beef patty with fresh toppings", rating: 4.5, reviews: 128, discount: 10 },
    { id: 2, name: "Spicy Burger", category: "burgers", price: 13.99, image: "https://via.placeholder.com/300x200?text=SpicyBurger", description: "Hot and spicy burger with jalapenos", rating: 4.6, reviews: 95 },
    { id: 3, name: "Margherita Pizza", category: "pizza", price: 14.99, image: "https://via.placeholder.com/300x200?text=Pizza1", description: "Traditional pizza with mozzarella and basil", rating: 4.8, reviews: 156 },
    { id: 4, name: "Pepperoni Pizza", category: "pizza", price: 15.99, image: "https://via.placeholder.com/300x200?text=Pizza2", description: "Pizza loaded with pepperoni", rating: 4.7, reviews: 142 },
    { id: 5, name: "Caesar Salad", category: "salads", price: 9.99, image: "https://via.placeholder.com/300x200?text=Salad1", description: "Fresh romaine with caesar dressing", rating: 4.3, reviews: 67 },
    { id: 6, name: "Greek Salad", category: "salads", price: 10.99, image: "https://via.placeholder.com/300x200?text=Salad2", description: "Feta cheese and fresh vegetables", rating: 4.4, reviews: 78 },
    { id: 7, name: "Cola", category: "drinks", price: 2.99, image: "https://via.placeholder.com/300x200?text=Cola", description: "Cold refreshing cola", rating: 4.5, reviews: 45 },
    { id: 8, name: "Lemonade", category: "drinks", price: 3.99, image: "https://via.placeholder.com/300x200?text=Lemonade", description: "Fresh homemade lemonade", rating: 4.6, reviews: 52 },
    { id: 9, name: "Chocolate Cake", category: "desserts", price: 6.99, image: "https://via.placeholder.com/300x200?text=Cake", description: "Rich chocolate cake", rating: 4.9, reviews: 123 },
    { id: 10, name: "Cheesecake", category: "desserts", price: 7.99, image: "https://via.placeholder.com/300x200?text=Cheesecake", description: "Creamy New York style cheesecake", rating: 4.8, reviews: 98 },
  ];

  const filteredItems = menuItems
    .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "popular") return b.reviews - a.reviews;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-light min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">Our Menu</h1>
          <p className="text-gray-600">Choose from our delicious selection of dishes</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center space-x-3 border border-gray-300 rounded-lg px-4 py-3 mb-4">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-dark"
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedCategory === cat.id
                      ? "bg-primary text-white"
                      : "bg-light text-dark hover:bg-gray-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-dark cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onViewDetails={setSelectedItem}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No items found. Try a different search or category.</p>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <MenuItemDetail
          item={selectedItem}
          onBack={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
