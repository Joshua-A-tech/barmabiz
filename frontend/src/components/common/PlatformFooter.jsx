import React from "react";
import {
  ShoppingBag,
  Store,
  ShieldCheck,
  Globe,
  Smartphone,
  Truck,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2,
  Plus,
  KeyRound,
  ShoppingCart,
} from "lucide-react";

export default function PlatformFooter({
  setActiveFooterModal,
  setIsTrackModalOpen,
  setSelectedStoreSlug,
  setStorefrontData,
  setSelectedCategory,
  setSearchQuery,
  setActivePortal,
  categories,
  stores,
  openVendorStorefront,
  setRegisterStep,
  setIsRegisterModalOpen,
  setIsLoginModalOpen,
  setIsCartOpen,
  cart,
}) {
  return (
    <footer className="bg-[#111315] text-stone-300 border-t border-white/10 mt-auto select-none">
      {/* Top Trust & Value Guarantee Strip */}
      <div className="border-b border-white/10 bg-[#17191c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => setActiveFooterModal("escrow")}
            className="flex items-start gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#008060]/20 border border-[#008060]/40 flex items-center justify-center shrink-0 group-hover:bg-[#008060] transition">
              <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:text-white" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white group-hover:text-emerald-400 transition">
                100% M-Pesa Escrow Protection
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                Funds are safely locked in Escrow until your order arrives and is verified.
              </p>
            </div>
          </div>

          <div
            onClick={() => setActiveFooterModal("domains")}
            className="flex items-start gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#008060]/20 border border-[#008060]/40 flex items-center justify-center shrink-0 group-hover:bg-[#008060] transition">
              <Globe className="w-5 h-5 text-emerald-400 group-hover:text-white" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white group-hover:text-emerald-400 transition">
                Isolated Vendor Portals & Domains
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                Every merchant gets a dedicated admin portal (`admin.slug.barmabiz.co.ke`) & custom domain.
              </p>
            </div>
          </div>

          <div
            onClick={() => setActiveFooterModal("about")}
            className="flex items-start gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#008060]/20 border border-[#008060]/40 flex items-center justify-center shrink-0 group-hover:bg-[#008060] transition">
              <Smartphone className="w-5 h-5 text-emerald-400 group-hover:text-white" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white group-hover:text-emerald-400 transition">
                Dual SMS & Email OTP Verified
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                Both merchants and buyers are verified via 6-digit SMS & Email security codes.
              </p>
            </div>
          </div>

          <div
            onClick={() => setIsTrackModalOpen(true)}
            className="flex items-start gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#008060]/20 border border-[#008060]/40 flex items-center justify-center shrink-0 group-hover:bg-[#008060] transition">
              <Truck className="w-5 h-5 text-emerald-400 group-hover:text-white" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white group-hover:text-emerald-400 transition">
                47-County Tracked Express Delivery
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                Real-time rider dispatch & M-Pesa receipt tracking across Nairobi & all 47 counties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 5-Column Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Column 1 (4 cols): About BarmaBiz & Contact */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#008060] flex items-center justify-center shadow-inner">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                BarmaBiz
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Commerce SaaS
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              <strong className="text-stone-200">About BarmaBiz:</strong> Kenya’s next-generation Multi-Tenant Shopify SaaS & M-Pesa Escrow Marketplace. Unlike traditional classifieds, we equip every merchant with their own branded online store, custom domain routing, and isolated admin portal—while protecting every buyer through automated Safaricom Daraja M-Pesa Escrow.
            </p>

            <div className="space-y-1.5 text-xs text-stone-400 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Westlands Commercial Hub, Waiyaki Way, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">+254 700 880 990 • support@barmabiz.co.ke</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setActiveFooterModal("about")}
                className="bg-white/10 hover:bg-[#008060] text-white text-[11px] font-bold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                About BarmaBiz
              </button>
              <button
                onClick={() => setActiveFooterModal("contact")}
                className="bg-white/5 hover:bg-white/15 text-stone-200 text-[11px] font-semibold px-3.5 py-2 rounded-lg border border-white/10 transition"
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Column 2 (2 cols): Marketplace & Storefronts */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Shop & Discover
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedStoreSlug(null);
                    setStorefrontData(null);
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setActivePortal("marketplace");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-emerald-400 transition text-left"
                >
                  All Marketplace Products
                </button>
              </li>
              {categories
                .filter((c) => c !== "All")
                .slice(0, 4)
                .map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedStoreSlug(null);
                        setStorefrontData(null);
                        setSelectedCategory(cat);
                        setActivePortal("marketplace");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="hover:text-emerald-400 transition text-left truncate max-w-full"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              <li className="pt-1 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Verified Storefronts (
                  {
                    stores.filter(
                      (st) => st.is_verified || st.onboarding_status === "ACTIVE"
                    ).length
                  }
                  )
                </span>
              </li>
              {stores
                .filter(
                  (st) => st.is_verified || st.onboarding_status === "ACTIVE"
                )
                .map((st) => (
                  <li key={st.id}>
                    <button
                      onClick={() => {
                        openVendorStorefront(st.slug);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="hover:text-emerald-400 transition text-left flex items-center gap-1.5 truncate max-w-full"
                      title={`Visit https://${st.storefront_domain}`}
                    >
                      <Store className="w-3 h-3 text-[#008060] shrink-0" />
                      <span className="truncate">{st.name}</span>
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 3 (3 cols): Sell on BarmaBiz (For Vendors) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              For Vendors & Merchants
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setRegisterStep(1);
                    setIsRegisterModalOpen(true);
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition text-left flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Open Your Online Store (Register)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hover:text-emerald-400 transition text-left flex items-center gap-1.5"
                >
                  <KeyRound className="w-3 h-3 text-stone-500" />
                  Merchant Admin Portal Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFooterModal("pricing")}
                  className="hover:text-emerald-400 transition text-left"
                >
                  SaaS Subscription Plans & Commissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFooterModal("domains")}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Custom Brand Domains (`.co.ke` CNAME)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFooterModal("escrow")}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Instant M-Pesa Daraja B2C Payouts
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFooterModal("about")}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Vendor RBAC Privileges & KYC Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 (3 cols): Customer Care, Buyer Trust & Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Buyer Care & Policies
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setIsTrackModalOpen(true)}
                  className="text-white hover:text-emerald-400 font-semibold transition text-left flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  Track Order via M-Pesa / Order Ref
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-emerald-400 transition text-left flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-stone-500" />
                  View Multi-Vendor Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFooterModal("escrow")}
                  className="hover:text-emerald-400 transition text-left"
                >
                  How M-Pesa Escrow Protects Buyers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFooterModal("returns")}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Returns, Refunds & Dispute Resolution
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFooterModal("privacy")}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Privacy Policy & Data Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveFooterModal("terms")}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Terms of Service & Merchant SLA
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Payment Badges, Security Architecture & Copyright */}
      <div className="border-t border-white/10 bg-[#0b0c0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
              M-PESA DARAJA 2.0
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-stone-300 font-mono">
              STK Push Express
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-stone-300 font-mono">
              B2C Instant Split
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-stone-300 font-mono">
              PBKDF2 + HMAC-SHA256
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button
              onClick={() => setActiveFooterModal("about")}
              className="hover:text-white transition"
            >
              About Us
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveFooterModal("pricing")}
              className="hover:text-white transition"
            >
              SaaS Pricing
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveFooterModal("escrow")}
              className="hover:text-white transition"
            >
              Escrow Guarantee
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveFooterModal("privacy")}
              className="hover:text-white transition"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveFooterModal("terms")}
              className="hover:text-white transition"
            >
              Terms
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveFooterModal("contact")}
              className="hover:text-white transition"
            >
              Contact
            </button>
          </div>

          <div className="text-stone-500 text-center lg:text-right">
            © {new Date().getFullYear()} BarmaBiz Technologies Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
