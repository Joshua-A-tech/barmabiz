import React from "react";
import {
  ShoppingBag,
  Store,
  Eye,
  Globe,
  ShieldCheck,
  Search,
  Plus,
  KeyRound,
  UserCheck,
  Truck,
  ShoppingCart,
} from "lucide-react";

export default function TopCommandBar({
  authSession,
  activePortal,
  setActivePortal,
  selectedStoreSlug,
  vendorDashboard,
  onNavigateHome,
  onSelectVendorAdmin,
  onOpenVendorStorefront,
  onSelectSuperadmin,
  searchQuery,
  setSearchQuery,
  onOpenRegisterModal,
  onOpenLoginModal,
  onOpenTrackModal,
  onOpenCart,
  cartCount = 0,
}) {
  return (
    <header className="bg-[#1a1a1a] text-white h-14 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40 border-b border-white/10 select-none">
      {/* Left: Brand Logo & Role-Specific Workspace Links */}
      <div className="flex items-center gap-4">
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#008060] flex items-center justify-center shadow-inner group-hover:bg-[#009e76] transition">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-white">
              BarmaBiz
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-emerald-400">
              Kenya
            </span>
          </div>
        </div>

        {/* When a VENDOR ADMIN is logged in: They ONLY see their own Store Admin Portal & Marketplace */}
        {authSession?.role === "VENDOR" && (
          <div className="hidden md:flex items-center bg-[#262626] p-1 rounded-lg border border-white/10 text-xs font-medium">
            <button
              onClick={onSelectVendorAdmin}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                activePortal === "vendor"
                  ? "bg-white text-[#1a1a1a] font-bold shadow-sm"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#008060]" />
              {authSession.store_name} Admin
            </button>
            <button
              onClick={() => onOpenVendorStorefront(authSession.store_slug)}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                activePortal === "marketplace" &&
                selectedStoreSlug === authSession.store_slug
                  ? "bg-[#008060] text-white font-bold shadow-sm"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              My Public Storefront
            </button>
            <button
              onClick={onNavigateHome}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                activePortal === "marketplace" && !selectedStoreSlug
                  ? "bg-[#008060] text-white font-bold shadow-sm"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Marketplace
            </button>
          </div>
        )}

        {/* When SUPERADMIN is logged in: They see Platform Owner HQ & Marketplace */}
        {authSession?.role === "SUPERADMIN" && (
          <div className="hidden md:flex items-center bg-[#262626] p-1 rounded-lg border border-white/10 text-xs font-medium">
            <button
              onClick={onSelectSuperadmin}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                activePortal === "superadmin"
                  ? "bg-amber-400 text-[#1a1a1a] font-bold shadow-sm"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Platform Owner HQ
            </button>
            {activePortal === "vendor" && (
              <span className="px-3 py-1.5 rounded-md bg-white text-[#1a1a1a] font-bold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#008060]" />
                Inspecting: {vendorDashboard?.store?.name || "Vendor Store"}
              </span>
            )}
            <button
              onClick={onNavigateHome}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                activePortal === "marketplace"
                  ? "bg-[#008060] text-white font-bold shadow-sm"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Public Mall
            </button>
          </div>
        )}
      </div>

      {/* Center Search */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, SKU, or merchant stores..."
            className="w-full bg-[#303030] hover:bg-[#3a3a3a] focus:bg-[#262626] text-white placeholder-stone-400 text-xs rounded-lg pl-9 pr-12 py-2 border border-white/10 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
        {!authSession ? (
          <>
            <button
              onClick={onOpenRegisterModal}
              className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              Start Selling
            </button>
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1.5 bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-sm"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Admin Sign In
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              setActivePortal(
                authSession.role === "SUPERADMIN" ? "superadmin" : "vendor"
              )
            }
            className="flex items-center gap-1.5 bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
          >
            <UserCheck className="w-3.5 h-3.5" />
            {authSession.role === "SUPERADMIN"
              ? "My HQ Dashboard"
              : "My Store Dashboard"}
          </button>
        )}

        <button
          onClick={onOpenTrackModal}
          className="text-xs font-medium text-stone-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition flex items-center gap-1.5"
        >
          <Truck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden xl:inline">Track Order</span>
        </button>

        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-1.5 bg-[#303030] hover:bg-[#3f3f3f] text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 transition"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
          <span className="tabular-nums">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
