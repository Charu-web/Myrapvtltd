# Calorye Hive Business — Marketing Campaign Launcher

A pixel-faithful React recreation of the Launch Campaign screen: red-gradient
sidebar, header with search plus Save Draft / Launch Campaign actions,
selectable campaign format cards, a blue campaign details form, and a live
mobile ad preview that updates as you type.

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
│   ├── Sidebar.jsx               # Red-gradient nav, collapse + mobile drawer
│   ├── Header.jsx                 # Search bar, icon actions, Save Draft / Launch Campaign
│   ├── Logo.jsx                    # Brand mark
│   ├── CampaignTypeCard.jsx       # Selectable campaign format card
│   ├── CampaignTypeSkeleton.jsx   # Loading skeleton for format cards
│   ├── CampaignForm.jsx           # Blue Campaign Details card (name + description)
│   ├── AdPreview.jsx               # Live-updating mobile ad preview
│   ├── Input.jsx / TextArea.jsx / Button.jsx
│   └── Footer.jsx
├── pages/
│   └── MarketingCampaign.jsx      # Composes the full screen
├── services/
│   └── api.js                      # Mock GET /api/campaign-formats, POST /api/campaigns
├── hooks/
│   └── useCampaignFormats.js
├── context/
│   └── SidebarContext.jsx
├── App.jsx
└── main.jsx
```

## Features

- Campaign formats fetched from a mock API with a skeleton loading state and
  an error state if the fetch fails
- Clicking a format card selects it dynamically (radio-style, single select)
- Campaign Details form (React Hook Form) with required-field validation and
  inline error messages
- Live ad preview panel that updates instantly as the campaign name or
  selected format changes
- Save Draft and Launch Campaign actions, each with independent loading
  states, disabled-while-submitting behavior, and success/error toasts
- Sidebar: collapsible on desktop, off-canvas drawer on mobile, active-route
  highlight, hover micro-interactions
- Responsive across mobile, tablet, laptop, and desktop breakpoints
- Accessible: semantic elements, ARIA labels/pressed states, visible keyboard
  focus states, `prefers-reduced-motion` respected

## Notes

- `src/services/api.js` mocks the two endpoints described in the brief
  (`GET /api/campaign-formats`, `POST /api/campaigns`) with simulated
  latency. Swap in real `apiClient` calls (already configured with axios)
  once a backend is available.
