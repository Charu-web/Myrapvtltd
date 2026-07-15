# RestaurantApp - Food Ordering Platform

A modern, fully-featured restaurant food ordering application built with React.js and Tailwind CSS.

## 🌟 Features

- **User Authentication**: Sign up and login system
- **Dynamic Menu**: Browse food items by category with search functionality
- **Shopping Cart**: Add items, manage quantities, and view totals
- **Checkout System**: Multi-step checkout with delivery and payment information
- **Table Reservations**: Book tables at the restaurant
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS for a professional look
- **Real-time Updates**: Dynamic data rendering with Axios

## 🛠️ Tech Stack

- **Frontend Framework**: React.js 18.2.0
- **Styling**: Tailwind CSS 3.3.2
- **Routing**: React Router DOM 6.14.0
- **API Client**: Axios 1.4.0
- **UI Components**: Lucide React Icons
- **Toast Notifications**: React Hot Toast
- **State Management**: React Context API

## 📁 Project Structure

```
restaurant-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   ├── Footer.js          # Footer component
│   │   ├── MenuItem.js        # Menu item card
│   │   ├── MenuItemDetail.js  # Item detail modal
│   │   └── CartItem.js        # Cart item component
│   ├── pages/
│   │   ├── Home.js            # Home page with hero
│   │   ├── Menu.js            # Menu listing page
│   │   ├── Cart.js            # Shopping cart page
│   │   ├── Checkout.js        # Multi-step checkout
│   │   ├── Login.js           # Authentication
│   │   └── Reservations.js    # Table reservations
│   ├── context/
│   │   ├── CartContext.js     # Cart state management
│   │   └── AuthContext.js     # Auth state management
│   ├── services/
│   │   ├── axiosInstance.js   # Axios configuration
│   │   └── api.js             # API service functions
│   ├── hooks/
│   │   └── useFetch.js        # Custom fetch hook
│   ├── App.js                 # Main app component
│   ├── App.css                # App styles
│   └── index.js               # Entry point
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
```bash
cd restaurant-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with call-to-action
- Features section highlighting restaurant benefits
- Featured menu items carousel
- CTA button to browse full menu

### Menu Page (`/menu`)
- Full menu with search functionality
- Category filtering (Burgers, Pizza, Salads, Drinks, Desserts)
- Sorting options (Popular, Rating, Price)
- Item cards with ratings and pricing
- Modal view for detailed item information

### Cart Page (`/cart`)
- List of cart items with quantity controls
- Order summary with subtotal, tax, and delivery fee
- Free delivery promotion for orders over $50
- Proceed to checkout button

### Checkout Page (`/checkout`)
- Multi-step checkout process:
  - Step 1: Delivery details (address, city, zip, phone)
  - Step 2: Payment information (card details)
  - Step 3: Order review and confirmation
- Order summary sidebar
- Order confirmation with order ID

### Login Page (`/login`)
- Sign in for existing users
- Sign up for new users
- Form validation
- Demo credentials support

### Reservations Page (`/reservations`)
- Table reservation booking form
- Select date, time, and number of guests
- View all reservations
- Reservation confirmation

## 🎨 Color Scheme

- **Primary**: `#FF6B35` (Orange-Red)
- **Secondary**: `#F7931E` (Orange)
- **Dark**: `#1a1a1a` (Black)
- **Light**: `#f5f5f5` (Light Gray)

## 🔌 API Integration

The app uses Axios with the following service functions:

### Menu Service
- `getCategories()` - Fetch all food categories
- `getMenuItems(categoryId)` - Get items by category
- `getMenuItemById(id)` - Get single item details
- `searchMenuItems(query)` - Search menu items

### Cart Service
- `getCart()` - Get current cart
- `addToCart(itemId, quantity)` - Add item to cart
- `updateCartItem(itemId, quantity)` - Update item quantity
- `removeFromCart(itemId)` - Remove item from cart
- `clearCart()` - Clear entire cart

### Order Service
- `createOrder(orderData)` - Create new order
- `getOrders()` - Get user orders
- `getOrderById(id)` - Get order details
- `trackOrder(id)` - Track order status

### Auth Service
- `register(email, password, name)` - Create account
- `login(email, password)` - Login user
- `logout()` - Logout user
- `getProfile()` - Get user profile
- `updateProfile(data)` - Update profile

### Reservation Service
- `getAvailableTimes(date)` - Get available booking times
- `createReservation(data)` - Create reservation
- `getReservations()` - Get user reservations
- `cancelReservation(id)` - Cancel reservation

## 🎯 Context API

### CartContext
Manages shopping cart state:
- `cartItems` - Array of items in cart
- `addToCart(item, quantity)` - Add item
- `removeFromCart(itemId)` - Remove item
- `updateQuantity(itemId, quantity)` - Update quantity
- `clearCart()` - Clear all items
- `getTotalPrice()` - Calculate total
- `getTotalItems()` - Count items

### AuthContext
Manages authentication state:
- `user` - Current user object
- `isAuthenticated` - Boolean auth status
- `login(userData)` - Login user
- `logout()` - Logout user
- `signup(userData)` - Register user
- `isLoading` - Loading state

## 📦 Environment Setup

Create a `.env.local` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## ✨ Features Breakdown

### Dynamic Data Rendering
- All components fetch and display data dynamically
- Real-time updates using React hooks
- Conditional rendering based on user state

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interfaces

### State Management
- Cart state persisted across pages
- User authentication state management
- Local storage for tokens and user data

### User Experience
- Toast notifications for actions
- Loading states during API calls
- Form validation
- Error handling

## 🔐 Authentication

The app includes a mock authentication system. For production, replace with:
- JWT token management
- Real API backend
- Secure password hashing
- Session management

## 📞 Support

For issues or questions about the implementation, refer to the component files and service functions.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with React.js and Tailwind CSS
- Icons from Lucide React
- Notifications with React Hot Toast
