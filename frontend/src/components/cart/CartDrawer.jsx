import React from "react";
import {
  ShoppingBag,
  X,
  CheckCircle2,
  Store,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  orderReceipt,
  setOrderReceipt,
  setTrackNumber,
  setIsTrackModalOpen,
  cart,
  cartVendorsGroup,
  updateCartQty,
  discountInput,
  setDiscountInput,
  handleApplyDiscount,
  cartSubtotal,
  appliedDiscount,
  discountAmount,
  cartTotal,
  checkoutForm,
  setCheckoutForm,
  buyerOtpData,
  buyerOtpInputs,
  setBuyerOtpInputs,
  handleSendBuyerOtp,
  handleVerifyBuyerOtp,
  handleCheckout,
  checkoutLoading,
}) {
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl overflow-y-auto p-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#008060]" /> Your
              Multi-Vendor Shopping Bag
            </h3>
            <p className="text-[11px] text-stone-500">
              Single M-Pesa STK Push • Automatic per-store Escrow split
            </p>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setOrderReceipt(null);
            }}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-4 space-y-5 overflow-y-auto">
          {orderReceipt ? (
            <div className="bg-emerald-50/90 border border-emerald-200 p-5 rounded-2xl text-xs space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#008060] font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5" /> M-Pesa Escrow Order Confirmed!
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-stone-500">Order Ref:</span>
                  <strong className="text-stone-900">
                    #{orderReceipt.order_number}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">M-Pesa Receipt:</span>
                  <strong className="text-[#008060]">
                    {orderReceipt.mpesa_receipt}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Escrow Status:</span>
                  <strong className="text-amber-700">
                    {orderReceipt.payment_status}
                  </strong>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-stone-100 text-xs">
                  <span className="font-sans font-bold text-stone-700">
                    Total Paid:
                  </span>
                  <strong className="text-stone-900">
                    KES {orderReceipt.total_amount?.toLocaleString()}
                  </strong>
                </div>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Your payment is safely locked in BarmaBiz Escrow and has been split into{" "}
                <strong>{orderReceipt.suborders?.length || 1}</strong> vendor
                fulfillment sub-order(s).
              </p>
              <button
                type="button"
                onClick={() => {
                  setTrackNumber(orderReceipt.order_number);
                  setOrderReceipt(null);
                  setIsCartOpen(false);
                  setIsTrackModalOpen(true);
                }}
                className="w-full bg-[#1a1a1a] text-white font-bold py-2.5 rounded-xl"
              >
                Track Live Fulfillment Status
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
              <div className="text-stone-700 font-bold text-sm">
                Your shopping bag is empty
              </div>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Explore verified Kenyan merchant storefronts and add items to test multi-vendor M-Pesa Escrow checkout.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4 text-xs">
              {/* Grouped by Vendor Store */}
              <div className="space-y-3">
                {Object.entries(cartVendorsGroup).map(([storeName, items]) => (
                  <div
                    key={storeName}
                    className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-2.5"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-1.5">
                      <span className="font-extrabold text-[11px] text-stone-800 flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-[#008060]" />
                        {storeName}
                      </span>
                      <span className="text-[10px] font-mono text-[#008060] bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        Escrow Protected
                      </span>
                    </div>
                    {items.map((item) => (
                      <div
                        key={item.product_id}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-stone-900 truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] font-mono text-stone-500">
                              KES {item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.product_id, -1)}
                            className="w-6 h-6 rounded-md bg-white border border-stone-300 font-bold text-stone-700 hover:bg-stone-100"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.product_id, 1)}
                            className="w-6 h-6 rounded-md bg-white border border-stone-300 font-bold text-stone-700 hover:bg-stone-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. KARIBU10)"
                  value={discountInput}
                  onChange={(e) =>
                    setDiscountInput(e.target.value.toUpperCase())
                  }
                  className="flex-1 px-3 py-2 font-mono text-xs border border-stone-300 rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="bg-stone-900 text-white font-bold px-3.5 py-2 rounded-xl"
                >
                  Apply
                </button>
              </div>

              {/* Order Summary Breakdown */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1.5 tabular-nums">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold">
                    KES {cartSubtotal.toLocaleString()}
                  </span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-[#008060] font-bold">
                    <span>
                      Promo ({appliedDiscount.code} - {appliedDiscount.percent}%)
                    </span>
                    <span className="font-mono">
                      - KES {discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-1.5 border-t border-stone-200">
                  <span>Total M-Pesa STK Push</span>
                  <span className="font-mono text-[#008060]">
                    KES {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Customer & M-Pesa Details */}
              <div className="space-y-2.5 pt-1">
                <input
                  type="text"
                  required
                  placeholder="Buyer Full Name"
                  value={checkoutForm.buyer_name}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      buyer_name: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Email Receipt"
                    value={checkoutForm.buyer_email}
                    onChange={(e) =>
                      setCheckoutForm({
                        ...checkoutForm,
                        buyer_email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl"
                  />
                  <input
                    type="text"
                    required
                    placeholder="M-Pesa (07...)"
                    value={checkoutForm.buyer_phone}
                    onChange={(e) =>
                      setCheckoutForm({
                        ...checkoutForm,
                        buyer_phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 font-mono border border-stone-300 rounded-xl"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Delivery Address / Town / Building"
                  value={checkoutForm.delivery_address}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      delivery_address: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl"
                />
              </div>

              {/* Buyer / Client Email & SMS OTP Verification Widget */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-stone-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#008060]" />
                    Client Email & SMS Verification
                  </span>
                  {buyerOtpData?.verified ? (
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-[#008060] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendBuyerOtp}
                      className="text-[11px] font-bold text-[#008060] hover:underline"
                    >
                      {buyerOtpData ? "Resend OTP" : "Send SMS & Email OTP"}
                    </button>
                  )}
                </div>

                {buyerOtpData && !buyerOtpData.verified && (
                  <div className="space-y-2 pt-1 border-t border-stone-200">
                    {buyerOtpData.dev_otp_preview && (
                      <div className="bg-slate-900 text-stone-200 p-2.5 rounded-lg font-mono text-[10px] space-y-1">
                        <div className="flex items-center justify-between text-emerald-400 font-bold">
                          <span>📲 Live SMS & Email Gateway Preview:</span>
                          <button
                            type="button"
                            onClick={() =>
                              setBuyerOtpInputs({
                                email_otp:
                                  buyerOtpData.dev_otp_preview.email_otp,
                                sms_otp: buyerOtpData.dev_otp_preview.sms_otp,
                              })
                            }
                            className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[9px] hover:bg-emerald-500/30"
                          >
                            Auto-Fill Codes
                          </button>
                        </div>
                        <div>
                          SMS ({buyerOtpData.dev_otp_preview.sms_recipient}):{" "}
                          <strong className="text-white">
                            {buyerOtpData.dev_otp_preview.sms_otp}
                          </strong>
                        </div>
                        <div>
                          Email ({buyerOtpData.dev_otp_preview.email_recipient}):{" "}
                          <strong className="text-white">
                            {buyerOtpData.dev_otp_preview.email_otp}
                          </strong>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="6-Digit SMS OTP"
                        value={buyerOtpInputs.sms_otp}
                        onChange={(e) =>
                          setBuyerOtpInputs({
                            ...buyerOtpInputs,
                            sms_otp: e.target.value,
                          })
                        }
                        className="px-2.5 py-1.5 font-mono text-xs border border-stone-300 rounded-lg bg-white"
                      />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="6-Digit Email OTP"
                        value={buyerOtpInputs.email_otp}
                        onChange={(e) =>
                          setBuyerOtpInputs({
                            ...buyerOtpInputs,
                            email_otp: e.target.value,
                          })
                        }
                        className="px-2.5 py-1.5 font-mono text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifyBuyerOtp}
                      className="w-full bg-stone-900 text-white font-bold py-2 rounded-lg text-[11px]"
                    >
                      Verify Client SMS & Email Codes
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={checkoutLoading}
                className="w-full bg-[#008060] hover:bg-[#006e52] text-white font-extrabold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                {checkoutLoading
                  ? "Sending M-Pesa STK Push..."
                  : `Pay KES ${cartTotal.toLocaleString()} via M-Pesa Escrow`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
