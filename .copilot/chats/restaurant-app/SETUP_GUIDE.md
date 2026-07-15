# Restaurant App - Complete Setup Guide

This document provides a detailed guide for setting up and running the Restaurant App.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the App](#running-the-app)
5. [Development Workflow](#development-workflow)
6. [Building for Production](#building-for-production)
7. [API Backend Setup](#api-backend-setup)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 14.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version` and `npm --version`

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)

- **Code Editor**: Recommended editors:
  - VS Code: [code.visualstudio.com](https://code.visualstudio.com/)
  - WebStorm: [jetbrains.com/webstorm](https://www.jetbrains.com/webstorm/)

## Installation

### Step 1: Clone or Extract the Project

```bash
cd path/to/restaurant-app
```

### Step 2: Install Dependencies

Run the following command to install all required npm packages:

```bash
npm install
```

This will install packages listed in `package.json`:
- React and React DOM
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Lucide React for icons
- React Hot Toast for notifications

### Step 3: Verify Installation

```bash
npm list
```

You should see a tree of installed packages without errors.

## Configuration

### Create Environment File

1. Create a `.env.local` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env.local
```

2. Update the file with your configuration:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Optional: API timeout (in milliseconds)
REACT_APP_API_TIMEOUT=5000
```

### Tailwind CSS Configuration

The project includes:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- Custom colors defined in tailwind.config.js

## Running the App

### Development Mode

Start the development server:

```bash
npm start
```

The app will automatically open in your default browser at `http://localhost:3000`

Features of development mode:
- Hot module replacement (automatic reload on code changes)
- Detailed error messages
- React DevTools integration

### Accessing the App

Once running, you can:
- View homepage: `http://localhost:3000/`
- Browse menu: `http://localhost:3000/menu`
- View cart: `http://localhost:3000/cart`
- Login: `http://localhost:3000/login`
- Make reservations: `http://localhost:3000/reservations`

### Test Credentials

For demo purposes, you can use any email/password combination:
- Email: `test@example.com`
- Password: `password123`

## Development Workflow

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.js
│   ├── Footer.js
│   ├── MenuItem.js
│   ├── MenuItemDetail.js
│   └── CartItem.js
├── pages/              # Page components (route pages)
│   ├── Home.js
│   ├── Menu.js
│   ├── Cart.js
│   ├── Checkout.js
│   ├── Login.js
│   └── Reservations.js
├── context/            # React Context for state management
│   ├── CartContext.js
│   └── AuthContext.js
├── services/           # API service functions
│   ├── axiosInstance.js
│   └── api.js
├── hooks/              # Custom React hooks
│   └── useFetch.js
├── utils/              # Utility functions
│   └── helpers.js
└── App.js              # Main app component
```

### Making Changes

1. **Edit Components**: Update files in `src/components/` or `src/pages/`
2. **Auto-reload**: Changes are automatically reloaded in the browser
3. **Check Console**: Look for errors in browser DevTools (F12)

### Common Development Tasks

**Add a new page:**
1. Create file in `src/pages/PageName.js`
2. Add route in `src/App.js`
3. Create navigation link in `src/components/Header.js`

**Add a new component:**
1. Create file in `src/components/ComponentName.js`
2. Import and use in pages or other components

**Add API service:**
1. Add function in `src/services/api.js`
2. Use in components with Axios

## Building for Production

### Create Optimized Build

```bash
npm run build
```

This creates a `build/` folder with:
- Minified and optimized files
- Source maps for debugging
- Static assets

### Build Statistics

The build process outputs:
- File sizes
- Compression metrics
- Recommendation for bundle size

### Testing Production Build Locally

```bash
npm install -g serve
serve -s build
```

This serves the production build on `http://localhost:5000`

## API Backend Setup

The app expects a backend API. Here's what you need:

### API Endpoints Required

#### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

#### Menu
- `GET /api/categories` - Get all categories
- `GET /api/menu?category=id` - Get menu items by category
- `GET /api/menu/{id}` - Get item details
- `GET /api/menu/search?q=query` - Search items

#### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/{id}` - Update cart item
- `DELETE /api/cart/{id}` - Remove from cart
- `DELETE /api/cart` - Clear cart

#### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get order details
- `GET /api/orders/{id}/track` - Track order

#### Reservations
- `GET /api/reservations/available?date=date` - Get available times
- `POST /api/reservations` - Create reservation
- `GET /api/reservations` - Get user reservations
- `DELETE /api/reservations/{id}` - Cancel reservation

### Example Backend Response Format

**Menu Items:**
```json
{
  "id": 1,
  "name": "Classic Burger",
  "category": "burgers",
  "price": 12.99,
  "image": "url",
  "description": "Description",
  "rating": 4.5,
  "reviews": 128,
  "originalPrice": 14.99,
  "discount": 10,
  "addons": [
    {"id": 1, "name": "Extra Cheese", "price": 1.00}
  ]
}
```

**Orders:**
```json
{
  "id": 1,
  "orderId": "ORD-xxxxx",
  "items": [...],
  "total": 50.00,
  "status": "delivered",
  "deliveryAddress": {...},
  "createdAt": "2024-01-01T12:00:00Z"
}
```

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is occupied:

```bash
# Linux/Mac: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Windows: Use a different port
PORT=3001 npm start
```

### Dependencies Installation Issues

```bash
# Clear cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### API Connection Issues

1. Verify `REACT_APP_API_URL` in `.env.local`
2. Check backend server is running
3. Look for CORS errors in browser console
4. Verify API endpoints match

### Build Issues

```bash
# Remove build directory
rm -rf build/

# Rebuild
npm run build
```

### React DevTools Issues

- Install React DevTools browser extension
- Clear browser cache (Ctrl+Shift+Delete)
- Restart development server

### TypeScript Issues (if adding TypeScript)

```bash
# Install TypeScript
npm install typescript --save-dev

# Generate tsconfig.json
npx tsc --init
```

## Performance Optimization

### Code Splitting

Routes are automatically code-split by React Router. For additional splitting:

```javascript
import { lazy, Suspense } from 'react';

const Component = lazy(() => import('./Component'));

// Usage
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

### Image Optimization

- Use responsive images with `srcSet`
- Lazy load images with Intersection Observer
- Consider using image optimization services

### Bundle Analysis

```bash
npm install --save-dev source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

## Deployment

### Netlify

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build/`

### Vercel

1. Import project from GitHub
2. Select framework: Create React App
3. Deploy with one click

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

## Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

## Getting Help

- Check browser console for errors (F12)
- Review network tab for API issues
- Check React DevTools for component state
- Review Redux DevTools (if Redux added)

---

For more information, refer to `README.md`
