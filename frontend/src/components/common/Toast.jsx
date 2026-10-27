import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white font-semibold text-xs sm:text-sm transition-all ${
        toast.type === "error"
          ? "bg-red-600"
          : "bg-[#1a1a1a] border border-white/15"
      }`}
    >
      {toast.type === "error" ? (
        <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-[#008060] shrink-0" />
      )}
      <span>{toast.msg}</span>
    </div>
  );
}
