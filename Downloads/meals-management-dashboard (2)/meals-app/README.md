# Calorye Hive Business — Meals Management

A pixel-faithful React recreation of the Meals Management screen: red-gradient
sidebar, top header with search and a "Create New Meal Plan" action, and a
multi-section modal for building a recurring meal plan with live delivery-day
selection, a meal-frequency counter, and a searchable/filterable meal curation
panel.

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
│   ├── Sidebar.jsx              # Red-gradient nav, collapse + mobile drawer
│   ├── Header.jsx                # Search bar, icon actions, Create New Meal Plan button
│   ├── Logo.jsx                   # Brand mark
│   ├── MealPlanForm.jsx          # Section 1 — Plan Identity
│   ├── DeliveryCalendar.jsx      # Section 2 — weekday chips + meal-per-day counter
│   ├── ScheduleSection.jsx       # Section 3 — Launch Schedule
│   ├── MealSelectionPanel.jsx    # Curate Menu: search, category filter, selection summary
│   ├── MealCard.jsx               # Individual selectable meal card
│   ├── MealCardSkeleton.jsx      # Loading skeleton for meal cards
│   ├── SectionHeading.jsx        # Numbered step heading (1 / 2 / 3)
│   ├── Input.jsx / Select.jsx / TextArea.jsx / Button.jsx
│   └── Footer.jsx
├── pages/
│   └── MealsManagement.jsx       # Composes the full screen + Create Meal Plan modal
├── services/
│   └── api.js                     # Mock GET /api/meals, POST /api/meal-plans
├── hooks/
│   └── useMeals.js
├── context/
│   └── SidebarContext.jsx
├── utils/
│   └── validation.js              # validateMealSelection (min/max meal rules)
├── App.jsx
└── main.jsx
```

## Features

- Fully controlled meal plan form (React Hook Form) across three sections —
  Plan Identity, Delivery Cadence, Launch Schedule — with inline validation
- Multi-select weekday chips for delivery days, with a "select at least one
  day" rule
- Meal-choices-per-day stepper (min 1, max 6), updates state dynamically
- Meal catalog fetched from a mock API with skeleton loading state, live
  search, and category filtering (All / Breakfast / Lunch / Dinner / Vegan /
  Keto)
- Live selected-meal counter with a minimum-one-meal validation rule
- Cancel (resets the form), Save as Draft, and Publish Plan actions, each with
  its own loading state and success/error toasts
- Sidebar: collapsible on desktop, off-canvas drawer on mobile, active-route
  highlight, hover micro-interactions
- Responsive from 320px through desktop (tested breakpoints: 320 / 768 / 1024 / 1440)
- Accessible: semantic elements, ARIA labels/pressed states on interactive
  controls, visible keyboard focus states, `prefers-reduced-motion` respected

## Notes

- `src/services/api.js` mocks the two endpoints described in the brief
  (`GET /api/meals`, `POST /api/meal-plans`) with simulated latency. Swap in
  real `apiClient` calls (already configured with axios) once a backend is
  available.
- Meal images are placeholder Unsplash URLs — replace with your own asset
  pipeline in production.
