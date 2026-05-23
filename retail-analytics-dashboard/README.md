# 📊 Retail Sales & Customer Analytics Dashboard

A fully interactive, production-grade analytics dashboard built with vanilla HTML, CSS, and Chart.js — no frameworks, no build tools, zero dependencies to install.

![Dashboard Preview](docs/preview-placeholder.png)

---

## 🚀 Live Demo

Open `index.html` directly in any modern browser — no server required.

---

## ✨ Features

| Feature | Details |
|---|---|
| **KPI Strip** | Revenue, Orders, AOV, Active Customers, Gross Margin, Return Rate — all with YoY deltas |
| **Revenue & Orders Trend** | Monthly combo chart (bar + line) with dual Y-axes |
| **Category Breakdown** | Interactive donut chart — Electronics, Apparel, Home & Living, Sports |
| **Regional Performance** | Horizontal bar chart across 4 regions |
| **Acquisition vs Churn** | Side-by-side monthly cohort analysis |
| **Top Products Table** | 10 products with category badges, margin, and YoY trend badges |
| **Customer Segments** | Retention rate bars by segment tier (Premium → New) |
| **Repeat Purchase Rate** | Monthly trend line chart |
| **Year Filter** | Switch between FY 2022, 2023, 2024 — all charts update instantly |
| **Region & Category Filters** | UI controls ready for data-layer extension |
| **Collapsible Sidebar** | Toggle button for full-width chart viewing |
| **Dark Theme** | Professional dark UI optimized for presentations |
| **Responsive Layout** | Grid collapses gracefully on tablet and mobile |

---

## 📁 Project Structure

```
retail-analytics-dashboard/
│
├── index.html              # Main dashboard page
│
├── assets/
│   ├── dashboard.css       # All styles — dark theme, layout, components
│   ├── dashboard.js        # Chart logic, KPI updates, interactivity
│   └── data.js             # Synthetic retail dataset (swap for real API)
│
├── data/
│   └── retail_sales_data.csv  # Sample order-level CSV (50 rows, downloadable)
│
└── docs/
    └── README.md           # Project documentation
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Pure CSS3 with custom properties (no preprocessor) |
| Charts | [Chart.js 4.4](https://www.chartjs.org/) via CDN |
| Icons | [Tabler Icons](https://tabler.io/icons) webfont |
| Fonts | [DM Sans + DM Mono](https://fonts.google.com/) |
| Data | Synthetic JSON dataset in `assets/data.js` |

**No Node.js, no npm, no build step.** Clone and open.

---

## 📈 Charts Implemented

1. **Combo Bar/Line** — Monthly Revenue ($K) + Orders count, dual Y-axis
2. **Doughnut** — Revenue share by product category
3. **Horizontal Bar** — Revenue by region
4. **Grouped Bar** — Customer acquisition vs churn by month
5. **Line** — Repeat purchase rate trend

---

## 🔌 Connecting Real Data

All data lives in `assets/data.js`. To connect a live backend:

```javascript
// Replace the static RETAIL_DATA object with an API fetch:
async function loadData() {
  const res = await fetch('https://your-api.com/analytics?year=2024');
  const json = await res.json();
  // Map to the RETAIL_DATA shape, then call updateDashboard()
}
```

The dashboard's `updateDashboard()` function is the single entry point — call it whenever your data changes.

---

## 📊 KPI Definitions

| KPI | Definition |
|---|---|
| **Total Revenue** | Sum of all completed order values in the period |
| **Total Orders** | Count of all non-returned orders |
| **Avg Order Value (AOV)** | Revenue ÷ Total Orders |
| **Active Customers** | Customers with ≥1 order in the last 12 months |
| **Gross Margin** | (Revenue − COGS) ÷ Revenue × 100 |
| **Return Rate** | Returned orders ÷ Total orders × 100 |
| **Repeat Purchase Rate** | Customers with ≥2 orders ÷ Total customers × 100 |

---

## 🎨 Design Decisions

- **Dark theme** — Reduces eye strain in long analysis sessions; looks polished in portfolio screenshots
- **DM Sans** — Clean, readable, slightly distinctive — avoids the generic Inter/Roboto look
- **Monospace accent (DM Mono)** — Used for rank numbers and order IDs to reinforce the data-dense context
- **Semantic color encoding** — Blue for primary metrics, Teal for growth/positive, Amber for warning, Purple for segment variety
- **No gradients on charts** — Solid fills ensure legibility at all screen sizes and in PDF exports

---

## 📋 Extending This Project

Ideas to take this further:

- [ ] Add a **date range picker** (replace year dropdown)
- [ ] Add **CSV export** button using the `data.js` arrays
- [ ] Implement **drill-down** — click a category donut slice to filter the product table
- [ ] Add a **geographic choropleth** map using D3.js + world-atlas
- [ ] Connect to **Google Sheets API** as a lightweight live data source
- [ ] Add a **dark/light mode toggle**
- [ ] Integrate with **Supabase** or **Firebase** for real order data

---

## 📄 Data Disclaimer

All data in this project is **fully synthetic** and generated for portfolio demonstration purposes. It does not represent any real company, customer, or transaction.

---

## 📝 License

MIT — use freely for personal and commercial projects.

---

*Built as a portfolio project demonstrating data visualization, dashboard UX, and front-end engineering skills.*
