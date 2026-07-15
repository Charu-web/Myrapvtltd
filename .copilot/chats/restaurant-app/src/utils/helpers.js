// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

// Format time
export const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone
export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

// Calculate discount price
export const calculateDiscountPrice = (originalPrice, discountPercent) => {
  return (originalPrice * (100 - discountPercent)) / 100;
};

// Calculate savings
export const calculateSavings = (originalPrice, discountPrice) => {
  return originalPrice - discountPrice;
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

// Generate order ID
export const generateOrderId = () => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// Sort by price
export const sortByPrice = (items, order = "asc") => {
  return [...items].sort((a, b) =>
    order === "asc" ? a.price - b.price : b.price - a.price
  );
};

// Sort by rating
export const sortByRating = (items) => {
  return [...items].sort((a, b) => b.rating - a.rating);
};

// Filter by price range
export const filterByPriceRange = (items, minPrice, maxPrice) => {
  return items.filter((item) => item.price >= minPrice && item.price <= maxPrice);
};

// Get average rating
export const getAverageRating = (items) => {
  if (items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + item.rating, 0);
  return (total / items.length).toFixed(1);
};

// Check if time is within business hours
export const isWithinBusinessHours = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const timeInMinutes = hours * 60 + minutes;
  const openTime = 10 * 60; // 10 AM
  const closeTime = 22 * 60; // 10 PM
  return timeInMinutes >= openTime && timeInMinutes <= closeTime;
};

// Get delivery time estimate
export const getDeliveryTimeEstimate = (distance = 5) => {
  // Assuming average delivery speed of 10km in 20 mins
  const baseTime = 20;
  const additionalTime = Math.round((distance / 10) * 20);
  return baseTime + additionalTime;
};

// Check if date is valid for reservation
export const isValidReservationDate = (date) => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};
