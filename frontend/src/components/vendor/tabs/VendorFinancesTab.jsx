import React from "react";
import { Lock } from "lucide-react";

export default function VendorFinancesTab({
  vendorDashboard,
  withdrawAmount,
  setWithdrawAmount,
  handleVendorWithdraw,
}) {
  const store = vendorDashboard?.store;
  if (!store) return null;

  return (
    <div className="space-y-6">
      {!store.perm_b2c_payouts ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center space-y-2">
          <Lock className="w-8 h-8 text-red-500 mx-auto" />
          <h3 className="font-extrabold text-base text-red-900">
            M-Pesa B2C Withdrawal Privilege Paused by SuperAdmin
          </h3>
          <p className="text-xs text-red-700 max-w-md mx-auto">
            Your Escrow & Wallet balances are safe, but instant B2C
            withdrawals are currently restricted on your account by
            Platform Owner HQ.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
                  Available for Instant M-Pesa B2C
                </span>
                <div className="text-3xl font-extrabold text-[#008060] mt-2 tabular-nums">
                  KES {store.available_balance.toLocaleString()}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Funds already cleared from Escrow after{" "}
                  <strong>{store.commission_rate}%</strong>{" "}
                  platform commission deduction.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                <span className="font-bold text-amber-900">
                  Pending Delivery Escrow:
                </span>
                <span className="font-mono font-extrabold text-amber-700">
                  KES {store.escrow_balance.toLocaleString()}
                </span>
              </div>
            </div>

            <form
              onSubmit={handleVendorWithdraw}
              className="bg-[#1a1a1a] text-white p-6 rounded-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  Safaricom Daraja B2C Settlement
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  To: {store.mpesa_phone}
                </span>
              </div>
              <input
                type="number"
                placeholder="Enter amount in KES"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-stone-400 focus:outline-none focus:border-emerald-400"
              />
              {/* Quick Percentage Chips */}
              <div className="flex items-center gap-2">
                {[
                  { label: "25%", ratio: 0.25 },
                  { label: "50%", ratio: 0.5 },
                  { label: "100% Max", ratio: 1 },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() =>
                      setWithdrawAmount(
                        String(
                          Math.floor(store.available_balance * chip.ratio)
                        )
                      )
                    }
                    className="flex-1 bg-white/10 hover:bg-white/20 text-[11px] font-bold py-1.5 rounded-lg transition"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-[#008060] hover:bg-[#009e76] text-white text-xs font-extrabold py-3 rounded-xl transition shadow-md"
              >
                Disburse Instant M-Pesa B2C Payout
              </button>
            </form>
          </div>

          {/* B2C Payout Ledger History */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="p-4 border-b border-stone-200 font-extrabold text-xs uppercase tracking-wider text-stone-600 bg-stone-50">
              M-Pesa B2C Settlement Ledger (
              {vendorDashboard.payouts?.length || 0})
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-[11px] uppercase text-stone-500 bg-stone-50/60">
                  <th className="py-3 px-4">Daraja Reference</th>
                  <th className="py-3 px-4">Recipient Phone</th>
                  <th className="py-3 px-4">Amount Disbursed</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {(vendorDashboard.payouts || []).map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      {tx.reference}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-600">
                      {tx.mpesa_phone}
                    </td>
                    <td className="py-3 px-4 font-extrabold text-[#008060] tabular-nums">
                      KES {tx.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#008060]">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
