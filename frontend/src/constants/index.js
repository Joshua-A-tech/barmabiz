export const THEME_PRESETS = [
  { name: "Shopify Emerald", hex: "#008060" },
  { name: "Obsidian Slate", hex: "#0f172a" },
  { name: "Royal Indigo", hex: "#4338ca" },
  { name: "Savannah Terracotta", hex: "#9a3412" },
  { name: "Botanical Forest", hex: "#14532d" },
  { name: "Crimson Luxe", hex: "#be123c" },
];

export const SAAS_PLANS = [
  {
    id: "Starter",
    name: "BarmaBiz Starter",
    price: "KES 1,500 / mo",
    amount: 1500,
    commission: 5.0,
    desc: "Essential portal & M-Pesa Escrow storefront for new Kenyan sellers.",
    features: [
      "Provisioned Subdomain ({slug}.barmabiz.co.ke)",
      "M-Pesa STK Push Escrow Checkout",
      "5.0% Platform Commission Fee",
      "Standard Storefront Theme",
    ],
  },
  {
    id: "Growth",
    name: "BarmaBiz Growth",
    price: "KES 3,500 / mo",
    amount: 3500,
    commission: 3.5,
    desc: "Most popular for scaling brands needing custom domains, themes & promos.",
    features: [
      "Everything in Starter",
      "Reduced 3.5% Commission Fee",
      "Custom Brand Domain (www.yourbrand.co.ke)",
      "Shopify Theme Customizer & Promo Codes",
    ],
  },
  {
    id: "Pro",
    name: "BarmaBiz Pro",
    price: "KES 7,500 / mo",
    amount: 7500,
    commission: 2.0,
    desc: "High-volume enterprise plan with lowest 2.0% fee & priority B2C.",
    features: [
      "Everything in Growth",
      "Lowest 2.0% Transaction Fee",
      "Instant Priority M-Pesa B2C Payouts",
      "Official Verified Merchant Badge",
    ],
  },
];
