import React from "react";
import { Plus } from "lucide-react";

export default function VendorProductsTab({
  vendorDashboard,
  productFilterTab,
  setProductFilterTab,
  filteredVendorProducts,
  openAddProductModal,
  openEditProductModal,
  handleDeleteProduct,
}) {
  if (!vendorDashboard?.store) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-stone-900">
            Products & Inventory Catalog
          </h2>
          <p className="text-xs text-stone-500">
            Manage SKU pricing, compare-at discounts, and real-time stock quantities synced to your storefront.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-stone-200/80 p-1 rounded-xl text-xs font-bold">
            {[
              {
                id: "ALL",
                label: `All (${vendorDashboard.products.length})`,
              },
              {
                id: "ACTIVE",
                label: `Active (${
                  vendorDashboard.products.filter(
                    (p) => p.is_active !== false
                  ).length
                })`,
              },
              {
                id: "LOW_STOCK",
                label: `Low Stock (${
                  vendorDashboard.products.filter((p) => p.stock <= 10).length
                })`,
              },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setProductFilterTab(t.id)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  productFilterTab === t.id
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={openAddProductModal}
            className="bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-stone-200 text-[11px] uppercase text-stone-500 bg-stone-50 font-bold">
              <th className="py-3.5 px-4">Product</th>
              <th className="py-3.5 px-4">SKU & Category</th>
              <th className="py-3.5 px-4">Inventory Health</th>
              <th className="py-3.5 px-4">Unit Price</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredVendorProducts.map((p) => (
              <tr key={p.id} className="hover:bg-stone-50/80 transition">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-11 h-11 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-stone-900">
                        {p.name}
                      </div>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600 mt-0.5">
                        {p.badge || "Standard"}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-mono font-bold text-stone-800">
                    {p.sku}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {p.category}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono font-bold ${
                        p.stock <= 10
                          ? "text-amber-600"
                          : "text-stone-800"
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                    {p.stock <= 10 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                        Low
                      </span>
                    )}
                  </div>
                  <div className="w-28 h-1.5 bg-stone-100 rounded-full overflow-hidden mt-1.5">
                    <div
                      className={`h-full rounded-full ${
                        p.stock <= 10 ? "bg-amber-500" : "bg-[#008060]"
                      }`}
                      style={{
                        width: `${Math.min(100, (p.stock / 60) * 100)}%`,
                      }}
                    />
                  </div>
                </td>
                <td className="py-3.5 px-4 tabular-nums">
                  <div className="font-extrabold text-stone-900">
                    KES {p.price.toLocaleString()}
                  </div>
                  {p.original_price && p.original_price > p.price && (
                    <div className="text-[10px] text-stone-400 line-through">
                      KES {p.original_price.toLocaleString()}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button
                    onClick={() => openEditProductModal(p)}
                    className="px-3 py-1.5 border border-stone-200 hover:bg-stone-100 rounded-lg font-bold text-stone-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg font-bold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
