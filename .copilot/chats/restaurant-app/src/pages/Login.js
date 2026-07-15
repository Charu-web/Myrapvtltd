import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!formData.name || !formData.email || !formData.password) {
          toast.error("Please fill all fields");
          setIsLoading(false);
          return;
        }

        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.name,
          email: formData.email,
          token: "mock_token_" + Math.random().toString(36).substr(2, 9),
        };

        signup(userData);
        toast.success("Account created successfully!");
      } else {
        if (!formData.email || !formData.password) {
          toast.error("Please fill all fields");
          setIsLoading(false);
          return;
        }

        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.email.split("@")[0],
          email: formData.email,
          token: "mock_token_" + Math.random().toString(36).substr(2, 9),
        };

        login(userData);
        toast.success("Logged in successfully!");
      }

      setFormData({ email: "", password: "", name: "" });
      navigate("/");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-secondary flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-dark mb-2 text-center">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {isSignUp
              ? "Join us and start ordering delicious food"
              : "Sign in to your account"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-dark font-medium mb-2">Full Name</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
                  <User size={20} className="text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="flex-1 ml-2 outline-none text-dark"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-dark font-medium mb-2">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
                <Mail size={20} className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="flex-1 ml-2 outline-none text-dark"
                />
              </div>
            </div>

            <div>
              <label className="block text-dark font-medium mb-2">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
                <Lock size={20} className="text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 ml-2 outline-none text-dark"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}</span>
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({ email: "", password: "", name: "" });
                }}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {!isSignUp && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Demo credentials: use any email/password
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
