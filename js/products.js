/*
 * ─────────────────────────────────────────────────────────────
 *  YOUR SHOP CATALOG — this is the only file you need to edit.
 * ─────────────────────────────────────────────────────────────
 *
 *  STORE    → brand name, contact details, currency, shipping copy
 *  PRODUCTS → one entry per item you sell
 *
 *  Product fields:
 *    id          unique, lowercase-with-dashes (used in the URL)
 *    name        display name
 *    category    "tops" | "bottoms" | "accessories" (drives the shop filters)
 *    type        "tee" | "hoodie" | "crew" | "trousers" | "tote"
 *                (only used to draw a placeholder until you add photos)
 *    price       number, in STORE.currency
 *    colors      [{ name, hex }]  — first one is the default
 *    sizes       ["S", "M", ...]  — use ["One size"] for accessories
 *    images      ["images/drift-tee-1.jpg", ...] — leave [] to use the placeholder
 *    description short paragraph
 *    details     bullet points (fabric, fit, care…)
 *    stripeLink  your Stripe Payment Link, e.g. "https://buy.stripe.com/abc123"
 *                Leave "" and the Buy button becomes "Order by email".
 *    tag         optional badge, e.g. "New", "Limited"
 *    soldOut     true to disable buying
 *    featured    true to show this item in the big hero image on the home page
 */

window.STORE = {
  name: "MONTA",
  tagline: "Small-batch clothing, designed and drawn in-house.",
  email: "hello@monta.studio",
  instagram: "https://instagram.com/monta.studio",
  currency: "GBP",
  locale: "en-GB",
  shippingBanner: "Free UK shipping over £100 · Made in runs of 50 · 30-day returns",
};

window.PRODUCTS = [
  {
    id: "drift-tee",
    name: "Drift Tee",
    category: "tops",
    type: "tee",
    price: 38,
    colors: [
      { name: "Bone", hex: "#E8E2D4" },
      { name: "Ink", hex: "#23262B" },
      { name: "Moss", hex: "#6E7357" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [],
    description:
      "A heavyweight boxy tee with a dropped shoulder and a slightly cropped body. Hand-drawn wave print on the back, screen-printed in small batches.",
    details: [
      "240gsm organic cotton jersey",
      "Boxy fit — size down for a closer cut",
      "Water-based screen print",
      "Wash cold, dry flat",
    ],
    stripeLink: "",
    tag: "New",
    soldOut: false,
  },
  {
    id: "field-hoodie",
    name: "Field Hoodie",
    category: "tops",
    type: "hoodie",
    price: 85,
    colors: [
      { name: "Clay", hex: "#B9805F" },
      { name: "Ink", hex: "#23262B" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [],
    description:
      "Brushed-back fleece with a double-layer hood and a deep kangaroo pocket. Embroidered mark on the chest.",
    details: [
      "420gsm brushed-back cotton fleece",
      "Relaxed fit",
      "Tonal chest embroidery",
      "Wash cold, inside out",
    ],
    stripeLink: "",
    tag: "Limited",
    soldOut: false,
    featured: true,
  },
  {
    id: "studio-crew",
    name: "Studio Crew",
    category: "tops",
    type: "crew",
    price: 72,
    colors: [
      { name: "Oat", hex: "#D9CBB0" },
      { name: "Slate", hex: "#5B6470" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [],
    description:
      "The sweatshirt we wear in the studio every day. Ribbed cuffs and hem, raglan sleeves, no fuss.",
    details: [
      "380gsm loopback cotton",
      "Regular fit",
      "Raglan sleeves",
      "Wash cold, dry flat",
    ],
    stripeLink: "",
    tag: "",
    soldOut: false,
  },
  {
    id: "long-walk-trouser",
    name: "Long Walk Trouser",
    category: "bottoms",
    type: "trousers",
    price: 95,
    colors: [
      { name: "Olive", hex: "#5D6046" },
      { name: "Stone", hex: "#BDB4A2" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    images: [],
    description:
      "Wide-leg cotton twill trousers with an elasticated back waist and a straight, cropped hem.",
    details: [
      "Mid-weight cotton twill",
      "Wide leg, cropped length",
      "Elasticated back waist with belt loops",
      "Wash at 30°",
    ],
    stripeLink: "",
    tag: "",
    soldOut: false,
  },
  {
    id: "market-tote",
    name: "Market Tote",
    category: "accessories",
    type: "tote",
    price: 24,
    colors: [{ name: "Natural", hex: "#E6DCC6" }],
    sizes: ["One size"],
    images: [],
    description:
      "A big, sturdy canvas tote with our wave print. Fits a laptop, a week of groceries, or both.",
    details: ["12oz cotton canvas", "40 × 42 × 12 cm", "Inner pocket", "Spot clean"],
    stripeLink: "",
    tag: "",
    soldOut: false,
  },
  {
    id: "night-shift-tee",
    name: "Night Shift Tee",
    category: "tops",
    type: "tee",
    price: 38,
    colors: [{ name: "Midnight", hex: "#2B3346" }],
    sizes: ["S", "M", "L", "XL"],
    images: [],
    description:
      "Our first-ever print, back for one run only. Same heavyweight boxy blank as the Drift Tee.",
    details: ["240gsm organic cotton jersey", "Boxy fit", "Water-based screen print"],
    stripeLink: "",
    tag: "",
    soldOut: true,
  },
];

// Size guide shown on product pages (measurements in cm).
window.SIZE_GUIDE = {
  tops: {
    headers: ["Size", "Chest", "Length", "Sleeve"],
    rows: [
      ["XS", 104, 66, 20],
      ["S", 110, 68, 21],
      ["M", 116, 70, 22],
      ["L", 122, 72, 23],
      ["XL", 128, 74, 24],
    ],
  },
  bottoms: {
    headers: ["Size", "Waist", "Hip", "Inseam"],
    rows: [
      ["28", 72, 104, 72],
      ["30", 77, 109, 73],
      ["32", 82, 114, 74],
      ["34", 87, 119, 75],
      ["36", 92, 124, 76],
    ],
  },
};
