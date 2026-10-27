import React from "react";
import {
  MapPin,
  AlertCircle,
  CheckCircle2,
  Lock,
  Truck,
} from "lucide-react";

export default function VendorOrdersTab({
  vendorDashboard,
  orderFilterTab,
  setOrderFilterTab,
  filteredVendorOrders,
  downloadCsv,
  handleUpdateOrderStatus,
}) {
  const store = vendorDashboard?.store;
  if (!store) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-extrabold text-lg text-stone-900">
            Orders & Escrow Fulfillment
          </h2>
          <p className="text-xs text-stone-500">
            Buyer funds are held in BarmaBiz M-Pesa Escrow and released to your available wallet immediately upon delivery confirmation.
          </p>
        </div>
        {/* Polaris Status Filter Tabs + CSV Export */}
        <div className="flex flex-wrap items-center gap-2 self-start">
          <div className="flex items-center bg-stone-200/80 p-1 rounded-xl text-xs font-bold">
            {[
              { id: "ALL", label: `All (${vendorDashboard.suborders.length})` },
              {
                id: "UNFULFILLED",
                label: `Unfulfilled (${
                  vendorDashboard.suborders.filter(
                    (o) =>
                      o.fulfillment_status === "CONFIRMED" ||
                      o.fulfillment_status === "PACKED"
                  ).length
                })`,
              },
              {
                id: "DISPATCHED",
                label: `In Transit (${
                  vendorDashboard.suborders.filter(
                    (o) => o.fulfillment_status === "DISPATCHED"
                  ).length
                })`,
              },
              {
                id: "DELIVERED",
                label: `Delivered (${
                  vendorDashboard.suborders.filter(
                    (o) => o.fulfillment_status === "DELIVERED"
                  ).length
                })`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setOrderFilterTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  orderFilterTab === tab.id
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              downloadCsv(
                `${store.slug}-orders.csv`,
                [
                  "Order Number",
                  "M-Pesa Receipt",
                  "Buyer Name",
                  "Buyer Phone",
                  "Gross Subtotal (KES)",
                  "Commission (KES)",
                  "Net Payout (KES)",
                  "Fulfillment Status",
                  "Escrow Released",
                ],
                filteredVendorOrders.map((o) => [
                  o.order_number,
                  o.mpesa_receipt,
                  o.buyer_name,
                  o.buyer_phone,
                  o.subtotal,
                  o.commission_amount,
                  o.vendor_net_payout,
                  o.fulfillment_status,
                  o.escrow_released ? "YES" : "NO",
                ])
              )
            }
            className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-bold px-3.5 py-2 rounded-xl shadow-2xs transition"
          >
            ⬇ Export Orders CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-[11px] uppercase text-stone-500 bg-stone-50/90 font-bold">
                <th className="py-3.5 px-4">Order & Receipt</th>
                <th className="py-3.5 px-4">Customer & Destination</th>
                <th className="py-3.5 px-4">Line Items</th>
                <th className="py-3.5 px-4">Financial Split</th>
                <th className="py-3.5 px-4">Escrow & PIN State</th>
                <th className="py-3.5 px-4 text-right">
                  Fulfillment Progression
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredVendorOrders.map((sub) => (
                <tr key={sub.id} className="hover:bg-stone-50/70 transition">
                  <td className="py-4 px-4 align-top">
                    <div className="font-mono font-extrabold text-stone-900">
                      #{sub.order_number}
                    </div>
                    <div className="font-mono text-[10px] text-[#008060] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded inline-block mt-1">
                      M-Pesa: {sub.mpesa_receipt}
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top">
                    <div className="font-bold text-stone-900">
                      {sub.buyer_name}
                    </div>
                    <div className="font-mono text-[11px] text-stone-500">
                      {sub.buyer_phone}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate max-w-[180px]">
                        {sub.delivery_address}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top">
                    <div className="space-y-1">
                      {(sub.items || []).map((item, idx) => (
                        <div
                          key={idx}
                          className="text-[11px] text-stone-700 flex items-center gap-1.5"
                        >
                          <span className="font-mono font-bold bg-stone-100 px-1.5 py-0.5 rounded text-stone-800">
                            {item.quantity}×
                          </span>
                          <span className="font-semibold truncate max-w-[160px]">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top tabular-nums">
                    <div className="font-extrabold text-stone-900 text-sm">
                      KES {sub.vendor_net_payout.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      Gross: KES {sub.subtotal.toLocaleString()} • Fee: KES{" "}
                      {sub.commission_amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top">
                    {sub.fulfillment_status === "DISPUTED" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                        <AlertCircle className="w-3 h-3" /> Disputed (Escrow Frozen)
                      </span>
                    ) : sub.escrow_released ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-[#008060]">
                        <CheckCircle2 className="w-3 h-3" /> Released to Wallet
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        <Lock className="w-3 h-3" /> Held in Escrow
                      </span>
                    )}
                    <div className="text-[10px] font-bold text-stone-500 mt-1.5 uppercase tracking-wider">
                      Stage: {sub.fulfillment_status}
                    </div>
                    <div className="font-mono text-[10px] text-stone-400 mt-0.5">
                      Buyer Release PIN: <strong>{sub.delivery_pin || "4821"}</strong>
                    </div>
                    {sub.dispute_reason && (
                      <div className="text-[10px] text-red-600 mt-1 max-w-[180px] leading-tight">
                        Dispute: "{sub.dispute_reason}"
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 align-top text-right">
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      {sub.fulfillment_status === "CONFIRMED" && (
                        <button
                          onClick={() =>
                            handleUpdateOrderStatus(sub.id, "PACKED")
                          }
                          className="bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition"
                        >
                          1. Mark Packed
                        </button>
                      )}
                      {(sub.fulfillment_status === "CONFIRMED" ||
                        sub.fulfillment_status === "PACKED") && (
                        <button
                          onClick={() =>
                            handleUpdateOrderStatus(sub.id, "DISPATCHED")
                          }
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                        >
                          <Truck className="w-3 h-3" /> 2. Dispatch Rider
                        </button>
                      )}
                      {sub.fulfillment_status === "DISPUTED" ? (
                        <span className="text-[11px] font-bold text-red-600">
                          Frozen by Buyer Dispute
                        </span>
                      ) : sub.fulfillment_status !== "DELIVERED" ? (
                        <button
                          onClick={() =>
                            handleUpdateOrderStatus(
                              sub.id,
                              "DELIVERED",
                              sub.delivery_pin || "4821"
                            )
                          }
                          className="bg-[#008060] hover:bg-[#006e52] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition shadow-xs"
                        >
                          ✓ Verify PIN & Release Escrow
                        </button>
                      ) : (
                        <span className="text-[11px] font-bold text-stone-400">
                          Settled ✓
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
