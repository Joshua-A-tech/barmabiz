import React from "react";
import {
  Sparkles,
  Store,
  Sliders,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import ProductCard from "./ProductCard";

export default function CentralMarketplaceView({
  stores,
  demoAccounts,
  categories,
  selectedCategory,
  setSelectedCategory,
  displayedProducts,
  openVendorStorefront,
  handleSwitchIdentity,
  setIsRegisterModalOpen,
  setActivePortal,
  setQuickViewProduct,
  addToCart,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner + 3-Step Escrow Trust Bar */}
      <div className="bg-[#1a1a1a] rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden border border-stone-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#008060]/25 border border-[#008060]/50 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Multi-Tenant Shopify SaaS & M-Pesa Escrow Mall
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Independent Brands.{" "}
              <span className="text-[#00a67c]">
                Zero-Risk M-Pesa Escrow.
              </span>
            </h1>
            <p className="text-stone-300 text-sm mt-3 leading-relaxed max-w-xl">
              Shop directly from verified Kenyan merchants on their own
              custom domains, or combine items across multiple stores in one
              M-Pesa STK Push. Your money is held in Escrow until your order
              arrives.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="bg-[#008060] hover:bg-[#009e76] text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-2 shadow-lg"
              >
                <Store className="w-4 h-4" /> Open Your Online Store
              </button>
              <button
                onClick={() => setActivePortal("vendor")}
                className="bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-5 py-3 rounded-xl border border-white/15 transition flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-emerald-400" /> Open Shopify Merchant Admin
              </button>
            </div>
          </div>

          {/* Right: Visual 3-Step Escrow Trust Card */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> How BarmaBiz Escrow Protects Every Order
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#008060] text-white font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <div className="font-bold text-white">
                    One M-Pesa STK Push Checkout
                  </div>
                  <div className="text-stone-400 text-[11px]">
                    Pay once from your phone—even when buying from 3 different shops.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <div className="font-bold text-white">
                    Funds Locked in BarmaBiz Escrow
                  </div>
                  <div className="text-stone-400 text-[11px]">
                    Each vendor sees the order as Paid in Escrow and dispatches your rider.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-400 text-black font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <div className="font-bold text-white">
                    Automatic B2C Split Payout on Delivery
                  </div>
                  <div className="text-stone-400 text-[11px]">
                    Once delivered, the seller’s net payout unlocks for instant M-Pesa B2C withdrawal.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Independent Merchant Stores & Assigned Domains */}
      <div>
        <h2 className="text-lg font-extrabold text-stone-900 mb-4 flex items-center gap-2">
          <Store className="w-5 h-5 text-[#008060]" /> Onboarded Merchant Storefronts & Provisioned Domains
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stores.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="h-24 relative bg-stone-900">
                  <img
                    src={st.banner_url}
                    alt={st.name}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-black/70 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {st.subscription_plan} Plan ({st.commission_rate}% fee)
                  </span>
                </div>
                <div className="p-4 pt-0">
                  <div className="flex items-end justify-between -mt-6 mb-2">
                    <img
                      src={st.logo_url}
                      alt={st.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow bg-white"
                    />
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        st.onboarding_status === "ACTIVE"
                          ? "bg-emerald-100 text-[#008060]"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {st.onboarding_status}
                    </span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-base flex items-center gap-1.5">
                    {st.name}
                    {st.is_verified && (
                      <CheckCircle2 className="w-4 h-4 text-[#008060]" />
                    )}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                    {st.description}
                  </p>

                  {/* Domain Routing Badges */}
                  <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1 text-[11px] font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400 font-sans">
                        Storefront:
                      </span>
                      <span className="text-[#008060] font-bold">
                        {st.storefront_domain}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400 font-sans">
                        Admin Portal:
                      </span>
                      <span className="text-stone-700 font-semibold">
                        {st.admin_portal_domain}
                      </span>
                    </div>
                    {st.custom_domain && (
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400 font-sans">
                          Custom DNS:
                        </span>
                        <span className="text-indigo-600 font-semibold">
                          {st.custom_domain}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  onClick={() => openVendorStorefront(st.slug)}
                  className="flex-1 bg-[#1a1a1a] hover:bg-[#008060] text-white text-xs font-bold py-2.5 rounded-xl transition text-center"
                >
                  Visit Storefront
                </button>
                <button
                  onClick={() => {
                    const acc = demoAccounts.find((a) => a.store_id === st.id);
                    if (acc) handleSwitchIdentity(acc);
                  }}
                  className="px-3 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-700"
                  title="Sign into this vendor's isolated portal"
                >
                  Portal Login
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Marketplace Products */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-stone-900">
              All Verified Marketplace Products ({displayedProducts.length})
            </h2>
            <p className="text-xs text-stone-500">
              Click any product for Quick View or add items from multiple stores to your bag
            </p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-[#1a1a1a] text-white shadow-xs"
                    : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              mode="marketplace"
              onQuickView={setQuickViewProduct}
              onAddToCart={addToCart}
              onOpenStorefront={openVendorStorefront}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
