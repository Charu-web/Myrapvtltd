# Restaurant App - Complete File Structure & Documentation

## 📦 Project Overview

A complete, production-ready restaurant food ordering web application built with:
- **Frontend**: React.js + Tailwind CSS
- **State Management**: Context API
- **API Client**: Axios
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

---

## 📁 Full Directory Structure

```
restaurant-app/                          # Project root
│
├── 📄 Configuration Files
│   ├── package.json                     # Dependencies & scripts
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── postcss.config.js               # PostCSS plugins
│   ├── .gitignore                      # Git ignore rules
│   ├── .env.example                    # Environment variables template
│
├── 📚 Documentation Files
│   ├── README.md                       # Project overview
│   ├── QUICK_START.md                  # Quick start guide
│   ├── SETUP_GUIDE.md                  # Detailed setup instructions
│   └── FILE_STRUCTURE.md               # This file
│
├── public/                              # Static files
│   └── index.html                      # Main HTML file
│
└── src/                                 # Source code
    ├── components/                      # Reusable components
    │   ├── Header.js                   # 📍 Navigation header
    │   ├── Footer.js                   # 📍 Footer component
    │   ├── MenuItem.js                 # 📍 Menu item card
    │   ├── MenuItemDetail.js           # 📍 Item detail modal
    │   └── CartItem.js                 # 📍 Cart item component
    │
    ├── pages/                          # Full page components
    │   ├── Home.js                     # 📍 Homepage
    │   ├── Menu.js                     # 📍 Menu listing
    │   ├── Cart.js                     # 📍 Shopping cart
    │   ├── Checkout.js                 # 📍 Checkout flow
    │   ├── Login.js                    # 📍 Authentication
    │   └── Reservations.js             # 📍 Table reservations
    │
    ├── context/                        # React Context (State)
    │   ├── CartContext.js              # 📍 Cart state management
    │   └── AuthContext.js              # 📍 Auth state management
    │
    ├── services/                       # API Services
    │   ├── axiosInstance.js            # 📍 Axios configuration
    │   └── api.js                      # 📍 API service functions
    │
    ├── hooks/                          # Custom React Hooks
    │   └── useFetch.js                 # 📍 Custom fetch hook
    │
    ├── utils/                          # Utility Functions
    │   └── helpers.js                  # 📍 Helper functions
    │
    ├── App.js                          # 📍 Main app component
    ├── App.css                         # 📍 App-wide styles
    └── index.js                        # 📍 Entry point
```

---

## 📄 Detailed File Documentation

### Configuration Files

#### `package.json`
- Lists all npm dependencies
- Defines build and dev scripts
- Specifies Node.js and npm versions
- Contains project metadata

**Key scripts:**
- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run tests

#### `tailwind.config.js`
- Tailwind CSS customization
- Custom color definitions
- Theme extensions
- PostCSS plugin configuration

**Custom colors:**
- `primary: #FF6B35` (Orange-Red)
- `secondary: #F7931E` (Orange)
- `dark: #1a1a1a` (Black)
- `light: #f5f5f5` (Light Gray)

#### `postcss.config.js`
- PostCSS processing configuration
- Tailwind and autoprefixer plugins
- CSS transformation pipeline

#### `.env.example`
- Template for environment variables
- Shows required configuration options
- Copy to `.env.local` and update values

**Variables:**
- `REACT_APP_API_URL` - API base URL
- `REACT_APP_API_TIMEOUT` - Request timeout

---

### Documentation Files

#### `README.md`
- Project overview
- Features list
- Technology stack
- Installation instructions
- Folder structure
- API documentation
- Context API reference

#### `QUICK_START.md`
- 2-minute quick start
- Feature highlights
- Architecture overview
- Tech stack summary
- Customization guide
- Troubleshooting

#### `SETUP_GUIDE.md`
- Detailed prerequisites
- Step-by-step installation
- Configuration guide
- Development workflow
- Production build steps
- API backend setup
- Deployment options

