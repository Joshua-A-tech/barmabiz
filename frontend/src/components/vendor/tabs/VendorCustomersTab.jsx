import React from "react";

export default function VendorCustomersTab({ vendorDashboard }) {
  const customers = vendorDashboard?.customers || [];

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
      <div className="p-4 border-b border-stone-200 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-sm text-stone-900">
            Verified Store Customers ({customers.length})
          </h3>
          <p className="text-xs text-stone-500">
            Repeat buyers who have completed M-Pesa STK Push orders with your store.
          </p>
        </div>
      </div>
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b bg-stone-50 text-[11px] uppercase text-stone-500 font-bold">
            <th className="py-3.5 px-4">Customer</th>
            <th className="py-3.5 px-4">M-Pesa Phone</th>
            <th className="py-3.5 px-4">Delivery Region</th>
            <th className="py-3.5 px-4">Orders</th>
            <th className="py-3.5 px-4 text-right">Lifetime Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {customers.map((c, i) => (
            <tr key={i} className="hover:bg-stone-50/70">
              <td className="py-3.5 px-4 font-bold text-stone-900">
                {c.name}
              </td>
              <td className="py-3.5 px-4 font-mono text-stone-600">
                {c.phone}
              </td>
              <td className="py-3.5 px-4 text-stone-600">
                {c.location}
              </td>
              <td className="py-3.5 px-4 font-mono font-bold">
                {c.orders_count} orders
              </td>
              <td className="py-3.5 px-4 text-right font-extrabold text-[#008060] tabular-nums">
                KES {c.total_spent?.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
