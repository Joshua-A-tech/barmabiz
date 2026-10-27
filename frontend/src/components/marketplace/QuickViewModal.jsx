import React from "react";
import { X } from "lucide-react";

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base">{product.name}</h3>
          <button onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl"
        />
        <p className="text-xs text-stone-600">
          {product.description}
        </p>
        <button
          onClick={() => {
            onAddToCart(product);
            onClose();
          }}
          className="w-full bg-[#008060] text-white text-xs font-bold py-2.5 rounded-lg"
        >
          Add to Bag — KES {product.price?.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
