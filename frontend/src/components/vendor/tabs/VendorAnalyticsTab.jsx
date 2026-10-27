import React from "react";

export default function VendorAnalyticsTab({ vendorDashboard }) {
  const products = vendorDashboard?.products || [];

  return (
    <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-4">
      <div>
        <h3 className="font-extrabold text-base text-stone-900">
          Inventory Retail Valuation & SKU Velocity
        </h3>
        <p className="text-xs text-stone-500">
          Real-time stock valuation across your active storefront catalog.
        </p>
      </div>
      <div className="divide-y divide-stone-200">
        {products.map((p) => {
          const skuValue = p.stock * p.price;
          return (
            <div
              key={p.id}
              className="py-3 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-stone-900">{p.name}</span>
                <span className="ml-2 font-mono text-[11px] text-stone-400">
                  ({p.sku})
                </span>
              </div>
              <div className="font-mono tabular-nums text-right">
                <span className="text-stone-500">
                  {p.stock} units × KES {p.price.toLocaleString()} ={" "}
                </span>
                <strong className="text-stone-900">
                  KES {skuValue.toLocaleString()}
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
