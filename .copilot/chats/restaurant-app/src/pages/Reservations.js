import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Calendar, Clock, Users } from "lucide-react";
import toast from "react-hot-toast";

export default function Reservations() {
  const { isAuthenticated } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time || !formData.name || !formData.phone) {
      toast.error("Please fill all fields");
      return;
    }

    const newReservation = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: "confirmed",
      createdAt: new Date(),
    };

    setReservations((prev) => [newReservation, ...prev]);
    setFormData({
      date: "",
      time: "",
      guests: "2",
      name: "",
      email: "",
      phone: "",
    });
    setShowForm(false);
    toast.success("Reservation confirmed!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-bold text-dark mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-8">Please sign in to make a reservation</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">Table Reservations</h1>
          <p className="text-gray-600">Book a table at our restaurant</p>
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Make a Reservation
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Book Your Table</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-dark font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark font-medium mb-2">Phone</label>
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
                  <label className="block text-dark font-medium mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark font-medium mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-dark font-medium mb-2">Number of Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Confirm Reservation
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-300 text-dark py-3 rounded-lg font-semibold hover:bg-light transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reservations List */}
        {reservations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-dark">Your Reservations</h2>
            {reservations.map((res) => (
              <div key={res.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-dark">{res.name}</h3>
                    <span className="text-sm text-green-600 font-semibold">✓ {res.status}</span>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {new Date(res.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <Calendar size={20} className="text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-dark">{res.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock size={20} className="text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold text-dark">{res.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users size={20} className="text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Guests</p>
                      <p className="font-semibold text-dark">{res.guests}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Contact:</span> {res.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showForm && reservations.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No reservations yet. Make your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
