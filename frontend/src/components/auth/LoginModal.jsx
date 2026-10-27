import React from "react";
import { Lock, X, KeyRound } from "lucide-react";

export default function LoginModal({
  isLoginModalOpen,
  setIsLoginModalOpen,
  loginForm,
  setLoginForm,
  handleLoginSubmit,
  demoAccounts,
}) {
  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-start justify-between border-b border-stone-200 pb-3.5">
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-[#008060] bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <Lock className="w-3 h-3" /> Unified RBAC Authentication
            </span>
            <h3 className="font-extrabold text-lg text-stone-900 mt-1">
              Sign In to Your Admin Portal
            </h3>
            <p className="text-xs text-stone-500">
              Enter your credentials. The system automatically verifies your role and routes you strictly to your authorized portal interface.
            </p>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1 rounded-lg hover:bg-stone-100 text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">
              Admin Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@yourstore.co.ke"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#008060]"
            />
          </div>
          <div>
            <label className="font-bold text-stone-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#008060]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#008060] hover:bg-[#006e52] text-white font-extrabold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            Sign In & Load Authorized Workspace
          </button>
        </form>

        {/* Quick-Fill Test Accounts for Demo Evaluation */}
        <div className="pt-3 border-t border-stone-200 space-y-2">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            Quick-Fill Demo Accounts (Click to populate credentials):
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {demoAccounts?.map((acc) => {
              const defaultPwd =
                acc.role === "SUPERADMIN" ? "admin123" : "vendor123";
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() =>
                    setLoginForm({
                      email: acc.email,
                      password: defaultPwd,
                    })
                  }
                  className="w-full text-left p-2.5 rounded-xl border border-stone-200 hover:border-[#008060] hover:bg-emerald-50/40 transition flex items-center justify-between text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-stone-900 truncate">
                      {acc.store_name}
                    </div>
                    <div className="font-mono text-[11px] text-stone-500 truncate">
                      {acc.email} • pwd: {defaultPwd}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      acc.role === "SUPERADMIN"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-emerald-100 text-[#008060]"
                    }`}
                  >
                    {acc.role === "SUPERADMIN" ? "SUPERADMIN" : "VENDOR ADMIN"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
