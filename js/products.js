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
    id: "monta-polo-sweatshirt",
    name: "MONTA Polo Sweatshirt",
    category: "tops",
    type: "crew",
    price: 65, // TODO: set your real price
    colors: [{ name: "Heather Grey", hex: "#E4E4E2" }],
    sizes: ["S", "M", "L", "XL"], // TODO: confirm the sizes you have
    images: [
      "images/clothes/monta-sweatshirt-front.jpg",
      "images/clothes/monta-sweatshirt-back.jpg",
    ],
    description:
      "Our first flagship piece. A relaxed polo sweatshirt with a two-snap collar, the MONTA wordmark across the chest and an oversized basketball graphic on the back.",
    details: [
      "Heather grey fleece",
      "Polo collar with two-snap placket",
      "MONTA wordmark on the front",
      "Basketball print on the back",
      "Ribbed cuffs and hem",
    ],
    stripeLink: "",
    tag: "Flagship",
    soldOut: false,
    featured: true,
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
