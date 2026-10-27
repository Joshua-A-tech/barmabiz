import React from "react";
import { Plus, ShieldCheck, Check, Lock } from "lucide-react";

export default function VendorHomeTab({
  vendorDashboard,
  openAddProductModal,
}) {
  const store = vendorDashboard?.store;
  if (!store) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900">
            {store.name} — Merchant Admin Portal
          </h1>
          <p className="text-xs text-stone-500">
            Authenticated as{" "}
            <strong>{vendorDashboard.authenticated_as?.email}</strong> on
            dedicated portal{" "}
            <code className="text-[#008060] font-mono">
              https://{store.admin_portal_domain}
            </code>
          </p>
        </div>
        <button
          onClick={openAddProductModal}
          className="bg-[#1a1a1a] hover:bg-[#303030] text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-500">
            Total Gross Sales
          </span>
          <div className="text-2xl font-extrabold text-stone-900 mt-1 tabular-nums">
            KES {store.total_sales.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-500">
            Available M-Pesa Wallet
          </span>
          <div className="text-2xl font-extrabold text-[#008060] mt-1 tabular-nums">
            KES {store.available_balance.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-500">
            Held in Escrow
          </span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1 tabular-nums">
            KES {store.escrow_balance.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-500">
            Commission Tier
          </span>
          <div className="text-2xl font-extrabold text-stone-900 mt-1 tabular-nums">
            {store.commission_rate}%
          </div>
        </div>
      </div>

      {/* Domain & RBAC Privilege Matrix Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
        <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#008060]" /> Your
          Provisioned Domains & SuperAdmin-Assigned Service Privileges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-stone-400 font-semibold">
              1. Dedicated Admin Portal Domain
            </div>
            <div className="font-mono font-bold text-stone-900 mt-1">
              https://{store.admin_portal_domain}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Strictly isolated to your vendor account. Other vendors
              cannot view or access this portal.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-stone-400 font-semibold">
              2. Public Storefront Subdomain
            </div>
            <div className="font-mono font-bold text-[#008060] mt-1">
              https://{store.storefront_domain}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Your customers’ direct shopping link with M-Pesa STK Push.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-stone-400 font-semibold">
              3. Custom Brand Domain (CNAME)
            </div>
            <div className="font-mono font-bold text-indigo-600 mt-1">
              {store.custom_domain || "Not configured"}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Points via DNS CNAME to{" "}
              <code className="font-mono">shops.barmabiz.co.ke</code>.
            </p>
          </div>
        </div>

        {/* Service Permissions Badges */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-stone-600">
            Active Service Privileges:
          </span>
          <span
            className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
              store.perm_b2c_payouts
                ? "bg-emerald-100 text-[#008060]"
                : "bg-red-100 text-red-700"
            }`}
          >
            {store.perm_b2c_payouts ? (
              <Check className="w-3 h-3" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
            M-Pesa B2C Withdrawals:{" "}
            {store.perm_b2c_payouts ? "Enabled" : "Disabled by HQ"}
          </span>
          <span
            className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
              store.perm_theme_customizer
                ? "bg-emerald-100 text-[#008060]"
                : "bg-red-100 text-red-700"
            }`}
          >
            {store.perm_theme_customizer ? (
              <Check className="w-3 h-3" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
            Theme Customizer:{" "}
            {store.perm_theme_customizer ? "Enabled" : "Disabled by HQ"}
          </span>
          <span
            className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
              store.perm_discounts
                ? "bg-emerald-100 text-[#008060]"
                : "bg-red-100 text-red-700"
            }`}
          >
            {store.perm_discounts ? (
              <Check className="w-3 h-3" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
            Discount Engine:{" "}
            {store.perm_discounts ? "Enabled" : "Disabled by HQ"}
          </span>
        </div>
      </div>
    </div>
  );
}
