# 🍽️ Restaurant App - Master Index & Reference Guide

## 📍 Project Location
```
C:\Users\Asus\.copilot\chats\restaurant-app\
```

---

## 🎯 START HERE

### For Complete Beginners:
1. Read: `QUICK_START.md` (2 minutes)
2. Run: `npm install && npm start`
3. Explore: Visit `http://localhost:3000`

### For Experienced Developers:
1. Read: `README.md` (5 minutes)
2. Browse: `FILE_STRUCTURE.md` (understand architecture)
3. Start: `npm start`
4. Customize: Edit components and pages

### For API Integration:
1. Update: `.env.local` with API_URL
2. Check: `src/services/api.js` for endpoints
3. Connect: Backend API endpoints
4. Test: All features with real data

---

## 📚 Documentation Map

| Document | Time | Purpose | Audience |
|----------|------|---------|----------|
| `QUICK_START.md` | 2 min | Get running fast | Everyone |
| `README.md` | 5 min | Project overview | Developers |
| `SETUP_GUIDE.md` | 10 min | Detailed setup | Beginners |
| `FILE_STRUCTURE.md` | 15 min | Architecture guide | Architects |
| `PROJECT_SUMMARY.md` | 5 min | Complete summary | Project leads |
| This file | 5 min | Navigation guide | Everyone |

---

## 🗂️ File Directory Quick Reference

### Configuration Files
```
├── package.json              [Dependencies & scripts]
├── tailwind.config.js        [Tailwind customization]
├── postcss.config.js         [CSS processing]
├── .env.example              [Environment template]
└── .gitignore                [Git ignore rules]
```

### Source Code Structure
```
src/
├── components/               [Reusable UI components]
│   ├── Header.js            [Navigation]
│   ├── Footer.js            [Footer section]
│   ├── MenuItem.js          [Menu item card]
│   ├── MenuItemDetail.js    [Item details modal]
│   └── CartItem.js          [Cart item row]
├── pages/                    [Full page components]
│   ├── Home.js              [Homepage]
│   ├── Menu.js              [Menu listing page]
│   ├── Cart.js              [Shopping cart]
│   ├── Checkout.js          [Checkout flow]
│   ├── Login.js             [Authentication]
│   └── Reservations.js      [Table booking]
├── context/                  [Global state management]
│   ├── CartContext.js       [Cart state]
│   └── AuthContext.js       [Auth state]
├── services/                 [API services]
│   ├── axiosInstance.js     [Axios setup]
│   └── api.js               [API functions]
├── hooks/                    [Custom React hooks]
│   └── useFetch.js          [Data fetching]
├── utils/                    [Helper functions]
│   └── helpers.js           [Utilities]
├── App.js                    [Main component]
├── App.css                   [App styles]
└── index.js                  [Entry point]
```

---

## 🚀 Commands Reference

### Installation & Setup
```bash
# Navigate to project
cd restaurant-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit API URL in .env.local
# REACT_APP_API_URL=your_api_url
```

### Development
```bash
# Start development server (hot reload)
npm start

# Access app
# http://localhost:3000
```

### Production
```bash
# Build for production
npm run build

# Build output location
# build/ directory

# Serve production build
npx serve -s build
```

### Testing
```bash
# Run tests
npm test

# Watch mode
npm test --watch
```

---

## 🎨 Component Tree

```
App.js (Main Component)
│
├── AuthProvider (Context wrapper)
│   └── CartProvider (Context wrapper)
│       │
│       ├── Header
│       │   ├── Logo/Brand
│       │   ├── Navigation Links
│       │   ├── Cart Badge
│       │   ├── Auth Status
│       │   └── Mobile Menu
│       │
│       ├── Routes
│       │   ├── / → Home
│       │   │   ├── Hero Section
│       │   │   ├── Features (3 cards)
│       │   │   └── Featured Items (4x MenuItem)
│       │   │
│       │   ├── /menu → Menu
│       │   │   ├── Search Bar
│       │   │   ├── Filters & Sort
│       │   │   ├── Grid of MenuItems
│       │   │   └── MenuItemDetail Modal
│       │   │
│       │   ├── /cart → Cart
│       │   │   ├── CartItem (list)
│       │   │   └── Order Summary
│       │   │
│       │   ├── /checkout → Checkout
│       │   │   ├── Step 1: Delivery
│       │   │   ├── Step 2: Payment
│       │   │   ├── Step 3: Review
│       │   │   └── Order Summary
│       │   │
│       │   ├── /login → Login
│       │   │   ├── Sign In Form
│       │   │   └── Sign Up Form
│       │   │
│       │   └── /reservations → Reservations
│       │       ├── Reservation Form
│       │       └── Reservations List
│       │
│       └── Footer
│           ├── Company Info
│           ├── Quick Links
│           ├── Contact Info
│           └── Business Hours
│
└── Toaster (Toast notifications)
```

