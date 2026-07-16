# Review & Feedback Dashboard

A static, dependency-free recreation of the "Review & Feedback" business dashboard page — pure HTML/CSS/JS, so it works as a GitHub Pages site with zero build step.

## Files
- `index.html` — page structure
- `style.css` — all styling
- `script.js` — dynamic behavior (filter tabs, review list, rating bars, date range, CSV export)

## Run locally
Just open `index.html` in a browser, or serve it:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Push to GitHub
```bash
cd review-dashboard
git init
git add .
git commit -m "Initial commit: Review & Feedback dashboard"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploy with GitHub Pages
1. Push the repo to GitHub (steps above).
2. Go to **Settings → Pages** in your repo.
3. Under "Build and deployment", set source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save — your dashboard will be live at `https://<your-username>.github.io/<your-repo>/`.

## What's dynamic
- **Filter tabs** (All / With Photos / Negative Only / Unanswered) re-render the review list from the `reviewsData` array in `script.js`.
- **Rating Distribution** bars are generated from a `ratingDistribution` object — update the numbers and the bars/percentages recalculate.
- **Date range dropdown** swaps the stat card numbers (demo data — wire this to your real API).
- **Export Report** downloads the current reviews as a CSV.
- **Sidebar** highlights whichever section is clicked (ready to wire up to real routing/pages).

To connect to a real backend, replace `reviewsData` and `ratingDistribution` in `script.js` with a `fetch()` call to your API.
