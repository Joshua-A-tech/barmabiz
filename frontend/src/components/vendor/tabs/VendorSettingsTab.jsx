import React from "react";

export default function VendorSettingsTab({
  vendorDashboard,
  storeProfileForm,
  setStoreProfileForm,
  handleSaveStoreProfile,
}) {
  const store = vendorDashboard?.store;
  if (!store) return null;

  return (
    <form
      onSubmit={handleSaveStoreProfile}
      className="bg-white p-6 rounded-xl border border-stone-200 space-y-5 shadow-2xs"
    >
      <div>
        <h3 className="font-extrabold text-base text-stone-900">
          Multi-Tenant Domain Routing & M-Pesa Settlement Settings
        </h3>
        <p className="text-xs text-stone-500">
          Configure your custom CNAME brand domain and M-Pesa B2C payout phone number.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-bold mb-1 text-stone-700">
            Assigned Admin Portal Domain
          </label>
          <input
            type="text"
            disabled
            value={store.admin_portal_domain}
            className="w-full px-3 py-2.5 font-mono bg-stone-100 border border-stone-200 rounded-xl text-stone-500"
          />
        </div>
        <div>
          <label className="block font-bold mb-1 text-stone-700">
            Public Storefront Subdomain
          </label>
          <input
            type="text"
            disabled
            value={store.storefront_domain}
            className="w-full px-3 py-2.5 font-mono bg-stone-100 border border-stone-200 rounded-xl text-stone-500"
          />
        </div>
        <div>
          <label className="block font-bold mb-1 text-stone-700">
            Custom Brand Domain (CNAME)
          </label>
          <input
            type="text"
            placeholder="www.yourbrand.co.ke"
            value={storeProfileForm.custom_domain}
            onChange={(e) =>
              setStoreProfileForm({
                ...storeProfileForm,
                custom_domain: e.target.value,
              })
            }
            className="w-full px-3 py-2.5 font-mono border border-stone-300 rounded-xl"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
      >
        Save Domain & Store Settings
      </button>
    </form>
  );
}
