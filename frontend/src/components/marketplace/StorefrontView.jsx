import React from "react";
import {
  CheckCircle2,
  ShoppingBag,
  Search,
} from "lucide-react";
import ProductCard from "./ProductCard";

export default function StorefrontView({
  storefrontData,
  setDiscountInput,
  setAppliedDiscount,
  showToast,
  openVendorStorefront,
  setIsCartOpen,
  cart,
  searchQuery,
  setSearchQuery,
  displayedProducts,
  setQuickViewProduct,
  addToCart,
}) {
  const store = storefrontData?.store;
  if (!store) return null;

  const themeColor = store.theme_color || "#008060";
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Merchant Custom Announcement Bar */}
      <div
        style={{ backgroundColor: themeColor }}
        className="text-white text-xs font-medium py-2.5 px-4 text-center flex items-center justify-center gap-3 flex-wrap"
      >
        <span>{store.announcement_text}</span>
        {store.perm_discounts && store.discount_code && (
          <button
            onClick={() => {
              setDiscountInput(store.discount_code);
              setAppliedDiscount({
                code: store.discount_code,
                percent: store.discount_percent || 10,
              });
              showToast(
                `Code ${store.discount_code} (${store.discount_percent}% OFF) applied!`
              );
            }}
            className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded font-bold tracking-wider uppercase text-[11px] transition"
          >
            Apply {store.discount_code} ({store.discount_percent}% OFF)
          </button>
        )}
      </div>

      {/* Standalone Store Navigation Header */}
      <div className="border-b border-stone-200 bg-white sticky top-14 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={store.logo_url}
              alt={store.name}
              className="w-12 h-12 rounded-xl object-cover border border-stone-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-extrabold text-stone-900 tracking-tight">
                  {store.name}
                </h1>
                {store.is_verified ? (
                  <span
                    style={{ color: themeColor }}
                    className="inline-flex items-center gap-1 text-xs font-bold bg-stone-100 px-2 py-0.5 rounded-full"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Official Domain
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Pending SuperAdmin KYC
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="font-mono text-[11px] text-emerald-700 font-semibold">
                  https://{store.storefront_domain}
                </span>
                {store.custom_domain && (
                  <span className="font-mono text-[11px] bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                    CNAME: {store.custom_domain}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openVendorStorefront(null)}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-3.5 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition"
            >
              ← All Stores
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{ backgroundColor: themeColor }}
              className="text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm hover:opacity-95 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              Bag ({cartCount})
            </button>
          </div>
        </div>
      </div>

      {/* Standalone Store Hero */}
      <div className="relative bg-stone-900 text-white overflow-hidden">
        <img
          src={store.banner_url}
          alt={store.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${themeColor}E6 0%, rgba(15,23,42,0.75) 100%)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
            {store.category}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl leading-tight">
            {store.hero_title}
          </h2>
          <p className="mt-4 text-base text-white/85 max-w-xl leading-relaxed">
            {store.description}
          </p>
        </div>
      </div>

      {/* Storefront Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">
              Products Catalog ({displayedProducts.length})
            </h3>
            <p className="text-xs text-stone-500">
              Verified merchant stock with guaranteed Safaricom M-Pesa Escrow protection
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${store.name}...`}
              className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              mode="storefront"
              storeThemeColor={themeColor}
              onQuickView={setQuickViewProduct}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
