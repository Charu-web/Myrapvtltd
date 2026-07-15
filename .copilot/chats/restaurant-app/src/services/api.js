import axiosInstance from "./axiosInstance";

export const menuService = {
  getCategories: () => axiosInstance.get("/categories"),
  getMenuItems: (categoryId) => axiosInstance.get(`/menu?category=${categoryId}`),
  getMenuItemById: (id) => axiosInstance.get(`/menu/${id}`),
  searchMenuItems: (query) => axiosInstance.get(`/menu/search?q=${query}`),
};

export const cartService = {
  getCart: () => axiosInstance.get("/cart"),
  addToCart: (itemId, quantity) =>
    axiosInstance.post("/cart", { itemId, quantity }),
  updateCartItem: (itemId, quantity) =>
    axiosInstance.put(`/cart/${itemId}`, { quantity }),
  removeFromCart: (itemId) => axiosInstance.delete(`/cart/${itemId}`),
  clearCart: () => axiosInstance.delete("/cart"),
};

export const orderService = {
  createOrder: (orderData) => axiosInstance.post("/orders", orderData),
  getOrders: () => axiosInstance.get("/orders"),
  getOrderById: (id) => axiosInstance.get(`/orders/${id}`),
  trackOrder: (id) => axiosInstance.get(`/orders/${id}/track`),
};

export const authService = {
  register: (email, password, name) =>
    axiosInstance.post("/auth/register", { email, password, name }),
  login: (email, password) =>
    axiosInstance.post("/auth/login", { email, password }),
  logout: () => axiosInstance.post("/auth/logout"),
  getProfile: () => axiosInstance.get("/auth/profile"),
  updateProfile: (data) => axiosInstance.put("/auth/profile", data),
};

export const reservationService = {
  getAvailableTimes: (date) =>
    axiosInstance.get(`/reservations/available?date=${date}`),
  createReservation: (reservationData) =>
    axiosInstance.post("/reservations", reservationData),
  getReservations: () => axiosInstance.get("/reservations"),
  cancelReservation: (id) => axiosInstance.delete(`/reservations/${id}`),
};
