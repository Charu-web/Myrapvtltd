# Catering Management Dashboard

A full-stack scaffold for a catering business management platform, matching the provided
Figma layout: red-gradient sidebar, glassmorphism cards, live dashboard stats, bookings,
inquiries, and a catering menu panel.

> **Scope note:** This repo is a real, working foundation — not a finished 11-module SaaS.
> Auth, Dashboard, Bookings (full CRUD), and Inquiries are wired end-to-end (frontend ↔
> backend ↔ MongoDB). Menu, Staff, Inventory, Transactions, Reviews and Settings have
> production-ready **backend CRUD routes + Mongoose models** already in place, and a
> matching **frontend page stub** ready for you to wire up using the exact same pattern as
> `bookings/page.tsx` + `booking.service.ts` + `useDashboard.ts`. Treat Bookings as the
> reference implementation for the rest.

## Stack

**Frontend:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Radix-based UI
primitives (ShadCN pattern) · React Query · Axios · Framer Motion · Recharts · Zustand ·
React Hook Form + Zod · next-themes (dark/light) · Sonner (toasts)

**Backend:** Node.js · Express · MongoDB Atlas · Mongoose · JWT auth · Multer (image
upload) · Helmet, CORS, rate-limiting, centralized error handling

## Folder structure

```
catering-dashboard/
├── frontend/
│   ├── app/
│   │   ├── (auth)/login|signup|forgot-password
│   │   ├── (dashboard)/dashboard|bookings|inquiries|menu|analytics|
│   │   │             staff|inventory|reviews|transactions|settings
│   │   ├── layout.tsx, providers.tsx, globals.css
│   ├── components/{ui,layout,dashboard,shared}
│   ├── context/AuthContext.tsx
│   ├── hooks/useDashboard.ts
│   ├── services/*.service.ts        # Axios calls, one file per resource
│   ├── types/index.ts
│   └── lib/{axios.ts,utils.ts}
└── backend/
    └── src/
        ├── config/db.js
        ├── models/                  # User, Booking, Inquiry, Menu, Staff,
        │                             # Inventory, Transaction, Review, Notification
        ├── controllers/
        ├── routes/
        ├── middleware/{auth,error}.middleware.js
        ├── utils/{asyncHandler,generateToken,upload}.js
        ├── app.js
        └── server.js
```

## Getting started

### 1. Backend

```bash
cd backend
cp .env.example .env      # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev                # nodemon on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev                 # http://localhost:3000
```

Sign up a user at `/signup` — the first account you create is a `staff` role by default;
promote it to `admin`/`manager` directly in MongoDB Atlas (or add an admin seed script)
to unlock booking create/edit/delete actions.

## Extending a module (e.g. Menu)

1. Backend: `menu.routes.js` + `Menu` model already exist with full CRUD.
2. Frontend: add `services/menu.service.ts` (copy `booking.service.ts`), a
   `hooks/useMenu.ts` (copy `useDashboard.ts` pattern), and replace the `ComingSoon`
   placeholder in `app/(dashboard)/menu/page.tsx` with a table/grid + create/edit dialog,
   following `bookings/page.tsx`.

## Environment variables

**backend/.env**
```
MONGO_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## Deployment

**Frontend → Vercel**
1. Push this repo to GitHub.
2. Import the `frontend` directory as the Vercel project root.
3. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL in Vercel's Environment
   Variables settings.
4. Deploy — Vercel auto-detects Next.js.

**Backend → Render**
1. Create a new Web Service on Render, pointing at the `backend` directory.
2. Build command: `npm install`. Start command: `npm start`.
3. Add environment variables (`MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`
   set to your Vercel domain).
4. Use MongoDB Atlas (free M0 cluster works) and allow Render's IPs (or `0.0.0.0/0` for
   simplicity) in Atlas Network Access.

## Notes on what's stubbed vs. complete

| Module | Backend model + CRUD routes | Frontend wired to API |
|---|---|---|
| Auth (login/signup/forgot/JWT/roles) | ✅ | ✅ |
| Dashboard summary + revenue chart | ✅ | ✅ |
| Bookings | ✅ | ✅ full CRUD, search, filter, pagination |
| Inquiries | ✅ (reply/assign/status) | ✅ inbox widget; full inbox page is a `ComingSoon` stub |
| Menu | ✅ generic CRUD | ⏳ stub page |
| Staff | ✅ generic CRUD | ⏳ stub page |
| Inventory | ✅ generic CRUD | ⏳ stub page |
| Transactions | ✅ generic CRUD | ⏳ stub page |
| Reviews | ✅ generic CRUD | ⏳ stub page |
| Analytics / PDF / Excel export | — | ⏳ not implemented |
| Notifications | ✅ model + CRUD | ⏳ not surfaced in UI |
