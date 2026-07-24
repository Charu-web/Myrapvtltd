# Booking Confirmed — Calorye Hive Business

A React + Vite implementation of the Booking Success screen: red-gradient sidebar (Catering
active), header, and a blue-topped confirmation card with an animated success check, a booking
summary strip (event name, date & time, total value), an alternating vertical "What happens
next?" timeline, and bottom actions to jump to the dashboard or download a PDF receipt.

## Stack

React (Vite) · Tailwind CSS · React Router DOM · Context API · Lucide React · Framer Motion ·
React Hot Toast · jsPDF

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
├── components/    # Sidebar, Header, BookingConfirmationCard, BookingSummary,
│                   # ProgressTimeline, TimelineStep, ActionButtons, Card, Button, Footer
├── context/        # BookingSuccessContext.jsx — fetches booking + timeline data
├── hooks/          # useDownloadReceipt.js — receipt download loading state
├── utils/          # generateReceiptPdf.js — jsPDF receipt builder
├── pages/          # BookingSuccess.jsx, CateringDashboard.jsx (nav target placeholder)
├── services/       # api.js — mock REST layer with simulated latency
├── data/           # mockBookingSuccess.js — seed booking + timeline data
├── App.jsx
├── main.jsx
└── index.css
```

## Notes

- Timeline steps alternate left/right around a connecting vertical line; completed steps show
  a filled blue check, pending steps show a gray outline icon matching their category.
- "Download Receipt" generates a real PDF client-side via jsPDF and triggers a browser
  download — no server round trip needed.
- "Go To Catering Dashboard" routes to a placeholder `/dashboard` page since no dashboard
  screen was in scope for this build.