#### `FILE_STRUCTURE.md`
- This comprehensive file guide
- Complete directory tree
- Individual file descriptions
- Component relationships
- Data flow diagrams

---

### Public Files

#### `public/index.html`
- Main HTML file
- Root div for React app
- Meta tags and favicon
- Google Fonts link
- SEO optimization

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>RestaurantApp</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

### Source Code - Components

#### `components/Header.js`
**Purpose**: Navigation header component

**Features:**
- Logo and branding
- Navigation links (Home, Menu, Reservations)
- Shopping cart badge with item count
- User authentication status
- Logout button
- Mobile menu (hamburger)
- Responsive design

**Imports:**
- React Router (Link, useNavigate)
- Lucide icons
- CartContext (getTotalItems)
- AuthContext (user, logout)

**Props**: None (uses Context)

---

#### `components/Footer.js`
**Purpose**: Footer component

**Sections:**
- Company info
- Quick links
- Contact information
- Business hours

**Features:**
- Responsive grid layout
- Phone, email, address display
- Social links ready
- Copyright notice

---

#### `components/MenuItem.js`
**Purpose**: Menu item card component

**Displays:**
- Item image
- Item name and description
- Rating with star icons
- Price (with discount option)
- Add to cart button
- Favorite/wishlist button

**Props:**
- `item` - Menu item object
- `onViewDetails` - Callback for detail view

**State:**
- `isFavorite` - Wishlist status
- `quantity` - Quantity selector

---

#### `components/MenuItemDetail.js`
**Purpose**: Modal for item details

**Features:**
- Full item image
- Detailed description
- Add-ons selection
- Quantity controls
- Add to cart button
- Back button
- Discount badge

**Modal Overlay:**
- Click outside to close
- Fixed positioning
- Smooth transitions

---

#### `components/CartItem.js`
**Purpose**: Individual cart item row

**Shows:**
- Item image
- Name and price
- Quantity controls (+/-)
- Line total
- Remove button (X)

**Interactions:**
- Adjust quantity
- Delete from cart

---

### Source Code - Pages

#### `pages/Home.js`
**Route**: `/`

**Sections:**
1. Hero Section
   - Tagline and CTA
   - Order Now button

2. Features Section
   - Fast Delivery
   - Fresh & Quality
   - Highly Rated

3. Featured Items
   - 4 featured dishes
   - Links to menu

4. CTA Section
   - Call to action
   - Browse menu button

**Components Used:**
- Links to other pages
- Icon displays

---

#### `pages/Menu.js`
**Route**: `/menu`

**Features:**
1. Search Bar
   - Real-time search
   - Icon display

2. Category Filters
   - All, Burgers, Pizza, Salads, Drinks, Desserts
   - Active state styling

3. Sort Options
   - Most Popular
   - Highest Rated
   - Price Low to High
   - Price High to Low

4. Menu Grid
   - MenuItem components
   - Responsive 1-4 columns
   - Filter and sort logic

**State:**
- `selectedCategory`
- `searchTerm`
- `sortBy`
- `selectedItem` (for detail modal)

**Data:**
- 10+ sample menu items

---

#### `pages/Cart.js`
**Route**: `/cart`

**Sections:**
1. Cart Items List
   - CartItem components
   - Empty state handling
   - Quantity controls

2. Order Summary (Sticky)
   - Subtotal calculation
   - Tax calculation (10%)
   - Delivery fee (free over $50)
   - Grand total
   - Free delivery promotion

3. Action Buttons
   - Proceed to Checkout
   - Clear Cart

**Empty State:**
- Back to Menu link
- Helpful message

---

#### `pages/Checkout.js`
**Route**: `/checkout`

**Multi-Step Flow:**
1. **Step 1: Delivery Details**
   - Street address
   - City
   - ZIP code
   - Phone number
   - Delivery instructions (optional)