---

## 🔄 Data Flow Reference

### User Authentication Flow
```
1. User fills login/signup form
2. Form validation
3. API call to authService
4. Receive user data + token
5. Store in AuthContext
6. Save token to localStorage
7. Redirect to home
8. Token included in all API calls
```

### Shopping Flow
```
1. Browse items in Menu page
2. Click item → See MenuItemDetail modal
3. Select quantity & add-ons
4. Click "Add to Cart" → added to CartContext
5. View Cart page
6. Adjust quantities or remove items
7. Click "Proceed to Checkout"
8. Fill 3-step checkout form
9. Create order via API
10. Show confirmation
11. Clear cart
```

### API Call Pattern
```
Component
  ↓
Call API Service (api.js)
  ↓
Axios with interceptor (axiosInstance.js)
  ↓
Add auth token header
  ↓
Send HTTP request
  ↓
Backend API
  ↓
Return response
  ↓
Component receives data
  ↓
Update state/context
  ↓
Re-render UI
```

---

## 💾 State Management Reference

### Cart Context API
```javascript
useCart() → {
  cartItems: [],           // Items in cart
  addToCart(item, qty),   // Add item
  removeFromCart(id),     // Remove item
  updateQuantity(id, qty), // Change quantity
  clearCart(),            // Empty cart
  getTotalPrice(),        // Calculate total
  getTotalItems()         // Count items
}
```

### Auth Context API
```javascript
useAuth() → {
  user: {},               // Current user object
  isAuthenticated: bool,  // Is logged in
  isLoading: bool,       // Loading state
  login(userData),       // Login user
  logout(),              // Logout user
  signup(userData)       // Register user
}
```

---

## 🔗 Key API Endpoints

All endpoints are configured in `src/services/api.js`

### Menu Endpoints
```
GET  /api/categories
GET  /api/menu?category=id
GET  /api/menu/{id}
GET  /api/menu/search?q=query
```

### Cart Endpoints
```
GET    /api/cart
POST   /api/cart
PUT    /api/cart/{id}
DELETE /api/cart/{id}
DELETE /api/cart
```

### Order Endpoints
```
POST   /api/orders
GET    /api/orders
GET    /api/orders/{id}
GET    /api/orders/{id}/track
```

### Auth Endpoints
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/profile
PUT    /api/auth/profile
```

### Reservation Endpoints
```
GET    /api/reservations/available?date=date
POST   /api/reservations
GET    /api/reservations
DELETE /api/reservations/{id}
```

---

## 🎯 Common Development Tasks

### Add a New Page
```bash
# 1. Create page file
src/pages/NewPage.js

# 2. Add route in App.js
<Route path="/newpage" element={<NewPage />} />

# 3. Add navigation link in Header.js
<Link to="/newpage">New Page</Link>
```

### Use Cart Context
```javascript
import { useCart } from '../context/CartContext';

function MyComponent() {
  const { cartItems, addToCart } = useCart();
  // Use cart methods
}
```

### Make API Call
```javascript
import { menuService } from '../services/api';

async function getMenu() {
  try {
    const items = await menuService.getMenuItems('burgers');
  } catch (error) {
    console.error(error);
  }
}
```

### Show Toast Notification
```javascript
import toast from 'react-hot-toast';

toast.success('Item added to cart!');
toast.error('Something went wrong');
toast.loading('Loading...');
```

### Format Values
```javascript
import { formatCurrency, formatDate } from '../utils/helpers';

