# Marketing Center

A pixel-oriented clone of the "Marketing Center" restaurant business dashboard, built with React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and Recharts.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
 ├── assets/              static assets
 ├── components/
 │      Sidebar.tsx        collapsible gradient nav sidebar
 │      Header.tsx         logo, search, icon actions, page title, CTA
 │      Footer.tsx         company/services/legal columns + social icons
 │      CampaignCard.tsx   single active-campaign row (stats + actions)
 │      MarketingCard.tsx  marketing-tool card (icon, copy, Configure)
 │      InsightChart.tsx   Recharts bar chart (weekly reach)
 │      InsightPanel.tsx   Marketing Insights side panel
 │      SearchBar.tsx      rounded search input
 │      NotificationMenu.tsx  bell icon + dropdown of recent activity
 ├── pages/
 │      MarketingCenter.tsx  composes the whole dashboard page
 ├── hooks/
 │      useMediaQuery.ts     responsive breakpoint hook
 ├── utils/
 │      cn.ts                className-joining helper
 ├── data/
 │      marketingData.ts     campaigns, tools, insights, nav — dummy data
 ├── App.tsx               shell layout + routes
 └── main.tsx              app entry point
```

## Notes

- All data is driven from `src/data/marketingData.ts` via `.map()` — add a campaign, tool, or nav item there and it renders automatically.
- The sidebar has its own collapse/expand toggle (top-right chevron button) that shrinks it to an icon rail.
- The "Active Campaigns" panel has working client-side status filters (All / Live / Scheduled / Paused).
- Styling is Tailwind-only (no CSS files besides the Tailwind entry point, no inline styles).
- Layout is responsive from mobile through desktop widths.
