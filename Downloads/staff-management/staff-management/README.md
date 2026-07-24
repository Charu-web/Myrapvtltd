# Staff Management — Calorye Hive Business

A production-style React + Vite implementation of the Staff Management screen: red-gradient
sidebar, header, dashboard stats, staff directory table, and an Add/Edit Staff modal with
personal info, work details, and permissions sections. Data is served from an in-memory
mock API (`src/services/api.js`) that mimics `GET/POST/PUT/DELETE /api/staff`.

## Stack

React (Vite) · Tailwind CSS · React Router DOM · React Hook Form · React Icons / Lucide React ·
Framer Motion · React Hot Toast

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/       # Sidebar, Header, StaffTable, AddStaffModal, form sections, UI primitives
├── pages/            # StaffManagement.jsx — composes the full screen
├── services/         # api.js — mock REST layer with simulated latency
├── data/              # mockStaff.js — seed data, departments, roles, permission defaults
├── App.jsx
├── main.jsx
└── index.css
```

## Notes

- All staff data lives in memory for the session (`src/services/api.js`); refreshing the
  page resets it back to the seed data in `src/data/mockStaff.js`.
- The Add Staff modal supports both **create** and **edit** flows — opening it from a row's
  action menu pre-fills the form.
- Search filters by name, department, and role. The table paginates 5 rows at a time.
- Sidebar supports desktop collapse and a mobile drawer.
