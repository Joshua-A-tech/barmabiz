import React from "react";
import { Package, X, Eye, Plus } from "lucide-react";

export default function ProductEditModal({
  isProductModalOpen,
  setIsProductModalOpen,
  editingProduct,
  productForm,
  setProductForm,
  handleSaveProduct,
  handleProductImageFileUpload,
}) {
  if (!isProductModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200 my-8">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#008060]" />
              {editingProduct ? "Edit Store Product" : "Add New Store Product"}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Provide your item details and a direct picture URL (`https://...`) to publish to your storefront.
            </p>
          </div>
          <button
            onClick={() => setIsProductModalOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
          {/* Product Title & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Organic Baobab Superfood Powder (500g)"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm({ ...productForm, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008060]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                SKU Code
              </label>
              <input
                type="text"
                placeholder="SKU-1042"
                value={productForm.sku}
                onChange={(e) =>
                  setProductForm({ ...productForm, sku: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-[11px] focus:outline-none focus:border-[#008060]"
              />
            </div>
          </div>

          {/* PRODUCT PICTURE URL + DIRECT DEVICE PHOTO UPLOAD + LIVE PREVIEW */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-start gap-3">
              {/* Live Image Preview Thumbnail */}
              <div className="w-20 h-20 rounded-xl border border-gray-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                {productForm.image_url &&
                (productForm.image_url.startsWith("http://") ||
                  productForm.image_url.startsWith("https://") ||
                  productForm.image_url.startsWith("/api/uploads/")) ? (
                  <img
                    src={productForm.image_url}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="text-center p-1.5 text-gray-400">
                    <Eye className="w-5 h-5 mx-auto mb-0.5 text-gray-300" />
                    <span className="text-[9px] font-semibold block leading-tight">
                      Picture Preview
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="block text-[11px] font-bold text-gray-800">
                    Item Picture (Upload Photo or Paste URL) *
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1 bg-[#1a1a1a] hover:bg-[#008060] text-white text-[10px] font-bold px-2.5 py-1 rounded-md transition shadow-2xs">
                    <Plus className="w-3 h-3" />
                    Upload From Device
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleProductImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/photo-... or upload from device"
                  value={productForm.image_url}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      image_url: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:border-[#008060]"
                />
                <p className="text-[10px] text-gray-500">
                  Upload a photo directly from your phone/computer (JPG, PNG, WEBP up to 5 MB) or paste an `https://...` link.
                </p>
              </div>
            </div>

            {/* Quick Sample Image Presets */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-gray-200/70">
              <span className="text-[10px] font-semibold text-gray-500">
                Quick sample pictures:
              </span>
              {[
                {
                  label: "Organic Remedy",
                  url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
                },
                {
                  label: "Electronics",
                  url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
                },
                {
                  label: "Skincare Bottle",
                  url: "https://images.unsplash.com/photo-1608248597359-0e6d526a6828?auto=format&fit=crop&w=600&q=80",
                },
                {
                  label: "Fashion Sneakers",
                  url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
                },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() =>
                    setProductForm({ ...productForm, image_url: preset.url })
                  }
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-700 hover:border-[#008060] hover:text-[#008060] transition"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price, Compare-At Original Price & Stock */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Selling Price (KES) *
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="e.g. 1850"
                value={productForm.price}
                onChange={(e) =>
                  setProductForm({ ...productForm, price: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008060]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Original Price (KES)
              </label>
              <input
                type="number"
                min="1"
                placeholder="Optional (e.g. 2400)"
                value={productForm.original_price}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    original_price: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008060]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Stock Units *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="25"
                value={productForm.stock}
                onChange={(e) =>
                  setProductForm({ ...productForm, stock: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008060]"
              />
            </div>
          </div>

          {/* Category & Promotional Badge */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Health & Organic Remedies"
                value={productForm.category}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    category: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008060]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Highlight Badge
              </label>
              <input
                type="text"
                placeholder="e.g. Best Seller, New Arrival, -20%"
                value={productForm.badge || ""}
                onChange={(e) =>
                  setProductForm({ ...productForm, badge: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008060]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">
              Product Description *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Describe key features, ingredients, warranty, or package contents..."
              value={productForm.description}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  description: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008060]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(false)}
              className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#008060] hover:bg-[#006e52] text-white font-bold rounded-lg shadow-xs transition"
            >
              {editingProduct ? "Update Product" : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
