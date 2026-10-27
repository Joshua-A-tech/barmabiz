import React from "react";
import { Lock } from "lucide-react";

export default function VendorDiscountsTab({
  vendorDashboard,
  storeProfileForm,
  setStoreProfileForm,
  handleSaveStoreProfile,
}) {
  const store = vendorDashboard?.store;
  if (!store) return null;

  return (
    <div className="space-y-4">
      {!store.perm_discounts ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center space-y-2">
          <Lock className="w-8 h-8 text-red-500 mx-auto" />
          <h3 className="font-extrabold text-base text-red-900">
            Discount Engine Privilege Restricted
          </h3>
          <p className="text-xs text-red-700 max-w-md mx-auto">
            SuperAdmin has not enabled the Discount & Promo Code service
            for your store tier ({store.subscription_plan}).
            Contact SuperAdmin or upgrade your plan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form
            onSubmit={handleSaveStoreProfile}
            className="bg-white p-6 rounded-xl border border-stone-200 space-y-4 shadow-2xs"
          >
            <div>
              <h3 className="font-extrabold text-base text-stone-900">
                Storefront Promo Code Campaign
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Buyers can apply this code in their slide-over bag or click your top announcement banner.
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-stone-700">
                Active Promo Code
              </label>
              <input
                type="text"
                value={storeProfileForm.discount_code}
                onChange={(e) =>
                  setStoreProfileForm({
                    ...storeProfileForm,
                    discount_code: e.target.value.toUpperCase(),
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs font-mono font-bold border border-stone-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-stone-700">
                Percentage Discount (%)
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={storeProfileForm.discount_percent}
                onChange={(e) =>
                  setStoreProfileForm({
                    ...storeProfileForm,
                    discount_percent: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs font-mono border border-stone-300 rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition"
            >
              Save & Activate Promo Code
            </button>
          </form>

          {/* Live Promo Ticket Card */}
          <div className="bg-[#1a1a1a] text-white p-6 rounded-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                Live Storefront Voucher Preview
              </span>
              <div className="text-3xl font-extrabold font-mono tracking-tight text-white pt-2">
                {storeProfileForm.discount_code || "KARIBU10"}
              </div>
              <p className="text-xs text-stone-300">
                Grants instant{" "}
                <strong className="text-emerald-400">
                  {storeProfileForm.discount_percent || 10}% OFF
                </strong>{" "}
                on all items sold by{" "}
                <strong>{store.name}</strong> at M-Pesa checkout.
              </p>
            </div>
            <div className="text-[11px] text-stone-400 border-t border-white/10 pt-3 font-mono">
              Verified Server-Side in Checkout Engine
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
