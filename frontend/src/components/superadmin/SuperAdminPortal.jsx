import React from "react";
import { Plus, ShieldCheck, AlertTriangle } from "lucide-react";

export default function SuperAdminPortal({
  superAdminData,
  setIsOnboardModalOpen,
  handleSuperAdminStoreUpdate,
  handleResolveDispute,
  setActiveVendorStoreId,
  setSimulatedHost,
  setActivePortal,
  downloadCsv,
}) {
  if (!superAdminData) return null;

  const disputedSuborders = (superAdminData.suborders || []).filter(
    (s) => s.fulfillment_status === "DISPUTED"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-900 bg-amber-300 px-2.5 py-0.5 rounded-full">
            SuperAdmin HQ • https://hq.barmabiz.co.ke
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-1">
            Platform Owner Control Center — Onboarding, Domains & RBAC
          </h1>
          <p className="text-xs text-stone-500">
            Onboard new merchants, provision their dedicated subdomains & custom
            domains, and toggle which services each vendor admin can access.
          </p>
        </div>
        <button
          onClick={() => setIsOnboardModalOpen(true)}
          className="bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" /> Onboard New Vendor & Provision Domain
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-500">
            Platform GMV
          </span>
          <div className="text-2xl font-extrabold text-stone-900 mt-1 tabular-nums">
            KES {superAdminData.metrics.total_gmv.toLocaleString()}
          </div>
        </div>
        <div className="bg-[#1a1a1a] text-white p-5 rounded-xl">
          <span className="text-xs font-semibold text-emerald-400">
            Platform Commission Earned
          </span>
          <div className="text-2xl font-extrabold mt-1 tabular-nums">
            KES{" "}
            {superAdminData.metrics.platform_commission_earned.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-500">
            Active Escrow Pool
          </span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1 tabular-nums">
            KES {superAdminData.metrics.total_escrow_held.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-500">
            Provisioned Vendor Portals
          </span>
          <div className="text-2xl font-extrabold text-[#008060] mt-1 tabular-nums">
            {superAdminData.metrics.total_vendors} Domains
          </div>
        </div>
      </div>

      {/* SuperAdmin Vendor RBAC & Domain Management Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-700">
            Tenant Domain Registry & Granular Vendor Admin Privileges
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-[11px] font-bold uppercase text-stone-500 bg-stone-50/70">
                <th className="py-3 px-4">Merchant & Owner</th>
                <th className="py-3 px-4">Provisioned Portal & Store Domains</th>
                <th className="py-3 px-4">Onboarding / KYC</th>
                <th className="py-3 px-4">Plan & Fee</th>
                <th className="py-3 px-4">
                  Granular Service Privileges (Click to Toggle)
                </th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {superAdminData.stores.map((st) => (
                <tr key={st.id} className="hover:bg-stone-50/80">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900">{st.name}</div>
                    <div className="text-[11px] text-stone-500">
                      {st.owner_email} • {st.mpesa_phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] space-y-1">
                    <div>
                      <span className="text-stone-400 font-sans">Admin: </span>
                      <span className="font-bold text-stone-800">
                        {st.admin_portal_domain}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-sans">Store: </span>
                      <span className="font-bold text-[#008060]">
                        {st.storefront_domain}
                      </span>
                    </div>
                    {st.custom_domain && (
                      <div>
                        <span className="text-stone-400 font-sans">
                          Custom:{" "}
                        </span>
                        <span className="text-indigo-600 font-semibold">
                          {st.custom_domain}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={st.onboarding_status || "ACTIVE"}
                      onChange={(e) =>
                        handleSuperAdminStoreUpdate(st.id, {
                          onboarding_status: e.target.value,
                          is_verified: e.target.value === "ACTIVE",
                        })
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                        st.onboarding_status === "ACTIVE"
                          ? "bg-emerald-50 text-[#008060] border-emerald-200"
                          : st.onboarding_status === "PENDING_APPROVAL"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      <option value="ACTIVE">ACTIVE (Approved)</option>
                      <option value="PENDING_APPROVAL">
                        PENDING_APPROVAL
                      </option>
                      <option value="SUSPENDED">SUSPENDED</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold">{st.subscription_plan}</div>
                    <div className="text-[11px] text-stone-500">
                      {st.commission_rate}% commission
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() =>
                          handleSuperAdminStoreUpdate(st.id, {
                            perm_b2c_payouts: !st.perm_b2c_payouts,
                          })
                        }
                        className={`px-2 py-1 rounded text-[10px] font-bold border transition ${
                          st.perm_b2c_payouts
                            ? "bg-emerald-100 text-[#008060] border-emerald-300"
                            : "bg-stone-100 text-stone-400 border-stone-200 line-through"
                        }`}
                      >
                        B2C Payouts
                      </button>
                      <button
                        onClick={() =>
                          handleSuperAdminStoreUpdate(st.id, {
                            perm_theme_customizer: !st.perm_theme_customizer,
                          })
                        }
                        className={`px-2 py-1 rounded text-[10px] font-bold border transition ${
                          st.perm_theme_customizer
                            ? "bg-emerald-100 text-[#008060] border-emerald-300"
                            : "bg-stone-100 text-stone-400 border-stone-200 line-through"
                        }`}
                      >
                        Theme Editor
                      </button>
                      <button
                        onClick={() =>
                          handleSuperAdminStoreUpdate(st.id, {
                            perm_discounts: !st.perm_discounts,
                          })
                        }
                        className={`px-2 py-1 rounded text-[10px] font-bold border transition ${
                          st.perm_discounts
                            ? "bg-emerald-100 text-[#008060] border-emerald-300"
                            : "bg-stone-100 text-stone-400 border-stone-200 line-through"
                        }`}
                      >
                        Discounts
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setActiveVendorStoreId(st.id);
                        setSimulatedHost(st.admin_portal_domain);
                        setActivePortal("vendor");
                      }}
                      className="bg-[#1a1a1a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg"
                    >
                      Inspect Portal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SuperAdmin Escrow Dispute Resolution & Arbitration Center */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 bg-red-50/60 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-red-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" /> Escrow Dispute
              Arbitration Center ({disputedSuborders.length} Frozen)
            </h3>
            <p className="text-[11px] text-stone-600">
              Authoritative HQ resolution for buyer-frozen Escrow orders: refund
              buyer via M-Pesa, release funds to vendor B2C wallet, or dismiss
              dispute.
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-red-200 text-red-700">
            {disputedSuborders.length} Active Dispute
            {disputedSuborders.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-[10px] font-bold uppercase text-stone-500 bg-stone-50/70">
                <th className="py-2.5 px-4">Order / Sub-Order</th>
                <th className="py-2.5 px-4">Merchant Store</th>
                <th className="py-2.5 px-4">Buyer & Phone</th>
                <th className="py-2.5 px-4">Escrow Net / Total</th>
                <th className="py-2.5 px-4">Buyer Dispute Reason</th>
                <th className="py-2.5 px-4 text-right">HQ Resolution Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {disputedSuborders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-stone-400 italic"
                  >
                    No frozen Escrow disputes right now — all multi-vendor orders
                    are flowing normally.
                  </td>
                </tr>
              ) : (
                disputedSuborders.map((sub) => (
                  <tr key={sub.id} className="hover:bg-red-50/30">
                    <td className="py-3 px-4 font-mono">
                      <div className="font-bold text-stone-900">
                        {sub.order_number}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        SubOrder #{sub.id} • Ref {sub.mpesa_receipt}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-stone-800">
                      {sub.store_name}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-900">
                        {sub.buyer_name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        +{sub.buyer_phone}
                      </div>
                    </td>
                    <td className="py-3 px-4 tabular-nums">
                      <div className="font-extrabold text-red-700">
                        KES {sub.vendor_net_payout?.toLocaleString()} Frozen
                      </div>
                      <div className="text-[10px] text-stone-500">
                        Gross: KES {sub.subtotal?.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-red-800 font-medium max-w-xs">
                      {sub.dispute_reason || "Buyer reported delivery issue"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex flex-wrap justify-end gap-1.5">
                        <button
                          onClick={() =>
                            handleResolveDispute &&
                            handleResolveDispute(sub.id, "REFUND_BUYER")
                          }
                          className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition"
                        >
                          Refund Buyer
                        </button>
                        <button
                          onClick={() =>
                            handleResolveDispute &&
                            handleResolveDispute(sub.id, "RESOLVE_TO_VENDOR")
                          }
                          className="bg-[#008060] hover:bg-[#006e52] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition"
                        >
                          Release to Vendor
                        </button>
                        <button
                          onClick={() =>
                            handleResolveDispute &&
                            handleResolveDispute(sub.id, "REJECT_DISPUTE")
                          }
                          className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition"
                        >
                          Dismiss Dispute
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SuperAdmin Immutable Security & Financial Audit Log */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#008060]" /> Immutable
              Security, Escrow & B2C Audit Trail (
              {(superAdminData.audit_logs || []).length})
            </h3>
            <p className="text-[11px] text-stone-500">
              Real-time cryptographic ledger of checkouts, PIN-verified Escrow releases, disputes, B2C payouts, and product uploads.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              downloadCsv(
                "barmabiz-platform-stores-audit.csv",
                [
                  "Store Name",
                  "Owner Email",
                  "M-Pesa Phone",
                  "Admin Domain",
                  "Storefront Domain",
                  "Plan",
                  "Commission %",
                  "Escrow Balance (KES)",
                  "Available Balance (KES)",
                  "Total Sales (KES)",
                ],
                superAdminData.stores.map((s) => [
                  s.name,
                  s.owner_email,
                  s.mpesa_phone,
                  s.admin_portal_domain,
                  s.storefront_domain,
                  s.subscription_plan,
                  s.commission_rate,
                  s.escrow_balance,
                  s.available_balance,
                  s.total_sales,
                ])
              )
            }
            className="bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-bold px-3.5 py-2 rounded-xl transition"
          >
            ⬇ Export Tenant Ledger CSV
          </button>
        </div>
        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-[10px] font-bold uppercase text-stone-500 bg-stone-50/70">
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Actor & Role</th>
                <th className="py-2.5 px-4">Event Action</th>
                <th className="py-2.5 px-4">Target</th>
                <th className="py-2.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {(superAdminData.audit_logs || []).length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-stone-400 italic"
                  >
                    No audit events recorded yet in this session — create a product, place an order, or release Escrow to see live audit logs.
                  </td>
                </tr>
              ) : (
                (superAdminData.audit_logs || []).map((al) => (
                  <tr key={al.id} className="hover:bg-stone-50/70">
                    <td className="py-2.5 px-4 font-mono text-[10px] text-stone-400 whitespace-nowrap">
                      {al.created_at?.slice(0, 19).replace("T", " ")}
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="font-mono font-bold text-stone-800">
                        {al.actor_email}
                      </span>{" "}
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                        {al.actor_role}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono font-extrabold text-[#008060] text-[11px]">
                      {al.action}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-stone-700">
                      {al.target}
                    </td>
                    <td className="py-2.5 px-4 text-stone-600">
                      {al.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
