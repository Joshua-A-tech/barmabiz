import React from "react";
import { X, Check, Lock, ShieldCheck } from "lucide-react";
import { SAAS_PLANS } from "../../constants";

export default function VendorRegisterWizardModal({
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  registerStep,
  setRegisterStep,
  registerForm,
  setRegisterForm,
  handleSendVendorOtp,
  vendorOtpState,
  vendorOtpInputs,
  setVendorOtpInputs,
  handleVerifyVendorOtpAndRegister,
  pendingRegisteredVendor,
  setPendingRegisteredVendor,
  subscriptionPaying,
  handlePayVendorSubscription,
  fetchMarketplace,
  fetchDemoAccounts,
  handleSwitchIdentity,
}) {
  if (!isRegisterModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header & 3-Step Progress Indicator */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-[#008060] bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Step {registerStep} of 3 • Verified Merchant Onboarding
            </span>
            <h3 className="font-extrabold text-lg text-stone-900 mt-1">
              {registerStep === 1 &&
                "1. Choose Your SaaS Plan & Reserve Store Domain"}
              {registerStep === 2 &&
                "2. Verify Your Email & Kenyan SMS OTP Codes"}
              {registerStep === 3 &&
                "3. Complete M-Pesa Plan Payment to Approve Portal"}
            </h3>
            <p className="text-xs text-stone-500">
              {registerStep === 1 &&
                "Select the subscription tier that fits your business. Your portal is activated immediately after OTP verification and M-Pesa plan payment."}
              {registerStep === 2 &&
                "Enter the 6-digit codes sent to your phone via SMS and your email inbox."}
              {registerStep === 3 &&
                "Your portal is created in PENDING_PLAN_PAYMENT status and is only approved once M-Pesa payment succeeds."}
            </p>
          </div>
          <button
            onClick={() => {
              setIsRegisterModalOpen(false);
              setRegisterStep(1);
            }}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar Pills */}
        <div className="grid grid-cols-3 gap-2 text-[11px] font-bold">
          {[
            { step: 1, label: "1. Plan & Store Info" },
            { step: 2, label: "2. SMS & Email OTP" },
            { step: 3, label: "3. M-Pesa Approval" },
          ].map((s) => (
            <div
              key={s.step}
              className={`py-2 px-3 rounded-xl text-center border ${
                registerStep === s.step
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : registerStep > s.step
                  ? "bg-emerald-50 text-[#008060] border-emerald-200"
                  : "bg-stone-50 text-stone-400 border-stone-200"
              }`}
            >
              {registerStep > s.step ? `✓ ${s.label}` : s.label}
            </div>
          ))}
        </div>

        {/* STEP 1: DETAILS + SAAS PLAN PICKER */}
        {registerStep === 1 && (
          <form onSubmit={handleSendVendorOtp} className="space-y-4 text-xs">
            {/* Interactive SaaS Plan Selector */}
            <div className="space-y-2">
              <label className="font-extrabold text-stone-800 block">
                Select Your BarmaBiz SaaS Subscription Plan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAAS_PLANS.map((plan) => {
                  const active = registerForm.subscription_plan === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() =>
                        setRegisterForm({
                          ...registerForm,
                          subscription_plan: plan.id,
                        })
                      }
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition space-y-2 ${
                        active
                          ? "border-[#008060] bg-emerald-50/40 shadow-xs"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-stone-900">
                          {plan.id}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {plan.commission}% fee
                        </span>
                      </div>
                      <div className="text-base font-extrabold text-[#008060] font-mono">
                        {plan.price}
                      </div>
                      <p className="text-[11px] text-stone-500 leading-snug">
                        {plan.desc}
                      </p>
                      <ul className="space-y-1 pt-1 border-t border-stone-200/70 text-[10px] text-stone-600">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <Check className="w-3 h-3 text-[#008060] shrink-0" />
                            <span className="truncate">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Merchant Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Wambui"
                  value={registerForm.owner_name}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      owner_name: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Official Email (Receives Email OTP)
                </label>
                <input
                  type="email"
                  required
                  placeholder="grace@glowkenya.co.ke"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Brand / Store Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Glow Skincare Kenya"
                  value={registerForm.store_name}
                  onChange={(e) => {
                    const s = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "");
                    setRegisterForm({
                      ...registerForm,
                      store_name: e.target.value,
                      store_slug: s,
                      custom_domain: s ? `www.${s}.co.ke` : "",
                    });
                  }}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  M-Pesa Phone (Receives SMS OTP & STK Push)
                </label>
                <input
                  type="text"
                  required
                  placeholder="0712345678 or 254712345678"
                  value={registerForm.mpesa_phone}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      mpesa_phone: e.target.value,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 font-mono border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Portal Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Reserved Portal Domain
                </label>
                <input
                  type="text"
                  disabled
                  value={`admin.${
                    registerForm.store_slug || "yourstore"
                  }.barmabiz.co.ke`}
                  className="w-full px-3.5 py-2.5 font-mono bg-stone-100 border border-stone-200 rounded-xl text-stone-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#008060] hover:bg-[#006e52] text-white font-extrabold py-3 rounded-xl shadow-md transition"
            >
              Continue & Send 6-Digit SMS + Email Verification Codes →
            </button>
          </form>
        )}

        {/* STEP 2: DUAL-CHANNEL EMAIL + SMS OTP VERIFICATION */}
        {registerStep === 2 && vendorOtpState && (
          <form
            onSubmit={handleVerifyVendorOtpAndRegister}
            className="space-y-4 text-xs"
          >
            {vendorOtpState.dev_otp_preview && (
              <div className="bg-slate-900 text-stone-100 p-4 rounded-xl space-y-2 font-mono text-[11px] border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">
                    📡 Dispatched OTP Codes (Sandbox Gateway Preview)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setVendorOtpInputs({
                        sms_otp: vendorOtpState.dev_otp_preview.sms_otp,
                        email_otp: vendorOtpState.dev_otp_preview.email_otp,
                      })
                    }
                    className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-md font-sans font-bold text-[11px] transition"
                  >
                    Auto-Fill Both OTPs
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <div className="text-stone-400 text-[10px]">
                      SMS via Africa's Talking to{" "}
                      {vendorOtpState.dev_otp_preview.sms_recipient}:
                    </div>
                    <div className="text-lg font-extrabold text-emerald-400 tracking-widest mt-0.5">
                      {vendorOtpState.dev_otp_preview.sms_otp}
                    </div>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <div className="text-stone-400 text-[10px]">
                      Email via SMTP/Resend to{" "}
                      {vendorOtpState.dev_otp_preview.email_recipient}:
                    </div>
                    <div className="text-lg font-extrabold text-amber-300 tracking-widest mt-0.5">
                      {vendorOtpState.dev_otp_preview.email_otp}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  6-Digit SMS OTP Code (Sent to Phone)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={vendorOtpInputs.sms_otp}
                  onChange={(e) =>
                    setVendorOtpInputs({
                      ...vendorOtpInputs,
                      sms_otp: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 font-mono text-base font-extrabold tracking-widest border border-stone-300 rounded-xl text-center"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  6-Digit Email OTP Code (Sent to Inbox)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="654321"
                  value={vendorOtpInputs.email_otp}
                  onChange={(e) =>
                    setVendorOtpInputs({
                      ...vendorOtpInputs,
                      email_otp: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 font-mono text-base font-extrabold tracking-widest border border-stone-300 rounded-xl text-center"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRegisterStep(1)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-600 hover:bg-stone-50"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#008060] hover:bg-[#006e52] text-white font-extrabold py-3 rounded-xl shadow-md transition"
              >
                Verify SMS & Email OTP & Proceed to Plan Payment →
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: M-PESA SAAS PLAN PAYMENT & AUTOMATIC APPROVAL */}
        {registerStep === 3 && pendingRegisteredVendor && (
          <div className="space-y-4 text-xs">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-600" />
                  Current Status:{" "}
                  {pendingRegisteredVendor.store.onboarding_status}
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-200/70 text-amber-950 px-2 py-0.5 rounded">
                  Awaiting M-Pesa Payment
                </span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                Your Email and SMS are verified and your portal domain{" "}
                <strong className="font-mono">
                  https://{pendingRegisteredVendor.store.admin_portal_domain}
                </strong>{" "}
                has been reserved. Per platform policy, your store is{" "}
                <strong>only approved and activated after payment</strong> of
                your selected SaaS subscription plan.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Store Name:</span>
                <strong className="text-stone-900">
                  {pendingRegisteredVendor.store.name}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">
                  Selected SaaS Plan:
                </span>
                <strong className="text-[#008060]">
                  {pendingRegisteredVendor.store.subscription_plan} Plan (
                  {pendingRegisteredVendor.store.commission_rate}% commission)
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">
                  M-Pesa STK Push Number:
                </span>
                <strong className="text-stone-900">
                  +{pendingRegisteredVendor.store.mpesa_phone}
                </strong>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-stone-200">
                <span className="font-sans font-extrabold text-stone-900">
                  Subscription Amount Due:
                </span>
                <strong className="text-[#008060]">
                  KES{" "}
                  {(
                    pendingRegisteredVendor.store.subscription_amount || 3500
                  ).toLocaleString()}
                </strong>
              </div>
            </div>

            <button
              type="button"
              disabled={subscriptionPaying}
              onClick={() => handlePayVendorSubscription()}
              className="w-full bg-[#008060] hover:bg-[#006e52] text-white font-extrabold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              {subscriptionPaying
                ? "Confirming M-Pesa STK Push..."
                : `Pay KES ${(
                    pendingRegisteredVendor.store.subscription_amount || 3500
                  ).toLocaleString()} via M-Pesa & Approve Portal Now`}
            </button>

            <button
              type="button"
              onClick={async () => {
                setIsRegisterModalOpen(false);
                setRegisterStep(1);
                await fetchMarketplace();
                await fetchDemoAccounts();
                const unapprovedSession = {
                  id: pendingRegisteredVendor.user.id,
                  name: pendingRegisteredVendor.user.name,
                  email: pendingRegisteredVendor.user.email,
                  role: "VENDOR",
                  token: pendingRegisteredVendor.token,
                  store_id: pendingRegisteredVendor.store.id,
                  store_name: pendingRegisteredVendor.store.name,
                  store_slug: pendingRegisteredVendor.store.slug,
                  portal_domain:
                    pendingRegisteredVendor.store.admin_portal_domain,
                  storefront_domain:
                    pendingRegisteredVendor.store.storefront_domain,
                  custom_domain: pendingRegisteredVendor.store.custom_domain,
                };
                setPendingRegisteredVendor(null);
                await handleSwitchIdentity(unapprovedSession, true);
              }}
              className="w-full text-center text-stone-500 hover:text-stone-800 font-semibold py-1.5 text-[11px]"
            >
              Preview Unapproved Portal First (Pay Later Inside Dashboard)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
