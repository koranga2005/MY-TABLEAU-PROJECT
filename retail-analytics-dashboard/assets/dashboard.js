/* ============================================================
   RETAIL ANALYTICS DASHBOARD  ·  dashboard.js
   ============================================================ */

'use strict';

/* ── Chart registry ─────────────────────────────────────────── */
const charts = {};

/* ── Helpers ────────────────────────────────────────────────── */
const $ = (id) => document.getElementById(id);
const fmt = (n) => n.toLocaleString();

function getFilters() {
  return {
    year:     parseInt($('yearFilter').value),
    region:   $('regionFilter').value,
    category: $('categoryFilter').value,
  };
}

/* ── Chart defaults ─────────────────────────────────────────── */
const GRID_COLOR  = 'rgba(255,255,255,0.06)';
const TICK_COLOR  = '#555a72';
const TICK_FONT   = { family: "'DM Sans', sans-serif", size: 11 };

function destroyChart(key) {
  if (charts[key]) { charts[key].destroy(); delete charts[key]; }
}

/* ── Revenue & Orders (bar + line combo) ─────────────────────── */
function buildRevOrderChart(year) {
  destroyChart('revOrder');
  const d = RETAIL_DATA.monthly[year];
  charts.revOrder = new Chart($('revOrderChart'), {
    type: 'bar',
    data: {
      labels: RETAIL_DATA.monthly.labels,
      datasets: [
        {
          label: 'Revenue ($K)',
          data: d.revenue,
          backgroundColor: 'rgba(59,130,246,0.75)',
          hoverBackgroundColor: '#3b82f6',
          borderRadius: 4,
          yAxisID: 'yRev',
          order: 2,
        },
        {
          label: 'Orders',
          data: d.orders,
          type: 'line',
          borderColor: '#14b8a6',
          backgroundColor: 'rgba(20,184,166,0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#14b8a6',
          pointBorderWidth: 0,
          borderWidth: 2,
          yAxisID: 'yOrd',
          order: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1c1f28',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#f0f0f4',
          bodyColor: '#8b8fa8',
          padding: 10,
          callbacks: {
            label: (ctx) => {
              if (ctx.datasetIndex === 0) return ` Revenue: $${ctx.raw}K`;
              return ` Orders: ${fmt(ctx.raw)}`;
            },
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: TICK_COLOR, font: TICK_FONT } },
        yRev: {
          position: 'left',
          grid: { color: GRID_COLOR },
          ticks: { color: TICK_COLOR, font: TICK_FONT, callback: (v) => '$' + v + 'K' },
        },
        yOrd: {
          position: 'right',
          grid: { display: false },
          ticks: { color: TICK_COLOR, font: TICK_FONT, callback: (v) => fmt(v) },
        },
      },
    },
  });
}

