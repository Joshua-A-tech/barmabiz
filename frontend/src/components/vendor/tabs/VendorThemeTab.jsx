import React from "react";
import { Lock, Monitor, Smartphone } from "lucide-react";
import { THEME_PRESETS } from "../../../constants";

export default function VendorThemeTab({
  vendorDashboard,
  storeProfileForm,
  setStoreProfileForm,
  handleSaveStoreProfile,
  themePreviewDevice,
  setThemePreviewDevice,
}) {
  const store = vendorDashboard?.store;
  if (!store) return null;

  return (
    <div className="space-y-5">
      {!store.perm_theme_customizer ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center space-y-2">
          <Lock className="w-8 h-8 text-red-500 mx-auto" />
          <h3 className="font-extrabold text-base text-red-900">
            Theme Customizer Restricted by SuperAdmin
          </h3>
          <p className="text-xs text-red-700">
            Contact Platform Owner HQ to enable custom theme editing for
            your portal.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Theme Controls */}
          <form
            onSubmit={handleSaveStoreProfile}
            className="lg:col-span-5 bg-white p-6 rounded-xl border border-stone-200 space-y-4 shadow-2xs"
          >
            <div>
              <h3 className="font-extrabold text-base text-stone-900">
                Shopify Online Store Theme Editor
              </h3>
              <p className="text-xs text-stone-500">
                Customize your brand palette, hero headline, and top promo bar with live preview.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2 text-stone-700">
                Brand Accent Color Preset
              </label>
              <div className="grid grid-cols-2 gap-2">
                {THEME_PRESETS.map((preset) => (
                  <button
                    type="button"
                    key={preset.hex}
                    onClick={() =>
                      setStoreProfileForm({
                        ...storeProfileForm,
                        theme_color: preset.hex,
                      })
                    }
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                      storeProfileForm.theme_color === preset.hex
                        ? "border-stone-900 ring-1 ring-stone-900 bg-stone-50"
                        : "border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <span
                      style={{ backgroundColor: preset.hex }}
                      className="w-4 h-4 rounded-full shrink-0 shadow-xs"
                    />
                    <span className="truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-stone-700">
                Hero Banner Headline
              </label>
              <input
                type="text"
                value={storeProfileForm.hero_title}
                onChange={(e) =>
                  setStoreProfileForm({
                    ...storeProfileForm,
                    hero_title: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-stone-700">
                Top Announcement Bar Text
              </label>
              <input
                type="text"
                value={storeProfileForm.announcement_text}
                onChange={(e) =>
                  setStoreProfileForm({
                    ...storeProfileForm,
                    announcement_text: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#008060] hover:bg-[#006e52] text-white text-xs font-extrabold py-3 rounded-xl shadow-sm transition"
            >
              Publish Theme to {store.storefront_domain}
            </button>
          </form>

          {/* Right Column: Live Interactive Storefront Preview */}
          <div className="lg:col-span-7 bg-stone-900 p-4 rounded-2xl border border-stone-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                Live Preview: https://{store.storefront_domain}
              </div>
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setThemePreviewDevice("desktop")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 ${
                    themePreviewDevice === "desktop"
                      ? "bg-white text-stone-900"
                      : "text-stone-300"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setThemePreviewDevice("mobile")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 ${
                    themePreviewDevice === "mobile"
                      ? "bg-white text-stone-900"
                      : "text-stone-300"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>
            </div>

            <div
              className={`bg-white rounded-xl overflow-hidden shadow-xl mx-auto transition-all ${
                themePreviewDevice === "mobile" ? "max-w-xs" : "w-full"
              }`}
            >
              <div
                style={{
                  backgroundColor: storeProfileForm.theme_color || "#008060",
                }}
                className="text-white text-[11px] font-bold py-2 px-3 text-center truncate"
              >
                {storeProfileForm.announcement_text ||
                  "Welcome to our official store!"}
              </div>
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={store.logo_url}
                    alt=""
                    className="w-8 h-8 rounded-lg object-cover border"
                  />
                  <span className="font-extrabold text-xs text-stone-900">
                    {storeProfileForm.name || store.name}
                  </span>
                </div>
                <span
                  style={{
                    backgroundColor: storeProfileForm.theme_color || "#008060",
                  }}
                  className="text-white text-[10px] font-bold px-2.5 py-1 rounded-md"
                >
                  Bag (0)
                </span>
              </div>
              <div
                style={{
                  background: `linear-gradient(120deg, ${
                    storeProfileForm.theme_color || "#008060"
                  } 0%, #0f172a 100%)`,
                }}
                className="p-6 text-white space-y-2"
              >
                <span className="text-[10px] uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  {store.category}
                </span>
                <h4 className="text-lg font-extrabold leading-snug">
                  {storeProfileForm.hero_title || store.hero_title}
                </h4>
                <p className="text-[11px] text-white/80 line-clamp-2">
                  {storeProfileForm.description || store.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
