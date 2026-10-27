import React from "react";
import { Eye, Star, Store } from "lucide-react";

export default function ProductCard({
  product,
  mode = "marketplace",
  storeThemeColor = "#008060",
  onQuickView,
  onAddToCart,
  onOpenStorefront,
}) {
  const savePct =
    product.original_price && product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) * 100
        )
      : null;

  if (mode === "storefront") {
    return (
      <div className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
        <div
          onClick={() => onQuickView(product)}
          className="relative h-56 bg-stone-100 overflow-hidden cursor-pointer"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.badge && (
              <span
                style={{ backgroundColor: storeThemeColor }}
                className="text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs"
              >
                {product.badge}
              </span>
            )}
            {savePct && (
              <span className="bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md w-fit">
                -{savePct}% OFF
              </span>
            )}
          </div>
          {product.stock <= 10 && (
            <span className="absolute bottom-2.5 left-2.5 bg-amber-500/95 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              Only {product.stock} left in stock
            </span>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <span className="bg-white text-stone-900 text-xs font-bold px-3.5 py-2 rounded-lg shadow flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Quick View
            </span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-mono text-stone-400">{product.sku}</span>
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3 h-3 fill-amber-400" /> {product.rating}{" "}
                <span className="text-stone-400 font-normal">
                  ({product.reviews_count})
                </span>
              </span>
            </div>
            <h4
              onClick={() => onQuickView(product)}
              className="font-bold text-stone-900 text-sm cursor-pointer hover:underline line-clamp-1"
            >
              {product.name}
            </h4>
            <p className="text-xs text-stone-500 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-base font-extrabold text-stone-900 tabular-nums">
                KES {product.price.toLocaleString()}
              </span>
              {product.original_price && (
                <span className="block text-[11px] text-stone-400 line-through tabular-nums">
                  KES {product.original_price.toLocaleString()}
                </span>
              )}
            </div>
            <button
              onClick={() => onAddToCart(product)}
              style={{ backgroundColor: storeThemeColor }}
              className="text-white text-xs font-bold px-3.5 py-2 rounded-xl hover:opacity-90 transition shadow-xs"
            >
              + Add to Bag
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Marketplace Mode
  return (
    <div className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div
          onClick={() => onQuickView(product)}
          className="h-52 bg-stone-100 overflow-hidden cursor-pointer relative"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.badge && (
              <span className="bg-[#1a1a1a]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                {product.badge}
              </span>
            )}
            {savePct && (
              <span className="bg-[#008060] text-white text-[10px] font-bold px-2 py-0.5 rounded-md w-fit">
                Save {savePct}%
              </span>
            )}
          </div>
          {product.stock <= 10 && (
            <span className="absolute bottom-2.5 left-2.5 bg-amber-500/95 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              Only {product.stock} left
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={() => onOpenStorefront?.(product.store_slug)}
              className="text-[11px] font-bold text-[#008060] hover:underline flex items-center gap-1"
            >
              <Store className="w-3 h-3" /> {product.store_name}
            </button>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-500">
              <Star className="w-3 h-3 fill-amber-400" /> {product.rating}
            </span>
          </div>
          <h4
            onClick={() => onQuickView(product)}
            className="font-bold text-stone-900 text-sm line-clamp-1 cursor-pointer hover:text-[#008060]"
          >
            {product.name}
          </h4>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4 pt-3 border-t border-stone-100 flex items-center justify-between">
        <div>
          <span className="text-base font-extrabold text-stone-900 tabular-nums">
            KES {product.price.toLocaleString()}
          </span>
          {product.original_price && (
            <span className="block text-[11px] text-stone-400 line-through tabular-nums">
              KES {product.original_price.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-[#1a1a1a] hover:bg-[#008060] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs"
        >
          + Add to Bag
        </button>
      </div>
    </div>
  );
}
