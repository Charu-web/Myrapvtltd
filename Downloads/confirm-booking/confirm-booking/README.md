# Confirm Booking — Calorye Hive Business

A React + Vite implementation of the Confirm Booking screen: red-gradient sidebar (Catering
active), header, and a blue-header booking card with Event Summary, Logistics, Menu Selection
(with togglable custom options), and a live Financial Summary. Pricing recalculates instantly
via Context API whenever options are toggled. Data comes from an in-memory mock API
(`src/services/api.js`) simulating `GET /api/booking/:id` and `POST /api/bookings`.

## Stack

React (Vite) · Tailwind CSS · React Router DOM · Context API · Lucide React · Framer Motion ·
React Hot Toast

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/     # Sidebar, Header, BookingSummary, LogisticsCard, MenuSelectionCard,
│                    # FinancialSummary, BookingActions, Card, Button, Footer
├── context/         # BookingContext.jsx — booking state + live pricing calculations
├── pages/           # ConfirmBooking.jsx — composes the full screen
├── services/        # api.js — mock REST layer with simulated latency
├── data/            # mockBooking.js — seed booking data
├── App.jsx
├── main.jsx
└── index.css
```

## Pricing logic

```
subtotal          = package.pricePerGuest * guestCount
customOptionsTotal = sum of selected custom option prices
serviceFee         = subtotal * 10%
tax                = subtotal * 8%
grandTotal         = subtotal + serviceFee + tax + customOptionsTotal
deposit            = grandTotal * 30%
```

All four totals and the deposit update immediately when a custom option is checked or
unchecked — no page reload needed.