2. **Step 2: Payment**
   - Card number
   - Expiry date
   - CVC code

3. **Step 3: Review**
   - Items list
   - Delivery address
   - Order summary
   - Order confirmation

**Features:**
- Step indicator (1, 2, 3)
- Back/Next navigation
- Form validation
- Order ID generation
- Success screen with order details

**Order Summary Sidebar:**
- Real-time calculations
- Break down of costs
- Sticky positioning

---

#### `pages/Login.js`
**Route**: `/login`

**Modes:**
1. **Sign In**
   - Email input
   - Password input
   - Remember me option
   - Sign in button

2. **Sign Up**
   - Name input
   - Email input
   - Password input
   - Create account button

**Features:**
- Toggle between Sign In/Sign Up
- Form validation
- Email and password fields
- Icon inputs
- Demo credentials notice
- Error handling

**Authentication:**
- Saves to AuthContext
- Stores token in localStorage
- Redirects to home on success

---

#### `pages/Reservations.js`
**Route**: `/reservations`

**Features:**
1. **Reservation Form**
   - Full name
   - Email
   - Phone
   - Date picker
   - Time picker
   - Guest count (1-10)
   - Form validation

2. **Reservations List**
   - Display all reservations
   - Status indicator
   - Date, time, guest count
   - Contact information
   - Creation date

**State:**
- `reservations` - Array of bookings
- `showForm` - Toggle form visibility
- `formData` - Form input state

**Protected:**
- Requires authentication

---

### Source Code - Context

#### `context/CartContext.js`
**Purpose**: Global cart state management

**Context Value:**
```javascript
{
  cartItems,           // Array of items
  addToCart,          // Function
  removeFromCart,     // Function
  updateQuantity,     // Function
  clearCart,          // Function
  getTotalPrice,      // Function
  getTotalItems       // Function
}
```

**Features:**
- Add items with quantity
- Remove items
- Update quantities
- Clear entire cart
- Calculate totals
- Persistent state

**Item Structure:**
```javascript
{
  id,        // Unique ID
  name,      // Item name
  price,     // Unit price
  quantity,  // Quantity in cart
  image      // Item image
}
```

---

#### `context/AuthContext.js`
**Purpose**: Authentication state management

**Context Value:**
```javascript
{
  user,              // Current user object
  isLoading,         // Loading state
  login,            // Function
  logout,           // Function
  signup,           // Function
  isAuthenticated   // Boolean
}
```

**Features:**
- User login/logout
- User registration
- Token management
- Local storage persistence
- Protected routes support

**User Object:**
```javascript
{
  id,      // User ID
  name,    // User name
  email,   // Email address
  token    // Auth token
}
```

---

### Source Code - Services

#### `services/axiosInstance.js`
**Purpose**: Axios HTTP client configuration

**Features:**
- Base URL configuration
- Default headers
- Request interceptor
- Token authorization
- Bearer token handling

**Configuration:**
- Base URL from env
- Content-Type: application/json
- Authorization header auto-injection

**Request Interceptor:**
- Adds Bearer token from localStorage
- Only if token exists

---

#### `services/api.js`
**Purpose**: API service functions

**Services:**

1. **menuService**
   - `getCategories()` - Fetch categories
   - `getMenuItems(categoryId)` - Items by category
   - `getMenuItemById(id)` - Single item
   - `searchMenuItems(query)` - Search

2. **cartService**
   - `getCart()` - Get cart
   - `addToCart(itemId, quantity)` - Add item
   - `updateCartItem(itemId, quantity)` - Update
   - `removeFromCart(itemId)` - Remove
   - `clearCart()` - Clear all

3. **orderService**
   - `createOrder(orderData)` - Create
   - `getOrders()` - Get all
   - `getOrderById(id)` - Single order
   - `trackOrder(id)` - Track status

