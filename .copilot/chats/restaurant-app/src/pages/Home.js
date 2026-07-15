import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Truck, UtensilsCrossed, Star } from "lucide-react";

export default function Home() {
  const featured = [
    { id: 1, name: "Spicy Burger", price: 12.99, image: "https://via.placeholder.com/300x200?text=Burger", rating: 4.5 },
    { id: 2, name: "Classic Pizza", price: 14.99, image: "https://via.placeholder.com/300x200?text=Pizza", rating: 4.8 },
    { id: 3, name: "Fresh Salad", price: 9.99, image: "https://via.placeholder.com/300x200?text=Salad", rating: 4.3 },
    { id: 4, name: "Grilled Pasta", price: 11.99, image: "https://via.placeholder.com/300x200?text=Pasta", rating: 4.6 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">Delicious Food</h1>
              <p className="text-xl mb-4 opacity-90">Delivered to your door in 30 minutes</p>
              <p className="text-lg opacity-80 mb-8">Order now and enjoy the best dishes from our restaurant</p>
              <Link
                to="/menu"
                className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                <span>Order Now</span>
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="https://via.placeholder.com/400x400?text=Food"
                alt="Hero"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your order in 30 minutes or less</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <UtensilsCrossed size={32} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Fresh & Quality</h3>
              <p className="text-gray-600">Made with the freshest ingredients daily</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Highly Rated</h3>
              <p className="text-gray-600">4.8/5 stars from thousands of customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-dark">Featured Items</h2>
            <Link to="/menu" className="text-primary font-semibold hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item) => (
              <Link
                key={item.id}
                to={`/menu/${item.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-dark text-lg mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-xl">${item.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Eat?</h2>
          <p className="text-xl mb-8 opacity-90">Browse our full menu and place your order now</p>
          <Link
            to="/menu"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Browse Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
