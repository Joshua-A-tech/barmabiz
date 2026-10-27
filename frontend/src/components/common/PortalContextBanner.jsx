import React from "react";
import { ShieldCheck, Lock, LogOut } from "lucide-react";

export default function PortalContextBanner({ authSession, onLogout }) {
  if (!authSession) return null;

  return (
    <div
      className={`text-[11px] px-4 lg:px-6 py-2 border-b flex flex-wrap items-center justify-between gap-3 ${
        authSession.role === "SUPERADMIN"
          ? "bg-amber-950 text-amber-100 border-amber-800/60"
          : "bg-[#0f172a] text-stone-200 border-white/10"
      }`}
    >
      <div className="flex items-center gap-2.5 flex-wrap">
        <span
          className={`inline-flex items-center gap-1 font-extrabold uppercase tracking-wider px-2 py-0.5 rounded text-[10px] ${
            authSession.role === "SUPERADMIN"
              ? "bg-amber-400 text-stone-950"
              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
          }`}
        >
          <ShieldCheck className="w-3 h-3" />
          {authSession.role === "SUPERADMIN"
            ? "Platform Owner (SuperAdmin)"
            : "Verified Vendor Admin"}
        </span>
        <span className="font-mono text-xs text-white flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-emerald-400" />
          https://{authSession.portal_domain}
        </span>
        {authSession.role === "VENDOR" && (
          <span className="text-stone-400 hidden sm:inline">
            • Storefront:{" "}
            <strong className="text-emerald-400 font-mono">
              https://{authSession.storefront_domain}
            </strong>
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-stone-300">
          Signed in as <strong className="text-white">{authSession.name}</strong> (
          <span className="font-mono">{authSession.email}</span>)
        </span>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1 bg-white/10 hover:bg-red-600 text-white px-2.5 py-1 rounded-md font-bold transition"
        >
          <LogOut className="w-3 h-3" /> Sign Out
        </button>
      </div>
    </div>
  );
}
