// ---------- DATA ----------
// In a real app this would come from your backend / API.
const reviewsData = [
  {
    name: "Amit Sharma",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely loved the ambience and the service was top notch. Will definitely be coming back with friends!",
    hasPhoto: true,
    answered: true
  },
  {
    name: "Priya Nair",
    rating: 4,
    date: "3 days ago",
    text: "Great food, slightly slow delivery today but the quality more than made up for it.",
    hasPhoto: false,
    answered: true
  },
  {
    name: "Rahul Verma",
    rating: 2,
    date: "4 days ago",
    text: "Order arrived cold and the packaging was damaged. Expected better given the price point.",
    hasPhoto: false,
    answered: false
  },
  {
    name: "Sneha Kulkarni",
    rating: 5,
    date: "5 days ago",
    text: "Best biryani in town, hands down. Portion size was generous and the packaging kept everything fresh.",
    hasPhoto: true,
    answered: true
  },
  {
    name: "Vikram Singh",
    rating: 1,
    date: "6 days ago",
    text: "Very disappointed. Wrong order delivered and customer support took too long to respond.",
    hasPhoto: false,
    answered: false
  },
  {
    name: "Ananya Iyer",
    rating: 4,
    date: "1 week ago",
    text: "Consistently good experience every time I order. Just wish there were more vegan options.",
    hasPhoto: true,
    answered: true
  },
  {
    name: "Karan Mehta",
    rating: 3,
    date: "1 week ago",
    text: "Average experience this time around. Nothing stood out, but nothing went wrong either.",
    hasPhoto: false,
    answered: true
  }
];

// Rating distribution: number of reviews per star count (used for the bars)
const ratingDistribution = { 5: 620, 4: 480, 3: 190, 2: 90, 1: 40 };

// ---------- RENDER: RATING DISTRIBUTION ----------
function renderRatingBars() {
  const total = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);
  const container = document.getElementById("ratingBars");
  container.innerHTML = "";

  [5, 4, 3, 2, 1].forEach(star => {
    const count = ratingDistribution[star];
    const pct = total ? Math.round((count / total) * 100) : 0;

    const row = document.createElement("div");
    row.className = "rating-row";
    row.innerHTML = `
      <span class="stars-label">${star} ★</span>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
      <span class="rating-count">${count}</span>
    `;
    container.appendChild(row);
  });
}

// ---------- RENDER: REVIEWS LIST ----------
function renderReviews(filter = "all") {
  const list = document.getElementById("reviewsList");
  list.innerHTML = "";

  let filtered = reviewsData;
  if (filter === "photos") filtered = reviewsData.filter(r => r.hasPhoto);
  if (filter === "negative") filtered = reviewsData.filter(r => r.rating <= 2);
  if (filter === "unanswered") filtered = reviewsData.filter(r => !r.answered);

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state">No reviews match this filter yet.</div>`;
    return;
  }

  filtered.forEach(r => {
    const tags = [];
    if (r.hasPhoto) tags.push(`<span class="tag photo">📷 Photo</span>`);
    if (!r.answered) tags.push(`<span class="tag unanswered">Needs reply</span>`);
    if (r.rating <= 2) tags.push(`<span class="tag negative">Negative</span>`);

    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <div class="review-top">
        <span class="review-name">${r.name}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
      <p class="review-text">${r.text}</p>
      <div class="review-tags">${tags.join("")}</div>
    `;
    list.appendChild(item);
  });
}

// ---------- FILTER TABS ----------
document.getElementById("filterTabs").addEventListener("click", e => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderReviews(btn.dataset.filter);
});

// ---------- SIDEBAR NAV ----------
document.getElementById("nav").addEventListener("click", e => {
  const link = e.target.closest(".nav-item");
  if (!link) return;
  e.preventDefault();
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  link.classList.add("active");
  // In a full app, this is where you'd route to link.dataset.page
});

// ---------- DATE RANGE (demo: nudges the stat numbers a bit) ----------
document.getElementById("dateRange").addEventListener("change", e => {
  const map = {
    "Last 7 Days": { avg: 4.7, total: "312", resp: "96%", sent: 89 },
    "Last 30 Days": { avg: 4.8, total: "1,420", resp: "98%", sent: 92 },
    "Last 90 Days": { avg: 4.6, total: "3,980", resp: "95%", sent: 88 },
    "This Year": { avg: 4.7, total: "12,540", resp: "94%", sent: 90 }
  };
  const d = map[e.target.value];
  document.getElementById("avgRating").textContent = d.avg;
  document.getElementById("totalReviews").textContent = d.total;
  document.getElementById("responseRate").textContent = d.resp;
  document.getElementById("sentiment").textContent = d.sent;
  document.querySelector(".sentiment-fill").style.width = d.sent + "%";
});

// ---------- EXPORT ----------
document.getElementById("exportBtn").addEventListener("click", () => {
  const rows = [
    ["Name", "Rating", "Date", "Review", "Has Photo", "Answered"],
    ...reviewsData.map(r => [r.name, r.rating, r.date, r.text.replace(/,/g, ";"), r.hasPhoto, r.answered])
  ];
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reviews_export.csv";
  a.click();
  URL.revokeObjectURL(url);
});

// ---------- INIT ----------
renderRatingBars();
renderReviews("all");
