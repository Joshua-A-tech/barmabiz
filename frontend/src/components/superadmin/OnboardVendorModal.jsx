import React from "react";
import { X } from "lucide-react";

export default function OnboardVendorModal({
  isOnboardModalOpen,
  setIsOnboardModalOpen,
  onboardForm,
  setOnboardForm,
  handleSuperAdminOnboardVendor,
}) {
  if (!isOnboardModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="font-extrabold text-base text-stone-900">
              Onboard New Vendor & Provision Portal Domain
            </h3>
            <p className="text-[11px] text-stone-500">
              Creates an isolated Vendor Admin account, assigns their subdomain &
              custom domain, and sets service privileges.
            </p>
          </div>
          <button onClick={() => setIsOnboardModalOpen(false)}>
            <X className="w-5 h-5 text-stone-400" />
          </button>
        </div>

        <form
          onSubmit={handleSuperAdminOnboardVendor}
          className="space-y-3 text-xs"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold block mb-1">Merchant Owner Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Grace Wambui"
                value={onboardForm.owner_name}
                onChange={(e) =>
                  setOnboardForm({ ...onboardForm, owner_name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">
                Vendor Login Email
              </label>
              <input
                type="email"
                required
                placeholder="grace@glowkenya.co.ke"
                value={onboardForm.email}
                onChange={(e) =>
                  setOnboardForm({ ...onboardForm, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold block mb-1">Brand / Store Name</label>
              <input
                type="text"
                required
                placeholder="Glow Skincare Kenya"
                value={onboardForm.store_name}
                onChange={(e) => {
                  const slug = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "");
                  setOnboardForm({
                    ...onboardForm,
                    store_name: e.target.value,
                    store_slug: slug,
                    custom_domain: slug ? `www.${slug}.co.ke` : "",
                  });
                }}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">
                M-Pesa B2C Number
              </label>
              <input
                type="text"
                required
                placeholder="2547XXXXXXXX"
                value={onboardForm.mpesa_phone}
                onChange={(e) =>
                  setOnboardForm({
                    ...onboardForm,
                    mpesa_phone: e.target.value,
                    phone: e.target.value,
                  })
                }
                className="w-full px-3 py-2 font-mono border rounded-lg"
              />
            </div>
          </div>

          {/* Live Domain Provisioning Preview */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 font-mono text-[11px]">
            <div className="text-stone-500 font-sans font-bold">
              Auto-Provisioned Tenant Domains:
            </div>
            <div>
              🔐 Admin Portal:{" "}
              <strong className="text-stone-900">
                admin.{onboardForm.store_slug || "brand"}.barmabiz.co.ke
              </strong>
            </div>
            <div>
              🛍️ Storefront:{" "}
              <strong className="text-[#008060]">
                {onboardForm.store_slug || "brand"}.barmabiz.co.ke
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold block mb-1">
                Custom Domain (CNAME)
              </label>
              <input
                type="text"
                placeholder="www.glowskincare.co.ke"
                value={onboardForm.custom_domain}
                onChange={(e) =>
                  setOnboardForm({
                    ...onboardForm,
                    custom_domain: e.target.value,
                  })
                }
                className="w-full px-3 py-2 font-mono border rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">
                SaaS Plan & Commission
              </label>
              <select
                value={onboardForm.subscription_plan}
                onChange={(e) => {
                  const plan = e.target.value;
                  const rates = { Starter: 5.0, Growth: 3.5, Pro: 2.0 };
                  setOnboardForm({
                    ...onboardForm,
                    subscription_plan: plan,
                    commission_rate: rates[plan] || 3.5,
                  });
                }}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="Starter">Starter (5.0% fee)</option>
                <option value="Growth">Growth (3.5% fee)</option>
                <option value="Pro">Pro (2.0% fee)</option>
              </select>
            </div>
          </div>

          {/* Granular Service Checkboxes */}
          <div className="pt-2 space-y-2">
            <div className="font-bold text-stone-700">
              Assign Vendor Admin Service Privileges:
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardForm.perm_b2c_payouts}
                  onChange={(e) =>
                    setOnboardForm({
                      ...onboardForm,
                      perm_b2c_payouts: e.target.checked,
                    })
                  }
                />
                <span>M-Pesa B2C Payouts</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardForm.perm_theme_customizer}
                  onChange={(e) =>
                    setOnboardForm({
                      ...onboardForm,
                      perm_theme_customizer: e.target.checked,
                    })
                  }
                />
                <span>Theme Customizer</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardForm.perm_discounts}
                  onChange={(e) =>
                    setOnboardForm({
                      ...onboardForm,
                      perm_discounts: e.target.checked,
                    })
                  }
                />
                <span>Discount Engine</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#008060] hover:bg-[#006e52] text-white font-bold py-3 rounded-xl shadow-md mt-2"
          >
            Provision Domains & Activate Vendor Portal
          </button>
        </form>
      </div>
    </div>
  );
}
