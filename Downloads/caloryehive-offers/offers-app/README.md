# Caloryehive Business — Active Offers

A pixel-matched recreation of the "Active Offers" screen from the Caloryehive Business dashboard, built with React + Vite + Tailwind CSS.

## Stack

- React 18 (Vite)
- Tailwind CSS
- React Router DOM
- Framer Motion
- React Icons / Lucide React
- React Hook Form
- Axios (mocked network layer)

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build
npm run lint       # lint the project
```

## Project structure

```
src/
├── assets/
├── components/       # Sidebar, Header, SearchBar, CampaignCard, CampaignReach,
│                      # FilterTabs, DiscountForm, Footer, Button, Input, Toaster, ...
├── pages/
│   └── Offers.jsx
├── context/
│   └── UIContext.jsx  # sidebar + toast state
├── services/
│   └── api.js          # mocked network layer (swap for real endpoints)
├── hooks/
│   └── useOffers.js     # fetch + search + filter + pagination
├── utils/
│   └── cn.js
├── App.jsx
└── main.jsx
```

## Notes

- `src/services/api.js` simulates network latency and a small chance of failure so the
  loading / error / empty states are all reachable in normal use. Point the functions in
  that file at a real backend when one is available — the shape of the data they return
  is what the rest of the app expects.
- The sidebar supports desktop collapse (chevron toggle) and a mobile drawer (hamburger
  icon in the header on small screens).
- Toast notifications are rendered from `UIContext` and used by both "Join Promotion" and
  "Launch Discount Promotion" actions.