formatCurrency(99.99)    // $99.99
formatDate('2024-01-01') // January 1, 2024
```

---

## 🐛 Debugging Checklist

- [ ] Open DevTools (F12)
- [ ] Check Console for errors
- [ ] Check Network tab for API calls
- [ ] Check Network responses
- [ ] Verify environment variables in .env.local
- [ ] Check localStorage for tokens
- [ ] Use React DevTools extension
- [ ] Verify API endpoint URLs
- [ ] Check form inputs and validation

---

## 📱 Responsive Design Breakpoints

| Screen | Width | Layout |
|--------|-------|--------|
| Mobile | < 640px | Single column |
| Tablet | 640-1024px | 2-3 columns |
| Desktop | > 1024px | Full responsive grid |

**Tailwind Prefixes:**
- `sm:` - 640px
- `md:` - 768px  
- `lg:` - 1024px
- `xl:` - 1280px

---

## 🎨 Styling Quick Reference

### Tailwind Classes Used
```
Spacing: p-4, m-2, mb-8, pt-6
Colors: text-primary, bg-light, text-dark
Sizing: w-full, h-screen, max-w-2xl
Display: flex, grid, block, hidden
Responsive: md:flex, lg:grid-cols-4
Effects: hover:, transition, shadow-md
```

### Custom Colors
```
primary:    #FF6B35 (Orange-Red)
secondary:  #F7931E (Orange)
dark:       #1a1a1a (Black)
light:      #f5f5f5 (Light Gray)
```

---

## 🚀 Deployment Checklist

- [ ] Update .env with production API URL
- [ ] Run `npm run build`
- [ ] Test build locally
- [ ] Check bundle size
- [ ] Verify no console errors
- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Deploy to Netlify/Vercel/custom server

---

## 📞 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 taken | `PORT=3001 npm start` |
| Module not found | `npm install` again |
| API not working | Check .env.local and API URL |
| Styles not loading | Clear cache, restart server |
| Toasts not showing | Check Toaster in App.js |
| Context error | Ensure Provider wraps app |

---

## 📖 Useful Links

- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hot Toast](https://react-hot-toast.com/)

---

## 🎓 Code Examples

### Using useCart Hook
```javascript
import { useCart } from '../context/CartContext';

export default function AddButton({ item }) {
  const { addToCart } = useCart();
  
  return (
    <button onClick={() => addToCart(item, 1)}>
      Add to Cart
    </button>
  );
}
```

### Making API Call with Error Handling
```javascript
import { menuService } from '../services/api';
import toast from 'react-hot-toast';

async function loadMenu() {
  try {
    setLoading(true);
    const items = await menuService.getMenuItems('burgers');
    setItems(items);
  } catch (error) {
    toast.error('Failed to load menu');
  } finally {
    setLoading(false);
  }
}
```

### Creating Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => (
    <MenuItem key={item.id} item={item} />
  ))}
</div>
```

---

## ✨ Key Features Summary

✅ **6 Pages**: Home, Menu, Cart, Checkout, Login, Reservations  
✅ **5 Components**: Header, Footer, MenuItem, MenuItemDetail, CartItem  
✅ **2 Context APIs**: Cart, Auth  
✅ **5 Services**: Menu, Cart, Orders, Auth, Reservations  
✅ **Responsive Design**: Mobile, tablet, desktop  
✅ **Form Validation**: All forms validated  
✅ **Error Handling**: Toast notifications  
✅ **State Management**: Context API  
✅ **API Integration**: Axios with interceptors  
✅ **Professional UI**: Tailwind CSS  

---

## 🎯 Next Steps

1. **Review**: Spend 5 minutes reading QUICK_START.md
2. **Install**: Run `npm install`
3. **Start**: Run `npm start`
4. **Explore**: Visit all pages and features
5. **Customize**: Change colors, add content
6. **Integrate**: Connect to your backend API
7. **Deploy**: Push to production

---

## 📞 Need Help?

**Check These:**
1. Browser Console (F12)
2. Network Tab (API calls)
3. README.md (overview)
4. SETUP_GUIDE.md (detailed help)
5. FILE_STRUCTURE.md (architecture)

---

## 🎉 You're Ready!

Your production-ready restaurant app is complete!

**Start Now:** `npm install && npm start`

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: 2024