/* ── Category Donut ──────────────────────────────────────────── */
function buildCategoryChart(year) {
  destroyChart('category');
  charts.category = new Chart($('categoryChart'), {
    type: 'doughnut',
    data: {
      labels: RETAIL_DATA.categories.labels,
      datasets: [{
        data: RETAIL_DATA.categories[year],
        backgroundColor: RETAIL_DATA.categories.colors.map((c) => c + 'cc'),
        hoverBackgroundColor: RETAIL_DATA.categories.colors,
        borderColor: '#1c1f28',
        borderWidth: 2,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '64%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: TICK_COLOR,
            font: TICK_FONT,
            padding: 12,
            usePointStyle: true,
            pointStyleWidth: 8,
          },
        },
        tooltip: {
          backgroundColor: '#1c1f28',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#f0f0f4',
          bodyColor: '#8b8fa8',
          callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.raw}%` },
        },
      },
    },
  });
}

/* ── Regional Horizontal Bar ─────────────────────────────────── */
function buildRegionalChart(year) {
  destroyChart('regional');
  const d = RETAIL_DATA.regions;
  charts.regional = new Chart($('regionalChart'), {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Revenue ($M)',
        data: d[year],
        backgroundColor: d.colors.map((c) => c + 'bb'),
        hoverBackgroundColor: d.colors,
        borderRadius: 4,
        borderSkipped: false,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1c1f28',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#f0f0f4',
          bodyColor: '#8b8fa8',
          callbacks: { label: (ctx) => ` $${ctx.raw.toFixed(2)}M` },
        },
      },
      scales: {
        x: {
          grid: { color: GRID_COLOR },
          ticks: { color: TICK_COLOR, font: TICK_FONT, callback: (v) => '$' + v + 'M' },
        },
        y: { grid: { display: false }, ticks: { color: TICK_COLOR, font: TICK_FONT } },
      },
    },
  });
}

/* ── Cohort Acquisition vs Churn ─────────────────────────────── */
function buildCohortChart(year) {
  destroyChart('cohort');
  const d = RETAIL_DATA.cohorts[year];
  charts.cohort = new Chart($('cohortChart'), {
    type: 'bar',
    data: {
      labels: RETAIL_DATA.cohorts.labels,
      datasets: [
        {
          label: 'Acquired',
          data: d.acquired,
          backgroundColor: 'rgba(20,184,166,0.75)',
          hoverBackgroundColor: '#14b8a6',
          borderRadius: 3,
        },
        {
          label: 'Churned',
          data: d.churned.map((v) => -v),
          backgroundColor: 'rgba(239,68,68,0.65)',
          hoverBackgroundColor: '#ef4444',
          borderRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1c1f28',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#f0f0f4',
          bodyColor: '#8b8fa8',
          callbacks: {
            label: (ctx) => {
              const v = Math.abs(ctx.raw);
              return ctx.datasetIndex === 0 ? ` Acquired: ${fmt(v)}` : ` Churned: ${fmt(v)}`;
            },
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: TICK_COLOR, font: TICK_FONT } },
        y: {
          grid: { color: GRID_COLOR },
          ticks: { color: TICK_COLOR, font: TICK_FONT, callback: (v) => fmt(Math.abs(v)) },
        },
      },
    },
  });
}

/* ── Repeat Purchase Rate Line ───────────────────────────────── */
function buildRPRChart(year) {
  destroyChart('rpr');
  const d = RETAIL_DATA.repeatRate[year];
  charts.rpr = new Chart($('rprChart'), {
    type: 'line',
    data: {
      labels: RETAIL_DATA.repeatRate.labels,
      datasets: [{
        label: 'RPR %',
        data: d,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 2.5,
        pointBackgroundColor: '#f59e0b',
        pointBorderWidth: 0,
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1c1f28',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#f0f0f4',
          bodyColor: '#8b8fa8',
          callbacks: { label: (ctx) => ` RPR: ${ctx.raw}%` },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: TICK_COLOR, font: { ...TICK_FONT, size: 10 } } },
        y: {
          grid: { color: GRID_COLOR },
          ticks: { color: TICK_COLOR, font: { ...TICK_FONT, size: 10 }, callback: (v) => v + '%' },
          min: 20,
        },
      },
    },
  });
}

/* ── KPIs ────────────────────────────────────────────────────── */
function updateKPIs(year) {
  const k = RETAIL_DATA.kpis[year];

  $('kpiRev').textContent     = k.revenue;
  $('kpiOrders').textContent  = k.orders;
  $('kpiAOV').textContent     = k.aov;
  $('kpiCust').textContent    = k.customers;
  $('kpiMargin').textContent  = k.margin;
  $('kpiReturn').textContent  = k.returnRate;

  const setDelta = (id, val, trend) => {
    const el = $(id);
    el.textContent = val + ' vs prior year';
    el.className = 'kpi-delta ' + trend;
  };

  setDelta('kpiRevDelta',    k.revDelta,    k.revTrend);
  setDelta('kpiOrdersDelta', k.ordDelta,    k.ordTrend);
  setDelta('kpiAOVDelta',    k.aovDelta,    k.aovTrend);
  setDelta('kpiCustDelta',   k.custDelta,   k.custTrend);
  setDelta('kpiMarginDelta', k.marginDelta, k.marginTrend);
  setDelta('kpiReturnDelta', k.retDelta,    k.retTrend);
}

/* ── Product Table ───────────────────────────────────────────── */
function renderProductTable() {
  const tbody = $('productTableBody');
  tbody.innerHTML = '';

  RETAIL_DATA.products.forEach((p) => {
    const catStyle = RETAIL_DATA.catColors[p.category] || { bg: 'rgba(255,255,255,0.06)', text: '#8b8fa8' };
    const badgeClass = p.trend === 'positive' ? 'badge-positive' : p.trend === 'negative' ? 'badge-negative' : 'badge-neutral';
    const arrow = p.trend === 'positive' ? '▲' : p.trend === 'negative' ? '▼' : '●';

    tbody.innerHTML += `
      <tr>
        <td>${p.rank}</td>
        <td class="strong">${p.name}</td>
        <td><span class="cat-badge" style="background:${catStyle.bg};color:${catStyle.text};">${p.category}</span></td>
        <td class="strong">$${(p.revenue / 1000).toFixed(0)}K</td>
        <td>${fmt(p.units)}</td>
        <td>$${p.avgPrice}</td>
        <td>${p.margin}</td>
        <td><span class="badge ${badgeClass}">${arrow} ${p.yoy}</span></td>
      </tr>`;
  });

  $('productCount').textContent = RETAIL_DATA.products.length + ' products';
}

/* ── Segment Bars ────────────────────────────────────────────── */
function renderSegments() {
  const container = $('segmentList');
  container.innerHTML = '';

  RETAIL_DATA.segments.forEach((s) => {
    container.innerHTML += `
      <div class="seg-row">
        <div class="seg-label">${s.label}</div>
        <div class="seg-bar-wrap">
          <div class="seg-bar-fill" style="width:${s.pct}%;background:${s.color};"></div>
        </div>
        <div class="seg-pct">${s.pct}%</div>
      </div>`;
  });
}

/* ── Timestamp ───────────────────────────────────────────────── */
function updateTimestamp() {
  $('lastUpdated').textContent = 'Last updated: ' + new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/* ── Nav tabs ────────────────────────────────────────────────── */
function initNav() {
  document.querySelectorAll('.nav-item[data-section]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach((i) => i.classList.remove('active'));
      el.classList.add('active');
      $('section-title').textContent = el.querySelector('span').textContent;
    });
  });
}

/* ── Master update ───────────────────────────────────────────── */
function updateDashboard() {
  const { year } = getFilters();
  updateKPIs(year);
  buildRevOrderChart(year);
  buildCategoryChart(year);
  buildRegionalChart(year);
  buildCohortChart(year);
  buildRPRChart(year);
  renderProductTable();
  renderSegments();
  updateTimestamp();
}

/* ── Init ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  updateDashboard();
});
