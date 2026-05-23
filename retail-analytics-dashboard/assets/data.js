/* ============================================================
   RETAIL ANALYTICS DASHBOARD  ·  data.js
   Synthetic retail dataset — safe for public portfolio use
   ============================================================ */

const RETAIL_DATA = {

  /* ── Monthly Revenue ($K) & Order counts ─────────────────── */
  monthly: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    2024: {
      revenue: [310, 295, 380, 420, 465, 510, 490, 540, 575, 610, 680, 545],
      orders:  [2400,2250,2900,3200,3500,3800,3650,4000,4300,4600,5100,4100],
    },
    2023: {
      revenue: [275, 260, 340, 375, 415, 455, 440, 480, 515, 545, 610, 490],
      orders:  [2150,2020,2590,2860,3130,3400,3270,3580,3850,4120,4560,3670],
    },
    2022: {
      revenue: [240, 228, 300, 330, 365, 400, 390, 425, 455, 480, 540, 435],
      orders:  [1900,1790,2290,2530,2770,3010,2895,3170,3410,3650,4040,3250],
    },
  },

  /* ── Category breakdown (% of revenue) ──────────────────── */
  categories: {
    labels: ['Electronics','Apparel','Home & Living','Sports'],
    colors: ['#3b82f6','#14b8a6','#f59e0b','#8b5cf6'],
    2024: [38, 24, 19, 19],
    2023: [36, 25, 21, 18],
    2022: [33, 26, 23, 18],
  },

  /* ── Regional revenue ($M) ───────────────────────────────── */
  regions: {
    labels: ['North','West','East','South'],
    colors: ['#3b82f6','#14b8a6','#f59e0b','#8b5cf6'],
    2024: [1.32, 1.09, 0.91, 0.74],
    2023: [1.18, 0.97, 0.81, 0.66],
    2022: [1.04, 0.86, 0.72, 0.58],
  },

  /* ── Customer acquisition vs churn ──────────────────────── */
  cohorts: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    2024: {
      acquired: [820, 710, 890, 980,1050,1120,1060,1200,1280,1350,1580,1240],
      churned:  [290, 320, 280, 260, 240, 220, 230, 210, 200, 190, 170, 210],
    },
    2023: {
      acquired: [720, 620, 780, 860, 930,1000, 950,1060,1140,1210,1410,1110],
      churned:  [330, 360, 320, 300, 280, 260, 270, 250, 240, 230, 210, 250],
    },
    2022: {
      acquired: [630, 542, 685, 755, 815, 875, 830, 930,1000,1060,1240, 975],
      churned:  [370, 400, 360, 340, 315, 290, 300, 280, 265, 255, 230, 275],
    },
  },

  /* ── Customer segments (retention % by tier) ─────────────── */
  segments: [
    { label: 'Premium',    pct: 82, color: '#3b82f6', count: '3,241', ltv: '$1,840' },
    { label: 'Regular',    pct: 61, color: '#14b8a6', count: '5,108', ltv: '$640'   },
    { label: 'Occasional', pct: 38, color: '#f59e0b', count: '3,204', ltv: '$210'   },
    { label: 'New',        pct: 24, color: '#8b5cf6', count: '1,294', ltv: '$76'    },
  ],

  /* ── Repeat Purchase Rate % (monthly) ───────────────────── */
  repeatRate: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    2024: [41,39,43,46,48,51,49,52,54,56,59,57],
    2023: [36,34,38,41,43,45,44,47,49,51,54,52],
    2022: [32,31,34,37,39,41,40,43,45,47,49,48],
  },

  /* ── Top products ────────────────────────────────────────── */
  products: [
    { rank:1, name:'Pro X Laptop 15"',    category:'Electronics', revenue:412000, units:1823,  avgPrice:226, margin:'34%', yoy:'+18%', trend:'positive' },
    { rank:2, name:'Smart TV 55"',         category:'Electronics', revenue:389000, units:1203,  avgPrice:323, margin:'29%', yoy:'+11%', trend:'positive' },
    { rank:3, name:'Running Shoes Pro',    category:'Sports',      revenue:276000, units:4521,  avgPrice:61,  margin:'48%', yoy:'+22%', trend:'positive' },
    { rank:4, name:'Wireless Earbuds X',   category:'Electronics', revenue:241000, units:3876,  avgPrice:62,  margin:'41%', yoy:'+3%',  trend:'neutral'  },
    { rank:5, name:'Sofa Set 3-Piece',     category:'Home & Living',revenue:198000, units:412,  avgPrice:481, margin:'26%', yoy:'-6%',  trend:'negative' },
    { rank:6, name:'Yoga Mat Professional',category:'Sports',      revenue:183000, units:6109,  avgPrice:30,  margin:'56%', yoy:'+31%', trend:'positive' },
    { rank:7, name:'Winter Jacket Parka',  category:'Apparel',     revenue:169000, units:2204,  avgPrice:77,  margin:'44%', yoy:'-4%',  trend:'negative' },
    { rank:8, name:'Coffee Maker Pro',     category:'Home & Living',revenue:142000, units:1880,  avgPrice:76,  margin:'37%', yoy:'+9%',  trend:'positive' },
    { rank:9, name:'Slim Fit Chinos',      category:'Apparel',     revenue:121000, units:3360,  avgPrice:36,  margin:'51%', yoy:'+5%',  trend:'positive' },
    { rank:10,name:'Hiking Boot GTX',      category:'Sports',      revenue:114000, units:1520,  avgPrice:75,  margin:'39%', yoy:'+14%', trend:'positive' },
  ],

  /* ── KPI summary by year ─────────────────────────────────── */
  kpis: {
    2024: { revenue:'$4.82M', orders:'38,214', aov:'$126.10', customers:'12,847', margin:'38.6%', returnRate:'6.2%',
            revDelta:'+12.4%', ordDelta:'+8.7%', aovDelta:'+3.4%', custDelta:'+15.2%', marginDelta:'-1.1pp', retDelta:'-0.8pp',
            revTrend:'positive', ordTrend:'positive', aovTrend:'positive', custTrend:'positive', marginTrend:'negative', retTrend:'positive' },
    2023: { revenue:'$4.29M', orders:'35,146', aov:'$122.00', customers:'11,150', margin:'39.7%', returnRate:'7.0%',
            revDelta:'+9.8%',  ordDelta:'+7.1%', aovDelta:'+2.1%', custDelta:'+10.4%', marginDelta:'+0.4pp', retDelta:'-0.5pp',
            revTrend:'positive', ordTrend:'positive', aovTrend:'positive', custTrend:'positive', marginTrend:'positive', retTrend:'positive' },
    2022: { revenue:'$3.91M', orders:'32,820', aov:'$119.40', customers:'10,098', margin:'39.3%', returnRate:'7.5%',
            revDelta:'+6.2%',  ordDelta:'+5.3%', aovDelta:'+1.4%', custDelta:'+7.9%',  marginDelta:'-0.6pp', retDelta:'+0.3pp',
            revTrend:'positive', ordTrend:'positive', aovTrend:'positive', custTrend:'positive', marginTrend:'negative', retTrend:'negative' },
  },

  /* ── Category color map ──────────────────────────────────── */
  catColors: {
    'Electronics': { bg:'rgba(59,130,246,0.12)', text:'#60a5fa' },
    'Apparel':     { bg:'rgba(20,184,166,0.12)', text:'#2dd4bf' },
    'Home & Living':{ bg:'rgba(245,158,11,0.12)', text:'#fbbf24' },
    'Sports':      { bg:'rgba(139,92,246,0.12)', text:'#a78bfa' },
  },
};
