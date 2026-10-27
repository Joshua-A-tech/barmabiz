import React from "react";
import { ShieldCheck, X } from "lucide-react";
import { SAAS_PLANS } from "../../constants";

export default function FooterInfoModal({
  activeFooterModal,
  setActiveFooterModal,
  setRegisterStep,
  setIsRegisterModalOpen,
  setIsTrackModalOpen,
}) {
  if (!activeFooterModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 space-y-5 my-8 max-h-[88vh] overflow-y-auto">
        {/* Header + Section Switcher Pills */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-4 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#008060] bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> BarmaBiz Platform Center
            </span>
            <h3 className="font-extrabold text-lg text-stone-900 mt-1">
              {activeFooterModal === "about" && "About BarmaBiz Commerce Kenya"}
              {activeFooterModal === "escrow" &&
                "How BarmaBiz M-Pesa Escrow & B2C Split Works"}
              {activeFooterModal === "pricing" &&
                "Merchant SaaS Subscription Plans & Commission Tiers"}
              {activeFooterModal === "domains" &&
                "Isolated Vendor Portals & Custom Brand Domains"}
              {activeFooterModal === "returns" &&
                "Buyer Protection, Returns & Escrow Dispute Resolution"}
              {activeFooterModal === "privacy" &&
                "Privacy Policy, OTP Verification & Cryptographic Security"}
              {activeFooterModal === "terms" &&
                "Terms of Service & Merchant SLA"}
              {activeFooterModal === "contact" &&
                "Contact BarmaBiz Support & Nairobi HQ"}
            </h3>
          </div>
          <button
            onClick={() => setActiveFooterModal(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Navigation Pills Inside Modal */}
        <div className="flex flex-wrap gap-1.5 border-b border-stone-100 pb-3">
          {[
            { id: "about", label: "About Us" },
            { id: "escrow", label: "M-Pesa Escrow" },
            { id: "pricing", label: "SaaS Plans" },
            { id: "domains", label: "Custom Domains" },
            { id: "returns", label: "Returns & Disputes" },
            { id: "privacy", label: "Privacy & Security" },
            { id: "terms", label: "Terms" },
            { id: "contact", label: "Contact HQ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFooterModal(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeFooterModal === tab.id
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="text-xs text-stone-600 space-y-4 leading-relaxed">
          {activeFooterModal === "about" && (
            <div className="space-y-4">
              <p>
                <strong className="text-stone-900">BarmaBiz Commerce</strong> combines the best of{" "}
                <strong>Shopify’s independent merchant portals</strong> with{" "}
                <strong>Jumia-style central discovery and M-Pesa Escrow trust</strong>. Every Kenyan entrepreneur who joins BarmaBiz receives their own dedicated online storefront and isolated admin portal where they have full control over their products, SKU inventory, pricing, theme colors, promotional codes, and real-time order fulfillment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="font-extrabold text-stone-900 mb-1">
                    For Merchants (Vendor Admins)
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Manage your entire catalog, upload product pictures, customize your storefront theme, and withdraw delivered earnings directly to M-Pesa via Daraja B2C.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="font-extrabold text-stone-900 mb-1">
                    For Platform Owner (SuperAdmin HQ)
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Oversee platform GMV, verify vendor KYC & subscription payments, provision custom domains, and enforce granular per-vendor service privileges.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeFooterModal === "escrow" && (
            <div className="space-y-3">
              <p>
                Every checkout on BarmaBiz is protected by our{" "}
                <strong className="text-stone-900">3-Stage Safaricom Daraja M-Pesa Escrow Engine</strong>:
              </p>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <strong className="text-stone-900 block">
                    1. Single M-Pesa STK Push Checkout
                  </strong>
                  Buyers can combine items from multiple independent stores in one shopping bag and pay with a single M-Pesa PIN prompt after verifying their phone & email.
                </div>
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                  <strong className="text-stone-900 block">
                    2. Funds Locked in Escrow During Fulfillment
                  </strong>
                  BarmaBiz splits the order into vendor sub-orders (`CONFIRMED` → `PACKED` → `DISPATCHED`). The money remains locked in the platform Escrow ledger while the rider delivers.
                </div>
                <div className="p-3 rounded-xl bg-stone-100 border border-stone-200">
                  <strong className="text-stone-900 block">
                    3. Instant B2C Settlement Upon Delivery
                  </strong>
                  Once marked `DELIVERED`, the platform automatically deducts the plan commission (2.0% – 5.0%) and credits the net payout to the merchant’s withdrawable M-Pesa B2C wallet.
                </div>
              </div>
            </div>
          )}

          {activeFooterModal === "pricing" && (
            <div className="space-y-3">
              <p>
                Vendor accounts are activated automatically upon completing{" "}
                <strong className="text-stone-900">M-Pesa subscription payment</strong> for one of our three transparent SaaS tiers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAAS_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-extrabold text-stone-900 text-sm">
                        {plan.name}
                      </div>
                      <div className="text-[#008060] font-extrabold font-mono mt-0.5">
                        {plan.price}
                      </div>
                      <div className="text-[10px] font-bold text-stone-500 mb-2">
                        {plan.commission}% Commission Fee
                      </div>
                      <ul className="space-y-1 text-[11px] text-stone-600">
                        {plan.features.map((f, i) => (
                          <li key={i}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFooterModal === "domains" && (
            <div className="space-y-3">
              <p>
                BarmaBiz provisions three distinct domain routes for complete multi-tenant isolation:
              </p>
              <div className="font-mono text-[11px] bg-stone-900 text-stone-200 p-4 rounded-xl space-y-2">
                <div>
                  <span className="text-emerald-400">Public Subdomain:</span>{" "}
                  https://&#123;your-slug&#125;.barmabiz.co.ke
                </div>
                <div>
                  <span className="text-amber-400">Isolated Admin Portal:</span>{" "}
                  https://admin.&#123;your-slug&#125;.barmabiz.co.ke
                </div>
                <div>
                  <span className="text-indigo-400">Custom Brand CNAME:</span>{" "}
                  https://www.yourbrand.co.ke
                </div>
              </div>
            </div>
          )}

          {activeFooterModal === "returns" && (
            <div className="space-y-3">
              <p>
                <strong className="text-stone-900">7-Day Escrow Return & Dispute Guarantee:</strong> Because buyer payments are held in BarmaBiz Escrow until delivery is confirmed, buyers are 100% protected against non-delivery, counterfeit items, or damaged goods.
              </p>
              <p>
                If an item does not match the vendor’s description or picture, raise a dispute using your Order Reference (`BMZ-XXXXX`) before Escrow release for a full M-Pesa reversal.
              </p>
            </div>
          )}

          {activeFooterModal === "privacy" && (
            <div className="space-y-3">
              <p>
                <strong className="text-stone-900">Enterprise Cryptographic Security:</strong> All admin passwords are hashed using `PBKDF2-HMAC-SHA256` (120,000 iterations), API sessions use HMAC-SHA256 signed expiring Bearer tokens, and both vendor registrations and buyer checkouts are protected by dual-channel 6-digit SMS & Email OTP verification.
              </p>
            </div>
          )}

          {activeFooterModal === "terms" && (
            <div className="space-y-3">
              <p>
                By operating a store on BarmaBiz, merchants agree to maintain accurate stock counts, authentic product photographs, and dispatch confirmed Escrow orders within 24–48 hours. Platform Owner HQ reserves the right to toggle service privileges or suspend stores that violate buyer trust.
              </p>
            </div>
          )}

          {activeFooterModal === "contact" && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="font-extrabold text-stone-900 text-sm">
                  BarmaBiz Technologies Ltd — Nairobi HQ
                </div>
                <div>📍 Westlands Commercial Hub, 4th Floor, Waiyaki Way, Nairobi</div>
                <div>📞 Customer & Merchant Desk: +254 700 880 990</div>
                <div>✉️ Support Email: support@barmabiz.co.ke</div>
                <div>🕒 Operating Hours: Mon – Sat, 8:00 AM – 8:00 PM EAT</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Buttons Inside Modal */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveFooterModal(null);
                setRegisterStep(1);
                setIsRegisterModalOpen(true);
              }}
              className="bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              Open Your Online Store
            </button>
            <button
              onClick={() => {
                setActiveFooterModal(null);
                setIsTrackModalOpen(true);
              }}
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              Track an Order
            </button>
          </div>
          <button
            onClick={() => setActiveFooterModal(null)}
            className="text-xs font-bold text-stone-500 hover:text-stone-900 px-3 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