4. **authService**
   - `register(email, password, name)` - Sign up
   - `login(email, password)` - Sign in
   - `logout()` - Sign out
   - `getProfile()` - Get profile
   - `updateProfile(data)` - Update

5. **reservationService**
   - `getAvailableTimes(date)` - Available times
   - `createReservation(data)` - Create
   - `getReservations()` - Get all
   - `cancelReservation(id)` - Cancel

---

### Source Code - Hooks

#### `hooks/useFetch.js`
**Purpose**: Custom hook for data fetching

**Usage:**
```javascript
const { data, loading, error } = useFetch(url);
```

**Returns:**
- `data` - Fetched data
- `loading` - Loading state
- `error` - Error message

**Features:**
- Automatic fetch on mount
- URL dependency tracking
- Error handling
- Loading state management

---

### Source Code - Utils

#### `utils/helpers.js`
**Purpose**: Utility and helper functions

**Functions:**

1. **Formatting**
   - `formatCurrency(amount)` - Format price
   - `formatDate(date)` - Format date
   - `formatTime(time)` - Format time
   - `truncateText(text, length)` - Truncate

2. **Validation**
   - `validateEmail(email)` - Email validation
   - `validatePhone(phone)` - Phone validation

3. **Calculations**
   - `calculateDiscountPrice()` - Discount calc
   - `calculateSavings()` - Savings amount
   - `getTotalPrice()` - Cart total
   - `getAverageRating()` - Average rating

4. **Business Logic**
   - `generateOrderId()` - Generate ID
   - `getDeliveryTimeEstimate()` - ETA
   - `isValidReservationDate()` - Date validation
   - `isWithinBusinessHours()` - Hours check

5. **Utilities**
   - `sortByPrice()` - Price sorting
   - `sortByRating()` - Rating sorting
   - `filterByPriceRange()` - Price filter
   - `getInitials()` - Name initials

---

### Source Code - App

#### `src/App.js`
**Purpose**: Main application component

**Routing Setup:**
- React Router with BrowserRouter
- Route definitions
- Provider wrappers

**Routes:**
- `/` → Home
- `/menu` → Menu
- `/cart` → Cart
- `/checkout` → Checkout
- `/login` → Login
- `/reservations` → Reservations
- `*` → Redirect to home

**Providers:**
- AuthProvider (outer)
- CartProvider (inner)
- Toaster (notifications)

**Layout:**
- Header (sticky)
- Main content (flex-1)
- Footer

---

#### `src/App.css`
**Purpose**: App-wide styles

**Includes:**
- Tailwind directives
- Custom animations
- Scrollbar styling
- Global resets
- Fade and slide animations

**Animations:**
- `fadeIn` - Opacity fade
- `slideIn` - Slide up entrance

---

#### `src/index.js`
**Purpose**: React entry point

**Renders:**
- React StrictMode
- App component
- Root div element

```javascript
ReactDOM.createRoot(document.getElementById('root'))
  .render(<App />);
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                    React Router                       │
│   (URL ↔ Page Navigation)                            │
└─────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────┐
│              AuthContext & CartContext               │
│        (Global State Management)                     │
│  - User: login, logout, signup, profile              │
│  - Cart: items, add, remove, update, totals          │
└─────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────┐
│           Components & Pages                         │
│  - Header, Footer, MenuItem, CartItem, etc           │
│  - Home, Menu, Cart, Checkout, Login, etc            │
└─────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────┐
│            API Services (Axios)                      │
│  - menuService, cartService, authService, etc        │
│  - API calls with token authentication               │
└─────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────┐
│              Backend API Server                      │
│  - Database operations                               │
│  - Business logic                                    │
│  - Authentication                                    │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Component Relationships

```
App.js
├── Header
│   ├── Navigation Links
│   ├── Cart Badge
│   └── Auth Menu
├── Main (Routes)
│   ├── Home
│   │   ├── Hero Section
│   │   ├── Features
│   │   └── Featured Items → MenuItem
│   ├── Menu
│   │   ├── Search Bar
│   │   ├── Filters & Sort
│   │   ├── MenuItem (multiple)
│   │   └── MenuItemDetail Modal
│   ├── Cart
│   │   ├── CartItem (multiple)
│   │   └── Order Summary
│   ├── Checkout
│   │   ├── Step 1: Delivery
│   │   ├── Step 2: Payment
│   │   └── Step 3: Review
│   ├── Login
│   │   ├── Sign In Form
│   │   └── Sign Up Form
│   └── Reservations
│       ├── Reservation Form
│       └── Reservations List
└── Footer
    ├── Company Info
    ├── Links
    └── Contact
