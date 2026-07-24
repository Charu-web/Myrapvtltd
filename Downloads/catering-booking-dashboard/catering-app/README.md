# Calorye Hive Business — Catering Booking Dashboard

A pixel-faithful React recreation of the Catering Booking screen: a red-gradient
sidebar, top header with search, a two-column booking form with live financial
calculations, dynamic menu package selection, and a four-column footer.

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router DOM
- React Hook Form
- Lucide React + React Icons
- Framer Motion
- Axios
- Context API (sidebar collapse / mobile drawer state)
- React Hot Toast

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/
├── components/
│   ├── Sidebar.jsx           # Red-gradient nav, collapse + mobile drawer
│   ├── Header.jsx             # Search bar + support/notifications/settings/profile icons
│   ├── Logo.jsx                # Brand mark
│   ├── BookingForm.jsx        # Event basics + guest/logistics fields
│   ├── FinancialSummary.jsx   # Live totals, confirm/draft actions
│   ├── PackageCard.jsx        # Selectable menu package
│   ├── PackageSkeleton.jsx    # Loading skeleton for packages
│   ├── Input.jsx / Select.jsx / TextArea.jsx / Button.jsx
│   └── Footer.jsx
├── pages/
│   └── CateringBooking.jsx    # Composes the full screen
├── services/
│   └── api.js                  # Mock GET /api/packages, POST /api/bookings
├── hooks/
│   └── usePackages.js
├── context/
│   └── SidebarContext.jsx
├── utils/
│   └── pricing.js              # calculateEstimatedTotal / calculateDeposit
├── App.jsx
└── main.jsx
```

## Features

- Fully controlled booking form (React Hook Form) with required-field validation
  and inline error messages
- Dynamic menu packages fetched from a mock API, with skeleton loading state
- Live price calculation: `Estimated Total = guestCount × packagePrice`,
  `Deposit = 30% of Estimated Total`
- Confirm Booking / Save as Draft flows with loading spinners and success/error
  toasts
- Sidebar: collapsible on desktop, off-canvas drawer on mobile, active-route
  highlight, hover micro-interactions
- Responsive from 320px through desktop (tested breakpoints: 320 / 768 / 1024 / 1440)
- Accessible: semantic elements, ARIA labels on icon-only buttons, visible
  keyboard focus states, `prefers-reduced-motion` respected

## Notes

- `src/services/api.js` mocks the two endpoints described in the brief
  (`GET /api/packages`, `POST /api/bookings`) with simulated latency. Swap in
  real `apiClient` calls (already configured with axios) once a backend is
  available.
- Mock data and copy are placeholders only — no hardcoded UI structure.
