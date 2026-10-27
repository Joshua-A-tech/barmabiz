import React from "react";
import { Truck, X, Store } from "lucide-react";

export default function TrackOrderModal({
  isOpen,
  onClose,
  trackNumber,
  setTrackNumber,
  handleTrackOrder,
  trackError,
  trackedOrder,
  handleRaiseBuyerDispute,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
        <div className="flex justify-between items-start border-b border-stone-200 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#008060]" /> Track Escrow Order &
              Delivery PIN
            </h3>
            <p className="text-[11px] text-stone-500">
              Enter your Order Reference (`BMZ-90104`) or M-Pesa Receipt (`SK89K2L10P`)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleTrackOrder} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. BMZ-90104 or SK89K2L10P"
            value={trackNumber}
            onChange={(e) => setTrackNumber(e.target.value)}
            className="flex-1 px-3.5 py-2.5 text-xs font-mono border border-stone-300 rounded-xl focus:outline-none focus:border-[#008060]"
          />
          <button
            type="submit"
            className="bg-[#1a1a1a] hover:bg-[#008060] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
          >
            Lookup Order
          </button>
        </form>

        {trackError && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl font-semibold">
            {trackError}
          </div>
        )}

        {trackedOrder && (
          <div className="text-xs space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
              <div>
                <div className="font-extrabold text-stone-900 text-sm">
                  Order #{trackedOrder.order_number}
                </div>
                <div className="font-mono text-[11px] text-[#008060]">
                  M-Pesa Receipt: {trackedOrder.mpesa_receipt} • Total: KES{" "}
                  {trackedOrder.total_amount?.toLocaleString()}
                </div>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-[11px] font-bold text-stone-700"
              >
                🖨️ Print Receipt
              </button>
            </div>

            <div className="space-y-2.5">
              {trackedOrder.suborders?.map((s) => (
                <div
                  key={s.id}
                  className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-stone-900 flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-[#008060]" />
                      {s.store_name}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        s.fulfillment_status === "DELIVERED"
                          ? "bg-emerald-100 text-[#008060]"
                          : s.fulfillment_status === "DISPUTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {s.fulfillment_status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-200/80">
                    <span className="text-stone-500 font-sans">
                      Buyer Delivery Release PIN:
                    </span>
                    <strong className="text-stone-900 tracking-widest text-xs">
                      {s.delivery_pin || "4821"}
                    </strong>
                  </div>

                  {s.dispute_reason && (
                    <div className="text-[11px] text-red-700 bg-red-50 border border-red-200 p-2 rounded-lg">
                      <strong>Escrow Frozen (Dispute Active):</strong>{" "}
                      {s.dispute_reason}
                    </div>
                  )}

                  {!s.escrow_released &&
                    s.fulfillment_status !== "DELIVERED" &&
                    s.fulfillment_status !== "DISPUTED" && (
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-stone-500">
                          Share PIN with rider only after inspecting your item.
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleRaiseBuyerDispute(
                              trackedOrder.order_number,
                              s.id
                            )
                          }
                          className="text-[11px] font-bold text-red-600 hover:text-red-700 underline"
                        >
                          Raise Escrow Dispute
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