```

---

## 📊 State Management Overview

### Global State (Context)

**AuthContext:**
- Current user
- Authentication status
- Login/logout/signup functions
- Loading state

**CartContext:**
- Cart items array
- Add/remove functions
- Quantity management
- Total calculations

### Local Component State

**Home**: None (static content)
**Menu**: selectedCategory, searchTerm, sortBy, selectedItem
**Cart**: None (uses CartContext)
**Checkout**: step, formData, orderPlaced
**Login**: isSignUp, formData, isLoading
**Reservations**: reservations[], showForm, formData

---

## 🔐 Security Features

- ✅ JWT token storage in localStorage
- ✅ Axios interceptor for auth headers
- ✅ Protected pages with auth check
- ✅ Form input validation
- ✅ XSS prevention (React escapes)
- ✅ HTTPS recommended for production

---

## 🚀 Deployment Readiness

**Production Checklist:**
- ✅ Environment variables configured
- ✅ API backend integrated
- ✅ HTTPS enabled
- ✅ Error boundaries (optional)
- ✅ Performance optimized
- ✅ SEO meta tags added
- ✅ Analytics ready
- ✅ Build optimized

---

## 📈 Performance Considerations

- Code splitting via React Router
- Lazy loading images (optional)
- Memoization for components (optional)
- Bundle analysis ready
- CSS minification included
- JavaScript minification included

---

## 🧪 Testing Structure

Tests can be added to:
- `__tests__/` directory
- Suffix `.test.js` or `.spec.js`
- Using Jest (default with CRA)
- React Testing Library for components

---

## 🎓 Learning Path

**Beginner:**
1. Understand folder structure
2. Read Home.js
3. Read App.js routing
4. Explore Header component

**Intermediate:**
1. Study CartContext
2. Explore Menu.js logic
3. Understand Axios integration
4. Learn useCart hook usage

**Advanced:**
1. Study Checkout flow
2. Implement custom hooks
3. Add new features
4. Connect real API

---

## 📝 File Naming Conventions

- **Components**: `PascalCase.js` (e.g., `Header.js`)
- **Pages**: `PascalCase.js` (e.g., `Home.js`)
- **Utils**: `camelCase.js` (e.g., `helpers.js`)
- **Context**: `PascalCase.js` (e.g., `AuthContext.js`)
- **Services**: `camelCase.js` (e.g., `api.js`)
- **Hooks**: `camelCase.js` (e.g., `useFetch.js`)

---

## 🔗 Import Patterns

```javascript
// Components
import Header from '../components/Header';

// Pages
import Home from '../pages/Home';

// Context
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Services
import { menuService } from '../services/api';
import axiosInstance from '../services/axiosInstance';

// Hooks
import { useFetch } from '../hooks/useFetch';

// Utils
import { formatCurrency } from '../utils/helpers';

// Icons (Lucide)
import { ShoppingCart, Menu } from 'lucide-react';

// Routing
import { Link, useNavigate } from 'react-router-dom';

// Notifications
import toast from 'react-hot-toast';
```

---

This comprehensive file structure provides a solid foundation for a scalable, maintainable restaurant ordering application!

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅
